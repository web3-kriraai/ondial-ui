import { MarketingSiteFooter } from "@/components/layout/marketing-site-footer";

type LazyMarketingFooterProps = {
  className?: string;
  showCtaCard?: boolean;
};

/** Footer in initial HTML — important for crawlers, internal links, and View Source. */
export function LazyMarketingFooter({ className, showCtaCard = true }: LazyMarketingFooterProps) {
  return <MarketingSiteFooter className={className} showCtaCard={showCtaCard} />;
}
