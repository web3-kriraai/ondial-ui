import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Login + signup: centered under the nav. Fills `main` height on small screens (`max-md:h-full`) so
 * `justify-center` works; bottom padding keeps the last controls clear of the document footer when scrolling.
 */
export function AuthPageShell({ children, className }: AuthPageShellProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-center overflow-x-hidden bg-background px-3 sm:px-6",
        "max-md:h-full max-md:min-h-0",
        "min-h-[calc(100svh-8.25rem)] sm:min-h-[calc(100svh-8rem)]",
        /* Scroll past the form before the footer crowds the last actions */
        "pb-10 sm:pb-12 md:pb-8",
        className
      )}
    >
      <div
        className="h-[max(1rem,calc(env(safe-area-inset-top,0px)+6.5rem))] w-full shrink-0"
        aria-hidden
      />
      <div
        className={cn(
          "flex w-full min-w-0 flex-1 flex-col items-center justify-center py-2 sm:py-3",
          "min-h-0"
        )}
      >
        <div className="mx-auto flex w-full min-w-0 max-w-full shrink-0 flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
