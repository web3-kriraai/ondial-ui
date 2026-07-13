import { DEFAULT_INDUSTRIES } from "@/lib/services-data";

/** Shorter labels for the navbar dropdown (matches marketing copy). */
const INDUSTRY_NAV_LABELS: Record<string, string> = {
  "ai-voice-agents-healthcare-medical": "Healthcare",
  "ai-voice-agents-insurance": "Insurance",
  "ai-voice-agents-finance-banking": "Finance & Banking",
  "ai-voice-agents-real-estate": "Real Estate",
  "ai-voice-agents-call-centers-bpo": "Call Center & BPO",
  "ai-voice-agents-travel-tourism": "Travel & Tourism",
  "ai-voice-agents-transportation-logistics": "Transportation & Logistics",
  "ai-voice-agents-retail-e-commerce": "Retail & E-commerce",
  "ai-voice-agents-telecommunications": "Telecommunications",
  "ai-voice-agents-automotive": "Automotive",
  "ai-voice-agents-education": "Education",
  "ai-voice-agents-hospitality": "Hospitality",
  "ai-voice-agents-legal": "Legal",
  "ai-voice-agents-government": "Government",
  "ai-voice-agents-manufacturing": "Manufacturing",
  "ai-voice-agents-non-profit-organizations": "Non-Profit Organizations",
  "ai-voice-agents-event-management": "Event Management",
  "ai-voice-agents-consulting": "Consultation",
  "ai-voice-agents-pharmaceuticals": "Pharmaceuticals",
  "ai-voice-agents-sales-lead-generation": "Sales & Lead Generation",
  "ai-voice-agents-utilities": "Utilities",
  "ai-voice-agents-construction": "Construction",
  "ai-voice-agents-agriculture": "Agriculture",
};

export type IndustryNavItem = {
  href: string;
  label: string;
  slug: string;
};

/** Hub page for the Industries mega menu overview link. */
export const INDUSTRIES_OVERVIEW_HREF = "/industries";

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
