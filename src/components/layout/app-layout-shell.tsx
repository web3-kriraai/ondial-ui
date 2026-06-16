"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { ShellScrollIndicator } from "@/components/layout/shell-scroll-indicator";

function footerShowsCtaCard(pathname: string) {
  if (pathname === "/login" || pathname === "/signup") return false;
  if (pathname.startsWith("/auth/")) return false;
  return true;
}

function footerHidden(pathname: string) {
  return pathname === "/login" || pathname === "/signup";
}

function isAuthSplitRoute(pathname: string) {
  return pathname === "/login" || pathname === "/signup";
}

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

  const showFooterCta = footerShowsCtaCard(pathname);
  const hideFooter = footerHidden(pathname);
  const authSplit = isAuthSplitRoute(pathname);
  /** Page `transform` breaks `backdrop-filter` on industry hero blur layers. */
  const industryDetailPage = pathname.startsWith("/industries/");

  return (
    <SiteShell
      shellScrollerRef={shellScrollRef}
      bleedUnderNav={authSplit}
      scrollIndicator={
        authSplit ? null : <ShellScrollIndicator containerRef={shellScrollRef} />
      }
      footer={hideFooter ? null : <SiteFooter showCtaCard={showFooterCta} />}
      /* Auth split (login/signup): transparent main so column backgrounds reach behind the nav. */
      mainClassName={
        authSplit
          ? "flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-transparent"
          : "flex min-h-min flex-col"
      }
    >
      {industryDetailPage ? (
        <div className="flex flex-1 flex-col">{children}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={authSplit ? "flex h-full min-h-0 flex-1 flex-col" : "flex flex-1 flex-col"}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </SiteShell>
  );
}
