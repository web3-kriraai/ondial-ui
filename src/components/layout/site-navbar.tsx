"use client";

import { AppLink as Link } from "@/components/ui/app-link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { NavDropdownPortal } from "@/components/layout/nav-dropdown-portal";
import { NavMegaDropdown } from "@/components/layout/nav-mega-dropdown";
import { NAV_MENUS } from "@/config/nav-menus";
import { NAV_DROPDOWN_CLOSE_DELAY_MS } from "@/lib/nav-dropdown-motion";
import { MAIN_NAV, type MainNavItem } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { navItemIsActive } from "@/lib/nav-utils";
import { cn } from "@/lib/utils";

export type NavItem = MainNavItem;

function desktopLinkClassName(highlighted: boolean) {
  return cn(
    "relative rounded-full px-3.5 py-3 text-[13px] font-medium leading-none tracking-tight transition-[color,transform] duration-200 ease-out sm:px-4 sm:py-3.5",
    "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "motion-reduce:transform-none",
    highlighted
      ? "font-semibold text-black"
      : "text-white/90 hover:text-white active:scale-[0.98]"
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

/** Black pill bar with subtle depth - active link sits in a white elevated pill. */
const glassBar = cn(
  "relative isolate overflow-hidden rounded-full border border-white/10",
  "bg-linear-to-b from-zinc-900 via-black to-zinc-950",
  "shadow-[0_6px_28px_-10px_rgba(0,0,0,0.45),0_2px_10px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
  "before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/15 before:to-transparent sm:before:inset-x-4",
  "max-md:before:hidden"
);

/** Separate CTA pill beside the nav - same black bar + white inner cylinder as nav links. */
const navCtaShell = cn(
  glassBar,
  "shrink-0 p-0.5 sm:p-1"
);

const navCtaLink = cn(
  "inline-flex cursor-pointer items-center justify-center rounded-full px-3.5 py-3 text-[13px] font-semibold leading-none tracking-tight sm:px-4 sm:py-3.5",
  "bg-white text-black",
  "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
  "transition-[transform,box-shadow] duration-200 ease-out",
  "hover:shadow-[0_3px_12px_-2px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.14),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
  "active:scale-[0.98]",
  "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  "motion-reduce:transform-none"
);

/** Inner track - links sit flush inside the black bar. */
const navTrack = cn(
  "relative flex min-h-0 w-fit max-w-full shrink-0 items-center gap-0.5 self-stretch rounded-full"
);

/** White elevated pill - positioned by magnetic track, not per-link inset. */
const activeNavPill = cn(
  "pointer-events-none absolute z-0 rounded-full bg-white",
  "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.95)]"
);

const stickyPillSpring = (reduceMotion: boolean | null) =>
  reduceMotion
    ? { stiffness: 1000, damping: 100, mass: 1 }
    : { stiffness: 260, damping: 22, mass: 1.05 };

const magneticPullSpring = (reduceMotion: boolean | null) =>
  reduceMotion
    ? { stiffness: 1000, damping: 100, mass: 1 }
    : { stiffness: 180, damping: 14, mass: 0.12 };

type DesktopMagneticNavProps = {
  items: readonly MainNavItem[];
  pathname: string;
  reduceMotion: boolean | null;
};

function DesktopMagneticNav({ items, pathname, reduceMotion }: DesktopMagneticNavProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());
  const pointerInTriggerRef = useRef<string | null>(null);
  const pointerInPanelRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [openMenuHref, setOpenMenuHref] = useState<string | null>(null);

  const activeHref = items.find((item) => navItemIsActive(pathname, item))?.href ?? null;
  const pillHref = openMenuHref ?? hoveredHref ?? activeHref;

  const pillLeft = useMotionValue(0);
  const pillWidth = useMotionValue(0);
  const pillTop = useMotionValue(0);
  const pillHeight = useMotionValue(0);
  const pillOffsetX = useMotionValue(0);
  const pillOffsetY = useMotionValue(0);
  const pillOpacity = useMotionValue(activeHref ? 1 : 0);

  const springLeft = useSpring(pillLeft, stickyPillSpring(reduceMotion));
  const springWidth = useSpring(pillWidth, stickyPillSpring(reduceMotion));
  const springTop = useSpring(pillTop, stickyPillSpring(reduceMotion));
  const springHeight = useSpring(pillHeight, stickyPillSpring(reduceMotion));
  const springOffsetX = useSpring(pillOffsetX, magneticPullSpring(reduceMotion));
  const springOffsetY = useSpring(pillOffsetY, magneticPullSpring(reduceMotion));
  const springOpacity = useSpring(pillOpacity, { stiffness: 400, damping: 28 });

  const syncPillToLink = useCallback(
    (href: string | null, resetMagnetic = true) => {
      const track = trackRef.current;
      const link = href ? linkRefs.current.get(href) : undefined;
      if (!track || !link) {
        if (!href) pillOpacity.set(0);
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      pillLeft.set(linkRect.left - trackRect.left);
      pillWidth.set(linkRect.width);
      pillTop.set(linkRect.top - trackRect.top);
      pillHeight.set(linkRect.height);
      pillOpacity.set(1);

      if (resetMagnetic) {
        pillOffsetX.set(0);
        pillOffsetY.set(0);
      }
    },
    [pillHeight, pillLeft, pillOffsetX, pillOffsetY, pillOpacity, pillTop, pillWidth]
  );

  const findHrefUnderPointer = useCallback((clientX: number, clientY: number) => {
    for (const [href, el] of linkRefs.current) {
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return href;
      }
    }

    return null;
  }, []);

  useLayoutEffect(() => {
    syncPillToLink(pillHref);
  }, [pillHref, syncPillToLink, items]);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      if (!pointerInTriggerRef.current && !pointerInPanelRef.current) {
        setOpenMenuHref(null);
        setHoveredHref(null);
      }
      closeTimerRef.current = null;
    }, NAV_DROPDOWN_CLOSE_DELAY_MS);
  }, [cancelScheduledClose]);

  const closeMenuNow = useCallback(() => {
    cancelScheduledClose();
    pointerInTriggerRef.current = null;
    pointerInPanelRef.current = false;
    setOpenMenuHref(null);
    setHoveredHref(null);
  }, [cancelScheduledClose]);

  const handleTriggerEnter = useCallback(
    (href: string) => {
      pointerInTriggerRef.current = href;
      cancelScheduledClose();
      setOpenMenuHref(href);
      setHoveredHref(href);
    },
    [cancelScheduledClose],
  );

  const handleTriggerLeave = useCallback(
    (href: string) => {
      if (pointerInTriggerRef.current === href) {
        pointerInTriggerRef.current = null;
      }
      scheduleClose();
    },
    [scheduleClose],
  );

  const handlePanelEnter = useCallback(() => {
    pointerInPanelRef.current = true;
    cancelScheduledClose();
  }, [cancelScheduledClose]);

  const handlePanelLeave = useCallback(() => {
    pointerInPanelRef.current = false;
    scheduleClose();
  }, [scheduleClose]);

  useEffect(() => {
    setHoveredHref(null);
    setOpenMenuHref(null);
    pointerInTriggerRef.current = null;
    pointerInPanelRef.current = false;
    cancelScheduledClose();
  }, [pathname, cancelScheduledClose]);

  useEffect(() => {
    return () => cancelScheduledClose();
  }, [cancelScheduledClose]);

  useEffect(() => {
    const onResize = () => syncPillToLink(pillHref, false);
    window.addEventListener("resize", onResize);

    const track = trackRef.current;
    if (!track) {
      return () => window.removeEventListener("resize", onResize);
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(track);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [pillHref, syncPillToLink]);

  const handleTrackMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;

      if (openMenuHref) return;

      const href = findHrefUnderPointer(event.clientX, event.clientY);
      setHoveredHref(href);

      if (!href) {
        pillOffsetX.set(0);
        pillOffsetY.set(0);
        return;
      }

      const link = linkRefs.current.get(href);
      if (!link) return;

      const rect = link.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const clamp = (value: number, max: number) => Math.max(-max, Math.min(max, value));

      pillOffsetX.set(clamp(nx * 6, 7));
      pillOffsetY.set(clamp(ny * 3, 4));
    },
    [findHrefUnderPointer, openMenuHref, pillOffsetX, pillOffsetY, reduceMotion]
  );

  const clearHover = useCallback(() => {
    setHoveredHref(null);
    pillOffsetX.set(0);
    pillOffsetY.set(0);
    syncPillToLink(activeHref);
  }, [activeHref, pillOffsetX, pillOffsetY, syncPillToLink]);

  const openMenuItem = items.find((item) => item.href === openMenuHref && item.menu);
  const openMenu = openMenuItem?.menu ? NAV_MENUS[openMenuItem.menu] : null;
  const openTriggerEl = openMenuHref ? (linkRefs.current.get(openMenuHref) ?? null) : null;

  return (
    <div
      ref={trackRef}
      className={cn(navTrack, "relative")}
      onMouseMove={handleTrackMouseMove}
      onMouseLeave={() => {
        if (!openMenuHref) clearHover();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          clearHover();
        }
      }}
    >
      <motion.div
        aria-hidden
        className={activeNavPill}
        style={{
          left: springLeft,
          width: springWidth,
          top: springTop,
          height: springHeight,
          x: springOffsetX,
          y: springOffsetY,
          opacity: springOpacity,
        }}
      />

      {items.map((item) => {
        const active = navItemIsActive(pathname, item);
        const highlighted = pillHref === item.href;
        const menuOpen = openMenuHref === item.href;

        if (item.menu) {
          return (
            <NavMegaDropdown
              key={item.href}
              ref={(node) => {
                if (node) linkRefs.current.set(item.href, node);
                else linkRefs.current.delete(item.href);
              }}
              label={item.label}
              active={active}
              highlighted={highlighted || menuOpen}
              open={menuOpen}
              triggerClassName={desktopLinkClassName(highlighted || menuOpen)}
              onPointerEnter={() => handleTriggerEnter(item.href)}
              onPointerLeave={() => handleTriggerLeave(item.href)}
              onFocus={() => handleTriggerEnter(item.href)}
              onBlur={(event) => {
                if (
                  menuOpen ||
                  event.currentTarget
                    .closest("[data-nav-dropdown-trigger]")
                    ?.contains(event.relatedTarget as Node)
                ) {
                  return;
                }
                clearHover();
              }}
            />
          );
        }

        return (
          <Link
            key={item.href}
            ref={(node) => {
              if (node) linkRefs.current.set(item.href, node);
              else linkRefs.current.delete(item.href);
            }}
            href={item.href}
            prefetch={false}
            className={desktopLinkClassName(highlighted)}
            aria-current={active ? "page" : undefined}
            onMouseEnter={() => setHoveredHref(item.href)}
            onMouseLeave={() => {
              if (!openMenuHref) {
                setHoveredHref((current) => (current === item.href ? null : current));
              }
            }}
            onFocus={() => setHoveredHref(item.href)}
            onBlur={() => {
              if (!openMenuHref) {
                setHoveredHref((current) => (current === item.href ? null : current));
              }
            }}
          >
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}

      <NavDropdownPortal
        open={Boolean(openMenuItem)}
        menu={openMenu}
        triggerEl={openTriggerEl}
        onPointerEnter={handlePanelEnter}
        onPointerLeave={handlePanelLeave}
        onClose={closeMenuNow}
      />
    </div>
  );
}

export type SiteNavbarProps = {
  /** Defaults to `MAIN_NAV` from `@/config/navigation`. */
  items?: readonly NavItem[];
  /** Right side: auth, CTA, etc. */
  end?: ReactNode;
  className?: string;
};

const drawerEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function NavSignupCta({ item, className }: { item: MainNavItem; className?: string }) {
  return (
    <div className={cn(navCtaShell, className)}>
      <Link href={item.href} prefetch={false} className={navCtaLink}>
        {item.label}
      </Link>
    </div>
  );
}

export function SiteNavbar({ items = MAIN_NAV, end, className }: SiteNavbarProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const navLinks = items.filter((item) => !item.cta);
  const ctaItem = items.find((item) => item.cta);
  const menuId = useId();
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Stays true through Framer exit so the menu control matches drawer visibility. */
  const [menuLatchOpen, setMenuLatchOpen] = useState(false);
  const bodyOverflowRestoreRef = useRef<string | null>(null);

  const beginCloseDrawer = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const beginOpenDrawer = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;
    if (prev === pathname) return;
    if (mobileOpen) {
      const id = window.setTimeout(() => beginCloseDrawer(), 0);
      return () => window.clearTimeout(id);
    }
  }, [pathname, mobileOpen, beginCloseDrawer]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") beginCloseDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, beginCloseDrawer]);

  useLayoutEffect(() => {
    if (!mobileOpen) return;
    if (bodyOverflowRestoreRef.current === null) {
      bodyOverflowRestoreRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !panelRef.current) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("[data-nav-close]")?.focus({ preventScroll: true });
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [mobileOpen]);

  const restoreBodyScroll = useCallback(() => {
    if (bodyOverflowRestoreRef.current !== null) {
      document.body.style.overflow = bodyOverflowRestoreRef.current;
      bodyOverflowRestoreRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      restoreBodyScroll();
    };
  }, [restoreBodyScroll]);

  useEffect(() => {
    if (mobileOpen) setMenuLatchOpen(true);
  }, [mobileOpen]);

  const allDesktopItems = navLinks;

  const drawerTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.32, ease: drawerEase };

  const linkListVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: 14 },
    show: {
      opacity: 1,
      x: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.22, ease: drawerEase },
    },
  };

  const [mobileExpandedHref, setMobileExpandedHref] = useState<string | null>(() => {
    const activeMenu = items.find((item) => item.menu && navItemIsActive(pathname, item));
    return activeMenu?.href ?? null;
  });

  useEffect(() => {
    if (!mobileOpen) setMobileExpandedHref(null);
  }, [mobileOpen]);

  useEffect(() => {
    const activeMenu = items.find((item) => item.menu && navItemIsActive(pathname, item));
    if (activeMenu) setMobileExpandedHref(activeMenu.href);
  }, [pathname, items]);

  const renderMobileSubLink = (href: string, label: string, slug: string) => {
    const subActive = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        key={slug}
        href={href}
        prefetch={false}
        className={cn(
          "flex min-h-9 items-center rounded-xl px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors",
          subActive
            ? "bg-background font-semibold text-foreground ring-1 ring-foreground/10"
            : "hover:bg-muted/50 hover:text-foreground",
        )}
        aria-current={subActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  const renderMobileLinks = () =>
    navLinks.map((item) => {
      const active = navItemIsActive(pathname, item);

      if (item.menu) {
        const menu = NAV_MENUS[item.menu];
        const expanded = mobileExpandedHref === item.href;
        const gridCols = item.menu === "industries" ? "sm:grid-cols-2" : "grid-cols-1";

        return (
          <motion.div key={item.href} variants={linkItemVariants} className="min-w-0">
            <button
              type="button"
              className={cn(mobileLinkClassName(active), "text-left")}
              aria-expanded={expanded}
              onClick={() =>
                setMobileExpandedHref((current) => (current === item.href ? null : item.href))
              }
            >
              <span className="min-w-0 flex-1 text-pretty">{item.label}</span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 opacity-50 transition-transform duration-200",
                  expanded && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: drawerEase }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 max-h-52 overflow-y-auto rounded-2xl border border-border/50 bg-muted/20 p-2 [-webkit-overflow-scrolling:touch]">
                    {menu.overviewHref && menu.overviewLabel ? (
                      <Link
                        href={menu.overviewHref}
                        prefetch={false}
                        className={cn(
                          "mb-1 flex min-h-9 items-center rounded-xl px-3 text-[0.8125rem] font-semibold text-foreground",
                          pathname === menu.overviewHref && "bg-background ring-1 ring-foreground/10",
                        )}
                        aria-current={pathname === menu.overviewHref ? "page" : undefined}
                      >
                        {menu.overviewLabel}
                      </Link>
                    ) : null}
                    <div className={cn("grid grid-cols-1 gap-0.5", gridCols)}>
                      {menu.items.map((subItem) =>
                        renderMobileSubLink(subItem.href, subItem.label, subItem.slug),
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      }

      return (
        <motion.div key={item.href} variants={linkItemVariants} className="min-w-0">
          <Link
            href={item.href}
            prefetch={false}
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
        </motion.div>
      );
    });

  const mobileDrawerContent = (
    <AnimatePresence
      onExitComplete={() => {
        setMenuLatchOpen(false);
        restoreBodyScroll();
      }}
    >
      {mobileOpen ? (
        <>
          <motion.button
            key="nav-backdrop"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={drawerTransition}
            className={cn(
              "pointer-events-auto fixed inset-0 z-[2147483000] touch-manipulation lg:hidden",
              "cursor-default bg-black/50 backdrop-blur-md motion-reduce:transition-none"
            )}
            aria-label="Close navigation"
            onClick={beginCloseDrawer}
          />
          <motion.aside
            key="nav-panel"
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={drawerTransition}
            className={cn(
              "pointer-events-auto fixed right-0 top-0 z-[2147483001] flex h-dvh max-h-dvh w-[min(22.5rem,calc(100vw-12px))] flex-col touch-manipulation will-change-transform lg:hidden",
              "border-l border-white/30 bg-linear-to-b from-background/93 via-background/88 to-background/94",
              "pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-5 pr-4",
              "shadow-[-28px_0_56px_-28px_rgba(15,23,42,0.42)] backdrop-blur-2xl backdrop-saturate-150 supports-backdrop-filter:from-background/82 supports-backdrop-filter:via-background/78 supports-backdrop-filter:to-background/85",
              "rounded-l-[1.875rem] ring-1 ring-black/5 dark:border-white/12 dark:ring-white/10"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...drawerTransition, delay: reduceMotion ? 0 : 0.04 }}
              className="flex items-start justify-between gap-3 border-b border-border/50 pb-4"
            >
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
            </motion.div>

            <motion.nav
              aria-label="Primary"
              initial="hidden"
              animate="show"
              variants={linkListVariants}
              className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-1 pr-1 [-webkit-overflow-scrolling:touch]"
            >
              <motion.p
                variants={linkItemVariants}
                className="px-1 pb-2 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90"
              >
                Pages
              </motion.p>
              {renderMobileLinks()}
            </motion.nav>

            {(end || ctaItem) ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...drawerTransition, delay: reduceMotion ? 0 : 0.08 }}
                className="mt-4 border-t border-border/50 pt-4"
              >
                <p className="mb-2 px-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">
                  Actions
                </p>
                <div className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-muted/25 p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]">
                  {ctaItem ? <NavSignupCta item={ctaItem} className="w-full [&_a]:w-full" /> : null}
                  {end}
                </div>
              </motion.div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  const mobileDrawer =
    typeof document !== "undefined" ? createPortal(mobileDrawerContent, document.body) : null;

  const menuBusy = menuLatchOpen;

  return (
    <>
      <header
        className={cn(
          "pointer-events-none sticky top-0 z-[60] isolate w-full bg-transparent pt-1 pb-0",
          className
        )}
      >
        <div className="pointer-events-none relative z-[1] mx-auto flex w-full justify-end px-2 sm:px-3 lg:justify-center">
          <div className="pointer-events-auto relative z-[2] flex w-fit max-w-[min(100%,calc(100vw-1.25rem))] shrink-0 items-center gap-2 sm:gap-2.5">
            <div
              className={cn(
                "flex w-fit max-w-full shrink-0 items-center rounded-full p-0.5 sm:p-1",
                "gap-0.5 sm:gap-1",
                glassBar
              )}
            >
              <nav
                aria-label="Primary"
                className="hidden min-h-0 flex-row flex-wrap items-stretch justify-center gap-1 sm:gap-1.5 lg:flex"
              >
                <DesktopMagneticNav
                  items={allDesktopItems}
                  pathname={pathname}
                  reduceMotion={reduceMotion}
                />
              </nav>

              <div className="flex shrink-0 items-center gap-2 lg:contents">
                {end}
                <button
                  type="button"
                  className={cn(
                    "relative z-[100] inline-flex touch-manipulation lg:hidden",
                    "size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-white ring-0",
                    "hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
                    "active:scale-[0.96] motion-reduce:active:scale-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  )}
                  aria-expanded={menuBusy}
                  aria-controls={menuBusy ? menuId : undefined}
                  aria-label={menuBusy ? "Close menu" : "Open menu"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mobileOpen) beginCloseDrawer();
                    else if (!menuLatchOpen) beginOpenDrawer();
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

            {ctaItem ? <NavSignupCta item={ctaItem} className="hidden lg:flex" /> : null}
          </div>
        </div>
      </header>
      {mobileDrawer}
    </>
  );
}
