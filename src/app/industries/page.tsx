import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  IndustriesHubAdaptationSection,
  IndustriesHubChallengesSection,
  IndustriesHubComparisonSection,
  IndustriesHubFaqSection,
  IndustriesHubFeaturesSection,
  IndustriesHubFinalCtaSection,
  IndustriesHubHeroSection,
  IndustriesHubIntroSection,
  IndustriesHubResourcesSection,
  IndustriesHubSecuritySection,
  IndustriesHubSolutionsSection,
  IndustriesHubStoriesSection,
  IndustriesHubTrustedSection,
  IndustriesHubUseCasesSection,
  IndustriesHubWhyChooseSection,
  IndustriesHubWhyWorkSection,
} from "@/components/marketing/industries-hub-page-sections";
import StructuredData from "@/components/StructuredData";
import { INDUSTRIES_HUB_FAQ, INDUSTRIES_HUB_META } from "@/data/industries-hub-content";
import { buildBreadcrumbSchema, buildEnterpriseSoftwareApplicationSchema } from "@/lib/seo/schemaBuilders";

const { title: META_TITLE, description: META_DESCRIPTION } = INDUSTRIES_HUB_META;

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: "https://www.ondial.ai/industries" },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: "https://www.ondial.ai/industries",
    siteName: "OnDial",
    images: [
      {
        url: "https://www.ondial.ai/img/logo/og.png",
        width: 1200,
        height: 630,
        alt: "OnDial AI Voice Agents for Every Industry",
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

const industriesHubSchemas = [
  (buildEnterpriseSoftwareApplicationSchema as (input: object) => object)({
    url: "/industries",
    name: "OnDial AI Voice Agents for Every Industry",
    description: META_DESCRIPTION,
    featureList: [
      "Industry-specific AI voice workflows",
      "Inbound and outbound call automation",
      "Appointment scheduling and lead qualification",
      "CRM integration and call analytics",
      "100+ language support",
      "Enterprise security and compliance",
    ],
  }),
  (buildBreadcrumbSchema as (items: { name: string; url: string }[], opts?: { anchorUrl?: string }) => object)(
    [{ name: "Industries", url: "/industries" }],
    { anchorUrl: "/industries" },
  ),
];

const industriesHubFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: INDUSTRIES_HUB_FAQ.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function IndustriesHubPage() {
  return (
    <>
      <StructuredData data={[...industriesHubSchemas, industriesHubFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <IndustriesHubHeroSection />
          <IndustriesHubTrustedSection />
          <IndustriesHubIntroSection />
          <IndustriesHubSolutionsSection />
          <IndustriesHubWhyWorkSection />
          <IndustriesHubChallengesSection />
          <IndustriesHubUseCasesSection />
          <IndustriesHubFeaturesSection />
          <IndustriesHubComparisonSection />
          <IndustriesHubAdaptationSection />
          <IndustriesHubSecuritySection />
          <IndustriesHubStoriesSection />
          <IndustriesHubWhyChooseSection />
          <IndustriesHubFaqSection />
          <IndustriesHubResourcesSection />
          <IndustriesHubFinalCtaSection />
        </BlogPageShell>
      </main>
    </>
  );
}
