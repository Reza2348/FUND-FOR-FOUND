// middleware.ts
import { NextResponse, type NextRequest } from "next/server"; // 💡 اضافه کردن type NextRequest

// آدرس‌های عمومی که نیازی به احراز هویت ندارند.
const publicPaths = ["/login", "/signup", "/"];

// آدرس روت محافظت شده
const protectedPath = "/dashboard";

// 🚨🚨 تغییر بسیار مهم: نام کوکی را که در مرورگر (Developer Tools) خود پیدا کرده‌اید، جایگزین کنید.
// این نام معمولاً شبیه: 'sb-qpgsjhfdbvxkzyxfbzzr-auth-token' است.
const SUPABASE_AUTH_COOKIE_NAME = "sb-YOUR_ACTUAL_PROJECT_REF-auth-token";

// مشخص کردن نوع پارامتر request به صورت NextRequest
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ۱. بررسی مسیرهای عمومی
  if (publicPaths.includes(pathname)) {
    return NextResponse.next(); // اجازه دسترسی به مسیرهای عمومی
  }

  // ۲. دریافت توکن از کوکی‌ها با استفاده از نام صحیح
  const token = request.cookies.get(SUPABASE_AUTH_COOKIE_NAME)?.value;

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
