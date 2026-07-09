import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  MultilingualHubBenefitsSection,
  MultilingualHubComparisonSection,
  MultilingualHubDeploymentSection,
  MultilingualHubFaqSection,
  MultilingualHubFeaturesSection,
  MultilingualHubFinalCtaSection,
  MultilingualHubHeroSection,
  MultilingualHubHowItWorksSection,
  MultilingualHubIndustryUseCasesSection,
  MultilingualHubIntegrationsSection,
  MultilingualHubLanguagesSection,
  MultilingualHubOverviewSection,
  MultilingualHubQuickAnswersSection,
  MultilingualHubSecuritySection,
  MultilingualHubStorySection,
} from "@/components/marketing/multilingual-hub-page-sections";
import StructuredData from "@/components/StructuredData";
import { MULTILINGUAL_HUB_FAQ, MULTILINGUAL_HUB_META } from "@/data/multilingual-hub-content";
import { buildBreadcrumbSchema, buildEnterpriseSoftwareApplicationSchema } from "@/lib/seo/schemaBuilders";

const { title: META_TITLE, description: META_DESCRIPTION, canonicalPath } = MULTILINGUAL_HUB_META;
const CANONICAL_URL = `https://www.ondial.ai${canonicalPath}`;

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "OnDial",
    images: [
      {
        url: "https://www.ondial.ai/img/logo/og.png",
        width: 1200,
        height: 630,
        alt: "OnDial Multilingual AI Voice Agent",
      },
    ],
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

const multilingualSchemas = [
  (buildEnterpriseSoftwareApplicationSchema as (input: object) => object)({
    url: canonicalPath,
    name: "OnDial Multilingual AI Voice Agent",
    description: META_DESCRIPTION,
    featureList: [
      "100+ language support with automatic detection",
      "Code-mixed speech understanding (Hinglish)",
      "Context-aware live agent handoff",
      "CRM and scheduling integrations",
      "HIPAA, GDPR, PCI DSS, SOC 2, and ISO compliance",
      "Under 200ms response latency",
    ],
  }),
  (buildBreadcrumbSchema as (items: { name: string; url: string }[], opts?: { anchorUrl?: string }) => object)(
    [{ name: "Multilingual AI Voice Agent", url: canonicalPath }],
    { anchorUrl: canonicalPath },
  ),
];

const multilingualFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MULTILINGUAL_HUB_FAQ.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function MultilingualAiVoiceAgentPage() {
  return (
    <>
      <StructuredData data={[...multilingualSchemas, multilingualFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <MultilingualHubHeroSection />
          <MultilingualHubQuickAnswersSection />
          <MultilingualHubOverviewSection />
          <MultilingualHubLanguagesSection />
          <MultilingualHubIndustryUseCasesSection />
          <MultilingualHubFeaturesSection />
          <MultilingualHubHowItWorksSection />
          <MultilingualHubBenefitsSection />
          <MultilingualHubComparisonSection />
          <MultilingualHubSecuritySection />
          <MultilingualHubIntegrationsSection />
          <MultilingualHubStorySection />
          <MultilingualHubFaqSection />
          <MultilingualHubDeploymentSection />
          <MultilingualHubFinalCtaSection />
        </BlogPageShell>
      </main>
    </>
  );
}
