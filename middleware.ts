import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // ۱. ایجاد کلاینت Supabase برای دسترسی به کوکی‌ها
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // در Next.js Middleware، برای "set" کردن کوکی‌ها باید از "res.cookies.set" استفاده کرد
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ۲. دریافت اطلاعات کاربر
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ۳. تعریف مسیرها
  // فرض بر این است که صفحه ورود شما اینجاست:
  const loginPath = "/auth/login";
  const loginUrl = new URL(loginPath, req.url);
  const dashboardPath = "/dashboard";
  const publicProfilePath = "/dashboard/public-profile";

  // ۴. قانون ۱: حفاظت از داشبورد (برای کاربرانِ لاگین‌نکرده)
  // اگر کاربر لاگین نکرده باشد (user === null) و بخواهد به هر مسیری در /dashboard دسترسی پیدا کند.
  if (req.nextUrl.pathname.startsWith(dashboardPath) && !user) {
    console.log("Rule 1: Redirecting unauthenticated user to login.");
    // هدایت به صفحه ورود
    return NextResponse.redirect(loginUrl);
  }

  // ۵. قانون ۲: جلوگیری از ورود مجدد (برای کاربرانِ لاگین کرده)
  // اگر کاربر لاگین کرده باشد و بخواهد به صفحه ورود (/auth/login) دسترسی پیدا کند.
  if (req.nextUrl.pathname === loginPath && user) {
    console.log("Rule 2: Redirecting authenticated user to public profile.");
    // هدایت به داشبورد یا صفحه پروفایل
    return NextResponse.redirect(new URL(publicProfilePath, req.url));
  }

  // ۶. قانون ۳: هدایت از /dashboard به /dashboard/public-profile (برای کاربرانِ لاگین کرده)
  // اگر کاربر لاگین کرده باشد و دقیقاً به مسیر /dashboard بیاید (نه /dashboard/x).
  if (req.nextUrl.pathname === dashboardPath && user) {
    console.log(
      "Rule 3: Redirecting authenticated user from /dashboard to public profile."
    );
    // هدایت به مسیر خاص داشبورد
    return NextResponse.redirect(new URL(publicProfilePath, req.url));
  }

  // ۷. عبور به مسیر درخواستی
  return res;
}

// تنظیمات مچِر برای اعمال Middleware بر روی مسیرهای لازم
export const config = {
  // شامل همهٔ مسیرهای زیر /dashboard و همچنین صفحهٔ /auth/login
  matcher: ["/dashboard/:path*", "/auth/login"],
};
