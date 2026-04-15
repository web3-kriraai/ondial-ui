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
      <div className="flex relative min-h-full flex-1 flex-col overflow-x-clip overflow-y-visible rounded-2xl bg-background text-foreground shadow-sm">
      <div className="absolute z-50 h-22 w-52 overflow-hidden bg-black">
        <div className="absolute right-[12.5%] top-[21.3%] z-2 h-10 w-1/6 rounded-br-[20px]  bg-black" />
        <div className="absolute right-[12.5%] top-[21.3%] z-1 h-10 w-1/6 rounded-tl-[20px] bg-white" />
        <div className="absolute inset-y-0 right-0 w-1/8 rounded-br-[30px] rounded-tl-[20px] bg-white" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 rounded-tl-[20px] bg-white" />
      </div>
        {nav}
        <main id="main-content" className="relative z-0 flex min-h-0 flex-1 flex-col outline-none" tabIndex={-1}>
          {children}
        </main>
        {foot}
      </div>
    </div>
  );
}
