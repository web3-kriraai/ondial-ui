import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  EnterpriseComparisonSection,
  EnterpriseComplianceSection,
  EnterpriseDeploymentSection,
  EnterpriseFaqSection,
  EnterpriseFinalCtaSection,
  EnterpriseHeroSection,
  EnterpriseHowItWorksSection,
  EnterpriseUseCasesSection,
  EnterpriseWhyChooseSection,
  EnterpriseShiftSection,
  EnterpriseIntegrationsSection,
  EnterprisePricingSection,
} from "@/components/marketing/enterprise-page-sections";
import StructuredData from "@/components/StructuredData";
import {
  buildEnterpriseSoftwareApplicationSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schemaBuilders";
import { ENTERPRISE_FAQ } from "@/data/enterprise-content";

export const metadata: Metadata = {
  title: { absolute: "OnDial for Enterprise – Scalable AI Voice Agents" },
  description:
    "Enterprise AI voice agents automate customer calls, reduce operational costs, improve response times, and deliver secure, scalable AI solutions for businesses.",
  alternates: { canonical: "https://www.ondial.ai/ondial-for-enterprise" },
  openGraph: {
    title: "OnDial for Enterprise – Scalable AI Voice Agents",
    description:
      "Enterprise AI voice agents automate customer calls, reduce operational costs, improve response times, and deliver secure, scalable AI solutions for businesses.",
    url: "https://www.ondial.ai/ondial-for-enterprise",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Enterprise" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial for Enterprise – Scalable AI Voice Agents",
    description:
      "Enterprise AI voice agents automate customer calls, reduce operational costs, improve response times, and deliver secure, scalable AI solutions for businesses.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const enterpriseSchemas = [
  buildEnterpriseSoftwareApplicationSchema({
    url: "/ondial-for-enterprise",
    name: "OnDial for Enterprise",
  }),
  (buildBreadcrumbSchema as any)(
    [
      { name: "Solutions", url: "/services" },
      { name: "OnDial for Enterprise", url: "/ondial-for-enterprise" },
    ],
    { anchorUrl: "/ondial-for-enterprise" }
  ),
];

const enterpriseFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ENTERPRISE_FAQ.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function OndialForEnterprisePage() {
  return (
    <>
      <StructuredData data={[...enterpriseSchemas, enterpriseFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <EnterpriseHeroSection />
          <EnterpriseShiftSection />
          <EnterpriseWhyChooseSection />
          <EnterpriseHowItWorksSection />
          <EnterpriseUseCasesSection />
          <EnterpriseComplianceSection />
          <EnterpriseIntegrationsSection />
          <EnterpriseComparisonSection />
          <EnterpriseDeploymentSection />
          <EnterprisePricingSection />
          <EnterpriseFaqSection />
          <EnterpriseFinalCtaSection />
        </BlogPageShell>
      </main>
    </>
  );
}
