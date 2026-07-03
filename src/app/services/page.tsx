import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  ServicesCountriesSection,
  ServicesFaqSection,
  ServicesFinalCtaSection,
  ServicesHeroSection,
  ServicesHowItWorksSection,
  ServicesIndustriesSection,
  ServicesWhyChooseSection,
} from "@/components/marketing/services-page-sections";
import StructuredData from "@/components/StructuredData";
import { SERVICES_FAQ, SERVICES_HERO } from "@/data/services-content";
import {
  buildBreadcrumbSchema,
  buildEnterpriseSoftwareApplicationSchema,
} from "@/lib/seo/schemaBuilders";

export const metadata: Metadata = {
  title: { absolute: "OnDial – Best AI Call Assistant | AI Voice Automation" },
  description: SERVICES_HERO.description,
  alternates: { canonical: "https://www.ondial.ai/services" },
  openGraph: {
    title: "OnDial – Best AI Call Assistant | AI Voice Automation",
    description: SERVICES_HERO.description,
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
    title: "OnDial - Best AI Call Assistant | AI Voice Automation",
    description: SERVICES_HERO.description,
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const servicesSchemas = [
  (buildEnterpriseSoftwareApplicationSchema as any)({
    url: "/services",
    name: "OnDial AI Voice Call Automation",
    description: SERVICES_HERO.description,
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
