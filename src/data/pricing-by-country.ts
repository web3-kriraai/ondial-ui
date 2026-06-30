import {
  PRICING_CALCULATOR_ADDONS,
  PRICING_MINUTES_CALCULATOR,
  PRICING_PLAN_MINUTE_TIERS,
  PRICING_PLANS,
  type PricingPlan,
} from "@/data/pricing-plans";

/**
 * Edit this file to set per-country pricing.
 * Each entry controls plan per-minute rates, add-on prices, and calculator conversion.
 */
export type PricingCountryId = "us" | "in" | "gb" | "ae" | "ca" | "au";

export type PricingCountryRates = {
  essential: number;
  growth: number;
  scale: number;
  enterprise: null;
};

export type PricingCountryDefinition = {
  id: PricingCountryId;
  name: string;
  /** Matches `/public/flags/{flagCode}.webp` */
  flagCode: string;
  currency: {
    code: string;
    symbol: string;
    rateFractionDigits: number;
    monthlyFractionDigits: number;
    locale: string;
  };
  rates: PricingCountryRates;
  /** Optional display overrides, e.g. enterprise: "Custom/min" */
  priceLabels?: Partial<Record<keyof PricingCountryRates, string>>;
  addons: {
    channelPrice: number;
    phoneNumberPrice: number;
  };
  calculator: {
    /** @deprecated Usage cost now uses tiered rates from `rates`; kept for reference only. */
    minutesPerCurrencyUnit: number;
  };
};

export const DEFAULT_PRICING_COUNTRY_ID: PricingCountryId = "us";

export const PRICING_COUNTRIES: readonly PricingCountryDefinition[] = [
  {
    id: "us",
    name: "United States",
    flagCode: "us",
    currency: {
      code: "USD",
      symbol: "$",
      rateFractionDigits: 3,
      monthlyFractionDigits: 2,
      locale: "en-US",
    },
    rates: {
      essential: 0.055,
      growth: 0.05,
      scale: 0.045,
      enterprise: null,
    },
    addons: {
      channelPrice: 4.9,
      phoneNumberPrice: 4.9,
    },
    calculator: {
      minutesPerCurrencyUnit: 15,
    },
  },
  {
    id: "in",
    name: "India",
    flagCode: "in",
    currency: {
      code: "INR",
      symbol: "₹",
      rateFractionDigits: 2,
      monthlyFractionDigits: 0,
      locale: "en-IN",
    },
    rates: {
      essential: 5,
      growth: 4.5,
      scale: 4,
      enterprise: null,
    },
    addons: {
      channelPrice: 399,
      phoneNumberPrice: 399,
    },
    calculator: {
      minutesPerCurrencyUnit: 0.18,
    },
  },
  {
    id: "gb",
    name: "United Kingdom",
    flagCode: "gb",
    currency: {
      code: "GBP",
      symbol: "£",
      rateFractionDigits: 3,
      monthlyFractionDigits: 2,
      locale: "en-GB",
    },
    rates: {
      essential: 0.042,
      growth: 0.038,
      scale: 0.034,
      enterprise: null,
    },
    addons: {
      channelPrice: 3.8,
      phoneNumberPrice: 3.8,
    },
    calculator: {
      minutesPerCurrencyUnit: 19,
    },
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    flagCode: "ae",
    currency: {
      code: "AED",
      symbol: "AED ",
      rateFractionDigits: 3,
      monthlyFractionDigits: 2,
      locale: "en-AE",
    },
    rates: {
      essential: 0.2,
      growth: 0.18,
      scale: 0.17,
      enterprise: null,
    },
    addons: {
      channelPrice: 18,
      phoneNumberPrice: 18,
    },
    calculator: {
      minutesPerCurrencyUnit: 4.1,
    },
  },
  {
    id: "ca",
    name: "Canada",
    flagCode: "ca",
    currency: {
      code: "CAD",
      symbol: "CA$",
      rateFractionDigits: 3,
      monthlyFractionDigits: 2,
      locale: "en-CA",
    },
    rates: {
      essential: 0.078,
      growth: 0.071,
      scale: 0.064,
      enterprise: null,
    },
    addons: {
      channelPrice: 6.96,
      phoneNumberPrice: 6.96,
    },
    calculator: {
      minutesPerCurrencyUnit: 11,
    },
  },
  {
    id: "au",
    name: "Australia",
    flagCode: "au",
    currency: {
      code: "AUD",
      symbol: "A$",
      rateFractionDigits: 3,
      monthlyFractionDigits: 2,
      locale: "en-AU",
    },
    rates: {
      essential: 0.080,
      growth: 0.073,
      scale: 0.065,
      enterprise: null,
    },
    addons: {
      channelPrice: 7.11,
      phoneNumberPrice: 7.11,
    },
    calculator: {
      minutesPerCurrencyUnit: 9.5,
    },
  },
] as const;

