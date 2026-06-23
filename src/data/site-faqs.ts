export type SiteFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteFaqSection = {
  title: string;
  description: string;
  items: readonly SiteFaqItem[];
};

export type SiteFaqPageKey =
  | "home"
  | "about"
  | "pricing"
  | "ai-voice-agents-healthcare-medical"
  | "ai-voice-agents-finance-banking"
  | "ai-voice-agents-real-estate"
  | "ai-voice-agents-retail-e-commerce"
  | "ai-voice-agents-insurance"
  | "ai-voice-agents-sales-lead-generation"
  | "ai-voice-agents-call-centers-bpo"
  | "ai-voice-agents-telecommunications"
  | "ai-voice-agents-automotive"
  | "ai-voice-agents-education"
  | "ai-voice-agents-travel-tourism"
  | "ai-voice-agents-hospitality"
  | "ai-voice-agents-legal"
  | "ai-voice-agents-government"
  | "ai-voice-agents-utilities"
  | "ai-voice-agents-non-profit-organizations"
  | "ai-voice-agents-transportation-logistics"
  | "ai-voice-agents-manufacturing"
  | "ai-voice-agents-construction"
  | "ai-voice-agents-agriculture"
;

const HOME_HEADING = {
  title: "Everything You Need to Know About OnDial",
  description:
    "Get answers to the most common questions about how OnDial can transform your business and never let you lose a customer again.",
} as const;

const ABOUT_HEADING = {
  title: "Frequently asked questions about OnDial",
  description:
    "Learn how OnDial works, what it integrates with, and how teams of every size get started.",
} as const;

function industryHeading(name: string) {
  return {
    title: `Everything you need to know about AI voice agents for ${name}`,
    description:
      `Answers to the most common questions about using OnDial AI voice agents in ${name.toLowerCase()}.`,
  };
}

