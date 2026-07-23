import { NextResponse } from "next/server";

import { fetchDashboardApi } from "@/lib/api/dashboard-proxy";

/**
 * GET /api/utils/exchange-rate
 *
 * Same-origin proxy for dashboard USD→INR rate used by India pricing display.
 */
export async function GET() {
  try {
    const upstream = await fetchDashboardApi("/utils/exchange-rate", {
      revalidate: 300,
    });

    const payload = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return NextResponse.json(
        payload ?? {
          success: false,
          error: "Failed to fetch exchange rate",
          message: upstream.statusText,
        },
        { status: upstream.status },
      );
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/utils/exchange-rate] proxy failed:", message);
    return NextResponse.json(
      { success: false, error: "Internal server error", message },
      { status: 500 },
    );
  }
}
