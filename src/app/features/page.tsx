import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  FeaturesHubAnalyticsSection,
  FeaturesHubAutomationSection,
  FeaturesHubCapabilitiesSection,
  FeaturesHubCategoriesSection,
  FeaturesHubFaqSection,
  FeaturesHubFinalCtaSection,
  FeaturesHubHeroSection,
  FeaturesHubHowItWorksSection,
  FeaturesHubIndustriesSection,
  FeaturesHubIntegrationsSection,
  FeaturesHubNumbersSection,
  FeaturesHubOverviewSection,
  FeaturesHubPricingSection,
  FeaturesHubQuickAnswerSection,
  FeaturesHubSecuritySection,
} from "@/components/marketing/features-hub-page-sections";
import StructuredData from "@/components/StructuredData";
import { FEATURES_HUB_FAQ, FEATURES_HUB_META } from "@/data/features-hub-content";
import { buildBreadcrumbSchema, buildEnterpriseSoftwareApplicationSchema } from "@/lib/seo/schemaBuilders";

const { title: META_TITLE, description: META_DESCRIPTION, canonicalPath } = FEATURES_HUB_META;
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
        alt: "OnDial AI Voice Agent Features",
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

const featuresSchemas = [
  (buildEnterpriseSoftwareApplicationSchema as (input: object) => object)({
    url: canonicalPath,
    name: "OnDial Enterprise AI Voice Agent Platform",
    description: META_DESCRIPTION,
    featureList: [
      "AI conversation intelligence with intent detection and context memory",
      "100+ languages and 50+ regional accents",
      "Inbound and outbound call management with warm transfers",
      "Sales automation with CRM sync and lead qualification",
      "Customer support with knowledge base lookup and ticket creation",
      "Enterprise security: SOC 2, HIPAA, GDPR, PCI DSS, and ISO",
      "Live analytics, recordings, and custom reporting",
      "No-code workflows with CRM, calendar, and e-commerce integrations",
    ],
  }),
  (buildBreadcrumbSchema as (items: { name: string; url: string }[], opts?: { anchorUrl?: string }) => object)(
    [{ name: "Features", url: canonicalPath }],
    { anchorUrl: canonicalPath },
  ),
];

const featuresFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FEATURES_HUB_FAQ.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FeaturesPage() {
  return (
    <>
      <StructuredData data={[...featuresSchemas, featuresFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <FeaturesHubHeroSection />
          <FeaturesHubQuickAnswerSection />
          <FeaturesHubOverviewSection />
          <FeaturesHubCapabilitiesSection />
          <FeaturesHubCategoriesSection />
          <FeaturesHubIntegrationsSection />
          <FeaturesHubSecuritySection />
          <FeaturesHubAnalyticsSection />
          <FeaturesHubAutomationSection />
          <FeaturesHubIndustriesSection />
          <FeaturesHubNumbersSection />
          <FeaturesHubHowItWorksSection />
          <FeaturesHubPricingSection />
          <FeaturesHubFaqSection />
          <FeaturesHubFinalCtaSection />
        </BlogPageShell>
      </main>
    </>
  );
}
