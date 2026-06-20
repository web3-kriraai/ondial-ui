import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { CaseStudyCtaSection } from "@/components/marketing/case-study-cta-section";
import { CaseStudyHeroSection } from "@/components/marketing/case-study-hero-section";
import { CaseStudyQuoteSection } from "@/components/marketing/case-study-quote-section";
import { CaseStudyStoriesSection } from "@/components/marketing/case-study-stories-section";
import { CaseStudyTickerSection } from "@/components/marketing/case-study-ticker-section";

export const metadata: Metadata = {
  title: { absolute: "AI Voice Agent Case Studies & Success Stories | OnDial" },
  description:
    "Real businesses, real conversations, real growth — see how teams automate calls and scale support with OnDial AI voice agents.",
  alternates: { canonical: "https://www.ondial.ai/case-studies" },
  openGraph: {
    title: "AI Voice Agent Case Studies & Success Stories | OnDial",
    description:
      "Real businesses, real conversations, real growth — see how teams automate calls and scale support with OnDial AI voice agents.",
    url: "https://www.ondial.ai/case-studies",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Case Studies" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agent Case Studies & Success Stories | OnDial",
    description:
      "Real businesses, real conversations, real growth — see how teams automate calls and scale support with OnDial AI voice agents.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

export default function CaseStudiesPage() {
  return (
    <MarketingDottedPageShell>
      <main className="flex flex-1 flex-col">
        <CaseStudyHeroSection />
        <CaseStudyTickerSection />
        <CaseStudyQuoteSection />
        <CaseStudyStoriesSection />
        <CaseStudyCtaSection />
      </main>
    </MarketingDottedPageShell>
  );
}