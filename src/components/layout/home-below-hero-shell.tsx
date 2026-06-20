import type { ReactNode } from "react";

import { MarketingDotBackground } from "@/components/layout/marketing-dot-background";
import { dottedPageSurfaceClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

type HomeBelowHeroShellProps = {
  children: ReactNode;
  className?: string;
};

/** Dotted marketing surface for homepage content below the hero showcase. */
export function HomeBelowHeroShell({ children, className }: HomeBelowHeroShellProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className={cn("absolute inset-0", dottedPageSurfaceClass)} />
        <MarketingDotBackground className="inset-0" />

        <div
          className="absolute inset-x-0 top-0 z-[1] h-28 sm:h-36"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, oklch(0.985 0.006 280) 52%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-x-0 top-0 z-[1] h-[min(480px,42vh)] opacity-65"
          style={{
            background:
              "radial-gradient(ellipse 72% 58% at 50% 0%, rgb(83 74 183 / 0.08), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 z-[1] h-40"
          style={{
            background: "linear-gradient(to top, oklch(0.97 0.008 280 / 0.88), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col">{children}</div>
    </div>
  );
}
