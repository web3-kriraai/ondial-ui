import { HomeHero } from "@/components/marketing/home-hero";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import ServicesSlider from "@/components/marketing/services-slider";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* <HomeHero /> */}
      <ShowcaseSection />
      <ServicesSlider />
    </main>
  );
}
