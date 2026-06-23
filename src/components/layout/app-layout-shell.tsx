"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { ShellScrollProvider } from "@/components/layout/shell-scroll-context";
import { SiteShell } from "@/components/layout/site-shell";
import { ShellScrollIndicator } from "@/components/layout/shell-scroll-indicator";
import { blogPageSurfaceClass } from "@/config/marketing-layout";

const DOTTED_MARKETING_PATHS = new Set([
  "/about",
  "/contact",
  "/news",
  "/case-studies",
  "/pricing",
  "/ondial-for-enterprise",
  "/privacy",
  "/terms-and-conditions",
  "/return-policy",
  "/services",
]);

function isDottedMarketingRoute(pathname: string) {
  if (DOTTED_MARKETING_PATHS.has(pathname)) {
    return true;
  }

  return (
    pathname.startsWith("/case-studies/") ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/services/")
  );
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

function isAdminRoute(pathname: string) {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/seo" ||
    pathname.startsWith("/seo/")
  );
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
  const adminRoute = isAdminRoute(pathname);

  // Admin routes get a completely bare layout — no marketing nav, no footer
  if (adminRoute) {
    return <>{children}</>;
  }

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
        <div className={authSplit ? "flex h-full min-h-0 flex-1 flex-col" : "flex flex-1 flex-col"}>
          {children}
        </div>
      </SiteShell>
    </ShellScrollProvider>
  );
}
