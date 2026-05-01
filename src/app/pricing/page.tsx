import type { Metadata } from "next";
import Link from "next/link";

import { PricingCardsCarousel } from "@/components/marketing/pricing-cards-carousel";
import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { PricingCalculator } from "@/components/marketing/pricing-calculator";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans and pricing for Ondial.",
};

type PricingCardProps = {
  title: "Essential" | "Growth" | "Scale" | "Enterprise";
  description: string;
  price: `${string}/min`;
  features: [string, string, string];
};

const pricingCards: PricingCardProps[] = [
  {
    title: "Essential",
    description: "Perfect for small businesses",
    price: "$0.055/min",
    features: ["Up to 3 users", "Basic analytics", "Email support"],
  },
  {
    title: "Growth",
    description: "Ideal for growing businesses",
    price: "$0.05/min",
    features: ["Up to 15 users", "Advanced analytics", "Priority support"],
  },
  {
    title: "Scale",
    description: "For enterprise customers",
    price: "$0.45/min",
    features: ["Unlimited users", "Custom integrations", "Dedicated success manager"],
  },
  {
    title: "Enterprise",
    description: "For high-volume enterprises",
    price: "$Custom/min",
    features: ["Unlimited users", "AI call routing", "24/7 premium support"],
  },
];

export default function PricingPage() {
  return (
    <MarketingPageBody
      title={
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground justify-center">
          Pricing
        </h1>
      }
      description={
        <Text3DFlip 
          animateOnMount 
          rotateDirection="top" 
          staggerDuration={0.02} 
          className="text-pretty text-muted-foreground justify-center"
        >
          Choose the plan that fits your team's stage and scale.
        </Text3DFlip>
      }
    >
      <div className="w-full lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-8 xl:px-12">
        <div className="w-full lg:mx-auto lg:max-w-[1400px]">
          <PricingCardsCarousel cards={pricingCards} />
        </div>
      </div>

      <PricingCalculator />
    </MarketingPageBody>
  );
}