export type ServicesCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type ServicesIndustryCategory =
  | "all"
  | "healthcare"
  | "finance"
  | "sales"
  | "services"
  | "infra";

export type ServicesIndustry = {
  id: string;
  category: Exclude<ServicesIndustryCategory, "all">;
  name: string;
  /** Short teaser on the industry card */
  summary: string;
  /** Full industry paragraph */
  description: string;
  /** Capability bullets from the short-form copy */
  highlights: readonly string[];
  href?: string;
  iconKey: string;
  iconBg: string;
  iconColor: string;
};

export const SERVICES_HERO = {
  tag: "The Intelligence Behind Every Call",
  titleLead: "OnDial",
  titleAccent: "Best AI call assistant",
  description:
    "Transform the way your business communicates. From healthcare reminders to retail updates and financial alerts, OnDial's AI-powered call automation delivers speed, accuracy, and scalability across 20+ industries.",
  ctas: [
    { label: "Get a Demo", href: "/contact", variant: "primary" },
  ] as const satisfies readonly ServicesCta[],
  stats: [
    { id: "industries", value: "20+", label: "Industries served" },
    { id: "languages", value: "100+", label: "Languages" },
    { id: "availability", value: "24/7", label: "Availability" },
    { id: "latency", value: "<500ms", label: "Response time" },
  ] as const,
} as const;

