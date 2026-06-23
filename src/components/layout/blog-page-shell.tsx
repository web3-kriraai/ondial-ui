import type { ReactNode } from "react";

import { MarketingDotBackground } from "@/components/layout/marketing-dot-background";
import {
  dottedPageSurfaceClass,
  marketingNavClearanceClass,
} from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

type BlogPageShellProps = {
  children: ReactNode;
  className?: string;
};

/** Blog routes: soft off-white surface + dotted grid + ambient brand glow. */
export function BlogPageShell({ children, className }: BlogPageShellProps) {
  return (
    <div className={cn("relative isolate flex min-h-full w-full flex-col", className)}>
      {/* Bleeds into main's nav clearance so the dotted surface sits behind the navbar. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 -z-10",
          marketingNavClearanceClass,
          dottedPageSurfaceClass,
        )}
      >
        <MarketingDotBackground className="inset-0" />

        <div
          className="absolute inset-x-0 top-0 h-[min(520px,55vh)] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% -8%, rgb(83 74 183 / 0.09), transparent 68%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to top, oklch(0.97 0.008 280 / 0.85), transparent)",
          }}
        />
      </div>

      {children}
    </div>
  );
}
