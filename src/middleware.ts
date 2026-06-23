import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DASHBOARD_LOGIN_URL,
  DASHBOARD_SIGNUP_URL,
  getAppUrl,
  getDashboardUrl,
} from "@/config/urls";
import { SEO_LOGIN_PATH, SEO_POSTS_PATH } from "@/config/seo-admin";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { isValidSessionCookieValue, safeEqualSecret } from "@/lib/admin/session-token";

async function hasSeoSession(request: NextRequest): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return await isValidSessionCookieValue(cookie, secret);
}

async function hasSeoApiAuth(request: NextRequest): Promise<boolean> {
  if (await hasSeoSession(request)) return true;

  const secret = process.env.ADMIN_SECRET;
  const headerToken = request.headers.get("x-admin-token");
  return Boolean(secret && headerToken && safeEqualSecret(headerToken, secret));
}

/** Marketing site: auth lives on the dashboard - redirect legacy routes when hosts differ. */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (getDashboardUrl() !== getAppUrl()) {
    if (pathname === "/login") {
      return NextResponse.redirect(DASHBOARD_LOGIN_URL);
    }

    if (pathname === "/signup") {
      return NextResponse.redirect(DASHBOARD_SIGNUP_URL);
    }
  }

  // SEO CMS — block protected pages without a session
  const isSeoProtectedPage =
    pathname === "/seo" ||
    pathname.startsWith("/seo/posts") ||
    pathname.startsWith("/seo/authors");

  if (isSeoProtectedPage && !(await hasSeoSession(request))) {
    return NextResponse.redirect(new URL(SEO_LOGIN_PATH, request.url));
  }

  // Already signed in — don't show login again
  if (pathname === "/seo/login" && (await hasSeoSession(request))) {
    return NextResponse.redirect(new URL(SEO_POSTS_PATH, request.url));
  }

  // SEO API — require session cookie or automation header (except password login)
  if (pathname.startsWith("/api/admin/")) {
    const isLoginPost = pathname === "/api/admin/auth" && request.method === "POST";
    if (!isLoginPost && !(await hasSeoApiAuth(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/seo",
    "/seo/:path*",
    "/api/admin/:path*",
  ],
};
