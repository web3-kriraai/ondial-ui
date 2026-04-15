"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, Menu, X } from "lucide-react";

import { MAIN_NAV } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
};

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function desktopLinkClassName(active: boolean) {
  return cn(
    "relative rounded-full px-3.5 py-2 text-[13px] font-medium leading-none tracking-tight transition-[color,background-color,box-shadow,transform] duration-200 ease-out sm:px-4 sm:py-2.5",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "motion-reduce:transform-none",
    active
      ? "bg-background/90 font-semibold text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-1 ring-foreground/[0.08]"
      : "text-muted-foreground hover:bg-background/55 hover:text-foreground active:scale-[0.98]"
  );
}

/** Same vertical metrics as `desktopLinkClassName` so both nav pills share one height. */
function desktopCtaContactClassName(active: boolean) {
  return cn(
    "relative rounded-full px-3.5 py-2 text-[13px] font-semibold leading-none tracking-tight transition-[color,background-color,box-shadow,transform] duration-200 ease-out sm:px-4 sm:py-2.5",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "motion-reduce:transform-none",
    active
      ? "bg-background/90 text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-1 ring-foreground/[0.08]"
      : "border border-border/70 bg-background text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.05)] hover:bg-muted/45 active:scale-[0.98]"
  );
}

function mobileLinkClassName(active: boolean) {
  return cn(
    "group flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-[0.9375rem] font-medium leading-snug tracking-tight transition-[color,background-color,box-shadow,transform] duration-200 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "motion-reduce:transform-none",
    active
      ? "bg-background text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] ring-1 ring-foreground/10"
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground active:scale-[0.99]"
  );
}

const glassBar = cn(
  "relative isolate overflow-hidden border border-border/55",
  "bg-background/[0.52] shadow-[0_10px_40px_-14px_rgba(15,23,42,0.2),inset_0_1px_0_0_rgba(255,255,255,0.78)]",
  "backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/[0.38]",
  "dark:border-white/12 dark:shadow-[0_12px_44px_-14px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
  "before:pointer-events-none before:absolute before:inset-x-2.5 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.12] before:to-transparent sm:before:inset-x-3.5"
);

/** Extra inset around links so the inner pill feels airy (not cramped to the track edge). */
const navTrack = cn(
  "relative flex min-h-0 w-fit max-w-full shrink-0 items-center gap-1 self-stretch rounded-full p-1 sm:gap-1.5 sm:p-1.5",
  "bg-gradient-to-b from-muted/55 to-muted/35 ring-1 ring-inset ring-foreground/[0.06]",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)]"
);

export type SiteNavbarProps = {
  /** Defaults to `MAIN_NAV` from `@/config/navigation`. */
  items?: readonly NavItem[];
  /** Right side: auth, CTA, etc. */
  end?: ReactNode;
  className?: string;
};

