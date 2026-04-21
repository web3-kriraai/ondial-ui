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

  /** Pulls main under the sticky header so page bg starts at the top; padding keeps content below the bar. */
  const mainOverlap = "mt-[calc(-1*(env(safe-area-inset-top)+5.5rem))]";

  return (
    <div className="box-border flex h-dvh min-h-0 flex-col bg-black p-2 sm:p-3 lg:p-4">
      <div className="relative flex h-full min-h-0 flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-background text-foreground shadow-[0_24px_64px_-24px_rgba(0,0,0,0.45)] scroll-smooth">
        <div className="sticky top-0 z-60 w-full shrink-0">
          {/* Corner notch — sits above main so content can extend underneath */}
          <svg
            width="180"
            height="90"
            viewBox="240 100 180 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            className="pointer-events-none absolute  -left-px -top-px z-50"
            aria-hidden
          >
            
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M400 100 Q380 100 380 120 V140 Q380 160 360 160 L260 160 Q240 160 240 180 V100 Z"
              fill="black"
              stroke="black"
              strokeWidth="2"
            />
            <image
              href="/white-text-logo.svg"
              x="255"
              y="115"
              width="120"
              height="33"
            />
          </svg>
          {nav}
        </div>
        <main
          id="main-content"
          className={`relative z-0 flex min-h-0 flex-1 flex-col outline-none ${mainOverlap}`}
          tabIndex={-1}
        >
          {children}
        </main>
        {foot}
      </div>
    </div>
  );
}
