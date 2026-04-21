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
  "text-[13px] font-medium text-muted-foreground underline-offset-[3px] transition-colors hover:text-foreground hover:underline";

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
        "mt-auto w-full border-t border-border/60 bg-linear-to-b from-muted/25 to-muted/10",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="min-w-0 flex flex-col gap-1">
            <p className="text-[13px] font-semibold tracking-tight text-foreground">{brandLabel}</p>
            {description ? (
              <div className="max-w-md text-[12px] leading-relaxed text-muted-foreground">{description}</div>
            ) : null}
            <p className="text-[11px] leading-relaxed tracking-wide text-muted-foreground/95">
              © {showYear ? `${year} ` : ""}
              {brandLabel}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Legal" className="shrink-0">
            <ul className="flex flex-wrap items-center gap-x-0 gap-y-2 sm:justify-end">
              {links.map((item, i) => (
                <li key={item.href} className="flex items-center">
                  {i > 0 ? (
                    <span className="mx-2.5 select-none text-muted-foreground/35" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <Link href={item.href} prefetch className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {end ? (
          <div className="mt-5 flex flex-col gap-2 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
            {end}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
