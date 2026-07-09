export type IndustriesHubCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type HubMatteThemeFields = {
  iconKey: string;
  iconBg: string;
  iconColor: string;
};

export type IndustriesHubIndustry = {
  id: string;
  name: string;
  description: string;
  challenge: string;
  useCases: readonly string[];
  href: string;
  iconKey: string;
} & Partial<HubMatteThemeFields>;

export const INDUSTRIES_HUB_META = {
  title: "AI Voice Agent Solutions Built for Every Industry | OnDial",
  description:
    "OnDial is the enterprise AI voice agent platform for every industry. Automate inbound and outbound calls, CRM integration, scheduling, and support 100+ languages.",
} as const;

export const INDUSTRIES_HUB_HERO = {
  eyebrow: "Industries",
  title: "AI Voice Agent Solutions Built for Every Industry",
  description:
    "OnDial is the enterprise AI voice agent platform built for every industry. Our human-like conversational AI handles inbound and outbound calling, appointment scheduling, lead qualification, and CRM integration, with 24/7 support in 100+ languages and workflows tuned to your sector. Automate high-volume calls without adding headcount, and give every caller a fast, natural response.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Talk to an Expert", href: "/contact", variant: "secondary" },
  ] as const satisfies readonly IndustriesHubCta[],
} as const;

