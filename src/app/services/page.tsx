import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  ServicesCapabilitiesSection,
  ServicesCountriesSection,
  ServicesFaqSection,
  ServicesFinalCtaSection,
  ServicesHeroSection,
  ServicesHowItWorksSection,
  ServicesIndustriesSection,
  ServicesWhyChooseSection,
} from "@/components/marketing/services-page-sections";
import StructuredData from "@/components/StructuredData";
import { SERVICES_FAQ } from "@/data/services-content";
import {
  buildBreadcrumbSchema,
  buildEnterpriseSoftwareApplicationSchema,
} from "@/lib/seo/schemaBuilders";

const SERVICES_META_TITLE = "AI Voice Call Automation Platform for Business | OnDial";
const SERVICES_META_DESCRIPTION =
  "Automate inbound and outbound calls with OnDial's AI voice call automation platform. Scale customer support, sales, and reminders across 20+ industries.";

export const metadata: Metadata = {
  title: { absolute: SERVICES_META_TITLE },
  description: SERVICES_META_DESCRIPTION,
  alternates: { canonical: "https://www.ondial.ai/services" },
  openGraph: {
    title: SERVICES_META_TITLE,
    description: SERVICES_META_DESCRIPTION,
    url: "https://www.ondial.ai/services",
    siteName: "OnDial",
    images: [
      {
        url: "https://www.ondial.ai/img/logo/og.png",
        width: 1200,
        height: 630,
        alt: "OnDial AI Voice Call Automation Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_META_TITLE,
    description: SERVICES_META_DESCRIPTION,
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const servicesSchemas = [
  (buildEnterpriseSoftwareApplicationSchema as any)({
    url: "/services",
    name: "OnDial AI Voice Call Automation",
    description: SERVICES_META_DESCRIPTION,
    featureList: [
      "Industry-specific AI call templates",
      "CRM and API integrations",
      "Real-time call analytics",
      "HIPAA, PCI DSS, and GDPR compliance",
      "Multilingual voice agents",
      "24/7 automated outbound and inbound calls",
    ],
  }),
  (buildBreadcrumbSchema as any)(
    [{ name: "Services", url: "/services" }],
    { anchorUrl: "/services" },
  ),
];

const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SERVICES_FAQ.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={[...servicesSchemas, servicesFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <ServicesHeroSection />
          <ServicesWhyChooseSection />
          <ServicesCapabilitiesSection />
          <ServicesIndustriesSection />
          <ServicesHowItWorksSection />
          <ServicesCountriesSection />
          <ServicesFaqSection />
          <ServicesFinalCtaSection />
        </BlogPageShell>
      </main>
    </>
  );
}
