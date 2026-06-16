import {
  INDUSTRIES_NAV_COLUMNS,
  INDUSTRIES_NAV_ITEMS,
  type IndustryNavItem,
} from "@/config/industries-nav";
import {
  RESOURCES_NAV_ITEMS,
  RESOURCES_OVERVIEW_HREF,
  type ResourceNavItem,
} from "@/config/resources-nav";
import {
  SERVICES_NAV_ITEMS,
  SERVICES_OVERVIEW_HREF,
  type ServiceNavItem,
} from "@/config/services-nav";

export type NavMenuKind = "services" | "industries" | "resources";

export type NavMenuLink = {
  href: string;
  label: string;
  slug: string;
};

export type NavMenuConfig = {
  kind: NavMenuKind;
  items: readonly NavMenuLink[];
  columns: ReadonlyArray<readonly NavMenuLink[]>;
  overviewHref?: string;
  overviewLabel?: string;
  footerHint?: string;
  panelMaxWidthPx: number;
  ariaLabel: string;
  layout: "compact" | "mega";
};

export const NAV_MENUS: Record<NavMenuKind, NavMenuConfig> = {
  services: {
    kind: "services",
    items: SERVICES_NAV_ITEMS,
    columns: [
      [SERVICES_NAV_ITEMS[0], SERVICES_NAV_ITEMS[1]],
      [SERVICES_NAV_ITEMS[2], SERVICES_NAV_ITEMS[3]],
    ],
    overviewHref: SERVICES_OVERVIEW_HREF,
    overviewLabel: "View all services",
    footerHint: "4 AI voice agents",
    panelMaxWidthPx: 440,
    ariaLabel: "Services",
    layout: "compact",
  },
  industries: {
    kind: "industries",
    items: INDUSTRIES_NAV_ITEMS,
    columns: INDUSTRIES_NAV_COLUMNS,
    footerHint: "20 industries supported",
    panelMaxWidthPx: 1152,
    ariaLabel: "Industries",
    layout: "mega",
  },
  resources: {
    kind: "resources",
    items: RESOURCES_NAV_ITEMS,
    columns: [RESOURCES_NAV_ITEMS],
    overviewHref: RESOURCES_OVERVIEW_HREF,
    overviewLabel: "Browse blogs",
    footerHint: "Company & product updates",
    panelMaxWidthPx: 440,
    ariaLabel: "Resources",
    layout: "compact",
  },
};

export function navMenuChildHrefs(kind: NavMenuKind): readonly string[] {
  return NAV_MENUS[kind].items.map((item) => item.href);
}

export type { IndustryNavItem, ResourceNavItem, ServiceNavItem };
