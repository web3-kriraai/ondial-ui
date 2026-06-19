import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomePricingSection } from "@/components/marketing/home-pricing-section";
import { PricingCalculatorSection } from "@/components/marketing/pricing-calculator-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans and pricing for OnDial.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogPageShell>
        <HomePricingSection />
        <PricingCalculatorSection />
        <HomeFaqSection transparentSurface />
      </BlogPageShell>
    </main>
  );
}
