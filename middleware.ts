import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const loginUrl = new URL("/dashboard", req.url);
  const dashboardPath = "/dashboard";
  const publicProfilePath = "/dashboard/public-profile";

  // ۱. کاربر لاگین نکرده → /dashboard → هدایت به /auth/login
  if (req.nextUrl.pathname.startsWith(dashboardPath) && !user) {
    return NextResponse.redirect(loginUrl);
  }

  // ۲. کاربر لاگین کرده → /auth/login → هدایت به public-profile
  if (req.nextUrl.pathname === "/dashboard" && user) {
    return NextResponse.redirect(publicProfilePath);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", ""],
};
