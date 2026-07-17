export type MultilingualHubCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type MultilingualHubThemeFields = {
  iconKey: string;
  iconBg: string;
  iconColor: string;
};

export const MULTILINGUAL_HUB_META = {
  title: "Multilingual AI Voice Agent | 100+ Languages | OnDial",
  description:
    "Deploy a multilingual AI voice agent to automate inbound and outbound calls. Localize customer support across 100+ languages with OnDial.",
  canonicalPath: "/multilingual-ai-voice-agent",
} as const;

export const MULTILINGUAL_HUB_HERO = {
  eyebrow: "Multilingual AI voice",
  title: "Enterprise Multilingual AI Voice Agent",
  description:
    "Scale your inbound and outbound phone communications globally with a multilingual AI voice agent. OnDial automates appointment scheduling, lead qualification, and customer support across more than 100 languages. Built for global and regional scale, the platform relies on automatic language detection to process conversations naturally, logging data directly into your existing CRM. Enterprise deployments operate under strict security frameworks, backed by HIPAA, GDPR, PCI DSS, SOC 2, and ISO certifications.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Watch Demo", href: "#how-it-works", variant: "secondary" },
  ] as const satisfies readonly MultilingualHubCta[],
  stats: [
    {
      id: "languages",
      value: "100+",
      label: "languages supported",
      iconKey: "languages",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      id: "accents",
      value: "50+",
      label: "regional accents",
      iconKey: "globe",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      id: "latency",
      value: "<200ms",
      label: "response latency",
      iconKey: "sparkles",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      id: "accuracy",
      value: "99.4%",
      label: "transcription accuracy",
      iconKey: "file",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_QUICK_ANSWERS = {
  eyebrow: "AI Voice Overview",
  title: "Quick Answer Box",
  items: [
    {
      question: "What is a multilingual AI voice agent?",
      answer:
        "It is an artificial intelligence platform designed to conduct phone conversations in multiple languages. It answers calls, understands caller intent, and executes business tasks without human intervention.",
      iconKey: "languages",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      question: "How does OnDial's multilingual AI voice agent work?",
      answer:
        "The system answers the phone, detects the speaker's language, and responds in that exact language. It extracts necessary information, updates connected systems like CRMs, and transfers complex queries to live staff.",
      iconKey: "workflow",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      question: "What business problems does it solve?",
      answer:
        "It eliminates language barriers, reduces missed calls, and provides consistent support regardless of operating hours, mitigating the difficulties associated with staffing fully bilingual contact centers.",
      iconKey: "target",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_CHALLENGES = {
  eyebrow: "Business challenges",
  title: "Business Challenges",
  iconKey: "phone-missed",
  iconBg: "#FCEBEB",
  iconColor: "#A32D2D",
  description:
    "Operating a contact center across different regions introduces distinct operational hurdles. Organizations struggle with persistent language barriers that frustrate callers and delay issue resolution. High call volumes during peak hours frequently lead to missed calls and slow response times, directly impacting client satisfaction. Recruiting, training, and retaining support staff fluent in specific regional dialects requires heavy capital investment. Furthermore, maintaining consistent service quality and extending operating hours across multiple time zones strains internal resources. Without automation, businesses often fail to capture critical inbound leads simply because no native speaker is available to take the call.",
} as const;

export const MULTILINGUAL_HUB_SOLUTION = {
  eyebrow: "Solution overview",
  title: "Solution Overview",
  iconKey: "workflow",
  iconBg: "#E6F1FB",
  iconColor: "#0C447C",
  description:
    "OnDial addresses global communication bottlenecks through comprehensive voice automation. The platform utilizes automatic language detection to answer calls, immediately routing the conversation in the caller's native dialect. It conducts natural, human-like dialogue to execute routine tasks such as appointment scheduling and intelligent lead qualification. Every interaction synchronizes with connected CRM platforms, logging conversation summaries and data points. For complex issues requiring human intervention, Context-Aware Live Agent Handoff ensures live representatives receive the caller alongside the full conversational context. Post-call, managers review detailed analytics, call summaries, and transcription data to continuously monitor performance.",
} as const;

export const MULTILINGUAL_HUB_LANGUAGES = {
  eyebrow: "Global Language Support",
  title: "Supported Languages",
  description:
    "The platform processes over 100 languages, scaling from major international dialects to deep regional coverage.",
  note: "Feature availability and voice depth may vary across the 100+ supported languages.",
  groups: [
    {
      languages: "Spanish, French, German",
      type: "International",
      notes: "Standard global coverage for European markets.",
      iconKey: "globe",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      languages: "Portuguese, Italian, Russian",
      type: "International",
      notes: "Expands continental reach.",
      iconKey: "globe",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      languages: "Japanese, Chinese, Korean",
      type: "International",
      notes: "Major East Asian dialects.",
      iconKey: "globe",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      languages: "Arabic",
      type: "International",
      notes: "Middle Eastern and North African coverage.",
      iconKey: "globe",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      languages: "Hindi",
      type: "Indian (Regional)",
      notes: "Full conversations held entirely in pure Hindi.",
      iconKey: "languages",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      languages: "Hinglish (Code-mixed)",
      type: "Indian (Code-mixed)",
      notes: "Understands blended sentences (English + Hindi words combined in one phrase).",
      iconKey: "message-square",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      languages: "Tamil, Telugu, Kannada, Malayalam",
      type: "Indian (Regional)",
      notes: "Core South Indian language support.",
      iconKey: "languages",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      languages: "Bengali, Marathi, Gujarati, Punjabi",
      type: "Indian (Regional)",
      notes: "Expansive coverage across East, West, and North India.",
      iconKey: "languages",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_INDUSTRY_USE_CASES = {
  eyebrow: "Industry AI Solutions",
  title: "Industry Use Cases",
  description: "Voice automation adapts to specialized workflows across various business sectors.",
  rows: [
    {
      industry: "Healthcare",
      workflow: "Patient schedules a clinic visit in Spanish.",
      outcome: "Reduced administrative workload.",
      iconKey: "sparkles",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      industry: "Insurance",
      workflow: "Policyholder initiates a claim inquiry in Gujarati.",
      outcome: "Faster initial claim logging.",
      iconKey: "file",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      industry: "Finance & Banking",
      workflow: "Customer checks account balances in Arabic.",
      outcome: "Secure, off-hours access to data.",
      iconKey: "shield-check",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      industry: "Real Estate",
      workflow: "Buyer inquires about property listings in Mandarin.",
      outcome: "Immediate lead capture.",
      iconKey: "building",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      industry: "Manufacturing",
      workflow: "Vendor confirms shipment details in German.",
      outcome: "Streamlined supply chain checks.",
      iconKey: "package",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      industry: "Travel & Tourism",
      workflow: "Traveler modifies a flight itinerary in French.",
      outcome: "Lower holding times during disruptions.",
      iconKey: "globe",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      industry: "Transport & Logistics",
      workflow: "Driver reports a delay using Punjabi.",
      outcome: "Accurate real-time logistics tracking.",
      iconKey: "package",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      industry: "Retail & E-commerce",
      workflow: "Shopper asks for order status in Hinglish.",
      outcome: "Automated post-purchase support.",
      iconKey: "cart",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      industry: "Telecommunication",
      workflow: "User troubleshoots an internet outage in Telugu.",
      outcome: "Tier-1 technical support deflection.",
      iconKey: "antenna",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      industry: "Automotive",
      workflow: "Owner schedules routine maintenance in Italian.",
      outcome: "Higher service bay utilization.",
      iconKey: "car",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      industry: "Education",
      workflow: "Student verifies enrollment dates in Korean.",
      outcome: "Prompt information delivery.",
      iconKey: "graduation",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      industry: "Hospitality",
      workflow: "Guest requests a late checkout in Japanese.",
      outcome: "Improved front-desk efficiency.",
      iconKey: "hotel",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_FEATURES = {
  eyebrow: "AI Voice Capabilities",
  title: "Feature Breakdown",
  items: [
    {
      title: "Adaptive Language Intelligence",
      description:
        "Manages two distinct behaviors: switching between separate languages across different conversation turns, and understanding code-mixed speech (like Hinglish) within a single sentence.",
      iconKey: "languages",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Context-Aware Live Agent Handoff",
      description:
        "Transfers the call and all collected data to a human representative when predefined escalation criteria are met.",
      iconKey: "users",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "Real-Time Sentiment Intelligence",
      description:
        "Analyzes caller tone during the interaction to trigger specific workflows or immediate human escalations.",
      iconKey: "sparkles",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Live Enterprise API Execution & Integrations",
      description:
        "Connects directly to external databases via an Enterprise Integration Framework, enabling the AI to retrieve or post data live.",
      iconKey: "workflow",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      title: "Human-Like Conversation Management",
      description:
        "Handles mid-sentence interruptions natively, allowing callers to speak over the AI without breaking the process flow.",
      iconKey: "message-square",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      title: "True Omnichannel AI Experience",
      description: "Unifies data across voice, WhatsApp, SMS, email, and web interactions.",
      iconKey: "globe",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Enterprise No-Code AI Builder & Knowledge-Driven Agents",
      description:
        "Allows administrators to deploy Custom AI Workflow Automation using existing company documents without writing code.",
      iconKey: "workflow",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Conversation Intelligence",
      description:
        "Provides AI Call Summarization, Context-Aware AI Memory, and Predictive Next Best Action for comprehensive post-call analysis.",
      iconKey: "bar-chart",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_HOW_IT_WORKS = {
  eyebrow: "AI Voice Agent Workflow",
  title: "How It Works",
  steps: [
    {
      title: "Call Initiation",
      description: "A customer dials your business number, or the system initiates an outbound dial.",
      iconKey: "phone-incoming",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Language Detection",
      description: "The platform identifies the spoken language or mixed-speech pattern instantly.",
      iconKey: "languages",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "AI Response",
      description: "The agent replies in the matching language, utilizing accent adaptation.",
      iconKey: "message-square",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "Intent Identification",
      description: "Natural language understanding categorizes the reason for the call.",
      iconKey: "target",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      title: "Data Retrieval",
      description: "The system queries your connected database for relevant customer files.",
      iconKey: "workflow",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      title: "Task Execution",
      description: "The platform schedules appointments, logs data, or escalates the call.",
      iconKey: "calendar",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Analytics Update",
      description: "Call summaries and transcripts populate your dashboard.",
      iconKey: "bar-chart",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_BENEFITS = {
  eyebrow: "Enterprise AI Advantages",
  title: "Enterprise Benefits",
  items: [
    {
      title: "Extensive Reach",
      description: "Communicate effectively using more than 100 supported languages.",
      iconKey: "globe",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Regional Accuracy",
      description: "Process speech naturally across 50+ regional accents.",
      iconKey: "languages",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      title: "High Speed",
      description: "Maintain conversation flow with under 200ms response latency.",
      iconKey: "sparkles",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      title: "Reliable Documentation",
      description: "Record interactions with 99.4% transcription accuracy.",
      iconKey: "file",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_IVR_COMPARISON = {
  eyebrow: "Comparison",
  title: "OnDial vs. Traditional IVR",
  rows: [
    {
      capability: "Natural conversation",
      ondial: "Speaks in full sentences.",
      traditional: "Relies on static menu prompts.",
    },
    {
      capability: "Language switching",
      ondial: "Automatic mid-call adjustments.",
      traditional: "Requires rigid keypad selection.",
    },
    {
      capability: "Context retention",
      ondial: "Remembers prior turns in the call.",
      traditional: "Resets upon menu navigation.",
    },
    {
      capability: "CRM integration",
      ondial: "Reads/writes data in real time.",
      traditional: "Typically disconnected from CRM.",
    },
    {
      capability: "Appointment booking",
      ondial: "Negotiates complex availability.",
      traditional: "Limited to basic routing.",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_ALTERNATIVE_COMPARISONS = {
  eyebrow: "Compare AI Voice Solutions",
  title: "Alternative Comparisons",
  items: [
    {
      title: "Vs. Human Agent",
      description: "Automates tier-1 queries 24/7; escalates complex edge cases to humans.",
      iconKey: "users",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Vs. Call Center",
      description: "Eliminates strict reliance on peak-hour staffing and localized hiring.",
      iconKey: "headphones",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      title: "Vs. Chatbot",
      description: "Operates natively on phone networks with voice recognition, not just text.",
      iconKey: "message-square",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_SECURITY = {
  eyebrow: "Enterprise AI Security",
  title: "Security & Compliance",
  description:
    "Enterprise deployments are built with access controls and encryption in place to protect sensitive caller data. Audit logs and data-retention protocols align with standard corporate governance requirements. The platform strictly adheres to verified industry frameworks, holding certifications for HIPAA (healthcare data privacy), GDPR (European data protection), PCI DSS (payment card security), SOC 2 (service organization controls), and ISO standards.",
  badges: ["HIPAA", "GDPR", "PCI DSS", "SOC 2", "ISO"] as const,
} as const;

export const MULTILINGUAL_HUB_INTEGRATIONS = {
  eyebrow: "AI Platform Integrations",
  title: "Integrations",
  description: "The platform connects to your existing software stack to ensure data continuity.",
  items: [
    {
      category: "CRM",
      tools: "Salesforce, HubSpot",
      iconKey: "workflow",
      iconBg: "#E6F1FB",
      iconColor: "#0C447C",
    },
    {
      category: "Scheduling",
      tools: "Calendly",
      iconKey: "calendar",
      iconBg: "#EEEDFE",
      iconColor: "#534AB7",
    },
    {
      category: "Telephony",
      tools: "Twilio",
      iconKey: "phone-forwarded",
      iconBg: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      category: "Communication",
      tools: "Slack",
      iconKey: "message-square",
      iconBg: "#FAEEDA",
      iconColor: "#633806",
    },
    {
      category: "Workflow Automation",
      tools: "Zapier",
      iconKey: "workflow",
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_STORY = {
  eyebrow: "Proven Customer Results",
  title: "Customer Success Stories",
  disclaimer: "Illustrative example — not a verified OnDial customer result",
  body: `Consider a regional logistics provider managing high-volume delivery queries. A customer calls and speaks in Hinglish: "Sir, mera order kab tak deliver ho jayega?" (Sir, by when will my order be delivered?). The platform's Adaptive Language Intelligence processes the English and Hindi words blended together in that single sentence. It instantly queries the logistics database via API, retrieves the tracking status, and responds naturally in the same mixed dialect. The interaction logs securely into Salesforce, completing the request in seconds while saving human agents from repetitive status-check calls.`,
  iconKey: "package",
  iconBg: "#E1F5EE",
  iconColor: "#085041",
} as const;

export const MULTILINGUAL_HUB_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "How many languages does the platform support?",
      answer:
        "It supports over 100 languages. This includes major international dialects and specific regional languages, ensuring broad global coverage for diverse customer bases.",
    },
    {
      question: "Can the system switch languages mid-call?",
      answer:
        "Yes, it can adjust dynamically. If a caller starts speaking Spanish and switches to English, the automatic language detection recognizes the change and adapts the response.",
    },
    {
      question: "What is the difference between Hindi and Hinglish support?",
      answer:
        "Hindi support manages conversations in pure Hindi. Hinglish support involves code-mixing, where the system understands English and Hindi words blended together within the exact same sentence.",
    },
    {
      question: "Does the platform actually understand code-mixed sentences?",
      answer:
        "Yes, it processes code-mixing natively. Natural language understanding models identify the intent even when vocabulary from two different languages shares a single phrase.",
    },
    {
      question: "Why is Hinglish important for business calls?",
      answer:
        "Many callers naturally blend English terms into regional speech. Supporting this specific speech pattern prevents misunderstood intents and reduces caller frustration during support inquiries.",
    },
    {
      question: "How does the system handle different accents?",
      answer:
        "The platform manages over 50 regional accents. Accent adaptation ensures accurate transcription before the underlying logic processes the intent.",
    },
    {
      question: "Does the AI perform real-time translation?",
      answer:
        "It processes the core intent natively rather than running literal word-for-word translations, allowing for faster response latency under 200ms.",
    },
    {
      question: "Are the conversations recorded securely?",
      answer:
        "Yes, deployments utilize secure infrastructure. The platform complies with GDPR, HIPAA, PCI DSS, SOC 2, and ISO standards for data protection.",
    },
    {
      question: "Can callers interrupt the AI?",
      answer:
        "Yes, the platform includes Human-Like Conversation Management. It handles interruptions and adjusts its response if the caller speaks over the prompt.",
    },
    {
      question: "What happens if the AI cannot solve the problem?",
      answer:
        "The call transitions to live staff. Context-Aware Live Agent Handoff ensures the human representative receives the conversation history immediately.",
    },
    {
      question: "Does the system integrate with existing CRMs?",
      answer:
        "Yes, it connects seamlessly. Supported integrations include Salesforce and HubSpot to log calls and retrieve caller files automatically.",
    },
    {
      question: "Can it book appointments directly?",
      answer:
        "Yes, it schedules meetings on calendars. It integrates directly with tools like Calendly to negotiate dates and times without human input.",
    },
    {
      question: "Does it operate outside of normal business hours?",
      answer:
        "Yes, the platform runs continuously. It answers calls and qualifies leads 24 hours a day, regardless of local time zones.",
    },
    {
      question: "Can I build workflows without coding?",
      answer:
        "Yes, administrators manage configurations visually. The Enterprise No-Code AI Builder allows teams to map out call flows using a drag-and-drop interface.",
    },
    {
      question: "How accurate is the call transcription?",
      answer:
        "The system achieves 99.4% transcription accuracy. This ensures that call summaries and CRM logs remain highly reliable for compliance and training.",
    },
  ] as const,
} as const;

export const MULTILINGUAL_HUB_DEPLOYMENT = {
  eyebrow: "Enterprise Deployment",
  title: "Deployment Framework",
  definition: {
    label: "Definition",
    text: "A multilingual AI voice agent is an automated telephony solution capable of understanding, processing, and responding to spoken language across various dialects to execute routine business tasks.",
  },
  decisionFramework: {
    label: "Decision Framework for Evaluating Vendors",
    items: [
      "Language Depth: Verify if the platform supports pure languages versus complex code-mixing within a single sentence.",
      "Latency Metrics: Ensure response times fall under 200ms to maintain natural conversation pacing.",
      "Handoff Capabilities: Confirm the system passes full conversational context to live staff during escalations.",
      "Compliance: Check for required regulatory certifications (e.g., HIPAA, SOC 2) relevant to your industry.",
    ],
  },
  commonMistake: {
    label: "Common Mistake",
    text: "Organizations often confuse basic sequential language switching with true code-mixing, leading to failed interactions when customers naturally blend words from two languages in a single breath.",
  },
  checklist: {
    label: "Implementation Checklist",
    items: [
      "Map your most frequent inbound call intents.",
      "Identify the primary languages and regional dialects of your caller base.",
      "Document the API endpoints required for CRM and scheduling integration.",
      "Define specific triggers for human agent escalation.",
    ],
  },
  timeline: {
    label: "Deployment Timeline Phases",
    phases: [
      "Initial Scoping and Flow Mapping",
      "Integration and API Connectivity",
      "Pilot Testing and Accent Tuning",
      "Full Departmental Rollout",
    ],
  },
  glossary: {
    label: "Glossary of Terms",
    terms: [
      {
        term: "Multilingual AI voice agent",
        definition: "Automated telephony software that converses in multiple languages.",
      },
      {
        term: "Code-switching",
        definition: "Changing from one distinct language to another across different conversation turns.",
      },
      {
        term: "Code-mixing / Hinglish",
        definition: "Blending vocabulary from multiple languages within the same sentence.",
      },
      {
        term: "Language detection",
        definition: "The automated identification of the speaker's language.",
      },
      {
        term: "Natural language understanding",
        definition: "AI processing that determines the actual intent behind spoken words.",
      },
      {
        term: "Accent adaptation",
        definition: "Adjusting speech recognition models to comprehend regional pronunciations.",
      },
      {
        term: "CRM integration",
        definition: "Connecting software to synchronize customer relationship data automatically.",
      },
      {
        term: "Escalation / Handoff",
        definition: "Transferring an automated call to a live human representative.",
      },
    ],
  },
} as const;

export const MULTILINGUAL_HUB_FINAL_CTA = {
  title: "Ready to Deploy a Multilingual AI Voice Agent?",
  description:
    "See how OnDial handles calls in 100+ languages with automatic detection, CRM sync, and enterprise-grade security.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Talk to Sales", href: "/contact", variant: "secondary" },
  ] as const satisfies readonly MultilingualHubCta[],
} as const;
