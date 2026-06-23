"use client";

import { DeferredSection } from "@/components/marketing/deferred-section";
import { MarketingSiteFooter } from "@/components/layout/marketing-site-footer";

type LazyMarketingFooterProps = {
  className?: string;
  showCtaCard?: boolean;
};

/** Footer mounts when it nears the viewport. */
export function LazyMarketingFooter({ className, showCtaCard = true }: LazyMarketingFooterProps) {
  return (
    <DeferredSection minHeight="20rem">
      <MarketingSiteFooter className={className} showCtaCard={showCtaCard} />
    </DeferredSection>
  );
}
