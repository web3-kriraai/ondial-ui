export type NewsBentoBox = {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  dateIso: string;
  href: string;
  isNew?: boolean;
};

export type BentoBoxTone = {
  bg: string;
  tag: string;
  title: string;
  border: string;
};

export const NEWS_PAGE_CONTENT = {
  eyebrow: "Product Updates",
  badge: "OnDial News",
  title: "Your gateway to",
  titleAccent: "AI voice",
  titleThird: "innovation",
  subtitle:
    "Ship notes, feature releases, and integrations - everything your team needs to stay ahead with OnDial.",
  subscribeLabel: "Subscribe for updates",
  subscribeHref: "#footer-newsletter-email",
  exploreLabel: "Explore releases",
  exploreHref: "#news-bento",
  worldMap: {
    src: "/news/half-earth.png",
    alt: "Wireframe world map showing global OnDial AI coverage",
  },
  bento: {
    hero: {
      id: "call-summaries-v2",
      category: "Release",
      title: "AI Call Summaries v2",
      description:
        "Richer post-call summaries with action items, sentiment scoring, and automatic CRM sync.",
      date: "June 2026",
      dateIso: "2026-06",
      href: "/news",
      isNew: true,
    },
    tall: [
      {
        id: "crm-sync",
        category: "Integration",
        title: "HubSpot & Salesforce sync",
        description:
          "Call outcomes and follow-up tasks write back to your CRM in real time - no manual entry after every conversation.",
        date: "May 2026",
        dateIso: "2026-05",
        href: "/news",
      },
      {
        id: "language-routing",
        category: "Platform",
        title: "Multilingual routing",
        description:
          "Detect caller language in the first three seconds and route to the right agent across 100+ languages.",
        date: "May 2026",
        dateIso: "2026-05",
        href: "/news",
      },
    ],
    small: [
      {
        id: "concurrency",
        category: "Infrastructure",
        title: "50 concurrent calls",
        description: "Higher default concurrency on the Growth plan.",
        date: "April 2026",
        dateIso: "2026-04",
        href: "/news",
      },
      {
        id: "hipaa",
        category: "Security",
        title: "HIPAA audit logging",
        description: "Immutable call logs for healthcare teams.",
        date: "April 2026",
        dateIso: "2026-04",
        href: "/news",
      },
      {
        id: "zapier",
        category: "Integration",
        title: "Zapier refresh",
        description: "Lower-latency webhooks for call events.",
        date: "March 2026",
        dateIso: "2026-03",
        href: "/news",
      },
    ],
    statStrip: {
      label: "Platform at a glance",
      stats: [
        { value: "500+", label: "Businesses on OnDial" },
        { value: "100+", label: "Languages supported" },
        { value: "24/7", label: "AI voice coverage" },
        { value: "98%", label: "Avg. answer rate" },
      ],
    },
  },
  boxTones: {
    hero: {
      bg: "bg-[#EEEDFE]",
      tag: "text-[#534AB7]",
      title: "text-[#3D368F]",
      border: "border-[#534AB7]/12",
    },
    tallA: {
      bg: "bg-[#F0FDF4]",
      tag: "text-teal-700",
      title: "text-teal-900",
      border: "border-teal-600/12",
    },
    tallB: {
      bg: "bg-[#EFF6FF]",
      tag: "text-blue-700",
      title: "text-blue-900",
      border: "border-blue-600/12",
    },
    smallA: {
      bg: "bg-[#F5F3FF]",
      tag: "text-violet-700",
      title: "text-violet-900",
      border: "border-violet-600/12",
    },
    smallB: {
      bg: "bg-[#ECFEFF]",
      tag: "text-cyan-800",
      title: "text-cyan-950",
      border: "border-cyan-600/12",
    },
    smallC: {
      bg: "bg-[#E1F5EE]",
      tag: "text-[#085041]",
      title: "text-[#064E3B]",
      border: "border-teal-700/12",
    },
    statStrip: {
      bg: "bg-linear-to-r from-[#534AB7] to-[#4338a8]",
      tag: "text-white/70",
      title: "text-white",
      border: "border-[#534AB7]/20",
    },
  },
} as const;

export type NewsStory = NewsBentoBox;
