"use client";

import { AppLink as Link } from "@/components/ui/app-link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, X } from "lucide-react";

import {
  drawerEase,
  mobileLinkClassName,
  navCtaShell,
  navCtaLink,
} from "@/components/layout/site-navbar-styles";
import { NAV_MENUS } from "@/config/nav-menus";
import type { MainNavItem } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { navItemIsActive } from "@/lib/nav-utils";
import { cn } from "@/lib/utils";

export type MobileNavDrawerProps = {
  open: boolean;
  menuId: string;
  titleId: string;
  items: readonly MainNavItem[];
  navLinks: readonly MainNavItem[];
  pathname: string;
  reduceMotion: boolean | null;
  end?: ReactNode;
  ctaItem?: MainNavItem;
  onClose: () => void;
  onExitComplete: () => void;
};

function NavSignupCta({ item, className }: { item: MainNavItem; className?: string }) {
  return (
    <div className={cn(navCtaShell, className)}>
      <Link href={item.href} prefetch={false} className={navCtaLink}>
        {item.label}
      </Link>
    </div>
  );
}

export function MobileNavDrawer({
  open,
  menuId,
  titleId,
  items,
  navLinks,
  pathname,
  reduceMotion,
  end,
  ctaItem,
  onClose,
  onExitComplete,
}: MobileNavDrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const bodyOverflowRestoreRef = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useLayoutEffect(() => {
    if (!open) return;
    if (bodyOverflowRestoreRef.current === null) {
      bodyOverflowRestoreRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("[data-nav-close]")?.focus({ preventScroll: true });
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  const restoreBodyScroll = () => {
    if (bodyOverflowRestoreRef.current !== null) {
      document.body.style.overflow = bodyOverflowRestoreRef.current;
      bodyOverflowRestoreRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      restoreBodyScroll();
    };
  }, []);

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
    if (!open) setMobileExpandedHref(null);
  }, [open]);

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
                active && "translate-x-0.5 opacity-80",
              )}
              aria-hidden
            />
          </Link>
        </motion.div>
      );
    });

  const drawerContent = (
    <AnimatePresence
      onExitComplete={() => {
        onExitComplete();
        restoreBodyScroll();
      }}
    >
      {open ? (
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
              "cursor-default bg-black/50 backdrop-blur-md motion-reduce:transition-none",
            )}
            aria-label="Close navigation"
            onClick={onClose}
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
              "rounded-l-[1.875rem] ring-1 ring-black/5 dark:border-white/12 dark:ring-white/10",
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
                  "hover:border-border hover:bg-muted/70",
                )}
                aria-label="Close menu"
                onClick={onClose}
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

            {end || ctaItem ? (
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

  if (typeof document === "undefined") return null;

  return createPortal(drawerContent, document.body);
}
