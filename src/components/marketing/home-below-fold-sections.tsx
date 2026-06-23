"use client";

import { ComplianceTrustSection } from "@/components/marketing/compliance-trust-section";
import { DeferredSection } from "@/components/marketing/deferred-section";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomeFeaturesSection } from "@/components/marketing/home-features-section";
import { HomeTestimonialsSection } from "@/components/marketing/home-testimonials-section";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { SupportedLanguagesSection } from "@/components/marketing/supported-languages-section";

export function HomeBelowFoldSections() {
  return (
    <>
      <DeferredSection minHeight="28rem">
        <HomeFeaturesSection />
      </DeferredSection>
      <DeferredSection minHeight="22rem">
        <ComplianceTrustSection />
      </DeferredSection>
      <DeferredSection minHeight="24rem">
        <IntegrationsSection />
      </DeferredSection>
      <DeferredSection minHeight="26rem">
        <SupportedLanguagesSection />
      </DeferredSection>
      <DeferredSection minHeight="28rem">
        <HomeTestimonialsSection />
      </DeferredSection>
      <DeferredSection minHeight="20rem">
        <HomeFaqSection />
      </DeferredSection>
    </>
  );
}
