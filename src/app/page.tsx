import {
  HomeFeaturesSection,
  HomeProblemSection,
} from "@/components/marketing/home-landing-sections";
import { HomeTestimonialsSection } from "@/components/marketing/home-testimonials-section";
import { HomePricingSection } from "@/components/marketing/home-pricing-section";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { SocialProofLogosSection } from "@/components/marketing/social-proof-logos-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { SupportedLanguagesSection } from "@/components/marketing/supported-languages-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <ShowcaseSection />
      <SocialProofLogosSection />
      <HomeProblemSection />
      <HomeFeaturesSection />
      <IntegrationsSection />
      <SupportedLanguagesSection />
      <HomePricingSection />
      <HomeTestimonialsSection />
    </main>
  );
}
