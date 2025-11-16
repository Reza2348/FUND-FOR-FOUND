// middleware.ts
import { NextResponse, type NextRequest } from "next/server"; // 💡 اضافه کردن type NextRequest

// آدرس‌های عمومی که نیازی به احراز هویت ندارند.
const publicPaths = ["/login", "/signup", "/"];

// آدرس روت محافظت شده
const protectedPath = "/dashboard";

// مشخص کردن نوع پارامتر request به صورت NextRequest
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ۱. بررسی مسیرهای عمومی
  if (publicPaths.includes(pathname)) {
    return NextResponse.next(); // اجازه دسترسی به مسیرهای عمومی
  }

  // ۲. دریافت توکن از کوکی‌ها
  // نام کوکی Supabase Auth در Next.js معمولاً با 'sb-' شروع می‌شود.
  // در پروژه‌های Supabase با استفاده از nextjs-helpers، نام کوکی پیش‌فرض 'sb-access-token' نیست.
  // اگر از nextjs-helpers استفاده می‌کنید، باید نام کوکی صحیح را پیدا کنید (معمولاً: my-app-auth-token).
  const token = request.cookies.get("sb-access-token")?.value;

  // اگر کاربر در مسیرهای محافظت شده است:
  if (pathname.startsWith(protectedPath)) {
    // ۳. بررسی وجود توکن
    if (!token) {
      // ریدایرکت به صفحه لاگین
      const loginUrl = new URL("/login", request.url);

      // ذخیره مسیر اصلی برای بازگشت پس از ورود موفق
      loginUrl.searchParams.set("redirect_to", pathname);

      return NextResponse.redirect(loginUrl);
    }

    // اگر توکن وجود دارد:
    // ۴. (نکته): اعتبارسنجی کامل توکن (با استفاده از متدهای Supabase Server-side) در اینجا امن‌ترین حالت است
    // اما چون Next.js Middleware در Edge Runtime اجرا می‌شود، ممکن است دسترسی به توابع Supabase کمی پیچیده‌تر باشد.

    return NextResponse.next(); // اجازه دسترسی به داشبورد
  }

  // برای سایر مسیرها
  return NextResponse.next();
}

// تنظیمات matcher: مشخص می‌کند این Middleware برای کدام مسیرها باید اجرا شود.
export const config = {
  matcher: [
    /*
     * تطبیق همه مسیرها به جز موارد زیر:
     * - _next/static (فایل‌های ایستا)
     * - _next/image (فایل‌های ایمیج)
     * - favicon.ico
     * - مسیرهای API (اگر می‌خواهید middleware را از آن‌ها حذف کنید)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
