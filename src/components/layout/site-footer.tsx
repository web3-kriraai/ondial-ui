import type { ReactNode } from "react";

import { LazyMarketingFooter } from "@/components/layout/lazy-marketing-footer";
import { cn } from "@/lib/utils";

export type FooterLinkItem = {
  href: string;
  label: string;
};

/** @deprecated Use config in `@/config/footer` - kept for API compatibility. */
export type SiteFooterProps = {
  brandLabel?: string;
  description?: ReactNode;
  links?: readonly FooterLinkItem[];
  end?: ReactNode;
  showYear?: boolean;
  className?: string;
  showCtaCard?: boolean;
};

export function SiteFooter({ className, showCtaCard = true }: SiteFooterProps) {
  return <LazyMarketingFooter className={cn(className)} showCtaCard={showCtaCard} />;
}
