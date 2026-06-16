export type ContactMissionPillarId =
  | "ai-voice"
  | "global-connectivity"
  | "productivity"
  | "customer-first";

export type ContactMissionManagedBy = {
  name: string;
  avatarSrc: string;
};

export type ContactMissionPillar = {
  id: ContactMissionPillarId;
  number: string;
  title: string;
  description: string;
  image: string;
  thumbImages: [string, string];
  managedBy: readonly ContactMissionManagedBy[];
  ctaLabel: string;
  ctaHref: string;
};

export const CONTACT_MISSION_HEADING = {
  eyebrow: "Our Mission",
  title: "Comprehensive AI voice services tailored to your business",
  ctaHref: "#contact-form",
} as const;

const AUTHOR_AVATAR = "/blog_author_avatar_1777703411435.png";
const AI_COMM_IMAGE = "/blog_ai_comm_1777703161729.png";
const CONNECTIVITY_IMAGE = "/blog_connectivity_1777703241008.png";
const PRODUCTIVITY_IMAGE = "/blog_productivity_1777703371947.png";

export const CONTACT_MISSION_PILLARS: readonly ContactMissionPillar[] = [
  {
    id: "ai-voice",
    number: "01",
    title: "24/7 AI Voice Agents",
    description:
      "Always-on agents that answer, route, and resolve — without waiting for business hours. Deploy in minutes and scale across every inbound line.",
    image: AI_COMM_IMAGE,
    thumbImages: [CONNECTIVITY_IMAGE, PRODUCTIVITY_IMAGE],
    managedBy: [
      { name: "Sarah Mitchell", avatarSrc: AUTHOR_AVATAR },
      { name: "James Chen", avatarSrc: AUTHOR_AVATAR },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
  {
    id: "global-connectivity",
    number: "02",
    title: "Global Language Coverage",
    description:
      "Speak every market your customers call from with fluent, localized voice AI across 100+ languages and regional dialects.",
    image: CONNECTIVITY_IMAGE,
    thumbImages: [AI_COMM_IMAGE, PRODUCTIVITY_IMAGE],
    managedBy: [
      { name: "Emily Richards", avatarSrc: AUTHOR_AVATAR },
      { name: "David Park", avatarSrc: AUTHOR_AVATAR },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
  {
    id: "productivity",
    number: "03",
    title: "Real-Time Intelligence",
    description:
      "Instant voice response the moment a call connects — with live summaries, CRM sync, and zero lag in the conversation loop.",
    image: PRODUCTIVITY_IMAGE,
    thumbImages: [AI_COMM_IMAGE, CONNECTIVITY_IMAGE],
    managedBy: [
      { name: "John Carter", avatarSrc: AUTHOR_AVATAR },
      { name: "Priya Sharma", avatarSrc: AUTHOR_AVATAR },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
  {
    id: "customer-first",
    number: "04",
    title: "Customer-First Support",
    description:
      "Human-like, context-aware conversations that feel personal — ensuring every caller is heard and helped exactly when they need it.",
    image: AI_COMM_IMAGE,
    thumbImages: [CONNECTIVITY_IMAGE, AUTHOR_AVATAR],
    managedBy: [
      { name: "Alex Rivera", avatarSrc: AUTHOR_AVATAR },
      { name: "Maya Johnson", avatarSrc: AUTHOR_AVATAR },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
] as const;
