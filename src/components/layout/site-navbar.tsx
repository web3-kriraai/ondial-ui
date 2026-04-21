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

/** White pill + soft edge / shadow like the reference (light gray rim, diffused lift). */
const glassBar = cn(
  "relative isolate overflow-hidden rounded-full border border-zinc-200/90",
  "bg-linear-to-b from-white via-zinc-50/80 to-zinc-100/45",
  "shadow-[0_6px_28px_-10px_rgba(15,23,42,0.12),0_2px_10px_-4px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
  "dark:border-white/12 dark:from-white/12 dark:via-white/8 dark:to-white/[0.04]",
  "dark:shadow-[0_10px_36px_-14px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
  "md:backdrop-blur-md md:backdrop-saturate-150 supports-backdrop-filter:md:from-white/90",
  "before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-zinc-300/40 before:to-transparent sm:before:inset-x-4",
  "max-md:before:hidden"
);

/** Inner track — subtle zinc gradient so links sit in a soft inset. */
const navTrack = cn(
  "relative flex min-h-0 w-fit max-w-full shrink-0 items-center gap-1 self-stretch rounded-full p-1 sm:gap-1.5 sm:p-1.5",
  "bg-linear-to-b from-zinc-100/90 to-zinc-200/50 ring-1 ring-inset ring-zinc-300/35",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75)] dark:from-white/8 dark:to-white/4 dark:ring-white/10"
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
  /** Keeps the portal mounted through the close transition. */
  const [drawerPresent, setDrawerPresent] = useState(false);
  /** Drives enter/exit CSS transitions (backdrop + panel slide). */
  const [drawerEntered, setDrawerEntered] = useState(false);

  const enterTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const beginCloseDrawer = useCallback(() => {
    if (enterTimerRef.current !== undefined) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = undefined;
    }
    setMobileOpen(false);
    setDrawerEntered(false);
    if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = undefined;
      setDrawerPresent(false);
    }, 300);
  }, []);

  const beginOpenDrawer = useCallback(() => {
    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
    setMobileOpen(true);
    setDrawerPresent(true);
    if (enterTimerRef.current !== undefined) window.clearTimeout(enterTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => {
      enterTimerRef.current = undefined;
      setDrawerEntered(true);
    }, 20);
  }, []);

  useEffect(() => {
    return () => {
      if (enterTimerRef.current !== undefined) window.clearTimeout(enterTimerRef.current);
      if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;
    if (prev === pathname) return;
    if (mobileOpen || drawerPresent) {
      const id = window.setTimeout(() => beginCloseDrawer(), 0);
      return () => window.clearTimeout(id);
    }
  }, [pathname, mobileOpen, drawerPresent, beginCloseDrawer]);

  useEffect(() => {
    if (!drawerPresent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") beginCloseDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerPresent, beginCloseDrawer]);

  useEffect(() => {
    if (!drawerPresent) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerPresent]);

  useEffect(() => {
    if (!drawerEntered || !panelRef.current) return;
    const node = panelRef.current.querySelector<HTMLElement>("[data-nav-close]");
    node?.focus({ preventScroll: true });
  }, [drawerEntered]);

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

  const renderMobileLinks = () =>
    items.map((item) => {
      const active = linkIsActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          prefetch
          className={mobileLinkClassName(active)}
          aria-current={active ? "page" : undefined}
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

  const drawerVisualOpen = drawerEntered;

  const mobileDrawerContent = (
    <div className="pointer-events-auto fixed inset-0 z-[2147483000] touch-manipulation md:hidden">
      <button
        type="button"
        className={cn(
          "absolute inset-0 z-0 cursor-default bg-black/50 backdrop-blur-md",
          "transition-opacity duration-300 ease-out motion-reduce:transition-none",
          drawerVisualOpen ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close navigation"
        onClick={beginCloseDrawer}
      />
      <aside
        ref={panelRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "pointer-events-auto absolute right-0 top-0 z-10 flex h-dvh max-h-dvh w-[min(22.5rem,calc(100vw-12px))] flex-col will-change-transform",
          "border-l border-white/30 bg-linear-to-b from-background/93 via-background/88 to-background/94",
          "pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-5 pr-4",
          "shadow-[-28px_0_56px_-28px_rgba(15,23,42,0.42)] backdrop-blur-2xl backdrop-saturate-150 supports-backdrop-filter:from-background/82 supports-backdrop-filter:via-background/78 supports-backdrop-filter:to-background/85",
          "rounded-l-[1.875rem] ring-1 ring-black/5 dark:border-white/12 dark:ring-white/10",
          "transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          drawerVisualOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border/50 pb-4">
          <div className="min-w-0">
            <p
              id={titleId}
              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            >
              Navigation
            </p>
            <p className="mt-2 max-w-56 text-pretty text-sm leading-relaxed text-muted-foreground">
              Tap the backdrop or close to dismiss.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            data-nav-close
            className={cn(
              "size-9 shrink-0 rounded-full border-border/60 bg-transparent shadow-sm backdrop-blur-sm",
              "hover:border-border hover:bg-muted/70"
            )}
            aria-label="Close menu"
            onClick={beginCloseDrawer}
          >
            <X className="size-4" aria-hidden />
          </Button>
        </div>

        <nav
          aria-label="Primary"
          className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-1 pr-1 [-webkit-overflow-scrolling:touch]"
        >
          <p className="px-1 pb-2 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">Pages</p>
          {renderMobileLinks()}
        </nav>

        {end ? (
          <div className="mt-4 border-t border-border/50 pt-4">
            <p className="mb-2 px-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">Actions</p>
            <div className="rounded-2xl border border-border/40 bg-muted/25 p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]">
              {end}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );

  const mobileDrawer =
    drawerPresent && typeof document !== "undefined"
      ? createPortal(mobileDrawerContent, document.body)
      : null;

  const menuBusy = mobileOpen || drawerPresent;

  return (
    <>
      <header
        className={cn(
          "pointer-events-none sticky top-0 z-[60] isolate w-full bg-transparent pt-1 pb-0",
          className
        )}
      >
      <div className="pointer-events-none relative z-[1] mx-auto flex w-full justify-end px-2 sm:px-3 md:justify-center">
        <div
          className={cn(
            "pointer-events-auto relative z-[2] flex w-fit max-w-[min(100%,calc(100vw-1.25rem))] shrink-0 items-center rounded-full p-1 sm:p-1.5",
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
              <button
                type="button"
                className={cn(
                  "relative z-[100] inline-flex touch-manipulation md:hidden",
                  "size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-foreground ring-0 backdrop-blur-md",
                  "hover:bg-muted/30 hover:shadow-[0_4px_20px_rgba(15,23,42,0.1)]",
                  "active:scale-[0.96] motion-reduce:active:scale-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-expanded={menuBusy}
                aria-controls={drawerPresent ? menuId : undefined}
                aria-label={menuBusy ? "Close menu" : "Open menu"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (mobileOpen) beginCloseDrawer();
                  else beginOpenDrawer();
                }}
              >
                {menuBusy ? (
                  <X className="size-5 stroke-[1.75]" aria-hidden />
                ) : (
                  <Menu className="size-5 stroke-[1.75]" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      {mobileDrawer}
    </>
  );
}
