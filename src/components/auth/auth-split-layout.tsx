import type { ReactNode } from "react";

import { AuthCollagePanel } from "@/components/auth/auth-collage-panel";
import { cn } from "@/lib/utils";

type AuthSplitLayoutProps = {
  children: ReactNode;
  fullScreen?: boolean;
  className?: string;
};

/** Mobile needs extra top space for the corner logo notch (~90px). */
const navContentOffset =
  "scroll-pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] md:scroll-pt-[calc(env(safe-area-inset-top,0px)+4.25rem)] md:pt-[calc(env(safe-area-inset-top,0px)+4.25rem)]";

/** Equal inset top / right / bottom; flush on the split edge (matches shell frame). */
const panelPad =
  "box-border flex flex-col pl-0 pt-2 pr-2 pb-2 sm:pt-3 sm:pr-3 sm:pb-3 lg:pt-4 lg:pr-4 lg:pb-4";

/**
 * Full-height 50/50 split: form column + inset rounded panel column.
 */
export function AuthSplitLayout({
  children,
  fullScreen = false,
  className,
}: AuthSplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid h-full min-h-0 w-full flex-1 md:grid-cols-2",
        fullScreen && "min-h-full",
        className,
      )}
    >
      <div className="flex h-full min-h-0 flex-col bg-background">
        <div
          id="auth-form-scroll"
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-y-auto",
            navContentOffset,
            "px-5 pb-5 sm:px-8 sm:pb-6 md:px-10 lg:px-14",
          )}
        >
          <div className="flex w-full shrink-0 flex-col justify-start py-2 sm:py-4 md:min-h-full md:flex-1 md:justify-center md:py-6">
            <div className="mx-auto w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>

      <div
        className={cn("hidden h-full min-h-0 flex-col bg-background md:flex")}
        aria-hidden
      >
        <div className={cn("min-h-0 w-full flex-1 overflow-visible", panelPad)}>
          <div className="flex h-full min-h-0 w-full items-center justify-center overflow-visible rounded-2xl">
            <AuthCollagePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
