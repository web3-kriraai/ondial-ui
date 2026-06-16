import type { Metadata } from "next";

import { AboutCtaSection } from "@/components/marketing/about-cta-section";
import { AboutHeroSection } from "@/components/marketing/about-hero-section";
import { AboutMissionSection } from "@/components/marketing/about-mission-section";
import { AboutWhatWeDoSection } from "@/components/marketing/about-what-we-do-section";
import { AboutWhyChooseSection } from "@/components/marketing/about-why-choose-section";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";


export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ondial.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutWhatWeDoSection />
      <AboutWhyChooseSection />
      <AboutCtaSection />
      <HomeFaqSection />
    </main>
  );
}
