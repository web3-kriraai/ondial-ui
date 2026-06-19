export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const HOME_FAQ_HEADING = {
  // title: "Frequently asked questions",
  // description:
  //   "To help you make informed decisions, we've compiled answers to some of the most commonly asked questions.",
  title: "Everything You Need to Know About OnDial",
  description:
    "Get answers to the most common questions about how OnDial can transform your business and never let you lose a customer again.",
} as const;

export const HOME_FAQS: readonly HomeFaqItem[] = [
  {
    id: "what-are-ai-voice-agents",
    question: "What are AI Voice Agents?",
    answer:
      "AI Voice Agents are intelligent software agents that use speech recognition and AI to handle calls, answer queries, and automate conversations in real time.",

  },
  {
    id: "how-do-they-work",
    question: "How do AI Voice Agents work for businesses?",
    answer:
      "They integrate with your communication systems to process voice input, understand intent, and respond naturally—helping automate customer support, sales calls, and lead qualification.",
  },
  {
    id: "multilingual",
    question: "Can AI Voice Agents handle multilingual conversations?",
    answer:
      "Yes, advanced AI Voice Agents like OnDial support 100+ languages, enabling global communication without needing separate teams for each market.",
  },
  {
    id: "industries",
    question: "What industries benefit most from AI Voice Agents?",
    answer:
      "Industries like e-commerce, banking, healthcare, real estate, and logistics use them for customer support, appointment booking, order tracking, and sales automation.",
  },
  {
    id: "small-business",
    question: "Are AI Voice Agents suitable for small businesses?",
    answer:
      "Absolutely. They are scalable and cost-effective, allowing small businesses to offer 24/7 customer service and expand into global markets without large teams.",
  },
  {
    id: "response-speed",
    question: "How fast can AI Voice Agents respond?",
    answer:
      "With ultra-low latency technology, responses can be delivered in under 300 milliseconds, ensuring conversations feel as natural as speaking to a human.",
  },
  {
    id: "concurrent-calls",
    question: "Can AI Voice Agents handle multiple calls at once?",
    answer: "Yes, they scale instantly to manage multiple conversations simultaneously.",
  },
  {
    id: "security",
    question: "How secure are AI Voice Agents?",
    answer:
      "Enterprise-grade encryption, GDPR compliance, and secure API protocols ensure customer data remains safe during every interaction.",
  },
  {
    id: "get-started",
    question: "How can I get started with AI Voice Agents?",
    answer:
      "You can start by scheduling a free demo with OnDial to see how real-time, multilingual AI Voice Agents can transform your customer communication.",
  },
];