const FAQ_ITEMS: Record<SiteFaqPageKey, readonly SiteFaqItem[]> = {
  home: [
    {
      id: "what-are-ai-voice-agents",
      question: "What are AI Voice Agents?",
      answer: "AI Voice Agents are intelligent software agents that use speech recognition and AI to handle calls, answer queries, and automate conversations in real time.",
    },
    {
      id: "how-do-they-work",
      question: "How do AI Voice Agents work for businesses?",
      answer: "They integrate with your communication systems to process voice input, understand intent, and respond naturally—helping automate customer support, sales calls, and lead qualification.",
    },
    {
      id: "multilingual",
      question: "Can AI Voice Agents handle multilingual conversations?",
      answer: "Yes, advanced AI Voice Agents like OnDial support 100+ languages, enabling global communication without needing separate teams for each market.",
    },
    {
      id: "industries",
      question: "What industries benefit most from AI Voice Agents?",
      answer: "Industries like e-commerce, banking, healthcare, real estate, and logistics use them for customer support, appointment booking, order tracking, and sales automation.",
    },
    {
      id: "small-business",
      question: "Are AI Voice Agents suitable for small businesses?",
      answer: "Absolutely. They are scalable and cost-effective, allowing small businesses to offer 24/7 customer service and expand into global markets without large teams.",
    },
    {
      id: "response-speed",
      question: "How fast can AI Voice Agents respond?",
      answer: "With ultra-low latency technology, responses can be delivered in under 300 milliseconds, ensuring conversations feel as natural as speaking to a human.",
    },
    {
      id: "concurrent-calls",
      question: "Can AI Voice Agents handle multiple calls at once?",
      answer: "Yes, they scale instantly to manage multiple conversations simultaneously.",
    },
    {
      id: "security",
      question: "How secure are AI Voice Agents?",
      answer: "Enterprise-grade encryption, GDPR compliance, and secure API protocols ensure customer data remains safe during every interaction.",
    },
    {
      id: "get-started",
      question: "How can I get started with AI Voice Agents?",
      answer: "You can start by scheduling a free demo with OnDial to see how real-time, multilingual AI Voice Agents can transform your customer communication.",
    },
  ],
  pricing: [
    {
      id: "what-are-ai-voice-agents",
      question: "What are AI Voice Agents?",
      answer: "AI Voice Agents are intelligent software agents that use speech recognition and AI to handle calls, answer queries, and automate conversations in real time.",
    },
    {
      id: "how-do-they-work",
      question: "How do AI Voice Agents work for businesses?",
      answer: "They integrate with your communication systems to process voice input, understand intent, and respond naturally—helping automate customer support, sales calls, and lead qualification.",
    },
    {
      id: "multilingual",
      question: "Can AI Voice Agents handle multilingual conversations?",
      answer: "Yes, advanced AI Voice Agents like OnDial support 100+ languages, enabling global communication without needing separate teams for each market.",
    },
    {
      id: "industries",
      question: "What industries benefit most from AI Voice Agents?",
      answer: "Industries like e-commerce, banking, healthcare, real estate, and logistics use them for customer support, appointment booking, order tracking, and sales automation.",
    },
    {
      id: "small-business",
      question: "Are AI Voice Agents suitable for small businesses?",
      answer: "Absolutely. They are scalable and cost-effective, allowing small businesses to offer 24/7 customer service and expand into global markets without large teams.",
    },
    {
      id: "response-speed",
      question: "How fast can AI Voice Agents respond?",
      answer: "With ultra-low latency technology, responses can be delivered in under 300 milliseconds, ensuring conversations feel as natural as speaking to a human.",
    },
    {
      id: "concurrent-calls",
      question: "Can AI Voice Agents handle multiple calls at once?",
      answer: "Yes, they scale instantly to manage multiple conversations simultaneously.",
    },
    {
      id: "security",
      question: "How secure are AI Voice Agents?",
      answer: "Enterprise-grade encryption, GDPR compliance, and secure API protocols ensure customer data remains safe during every interaction.",
    },
    {
      id: "get-started",
      question: "How can I get started with AI Voice Agents?",
      answer: "You can start by scheduling a free demo with OnDial to see how real-time, multilingual AI Voice Agents can transform your customer communication.",
    },
  ],
  about: [
    {
      id: "what-is-ondial",
      question: "What is OnDial?",
      answer: "OnDial is an AI voice agent platform that automates calls, answers customer queries, and delivers human-like conversations in real time.",
    },
    {
      id: "how-does-ondial-work",
      question: "How does OnDial work?",
      answer: "Our AI uses natural language processing (NLP) to understand callers, provide answers, schedule appointments, and qualify leads, all in real time.",
    },
    {
      id: "which-languages-does-ondial-support",
      question: "Which languages does OnDial support?",
      answer: "OnDial  supports over 20+ languages, including English, Spanish, French, Hindi, and more, making it ideal for global businesses.",
    },
    {
      id: "can-ondial-replace-my-call-center",
      question: "Can OnDial replace my call center?",
      answer: "It can handle repetitive calls and lead qualification efficiently, reducing workload for human agents while ensuring 24/7 customer support.",
    },
    {
      id: "is-ondial-secure",
      question: "Is OnDial  secure?",
      answer: "Yes. All calls and data are encrypted and managed according to strict privacy and security standards.",
    },
    {
      id: "can-ondial-integrate-with-my-crm",
      question: "Can OnDial integrate with my CRM?",
      answer: "Absolutely. Our platform integrates with popular CRMs, calendars, and lead management tools for seamless workflow.",
    },
    {
      id: "does-ondial-work-for-small-businesses",
      question: "Does OnDial work for small businesses?",
      answer: "Yes, OnDial  is scalable and works for businesses of all sizes, from startups to enterprises.",
    },
    {
      id: "how-does-ai-lead-qualification-work",
      question: "How does AI lead qualification work?",
      answer: "Our AI asks pre-defined qualifying questions, evaluates responses, and scores leads before passing high-potential ones to your sales team.",
    },
    {
      id: "can-ondial-schedule-appointments",
      question: "Can OnDial schedule appointments?",
      answer: "Yes, it can book, reschedule, and send reminders for appointments, keeping your calendar updated automatically.",
    },
    {
      id: "how-do-i-get-started-with-ondial",
      question: "How do I get started with OnDial?",
      answer: "Simply request a demo or contact our team. We’ll guide you through setup and ensure your AI voice agent is ready to take calls immediately.",
    },
  ],
  "ai-voice-agents-healthcare-medical": [
    {
      id: "what-are-ai-voice-agents-in-healthcare",
      question: "What are AI voice agents in healthcare?",
      answer: "AI voice agents are automated systems that interact with patients using natural language, helping with reminders, follow-ups, and medical updates.",
    },
    {
      id: "how-do-ai-voice-agents-improve-patient-engagement",
      question: "How do AI voice agents improve patient engagement?",
      answer: "By delivering timely reminders, personalized communication, and multilingual support, AI voice agents keep patients informed and connected.",
    },
    {
      id: "are-ai-voice-agents-secure-for-medical-communication",
      question: "Are AI voice agents secure for medical communication?",
      answer: "Yes. Ondial solutions are HIPAA-compliant and designed with strict data privacy and security protocols.",
    },
    {
      id: "can-ai-voice-agents-reduce-missed-appointments",
      question: "Can AI voice agents reduce missed appointments?",
      answer: "Absolutely. Automated appointment confirmations reduce no-shows by ensuring patients receive consistent reminders.",
    },
    {
      id: "how-do-ai-voice-agents-help-in-chronic-disease-management",
      question: "How do AI voice agents help in chronic disease management?",
      answer: "They conduct regular check-ins, provide medication reminders, and monitor adherence for conditions like diabetes and hypertension.",
    },
    {
      id: "do-ai-voice-agents-support-multiple-languages",
      question: "Do AI voice agents support multiple languages?",
      answer: "Yes. Ondial AI voice solutions support multilingual communication, ensuring patients receive messages in their preferred language.",
    },
    {
      id: "can-hospitals-integrate-ai-voice-agents-with-existing-systems",
      question: "Can hospitals integrate AI voice agents with existing systems?",
      answer: "Yes. Ondial integrates seamlessly with hospital management systems, EHRs, and scheduling tools.",
    },
    {
      id: "how-do-ai-voice-agents-assist-in-insurance-claim-processing",
      question: "How do AI voice agents assist in insurance claim processing?",
      answer: "They provide automated updates on claim status, request necessary documents, and reduce manual work for insurance staff.",
    },
    {
      id: "are-ai-voice-agents-cost-effective-for-small-clinics",
      question: "Are AI voice agents cost-effective for small clinics?",
      answer: "Yes. Ondial solutions scale easily, making them affordable and effective for both small clinics and large hospitals.",
    },
    {
      id: "what-makes-ondial-the-best-choice-for-healthcare-medical-services",
      question: "What makes Ondial the best choice for healthcare & medical services?",
      answer: "Our expertise, secure infrastructure, and proven success in healthcare automation make Ondial a trusted partner for medical organizations.",
    },
  ],
  "ai-voice-agents-finance-banking": [
    {
      id: "what-are-ai-voice-agents-for-finance-and-banking",
      question: "What are AI voice agents for finance and banking?",
      answer: "AI voice agents are virtual assistants that use conversational AI to handle customer interactions like payment reminders, fraud alerts, and account updates.",
    },
    {
      id: "how-do-ai-voice-agents-improve-banking-services",
      question: "How do AI voice agents improve banking services?",
      answer: "They automate repetitive tasks, reduce wait times, and provide 24/7 customer support while maintaining security and accuracy.",
    },
    {
      id: "are-ai-voice-agents-secure-for-financial-transactions",
      question: "Are AI voice agents secure for financial transactions?",
      answer: "Yes, OnDial’s solutions are PCI-DSS and GDPR compliant, ensuring customer data and transactions remain fully secure.",
    },
    {
      id: "can-ai-voice-agents-replace-human-banking-agents",
      question: "Can AI voice agents replace human banking agents?",
      answer: "They don’t replace but augment human agents by handling routine calls, allowing staff to focus on complex cases.",
    },
    {
      id: "how-do-ai-voice-agents-help-in-fraud-detection",
      question: "How do AI voice agents help in fraud detection?",
      answer: "They send instant suspicious activity alerts, helping customers take immediate action against potential fraud.",
    },
    {
      id: "do-ai-voice-agents-support-multilingual-conversations",
      question: "Do AI voice agents support multilingual conversations?",
      answer: "Yes, OnDial offers multilingual AI voice solutions, enabling banks to engage global customers effectively.",
    },
    {
      id: "how-can-ai-voice-agents-help-in-loan-management",
      question: "How can AI voice agents help in loan management?",
      answer: "They provide loan status updates, EMI reminders, and refinancing options, simplifying the borrower’s journey.",
    },
    {
      id: "what-role-do-ai-voice-agents-play-in-investment-services",
      question: "What role do AI voice agents play in investment services?",
      answer: "They deliver portfolio performance insights, rebalancing tips, and market alerts, improving client engagement.",
    },
    {
      id: "are-ai-voice-agents-cost-effective-for-banks",
      question: "Are AI voice agents cost-effective for banks?",
      answer: "Yes, they reduce operational costs by 40%+ by automating customer interactions and reducing call center load.",
    },
    {
      id: "how-can-my-bank-start-using-ai-voice-agents",
      question: "How can my bank start using AI voice agents?",
      answer: "You can partner with OnDial to integrate AI voice solutions with your existing systems and launch within weeks.",
    },
  ],
  "ai-voice-agents-real-estate": [
    {
      id: "what-are-ai-voice-agents-for-real-estate-services",
      question: "What are AI voice agents for real estate services?",
      answer: "AI voice agents are virtual assistants that automate client communication in real estate. They answer property inquiries, schedule viewings, and provide updates 24/7.",
    },
    {
      id: "how-do-ai-voice-agents-help-real-estate-agents",
      question: "How do AI voice agents help real estate agents?",
      answer: "They save time by handling repetitive calls, qualifying leads, and scheduling showings-allowing agents to focus on closing deals.",
    },
    {
      id: "can-ai-voice-agents-replace-human-real-estate-agents",
      question: "Can AI voice agents replace human real estate agents?",
      answer: "No. They support agents by automating routine tasks, but complex negotiations and personalized advice still require human expertise.",
    },
    {
      id: "do-ai-real-estate-assistants-support-multiple-languages",
      question: "Do AI real estate assistants support multiple languages?",
      answer: "Yes. OnDial AI voice agents support multilingual communication, making them ideal for global clients and investors.",
    },
    {
      id: "how-secure-is-client-data-with-ai-voice-agents",
      question: "How secure is client data with AI voice agents?",
      answer: "OnDial ensures full compliance with data security standards, safeguarding sensitive client and property information.",
    },
    {
      id: "can-ai-handle-property-maintenance-requests",
      question: "Can AI handle property maintenance requests?",
      answer: "Yes. AI agents schedule maintenance, coordinate service providers, and notify tenants about updates.",
    },
    {
      id: "how-do-ai-voice-agents-improve-lead-qualification",
      question: "How do AI voice agents improve lead qualification?",
      answer: "They use preset criteria to filter serious buyers from casual inquiries, ensuring sales teams focus on high-quality leads.",
    },
    {
      id: "are-ai-voice-agents-useful-for-rental-property-owners",
      question: "Are AI voice agents useful for rental property owners?",
      answer: "Absolutely. They send lease renewal reminders, collect tenant feedback, and provide quick support for rental inquiries.",
    },
    {
      id: "can-ai-agents-assist-real-estate-investors",
      question: "Can AI agents assist real estate investors?",
      answer: "Yes. They provide instant alerts on new investment opportunities that match investor criteria.",
    },
    {
      id: "how-do-i-get-started-with-ondial-s-ai-voice-agents",
      question: "How do I get started with OnDial’s AI voice agents?",
      answer: "Simply book a demo through the OnDial website. Our team will customize AI voice workflows tailored to your real estate business needs.",
    },
  ],
  "ai-voice-agents-retail-e-commerce": [
    {
      id: "what-are-ai-voice-agents-in-retail-and-e-commerce",
      question: "What are AI voice agents in retail and e-commerce?",
      answer: "AI voice agents are automated systems that handle customer calls, providing real-time support, updates, and personalized recommendations for e-commerce businesses.",
    },
    {
      id: "how-can-ai-voice-agents-reduce-cart-abandonment",
      question: "How can AI voice agents reduce cart abandonment?",
      answer: "They follow up with customers through reminders or calls, offering assistance or discounts, encouraging them to complete pending purchases.",
    },
    {
      id: "can-ai-voice-agents-handle-returns-and-exchanges",
      question: "Can AI voice agents handle returns and exchanges?",
      answer: "Yes, AI agents can explain policies, guide customers through steps, and simplify return/exchange requests, improving customer satisfaction.",
    },
    {
      id: "do-ai-voice-agents-support-multiple-languages",
      question: "Do AI voice agents support multiple languages?",
      answer: "OnDial’s AI voice agents support multilingual interactions, making them ideal for global e-commerce businesses.",
    },
    {
      id: "how-do-ai-agents-improve-customer-loyalty",
      question: "How do AI agents improve customer loyalty?",
      answer: "By enrolling customers in loyalty programs, offering rewards, and sending personalized recommendations, they encourage repeat purchases.",
    },
    {
      id: "can-ai-voice-agents-integrate-with-shopify-and-magento",
      question: "Can AI voice agents integrate with Shopify and Magento?",
      answer: "Yes, OnDial integrates seamlessly with major e-commerce platforms like Shopify, Magento, WooCommerce, and custom CRMs.",
    },
    {
      id: "are-ai-voice-agents-secure-for-handling-customer-data",
      question: "Are AI voice agents secure for handling customer data?",
      answer: "Absolutely. OnDial follows enterprise-grade data compliance and security protocols to protect customer information.",
    },
    {
      id: "how-do-ai-voice-agents-support-seasonal-promotions",
      question: "How do AI voice agents support seasonal promotions?",
      answer: "They can automate outreach during holidays or sales events, sending personalized offers and reminders to boost sales.",
    },
    {
      id: "what-industries-benefit-most-from-ai-voice-agents",
      question: "What industries benefit most from AI voice agents?",
      answer: "Fashion, grocery, electronics, luxury retail, and global marketplaces benefit the most from AI voice agent automation.",
    },
    {
      id: "why-choose-ondial-for-ai-voice-agents-in-retail-e-commerce",
      question: "Why choose OnDial for AI voice agents in retail & e-commerce?",
      answer: "OnDial offers secure, scalable, and globally optimized AI voice agent solutions that improve conversions, reduce costs, and enhance customer experience.",
    },
  ],
  "ai-voice-agents-insurance": [
    {
      id: "what-are-ai-voice-agents-for-insurance",
      question: "What are AI voice agents for insurance?",
      answer: "AI voice agents are automated voice-powered assistants that help insurance companies manage claims, renewals, payments, and customer support more efficiently.",
    },
    {
      id: "how-do-ai-voice-agents-improve-insurance-claims-processing",
      question: "How do AI voice agents improve insurance claims processing?",
      answer: "They provide real-time claim status updates, guide customers through documentation, and reduce wait times by automating repetitive claim inquiries.",
    },
    {
      id: "can-ai-voice-agents-handle-multilingual-support-for-insurance-customers",
      question: "Can AI voice agents handle multilingual support for insurance customers?",
      answer: "Yes, OnDial’s AI agents offer multilingual capabilities, allowing insurers to support diverse global customer bases.",
    },
    {
      id: "how-do-ai-agents-reduce-operational-costs-in-insurance-companies",
      question: "How do AI agents reduce operational costs in insurance companies?",
      answer: "By automating renewals, claim updates, and payment reminders, insurers can reduce call center workload and lower staffing costs.",
    },
    {
      id: "are-ai-voice-agents-secure-for-insurance-services",
      question: "Are AI voice agents secure for insurance services?",
      answer: "Yes, OnDial’s AI is enterprise-grade, ensuring compliance with global regulations like GDPR and HIPAA to keep customer data safe.",
    },
    {
      id: "can-ai-help-customers-with-premium-payment-reminders",
      question: "Can AI help customers with premium payment reminders?",
      answer: "Absolutely. AI voice agents send reminders, set up automated payments, and reduce the risk of missed premiums.",
    },
    {
      id: "how-do-ai-voice-agents-enhance-customer-experience-in-insurance",
      question: "How do AI voice agents enhance customer experience in insurance?",
      answer: "They provide 24/7 support, instant updates, and personalized coverage recommendations, ensuring customers feel supported at all times.",
    },
    {
      id: "can-ai-agents-help-in-policy-renewals-and-upgrades",
      question: "Can AI agents help in policy renewals and upgrades?",
      answer: "Yes, they remind customers of upcoming renewals, explain policy changes, and suggest optimized coverage plans.",
    },
    {
      id: "what-makes-ondial-different-from-other-ai-providers-in-insurance",
      question: "What makes OnDial different from other AI providers in insurance?",
      answer: "OnDial offers emotion-aware, real-time, multilingual AI voice solutions tailored for insurance companies, with seamless CRM and claims integration.",
    },
    {
      id: "how-can-insurers-get-started-with-ai-voice-agents",
      question: "How can insurers get started with AI voice agents?",
      answer: "Insurers can contact OnDial, schedule a demo, and implement AI voice agents to automate renewals, claims, and customer engagement.",
    },
  ],
  "ai-voice-agents-sales-lead-generation": [
    {
      id: "what-are-ai-voice-agents-for-sales",
      question: "What are AI voice agents for sales?",
      answer: "AI voice agents are intelligent voice-based assistants that automate sales tasks such as lead qualification, scheduling, and follow-ups, ensuring consistent and efficient customer engagement.",
    },
    {
      id: "how-do-ai-voice-agents-improve-lead-generation",
      question: "How do AI voice agents improve lead generation?",
      answer: "They instantly engage prospects, qualify their interest, and schedule meetings, ensuring no lead is ignored and sales teams focus only on high-potential opportunities.",
    },
    {
      id: "can-ai-voice-agents-handle-appointment-scheduling",
      question: "Can AI voice agents handle appointment scheduling?",
      answer: "Yes, they integrate directly with calendars to schedule, reschedule, or confirm meetings, saving valuable time for sales representatives.",
    },
    {
      id: "do-ai-voice-agents-handle-appointment-scheduling",
      question: "Do AI voice agents handle appointment scheduling?",
      answer: "Yes, AI voice agents integrate with calendars to schedule, confirm, or reschedule meetings. This ensures smooth coordination without manual effort, saving sales reps valuable time and improving prospect experience.",
    },
    {
      id: "how-do-ai-agents-support-customer-onboarding",
      question: "How do AI agents support customer onboarding?",
      answer: "They guide customers step-by-step through onboarding, providing instructions, answering queries, and ensuring a smooth first experience.",
    },
    {
      id: "can-ai-voice-agents-improve-follow-up-consistency",
      question: "Can AI voice agents improve follow-up consistency?",
      answer: "Yes, they send reminders, make follow-up calls, and ensure prospects remain engaged until conversion.",
    },
    {
      id: "do-ai-voice-agents-support-global-and-multilingual-sales-operations",
      question: "Do AI voice agents support global and multilingual sales operations?",
      answer: "Yes, OnDial’s AI voice agents are multilingual and available 24/7. They help businesses engage prospects across time zones and languages, making global sales outreach seamless and efficient.",
    },
    {
      id: "how-can-businesses-start-using-ai-voice-agents-for-sales",
      question: "How can businesses start using AI voice agents for sales?",
      answer: "Getting started is simple. OnDial customizes AI voice solutions for each business, integrates them with existing systems, and ensures a smooth deployment so sales teams see results quickly.",
    },
    {
      id: "do-ai-voice-agents-support-global-businesses",
      question: "Do AI voice agents support global businesses?",
      answer: "Yes, OnDial’s AI agents are multilingual and operate 24/7, making them ideal for businesses targeting international markets.",
    },
    {
      id: "how-can-i-get-started-with-ai-voice-agents-for-sales",
      question: "How can I get started with AI voice agents for sales?",
      answer: "Simply contact OnDial. Our team will assess your needs, customize solutions, and deploy AI voice agents tailored to your sales strategy.",
    },
  ],
  "ai-voice-agents-call-centers-bpo": [
    {
      id: "what-are-ai-voice-agents-for-call-centers",
      question: "What are AI Voice Agents for call centers?",
      answer: "AI Voice Agents are intelligent voice bots that handle customer interactions, automate repetitive tasks, and provide instant responses in call centers and BPOs.",
    },
    {
      id: "how-do-ai-voice-agents-improve-call-center-efficiency",
      question: "How do AI Voice Agents improve call center efficiency?",
      answer: "They automate repetitive queries, reduce wait times, and enable human agents to focus on high-value customer interactions, improving efficiency.",
    },
    {
      id: "can-ai-voice-agents-handle-multiple-languages",
      question: "Can AI Voice Agents handle multiple languages?",
      answer: "Yes, OnDial AI Voice Agents support multilingual capabilities, enabling businesses to serve global customers seamlessly.",
    },
    {
      id: "are-ai-voice-agents-secure-for-compliance-heavy-industries",
      question: "Are AI Voice Agents secure for compliance-heavy industries?",
      answer: "Absolutely. AI voice automation follows strict data privacy and compliance standards, ensuring secure operations.",
    },
    {
      id: "can-ai-voice-agents-integrate-with-crm-systems",
      question: "Can AI Voice Agents integrate with CRM systems?",
      answer: "Yes, OnDial integrates seamlessly with CRM and business tools for efficient data handling and automation.",
    },
    {
      id: "how-do-ai-voice-agents-help-with-lead-qualification",
      question: "How do AI Voice Agents help with lead qualification",
      answer: "They score and evaluate prospects using multi-criteria analysis, ensuring only quality leads reach your sales team.",
    },
    {
      id: "what-role-do-ai-voice-agents-play-in-customer-feedback-collection",
      question: "What role do AI Voice Agents play in customer feedback collection?",
      answer: "They conduct automated surveys, analyze customer sentiment, and deliver actionable insights for service improvement.",
    },
    {
      id: "do-ai-voice-agents-replace-human-agents",
      question: "Do AI Voice Agents replace human agents?",
      answer: "No, they complement them. AI handles routine tasks, while human agents manage complex and emotional customer needs.",
    },
    {
      id: "how-do-ai-voice-agents-reduce-costs-in-bpo-services",
      question: "How do AI Voice Agents reduce costs in BPO services?",
      answer: "By automating routine tasks, businesses save on staffing costs while scaling operations without compromising quality.",
    },
    {
      id: "why-choose-ondial-for-ai-voice-agents",
      question: "Why choose OnDial for AI Voice Agents?",
      answer: "OnDial offers enterprise-grade AI solutions, multilingual support, and proven results across industries, making it a trusted global partner.",
    },
  ],
  "ai-voice-agents-telecommunications": [
    {
      id: "what-are-ai-voice-agents-for-telecommunications-services",
      question: "What are AI voice agents for telecommunications services?",
      answer: "AI voice agents are automated, conversational systems that handle telecom tasks like billing, activation, and technical support without human intervention.",
    },
    {
      id: "how-can-ai-improve-telecom-customer-service",
      question: "How can AI improve telecom customer service?",
      answer: "AI in telecom customer service reduces wait times, provides instant responses, and delivers 24/7 multilingual support-leading to higher satisfaction.",
    },
    {
      id: "can-ai-voice-agents-handle-billing-inquiries",
      question: "Can AI voice agents handle billing inquiries?",
      answer: "Yes. AI call center solutions for telecom explain bills, process payments, and even resolve disputes, ensuring transparency and convenience for customers.",
    },
    {
      id: "are-ai-powered-telecom-services-secure",
      question: "Are AI-powered telecom services secure?",
      answer: "OnDial’s AI voice agents follow strict data security standards, encryption protocols, and telecom compliance regulations to ensure customer privacy.",
    },
    {
      id: "how-do-ai-agents-support-technical-troubleshooting",
      question: "How do AI agents support technical troubleshooting?",
      answer: "They guide users through modem resets, service reconfigurations, and other basic issues, escalating complex cases to human agents only when necessary.",
    },
    {
      id: "can-ai-recommend-the-best-telecom-plans",
      question: "Can AI recommend the best telecom plans?",
      answer: "Absolutely. AI voice agents analyze customer usage and suggest optimized plans, helping reduce costs while boosting provider revenues.",
    },
    {
      id: "how-do-ai-voice-agents-manage-contract-renewals",
      question: "How do AI voice agents manage contract renewals?",
      answer: "They send proactive reminders, explain updated terms, and allow customers to confirm renewals instantly via a secure voice interface.",
    },
    {
      id: "what-role-does-ai-play-in-service-outage-updates",
      question: "What role does AI play in service outage updates?",
      answer: "During outages, AI voice automation notifies customers, shares real-time restoration timelines, and reduces the burden on call centers.",
    },
    {
      id: "are-ai-voice-agents-scalable-for-global-telecom-providers",
      question: "Are AI voice agents scalable for global telecom providers?",
      answer: "Yes. They can handle millions of concurrent interactions across languages, making them ideal for global telecom operators.",
    },
    {
      id: "why-should-telecom-providers-choose-ondial-over-competitors",
      question: "Why should telecom providers choose OnDial over competitors?",
      answer: "OnDial offers telecom-specific AI solutions with proven global results, regulatory compliance, and seamless integration-making it a trusted AI partner.",
    },
  ],
  "ai-voice-agents-automotive": [
    {
      id: "what-are-ai-voice-agents-for-automotive-services",
      question: "What are AI voice agents for automotive services?",
      answer: "AI voice agents are automated systems that handle customer calls and reminders for dealerships, repair shops, insurers, and lenders-offering instant, personalized support.",
    },
    {
      id: "how-do-ai-voice-agents-improve-customer-experience",
      question: "How do AI voice agents improve customer experience?",
      answer: "They provide 24/7 availability, instant responses, multilingual support, and contextual conversations that reduce wait times and improve service satisfaction.",
    },
    {
      id: "can-ai-voice-agents-help-with-vehicle-recalls",
      question: "Can AI voice agents help with vehicle recalls?",
      answer: "Yes. They notify customers of recalls, explain safety concerns, and schedule repair appointments automatically-ensuring compliance and trust.",
    },
    {
      id: "how-do-ai-voice-agents-benefit-car-dealerships",
      question: "How do AI voice agents benefit car dealerships?",
      answer: "Dealerships can use AI for sales follow-ups, trade-in evaluations, financing updates, and after-sales service reminders-driving customer loyalty.",
    },
    {
      id: "are-ai-voice-agents-useful-for-auto-repair-shops",
      question: "Are AI voice agents useful for auto repair shops?",
      answer: "Absolutely. They schedule appointments, send reminders, and update customers on service status-reducing no-shows and improving efficiency.",
    },
    {
      id: "can-ai-assist-with-automotive-financing-and-insurance",
      question: "Can AI assist with automotive financing and insurance?",
      answer: "Yes. AI voice agents help with loan refinancing, payment plan modifications, policy renewals, and claim support-making processes smoother for customers.",
    },
    {
      id: "do-ai-voice-agents-support-multiple-languages",
      question: "Do AI voice agents support multiple languages?",
      answer: "OnDial’s AI voice agents are multilingual, making them ideal for automotive companies serving global markets.",
    },
    {
      id: "how-do-ai-voice-agents-help-with-warranty-extensions",
      question: "How do AI voice agents help with warranty extensions?",
      answer: "They send expiration reminders, explain benefits of extended coverage, and assist customers with easy upgrades.",
    },
    {
      id: "can-ai-handle-parts-ordering-and-installation-scheduling",
      question: "Can AI handle parts ordering and installation scheduling?",
      answer: "Yes. Customers can check availability, place orders, and schedule installation through AI-powered calls.",
    },
    {
      id: "why-should-automotive-businesses-choose-ondial",
      question: "Why should automotive businesses choose OnDial?",
      answer: "OnDial offers scalable, secure, and industry-specific AI voice agent solutions-built to deliver real results for dealerships, insurers, and repair shops.",
    },
  ],
  "ai-voice-agents-education": [
    {
      id: "what-are-ai-voice-agents-in-education",
      question: "What are AI voice agents in education?",
      answer: "AI voice agents are automated systems that deliver voice-based updates like enrollment confirmations, tuition reminders, and academic progress notifications.",
    },
    {
      id: "how-do-ai-voice-agents-improve-engagement",
      question: "How do AI voice agents improve engagement?",
      answer: "They provide personalized, real-time communication that keeps students and parents updated on deadlines, grades, and events.",
    },
    {
      id: "can-ondial-s-ai-agents-work-in-multiple-languages",
      question: "Can OnDial’s AI agents work in multiple languages?",
      answer: "Yes. OnDial supports global education institutions with multilingual AI voice services.",
    },
    {
      id: "how-do-they-help-with-tuition-compliance",
      question: "How do they help with tuition compliance?",
      answer: "AI agents send automated voice reminders, reducing missed payments and increasing financial aid awareness.",
    },
    {
      id: "are-ai-voice-agents-secure-for-student-data",
      question: "Are AI voice agents secure for student data?",
      answer: "Yes. OnDial follows strict compliance standards to protect sensitive student and institutional data.",
    },
    {
      id: "can-they-integrate-with-existing-school-systems",
      question: "Can they integrate with existing school systems?",
      answer: "Absolutely. OnDial integrates with ERP, LMS, and CRM platforms without disrupting existing processes.",
    },
    {
      id: "how-do-ai-agents-support-alumni-outreach",
      question: "How do AI agents support alumni outreach?",
      answer: "They automate donation reminders, reunion invites, and event announcements to strengthen alumni networks.",
    },
    {
      id: "do-small-schools-benefit-from-ai-voice-agents",
      question: "Do small schools benefit from AI voice agents?",
      answer: "Yes. OnDial’s platform scales to fit small schools, mid-sized colleges, and global universities.",
    },
    {
      id: "how-do-ai-agents-help-with-student-well-being",
      question: "How do AI agents help with student well-being?",
      answer: "They send reminders for counseling appointments, mental health support, and student services.",
    },
    {
      id: "what-measurable-impact-do-ai-voice-agents-deliver",
      question: "What measurable impact do AI voice agents deliver?",
      answer: "Institutions using OnDial see fewer missed payments, higher event participation, and stronger engagement across students and alumni.",
    },
  ],
  "ai-voice-agents-travel-tourism": [
    {
      id: "what-are-ai-voice-agents-in-travel-tourism",
      question: "What are AI voice agents in travel & tourism?",
      answer: "AI voice agents are automated, AI-powered assistants that provide real-time booking, flight, check-in, and travel support through natural voice interactions.",
    },
    {
      id: "how-do-ai-voice-agents-help-airlines",
      question: "How do AI voice agents help airlines?",
      answer: "They automate booking confirmations, flight updates, and check-in reminders, reducing call center load while enhancing passenger experience.",
    },
    {
      id: "can-ai-voice-agents-handle-multilingual-travelers",
      question: "Can AI voice agents handle multilingual travelers?",
      answer: "Yes, OnDial’s AI voice agents provide multilingual support, making them ideal for global airlines and tourism companies.",
    },
    {
      id: "do-ai-voice-agents-improve-customer-satisfaction",
      question: "Do AI voice agents improve customer satisfaction?",
      answer: "Absolutely. By offering instant responses, proactive updates, and personalization, they ensure stress-free travel.",
    },
    {
      id: "how-do-ai-voice-agents-benefit-hotels-and-resorts",
      question: "How do AI voice agents benefit hotels and resorts?",
      answer: "Hotels use AI voice bots for room bookings, concierge services, dining reservations, and loyalty program support.",
    },
    {
      id: "are-ai-voice-agents-secure-for-handling-travel-data",
      question: "Are AI voice agents secure for handling travel data?",
      answer: "Yes, OnDial’s platform uses enterprise-grade security and compliance measures to keep traveler data safe.",
    },
    {
      id: "can-ai-voice-agents-replace-human-staff-in-travel",
      question: "Can AI voice agents replace human staff in travel?",
      answer: "Not entirely-they handle routine tasks, while human staff focus on complex, emotional, or premium service interactions.",
    },
    {
      id: "how-do-ai-voice-agents-support-travel-insurance-services",
      question: "How do AI voice agents support travel insurance services?",
      answer: "They provide quick policy explanations, claim guidance, and coverage reminders, reducing delays for travelers.",
    },
    {
      id: "what-makes-OnDial-s-ai-voice-agents-different",
      question: "What makes OnDial’s AI voice agents different?",
      answer: "OnDial offers scalable, customizable, and industry-specific AI solutions tailored for travel and tourism businesses worldwide.",
    },
    {
      id: "how-can-my-company-get-started-with-ai-voice-agents",
      question: "How can my company get started with AI voice agents?",
      answer: "You can contact OnDial’s AI specialists to design a customized voice agent solution that fits your travel business needs.",
    },
  ],
  "ai-voice-agents-hospitality": [
    {
      id: "what-are-ai-voice-agents-for-hospitality-services",
      question: "What are AI voice agents for hospitality services?",
      answer: "AI voice agents are intelligent systems that handle reservations, check-ins, concierge support, and guest communication through natural voice interaction.",
    },
    {
      id: "how-can-ai-improve-hotel-reservations",
      question: "How can AI improve hotel reservations?",
      answer: "AI ensures accurate, instant confirmations, handles special requests, and reduces booking errors-improving reliability for both guests and hotels.",
    },
    {
      id: "do-ai-voice-assistants-replace-hotel-staff",
      question: "Do AI voice assistants replace hotel staff?",
      answer: "No. They complement staff by automating repetitive tasks, allowing staff to focus on high-value guest interactions.",
    },
    {
      id: "can-ai-voice-agents-handle-multilingual-guests",
      question: "Can AI voice agents handle multilingual guests?",
      answer: "Yes. OnDial supports multiple languages, ensuring smooth communication for international travelers.",
    },
    {
      id: "is-ai-concierge-service-secure",
      question: "Is AI concierge service secure?",
      answer: "Absolutely. OnDial uses secure protocols to protect guest information while delivering real-time concierge support.",
    },
    {
      id: "how-does-ai-help-with-guest-loyalty-programs",
      question: "How does AI help with guest loyalty programs?",
      answer: "AI personalizes rewards, promotions, and offers-making guests feel valued and encouraging repeat bookings.",
    },
    {
      id: "can-hotels-integrate-ai-voice-agents-with-their-existing-systems",
      question: "Can hotels integrate AI voice agents with their existing systems?",
      answer: "Yes. OnDial integrates easily with popular hotel management and booking systems.",
    },
    {
      id: "what-types-of-hospitality-businesses-benefit-most-from-ai",
      question: "What types of hospitality businesses benefit most from AI?",
      answer: "Hotels, resorts, vacation rentals, cruise lines, and event venues see the highest value from AI-driven guest services.",
    },
    {
      id: "does-ai-reduce-operational-costs-for-hotels",
      question: "Does AI reduce operational costs for hotels?",
      answer: "Yes. By automating tasks like reservations, check-ins, and feedback collection, hotels save time and reduce staffing costs.",
    },
    {
      id: "how-quickly-can-a-hotel-implement-ondial-ai-solutions",
      question: "How quickly can a hotel implement OnDial AI solutions?",
      answer: "Most properties can implement OnDial’s AI voice agents within a few weeks, depending on system integration needs.",
    },
  ],
  "ai-voice-agents-legal": [
    {
      id: "what-are-ai-voice-agents-for-legal-services",
      question: "What are AI voice agents for legal services?",
      answer: "AI voice agents are intelligent voice-based systems that automate client calls, case updates, scheduling, and compliance tracking for law firms.",
    },
    {
      id: "how-do-ai-voice-agents-benefit-law-firms",
      question: "How do AI voice agents benefit law firms?",
      answer: "They reduce admin work, improve client satisfaction, send timely reminders, and help lawyers focus on billable casework.",
    },
    {
      id: "can-ai-voice-assistants-handle-legal-billing-queries",
      question: "Can AI voice assistants handle legal billing queries?",
      answer: "Yes, they explain invoices, guide clients on payments, and even set up installment reminders.",
    },
    {
      id: "are-ai-voice-agents-secure-for-legal-use",
      question: "Are AI voice agents secure for legal use?",
      answer: "Absolutely. OnDial ensures encrypted, compliant voice communication that meets industry regulations.",
    },
    {
      id: "do-ai-voice-agents-replace-human-lawyers",
      question: "Do AI voice agents replace human lawyers?",
      answer: "No. They complement lawyers by handling communication and admin tasks, not legal decision-making.",
    },
    {
      id: "how-can-ai-voice-agents-help-with-compliance-deadlines",
      question: "How can AI voice agents help with compliance deadlines?",
      answer: "They track filing dates and send proactive reminders to avoid penalties and missed deadlines.",
    },
    {
      id: "can-ai-agents-integrate-with-case-management-software",
      question: "Can AI agents integrate with case management software?",
      answer: "Yes, OnDial’s AI integrates seamlessly with legal CRMs and practice management tools.",
    },
    {
      id: "are-ai-voice-agents-multilingual",
      question: "Are AI voice agents multilingual?",
      answer: "Yes, OnDial supports multiple languages to serve clients globally.",
    },
    {
      id: "is-ai-voice-automation-cost-effective-for-small-law-firms",
      question: "Is AI voice automation cost-effective for small law firms?",
      answer: "Yes, AI scales to firm size, making it affordable even for solo practitioners.",
    },
    {
      id: "what-s-the-future-of-ai-in-legal-services",
      question: "What’s the future of AI in legal services?",
      answer: "The future includes predictive client communication, AI-driven compliance monitoring, and smarter client engagement at scale.",
    },
  ],
  "ai-voice-agents-government": [
    {
      id: "what-are-ai-voice-agents-for-government-services",
      question: "What are AI voice agents for government services?",
      answer: "AI voice agents are intelligent, automated voice systems that help citizens access government services such as application status, renewals, and tax updates instantly.",
    },
    {
      id: "how-do-ai-voice-agents-improve-citizen-engagement",
      question: "How do AI voice agents improve citizen engagement?",
      answer: "They provide 24/7 support, multilingual accessibility, and faster responses, ensuring governments can serve more people efficiently.",
    },
    {
      id: "can-ai-voice-assistants-handle-multiple-languages",
      question: "Can AI voice assistants handle multiple languages?",
      answer: "Yes. OnDial’s AI voice agents are designed to support multilingual communication, making services accessible to diverse communities.",
    },
    {
      id: "are-ai-voice-agents-secure-for-government-use",
      question: "Are AI voice agents secure for government use?",
      answer: "Absolutely. OnDial builds solutions with strict compliance, data privacy, and security standards suitable for government regulations.",
    },
    {
      id: "how-can-ai-help-in-tax-administration",
      question: "How can AI help in tax administration?",
      answer: "AI voice assistants provide deadline reminders, refund status updates, and filing guidance, reducing manual queries and delays.",
    },
    {
      id: "can-ai-voice-agents-reduce-operational-costs-for-governments",
      question: "Can AI voice agents reduce operational costs for governments?",
      answer: "Yes. By automating repetitive citizen queries, governments save staff time and reduce administrative costs significantly.",
    },
    {
      id: "what-government-departments-can-benefit-from-ai-voice-agents",
      question: "What government departments can benefit from AI voice agents?",
      answer: "Departments such as healthcare, transport, taxation, licensing, and public safety see the greatest impact from AI adoption.",
    },
    {
      id: "how-do-ai-voice-agents-support-compliance-monitoring",
      question: "How do AI voice agents support compliance monitoring?",
      answer: "They send automated alerts for regulatory requirements and violations, helping citizens and businesses stay compliant.",
    },
    {
      id: "what-role-do-ai-voice-agents-play-in-emergency-management",
      question: "What role do AI voice agents play in emergency management?",
      answer: "They broadcast real-time disaster alerts, emergency notifications, and safety information to keep citizens informed and safe.",
    },
    {
      id: "how-can-governments-get-started-with-ondial-s-ai-voice-solutions",
      question: "How can governments get started with OnDial’s AI voice solutions?",
      answer: "Governments can request a demo, consult with our experts, and integrate AI voice agents tailored to their department’s needs.",
    },
  ],
  "ai-voice-agents-utilities": [
    {
      id: "how-can-ai-voice-agents-improve-utilities-billing-services",
      question: "How can AI voice agents improve utilities billing services?",
      answer: "AI voice agents send automated payment reminders, provide billing details, and allow customers to pay through secure voice-enabled links, reducing late payments and manual collection costs.",
    },
    {
      id: "can-ai-voice-agents-handle-outage-notifications-effectively",
      question: "Can AI voice agents handle outage notifications effectively?",
      answer: "Yes. They deliver real-time updates about outages, restoration timelines, and alternative service options-reducing call center traffic during emergencies.",
    },
    {
      id: "are-ai-voice-agents-useful-for-energy-efficiency-programs",
      question: "Are AI voice agents useful for energy efficiency programs?",
      answer: "Absolutely. They share personalized conservation tips, promote rebate programs, and encourage customers to join renewable energy initiatives.",
    },
    {
      id: "how-do-ai-agents-support-gas-and-water-utilities",
      question: "How do AI agents support gas and water utilities?",
      answer: "They automate meter reading schedules, send safety alerts for leaks, and manage service requests-ensuring smooth communication between providers and customers.",
    },
    {
      id: "what-security-measures-protect-customer-data",
      question: "What security measures protect customer data?",
      answer: "OnDial ensures enterprise-grade encryption, compliance with data protection laws, and secure integrations with billing and CRM systems.",
    },
    {
      id: "can-ai-voice-agents-support-multiple-languages",
      question: "Can AI voice agents support multiple languages?",
      answer: "Yes. OnDial’s AI voice agents provide multilingual support, making them suitable for utilities companies operating across diverse regions.",
    },
    {
      id: "do-ai-voice-agents-reduce-call-center-costs",
      question: "Do AI voice agents reduce call center costs?",
      answer: "By automating routine queries and payments, AI agents cut operational costs significantly, enabling human agents to focus on complex cases.",
    },
    {
      id: "how-are-ai-voice-agents-integrated-with-utilities-systems",
      question: "How are AI voice agents integrated with utilities systems?",
      answer: "They connect with billing software, CRM, outage management systems, and communication platforms-ensuring seamless operations and customer updates.",
    },
    {
      id: "can-ai-voice-agents-help-with-renewable-energy-adoption",
      question: "Can AI voice agents help with renewable energy adoption?",
      answer: "Yes, they guide customers through green energy enrollment, provide program details, and encourage sustainable usage.",
    },
    {
      id: "what-makes-ondial-different-from-other-ai-providers",
      question: "What makes OnDial different from other AI providers?",
      answer: "OnDial offers customizable, secure, and globally tested AI voice agents specifically optimized for the utilities industry, ensuring reliability and scalability.",
    },
  ],
  "ai-voice-agents-non-profit-organizations": [
    {
      id: "what-are-ai-voice-agents-for-non-profit-organizations",
      question: "What are AI voice agents for non-profit organizations?",
      answer: "AI voice agents are intelligent voice bots that handle donor calls, event invitations, and fundraising campaigns for NGOs, offering 24/7 multilingual support at lower costs.",
    },
    {
      id: "how-can-ai-voice-agents-improve-fundraising",
      question: "How can AI voice agents improve fundraising?",
      answer: "They automate donor outreach, send personalized reminders, and collect pledges faster-helping nonprofits raise more funds in less time.",
    },
    {
      id: "can-ai-voice-agents-handle-volunteer-recruitment",
      question: "Can AI voice agents handle volunteer recruitment?",
      answer: "Yes, AI bots schedule volunteers, send confirmations, and manage availability updates-saving nonprofits significant administrative time.",
    },
    {
      id: "are-ai-voice-agents-secure-for-donor-communication",
      question: "Are AI voice agents secure for donor communication?",
      answer: "OnDial’s AI voice solutions follow strict data privacy and compliance standards, ensuring donor information is safe and confidential.",
    },
    {
      id: "how-do-ai-voice-agents-support-community-outreach",
      question: "How do AI voice agents support community outreach?",
      answer: "They broadcast local service updates such as food drives, health camps, or awareness programs, ensuring large-scale reach instantly.",
    },
    {
      id: "do-ai-voice-agents-replace-human-staff",
      question: "Do AI voice agents replace human staff?",
      answer: "No, they complement nonprofit teams by handling repetitive communication, freeing staff to focus on strategy and impact-driven initiatives.",
    },
    {
      id: "can-ai-voice-agents-integrate-with-fundraising-software",
      question: "Can AI voice agents integrate with fundraising software?",
      answer: "Yes, OnDial’s AI agents integrate seamlessly with CRM, donation tracking, and event management platforms.",
    },
    {
      id: "what-languages-do-ai-voice-agents-support",
      question: "What languages do AI voice agents support?",
      answer: "They support multiple languages, enabling nonprofits to connect with donors and volunteers worldwide.",
    },
    {
      id: "how-cost-effective-are-ai-voice-agents-for-ngos",
      question: "How cost-effective are AI voice agents for NGOs?",
      answer: "Compared to call centers, AI voice agents significantly reduce operational costs while offering better scalability.",
    },
    {
      id: "why-choose-ondial-over-other-ai-providers",
      question: "Why choose OnDial over other AI providers?",
      answer: "OnDial specializes in AI voice automation for nonprofits, with proven global results, easy deployment, and transparent pricing tailored to NGO budgets.",
    },
  ],
  "ai-voice-agents-transportation-logistics": [
    {
      id: "what-are-ai-voice-agents-in-logistics",
      question: "What are AI voice agents in logistics?",
      answer: "AI voice agents are automated voice systems that handle customer queries, delivery updates, fleet coordination, and compliance tasks in logistics.",
    },
    {
      id: "how-do-ai-voice-agents-improve-customer-experience",
      question: "How do AI voice agents improve customer experience?",
      answer: "They provide real-time delivery notifications, proactive delay alerts, and faster responses-improving trust and transparency.",
    },
    {
      id: "can-ai-voice-agents-reduce-logistics-costs",
      question: "Can AI voice agents reduce logistics costs?",
      answer: "Yes. They automate manual processes, reduce human errors, and optimize operations, cutting costs for logistics providers.",
    },
    {
      id: "do-ai-voice-agents-support-multiple-languages",
      question: "Do AI voice agents support multiple languages?",
      answer: "OnDial’s AI voice agents are multilingual, making them ideal for global logistics companies serving diverse markets.",
    },
    {
      id: "how-do-they-help-with-fleet-management",
      question: "How do they help with fleet management?",
      answer: "AI voice agents manage vehicle scheduling, maintenance reminders, and driver coordination for smoother fleet operations.",
    },
    {
      id: "can-ai-voice-agents-handle-customs-documentation",
      question: "Can AI voice agents handle customs documentation?",
      answer: "Yes. They assist with shipping paperwork, customs clearance, and compliance requirements, reducing delays.",
    },
    {
      id: "are-ai-voice-agents-secure-for-sensitive-logistics-data",
      question: "Are AI voice agents secure for sensitive logistics data?",
      answer: "OnDial ensures enterprise-grade security, encryption, and compliance with data protection standards.",
    },
    {
      id: "how-fast-can-a-logistics-company-deploy-ai-voice-agents",
      question: "How fast can a logistics company deploy AI voice agents?",
      answer: "Deployment is quick, with integration timelines depending on the scale of operations and existing systems.",
    },
    {
      id: "can-small-logistics-companies-use-ai-voice-agents",
      question: "Can small logistics companies use AI voice agents?",
      answer: "Absolutely. AI voice agents are scalable, making them cost-effective for both small and large transportation businesses.",
    },
    {
      id: "what-industries-benefit-most-from-logistics-ai-voice-agents",
      question: "What industries benefit most from logistics AI voice agents?",
      answer: "E-commerce, shipping, freight forwarding, supply chain management, and fleet operators benefit the most.",
    },
  ],
  "ai-voice-agents-manufacturing": [
    {
      id: "what-are-ai-voice-agents-for-manufacturing-services",
      question: "What are AI voice agents for manufacturing services?",
      answer: "They are AI-powered virtual assistants that use natural language to automate tasks like order confirmations, inventory alerts, and compliance updates.",
    },
    {
      id: "how-do-ai-voice-agents-improve-manufacturing-efficiency",
      question: "How do AI voice agents improve manufacturing efficiency?",
      answer: "They eliminate manual communication delays, reduce downtime, and streamline supplier coordination through real-time automation.",
    },
    {
      id: "can-ai-voice-agents-support-multilingual-manufacturing-teams",
      question: "Can AI voice agents support multilingual manufacturing teams?",
      answer: "Yes, OnDial’s AI voice agents support multiple languages, enabling seamless communication across global suppliers and employees.",
    },
    {
      id: "are-ai-voice-agents-secure-for-sensitive-manufacturing-data",
      question: "Are AI voice agents secure for sensitive manufacturing data?",
      answer: "Yes, they use enterprise-grade security, encryption, and compliance protocols to protect operational and supplier data.",
    },
    {
      id: "can-ai-voice-agents-integrate-with-existing-erp-or-mes-systems",
      question: "Can AI voice agents integrate with existing ERP or MES systems?",
      answer: "Absolutely. OnDial AI agents integrate with ERP, MES, and supply chain systems for smooth workflow automation.",
    },
    {
      id: "how-do-ai-voice-agents-help-with-safety-protocols",
      question: "How do AI voice agents help with safety protocols?",
      answer: "They deliver automated reminders, emergency alerts, and incident reporting updates-ensuring workers follow safety standards.",
    },
    {
      id: "what-role-do-ai-voice-agents-play-in-regulatory-compliance",
      question: "What role do AI voice agents play in regulatory compliance?",
      answer: "They provide timely updates on industry standards, certification renewals, and audit notifications, reducing non-compliance risks.",
    },
    {
      id: "are-ai-voice-agents-suitable-for-small-and-medium-sized-factories",
      question: "Are AI voice agents suitable for small and medium-sized factories?",
      answer: "Yes, OnDial’s solutions are scalable, making them cost-effective for SMEs and robust enough for large enterprises.",
    },
    {
      id: "how-do-ai-voice-agents-reduce-downtime-in-manufacturing",
      question: "How do AI voice agents reduce downtime in manufacturing?",
      answer: "They automate maintenance reminders and enable predictive maintenance alerts, preventing equipment failures.",
    },
    {
      id: "what-is-the-future-of-ai-voice-in-manufacturing",
      question: "What is the future of AI voice in manufacturing?",
      answer: "The future lies in IoT and AI integration, where machines and systems communicate through voice AI, driving fully automated smart factories.",
    },
  ],
  "ai-voice-agents-construction": [
    {
      id: "what-are-ai-voice-agents-for-construction-services",
      question: "What are AI voice agents for construction services?",
      answer: "AI voice agents are intelligent voice-powered systems that automate tasks like project updates, permits, safety checks, and material coordination, helping construction companies save time and reduce errors.",
    },
    {
      id: "how-do-ai-voice-assistants-improve-construction-project-management",
      question: "How do AI voice assistants improve construction project management?",
      answer: "They deliver real-time updates, reminders, and notifications, reducing communication delays and keeping contractors, suppliers, and clients aligned throughout the project lifecycle.",
    },
    {
      id: "can-ai-voice-agents-track-building-permits-and-inspections",
      question: "Can AI voice agents track building permits and inspections?",
      answer: "Yes, AI agents automatically notify teams about permit approvals, inspection schedules, and compliance requirements-helping avoid costly delays in approvals.",
    },
    {
      id: "how-do-ai-voice-agents-support-safety-in-construction",
      question: "How do AI voice agents support safety in construction?",
      answer: "They send safety reminders, schedule inspections, and report non-compliance issues instantly, ensuring workers follow safety protocols and reducing accident risks.",
    },
    {
      id: "can-ai-voice-agents-handle-payment-schedules",
      question: "Can AI voice agents handle payment schedules?",
      answer: "Absolutely. AI assistants track payment milestones, send invoice reminders, and notify finance teams-ensuring smooth billing and cash flow management.",
    },
    {
      id: "how-do-ai-agents-manage-material-deliveries",
      question: "How do AI agents manage material deliveries?",
      answer: "They notify site managers about delivery times, confirm arrivals, and coordinate preparation needs to prevent material shortages or delays on-site.",
    },
    {
      id: "do-ai-voice-agents-work-during-weather-related-disruptions",
      question: "Do AI voice agents work during weather-related disruptions?",
      answer: "Yes, they monitor forecasts, adjust schedules, and notify teams of changes, ensuring projects remain flexible despite unpredictable weather.",
    },
    {
      id: "are-ai-voice-agents-customizable-for-construction-companies",
      question: "Are AI voice agents customizable for construction companies?",
      answer: "OnDial provides customizable AI solutions tailored to each company’s needs, from project updates to safety monitoring and global team coordination.",
    },
    {
      id: "can-ai-voice-agents-work-across-global-construction-projects",
      question: "Can AI voice agents work across global construction projects?",
      answer: "Yes, OnDial’s multilingual AI voice agents support teams worldwide, making them ideal for international projects and cross-border collaborations.",
    },
    {
      id: "why-should-construction-companies-choose-ondial-for-ai-voice-agents",
      question: "Why should construction companies choose OnDial for AI voice agents?",
      answer: "OnDial combines industry-specific expertise, secure infrastructure, and proven performance-making it the best AI voice agent company for construction services globally.",
    },
  ],
  "ai-voice-agents-agriculture": [
    {
      id: "what-are-ai-voice-agents-for-agriculture-services",
      question: "What are AI voice agents for agriculture services?",
      answer: "AI voice agents are intelligent assistants that provide farmers with real-time updates on crop management, market prices, loans, and compliance-all through simple voice commands.",
    },
    {
      id: "how-can-ai-voice-agents-help-in-crop-management",
      question: "How can AI voice agents help in crop management?",
      answer: "They give farmers timely alerts on planting, irrigation, harvest schedules, and weather changes, ensuring improved yields and reduced risks.",
    },
    {
      id: "are-ai-voice-agents-useful-for-small-farmers",
      question: "Are AI voice agents useful for small farmers?",
      answer: "Yes, they are designed to be farmer-friendly, affordable, and multilingual, making them valuable even for small-scale and rural farmers worldwide.",
    },
    {
      id: "can-ai-voice-agents-provide-live-market-updates",
      question: "Can AI voice agents provide live market updates?",
      answer: "Yes, they deliver real-time commodity prices, demand trends, and selling opportunities to help farmers make profitable decisions.",
    },
    {
      id: "how-do-ai-voice-agents-support-equipment-maintenance",
      question: "How do AI voice agents support equipment maintenance?",
      answer: "They remind farmers about servicing schedules, seasonal preparation, and preventive checks, reducing costly breakdowns.",
    },
    {
      id: "do-ai-voice-agents-help-with-agricultural-loans-and-insurance",
      question: "Do AI voice agents help with agricultural loans and insurance?",
      answer: "Yes, they send reminders for loan payments, guide farmers through renewal processes, and assist in filing insurance claims.",
    },
    {
      id: "are-ai-voice-agents-secure-for-sensitive-farming-data",
      question: "Are AI voice agents secure for sensitive farming data?",
      answer: "OnDial’s AI systems are built with strong data security and privacy measures, ensuring farmer information remains protected.",
    },
    {
      id: "can-ai-voice-agents-assist-with-government-compliance",
      question: "Can AI voice agents assist with government compliance?",
      answer: "Yes, they update farmers on environmental rules, certification requirements, and regulatory deadlines to ensure smooth compliance.",
    },
    {
      id: "how-do-cooperatives-benefit-from-ai-voice-agents",
      question: "How do cooperatives benefit from AI voice agents?",
      answer: "Cooperatives use them for group purchasing notifications, seed and fertilizer delivery scheduling, and membership updates, improving collaboration.",
    },
    {
      id: "what-is-the-future-of-ai-voice-agents-in-agriculture",
      question: "What is the future of AI voice agents in agriculture?",
      answer: "AI voice agents will drive precision farming, predictive analytics, and sustainable practices, enabling farmers worldwide to boost productivity and profits.",
    },
  ],
};

