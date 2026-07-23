/** Credit package from GET /api/packages (dashboard catalog + country overlay). */
export type CreditPackage = {
  _id?: string;
  packageId: string;
  name: string;
  description?: string;
  popular?: boolean;
  minMinutes: number;
  maxMinutes: number | null;
  pricePerMinute?: number;
  /** Legacy alias sometimes present on older docs. */
  basicModelPrice?: number | null;
  standardModelPrice?: number | null;
  premiumModelPrice?: number | null;
  eliteModelPrice?: number | null;
  /** List / struck-through rates when sale pricing is active. */
  standardModelCheckedPrice?: number | null;
  premiumModelCheckedPrice?: number | null;
  eliteModelCheckedPrice?: number | null;
  standardModelEstimatedPriceInr?: number | null;
  premiumModelEstimatedPriceInr?: number | null;
  eliteModelEstimatedPriceInr?: number | null;
  standardModelEnabled?: boolean;
  premiumModelEnabled?: boolean;
  eliteModelEnabled?: boolean;
  phoneNumberCost?: number | null;
  concurrentCallCost?: number | null;
  displayOrder?: number;
  isActive?: boolean;
  /** Resolved catalog country after overlay / fallback. */
  countryIso?: string | null;
  countrySalePriceEnabled?: boolean;
  countryRateApplied?: boolean;
  countryRateSource?: string;
};

export type PricingCountryOption = {
  iso: string;
  name: string;
};

export type PackagesApiResponse = {
  success: boolean;
  packages: CreditPackage[];
  countryIso?: string;
  requestedCountryIso?: string | null;
  resolvedCountryIso?: string;
  usedDefaultFallback?: boolean;
  defaultCountryIso?: string;
  availableCountries?: PricingCountryOption[];
  fromCache?: boolean;
  error?: string;
  message?: string;
};

/** Maps dashboard packageId → marketing plan id. */
export const PACKAGE_ID_TO_PLAN_ID = {
  starter: "essential",
  professional: "growth",
  enterprise: "scale",
  premium: "enterprise",
} as const;

export type DashboardPackageId = keyof typeof PACKAGE_ID_TO_PLAN_ID;

export type PackagePlanId =
  (typeof PACKAGE_ID_TO_PLAN_ID)[keyof typeof PACKAGE_ID_TO_PLAN_ID];

export function countryIdToIso(countryId: string): string {
  return countryId.trim().toUpperCase();
}

export function countryIsoToId(iso: string): string {
  return iso.trim().toLowerCase();
}

/**
 * Fetch live credit packages via same-origin proxy (`/api/packages`),
 * matching Ondial's pricing page pattern.
 */
export async function fetchPackages(countryIso: string): Promise<PackagesApiResponse> {
  const iso = countryIdToIso(countryIso);
  const url = new URL("/api/packages", window.location.origin);
  url.searchParams.set("country", iso);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const payload = (await response.json().catch(() => null)) as PackagesApiResponse | null;

  if (!response.ok) {
    return {
      success: false,
      packages: [],
      error:
        payload?.error ||
        payload?.message ||
        response.statusText ||
        "Failed to fetch packages",
    };
  }

  return (
    payload ?? {
      success: false,
      packages: [],
      error: "Empty packages response",
    }
  );
}
