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

const AI_COMM_IMAGE = "/contact/ai-support.png";
const CONNECTIVITY_IMAGE = "/contact/Global-Language-Coverage.png";
const PRODUCTIVITY_IMAGE = "/contact/Real-Time-Intelligence.png";
const CUSTOMER_FIRST_IMAGE = "/contact/Customer-First-Support.png";
const AUTHOR_AVATAR = "/home/testimonials/1519085360753-af0119f7cbe7.webp";
const AUTHOR_AVATAR_2 = "/home/testimonials/1507003211169-0a1dd7228f2d.webp";
const AUTHOR_AVATAR_3 = "/home/testimonials/1560250097-0b93528c311a.webp";
const AUTHOR_AVATAR_4 = "/home/testimonials/1438761681033-6461ffad8d80.webp";
const AUTHOR_AVATAR_5 = "/home/testimonials/1472099645785-5658abf4ff4e.webp";
const AUTHOR_AVATAR_6 = "/home/testimonials/1487412720507-e7ab37603c6f.webp";
const AUTHOR_AVATAR_7 = "/home/testimonials/1494790108377-be9c29b29330.webp";
const AUTHOR_AVATAR_8 = "/home/testimonials/1500648767791-00dcc994a43e.webp";


export const CONTACT_MISSION_PILLARS: readonly ContactMissionPillar[] = [
  {
    id: "ai-voice",
    number: "01",
    title: "24/7 AI Voice Agents",
    description:
      "Always-on agents that answer, route, and resolve - without waiting for business hours. Deploy in minutes and scale across every inbound line.",
    image: AI_COMM_IMAGE,
    thumbImages: [CONNECTIVITY_IMAGE, PRODUCTIVITY_IMAGE],
    managedBy: [
      { name: "Sarah Mitchell", avatarSrc: AUTHOR_AVATAR },
      { name: "James Chen", avatarSrc: AUTHOR_AVATAR_2 },
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
      { name: "Emily Richards", avatarSrc: AUTHOR_AVATAR_4 },
      { name: "David Park", avatarSrc: AUTHOR_AVATAR_3 },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
  {
    id: "productivity",
    number: "03",
    title: "Real-Time Intelligence",
    description:
      "Instant voice response the moment a call connects - with live summaries, CRM sync, and zero lag in the conversation loop.",
    image: PRODUCTIVITY_IMAGE,
    thumbImages: [AI_COMM_IMAGE, CONNECTIVITY_IMAGE],
    managedBy: [
      { name: "John Carter", avatarSrc: AUTHOR_AVATAR_5 },
      { name: "Priya Sharma", avatarSrc: AUTHOR_AVATAR_6 },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
  {
    id: "customer-first",
    number: "04",
    title: "Customer-First Support",
    description:
      "Human-like, context-aware conversations that feel personal - ensuring every caller is heard and helped exactly when they need it.",
    image: CUSTOMER_FIRST_IMAGE,
    thumbImages: [CONNECTIVITY_IMAGE, AUTHOR_AVATAR],
    managedBy: [
      { name: "Alex Rivera", avatarSrc: AUTHOR_AVATAR_8 },
      { name: "Maya Johnson", avatarSrc: AUTHOR_AVATAR_7 },
    ],
    ctaLabel: "Get a demo",
    ctaHref: "#contact-form",
  },
] as const;
