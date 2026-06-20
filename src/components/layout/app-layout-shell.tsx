"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SiteFooter } from "@/components/layout/site-footer";
import { ShellScrollProvider } from "@/components/layout/shell-scroll-context";
import { SiteShell } from "@/components/layout/site-shell";
import { ShellScrollIndicator } from "@/components/layout/shell-scroll-indicator";
import { blogPageSurfaceClass } from "@/config/marketing-layout";

function isDottedMarketingRoute(pathname: string) {
  if (
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/news" ||
    pathname === "/case-studies" ||
    pathname.startsWith("/case-studies/")
  ) {
    return true;
  }

  return pathname === "/blog" || pathname.startsWith("/blog/");
}

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

function isBlogArticleRoute(pathname: string) {
  return pathname.startsWith("/blog/") && pathname !== "/blog";
}

type AppLayoutShellProps = {
  children: ReactNode;
  /** Server pathname so SSR and hydration agree before `usePathname` is ready. */
  initialPathname: string;
};

/** Wraps pages in `SiteShell` with a document-flow footer after `main` (scroll to reach it). */
export function AppLayoutShell({ children, initialPathname }: AppLayoutShellProps) {
  const clientPathname = usePathname();
  const pathname = clientPathname ?? initialPathname;
  const shellScrollRef = useRef<HTMLDivElement>(null);
  const [pageMotionReady, setPageMotionReady] = useState(false);

  useEffect(() => {
    setPageMotionReady(true);
  }, []);

  useLayoutEffect(() => {
    const el = shellScrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [pathname]);

  const showFooterCta = footerShowsCtaCard(pathname);
  const hideFooter = footerHidden(pathname);
  const authSplit = isAuthSplitRoute(pathname);
  const dottedSurfaceRoute = isDottedMarketingRoute(pathname);
  const blogArticleRoute = isBlogArticleRoute(pathname);
  /** Page `transform` breaks `backdrop-filter` on industry hero blur layers. */
  const industryDetailPage = pathname.startsWith("/industries/");
  /** No enter/exit motion — transform/opacity can stick on direct tab loads until repaint. */
  const skipPageTransition = industryDetailPage || dottedSurfaceRoute;

  return (
    <ShellScrollProvider scrollerRef={shellScrollRef}>
      <SiteShell
        shellScrollerRef={shellScrollRef}
        bleedUnderNav={authSplit}
        scrollerClassName={dottedSurfaceRoute ? blogPageSurfaceClass : undefined}
        bottomBlurEnabled={!blogArticleRoute}
        scrollIndicator={
          authSplit ? null : <ShellScrollIndicator containerRef={shellScrollRef} />
        }
        footer={hideFooter ? null : <SiteFooter showCtaCard={showFooterCta} />}
        /* Auth split (login/signup): transparent main so column backgrounds reach behind the nav. */
        mainClassName={
          authSplit
            ? "flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-transparent"
            : dottedSurfaceRoute
              ? "flex min-h-min flex-col bg-transparent"
              : "flex min-h-min flex-col"
        }
      >
        {skipPageTransition || !pageMotionReady ? (
          <div className={authSplit ? "flex h-full min-h-0 flex-1 flex-col" : "flex flex-1 flex-col"}>
            {children}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
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
    </ShellScrollProvider>
  );
}
