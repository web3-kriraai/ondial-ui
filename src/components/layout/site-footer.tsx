import Link from "next/link";
import type { ReactNode } from "react";

import { FOOTER_LEGAL_LINKS } from "@/config/footer";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type FooterLinkItem = {
  href: string;
  label: string;
};

export type SiteFooterProps = {
  brandLabel?: string;
  /** Optional line under the brand (string or custom node). */
  description?: ReactNode;
  /** Defaults to `FOOTER_LEGAL_LINKS` from `@/config/footer`. */
  links?: readonly FooterLinkItem[];
  /** Optional full-width block above the copyright (e.g. social row). */
  end?: ReactNode;
  showYear?: boolean;
  className?: string;
};

const linkClass =
  "font-medium text-muted-foreground underline-offset-[3px] transition-colors hover:text-foreground hover:underline";

export function SiteFooter({
  brandLabel = APP_NAME,
  description,
  links = FOOTER_LEGAL_LINKS,
  end,
  showYear = true,
  className,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        /* Solid base so nothing from `main` shows through if gaps ever align oddly; stays in document flow. */
        "relative z-0 mt-10 w-full shrink-0 rounded-b-2xl border-b border-border/30 border-t border-border/50 bg-background md:mt-6",
        "pb-[max(0.35rem,env(safe-area-inset-bottom,0px))]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-3 py-0.5 sm:px-6 sm:py-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div className="min-w-0 flex flex-col items-center gap-0 text-center sm:flex-row sm:items-baseline sm:gap-x-2 sm:gap-y-0 sm:text-left">
            <p className="text-[11px] font-semibold tracking-tight text-foreground sm:text-[12px]">{brandLabel}</p>
            {description ? (
              <div className="max-w-md text-[10px] leading-snug text-muted-foreground sm:text-[11px]">{description}</div>
            ) : null}
            <p className="text-[9px] leading-snug tracking-wide text-muted-foreground/90 sm:text-[10px]">
              © {showYear ? `${year} ` : ""}
              {brandLabel}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Legal" className="min-w-0 sm:shrink-0">
            <ul className="flex flex-row flex-wrap items-center justify-center gap-y-0.5 sm:justify-end">
              {links.map((item, i) => (
                <li key={item.href} className="flex items-center">
                  {i > 0 ? (
                    <span className="mx-1 select-none text-muted-foreground/35 sm:mx-1.5" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <Link
                    href={item.href}
                    prefetch
                    className={cn(
                      linkClass,
                      "text-[11px] sm:text-[12px]",
                      "inline-flex min-h-8 items-center py-0 sm:min-h-0 sm:py-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {end ? (
          <div className="mt-1.5 flex flex-col gap-1.5 border-t border-border/40 pt-1.5 sm:flex-row sm:items-center sm:justify-between">
            {end}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
