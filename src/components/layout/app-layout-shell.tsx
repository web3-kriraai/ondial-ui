"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";

type AppLayoutShellProps = {
  children: ReactNode;
};

/** Wraps pages in `SiteShell` with a document-flow footer after `main` (scroll to reach it). */
export function AppLayoutShell({ children }: AppLayoutShellProps) {
  const pathname = usePathname() ?? "";
  const shellScrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = shellScrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [pathname]);

  return (
    <SiteShell
      shellScrollerRef={shellScrollRef}
      /* `min-h-min` with `SiteShell` `grow shrink-0` on `main` keeps height to content (no clipping over footer). */
      mainClassName="flex min-h-min flex-col"
    >
      {children}
    </SiteShell>
  );
}
