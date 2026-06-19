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
      "Our AI voice agents answers instantly, speaks like a human, and logs everything to your CRM automatically. No hold music. No missed calls.",
  },
  {
    id: "scheduling",
    layout: "standard",
    illustration: "scheduling",
    illustrationBg: "#F0FAF5",
    pill: { label: "Automate bookings fully", tone: "green" },
    title: "Appointment Scheduling",
    description: "AI Call Automation checks availability, schedules appointments, and confirms bookings instantly — no human intervention required.",
  },
  {
    id: "multilingual",
    layout: "standard",
    illustration: "multilingual",
    illustrationBg: "#F0F6FF",
    pill: { label: "Serve 100+ languages", tone: "blue" },
    title: "Multilingual AI Communication",
    description: "Multilingual AI Voice Agents that auto-detects language, responds naturally, and works instantly with no extra setup.",
  },
  {
    id: "lead-qualification",
    layout: "standard",
    illustration: "lead-qualification",
    illustrationBg: "#FFFBF5",
    pill: { label: "Prioritize hot leads", tone: "amber" },
    title: "Lead Qualification",
    description: "Asks the right questions. AI Voice Agents that routes hot leads to your team instantly.",
  },
  {
    id: "analytics",
    layout: "standard",
    illustration: "analytics",
    illustrationBg: "#FFF5F5",
    pill: { label: "Boost insights & ROI", tone: "red" },
    title: "Smart Analytics",
    description: "Sentiment, CSAT, resolution rate — all in one AI-powered analytics dashboard.",
  },
  {
    id: "integrations",
    layout: "wide",
    illustration: "integrations",
    illustrationBg: "#F8F7FF",
    pill: { label: "Plug & Play", tone: "teal" },
    title: "Works with your existing stack",
    description:
      "Connects to your CRM, calendar, and communication tools with intelligent AI Voice Agents in minutes. No engineering required.",
  },
];
