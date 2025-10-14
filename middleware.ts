import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = req.nextUrl.clone();
  const path = url.pathname;

  const LOGIN_PATH = "/auth/login";
  const DASHBOARD_PATH = "/dashboard";
  const PUBLIC_PROFILE_PATH = "/dashboard/public-profile";

  if (path.startsWith(DASHBOARD_PATH) && !user) {
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  if (path === LOGIN_PATH && user) {
    url.pathname = PUBLIC_PROFILE_PATH;
    return NextResponse.redirect(url);
  }

  if (path === DASHBOARD_PATH && user) {
    url.pathname = PUBLIC_PROFILE_PATH;
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
