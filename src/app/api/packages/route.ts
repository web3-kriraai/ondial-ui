import { type NextRequest, NextResponse } from "next/server";

import { fetchDashboardApi } from "@/lib/api/dashboard-proxy";

/**
 * GET /api/packages?country=XX
 *
 * Same-origin proxy for the dashboard credit-package catalog
 * (`GET {NEXT_PUBLIC_API_URL}/packages`). Mirrors Ondial's public pricing API
 * so the marketing site can load live country rates without browser CORS.
 */
export async function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country") ?? undefined;

  try {
    const upstream = await fetchDashboardApi("/packages", {
      params: { country },
      revalidate: 60,
    });

    const payload = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return NextResponse.json(
        payload ?? {
          success: false,
          error: "Failed to fetch packages",
          message: upstream.statusText,
        },
        { status: upstream.status },
      );
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/packages] proxy failed:", message);
    return NextResponse.json(
      { success: false, error: "Internal server error", message },
      { status: 500 },
    );
  }
}
