import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomePricingSection } from "@/components/marketing/home-pricing-section";
import { PricingCalculatorSection } from "@/components/marketing/pricing-calculator-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial AI Pricing – Flexible Plans for Every Business" },
  description:
    "Explore OnDial's flexible pricing plans for AI voice agents. Choose the right plan for your business size and scale effortlessly.",
  alternates: { canonical: "https://www.ondial.ai/pricing" },
  openGraph: {
    title: "OnDial AI Pricing – Flexible Plans for Every Business",
    description:
      "Explore OnDial's flexible pricing plans for AI voice agents. Choose the right plan for your business size and scale effortlessly.",
    url: "https://www.ondial.ai/pricing",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Pricing" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial AI Pricing – Flexible Plans for Every Business",
    description:
      "Explore OnDial's flexible pricing plans for AI voice agents. Choose the right plan for your business size and scale effortlessly.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogPageShell>
        <HomePricingSection />
        <PricingCalculatorSection />
        <HomeFaqSection pageKey="pricing" transparentSurface />
      </BlogPageShell>
    </main>
  );
}
