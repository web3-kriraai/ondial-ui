import { HomeFeaturesSection } from "@/components/marketing/home-landing-sections";
import { HomeProblemSection } from "@/components/marketing/home-problem-section";
import { ComplianceTrustSection } from "@/components/marketing/compliance-trust-section";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomeTestimonialsSection } from "@/components/marketing/home-testimonials-section";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
// import { SocialProofLogosSection } from "@/components/marketing/social-proof-logos-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { SupportedLanguagesSection } from "@/components/marketing/supported-languages-section";

export default function HomePage() {
  return (
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
  );
}
