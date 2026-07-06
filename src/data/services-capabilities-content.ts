export type ServicesCapability = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  iconBg: string;
  iconColor: string;
};

export const SERVICES_CAPABILITIES_SECTION = {
  eyebrow: "Platform capabilities",
  title: "Built for Real Enterprise Conversations",
  description:
    "Beyond scripted call flows - OnDial understands context, integrates with your systems, and knows when to bring in a human.",
} as const;

/** Accent palette cycles across the 5 colors already used throughout the services page. */
export const SERVICES_CAPABILITIES: readonly ServicesCapability[] = [
  {
    id: "live-handoff",
    title: "Context-Aware Live Agent Handoff",
    description:
      "Transfer conversations to human agents instantly with complete conversational context, ensuring uninterrupted customer experiences.",
    iconKey: "phone-forwarded",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "live-api",
    title: "Live Enterprise API Execution",
    description:
      "Retrieve customer records, order status, appointments, account information, and business data in real time without interrupting the conversation.",
    iconKey: "database",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "sentiment",
    title: "Real-Time Sentiment Intelligence",
    description:
      "Detect customer emotions instantly and dynamically adapt AI responses or initiate human escalation when necessary.",
    iconKey: "heart-pulse",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "integration-framework",
    title: "Enterprise Integration Framework",
    description:
      "Integrate seamlessly with CRM, ERP, ticketing, telephony, payment, and proprietary business systems through enterprise-ready APIs.",
    iconKey: "network",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "human-like",
    title: "Human-Like Conversation Management",
    description:
      "Handle interruptions, overlapping speech, and natural dialogue with advanced conversational intelligence.",
    iconKey: "messages",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "adaptive-language",
    title: "Adaptive Language Intelligence",
    description:
      "Switch seamlessly between languages during live conversations while maintaining intent, context, and conversational continuity.",
    iconKey: "languages",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "omnichannel",
    title: "True Omnichannel AI Experience",
    description:
      "Power voice, WhatsApp, SMS, email, and web interactions through one intelligent AI agent with shared memory and unified customer context.",
    iconKey: "share",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "enterprise-scale",
    title: "Built for Enterprise Scale",
    description:
      "Support mission-critical customer operations across global B2B, B2C, D2C, healthcare, finance, logistics, education, and retail organizations.",
    iconKey: "building",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "multilingual",
    title: "Global Multilingual AI",
    description:
      "Deliver natural, localized customer experiences with support for English, Hinglish, Hindi, and numerous regional and international languages.",
    iconKey: "globe",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "no-code-builder",
    title: "Enterprise No-Code AI Builder",
    description:
      "Empower business teams to build, deploy, and optimize production-ready AI agents without writing a single line of code.",
    iconKey: "wand",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "ai-memory",
    title: "Context-Aware AI Memory",
    description:
      "Every conversation builds upon previous customer interactions for highly personalized experiences.",
    iconKey: "brain",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "knowledge-driven",
    title: "Knowledge-Driven AI Agents",
    description:
      "AI responds using your company's documentation, knowledge base, policies, and product information.",
    iconKey: "book",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "workflow-automation",
    title: "AI Workflow Automation",
    description:
      "Trigger downstream business workflows automatically based on conversation outcomes.",
    iconKey: "workflow",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    id: "lead-qualification",
    title: "Intelligent Lead Qualification",
    description:
      "Score, qualify, and prioritize leads automatically using configurable business criteria.",
    iconKey: "filter",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    id: "conversation-intelligence",
    title: "Conversation Intelligence",
    description:
      "Extract actionable insights, buying signals, customer intent, and business trends from every interaction.",
    iconKey: "chart-line",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
  },
  {
    id: "call-summarization",
    title: "AI Call Summarization",
    description:
      "Automatically generate concise call summaries, action items, and follow-up recommendations.",
    iconKey: "file",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
  },
  {
    id: "journey-awareness",
    title: "Customer Journey Awareness",
    description:
      "Understand where every customer is in the sales or support lifecycle before speaking.",
    iconKey: "compass",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    id: "next-best-action",
    title: "Predictive Next Best Action",
    description:
      "Recommend the optimal follow-up action based on conversation intelligence.",
    iconKey: "target",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
] as const;