const PRICING_COUNTRY_MAP = new Map(PRICING_COUNTRIES.map((country) => [country.id, country]));

export function isPricingCountryId(value: string): value is PricingCountryId {
  return PRICING_COUNTRY_MAP.has(value as PricingCountryId);
}

export function getPricingCountry(countryId: string): PricingCountryDefinition {
  return PRICING_COUNTRY_MAP.get(countryId as PricingCountryId) ?? PRICING_COUNTRY_MAP.get(DEFAULT_PRICING_COUNTRY_ID)!;
}

export function formatCountryRatePerMinute(
  country: PricingCountryDefinition,
  rate: number,
): string {
  const formatted = rate.toLocaleString(country.currency.locale, {
    minimumFractionDigits: country.currency.rateFractionDigits,
    maximumFractionDigits: country.currency.rateFractionDigits,
  });

  return `${country.currency.symbol}${formatted}/min`;
}

export function formatPlanPriceForCountry(
  country: PricingCountryDefinition,
  planId: PricingPlan["id"],
): string {
  const override = country.priceLabels?.[planId as keyof PricingCountryRates];
  if (override) return override;

  if (planId === "enterprise") {
    return "Custom/min";
  }

  const rate = country.rates[planId as keyof Omit<PricingCountryRates, "enterprise">];
  return formatCountryRatePerMinute(country, rate);
}

export function buildPricingPlansForCountry(countryId: PricingCountryId): PricingPlan[] {
  const country = getPricingCountry(countryId);

  return PRICING_PLANS.map((plan) => ({
    ...plan,
    price: formatPlanPriceForCountry(country, plan.id),
  }));
}

export function getCountryCalculatorAddons(countryId: PricingCountryId) {
  const country = getPricingCountry(countryId);
  const formatAddon = (price: number) =>
    `${country.currency.symbol}${price.toLocaleString(country.currency.locale, {
      minimumFractionDigits: country.currency.monthlyFractionDigits,
      maximumFractionDigits: country.currency.monthlyFractionDigits,
    })}/mo each`;

  return {
    channels: {
      ...PRICING_CALCULATOR_ADDONS.channels,
      unitPrice: country.addons.channelPrice,
      unitLabel: formatAddon(country.addons.channelPrice),
    },
    numbers: {
      ...PRICING_CALCULATOR_ADDONS.numbers,
      unitPrice: country.addons.phoneNumberPrice,
      unitLabel: formatAddon(country.addons.phoneNumberPrice),
    },
  };
}

export function getCountryCalculatorRateForMinutes(
  country: PricingCountryDefinition,
  minutes: number,
): number {
  const tier = PRICING_PLAN_MINUTE_TIERS.find(
    (entry) => minutes >= entry.minMinutes && minutes <= entry.maxMinutes,
  );

  if (!tier) {
    return country.rates.scale;
  }

  return country.rates[tier.planId];
}

