export type AboutHeroTrait = {
  id: AboutHeroTraitId;
  label: string;
};

export type AboutHeroTraitId = "ai-powered" | "human-like" | "global";

export type AboutHeroLanguage = {
  id: string;
  label: string;
  countryCode: string;
};

export type AboutHeroCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type AboutHeroHighlight = {
  id: AboutHeroHighlightId;
  value: string;
  label: string;
  detail: string;
};

export type AboutHeroHighlightId = "availability" | "languages" | "human";

export type AboutHeroConversationRole = "customer" | "agent";

export type AboutHeroConversationMessage = {
  id: string;
  role: AboutHeroConversationRole;
  text: string;
};

export const ABOUT_HERO_CONTENT = {
  eyebrow: "About Us",
  titleLead: "Transforming Business",
  titleAccent: "Communication",
  description:
    "At OnDial, we're on a mission to transform business communication. We provide AI Voice Agents that work 24/7, speak 100+ languages, and deliver human-like interactions for calls, in real time, ensuring that your customers are heard and helped exactly when they need it.",
  traits: [
    { id: "ai-powered", label: "AI-Powered" },
    { id: "human-like", label: "Human-Like" },
    { id: "global", label: "Global" },
  ] as const satisfies readonly AboutHeroTrait[],
  ctas: [
    {
      label: "Start Your Transformation",
      href: "/login",
      variant: "primary",
    },
    {
      label: "See It In Action",
      href: "/contact",
      variant: "secondary",
    },
  ] as const satisfies readonly AboutHeroCta[],
  featuredLanguages: [
    { id: "english", label: "English", countryCode: "us" },
    { id: "hindi", label: "Hindi", countryCode: "in" },
    { id: "gujarati", label: "Gujarati", countryCode: "in" },
    { id: "punjabi", label: "Punjabi", countryCode: "in" },
    { id: "bengali", label: "Bengali", countryCode: "bd" },
  ] as const satisfies readonly AboutHeroLanguage[],
  languagesLabel: "Speaks your customers' language",
  languagesMoreCount: 95,
  highlights: [
    {
      id: "availability",
      value: "24/7",
      label: "Always available",
      detail: "Round-the-clock voice support without overnight staffing.",
    },
    {
      id: "languages",
      value: "100+",
      label: "Languages supported",
      detail: "Reach customers worldwide in their native language.",
    },
    {
      id: "human",
      value: "Human-Like",
      label: "Natural conversations",
      detail: "Context-aware responses that feel personal, not scripted.",
    },
  ] as const satisfies readonly AboutHeroHighlight[],
  platformPanel: {
    status: "Live call",
    title: "HVAC Support Line",
    metric: "Answered in 1 ring",
    callerName: "Michael",
    messages: [
      {
        id: "customer-issue",
        role: "customer",
        text: "Hi, my AC stopped cooling last night.",
      },
      {
        id: "agent-empathy",
        role: "agent",
        text: "I'm sorry to hear that, Michael. Can I confirm your address on file?",
      },
      {
        id: "customer-confirm",
        role: "customer",
        text: "Yes, that's right.",
      },
      {
        id: "agent-slots",
        role: "agent",
        text: "I have tomorrow at 10:30 AM or 2:00 PM. Which works better?",
      },
      {
        id: "customer-slot",
        role: "customer",
        text: "10:30 AM works for me.",
      },
      {
        id: "agent-booked",
        role: "agent",
        text: "You're booked for tomorrow at 10:30 AM.",
      },
      {
        id: "customer-final",
        role: "customer",
        text: "That works, thanks.",
      },
    ] as const satisfies readonly AboutHeroConversationMessage[],
  },
} as const;
