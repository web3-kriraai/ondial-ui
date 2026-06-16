/**
 * Footer content — adjust labels, routes, and copy here.
 */

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/return-policy", label: "Returns" },
] as const;

export type FooterLegalLink = (typeof FOOTER_LEGAL_LINKS)[number];

export type FooterNavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export const FOOTER_COMPANY_LINKS: readonly FooterNavLink[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact us" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export const FOOTER_PLATFORM_LINKS: readonly FooterNavLink[] = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
  { href: "/#testimonials", label: "Testimonials" },
] as const;

export const FOOTER_SOCIAL_LINKS: readonly FooterNavLink[] = [
  { href: "https://linkedin.com", label: "LinkedIn", external: true },
  { href: "https://x.com", label: "Twitter / X", external: true },
  { href: "https://github.com", label: "GitHub", external: true },
] as const;

export const FOOTER_BRAND_TAGLINE =
  "AI voice agents for reminders, outreach, surveys, and support—natural conversations at any scale.";

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
  placeholder: "Enter your email…",
  buttonLabel: "Subscribe",
} as const;
