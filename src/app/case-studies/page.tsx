import type { Metadata } from "next";

import { CaseStudyCustomerSuccessGridSection } from "@/components/marketing/case-study-customer-success-grid-section";
import { CaseStudyFeaturedStorySection } from "@/components/marketing/case-study-featured-story-section";
import { CaseStudyHeroSection } from "@/components/marketing/case-study-hero-section";
import { CaseStudyIndustryFilterSection } from "@/components/marketing/case-study-industry-filter-section";
import { CaseStudyRoiCalculatorSection } from "@/components/marketing/case-study-roi-calculator-section";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real businesses, real conversations, real growth — see how teams automate calls and scale support with OnDial.",
};

export default function CaseStudiesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <CaseStudyHeroSection />
      <CaseStudyFeaturedStorySection />
      <CaseStudyCustomerSuccessGridSection />
      <CaseStudyRoiCalculatorSection />
      <CaseStudyIndustryFilterSection />
    </main>
  );
}
