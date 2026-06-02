import type { Metadata } from "next";

import { PricingCardsCarousel } from "@/components/marketing/pricing-cards-carousel";
import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { PricingCalculator } from "@/components/marketing/pricing-calculator";
import { PRICING_PLANS } from "@/data/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans and pricing for Ondial.",
};

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
          <PricingCardsCarousel
            cards={PRICING_PLANS.map(({ title, description, price, features }) => ({
              title,
              description,
              price,
              features,
            }))}
          />
        </div>
      </div>

      <PricingCalculator />
    </MarketingPageBody>
  );
}
