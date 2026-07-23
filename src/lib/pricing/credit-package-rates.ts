import type { CreditPackage } from "@/lib/api/packages";

/** "Standard" / Basic toggle — `creditpackages.standardModelPrice` */
export function resolveStandardModelPricePerMin(pkg: CreditPackage | null | undefined): number {
  if (typeof pkg?.standardModelPrice === "number" && Number.isFinite(pkg.standardModelPrice)) {
    return pkg.standardModelPrice;
  }
  if (
    typeof pkg?.basicModelPrice === "number" &&
    typeof pkg?.pricePerMinute === "number" &&
    Number.isFinite(pkg.basicModelPrice) &&
    Number.isFinite(pkg.pricePerMinute)
  ) {
    return (pkg.basicModelPrice + pkg.pricePerMinute) / 2;
  }
  if (typeof pkg?.basicModelPrice === "number" && Number.isFinite(pkg.basicModelPrice)) {
    return pkg.basicModelPrice;
  }
  if (typeof pkg?.pricePerMinute === "number" && Number.isFinite(pkg.pricePerMinute)) {
    return pkg.pricePerMinute - 0.015;
  }
  return Number.NaN;
}

/** Sale / current rate — `creditpackages.premiumModelPrice` */
export function resolvePremiumModelPricePerMin(pkg: CreditPackage | null | undefined): number {
  if (typeof pkg?.premiumModelPrice === "number" && Number.isFinite(pkg.premiumModelPrice)) {
    return pkg.premiumModelPrice;
  }
  if (typeof pkg?.pricePerMinute === "number" && Number.isFinite(pkg.pricePerMinute)) {
    return pkg.pricePerMinute;
  }
  return Number.NaN;
}

/** Original / list rate — `creditpackages.premiumModelCheckedPrice` */
export function resolvePremiumModelCheckedPricePerMin(
  pkg: CreditPackage | null | undefined,
): number {
  if (
    typeof pkg?.premiumModelCheckedPrice === "number" &&
    Number.isFinite(pkg.premiumModelCheckedPrice)
  ) {
    return pkg.premiumModelCheckedPrice;
  }
  return Number.NaN;
}

/** What the customer pays per minute for premium when promo fields exist */
export function resolveEffectivePremiumRatePerMin(pkg: CreditPackage | null | undefined): number {
  const original = resolvePremiumModelCheckedPricePerMin(pkg);
  const sale = resolvePremiumModelPricePerMin(pkg);
  if (Number.isFinite(original) && Number.isFinite(sale)) {
    return Math.min(original, sale);
  }
  if (Number.isFinite(sale)) return sale;
  if (Number.isFinite(original)) return original;
  return resolvePremiumModelPricePerMin(pkg);
}

export function hasEarlyBirdPremiumPricing(pkg: CreditPackage | null | undefined): boolean {
  const original = resolvePremiumModelCheckedPricePerMin(pkg);
  const sale = resolvePremiumModelPricePerMin(pkg);
  return Number.isFinite(original) && Number.isFinite(sale);
}

export function packagesHaveEarlyBirdPremium(packages: CreditPackage[] | null | undefined): boolean {
  if (!Array.isArray(packages) || packages.length === 0) return false;
  return packages.some((p) => hasEarlyBirdPremiumPricing(p));
}

/** % off from original (checked) → sale (premiumModelPrice) */
export function computePremiumDiscountPercent(
  originalPrice: number,
  salePrice: number,
): number | null {
  if (!Number.isFinite(originalPrice) || !Number.isFinite(salePrice)) return null;
  if (originalPrice <= 0 || salePrice >= originalPrice) return null;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export type PlanCardUsdPerMin = {
  hero: number;
  checkedPrice: number | null;
  discountedPrice: number | null;
  discountPercent: number | null;
  showPromoPricing: boolean;
};

/**
 * Premium-mode plan card pricing.
 * @param mode `'standard' | 'basic' | 'premium'`
 */
export function resolvePlanCardUsdPerMin(
  pkg: CreditPackage | null | undefined,
  mode: "standard" | "basic" | "premium",
): PlanCardUsdPerMin {
  const standard = resolveStandardModelPricePerMin(pkg);
  const isPremiumMode = mode === "premium";

  if (!isPremiumMode) {
    return {
      hero: standard,
      checkedPrice: null,
      discountedPrice: null,
      discountPercent: null,
      showPromoPricing: false,
    };
  }

  const checkedPrice = resolvePremiumModelCheckedPricePerMin(pkg);
  const discountedPrice = resolvePremiumModelPricePerMin(pkg);
  const showPromoPricing = Number.isFinite(checkedPrice) && Number.isFinite(discountedPrice);

  if (showPromoPricing) {
    const payRate = Math.min(checkedPrice, discountedPrice);
    return {
      hero: payRate,
      checkedPrice,
      discountedPrice,
      discountPercent: computePremiumDiscountPercent(checkedPrice, discountedPrice),
      showPromoPricing: true,
    };
  }

  const fallback = Number.isFinite(discountedPrice)
    ? discountedPrice
    : Number.isFinite(checkedPrice)
      ? checkedPrice
      : standard;

  return {
    hero: fallback,
    checkedPrice: null,
    discountedPrice: null,
    discountPercent: null,
    showPromoPricing: false,
  };
}
