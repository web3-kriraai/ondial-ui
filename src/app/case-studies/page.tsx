import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { CaseStudyCtaSection } from "@/components/marketing/case-study-cta-section";
import { CaseStudyHeroSection } from "@/components/marketing/case-study-hero-section";
import { CaseStudyQuoteSection } from "@/components/marketing/case-study-quote-section";
import { CaseStudyStoriesSection } from "@/components/marketing/case-study-stories-section";
import { CaseStudyTickerSection } from "@/components/marketing/case-study-ticker-section";
import StructuredData from "@/components/StructuredData";
import {
  buildCaseStudiesHubSchemas,
  CASE_STUDIES_HUB_META,
} from "@/lib/seo/caseStudyPageSchemas";

const { title: META_TITLE, description: META_DESCRIPTION } = CASE_STUDIES_HUB_META;

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: "https://www.ondial.ai/case-studies" },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: "https://www.ondial.ai/case-studies",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Case Studies" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <StructuredData data={buildCaseStudiesHubSchemas()} />
      <MarketingDottedPageShell>
        <main className="flex flex-1 flex-col">
          <CaseStudyHeroSection />
          <CaseStudyTickerSection />
          <CaseStudyQuoteSection />
          <CaseStudyStoriesSection />
          <CaseStudyCtaSection />
        </main>
      </MarketingDottedPageShell>
    </>
  );
}
