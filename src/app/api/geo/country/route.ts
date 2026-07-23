import { type NextRequest, NextResponse } from "next/server";

const DEFAULT_PRICING_COUNTRY_ISO = "IN";

function normalizeCountryIso(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const iso = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(iso)) return null;
  return iso;
}

function countryIsoFromRequestHeaders(request: NextRequest): string | null {
  const candidates = [
    request.headers.get("cf-ipcountry"),
    request.headers.get("x-vercel-ip-country"),
    request.headers.get("cloudfront-viewer-country"),
    request.headers.get("x-country-code"),
    request.headers.get("x-geo-country"),
  ];

  for (const raw of candidates) {
    const iso = normalizeCountryIso(raw);
    // Cloudflare: XX = unknown, T1 = Tor
    if (iso && iso !== "XX" && iso !== "T1") return iso;
  }

  return null;
}

function countryDisplayName(iso: string): string {
  try {
    const dn = new Intl.DisplayNames(["en"], { type: "region" });
    return dn.of(iso) || iso;
  } catch {
    return iso;
  }
}

/**
 * GET /api/geo/country
 *
 * Best-effort visitor country from CDN headers (same shape as Ondial).
 */
export async function GET(request: NextRequest) {
  try {
    const detected = countryIsoFromRequestHeaders(request);
    return NextResponse.json({
      success: true,
      detectedCountryIso: detected,
      defaultCountryIso: DEFAULT_PRICING_COUNTRY_ISO,
      detectedCountryName: detected ? countryDisplayName(detected) : null,
      source: detected ? "header" : "none",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : undefined;
    return NextResponse.json(
      {
        success: true,
        detectedCountryIso: null,
        defaultCountryIso: DEFAULT_PRICING_COUNTRY_ISO,
        detectedCountryName: null,
        source: "none",
        error: message,
      },
      { status: 200 },
    );
  }
}
