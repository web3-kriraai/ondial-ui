import { DASHBOARD_SIGNUP_URL } from "@/config/urls";

export type FeaturesHubCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type FeaturesHubThemeFields = {
  iconKey: string;
  iconBg: string;
  iconColor: string;
};

export type FeaturesHubFeatureItem = FeaturesHubThemeFields & {
  title: string;
  description: string;
};

export type FeaturesHubCategory = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly FeaturesHubFeatureItem[];
};

export const FEATURES_HUB_META = {
  title: "AI Voice Agent Features | Enterprise Platform | OnDial",
  description:
    "Explore enterprise AI voice agent features including AI call automation, multilingual conversations, CRM integrations, analytics, and enterprise security.",
  canonicalPath: "/features",
} as const;

export const FEATURES_HUB_HERO = {
  eyebrow: "Platform features",
  title: "Enterprise AI Voice Agent Features",
  subtitle: "Everything Your Business Needs to Automate Phone Calls with AI",
  description:
    "One platform for conversation intelligence, natural voice, call management, sales automation, customer support, and enterprise-grade security. Built to handle every inbound and outbound call your business makes, in over 100 languages, without adding headcount.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Watch Demo", href: "#how-it-works", variant: "secondary" },
  ] as const satisfies readonly FeaturesHubCta[],
  stats: [
    { id: "languages", value: "100+", label: "languages supported" },
    { id: "accents", value: "50+", label: "regional accents" },
    { id: "latency", value: "<1s", label: "avg. response latency" },
    { id: "uptime", value: "24/7", label: "always-on availability" },
  ] as const,
} as const;

export const FEATURES_HUB_QUICK_ANSWER = {
  eyebrow: "Quick answer",
  title: "What is OnDial?",
  body: "OnDial is an AI voice agent platform that answers and makes phone calls for businesses in real time. It understands natural speech, responds like a trained human agent, works 24/7 in more than 100 languages, and connects directly to the CRM, calendar, and support tools you already use. OnDial is built for teams that handle high call volumes, including sales, customer support, healthcare front desks, collections, and enterprise contact centers, and meets compliance standards including SOC 2, HIPAA, GDPR, PCI DSS, and ISO.",
} as const;

