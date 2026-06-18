export type PricingPlan = {
  id: string;
  title: string;
  description: string;
  price: string;
  features: readonly string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: "essential",
    title: "Essential",
    description: "Perfect for small businesses",
    price: "$0.055/min",
    features: ["Up to 3 users", "Basic analytics", "Email support"],
    ctaHref: "/contact",
  },
  {
    id: "growth",
    title: "Growth",
    description: "Ideal for growing businesses",
    price: "$0.05/min",
    features: ["Up to 15 users", "Advanced analytics", "Priority support"],
    ctaHref: "/contact",
  },
  {
    id: "scale",
    title: "Scale",
    description: "For enterprise customers",
    price: "$0.45/min",
    features: ["Unlimited users", "Custom integrations", "Dedicated success manager"],
    ctaHref: "/contact",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For high-volume enterprises",
    price: "$Custom/min",
    features: ["Unlimited users", "AI call routing", "24/7 premium support"],
    ctaHref: "/contact",
  },
] as const;

export const HOME_PRICING_HEADING = {
  eyebrow: "Pricing",
  title: "Plans that scale with you",
  description:
    "Whether you're piloting your first voice agent or running thousands of calls a day we've got a plan that fits your workflow.",
} as const;

export const PRICING_CALCULATOR_HEADING = {
  eyebrow: "Cost calculator",
  title: "Calculate your call cost",
  description: "Use our calculator to get a transparent breakdown based on your needs.",
} as const;
