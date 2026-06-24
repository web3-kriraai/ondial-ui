export const PRIVACY_POLICY_META = {
  eyebrow: "Legal",
  title: "Privacy Policy for OnDial.ai",
  lastUpdated: "August 26, 2025",
  intro:
    "At OnDial.ai, your privacy and trust are very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, products, and services. Please read this policy carefully to understand our practices.",
} as const;

export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  lead?: string;
  bullets?: readonly string[];
  footer?: string;
};

export const PRIVACY_POLICY_SECTIONS: readonly PrivacyPolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    lead: "We may collect the following types of information:",
    bullets: [
      "Personal Information: Name, email address, contact details, and any information you provide when signing up or contacting us.",
      "Usage Data: Information about how you use our website, such as IP address, browser type, device information, pages visited, and time spent on our platform.",
      "Cookies & Tracking Technologies: We use cookies and similar tools to improve website performance, personalize your experience, and analyze user behavior.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    lead: "We use your data to:",
    bullets: [
      "Provide, improve, and personalize our AI-powered services.",
      "Communicate with you regarding updates, support, or marketing (with your consent).",
      "Enhance security, prevent fraud, and monitor platform usage.",
      "Comply with legal and regulatory requirements.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Disclosure",
    paragraphs: ["We do not sell or rent your personal data. We may share information only with:"],
    bullets: [
      "Trusted Service Providers (such as hosting, analytics, or payment processors).",
      "Legal Authorities when required by law or to protect our rights.",
      "Business Transfers in case of a merger, acquisition, or sale of assets.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Policy",
    lead: "OnDial.ai uses cookies to:",
    bullets: [
      "Remember your preferences and settings.",
      "Improve website functionality and user experience.",
      "Analyze traffic and optimize performance.",
      "Deliver relevant ads through third-party services (where applicable).",
    ],
    footer: "You can manage or disable cookies anytime in your browser settings.",
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We implement strict security measures to protect your information, including encryption, secure servers, and restricted access. However, please note that no method of online transmission is 100% secure.",
    ],
  },
  {
    id: "privacy-rights",
    title: "Your Privacy Rights",
    lead: "Depending on your location, you may have the right to:",
    bullets: [
      "Access, correct, or delete your personal information.",
      "Opt-out of marketing communications.",
      "Restrict or object to certain data processing.",
      "Request data portability.",
    ],
    footer: "To exercise your rights, please contact us at contact@ondial.ai",
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites. We are not responsible for their privacy practices, so we encourage you to read their policies.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    paragraphs: [
      "OnDial.ai services are not directed at children under 13 (or the minimum age in your country). We do not knowingly collect data from minors.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.',
    ],
  },
] as const;

export const PRIVACY_POLICY_CONTACT = {
  title: "Contact Us",
  description:
    "If you have any questions or concerns about this Privacy Policy, please contact us:",
  email: "contact@ondial.ai",
  website: "https://www.ondial.ai",
  websiteLabel: "ondial.ai",
} as const;