export const FEATURES_HUB_OVERVIEW = {
  eyebrow: "Platform overview",
  title: "What Is OnDial and Who Is It For",
  cards: [
    {
      title: "Always-on voice automation",
      description:
        "OnDial is an AI voice agent platform that automates phone-based conversations for businesses. Instead of routing callers through hold music and phone trees, OnDial provides an always-on voice agent that picks up on the first ring, understands what the caller needs, and either resolves the request or hands it off to a human with full context attached.",
      iconKey: "phone-incoming",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Inbound and outbound at scale",
      description:
        "The platform handles inbound and outbound calls. Inbound: customer support, appointment booking, order status, and lead qualification. Outbound: payment reminders, lead follow-up, appointment confirmations, surveys, and win-back outreach at any volume, without hiring a larger calling team.",
      iconKey: "phone-forwarded",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "Built for high-volume teams",
      description:
        "OnDial is built for organizations where phone calls are high-volume, repetitive, and revenue-critical: healthcare providers, banks and NBFCs, insurance carriers, real estate teams, retail and e-commerce brands, call centers and BPOs, and enterprise sales, HR, and operations teams.",
      iconKey: "users",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
  ] as const,
} as const;

const conversationItems = [
  {
    title: "Human-like conversations",
    description: "Natural phrasing, tone, and pacing that sound like a trained rep—not a phone tree.",
    iconKey: "message-square",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Context memory",
    description: "Tracks everything said earlier in the call and, where enabled, prior interactions.",
    iconKey: "workflow",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Intent detection",
    description: "Understands what a caller wants even when phrased differently from training examples.",
    iconKey: "target",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    title: "Dynamic responses",
    description: "Built in real time rather than following fixed decision trees or rigid scripts.",
    iconKey: "sparkles",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    title: "Interrupt handling",
    description: "Lets callers change the subject mid-sentence without breaking the conversation flow.",
    iconKey: "phone-call",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    title: "Multi-turn conversations",
    description: "Manages multi-step exchanges in a single call—from intake through resolution.",
    iconKey: "workflow",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Conversation summarization",
    description: "Generates a written summary after every call for CRM logging and team review.",
    iconKey: "file",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Real-time reasoning",
    description: "Decides the next best action while the call is in progress—not after it ends.",
    iconKey: "sparkles",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    title: "Emotion and sentiment detection",
    description: "Flags frustration early so the agent can de-escalate or route to a human.",
    iconKey: "headphones",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    title: "Natural pauses and turn-taking",
    description: "Makes the call feel like a conversation with appropriate pacing and silence.",
    iconKey: "message-square",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
] as const satisfies readonly FeaturesHubFeatureItem[];

const voiceItems = [
  {
    title: "Human-like AI voice",
    description: "Modern voice synthesis that sounds natural across languages and use cases.",
    iconKey: "sparkles",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Voice cloning",
    description: "Create a custom, branded AI voice that matches your company's identity.",
    iconKey: "users",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "100+ languages and 50+ accents",
    description: "Regional accents and automatic language detection on a single phone number.",
    iconKey: "languages",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    title: "Noise suppression",
    description: "Clear audio processing so callers are understood even in noisy environments.",
    iconKey: "filter",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    title: "High-accuracy speech recognition",
    description: "ASR tuned for accents, dialects, and real-world phone audio quality.",
    iconKey: "message-square",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    title: "Voice customization and SSML",
    description: "Fine-tune pronunciation, pacing, and emphasis with SSML and voice controls.",
    iconKey: "workflow",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Campaign voice switching",
    description: "Use different voices across campaigns without rebuilding your infrastructure.",
    iconKey: "refresh-cw",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Sub-second response latency",
    description: "Average response time keeps conversations natural without awkward pauses.",
    iconKey: "clock",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
] as const satisfies readonly FeaturesHubFeatureItem[];

const callManagementItems = [
  {
    title: "Incoming call handling",
    description: "Instant 24/7 pickup so no caller hits voicemail or waits on hold.",
    iconKey: "phone-incoming",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Outbound calling",
    description: "Run campaigns at any volume—reminders, follow-ups, surveys, and outreach.",
    iconKey: "phone-forwarded",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Call routing and transfers",
    description: "Smart routing, warm transfers with agent briefing, and cold transfers when needed.",
    iconKey: "workflow",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    title: "Hold and queue handling",
    description: "Manage wait times and queue position without losing caller context.",
    iconKey: "clock",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    title: "Voicemail detection",
    description: "Detect answering machines and adjust outbound campaign behavior automatically.",
    iconKey: "phone-missed",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    title: "Call recording",
    description: "Record every conversation for QA, compliance, and training review.",
    iconKey: "file",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Conference and multi-party calls",
    description: "Support multi-party conversations when a call needs more than two participants.",
    iconKey: "users",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
] as const satisfies readonly FeaturesHubFeatureItem[];

const salesItems = [
  {
    title: "Lead qualification",
    description: "Automatic scoring based on caller responses and your qualification criteria.",
    iconKey: "target",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Appointment and demo booking",
    description: "Books from live calendar availability—no back-and-forth scheduling emails.",
    iconKey: "calendar",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Lead nurturing",
    description: "Follow defined schedules to keep prospects warm between human touchpoints.",
    iconKey: "refresh-cw",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    title: "Automated follow-up calls",
    description: "Trigger outbound follow-ups after form fills, demos, or missed connections.",
    iconKey: "phone-forwarded",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    title: "Sales scripts and playbooks",
    description: "Deploy proven talk tracks while keeping responses dynamic and contextual.",
    iconKey: "file",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    title: "CRM sync",
    description: "Removes manual data entry—every qualified lead logs to your CRM automatically.",
    iconKey: "workflow",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Real-time objection handling",
    description: "Responds to common objections during the call without breaking flow.",
    iconKey: "message-square",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Sales analytics",
    description: "Track call-to-conversion rates by campaign, script, and segment.",
    iconKey: "bar-chart",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
] as const satisfies readonly FeaturesHubFeatureItem[];

const supportItems = [
  {
    title: "FAQ handling",
    description: "Answers common questions from your knowledge base without agent intervention.",
    iconKey: "message-square",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Automatic ticket creation",
    description: "Opens support tickets with written summaries when issues need follow-up.",
    iconKey: "file",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Complaint handling",
    description: "De-escalation paths for frustrated callers before routing to a human.",
    iconKey: "headphones",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    title: "Escalation management",
    description: "Routes complex calls to humans with full conversation context attached.",
    iconKey: "users",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    title: "Knowledge base lookup",
    description: "Pulls answers from your documentation in real time during the call.",
    iconKey: "workflow",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    title: "Order status updates",
    description: "Gives callers shipping, delivery, and fulfillment updates on demand.",
    iconKey: "package",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    title: "Refund and return status",
    description: "Handles post-purchase inquiries without tying up your support team.",
    iconKey: "credit-card",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    title: "Customer verification",
    description: "Identity checks that support HIPAA and PCI DSS compliance requirements.",
    iconKey: "shield-check",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
] as const satisfies readonly FeaturesHubFeatureItem[];

export const FEATURES_HUB_CATEGORIES: readonly FeaturesHubCategory[] = [
  {
    id: "conversation-intelligence",
    eyebrow: "Feature categories",
    title: "AI Conversation Intelligence Features",
    description:
      "The conversation engine is what separates a voice agent that sounds like a phone tree from one that sounds like a trained rep.",
    items: conversationItems,
  },
  {
    id: "voice-technology",
    eyebrow: "Voice technology",
    title: "Voice Technology Features",
    items: voiceItems,
  },
  {
    id: "call-management",
    eyebrow: "Call management",
    title: "Call Management Features",
    items: callManagementItems,
  },
  {
    id: "sales-automation",
    eyebrow: "Sales automation",
    title: "Sales Automation Features",
    items: salesItems,
  },
  {
    id: "customer-support",
    eyebrow: "Customer support",
    title: "Customer Support Features",
    items: supportItems,
  },
] as const;

export const FEATURES_HUB_INTEGRATIONS = {
  eyebrow: "Integrations",
  title: "Integrations",
  description:
    "OnDial connects to the tools businesses already run. A REST API and webhooks cover anything not listed. Every integration removes manual data entry—when OnDial books an appointment, qualifies a lead, or resolves a ticket, the outcome syncs back automatically.",
  items: [
    {
      category: "CRM",
      tools: "Salesforce, HubSpot, Zoho",
      iconKey: "workflow",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      category: "Scheduling",
      tools: "Calendly and standard calendars",
      iconKey: "calendar",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      category: "Telephony",
      tools: "Twilio",
      iconKey: "phone-call",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      category: "Alerts",
      tools: "Slack",
      iconKey: "bell",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      category: "Workflow Automation",
      tools: "Zapier",
      iconKey: "workflow",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      category: "E-commerce",
      tools: "Shopify, Magento, WooCommerce",
      iconKey: "cart",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      category: "Enterprise Systems",
      tools: "ERP, LMS, claims systems, and helpdesk tools",
      iconKey: "building",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      category: "Developer",
      tools: "REST API and webhooks for custom integrations",
      iconKey: "sparkles",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ] as const,
} as const;

export const FEATURES_HUB_SECURITY = {
  eyebrow: "Enterprise security",
  title: "Enterprise Security, Compliance, and Reliability",
  description:
    "Role-based permissions (RBAC), audit logs, encryption in transit and at rest, API and webhook access, and customer verification before sharing sensitive information. Enterprise-grade infrastructure supporting thousands of simultaneous conversations, elastic scaling for demand spikes, 24/7/365 uptime design, and private or dedicated deployment options for strict data residency requirements.",
  certifications: [
    {
      label: "SOC 2",
      detail: "Audited controls for enterprise trust",
      iconKey: "shield-check",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      label: "HIPAA",
      detail: "Safeguards for protected health information",
      iconKey: "heart-pulse",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      label: "GDPR",
      detail: "Privacy-by-design for EU data subjects",
      iconKey: "globe",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      label: "PCI DSS",
      detail: "Secure handling of payment information",
      iconKey: "credit-card",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      label: "ISO",
      detail: "Certified information security management",
      iconKey: "award",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      label: "TRAI DLT",
      detail: "India outbound communication alignment",
      iconKey: "antenna",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      label: "DPDP",
      detail: "India Digital Personal Data Protection Act readiness",
      iconKey: "lock",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
  ] as const,
} as const;

export const FEATURES_HUB_ANALYTICS = {
  eyebrow: "Analytics",
  title: "Analytics and Reporting",
  items: [
    {
      title: "Live dashboard",
      description: "Call volume, resolution rate, and CSAT in real time.",
      iconKey: "bar-chart",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Live call monitoring",
      description: "Supervisors observe active conversations as they happen.",
      iconKey: "headphones",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "Call sentiment scoring",
      description: "Measure caller satisfaction and frustration across every interaction.",
      iconKey: "sparkles",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Agent performance comparison",
      description: "Compare scripts and campaigns to find what converts best.",
      iconKey: "target",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      title: "CSAT tracking",
      description: "Automated post-call surveys capture satisfaction scores.",
      iconKey: "check",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      title: "Conversion and duration metrics",
      description: "Response time, conversion tracking, and call duration analytics.",
      iconKey: "bar-chart",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Recordings and transcripts",
      description: "Full call recordings and searchable transcripts for every conversation.",
      iconKey: "file",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "Custom exportable reports",
      description: "Build and export reports tailored to your team's KPIs.",
      iconKey: "workflow",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ] as const,
} as const;

export const FEATURES_HUB_AUTOMATION = {
  eyebrow: "Automation",
  title: "Automation and Workflows",
  items: [
    {
      title: "No-code workflow builder",
      description: "Design multi-step call flows without engineering resources.",
      iconKey: "workflow",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Event triggers",
      description: "Start calls or CRM updates from form submissions, missed payments, or bookings.",
      iconKey: "bell",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "API automation",
      description: "Trigger calls programmatically from your existing systems and apps.",
      iconKey: "sparkles",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Automatic CRM sync",
      description: "Every call outcome logs to your CRM without manual data entry.",
      iconKey: "workflow",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      title: "Calendar updates",
      description: "Bookings and reschedules sync to connected calendars in real time.",
      iconKey: "calendar",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      title: "Follow-up email and SMS",
      description: "Send confirmations and follow-ups automatically after calls complete.",
      iconKey: "message-square",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
  ] as const,
} as const;

export const FEATURES_HUB_INDUSTRIES = {
  eyebrow: "Industries",
  title: "Industries OnDial Serves",
  description:
    "The same feature set adapts to 20+ industries through pre-built conversation templates.",
  items: [
    { name: "Healthcare", href: "/industries/ai-voice-agents-healthcare-medical", iconKey: "building" },
    { name: "Insurance", href: "/industries/ai-voice-agents-insurance", iconKey: "shield-check" },
    { name: "Finance and Banking", href: "/industries/ai-voice-agents-finance-banking", iconKey: "credit-card" },
    { name: "Real Estate", href: "/industries/ai-voice-agents-real-estate", iconKey: "building" },
    { name: "Sales and Lead Generation", href: "/industries/ai-voice-agents-sales-lead-generation", iconKey: "target" },
    { name: "Call Centers and BPO", href: "/industries/ai-voice-agents-call-centers-bpo", iconKey: "headphones" },
    { name: "Retail and E-commerce", href: "/industries/ai-voice-agents-retail-e-commerce", iconKey: "cart" },
    { name: "Telecommunications", href: "/industries/ai-voice-agents-telecommunications", iconKey: "antenna" },
    { name: "Automotive", href: "/industries/ai-voice-agents-automotive", iconKey: "car" },
    { name: "Education", href: "/industries/ai-voice-agents-education", iconKey: "graduation" },
    { name: "Travel and Tourism", href: "/industries/ai-voice-agents-travel-tourism", iconKey: "globe" },
    { name: "Hospitality", href: "/industries/ai-voice-agents-hospitality", iconKey: "hotel" },
    { name: "Legal", href: "/industries/ai-voice-agents-legal", iconKey: "file" },
    { name: "Government", href: "/industries/ai-voice-agents-government", iconKey: "building" },
    { name: "Utilities", href: "/industries/ai-voice-agents-utilities", iconKey: "workflow" },
    { name: "Non-Profit", href: "/industries/ai-voice-agents-non-profit-organizations", iconKey: "users" },
    { name: "Transportation and Logistics", href: "/industries/ai-voice-agents-transportation-logistics", iconKey: "package" },
    { name: "Manufacturing", href: "/industries/ai-voice-agents-manufacturing", iconKey: "building" },
    { name: "Construction", href: "/industries/ai-voice-agents-construction", iconKey: "building" },
    { name: "Agriculture", href: "/industries/ai-voice-agents-agriculture", iconKey: "globe" },
  ] as const,
} as const;

export const FEATURES_HUB_NUMBERS = {
  eyebrow: "By the numbers",
  title: "OnDial by the Numbers",
  stats: [
    { value: "100+", label: "languages supported" },
    { value: "50+", label: "regional accents" },
    { value: "<1s", label: "average response latency" },
    { value: "High", label: "transcription accuracy across accents" },
    { value: "1000s", label: "concurrent calls without drops" },
    { value: "24/7/365", label: "availability" },
  ] as const,
} as const;

export const FEATURES_HUB_HOW_IT_WORKS = {
  eyebrow: "How it works",
  title: "How OnDial Works",
  steps: [
    {
      title: "Set up the campaign",
      description: "Enter company details, pick a use case, and define the call objective.",
    },
    {
      title: "Choose a voice and connect systems",
      description: "Select a voice, pick language, and connect your CRM and calendar.",
    },
    {
      title: "Upload contacts or go live",
      description: "Upload contacts for outbound or go live on inbound with your phone number.",
    },
    {
      title: "Launch instantly or schedule",
      description: "Start immediately or schedule campaigns—no engineering queue required.",
    },
    {
      title: "Monitor and refine",
      description: "Use live dashboards, then adjust scripts and targeting based on data.",
    },
  ] as const,
} as const;

export const FEATURES_HUB_PRICING = {
  eyebrow: "Pricing",
  title: "Pricing",
  description:
    "Usage-based, per-minute pricing. Every plan includes the full feature set. Concurrent channels and phone numbers are billed separately.",
  footnote: "Higher tiers add volume and concurrent channels—not locked features.",
  ctas: [
    { label: "Start Free Trial", href: DASHBOARD_SIGNUP_URL, variant: "primary" },
    { label: "Contact Sales for Enterprise Pricing", href: "/contact", variant: "secondary" },
  ] as const satisfies readonly FeaturesHubCta[],
} as const;

export const FEATURES_HUB_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "What features does OnDial include in every plan?",
      answer:
        "Every plan includes conversation intelligence, 100+ language voice technology, call routing and transfers, CRM and calendar integrations, live analytics, and enterprise-grade encryption. Higher tiers add volume and concurrent channels, not locked features.",
    },
    {
      question: "Does OnDial support multiple languages on the same phone number?",
      answer:
        "Yes. OnDial detects the caller's language automatically and responds in that language on a single number.",
    },
    {
      question: "Can OnDial handle both inbound and outbound calls?",
      answer:
        "Yes. Both directions run on the same conversation intelligence and connect to the same CRM and analytics.",
    },
    {
      question: "How does OnDial integrate with my CRM?",
      answer:
        "Native connections to Salesforce, HubSpot, and Zoho. Other CRMs connect through the open API, webhooks, or Zapier.",
    },
    {
      question: "What compliance certifications does OnDial hold?",
      answer:
        "SOC 2, HIPAA, GDPR, PCI DSS, and ISO. For India, TRAI DLT alignment and DPDP Act compliance.",
    },
    {
      question: "Is OnDial HIPAA compliant for healthcare calls?",
      answer:
        "Yes. OnDial protects health information on every call for appointment reminders, prescription follow-ups, and patient intake.",
    },
    {
      question: "How fast does OnDial's AI agent respond during a call?",
      answer:
        "Sub-second average response time, keeping conversations natural without awkward pauses.",
    },
    {
      question: "Can OnDial transfer a call to a human agent?",
      answer:
        "Yes. Warm transfers with conversation briefing and cold transfers with direct routing are both supported.",
    },
    {
      question: "Does OnDial offer real-time analytics dashboards?",
      answer:
        "Yes. Call volume, resolution rate, CSAT, sentiment, and conversion data update as calls happen.",
    },
    {
      question: "How many calls can OnDial handle at the same time?",
      answer:
        "Thousands of simultaneous conversations, built for peak-hour readiness without dropped calls.",
    },
    {
      question: "Does OnDial work with e-commerce platforms like Shopify?",
      answer:
        "Yes. Shopify, Magento, and WooCommerce integrations enable abandoned cart recovery, order updates, and delivery notifications.",
    },
  ] as const,
} as const;

export const FEATURES_HUB_FINAL_CTA = {
  title: "See Every Feature in Action",
  description:
    "Book a demo to see conversation intelligence, voice quality, integrations, and analytics on your own use case, or start a free trial and test the platform yourself.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Start Free Trial", href: DASHBOARD_SIGNUP_URL, variant: "secondary" },
  ] as const satisfies readonly FeaturesHubCta[],
} as const;
