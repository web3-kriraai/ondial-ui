export type WhyChooseFeatureId =
  | "cost-reduction"
  | "customer-satisfaction"
  | "global-scalability"
  | "sales-conversion";

export type WhyChooseFeature = {
  id: WhyChooseFeatureId;
  index: string;
  title: string;
  description: string;
  illustrationBg: string;
  image: string;
  imageAlt: string;
};

export const ABOUT_WHY_CHOOSE_HEADING = {
  eyebrow: "Why Businesses Choose OnDial",
  titleLead: "Why Businesses Choose",
  titleAccent: "OnDial",
  description:
    "Join thousands of businesses worldwide who have transformed their customer experience with OnDial's AI-powered voice solutions.",
} as const;

export const ABOUT_WHY_CHOOSE_SLIDE_MS = 6000;

export const ABOUT_WHY_CHOOSE_FEATURES: readonly WhyChooseFeature[] = [
  {
    id: "cost-reduction",
    index: "01",
    title: "Reduce call center costs with 24/7 AI-powered call handling.",
    description:
      "Eliminate the need for large call center teams and expensive overnight staffing. Our AI handles millions of calls while you sleep, dramatically reducing operational costs.",
    illustrationBg: "#e1f5ee",
    image: "/blog_productivity_1777703371947.png",
    imageAlt: "AI voice agent reducing call center operational costs",
  },
  {
    id: "customer-satisfaction",
    index: "02",
    title: "Improve customer satisfaction by eliminating long hold times.",
    description:
      "No more frustrated customers waiting on hold. Instant responses, immediate problem resolution, and always-available support that keeps customers happy and loyal.",
    illustrationBg: "#e6f1fb",
    image: "/blog_connectivity_1777703241008.png",
    imageAlt: "Customer connected instantly without hold times",
  },
  {
    id: "global-scalability",
    index: "03",
    title: "Scale globally with multilingual voice AI that adapts to regional accents and preferences.",
    description:
      "Reach customers worldwide in their native language. Our AI understands regional accents, cultural nuances, and local preferences for truly global customer service.",
    illustrationBg: "#f8f7ff",
    image: "/blog_ai_comm_1777703161729.png",
    imageAlt: "Global multilingual AI voice communication",
  },
  {
    id: "sales-conversion",
    index: "04",
    title: "Boost sales conversion with intelligent, always-available lead engagement.",
    description:
      "Never miss a sales opportunity. Our AI engages leads 24/7, qualifies prospects intelligently, and routes high-value opportunities to your sales team instantly.",
    illustrationBg: "#faeeda",
    image: "/home/carousel/04.webp",
    imageAlt: "Sales team engaging qualified leads with AI voice",
  },
] as const;