export const SERVICES_WHY_CHOOSE = {
  eyebrow: "The intelligence behind every call",
  title: "Why Choose OnDial?",
  description:
    "Purpose-built AI voice automation with industry templates, enterprise compliance, and integrations that go live in minutes - not months.",
  cards: [
    {
      id: "industry-ai",
      title: "Industry-Specific AI",
      description:
        "Tailored templates for healthcare, finance, retail, logistics, and more - ready to deploy in minutes.",
      iconKey: "hospital",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      id: "cost-savings",
      title: "Cost Savings",
      description: "Reduce call center overhead with automation that scales without adding headcount.",
      iconKey: "trending-down",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      id: "compliance",
      title: "Compliance Ready",
      description: "Built to meet sector-specific regulations including HIPAA, PCI DSS, and GDPR.",
      iconKey: "shield",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      id: "integrations",
      title: "Seamless Integrations",
      description: "CRM, APIs, and webhooks supported - connect Salesforce, HubSpot, Zoho, and more.",
      iconKey: "plug",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      id: "analytics",
      title: "Real-Time Analytics",
      description: "Track performance, conversions, and call outcomes with live dashboards and transcripts.",
      iconKey: "chart",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ] as const,
} as const;

export const SERVICES_INDUSTRY_FILTERS: readonly {
  id: ServicesIndustryCategory;
  label: string;
}[] = [
  { id: "all", label: "All industries" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "sales", label: "Sales" },
  { id: "services", label: "Services" },
  { id: "infra", label: "Infrastructure" },
] as const;

export const SERVICES_INDUSTRIES: readonly ServicesIndustry[] = [
  {
    id: "healthcare",
    category: "healthcare",
    name: "Healthcare & Medical",
    summary:
      "Appointment reminders, prescription refills, follow-ups, lab results, and chronic care management.",
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab results, and chronic care management. Improve patient engagement and reduce no-shows. With AI-driven voice calls, hospitals and clinics can save staff time, ensure patients never miss critical medications, and enhance overall care quality. OnDial helps healthcare providers deliver compassionate, efficient, and compliant communication at scale.",
    highlights: [
      "Appointment reminders and confirmations",
      "Prescription refill notifications",
      "Post-treatment follow-up calls",
      "Lab result delivery alerts",
      "Chronic care management check-ins",
    ],
    href: "/industries/ai-voice-agents-healthcare-medical",
    iconKey: "stethoscope",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "finance",
    category: "finance",
    name: "Finance & Banking",
    summary: "Fraud alerts, loan updates, payment reminders, credit score alerts, and account notifications.",
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score alerts, and account notifications. Banks and financial institutions can use OnDial to reduce missed payments, detect fraud faster, and provide secure account notifications instantly. Automated calls build trust with customers while keeping financial communication fast and reliable.",
    highlights: [
      "Fraud detection alerts in real time",
      "Loan status and approval updates",
      "Payment due date reminders",
      "Credit score change notifications",
      "Account activity alerts",
    ],
    href: "/industries/ai-voice-agents-finance-banking",
    iconKey: "landmark",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "realestate",
    category: "sales",
    name: "Real Estate",
    summary: "Property inquiries, viewings, market updates, lease renewals, and closing process updates.",
    description:
      "Handle property inquiries, schedule viewings, send market updates, lease renewals, and closing process updates. Realtors and property managers can use AI voice calls to nurture leads, keep clients updated on new listings, and simplify follow-ups. By automating these interactions, agents save time and close deals faster while improving the buyer and tenant experience.",
    highlights: [
      "Property inquiry handling 24/7",
      "Schedule and confirm property viewings",
      "Market update notifications",
      "Lease renewal reminders",
      "Closing process status updates",
    ],
    href: "/industries/ai-voice-agents-real-estate",
    iconKey: "building",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "retail",
    category: "sales",
    name: "Retail & E-commerce",
    summary: "Abandoned cart recovery, order updates, feedback, returns, and seasonal promotions.",
    description:
      "Recover abandoned carts, send order updates, collect feedback, manage returns, and promote seasonal offers. Retailers can boost sales by reconnecting with shoppers through timely voice reminders and personalized product recommendations. Automated calls also enhance loyalty programs and reduce customer service workload, driving more revenue with less effort.",
    highlights: [
      "Abandoned cart recovery calls",
      "Order status and delivery updates",
      "Post-purchase feedback collection",
      "Returns and refund process updates",
      "Seasonal promotion announcements",
    ],
    href: "/industries/ai-voice-agents-retail-e-commerce",
    iconKey: "cart",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "insurance",
    category: "finance",
    name: "Insurance",
    summary: "Policy renewals, claim updates, premium alerts, and risk assessments.",
    description:
      "Automate policy renewals, claim updates, premium alerts, and risk assessments. With OnDial, insurance companies can streamline customer communication, improve claim processing efficiency, and ensure timely premium payments. Customers receive faster updates while companies benefit from stronger retention and reduced manual intervention.",
    highlights: [
      "Policy renewal reminders",
      "Claims status update notifications",
      "Premium payment alerts",
      "Risk assessment follow-ups",
      "New product offer announcements",
    ],
    href: "/industries/ai-voice-agents-insurance",
    iconKey: "file",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "sales",
    category: "sales",
    name: "Sales & Lead Generation",
    summary: "Lead qualification, appointment scheduling, prospect follow-up, and win-back campaigns.",
    description:
      "Qualify leads, schedule appointments, follow up with prospects, and run win-back campaigns. OnDial helps sales teams save hours by automating repetitive calls, ensuring no lead is missed. With personalized outreach and instant follow-ups, companies can increase conversion rates and accelerate deal closures.",
    highlights: [
      "Inbound lead qualification calls",
      "Appointment scheduling and confirmation",
      "Prospect follow-up automation",
      "Win-back campaign outreach",
      "Post-demo follow-up sequences",
    ],
    href: "/industries/ai-voice-agents-sales-lead-generation",
    iconKey: "target",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "callcenters",
    category: "services",
    name: "Call Centers & BPO",
    summary: "Surveys, feedback collection, compliance notifications, and data verification.",
    description:
      "Automate surveys, feedback collection, compliance notifications, and data verification. OnDial empowers call centers and BPOs to handle higher call volumes at lower costs while maintaining quality and compliance. AI-driven automation enhances customer satisfaction, reduces wait times, and ensures consistent service delivery.",
    highlights: [
      "Customer satisfaction surveys",
      "Compliance notification calls",
      "Data verification calls",
      "Feedback collection campaigns",
      "Post-service follow-up calls",
    ],
    href: "/industries/ai-voice-agents-call-centers-bpo",
    iconKey: "headphones",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "telecom",
    category: "infra",
    name: "Telecom",
    summary: "Service activations, billing inquiries, technical support, and contract renewals.",
    description:
      "Handle service activations, billing inquiries, technical support, and contract renewals. Telecom companies can leverage OnDial to keep customers informed, reduce churn, and resolve issues faster. Automated notifications also help manage outages, upgrades, and usage alerts with ease.",
    highlights: [
      "Service activation confirmations",
      "Billing inquiry resolution calls",
      "Technical support triage",
      "Contract renewal reminders",
      "Outage and upgrade notifications",
    ],
    href: "/industries/ai-voice-agents-telecommunications",
    iconKey: "antenna",
    iconBg: "#EEEDFE",
    iconColor: "#3C3489",
  },
  {
    id: "automotive",
    category: "services",
    name: "Automotive",
    summary: "Service reminders, warranty extensions, recalls, insurance updates, and financing options.",
    description:
      "Manage service reminders, warranty extensions, recalls, insurance updates, and financing options. Dealerships and service centers can use automated voice calls to remind customers about maintenance, provide financing options, and ensure timely recall awareness. This builds stronger customer loyalty while boosting after-sales revenue.",
    highlights: [
      "Vehicle service and maintenance reminders",
      "Warranty extension notifications",
      "Safety recall alerts",
      "Insurance renewal reminders",
      "Financing and upgrade offers",
    ],
    href: "/industries/ai-voice-agents-automotive",
    iconKey: "car",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "education",
    category: "services",
    name: "Education",
    summary: "Enrollment confirmations, tuition reminders, academic progress updates, and alumni outreach.",
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni outreach. Schools, colleges, and training centers can enhance student engagement and reduce administrative workload with AI-powered calls. From event notifications to scholarship updates, OnDial ensures clear, timely communication with students and parents.",
    highlights: [
      "Enrollment confirmation calls",
      "Tuition payment reminders",
      "Academic progress update notifications",
      "Event and campus news announcements",
      "Alumni outreach and fundraising calls",
    ],
    href: "/industries/ai-voice-agents-education",
    iconKey: "graduation",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "travel",
    category: "services",
    name: "Travel & Tourism",
    summary:
      "Booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program updates.",
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and post-trip surveys. Travel agencies and airlines can provide real-time updates, ensuring travelers never miss critical information. OnDial helps reduce cancellations, improve loyalty program engagement, and enhance the customer travel experience.",
    highlights: [
      "Booking confirmation calls",
      "Flight delay and cancellation alerts",
      "Check-in reminder notifications",
      "Weather advisory calls",
      "Post-trip satisfaction surveys",
    ],
    href: "/industries/ai-voice-agents-travel-tourism",
    iconKey: "plane",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "hospitality",
    category: "services",
    name: "Hospitality",
    summary:
      "Reservation confirmations, concierge services, check-in procedures, feedback, and loyalty benefits.",
    description:
      "Manage reservation confirmations, check-in instructions, concierge services, room upgrades, and guest feedback collection. Hotels and resorts can use AI voice calls to deliver personalized experiences, keep guests informed, and encourage repeat bookings. Automated communication improves guest satisfaction and operational efficiency.",
    highlights: [
      "Reservation confirmation and reminders",
      "Check-in instructions and room upgrade offers",
      "Concierge service calls",
      "Guest feedback collection post-stay",
      "Loyalty benefits and return offer calls",
    ],
    href: "/industries/ai-voice-agents-hospitality",
    iconKey: "hotel",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "legal",
    category: "services",
    name: "Legal Services",
    summary: "Consultation bookings, case updates, court date reminders, and compliance deadlines.",
    description:
      "Automate consultation bookings, case updates, court date reminders, and compliance deadlines. Law firms can save time and ensure clients never miss critical steps in their legal journey. OnDial also helps streamline billing explanations and settlement notifications, building client trust through timely communication.",
    highlights: [
      "Consultation booking confirmations",
      "Case status update notifications",
      "Court date and deadline reminders",
      "Document submission follow-ups",
      "Settlement and billing notification calls",
    ],
    href: "/industries/ai-voice-agents-legal",
    iconKey: "scale",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "government",
    category: "infra",
    name: "Government Services",
    summary: "Application status updates, renewal reminders, tax notifications, and citizen surveys.",
    description:
      "Handle application status updates, renewal reminders, tax notifications, and citizen surveys. Public offices can improve service delivery by reducing wait times and keeping citizens informed. With AI automation, governments can run awareness campaigns, send emergency alerts, and streamline appointment scheduling.",
    highlights: [
      "Application status update calls",
      "Renewal reminder notifications",
      "Tax filing and payment alerts",
      "Citizen survey campaigns",
      "Emergency alert and awareness campaigns",
    ],
    href: "/industries/ai-voice-agents-government",
    iconKey: "landmark",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "utilities",
    category: "infra",
    name: "Utilities",
    summary: "Bill reminders, outage updates, rate change notifications, and green energy enrollments.",
    description:
      "Automate bill reminders, outage updates, rate change notifications, and green energy program enrollments. Utility providers can improve payment compliance, reduce inbound calls, and deliver faster service alerts. OnDial also helps with meter reading scheduling and emergency preparedness notifications.",
    highlights: [
      "Bill payment reminder calls",
      "Outage and restoration update notifications",
      "Meter reading appointment scheduling",
      "Rate change and tariff notifications",
      "Green energy programme enrolment calls",
    ],
    href: "/industries/ai-voice-agents-utilities",
    iconKey: "zap",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "nonprofit",
    category: "services",
    name: "Non-Profit Organizations",
    summary: "Donation campaigns, volunteer recruitment, event invitations, and impact updates.",
    description:
      "Automate donation campaigns, volunteer recruitment, event invitations, and impact updates. Non-profits can maintain stronger donor relationships and boost participation rates with AI-powered calls. OnDial also supports membership renewals, grant notifications, and thank-you calls, building trust and long-term engagement.",
    highlights: [
      "Donation campaign outreach calls",
      "Volunteer recruitment and coordination",
      "Event invitation and reminder calls",
      "Grant notification and follow-ups",
      "Donor thank-you and impact update calls",
    ],
    href: "/industries/ai-voice-agents-non-profit-organizations",
    iconKey: "heart",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "logistics",
    category: "infra",
    name: "Transportation & Logistics",
    summary: "Delivery updates, route confirmations, delay notifications, and compliance reminders.",
    description:
      "Manage delivery updates, route confirmations, delay notifications, and compliance reminders. Logistics providers can automate shipment tracking, customs clearance notifications, and fleet management updates. OnDial ensures smooth operations, reduces delays, and enhances transparency for customers.",
    highlights: [
      "Shipment delivery update calls",
      "Route confirmation and delay notifications",
      "Documentation and customs requirement alerts",
      "Compliance and regulation reminder calls",
      "Fleet and driver coordination calls",
    ],
    href: "/industries/ai-voice-agents-transportation-logistics",
    iconKey: "truck",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "manufacturing",
    category: "infra",
    name: "Manufacturing",
    summary: "Order confirmations, production updates, inventory alerts, and safety protocols.",
    description:
      "Automate order confirmations, production updates, inventory alerts, and safety protocols. Manufacturers can improve supplier coordination, reduce downtime with maintenance alerts, and ensure compliance with industry standards. OnDial makes large-scale production communication more efficient and accurate.",
    highlights: [
      "Order confirmation and production update calls",
      "Inventory alert and restock notifications",
      "Maintenance schedule reminder calls",
      "Safety protocol compliance notifications",
      "Supplier coordination and delivery calls",
    ],
    href: "/industries/ai-voice-agents-manufacturing",
    iconKey: "factory",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "construction",
    category: "infra",
    name: "Construction",
    summary: "Project updates, material delivery notifications, permit status, and weather delay alerts.",
    description:
      "Automate project updates, material delivery notifications, permit status updates, and weather delay alerts. Construction firms can keep clients, teams, and regulators informed throughout the project lifecycle. OnDial helps reduce miscommunication, avoid delays, and ensure smoother project handovers.",
    highlights: [
      "Project milestone update calls",
      "Material delivery schedule notifications",
      "Permit status update alerts",
      "Safety inspection reminder calls",
      "Weather delay and rescheduling notifications",
    ],
    href: "/industries/ai-voice-agents-construction",
    iconKey: "hard-hat",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "agriculture",
    category: "infra",
    name: "Agriculture",
    summary: "Crop management alerts, equipment maintenance, market price updates, and loan notifications.",
    description:
      "Manage crop management alerts, equipment maintenance reminders, market price updates, and loan notifications. Farmers and cooperatives can benefit from weather alerts, insurance claims processing, and supply coordination. OnDial supports agricultural communities by making communication timely, reliable, and cost-effective.",
    highlights: [
      "Crop management and harvest timing alerts",
      "Equipment maintenance reminder calls",
      "Market price and demand update notifications",
      "Loan and insurance claims follow-up calls",
      "Weather advisory and emergency notifications",
    ],
    href: "/industries/ai-voice-agents-agriculture",
    iconKey: "sprout",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
] as const;

export const SERVICES_HOW_IT_WORKS = {
  eyebrow: "How AI Voice Automation Works",
  title: "How OnDial Works",
  description:
    "Many businesses wonder how AI voice call automation actually fits into their operations. OnDial makes it simple:",
  steps: [
    {
      id: "connect",
      title: "Connect Your Data",
      description: "Sync with your CRM or customer database.",
      iconKey: "database",
    },
    {
      id: "template",
      title: "Choose a Template",
      description: "Industry-ready conversation flows for healthcare, banking, retail, and more.",
      iconKey: "layout",
    },
    {
      id: "launch",
      title: "Launch Campaigns",
      description: "Send reminders, updates, or surveys with one click.",
      iconKey: "rocket",
    },
    {
      id: "ai-calls",
      title: "AI Handles Calls",
      description: "Natural, human-like voices manage conversations automatically.",
      iconKey: "bot",
    },
    {
      id: "track",
      title: "Track & Optimize",
      description: "Use real-time analytics to improve performance and ROI.",
      iconKey: "chart-line",
    },
  ] as const,
} as const;

export const SERVICES_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently asked questions",
  description: "Everything you need to know about OnDial's AI voice call automation platform.",
  items: [
    {
      id: "what-is",
      question: "What is AI Voice Call Automation and how does it work?",
      answer:
        "AI Voice Call Automation uses artificial intelligence to make, manage, and respond to phone calls without human agents. It combines speech recognition and natural language processing (NLP) to deliver reminders, order updates, payment alerts, and surveys. With OnDial, businesses can reduce costs and improve customer engagement through automated voice calls.",
    },
    {
      id: "industries",
      question: "Which industries can benefit from OnDial's AI Voice Call Automation?",
      answer:
        "OnDial serves 20+ industries including healthcare, banking, retail, insurance, logistics, education, hospitality, government, and more. Each sector has pre-designed call templates, such as appointment reminders in healthcare or payment alerts in finance. This makes OnDial a versatile AI voice automation platform for any business communication need.",
    },
    {
      id: "integrations",
      question: "Can OnDial integrate with CRM and existing business systems?",
      answer:
        "Yes. OnDial easily integrates with major CRMs like Salesforce, HubSpot, and Zoho, as well as ERP systems and communication tools. Through APIs and webhooks, businesses can automate data flow between OnDial and existing platforms, ensuring seamless customer management and a more efficient voice call automation process.",
    },
    {
      id: "security",
      question: "How does OnDial ensure data security and compliance?",
      answer:
        "OnDial is built with enterprise-grade security. It offers end-to-end encryption, role-based access, and regular compliance audits. Depending on the industry, OnDial supports HIPAA for healthcare, PCI DSS for payments, and GDPR for data protection—making it one of the most secure AI voice automation platforms available.",
    },
    {
      id: "smb",
      question: "Is OnDial suitable for small and medium businesses?",
      answer:
        "Absolutely. OnDial provides scalable and affordable AI voice call automation for small businesses, startups, and SMEs. Whether it's sending appointment reminders, delivery updates, or customer feedback surveys, businesses can automate repetitive tasks without needing a full call center, saving time and operational costs.",
    },
    {
      id: "multilingual",
      question: "Does OnDial support multilingual AI voice calls?",
      answer:
        "Yes. OnDial supports multilingual communication, allowing businesses to connect with customers in English, Hindi, Spanish, and many more languages. This feature makes OnDial especially valuable for global companies or businesses serving diverse regions, ensuring customers receive automated calls in their preferred language for better personalization.",
    },
    {
      id: "speed",
      question: "How fast can I start making calls from your AI voice agent system?",
      answer:
        "In our system, setup takes just a few minutes, and then you can start making calls directly.",
    },
    {
      id: "replace-agents",
      question: "Can OnDial replace human call center agents completely?",
      answer:
        "OnDial is designed to handle repetitive, high-volume calls such as payment alerts, reminders, and order updates. While it reduces the need for large call center teams, human agents remain important for complex cases. Together, AI voice call automation and human support create a cost-effective, hybrid customer service model.",
    },
    {
      id: "benefits",
      question: "What are the main benefits of AI voice call automation with OnDial?",
      answer:
        "The key benefits include lower call center costs, faster customer response times, 24/7 availability, personalized communication, and higher customer satisfaction. OnDial helps businesses automate repetitive calls, increase operational efficiency, and deliver consistent experiences across industries like healthcare, retail, finance, and logistics.",
    },
    {
      id: "get-started",
      question: "How can a business get started with OnDial?",
      answer:
        "Getting started with OnDial is simple. Businesses can request a free demo, where our team explains AI voice call automation use cases for their industry. We assist with integrations, template setup, and call flow design, ensuring a smooth transition to automated voice communication.",
    },
  ] as const,
} as const;

export const SERVICES_FINAL_CTA = {
  eyebrow: "Get started today",
  titleLine1: "Transform the Way You",
  titleLine2: "Communicate with Customers",
  description:
    "Don't let missed calls or delays affect your business. OnDial's AI voice call automation is fast, secure, and scalable.",
  ctas: [
    { label: "Get Started Now", href: "/contact", variant: "primary" },
    { label: "Explore industries", href: "#services-industries", variant: "secondary" },
  ] as const satisfies readonly ServicesCta[],
  trustItems: [
    "Free demo available",
    "No credit card required",
    "Live in under 30 minutes",
    "HIPAA & GDPR compliant",
  ] as const,
} as const;
