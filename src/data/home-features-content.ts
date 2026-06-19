export type FeaturePillTone = "purple" | "green" | "blue" | "amber" | "red" | "teal";

export type FeatureIllustrationId =
  | "live-calls"
  | "scheduling"
  | "multilingual"
  | "lead-qualification"
  | "analytics"
  | "integrations";

export type HomeFeatureCard = {
  id: string;
  layout: "wide" | "standard";
  illustration: FeatureIllustrationId;
  illustrationBg: string;
  pill: { label: string; tone: FeaturePillTone };
  title: string;
  description: string;
  description2: string;
};

export const HOME_FEATURES_HEADING = {
  eyebrow: "Everything You Need",
  titleLead: "Transform Business Communication",
  titleTail: "with",
  titleAccent: "OnDial AI Voice Agents",
  subtitle: "One AI agent. Every call handled — inbound, outbound, 24/7.",
} as const;

export const HOME_FEATURE_CARDS: readonly HomeFeatureCard[] = [
  // {
  //   id: "live-calls",
  //   layout: "wide",
  //   illustration: "live-calls",
  //   illustrationBg: "#F8F7FF",
  //   pill: { label: "24/7 Availability", tone: "purple" },
  //   title: "Handles every call — live, naturally",
  //   description:
  //     "The AI answers instantly, speaks like a human, and logs everything to your CRM automatically. No hold music. No missed calls.",
  // },
  // {
  //   id: "scheduling",
  //   layout: "standard",
  //   illustration: "scheduling",
  //   illustrationBg: "#F0FAF5",
  //   pill: { label: "Auto Scheduling", tone: "green" },
  //   title: "Books appointments on the call",
  //   description: "Checks availability and confirms slots — no human needed.",
  // },
  // {
  //   id: "multilingual",
  //   layout: "standard",
  //   illustration: "multilingual",
  //   illustrationBg: "#F0F6FF",
  //   pill: { label: "100+ Languages", tone: "blue" },
  //   title: "Speaks your customer's language",
  //   description: "Auto-detects language. Responds naturally. No extra setup.",
  // },
  // {
  //   id: "lead-qualification",
  //   layout: "standard",
  //   illustration: "lead-qualification",
  //   illustrationBg: "#FFFBF5",
  //   pill: { label: "Lead Qualification", tone: "amber" },
  //   title: "Qualifies leads on the call",
  //   description: "Asks the right questions. Routes hot leads to your team instantly.",
  // },
  // {
  //   id: "analytics",
  //   layout: "standard",
  //   illustration: "analytics",
  //   illustrationBg: "#FFF5F5",
  //   pill: { label: "Real-time Insights", tone: "red" },
  //   title: "Full visibility into every call",
  //   description: "Sentiment, CSAT, resolution rate — all in one dashboard.",
  // },
  // {
  //   id: "integrations",
  //   layout: "wide",
  //   illustration: "integrations",
  //   illustrationBg: "#F8F7FF",
  //   pill: { label: "Plug & Play", tone: "teal" },
  //   title: "Works with your existing stack",
  //   description:
  //     "Connects to your CRM, calendar, and communication tools in minutes. No engineering required.",
  // },
  {
    id: "live-calls",
    layout: "wide",
    illustration: "live-calls",
    illustrationBg: "#F8F7FF",
    pill: { label: "Handle calls 24/7 instantly", tone: "purple" },
    title: "AI Voice Agents",
    description:
      "The AI answers instantly, speaks like a human, and logs everything to your CRM automatically. No hold music. No missed calls.",
    description2: "Deploy autonomous AI voice agents that handle inbound and outbound calls 24/7 with human-like tone, contextual understanding, and instant responses.",
  },
  {
    id: "scheduling",
    layout: "standard",
    illustration: "scheduling",
    illustrationBg: "#F0FAF5",
    pill: { label: "Automate bookings fully", tone: "green" },
    title: "Appointment Scheduling",
    description: "Checks availability and confirms slots — no human needed.",
    description2: "AI Voice Agents automate appointment scheduling, letting customers book, reschedule, or cancel in real time with seamless calendar integration.",
  },
  {
    id: "multilingual",
    layout: "standard",
    illustration: "multilingual",
    illustrationBg: "#F0F6FF",
    pill: { label: "Serve 100+ languages", tone: "blue" },
    title: "Multilingual AI Communication",
    description: "Auto-detects language. Responds naturally. No extra setup.",
    description2: "Serve global audiences with multilingual AI Voice Agents, capable of switching between 100+ languages for seamless customer experiences.",
  },
  {
    id: "lead-qualification",
    layout: "standard",
    illustration: "lead-qualification",
    illustrationBg: "#FFFBF5",
    pill: { label: "Prioritize hot leads", tone: "amber" },
    title: "Lead Qualification",
    description: "Asks the right questions. Routes hot leads to your team instantly.",
    description2: "Use intelligent AI Voice Agents to automatically score and qualify leads based on conversation quality, behavior, and intent.",
  },
  {
    id: "analytics",
    layout: "standard",
    illustration: "analytics",
    illustrationBg: "#FFF5F5",
    pill: { label: "Boost insights & ROI", tone: "red" },
    title: "Smart Analytics",
    description: "Sentiment, CSAT, resolution rate — all in one dashboard.",
    description2: "Access insights into call performance, sentiment, and behavior. With AI-powered analytics, you can optimize sales, support, and marketing in real time.",
  },
  {
    id: "integrations",
    layout: "wide",
    illustration: "integrations",
    illustrationBg: "#F8F7FF",
    pill: { label: "Plug & Play", tone: "teal" },
    title: "Works with your existing stack",
    description:
      "Connects to your CRM, calendar, and communication tools in minutes. No engineering required.",
    description2: "Integrate AI Voice Agents seamlessly with your existing CRM, calendar, and communication tools for a smooth, automated call handling experience.",
  },
];
