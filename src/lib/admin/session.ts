import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { verifySessionToken } from "@/lib/admin/session-token";
import { SEO_LOGIN_PATH, SEO_POSTS_PATH } from "@/config/seo-admin";

export { ADMIN_SESSION_COOKIE };

/** True when a valid signed session cookie is present. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!cookieValue) return false;

  return await verifySessionToken(cookieValue, secret);
}

/** Redirect to the SEO login page when not authenticated. */
export async function requireAdminAuth(loginPath = SEO_LOGIN_PATH): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect(loginPath);
  }
}

/** Redirect away from login when already authenticated (e.g. /seo/login → /seo/posts). */
export async function redirectIfAuthenticated(redirectTo = SEO_POSTS_PATH): Promise<void> {
  if (await isAdminAuthenticated()) {
    redirect(redirectTo);
  }
}

/** Session cookie options shared by login / logout. */
export function getSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
