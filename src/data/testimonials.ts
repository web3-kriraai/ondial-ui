export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=160&h=160&q=80`;

export const TESTIMONIAL_ROTATE_MS = 6000;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "priya",
    quote:
      "We replaced three evening support shifts with one Ondial agent and kept CSAT flat. Setup took an afternoon—not a quarter.",
    name: "Priya N.",
    role: "Head of Operations, FleetCo",
    avatarSrc: u("photo-1494790108377-be9c29b29330"),
  },
  {
    id: "marcus",
    quote:
      "Reminder flows that used to need a small call center now run themselves. Our team finally focuses on exceptions, not dial tones.",
    name: "Marcus L.",
    role: "Growth Lead, HealthBridge",
    avatarSrc: u("photo-1507003211169-0a1dd7228f2d"),
  },
  {
    id: "elena",
    quote:
      "Natural turn-taking mattered for our survey program. Respondents finish more often when the voice doesn't sound like a robot.",
    name: "Elena V.",
    role: "CX Director, RetailPulse",
    avatarSrc: u("photo-1438761681033-6461ffad8d80"),
  },
  {
    id: "james",
    quote:
      "Webhooks into our CRM mean every call lands with disposition and transcript. Enterprise review was straightforward.",
    name: "James K.",
    role: "VP Engineering, Stackline",
    avatarSrc: u("photo-1500648767791-00dcc994a43e"),
  },
  {
    id: "sofia",
    quote:
      "Pilot to production in a week: test numbers, tune the script, go live. Minutes saved paid for the platform in month one.",
    name: "Sofia R.",
    role: "CEO, Callpath AI",
    avatarSrc: "/blog_author_avatar_1777703411435.png",
  },
] as const;
