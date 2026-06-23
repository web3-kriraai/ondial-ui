import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { safeEqualSecret, isValidSessionCookieValue } from "@/lib/admin/session-token";

function getAdminSecret(): string | undefined {
  const secret = process.env.ADMIN_SECRET;
  return secret || undefined;
}

/** Authorize API requests via HttpOnly session cookie or `x-admin-token` (automation/scripts). */
export async function isAuthorizedAdminRequest(req: NextRequest): Promise<boolean> {
  const secret = getAdminSecret();
  if (!secret) return false;

  const headerToken = req.headers.get("x-admin-token");
  if (headerToken && safeEqualSecret(headerToken, secret)) return true;

  const cookieValue = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (await isValidSessionCookieValue(cookieValue, secret)) return true;

  const cookieStore = await cookies();
  const serverCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return await isValidSessionCookieValue(serverCookie, secret);
}

/** Return 401 response when unauthorized; null when the request may proceed. */
export async function requireAdminApiAuth(req: NextRequest): Promise<NextResponse | null> {
  if (!(await isAuthorizedAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