export const INDUSTRIES_HUB_TRUSTED = {
  eyebrow: "Trusted by",
  title: "Trusted by growing businesses across industries worldwide.",
  stats: [
    {
      id: "businesses",
      value: "Thousands",
      label: "of businesses onboarded",
      iconKey: "building",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      id: "countries",
      value: "Dozens",
      label: "of countries served",
      iconKey: "globe",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      id: "calls",
      value: "Millions",
      label: "of calls handled and processed",
      iconKey: "phone-incoming",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      id: "verticals",
      value: "20+",
      label: "industries deployed",
      iconKey: "workflow",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      id: "availability",
      value: "24/7",
      label: "always on, every hour of every day",
      iconKey: "clock",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
  ] as const,
} as const;

export const INDUSTRIES_HUB_INTRO = {
  eyebrow: "Overview",
  title: "What Industries Does OnDial Serve",
  description:
    "Every industry has its own communication challenges. A clinic manages appointments and patient intake. A logistics firm fields delivery updates. A law office qualifies case inquiries. OnDial adapts its AI voice agents to each sector's workflows, compliance requirements, customer expectations, and business goals, so your calls are handled the way your industry actually works.",
} as const;

export const INDUSTRIES_HUB_SOLUTIONS = {
  eyebrow: "Industry solutions",
  title: "Industry Solutions",
} as const;

export const INDUSTRIES_HUB_INDUSTRIES: readonly IndustriesHubIndustry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "OnDial handles patient scheduling, reminders, intake and inquiry routing while keeping conversations compliant and clear.",
    challenge: "High call volume and missed appointments strain front-desk staff",
    useCases: ["appointment booking", "reminders", "patient intake", "refill requests"],
    href: "/industries/ai-voice-agents-healthcare-medical",
    iconKey: "stethoscope",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description:
      "OnDial qualifies leads, books showings, and follows up with buyers and sellers around the clock.",
    challenge: "Agents lose deals when leads wait for a callback",
    useCases: ["lead qualification", "showing scheduling", "follow-up", "listing inquiries"],
    href: "/industries/ai-voice-agents-real-estate",
    iconKey: "building",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    description:
      "OnDial verifies customers, answers account questions, and routes complex requests to the right team.",
    challenge: "Sensitive requests need fast, accurate, and secure handling",
    useCases: ["customer verification", "account inquiries", "payment reminders", "call routing"],
    href: "/industries/ai-voice-agents-finance-banking",
    iconKey: "landmark",
  },
  {
    id: "insurance",
    name: "Insurance",
    description:
      "OnDial supports policy questions, claims intake, and renewal reminders without long hold times.",
    challenge: "Claims and renewals create repetitive, high-volume calls",
    useCases: ["claims support", "policy inquiries", "renewal reminders", "first-notice intake"],
    href: "/industries/ai-voice-agents-insurance",
    iconKey: "file",
  },
  {
    id: "automotive",
    name: "Automotive",
    description:
      "OnDial books service appointments, follows up on quotes, and qualifies sales leads for dealerships.",
    challenge: "Missed calls mean lost service revenue and test drives",
    useCases: ["service scheduling", "sales follow-up", "lead qualification", "recall notices"],
    href: "/industries/ai-voice-agents-automotive",
    iconKey: "car",
  },
  {
    id: "retail",
    name: "Retail",
    description:
      "OnDial answers product and store questions, handles order status, and manages promotions by phone.",
    challenge: "Seasonal call spikes overwhelm limited staff",
    useCases: ["order status", "store inquiries", "returns support", "promotion callbacks"],
    href: "/industries/ai-voice-agents-retail-e-commerce",
    iconKey: "cart",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description:
      "OnDial handles order tracking, returns, and support inquiries so customers get answers instantly.",
    challenge: "Support tickets pile up faster than agents can clear them",
    useCases: ["order tracking", "returns", "delivery updates", "post-purchase support"],
    href: "/industries/ai-voice-agents-retail-e-commerce",
    iconKey: "cart",
  },
  {
    id: "logistics",
    name: "Logistics",
    description:
      "OnDial manages delivery updates, driver coordination, and shipment inquiries at scale.",
    challenge: "Constant status calls tie up operations teams",
    useCases: ["delivery updates", "shipment tracking", "driver coordination", "dispatch support"],
    href: "/industries/ai-voice-agents-transportation-logistics",
    iconKey: "truck",
  },
  {
    id: "transportation",
    name: "Transportation",
    description:
      "OnDial confirms bookings, shares schedules, and handles service inquiries for transport providers.",
    challenge: "Schedule changes generate heavy inbound call traffic",
    useCases: ["booking confirmation", "schedule updates", "service inquiries", "cancellations"],
    href: "/industries/ai-voice-agents-transportation-logistics",
    iconKey: "truck",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "OnDial takes reservations, answers guest questions, and manages requests before and during stays.",
    challenge: "Guests expect instant answers across time zones",
    useCases: ["reservations", "guest inquiries", "upsell offers", "check-in support"],
    href: "/industries/ai-voice-agents-hospitality",
    iconKey: "hotel",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description:
      "OnDial takes orders, manages table reservations, and answers menu and hours questions on every call.",
    challenge: "Busy shifts leave calls unanswered, and orders lost",
    useCases: ["reservations", "order taking", "menu questions", "waitlist updates"],
    href: "/industries/ai-voice-agents-hospitality",
    iconKey: "hotel",
  },
  {
    id: "education",
    name: "Education",
    description:
      "OnDial handles admissions inquiries, enrollment support, and student and parent questions.",
    challenge: "Enrollment periods create sharp, seasonal call demand",
    useCases: ["admissions inquiries", "enrollment support", "scheduling", "reminder calls"],
    href: "/industries/ai-voice-agents-education",
    iconKey: "graduation",
  },
  {
    id: "saas",
    name: "SaaS",
    description:
      "OnDial qualifies inbound leads, books demos, and handles tier-one support for software companies.",
    challenge: "Sales and support teams cannot cover every inbound call",
    useCases: ["lead qualification", "demo booking", "tier-one support", "renewals"],
    href: "/industries/ai-voice-agents-sales-lead-generation",
    iconKey: "rocket",
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description:
      "OnDial manages plan questions, billing inquiries, and service requests without long queues.",
    challenge: "High call volume drives long wait times and churn",
    useCases: ["billing inquiries", "plan support", "service requests", "outage updates"],
    href: "/industries/ai-voice-agents-telecommunications",
    iconKey: "antenna",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description:
      "OnDial handles order inquiries, supplier coordination, and support requests for manufacturers.",
    challenge: "Order and supplier calls pull staff off core work",
    useCases: ["order inquiries", "supplier coordination", "support routing", "follow-up"],
    href: "/industries/ai-voice-agents-manufacturing",
    iconKey: "factory",
  },
  {
    id: "government",
    name: "Government",
    description:
      "OnDial answers citizen inquiries, routes requests, and shares service information in many languages.",
    challenge: "Public service lines face heavy, repetitive demand",
    useCases: ["citizen inquiries", "request routing", "service information", "appointment booking"],
    href: "/industries/ai-voice-agents-government",
    iconKey: "landmark",
  },
  {
    id: "home-services",
    name: "Home Services",
    description:
      "OnDial books jobs, dispatches requests, and follows up with customers for home service firms.",
    challenge: "Missed calls send customers to competitors",
    useCases: ["job booking", "dispatch requests", "quote follow-up", "reminders"],
    href: "/industries/ai-voice-agents-construction",
    iconKey: "hard-hat",
  },
  {
    id: "legal",
    name: "Legal",
    description:
      "OnDial screens case inquiries, books consultations, and handles intake for law firms.",
    challenge: "Qualifying inquiries consume valuable attorney time",
    useCases: ["case intake", "consultation booking", "inquiry screening", "follow-up"],
    href: "/industries/ai-voice-agents-legal",
    iconKey: "scale",
  },
  {
    id: "travel",
    name: "Travel",
    description:
      "OnDial manages bookings, itinerary questions, and changes for travel companies at any hour.",
    challenge: "Travelers need support across time zones and languages",
    useCases: ["booking support", "itinerary questions", "changes", "cancellations"],
    href: "/industries/ai-voice-agents-travel-tourism",
    iconKey: "plane",
  },
  {
    id: "recruitment",
    name: "Recruitment",
    description:
      "OnDial screens candidates, schedules interviews, and follows up throughout the hiring process.",
    challenge: "Manual screening slows time to hire",
    useCases: ["candidate screening", "interview scheduling", "follow-up", "status updates"],
    href: "/industries/ai-voice-agents-sales-lead-generation",
    iconKey: "target",
  },
] as const;

