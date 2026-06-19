export type IntegrationCategory = "crm" | "calendar" | "platform";

export type IntegrationLogoFit = "square" | "wide";

export type IntegrationPartner = {
  id: string;
  name: string;
  /** Logo under `/public/integrations/` */
  logoSrc: string;
  category: IntegrationCategory;
  /** Wide wordmarks need extra horizontal space in the orbit. */
  logoFit?: IntegrationLogoFit;
};

export const INTEGRATIONS_HEADING = {
  eyebrow: "Integrations",
  title: "Works with your existing stack",
  description:
    "Connect OnDial to your CRM, calendars, and ticketing stack—sync outcomes, trigger calls from helpdesk workflows, and keep every conversation in context for enterprise teams.",
} as const;

export const INTEGRATION_CATEGORIES: Record<
  IntegrationCategory,
  { label: string; description: string }
> = {
  crm: {
    label: "CRM",
    description: "Sync contacts, deals, and call outcomes",
  },
  calendar: {
    label: "Calendar",
    description: "Book and confirm meetings from live calls",
  },
  platform: {
    label: "Ticketing & workflows",
    description: "Telephony, helpdesk triggers, and Zapier automations",
  },
};

/**
 * Tools on the integrations orbit. List order maps to rings:
 * first → inner (fewest), then middle, then outer (most).
 */
export const INTEGRATION_PARTNERS: readonly IntegrationPartner[] = [
  { id: "zoho", name: "Zoho", logoSrc: "/integrations/zoho.svg", category: "crm" },
  { id: "hubspot", name: "HubSpot", logoSrc: "/integrations/hubspot.svg", category: "crm" },
  { id: "salesforce", name: "Salesforce", logoSrc: "/integrations/salesforce.svg", category: "crm" },
  {
    id: "leadsquared",
    name: "LeadSquared",
    logoSrc: "/integrations/leadsquared.svg",
    category: "crm",
  },
  { id: "shopify", name: "Shopify", logoSrc: "/integrations/shopify.svg", category: "platform" },
  {
    id: "woocommerce",
    name: "WooCommerce",
    logoSrc: "/integrations/woocommerce.svg",
    category: "platform",
    logoFit: "wide",
  },
  { id: "magento", name: "Magento", logoSrc: "/integrations/magento.svg", category: "platform" },
  {
    id: "google-calendar",
    name: "Google Calendar",
    logoSrc: "/integrations/googlecalendar.svg",
    category: "calendar",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    logoSrc: "/integrations/googlesheets.svg",
    category: "platform",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    logoSrc: "/integrations/googledrive.svg",
    category: "platform",
  },
  { id: "freshdesk", name: "Freshdesk", logoSrc: "/integrations/freshdesk.svg", category: "platform" },
  { id: "zendesk", name: "Zendesk", logoSrc: "/integrations/zendesk.svg", category: "platform" },
  { id: "gorgias", name: "Gorgias", logoSrc: "/integrations/gorgias.svg", category: "platform" },
  { id: "intercom", name: "Intercom", logoSrc: "/integrations/intercom.svg", category: "platform" },
  { id: "calendly", name: "Calendly", logoSrc: "/integrations/calendly.svg", category: "calendar" },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    logoSrc: "/integrations/whatsapp.svg",
    category: "platform",
  },
] as const;

export const INTEGRATIONS_API_CALLOUT = {
  title: "REST API & webhooks",
  description:
    "Push call events, transcripts, and disposition codes to any endpoint—or pull customer context before the agent speaks. Built for enterprise security reviews and custom stacks.",
  ctaHref: "/pricing",
} as const;
