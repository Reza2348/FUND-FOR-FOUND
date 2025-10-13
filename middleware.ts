// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./src/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);
  const dashboardPath = "/dashboard";

  const { supabase, response } = await updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ۱. کاربر لاگین نکرده → /dashboard → هدایت به /auth/login
  if (request.nextUrl.pathname === dashboardPath && !user) {
    return NextResponse.redirect(loginUrl);
  }

  // ۲. کاربر لاگین کرده → /dashboard → هدایت به public-profile
  if (request.nextUrl.pathname === dashboardPath && user) {
    return NextResponse.redirect(
      new URL("/dashboard/public-profile", request.url)
    );
  }

  // ۳. کاربر لاگین کرده → /auth/login → هدایت به public-profile
  if (request.nextUrl.pathname === "/auth/login" && user) {
    return NextResponse.redirect(
      new URL("/dashboard/public-profile", request.url)
    );
  }

  // سایر مسیرها → اجازه عبور
  return response;
}

// مسیرهایی که middleware روی آن‌ها اجرا می‌شود
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
