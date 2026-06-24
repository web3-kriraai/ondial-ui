"use client";

import type { ReactNode, Ref } from "react";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { APP_NAME } from "@/lib/constants";
import { ShellBottomBlur } from "@/components/layout/shell-bottom-blur";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  children: ReactNode;
  /**
   * Primary navigation (e.g. `<SiteNavbar />` from `app-layout-shell`).
   * Pass `null` to render no bar, or your own header (must include a landmark if you replace it).
   */
  header?: ReactNode | null;
  /**
   * Page footer. Defaults to `SiteFooter` (legal links from `FOOTER_LEGAL_LINKS`).
   * Pass `null` to hide.
   */
  footer?: ReactNode | null;
  /** Merged onto `<main>` (e.g. column flex for page/auth children). */
  mainClassName?: string;
  /** Merged onto the inner scroll card (e.g. route-specific surface color). */
  scrollerClassName?: string;
  /** Ref to the rounded card’s scroll container (e.g. scroll reset on client navigation). */
  shellScrollerRef?: Ref<HTMLDivElement>;
  /** Login split: main bleeds under nav without extra top padding (layout handles offsets). */
  bleedUnderNav?: boolean;
  /** Overlay UI anchored to the shell scroll container (e.g. custom scrollbar). */
  scrollIndicator?: ReactNode;
  /** Feathered bottom blur for footer reveal - disable on long-form reading pages. */
  bottomBlurEnabled?: boolean;
};

export function SiteShell({
  children,
  header,
  footer,
  mainClassName,
  scrollerClassName,
  shellScrollerRef,
  bleedUnderNav = false,
  scrollIndicator,
  bottomBlurEnabled = true,
}: SiteShellProps) {
  const nav = header ?? null;
  const foot = footer === null ? null : footer === undefined ? <SiteFooter /> : footer;

  /** Pulls main under the sticky header so page bg starts at the top; padding keeps content below the bar. */
  const mainOverlap = bleedUnderNav
    ? "mt-[calc(-1*(env(safe-area-inset-top)+4.25rem))]"
    : "mt-[calc(-1*(env(safe-area-inset-top)+4.25rem))] pt-[calc(env(safe-area-inset-top)+4.25rem)]";
  // Outer shell: bottom padding matches sides so the black frame shows under the rounded card (same as top).
  const shellFrame =
    "box-border flex h-dvh min-h-0 flex-col bg-black px-2 pt-2 pb-2 sm:px-3 sm:pt-3 sm:pb-3 lg:px-4 lg:pt-4 lg:pb-4";

  return (
    <div className={shellFrame}>
      <div
        ref={shellScrollerRef}
        className={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-x-hidden rounded-2xl rounded-tl-none bg-background text-foreground shadow-[0_24px_64px_-24px_rgba(0,0,0,0.45)]",
          bleedUnderNav
            ? "overflow-hidden"
            : "overflow-y-auto [-webkit-overflow-scrolling:touch]",
          scrollerClassName,
        )}
      >
        <div className="sticky top-0 z-60 w-full shrink-0">
          <Link
            href="/"
            prefetch
            aria-label={`${APP_NAME} home`}
            className="absolute left-[15px] top-[15px] z-60 block h-[33px] w-[120px]"
          />
          {/* Corner notch - square top-left on the card; this SVG provides the branded curve */}
          <svg
            width="180"
            height="90"
            viewBox="240 100 180 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            className="pointer-events-none absolute left-0 top-0 z-50"
            aria-hidden
          >

            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M400 100 Q380 100 380 120 V140 Q380 160 360 160 L260 160 Q240 160 240 180 V100 Z"
              fill="black"
            />
            <image href="/white-text-logo.svg" x="255" y="115" width="120" height="33" />
          </svg>
          {nav}
        </div>
        <main
          id="main-content"
          className={cn(
            "relative z-10 flex min-h-0 min-w-0 flex-col bg-background outline-none",
            /**
             * Sticky footer reveal: main sits above the footer (z-10 + solid bg) until scroll
             * exposes the footer pinned with `sticky bottom-0`.
             */
            "grow shrink-0 basis-auto",
            mainOverlap,
            mainClassName
          )}
          tabIndex={-1}
        >
          {children}
        </main>
        {foot}
      </div>
      <ShellBottomBlur scrollContainerRef={shellScrollerRef} enabled={bottomBlurEnabled} />
      {scrollIndicator}
    </div>
  );
}
