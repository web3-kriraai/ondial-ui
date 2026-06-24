import type { Metadata } from "next";
import { HomeFeaturesSection } from "@/components/marketing/home-features-section";
import { HomeProblemSection } from "@/components/marketing/home-problem-section";
import { ComplianceTrustSection } from "@/components/marketing/compliance-trust-section";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomeTestimonialsSection } from "@/components/marketing/home-testimonials-section";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
// import { SocialProofLogosSection } from "@/components/marketing/social-proof-logos-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { SupportedLanguagesSection } from "@/components/marketing/supported-languages-section";
import StructuredData from "@/components/StructuredData";
import { buildWebPageSchema } from "@/lib/seo/schemaBuilders";
import { SITE_URL } from "@/lib/seo/siteConfig";
import { getSiteFaqSection } from "@/data/site-faqs";

export const metadata: Metadata = {
  title: { absolute: "Best AI Voice Agents to Automate Your Phone Calls | OnDial" },
  description:
    "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
  alternates: { canonical: "https://www.ondial.ai/" },
  openGraph: {
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description:
      "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    url: "https://www.ondial.ai/",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial AI Voice Agents" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description:
      "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const homePageSchema = (buildWebPageSchema as any)({
  url: "/",
  type: "WebPage",
  name: "OnDial - AI Voice Agents for Phone Call Automation",
  description:
    "Discover OnDial's AI Voice Agents - multilingual, 24/7 phone call automation for inbound and outbound business communication.",
  image: `${SITE_URL}/img/logo/og.png`,
});

const homeFaq = getSiteFaqSection("home");
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={[homePageSchema, homeFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <ShowcaseSection />
        {/* <SocialProofLogosSection /> */}
        <HomeProblemSection />
        <HomeFeaturesSection />
        <ComplianceTrustSection />
        <IntegrationsSection />
        <SupportedLanguagesSection />
        <HomeTestimonialsSection />
        <HomeFaqSection />
      </main>
    </>
  );
}
