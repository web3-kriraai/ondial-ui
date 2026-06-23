"use client";

import { DeferredSection } from "@/components/marketing/deferred-section";
import { HomeBelowFoldSections } from "@/components/marketing/home-below-fold-sections";

/** Below-fold homepage sections — mounted when scrolled near the viewport. */
export function HomePageBelowFold() {
  return (
    <DeferredSection minHeight="28rem" className="flex flex-col">
      <HomeBelowFoldSections />
    </DeferredSection>
  );
}
