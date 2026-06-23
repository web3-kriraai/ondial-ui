/**
 * Footer content - adjust labels, routes, and copy here.
 */

import {
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
} from "@/config/social";

export type FooterNavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export const FOOTER_QUICK_LINKS: readonly FooterNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  // { href: "/services/sales-agent", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_RESOURCES_LINKS: readonly FooterNavLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/ondial-for-enterprise", label: "Enterprise" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
] as const;

/** Bottom bar legal links (pipe-separated on desktop). */
export const FOOTER_BOTTOM_LEGAL_LINKS: readonly FooterNavLink[] = [
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/privacy", label: "Privacy Policy" },
] as const;

// type FooterLegalLink = (typeof FOOTER_BOTTOM_LEGAL_LINKS)[number];

export const FOOTER_SOCIAL_LINKS: readonly FooterNavLink[] = [
  {
    href: SOCIAL_LINKEDIN_URL,
    label: "LinkedIn",
    external: true,
  },
  {
    href: SOCIAL_INSTAGRAM_URL,
    label: "Instagram",
    external: true,
  },
] as const;

export const FOOTER_BRAND_NAME = "OnDial";

export const FOOTER_BRAND_TAGLINE =
  "Empowering businesses with AI voice agents and innovative IT solutions for smarter, faster, and more connected growth.";

export const FOOTER_CONTACT_EMAIL = "info@ondial.ai";

export const FOOTER_COPYRIGHT_ENTITY = "OnDial AI. All Rights Reserved.";

export const FOOTER_CTA = {
  eyebrow: "Get started",
  title: "Put your next thousand calls on autopilot",
  description:
    "Spin up a voice agent in minutes, test with real numbers, and go live when your script sounds right.",
  buttonLabel: "Get started now",
  buttonHref: "/pricing",
} as const;

export const FOOTER_NEWSLETTER = {
  title: "Newsletter",
  description: "Product updates, voice AI tips, and early access to new features.",
  placeholder: "Enter your email..",
  buttonLabel: "Subscribe",
} as const;

export const FOOTER_COLUMN_TITLES = {
  quickLinks: "Quick Links",
  resources: "Resources",
} as const;
