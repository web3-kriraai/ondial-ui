import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";

type SiteShellProps = {
  children: ReactNode;
  /**
   * Primary navigation. Defaults to `SiteNavbar` (links from `MAIN_NAV`).
   * Pass `null` to render no bar, or your own header (must include a landmark if you replace it).
   */
  header?: ReactNode | null;
  /**
   * Page footer. Defaults to `SiteFooter` (legal links from `FOOTER_LEGAL_LINKS`).
   * Pass `null` to hide.
   */
  footer?: ReactNode | null;
};

export function SiteShell({ children, header, footer }: SiteShellProps) {
  const nav = header === null ? null : header === undefined ? <SiteNavbar /> : header;
  const foot = footer === null ? null : footer === undefined ? <SiteFooter /> : footer;

  return (
    <div className="box-border flex min-h-0 flex-1 flex-col p-2 sm:p-3 lg:p-4">
      <div className="flex min-h-0 min-h-full flex-1 flex-col overflow-x-clip overflow-y-visible rounded-2xl border border-border/80 bg-background text-foreground shadow-sm">
        {nav}
        <main id="main-content" className="relative z-0 flex min-h-0 flex-1 flex-col outline-none" tabIndex={-1}>
          {children}
        </main>
        {foot}
      </div>
    </div>
  );
}
