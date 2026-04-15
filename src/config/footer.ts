/**
 * Footer links — adjust labels and routes here; `SiteFooter` maps them by default.
 */
export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/return-policy", label: "Returns" },
] as const;

export type FooterLegalLink = (typeof FOOTER_LEGAL_LINKS)[number];