export function SiteNavbar({ items = MAIN_NAV, end, className }: SiteNavbarProps) {
  const pathname = usePathname();
  const lastItem = items.length > 0 ? items[items.length - 1] : undefined;
  const splitContactIntoCtaPill =
    !end && lastItem !== undefined && lastItem.href === "/contact" && items.length >= 2;
  const desktopRowItems = splitContactIntoCtaPill ? items.slice(0, -1) : items;
  const contactItem = splitContactIntoCtaPill ? lastItem : undefined;
  const menuId = useId();
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerEntered, setDrawerEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      setDrawerEntered(false);
      return;
    }
    setDrawerEntered(false);
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setDrawerEntered(true));
    });
    const focusId = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>("[data-nav-close]")?.focus();
    }, 30);
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
      window.clearTimeout(focusId);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onFocusIn = (e: FocusEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (e.target instanceof Node && !panel.contains(e.target)) {
        panel.querySelector<HTMLButtonElement>("[data-nav-close]")?.focus();
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [mobileOpen]);

  const renderDesktopLinks = (navItems: readonly NavItem[]) =>
    navItems.map((item) => {
      const active = linkIsActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          prefetch
          className={desktopLinkClassName(active)}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
        </Link>
      );
    });

  const renderMobileLinks = (onNavigate?: () => void) =>
    items.map((item) => {
      const active = linkIsActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          prefetch
          className={mobileLinkClassName(active)}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
        >
          <span className="min-w-0 flex-1 text-pretty">{item.label}</span>
          <ChevronRight
            className={cn(
              "size-4 shrink-0 opacity-40 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-70",
              active && "translate-x-0.5 opacity-80"
            )}
            aria-hidden
          />
        </Link>
      );
    });

  const mobileDrawer =
    mounted && mobileOpen ? (
      createPortal(
        <div className="fixed inset-0 z-[200] md:hidden">
          <button
            type="button"
            className={cn(
              "absolute inset-0 z-0 cursor-default bg-black/50 backdrop-blur-md transition-[opacity,backdrop-filter] duration-300 ease-out motion-reduce:transition-none",
              drawerEntered ? "opacity-100" : "opacity-0"
            )}
            aria-label="Close navigation"
            onClick={closeMobile}
          />
          <aside
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "absolute right-0 top-0 z-10 flex h-[100dvh] max-h-[100dvh] w-[min(22.5rem,calc(100vw-12px))] flex-col",
              "border-l border-white/30 bg-gradient-to-b from-background/[0.93] via-background/[0.88] to-background/[0.94]",
              "pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-5 pr-4",
              "shadow-[-28px_0_56px_-28px_rgba(15,23,42,0.42)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:from-background/[0.82] supports-[backdrop-filter]:via-background/[0.78] supports-[backdrop-filter]:to-background/[0.85]",
              "rounded-l-[1.875rem] ring-1 ring-black/[0.05] dark:border-white/12 dark:ring-white/10",
              "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none motion-reduce:translate-x-0",
              drawerEntered ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/50 pb-5">
              <div className="min-w-0">
                <p
                  id={titleId}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
                >
                  Navigation
                </p>
                <p className="mt-2 max-w-[14rem] text-pretty text-sm leading-relaxed text-muted-foreground">
                  Tap the backdrop or close to dismiss.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                data-nav-close
                className={cn(
                  "size-9 shrink-0 rounded-full border-border/60 bg-background/70 shadow-sm backdrop-blur-sm",
                  "hover:border-border hover:bg-muted/70"
                )}
                aria-label="Close menu"
                onClick={closeMobile}
              >
                <X className="size-4" aria-hidden />
              </Button>
            </div>

            <nav
              aria-label="Primary"
              className="mt-5 flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-1 pr-1 [-webkit-overflow-scrolling:touch]"
            >
              <p className="px-1 pb-2 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">Pages</p>
              {renderMobileLinks(closeMobile)}
            </nav>

            {end ? (
              <div className="mt-5 border-t border-border/50 pt-5">
                <p className="mb-2 px-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">Actions</p>
                <div className="rounded-2xl border border-border/40 bg-muted/25 p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]">
                  {end}
                </div>
              </div>
            ) : null}
          </aside>
        </div>,
        document.body
      )
    ) : null;

  return (
    <>
      <header className={cn("sticky top-0 z-50 w-full pt-3 pb-2 md:pt-4 md:pb-3", className)}>
        <div className="mx-auto flex w-full justify-center px-2 sm:px-3">
          <div
            className={cn(
              "flex w-fit max-w-[min(100%,calc(100vw-1.25rem))] shrink-0 items-center rounded-full p-1 sm:p-1.5",
              "gap-1 sm:gap-1.5",
              end && "md:gap-2",
              glassBar
            )}
          >
            <nav
              aria-label="Primary"
              className="hidden min-h-0 flex-row flex-wrap items-stretch justify-center gap-1 sm:gap-1.5 md:flex"
            >
              <div className={navTrack}>{renderDesktopLinks(desktopRowItems)}</div>
              {contactItem ? (
                <div className={navTrack}>
                  <Link
                    href={contactItem.href}
                    prefetch
                    className={desktopCtaContactClassName(linkIsActive(pathname, contactItem.href))}
                    aria-current={linkIsActive(pathname, contactItem.href) ? "page" : undefined}
                  >
                    {contactItem.label}
                  </Link>
                </div>
              ) : null}
            </nav>

            <div
              className={cn(
                "flex shrink-0 items-center gap-2",
                end ? navTrack : "md:contents"
              )}
            >
              {end}
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className={cn(
                  "size-9 rounded-full border-border/60 bg-background/55 shadow-sm backdrop-blur-md md:hidden",
                  "hover:bg-muted/65 active:scale-[0.96] motion-reduce:active:scale-100"
                )}
                aria-expanded={mobileOpen}
                aria-controls={menuId}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
              </Button>
            </div>
          </div>
        </div>
      </header>
      {mobileDrawer}
    </>
  );
}
