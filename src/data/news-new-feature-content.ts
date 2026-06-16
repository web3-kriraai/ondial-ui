export type NewsFeatureCard = {
  id: string;
  image: string;
  imageAlt: string;
  callout: string;
  calloutBold: string;
  layout: "square" | "tall" | "wide";
  calloutPosition: "right" | "left" | "bottom";
};

export const NEWS_NEW_FEATURE_HEADING = {
  titleAccent: "New",
  titleRest: "feature on Ondial",
  footer: "Built for: Healthcare, Real Estate, Hospitality, E-commerce, SaaS",
} as const;

export const NEWS_NEW_FEATURE_CARDS: readonly NewsFeatureCard[] = [
  {
    id: "call-summaries",
    image: "/blog_ai_comm_1777703161729.png",
    imageAlt: "AI voice agent communication interface",
    calloutBold: "Smart summaries",
    callout: " with action items and sentiment scoring after every call.",
    layout: "square",
    calloutPosition: "right",
  },
  {
    id: "language-routing",
    image: "/home/carousel/01.webp",
    imageAlt: "Multilingual voice routing on OnDial",
    calloutBold: "Route callers",
    callout: " across 100+ languages in the first three seconds.",
    layout: "tall",
    calloutPosition: "left",
  },
  {
    id: "crm-sync",
    image: "/blog_productivity_1777703371947.png",
    imageAlt: "Workflow productivity and CRM sync",
    calloutBold: "Sync outcomes",
    callout: " to HubSpot and Salesforce automatically — zero manual entry.",
    layout: "wide",
    calloutPosition: "bottom",
  },
] as const;
