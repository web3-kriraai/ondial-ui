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
    <footer className={cn("mt-auto w-full border-t border-border bg-muted/30", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="flex max-w-md flex-col gap-2">
            <p className="text-sm font-medium text-foreground">{brandLabel}</p>
            {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
          </div>

          <nav aria-label="Legal" className="flex flex-col gap-3 sm:items-end">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Legal</p>
            <ul className="flex flex-row flex-wrap gap-x-4 gap-y-2 sm:justify-end">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch
                    className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {end ? (
          <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">{end}</div>
        ) : null}

        <p className="text-xs text-muted-foreground">
          © {showYear ? `${year} ` : ""}
          {brandLabel}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
