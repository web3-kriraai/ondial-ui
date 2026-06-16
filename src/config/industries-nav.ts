import { DEFAULT_INDUSTRIES } from "@/lib/services-data";

/** Shorter labels for the navbar dropdown (matches marketing copy). */
const INDUSTRY_NAV_LABELS: Record<string, string> = {
  "healthcare-and-medical-services": "Healthcare",
  "call-center-and-bpo-services": "Call Center & BPO",
  "telecommunications-services": "Telecommunications",
  "hospitality-services": "Hospitality",
  "legal-services": "Legal",
  "government-services": "Government",
  "event-management-services": "Event Management",
  "consulting-services": "Consultation",
  "pharmaceutical-services": "Pharmaceuticals",
};

export type IndustryNavItem = {
  href: string;
  label: string;
  slug: string;
};

export const INDUSTRIES_NAV_ITEMS: readonly IndustryNavItem[] = DEFAULT_INDUSTRIES.map((industry) => ({
  href: `/industries/${industry.slug}`,
  label: INDUSTRY_NAV_LABELS[industry.slug] ?? industry.name,
  slug: industry.slug,
}));

const COLUMN_COUNT = 4;

/** Four balanced columns (5 items each) for the desktop mega menu. */
export const INDUSTRIES_NAV_COLUMNS: readonly IndustryNavItem[][] = Array.from(
  { length: COLUMN_COUNT },
  (_, index) => {
    const size = Math.ceil(INDUSTRIES_NAV_ITEMS.length / COLUMN_COUNT);
    const start = index * size;
    return INDUSTRIES_NAV_ITEMS.slice(start, start + size);
  },
).filter((column) => column.length > 0);
