"use client";

import { AppLink as Link } from "@/components/ui/app-link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { LazyNavDropdownPortal } from "@/components/layout/lazy-nav-dropdown-portal";
import { NavMegaDropdown } from "@/components/layout/nav-mega-dropdown";
import {
  activeNavPill,
  desktopLinkClassName,
  magneticPullSpring,
  navTrack,
  stickyPillSpring,
} from "@/components/layout/site-navbar-styles";
import { NAV_MENUS } from "@/config/nav-menus";
import { NAV_DROPDOWN_CLOSE_DELAY_MS } from "@/lib/nav-dropdown-motion";
import type { MainNavItem } from "@/config/navigation";
import { navItemIsActive } from "@/lib/nav-utils";
import { cn } from "@/lib/utils";

export type DesktopMagneticNavProps = {
  items: readonly MainNavItem[];
  pathname: string;
  reduceMotion: boolean | null;
};

export function DesktopMagneticNav({ items, pathname, reduceMotion }: DesktopMagneticNavProps) {
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
    [pillHeight, pillLeft, pillOffsetX, pillOffsetY, pillOpacity, pillTop, pillWidth],
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
    [findHrefUnderPointer, openMenuHref, pillOffsetX, pillOffsetY, reduceMotion],
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

      <LazyNavDropdownPortal
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