export function computeCountryCalculatorMonthlyPrice(
  countryId: PricingCountryId,
  {
    minutes,
    channels,
    numbers,
  }: {
    minutes: number;
    channels: number;
    numbers: number;
  },
): number {
  const country = getPricingCountry(countryId);
  const addonConfig = getCountryCalculatorAddons(countryId);
  const { minMinutes, maxMinutes } = PRICING_MINUTES_CALCULATOR;
  const clampedMinutes = Math.min(maxMinutes, Math.max(minMinutes, minutes));
  const clampedChannels = Math.min(
    addonConfig.channels.max,
    Math.max(addonConfig.channels.min, channels),
  );
  const clampedNumbers = Math.min(
    addonConfig.numbers.max,
    Math.max(addonConfig.numbers.min, numbers),
  );

  const ratePerMinute = getCountryCalculatorRateForMinutes(country, clampedMinutes);
  const usageCost = clampedMinutes * ratePerMinute;

  return (
    usageCost +
    clampedChannels * addonConfig.channels.unitPrice +
    clampedNumbers * addonConfig.numbers.unitPrice
  );
}

// function formatCountryMonthlyPrice(
//   country: PricingCountryDefinition,
//   amount: number,
// ): string {
//   return `${country.currency.symbol}${amount.toLocaleString(country.currency.locale, {
//     minimumFractionDigits: country.currency.monthlyFractionDigits,
//     maximumFractionDigits: country.currency.monthlyFractionDigits,
//   })}`;
// }

export function formatCountryAddonPrice(
  country: PricingCountryDefinition,
  amount: number,
): string {
  return `${country.currency.symbol}${amount.toLocaleString(country.currency.locale, {
    minimumFractionDigits: country.currency.monthlyFractionDigits,
    maximumFractionDigits: country.currency.monthlyFractionDigits,
  })}`;
}

export function getCountryAddonFeatures(country: PricingCountryDefinition): readonly string[] {
  return [
    `Concurrent Channels (${formatCountryAddonPrice(country, country.addons.channelPrice)})`,
    `Phone Numbers (${formatCountryAddonPrice(country, country.addons.phoneNumberPrice)})`,
    "Monthly valid credits",
  ] as const;
}

export function getCountryCreditsFootnote(country: PricingCountryDefinition): string {
  const creditRate = country.rates.essential.toLocaleString(country.currency.locale, {
    minimumFractionDigits: country.currency.rateFractionDigits,
    maximumFractionDigits: country.currency.rateFractionDigits,
  });

  return `After 1 month, unused credits will be charged at ${country.currency.symbol}${creditRate} credit per minute.`;
}

export type CountryPricingView = {
  country: PricingCountryDefinition;
  plans: PricingPlan[];
  addonFeatures: readonly string[];
  creditsFootnote: string;
};

export function buildCountryPricingView(countryId: PricingCountryId): CountryPricingView {
  const country = getPricingCountry(countryId);

  return {
    country,
    plans: buildPricingPlansForCountry(countryId),
    addonFeatures: getCountryAddonFeatures(country),
    creditsFootnote: getCountryCreditsFootnote(country),
  };
}

const LOCALE_REGION_MAP: Partial<Record<string, PricingCountryId>> = {
  US: "us",
  IN: "in",
  GB: "gb",
  AE: "ae",
  CA: "ca",
  AU: "au",
};

/** Best-effort default from browser locale when the user has not picked a country yet. */
export function detectDefaultPricingCountryId(): PricingCountryId {
  if (typeof navigator === "undefined") {
    return DEFAULT_PRICING_COUNTRY_ID;
  }

  const locale = navigator.language;
  const region = locale.split("-")[1]?.toUpperCase();

  if (region && LOCALE_REGION_MAP[region]) {
    return LOCALE_REGION_MAP[region]!;
  }

  return DEFAULT_PRICING_COUNTRY_ID;
}
