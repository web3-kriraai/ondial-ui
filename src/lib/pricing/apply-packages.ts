import {
  type CreditPackage,
  PACKAGE_ID_TO_PLAN_ID,
  countryIsoToId,
  type PricingCountryOption,
} from "@/lib/api/packages";
import { usdToInr, usdToInrWhole } from "@/lib/api/exchange-rate";
import { resolveStandardModelPricePerMin } from "@/lib/pricing/credit-package-rates";
import {
  DEFAULT_PRICING_COUNTRY_ID,
  getPricingCountry,
  PRICING_COUNTRIES,
  type PricingCountryDefinition,
  type PricingCountryRates,
} from "@/data/pricing-by-country";

const USD_CURRENCY = {
  code: "USD",
  symbol: "$",
  rateFractionDigits: 3,
  monthlyFractionDigits: 2,
  locale: "en-US",
} as const;

const INR_CURRENCY = {
  code: "INR",
  symbol: "₹",
  rateFractionDigits: 2,
  monthlyFractionDigits: 0,
  locale: "en-IN",
} as const;

const KNOWN_STATIC_IDS = new Set(PRICING_COUNTRIES.map((c) => c.id));

function asFiniteNumber(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function pickUsdVoiceRate(pkg: CreditPackage | undefined, fallback: number): number {
  if (!pkg) return fallback;
  const resolved = resolveStandardModelPricePerMin(pkg);
  return Number.isFinite(resolved) ? resolved : fallback;
}

/**
 * India marketing rates: prefer dashboard `*EstimatedPriceInr` (country matrix),
 * then FX conversion of the USD voice rate.
 */
function pickDisplayVoiceRate(
  pkg: CreditPackage | undefined,
  fallbackUsd: number,
  useInr: boolean,
  fx: number | undefined,
): number {
  if (useInr && pkg) {
    const estimated = pkg.standardModelEstimatedPriceInr;
    if (typeof estimated === "number" && Number.isFinite(estimated) && estimated > 0) {
      return estimated;
    }
  }

  const usd = pickUsdVoiceRate(pkg, fallbackUsd);
  if (useInr && fx && fx > 0) {
    return usdToInr(usd, fx, INR_CURRENCY.rateFractionDigits);
  }
  return usd;
}

function baseCountryForIso(id: string): PricingCountryDefinition {
  if (KNOWN_STATIC_IDS.has(id)) {
    return getPricingCountry(id);
  }
  return getPricingCountry(DEFAULT_PRICING_COUNTRY_ID);
}

export type ApplyPackagesOptions = {
  /** Live USD→INR rate. Used for India add-ons and INR fallback when estimated rates are missing. */
  usdToInrRate?: number;
};

/**
 * Build a country pricing definition from live `/api/packages` data.
 * India prefers `standardModelEstimatedPriceInr`; other markets use USD model rates.
 */
export function applyPackagesToCountryDefinition(
  packages: CreditPackage[],
  countryIso: string,
  countryName?: string,
  options: ApplyPackagesOptions = {},
): PricingCountryDefinition {
  const iso = countryIso.trim().toUpperCase();
  const id = countryIsoToId(iso);
  const useInr = iso === "IN";
  const fx = options.usdToInrRate;
  const base = baseCountryForIso(id);
  /** Always seed from USD catalog rates before converting to INR. */
  const usdSeed = getPricingCountry(DEFAULT_PRICING_COUNTRY_ID);

  const byPackageId = new Map(
    packages.map((pkg) => [String(pkg.packageId || "").toLowerCase(), pkg]),
  );

  const starter = byPackageId.get("starter");
  const professional = byPackageId.get("professional");
  const enterprise = byPackageId.get("enterprise");

  const rates: PricingCountryRates = {
    essential: pickDisplayVoiceRate(starter, usdSeed.rates.essential, useInr, fx),
    growth: pickDisplayVoiceRate(professional, usdSeed.rates.growth, useInr, fx),
    scale: pickDisplayVoiceRate(enterprise, usdSeed.rates.scale, useInr, fx),
    enterprise: null,
  };

  const resourcePkg = starter ?? professional ?? enterprise ?? packages[0];
  const channelUsd = asFiniteNumber(
    resourcePkg?.concurrentCallCost,
    usdSeed.addons.channelPrice,
  );
  const phoneUsd = asFiniteNumber(
    resourcePkg?.phoneNumberCost,
    usdSeed.addons.phoneNumberPrice,
  );

  const channelPrice =
    useInr && fx && fx > 0 ? usdToInrWhole(channelUsd, fx) : channelUsd;
  const phoneNumberPrice =
    useInr && fx && fx > 0 ? usdToInrWhole(phoneUsd, fx) : phoneUsd;

  return {
    id,
    name: countryName || (KNOWN_STATIC_IDS.has(id) ? base.name : iso),
    flagCode: id,
    currency: useInr ? { ...INR_CURRENCY } : { ...USD_CURRENCY },
    rates,
    priceLabels: { enterprise: "Custom/min" },
    addons: {
      channelPrice,
      phoneNumberPrice,
    },
    calculator: base.calculator,
  };
}

export function mergeAvailableCountries(
  available: PricingCountryOption[] | undefined,
): PricingCountryDefinition[] {
  if (!available?.length) {
    return [];
  }

  return available.map((entry) => {
    const iso = String(entry.iso || "").toUpperCase();
    const id = countryIsoToId(iso);
    const known = baseCountryForIso(id);

    return {
      ...known,
      id,
      name: entry.name || (KNOWN_STATIC_IDS.has(id) ? known.name : iso),
      flagCode: id,
      currency: iso === "IN" ? { ...INR_CURRENCY } : { ...USD_CURRENCY },
    };
  });
}

export function resolvePlanIdFromPackageId(packageId: string): string | null {
  const key = String(packageId || "").toLowerCase() as keyof typeof PACKAGE_ID_TO_PLAN_ID;
  return PACKAGE_ID_TO_PLAN_ID[key] ?? null;
}
