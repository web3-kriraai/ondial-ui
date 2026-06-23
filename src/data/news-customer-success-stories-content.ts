export type NewsUpdateItem = {
  id: string;
  date: string;
  title: string;
  description: string;
};

export const NEWS_UPDATES_HEADING = {
  title: "Product Updates",
  ctaLabel: "View all updates",
  ctaHref: "/news",
} as const;

export const NEWS_UPDATES_IMAGES = {
  primary: "/blog_ai_comm_1777703161729.png",
  secondary: "/blog_connectivity_1777703241008.png",
  primaryAlt: "new update v2",
  secondaryAlt: "new update connectivity",
} as const;

export const NEWS_UPDATE_ITEMS: readonly NewsUpdateItem[] = [
  {
    id: "call-summaries",
    date: "Jun 1st",
    title: "AI Call Summaries v2",
    description:
      "Richer post-call summaries with action items, sentiment scoring, and automatic CRM sync for every conversation.",
  },
  {
    id: "crm-sync",
    date: "May 12th",
    title: "HubSpot & Salesforce sync",
    description:
      "Call outcomes and follow-up tasks write back to your CRM in real time - no manual entry after every call.",
  },
  {
    id: "language-routing",
    date: "Apr 28th",
    title: "Multilingual routing",
    description:
      "Detect caller language in the first three seconds and route to the right agent across 100+ languages.",
  },
] as const;

