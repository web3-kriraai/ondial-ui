import { NextResponse } from "next/server";

/**
 * Deprecated — session cookie auth is used instead of exposing secrets to the browser.
 * @deprecated Use `credentials: "include"` on fetch; APIs validate the HttpOnly cookie.
 */
export async function GET() {
  return NextResponse.json(
    { error: "This endpoint is disabled. Use session cookie authentication." },
    { status: 410 },
  );
}
