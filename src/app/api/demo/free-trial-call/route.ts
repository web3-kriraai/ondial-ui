import { type NextRequest, NextResponse } from "next/server";

import { fetchDashboardApi } from "@/lib/api/dashboard-proxy";
import { visitorIpProxyHeaders } from "@/lib/client-ip";

/**
 * Proxy for dashboard marketing free-trial dial:
 * GET/POST {NEXT_PUBLIC_API_URL}/demo/free-trial-call
 *
 * Forwards the browser visitor IP (not this server's IP) so dashboard
 * rate-limiting keys on the real user.
 */
export async function GET(request: NextRequest) {
  const language = request.nextUrl.searchParams.get("language") ?? undefined;

  try {
    const upstream = await fetchDashboardApi("/demo/free-trial-call", {
      params: { language },
      revalidate: false,
      headers: visitorIpProxyHeaders(request),
    });

    const payload = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return NextResponse.json(
        payload ?? {
          success: false,
          error: "Failed to load free trial call options",
        },
        { status: upstream.status },
      );
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/demo/free-trial-call] GET proxy failed:", message);
    return NextResponse.json(
      { success: false, error: "Internal server error", message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const upstream = await fetchDashboardApi("/demo/free-trial-call", {
      method: "POST",
      revalidate: false,
      headers: {
        "Content-Type": "application/json",
        ...visitorIpProxyHeaders(request),
      },
      body: JSON.stringify(body),
    });

    const payload = await upstream.json().catch(() => null);

    return NextResponse.json(
      payload ?? {
        success: false,
        error: upstream.ok ? "Empty response" : "Failed to initiate free trial call",
      },
      { status: upstream.status },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/demo/free-trial-call] POST proxy failed:", message);
    return NextResponse.json(
      { success: false, error: "Internal server error", message },
      { status: 500 },
    );
  }
}
