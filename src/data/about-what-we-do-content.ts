export type WhatWeDoCapabilityId =
  | "always-on"
  | "human-voice"
  | "languages"
  | "instant-response"
  | "lead-routing"
  | "integration";

export type WhatWeDoCapability = {
  id: WhatWeDoCapabilityId;
  label: string;
};

export const ABOUT_WHAT_WE_DO_HEADING = {
  eyebrow: "What We Do",
  title: "We help businesses never miss a customer conversation.",
  paragraphOne:
    "OnDial provides AI-powered Voice Agents that answer calls instantly, engage customers naturally, and resolve inquiries around the clock. Our agents speak 100+ languages, understand context in real time, and deliver human-like conversations that feel seamless and personal.",
  paragraphTwo:
    "Whether it's customer support, lead qualification, appointment scheduling, or inbound call handling, OnDial ensures every customer receives fast, accurate, and professional assistance—24 hours a day, 7 days a week.",
} as const;

export const ABOUT_WHAT_WE_DO_CAPABILITIES: readonly WhatWeDoCapability[] = [
  { id: "always-on", label: "24/7 AI-Powered Call Handling" },
  { id: "human-voice", label: "Human-Like Voice Conversations" },
  { id: "languages", label: "Support in 100+ Languages" },
  { id: "instant-response", label: "Instant Customer Response" },
  { id: "lead-routing", label: "Lead Qualification & Routing" },
  { id: "integration", label: "Seamless Business Integration" },
] as const;

export const ABOUT_WHAT_WE_DO_HIGHLIGHTS = [
  { id: "availability", label: "24/7", detail: "Always on" },
  { id: "languages", label: "100+", detail: "Languages" },
  { id: "response", label: "Instant", detail: "Response" },
] as const;

export const ABOUT_WHAT_WE_DO_USE_CASES = [
  "Customer support",
  "Lead qualification",
  "Appointment scheduling",
  "Inbound call handling",
] as const;
