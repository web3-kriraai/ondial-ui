import type { ReactNode } from "react";

import { MarketingSiteFooter } from "@/components/layout/marketing-site-footer";
import { cn } from "@/lib/utils";

export type FooterLinkItem = {
  href: string;
  label: string;
};

/** @deprecated Use config in `@/config/footer` — kept for API compatibility. */
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
  return <MarketingSiteFooter className={cn(className)} showCtaCard={showCtaCard} />;
}
