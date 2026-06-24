"use client";

import { AppLink as Link } from "@/components/ui/app-link";
import type { NavMenuConfig } from "@/config/nav-menus";
import {
  navCloseTransition,
  navEaseOut,
  navLayoutSpring,
  navOpenSpring,
} from "@/lib/nav-dropdown-motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./nav-mega-dropdown-panel.module.css";

const PANEL_GAP_PX = 4;
const BRIDGE_PX = 14;

type PanelLayout = {
  top: number;
  left: number;
  width: number;
  originX: number;
};

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export type NavDropdownPortalProps = {
  open: boolean;
  menu: NavMenuConfig | null;
  triggerEl: HTMLElement | null;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClose: () => void;
};

export function NavDropdownPortal({
  open,
  menu,
  triggerEl,
  onPointerEnter,
  onPointerLeave,
  onClose,
}: NavDropdownPortalProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const [panelLayout, setPanelLayout] = useState<PanelLayout | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setHoveredSlug(null);
  }, [open]);

  useEffect(() => {
    setHoveredSlug(null);
  }, [pathname]);

  const measurePanelLayout = useCallback((): PanelLayout | null => {
    if (!triggerEl || !menu) return null;

    const rect = triggerEl.getBoundingClientRect();
    const panelWidth = Math.min(menu.panelMaxWidthPx, window.innerWidth - 32);
    const left = Math.max(16, (window.innerWidth - panelWidth) / 2);
    const triggerCenterX = rect.left + rect.width / 2;

    return {
      top: rect.bottom + PANEL_GAP_PX,
      left,
      width: panelWidth,
      originX: triggerCenterX - left,
    };
  }, [menu, triggerEl]);

  const syncPanelPosition = useCallback(() => {
    const layout = measurePanelLayout();
    if (layout) setPanelLayout(layout);
  }, [measurePanelLayout]);

  useLayoutEffect(() => {
    if (!open || !menu || !triggerEl) {
      setPanelLayout(null);
      return;
    }
    syncPanelPosition();
  }, [open, menu, triggerEl, syncPanelPosition]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => syncPanelPosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [open, syncPanelPosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const shellVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: -10, scale: 0.94 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: navOpenSpring,
        },
        exit: {
          opacity: 0,
          y: -6,
          scale: 0.97,
          transition: navCloseTransition,
        },
      };

  const contentVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.24,
            ease: navEaseOut,
            when: "beforeChildren",
            staggerChildren: 0.022,
            delayChildren: 0.05,
          },
        },
        exit: {
          opacity: 0,
          y: -4,
          transition: { duration: 0.12, ease: navEaseOut },
        },
      };

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, x: -5 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.2, ease: navEaseOut },
        },
        exit: { opacity: 0, transition: { duration: 0.08 } },
      };

  const columnVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.26,
            ease: navEaseOut,
            when: "beforeChildren",
            staggerChildren: 0.018,
            delayChildren: 0.04,
          },
        },
        exit: { opacity: 0, y: -4, transition: { duration: 0.1 } },
      };

  const handlePanelLeave = useCallback(() => {
    setHoveredSlug(null);
    onPointerLeave();
  }, [onPointerLeave]);

  const renderLink = (item: NavMenuConfig["items"][number]) => {
    const itemActive = linkIsActive(pathname, item.href);
    const itemHovered = hoveredSlug === item.slug;
    const showActiveState = itemActive && hoveredSlug === null;

    return (
      <motion.div key={item.slug} variants={itemVariants}>
        <Link
          href={item.href}
          prefetch
          className={cn(
            styles.link,
            itemActive && styles.linkCurrent,
            showActiveState && styles.linkActive,
            itemHovered && styles.linkHovered,
          )}
          aria-current={itemActive ? "page" : undefined}
          onMouseEnter={() => setHoveredSlug(item.slug)}
          onMouseLeave={() => setHoveredSlug((current) => (current === item.slug ? null : current))}
          onFocus={() => setHoveredSlug(item.slug)}
          onBlur={() => setHoveredSlug((current) => (current === item.slug ? null : current))}
          onClick={() => onClose()}
        >
          {item.label}
        </Link>
      </motion.div>
    );
  };

  const renderContent = () => {
    if (!menu) return null;

    if (menu.layout === "mega") {
      return (
        <motion.div
          className={styles.gridMega}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {menu.columns.map((column, columnIndex) => (
            <motion.div
              key={`col-${columnIndex}`}
              className={styles.column}
              variants={columnVariants}
            >
              {column.map((item) => renderLink(item))}
            </motion.div>
          ))}
        </motion.div>
      );
    }

    const gridClass = styles.gridCompactTwoCol;

    return (
      <motion.div
        className={gridClass}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {menu.items.map((item) => renderLink(item))}
      </motion.div>
    );
  };

  if (typeof document === "undefined") return null;

  const activeLayout = panelLayout ?? (open && menu && triggerEl ? measurePanelLayout() : null);

  return createPortal(
    <AnimatePresence mode="wait">
      {open && menu && activeLayout ? (
        <motion.div
          key="nav-dropdown-layer"
          className={styles.layer}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={shellVariants}
        >
          <motion.div
            layout
            id={menuId}
            role="menu"
            aria-label={menu.ariaLabel}
            className={styles.dropdown}
            transition={navLayoutSpring}
            style={{
              top: activeLayout.top - BRIDGE_PX,
              left: activeLayout.left,
              width: activeLayout.width,
              transformOrigin: `${activeLayout.originX}px 0`,
            }}
            onMouseEnter={onPointerEnter}
            onMouseLeave={handlePanelLeave}
          >
            <motion.div layout className={styles.panel} transition={navLayoutSpring}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={menu.kind}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1, transition: navOpenSpring }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.99, transition: navCloseTransition }
                  }
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
              <motion.div layout className={styles.footer} transition={navLayoutSpring}>
                {menu.footerHint ? (
                  <span className={styles.footerHint}>{menu.footerHint}</span>
                ) : (
                  <span />
                )}
                {menu.overviewHref && menu.overviewLabel ? (
                  <Link
                    href={menu.overviewHref}
                    prefetch
                    className={styles.footerLink}
                    onClick={() => onClose()}
                  >
                    {menu.overviewLabel}
                  </Link>
                ) : null}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
