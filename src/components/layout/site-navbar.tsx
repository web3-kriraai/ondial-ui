"use client";

import { AppLink as Link } from "@/components/ui/app-link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";

import { DesktopMagneticNav } from "@/components/layout/desktop-magnetic-nav";
import { LazyMobileNavDrawer } from "@/components/layout/lazy-mobile-nav-drawer";
import { glassBar, navCtaLink, navCtaShell } from "@/components/layout/site-navbar-styles";
import { MAIN_NAV, type MainNavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

export type NavItem = MainNavItem;

export type SiteNavbarProps = {
  /** Defaults to `MAIN_NAV` from `@/config/navigation`. */
  items?: readonly NavItem[];
  /** Right side: auth, CTA, etc. */
  end?: ReactNode;
  className?: string;
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

export function SiteNavbar({ items = MAIN_NAV, end, className }: SiteNavbarProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const navLinks = items.filter((item) => !item.cta);
  const ctaItem = items.find((item) => item.cta);
  const menuId = useId();
  const titleId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Stays true through Framer exit so the menu control matches drawer visibility. */
  const [menuLatchOpen, setMenuLatchOpen] = useState(false);

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
    if (mobileOpen) setMenuLatchOpen(true);
  }, [mobileOpen]);

  const menuBusy = menuLatchOpen;

  return (
    <>
      <header
        className={cn(
          "pointer-events-none sticky top-0 z-[60] isolate w-full bg-transparent pt-1 pb-0",
          className,
        )}
      >
        <div className="pointer-events-none relative z-[1] mx-auto flex w-full justify-end px-2 sm:px-3 lg:justify-center">
          <div className="pointer-events-auto relative z-[2] flex w-fit max-w-[min(100%,calc(100vw-1.25rem))] shrink-0 items-center gap-2 sm:gap-2.5">
            <div
              className={cn(
                "flex w-fit max-w-full shrink-0 items-center rounded-full p-0.5 sm:p-1",
                "gap-0.5 sm:gap-1",
                glassBar,
              )}
            >
              <nav
                aria-label="Primary"
                className="hidden min-h-0 flex-row flex-wrap items-stretch justify-center gap-1 sm:gap-1.5 lg:flex"
              >
                <DesktopMagneticNav
                  items={navLinks}
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
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
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

      <LazyMobileNavDrawer
        open={mobileOpen}
        menuId={menuId}
        titleId={titleId}
        items={items}
        navLinks={navLinks}
        pathname={pathname}
        reduceMotion={reduceMotion}
        end={end}
        ctaItem={ctaItem}
        onClose={beginCloseDrawer}
        onExitComplete={() => setMenuLatchOpen(false)}
      />
    </>
  );
}
