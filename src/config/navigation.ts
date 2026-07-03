import type { NavMenuKind } from "@/config/nav-menus";
import { INDUSTRIES_NAV_ITEMS } from "@/config/industries-nav";
import { DASHBOARD_SIGNUP_URL } from "@/config/urls";

export type MainNavItem = {
  href: string;
  label: string;
  menu?: NavMenuKind;
  /** Renders as a separate CTA pill beside the main nav bar. */
  cta?: boolean;
};

export const MAIN_NAV: readonly MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: INDUSTRIES_NAV_ITEMS[0]?.href ?? "/pricing", label: "Industries", menu: "industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources", menu: "resources" },
  { href: DASHBOARD_SIGNUP_URL, label: "Start free trial", cta: true },
] as const;