const INDUSTRY_NAMES: Partial<Record<SiteFaqPageKey, string>> = {
  "ai-voice-agents-healthcare-medical": "Healthcare & medical services",
  "ai-voice-agents-finance-banking": "Finance & banking",
  "ai-voice-agents-real-estate": "Real estate",
  "ai-voice-agents-retail-e-commerce": "Retail & e-commerce",
  "ai-voice-agents-insurance": "Insurance",
  "ai-voice-agents-sales-lead-generation": "Sales & lead generation",
  "ai-voice-agents-call-centers-bpo": "Call centers & BPO",
  "ai-voice-agents-telecommunications": "Telecommunications",
  "ai-voice-agents-automotive": "Automotive",
  "ai-voice-agents-education": "Education",
  "ai-voice-agents-travel-tourism": "Travel & tourism",
  "ai-voice-agents-hospitality": "Hospitality",
  "ai-voice-agents-legal": "Legal",
  "ai-voice-agents-government": "Government",
  "ai-voice-agents-utilities": "Utilities",
  "ai-voice-agents-non-profit-organizations": "Non-profit organizations",
  "ai-voice-agents-transportation-logistics": "Transportation & logistics",
  "ai-voice-agents-manufacturing": "Manufacturing",
  "ai-voice-agents-construction": "Construction",
  "ai-voice-agents-agriculture": "Agriculture",
};

export function getSiteFaqSection(pageKey: SiteFaqPageKey): SiteFaqSection {
  const items = FAQ_ITEMS[pageKey] ?? FAQ_ITEMS.home;
  if (pageKey === "home" || pageKey === "pricing") {
    return { ...HOME_HEADING, items };
  }
  if (pageKey === "about") {
    return { ...ABOUT_HEADING, items };
  }
  const industryName = INDUSTRY_NAMES[pageKey] ?? "your industry";
  return { ...industryHeading(industryName), items };
}

export function hasSiteFaqPage(pageKey: string): pageKey is SiteFaqPageKey {
  return pageKey in FAQ_ITEMS;
}

/** @deprecated Use getSiteFaqSection("home") */
export const HOME_FAQ_HEADING = HOME_HEADING;
/** @deprecated Use getSiteFaqSection("home").items */
export const HOME_FAQS = FAQ_ITEMS.home;
