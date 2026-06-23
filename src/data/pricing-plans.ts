import { DASHBOARD_SIGNUP_URL } from "@/config/urls";

export type PricingPlan = {
  id: string;
  title: string;
  description: string;
  price: string;
  features: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export const PRICING_PLAN_MINUTE_TIERS = [
  { planId: "essential", minMinutes: 0, maxMinutes: 10_000 },
  { planId: "growth", minMinutes: 10_001, maxMinutes: 25_000 },
  { planId: "scale", minMinutes: 25_001, maxMinutes: 100_000 },
] as const;

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: "essential",
    title: "Essential",
    description: "For small businesses",
    price: "$0.055/min",
    features: ["0 - 10,000 minutes"],
    ctaHref: DASHBOARD_SIGNUP_URL,
    ctaLabel: "Start Free Trial",
  },
  {
    id: "growth",
    title: "Growth",
    description: "For growing businesses",
    price: "$0.050/min",
    features: ["10,001 - 25,000 minutes"],
    ctaHref: DASHBOARD_SIGNUP_URL,
    ctaLabel: "Start Free Trial",
  },
  {
    id: "scale",
    title: "Scale",
    description: "For enterprise customers",
    price: "$0.045/min",
    features: ["25,001 - 100,000 minutes"],
    ctaHref: DASHBOARD_SIGNUP_URL,
    ctaLabel: "Start Free Trial",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For large-scale businesses",
    price: "Custom/min",
    features: [
      "For high-volume usage, contact our sales team for custom pricing.",
    ],
    ctaHref: "/contact",
    ctaLabel: "Contact Sales",
  },
] as const;

export function getPricingPlanForMinutes(minutes: number): PricingPlan {
  const tier = PRICING_PLAN_MINUTE_TIERS.find(
    (entry) => minutes >= entry.minMinutes && minutes <= entry.maxMinutes,
  );

  if (tier) {
    const plan = PRICING_PLANS.find((entry) => entry.id === tier.planId);
    if (plan) return plan;
  }

  return PRICING_PLANS.find((entry) => entry.id === "enterprise") ?? PRICING_PLANS[0]!;
}

export const HOME_PRICING_HEADING = {
  eyebrow: "Pricing",
  title: "Plans that scale with you",
  description:
    "Whether you're piloting your first voice agent or running thousands of calls a day, we've got a plan that fits your workflow.",
} as const;

export const PRICING_CALCULATOR_HEADING = {
  eyebrow: "Cost calculator",
  title: "Calculate your call cost",
  description: "Use our calculator to get a transparent breakdown based on your needs.",
} as const;

export const PRICING_MINUTES_CALCULATOR = {
  title: "Pay only for what you automate",
  descriptionLines: [
    "This pricing scales as your automations do. No surprises – just usage.",
    "Use the slider to preview your monthly cost. Custom pricing available.",
  ],
  minMinutes: 0,
  maxMinutes: 100_000,
  defaultMinutes: 85700,
  step: 100,
  /** Minutes included per US dollar of usage. */
  minutesPerDollar: 15,
} as const;

export const PRICING_CALCULATOR_ADDONS = {
  channels: {
    label: "Concurrent channels",
    unitLabel: "$4.90/mo each",
    unitPrice: 4.9,
    min: 0,
    max: 20,
    default: 1,
  },
  numbers: {
    label: "Phone numbers",
    unitLabel: "$4.90/mo each",
    unitPrice: 4.9,
    min: 0,
    max: 10,
    default: 1,
  },
} as const;

export function computeMinutesMonthlyPrice(minutes: number): number {
  const { minMinutes, maxMinutes, minutesPerDollar } = PRICING_MINUTES_CALCULATOR;
  const clampedMinutes = Math.min(maxMinutes, Math.max(minMinutes, minutes));
  return clampedMinutes / minutesPerDollar;
}

export function computeCalculatorMonthlyPrice({
  minutes,
  channels,
  numbers,
}: {
  minutes: number;
  channels: number;
  numbers: number;
}): number {
  const { channels: channelConfig, numbers: numberConfig } = PRICING_CALCULATOR_ADDONS;
  const clampedChannels = Math.min(
    channelConfig.max,
    Math.max(channelConfig.min, channels),
  );
  const clampedNumbers = Math.min(numberConfig.max, Math.max(numberConfig.min, numbers));

  return (
    computeMinutesMonthlyPrice(minutes) +
    clampedChannels * channelConfig.unitPrice +
    clampedNumbers * numberConfig.unitPrice
  );
}

/** @deprecated Use computeMinutesMonthlyPrice */
export function computeCreditMonthlyPrice(minutes: number): number {
  return computeMinutesMonthlyPrice(minutes);
}
