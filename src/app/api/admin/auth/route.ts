import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { isAuthorizedAdminRequest } from "@/lib/admin/api-auth";
import {
  ADMIN_SESSION_COOKIE,
  clearAdminSessionCookie,
  getSessionCookieOptions,
} from "@/lib/admin/session";
import { createSessionToken, safeEqualSecret, SESSION_TTL_SECONDS } from "@/lib/admin/session-token";

/**
 * POST /api/admin/auth
 * Body: { password: string }
 * Sets a signed HttpOnly session cookie when the password matches ADMIN_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
  }

  let password: string | undefined;
  try {
    const body = await req.json() as { password?: string };
    password = body.password;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!password || !safeEqualSecret(password, secret)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const sessionToken = await createSessionToken(secret);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, getSessionCookieOptions(SESSION_TTL_SECONDS));

  return NextResponse.json({ success: true });
}

/**
 * DELETE /api/admin/auth
 * Clears the session cookie (logout). Requires an active session.
 */
export async function DELETE(req: NextRequest) {
  if (!(await isAuthorizedAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await clearAdminSessionCookie();
  return NextResponse.json({ success: true });
}