export const INDUSTRIES_HUB_WHY_WORK = {
  eyebrow: "Cross-industry value",
  title: "Why AI Voice Agents Work Across Industries",
  description:
    "The core need is the same everywhere: answer every call, help every caller, and never lose a lead to a busy line. OnDial delivers this through:",
  items: [
    "24/7 availability",
    "Human-like conversation",
    "Lead qualification",
    "Appointment booking",
    "Customer support",
    "CRM integration",
    "Analytics and reporting",
    "Multilingual support",
    "Outbound calling",
    "Inbound call handling",
  ] as const,
} as const;

export const INDUSTRIES_HUB_CHALLENGES = {
  eyebrow: "Common challenges",
  title: "Common Business Challenges",
  description:
    "The problems that cost you revenue show up across every sector. OnDial solves them the same way, on every call.",
  items: [
    {
      problem: "Missed calls",
      solution: "AI answers instantly, day or night.",
      iconKey: "phone-missed",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      problem: "High call volume",
      solution: "AI handles unlimited calls at once.",
      iconKey: "phone-incoming",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      problem: "Long wait times",
      solution: "Callers reach an agent with no hold.",
      iconKey: "clock",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      problem: "Staff shortages",
      solution: "AI covers routine calls, so your team focuses on complex work.",
      iconKey: "users",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      problem: "Manual appointment booking",
      solution: "AI schedules, confirms, and reminds automatically.",
      iconKey: "calendar",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      problem: "Slow lead qualification",
      solution: "AI screens and scores leads in real time.",
      iconKey: "filter",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ] as const,
} as const;

export const INDUSTRIES_HUB_USE_CASES = {
  eyebrow: "By function",
  title: "Use Cases by Business Function",
  description: "Grouped by function, OnDial supports work across your whole organization:",
  groups: [
    {
      label: "Sales",
      items: ["qualify leads", "book demos", "follow up on quotes"],
      iconKey: "target",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      label: "Support",
      items: ["answer inquiries", "route complex cases"],
      iconKey: "headphones",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      label: "Scheduling",
      items: ["book, confirm, and reschedule appointments"],
      iconKey: "calendar",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      label: "Lead qualification",
      items: ["screen and score inbound interest"],
      iconKey: "filter",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      label: "Customer verification",
      items: ["confirm identity before sensitive actions"],
      iconKey: "shield-check",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      label: "Payment reminders",
      items: ["prompt due and overdue balances"],
      iconKey: "credit-card",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      label: "Collections",
      items: ["run respectful, consistent outreach"],
      iconKey: "phone-forwarded",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      label: "Feedback and surveys",
      items: ["gather responses at scale"],
      iconKey: "message-square",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      label: "Emergency notifications",
      items: ["send urgent updates by voice"],
      iconKey: "bell",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      label: "Renewals",
      items: ["remind customers before terms lapse"],
      iconKey: "refresh-cw",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      label: "Order tracking",
      items: ["share status and delivery updates"],
      iconKey: "package",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ] as const,
} as const;

export const INDUSTRIES_HUB_FEATURES = {
  eyebrow: "Platform features",
  title: "AI Voice Features Used Across Industries",
  description: "Each feature applies the same way in every vertical:",
  items: [
    "Human-like AI conversation that keeps callers comfortable",
    "Real-time responses with no awkward pauses",
    "Smart call routing to the right person or team",
    "Appointment scheduling synced to your calendar",
    "CRM integration that logs every interaction",
    "Analytics dashboard for call trends and outcomes",
    "Call recording for quality and training",
    "Call summaries delivered after each conversation",
    "Human handoff when a live agent is needed",
    "Multi-language support in 100+ languages",
    "AI memory that recalls prior context",
    "Knowledge base integration for accurate answers",
  ] as const,
} as const;

export const INDUSTRIES_HUB_COMPARISON = {
  eyebrow: "At a glance",
  title: "Industry Comparison Table",
  rows: [
    {
      industry: "Healthcare",
      challenge: "Missed appointments",
      solution: "Automated reminders",
      benefit: "Fewer no-shows",
    },
    {
      industry: "Real Estate",
      challenge: "Slow lead response",
      solution: "Instant qualification",
      benefit: "More closed deals",
    },
    {
      industry: "Insurance",
      challenge: "Repetitive claims calls",
      solution: "Claims intake support",
      benefit: "Faster processing",
    },
    {
      industry: "Retail",
      challenge: "Seasonal call spikes",
      solution: "Unlimited call capacity",
      benefit: "No missed sales",
    },
    {
      industry: "E-commerce",
      challenge: "Support backlog",
      solution: "Order and returns automation",
      benefit: "Faster resolution",
    },
    {
      industry: "Financial Services",
      challenge: "Sensitive verification",
      solution: "Secure identity checks",
      benefit: "Safer transactions",
    },
    {
      industry: "Restaurants",
      challenge: "Unanswered calls",
      solution: "Order and booking automation",
      benefit: "More reservations",
    },
    {
      industry: "Recruitment",
      challenge: "Slow screening",
      solution: "Automated candidate outreach",
      benefit: "Shorter time to hire",
    },
  ] as const,
} as const;

export const INDUSTRIES_HUB_ADAPTATION = {
  eyebrow: "How we configure",
  title: "How OnDial Adapts to Different Industries",
  description:
    "OnDial is not a one-size template. For each sector, we configure workflows to match your call flow, write scripts in your industry's language, and connect the CRM and tools you already use. We tune compliance handling to your requirements, shape AI prompts to your knowledge base, and set the KPIs and reporting your team measures. The result is an agent that sounds like it belongs to your business.",
} as const;

export const INDUSTRIES_HUB_SECURITY = {
  eyebrow: "Enterprise security",
  title: "Enterprise Security and Compliance",
  description:
    "Security is built into every layer. Data is encrypted in transit and at rest. Role-based access controls limit who can view and manage information. Integrations run through secure APIs. OnDial aligns with recognized compliance standards for handling sensitive data, and detailed audit logs record system activity for accountability. Enterprise-grade reliability keeps your voice operations running consistently at scale.",
} as const;

export const INDUSTRIES_HUB_STORIES = {
  eyebrow: "Customer success",
  title: "Customer Success Stories",
  description: "These outcomes are representative of what businesses commonly achieve.",
  stories: [
    {
      title: "Multi-location dental group",
      body: "A multi-location dental group struggled with missed calls during peak hours. After deploying OnDial for scheduling and reminders, the practice saw fewer missed appointments and freed front-desk staff for in-office patients.",
      iconKey: "sparkles",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Regional real estate team",
      body: "A regional real estate team lost leads that arrived after business hours. With OnDial qualifying and routing inquiries around the clock, the team reached prospects faster and moved more of them into showings.",
      iconKey: "building",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "Growing e-commerce brand",
      body: "A growing e-commerce brand faced a support backlog during sale events. OnDial handled order tracking and returns questions instantly, producing faster response times and lighter load on human agents.",
      iconKey: "package",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
  ] as const,
} as const;

export const INDUSTRIES_HUB_WHY_CHOOSE = {
  eyebrow: "Why OnDial",
  title: "Why Businesses Choose OnDial",
  items: [
    "24/7 AI that never misses a call",
    "Support for 100+ languages",
    "Enterprise readiness and security",
    "Scalability for any call volume",
    "Fast deployment",
    "Custom AI voice for your brand",
    "Analytics and reporting",
    "CRM integrations",
    "Human handoff when needed",
  ] as const,
} as const;

export const INDUSTRIES_HUB_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "Which industries use AI voice agents?",
      answer:
        "Nearly all of them, including healthcare, real estate, finance, insurance, retail, e-commerce, hospitality, and many more.",
    },
    {
      question: "Can small businesses use OnDial?",
      answer:
        "Yes. OnDial scales from single-location businesses to large enterprises without changing the setup process.",
    },
    {
      question: "How is OnDial different from a standard IVR?",
      answer:
        "OnDial holds natural conversations and completes tasks, rather than forcing callers through rigid menu options.",
    },
    {
      question: "Does OnDial support enterprise deployment?",
      answer:
        "Yes. OnDial is built for enterprise scale, with security controls, integrations, and reliability for large call volumes.",
    },
    {
      question: "Does the AI integrate with CRM systems?",
      answer: "Yes. OnDial connects to major CRMs and logs every call and outcome automatically.",
    },
    {
      question: "Can the AI transfer calls to a human?",
      answer: "Yes. OnDial hands off to a live agent whenever a call needs a person.",
    },
    {
      question: "How long does deployment take?",
      answer:
        "Most businesses launch quickly, since setup involves configuration rather than lengthy custom development.",
    },
    {
      question: "Can healthcare providers use AI voice agents?",
      answer:
        "Yes. OnDial handles scheduling, reminders, and intake with attention to compliance and clarity.",
    },
    {
      question: "Can real estate teams automate lead qualification?",
      answer: "Yes. OnDial screens and scores inbound leads instantly, then routes them to the right agent.",
    },
    {
      question: "Does OnDial work for restaurants and retail?",
      answer: "Yes. It manages reservations, orders, store questions, and returns across both sectors.",
    },
    {
      question: "Is customer data encrypted?",
      answer: "Yes. Data is encrypted in transit and at rest, with role-based access controls.",
    },
    {
      question: "Does OnDial keep audit logs?",
      answer: "Yes. System activity is recorded in detailed logs for compliance and accountability.",
    },
  ] as const,
} as const;

export const INDUSTRIES_HUB_RESOURCES = {
  eyebrow: "Related resources",
  title: "Related Resources",
  links: [
    { label: "Services", href: "/services" },
    { label: "OnDial for Enterprise", href: "/ondial-for-enterprise" },
    { label: "Blog", href: "/blog" },
    { label: "Countries", href: "/countries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ] as const,
} as const;

export const INDUSTRIES_HUB_FINAL_CTA = {
  title: "Ready to Transform Customer Communication Across Every Industry?",
  description: "See how OnDial handles your calls in your language, tuned to your industry.",
  ctas: [
    { label: "Book Demo", href: "/contact", variant: "primary" },
    { label: "Talk to Sales", href: "/contact", variant: "secondary" },
    { label: "Start Free Trial", href: "/signup", variant: "secondary" },
  ] as const satisfies readonly IndustriesHubCta[],
} as const;
