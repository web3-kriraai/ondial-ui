import type { Metadata } from "next";

import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomePricingSection } from "@/components/marketing/home-pricing-section";
import { PricingCalculator } from "@/components/marketing/pricing-calculator";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans and pricing for Ondial.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <HomePricingSection />
      <PricingCalculator />
      <HomeFaqSection />
    </main>
  );
}
