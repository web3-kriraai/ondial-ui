export type ContactSubjectId =
  | "general"
  | "demo"
  | "support"
  | "partnership";

export type ContactSubject = {
  id: ContactSubjectId;
  label: string;
};

export type ContactChannelId = "phone" | "email" | "office" | "hours";

export type ContactChannel = {
  id: ContactChannelId;
  title: string;
  lines: readonly string[];
  detail?: string;
  href?: string;
};

export const CONTACT_HERO = {
  eyebrow: "Contact Us",
  title: "Conversation",
  titleAccent: "Let's Start a",
  description:
    "Ready to transform your business with AI? Our team of experts is standing by to help you succeed.",
} as const;

export const CONTACT_FORM = {
  title: "Send us a Message",
  description: "Tell us about your project and we'll get back to you",
  submitLabel: "Send Message",
  privacyLabel: "I agree to the privacy policy",
  fields: {
    name: { label: "Full Name", placeholder: "John Doe" },
    email: { label: "Email Address", placeholder: "john@example.com" },
    phone: { label: "Your Phone", placeholder: "9034567890", countryCode: "+91" },
    subject: { label: "Subject" },
    message: {
      label: "Message",
      placeholder: "Tell us about your project, goals, or any questions you have...",
    },
  },
} as const;

export const CONTACT_SIDE = {
  title: "Get in Touch",
  description: "Choose your preferred way to connect",
  asideTitle: "Don't hesitate to contact us",
  asideDescription:
    "Whether you need a demo, have questions about AI voice agents, or want to explore enterprise plans — we're here to help.",
} as const;

export const CONTACT_SUBJECTS: readonly ContactSubject[] = [
  { id: "general", label: "General Inquiry" },
  { id: "demo", label: "Request a Demo" },
  { id: "support", label: "Support" },
  { id: "partnership", label: "Partnership" },
] as const;

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    id: "phone",
    title: "Phone",
    lines: ["+91 90345 67890", "+91 98765 43210"],
    detail: "Mon-Fri from 8am to 6pm",
    href: "tel:+919034567890",
  },
  {
    id: "email",
    title: "Email",
    lines: ["hello@ondial.ai"],
    detail: "We'll respond within 24 hours",
    href: "mailto:hello@ondial.ai",
  },
  {
    id: "office",
    title: "Office",
    lines: ["123 Innovation Drive", "San Francisco, CA 94107"],
    href: "https://maps.google.com/?q=123+Innovation+Drive+San+Francisco+CA+94107",
  },
  {
    id: "hours",
    title: "Work Hours",
    lines: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat - Sun: Closed"],
  },
] as const;
