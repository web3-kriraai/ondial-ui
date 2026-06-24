export const RETURN_POLICY_META = {
  eyebrow: "Legal",
  title: "Return Policy",
  intro:
    "At OnDial, we value your trust and aim to provide the best possible experience with our AI-powered services. Our Return & Refund Policy is designed to ensure transparency, fairness, and customer satisfaction. Please read the following terms carefully before making a purchase.",
} as const;

export type ReturnPolicySection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  lead?: string;
  bullets?: readonly string[];
  footer?: string;
};

export const RETURN_POLICY_SECTIONS: readonly ReturnPolicySection[] = [
  {
    id: "return-policy",
    title: "Return Policy",
    paragraphs: [
      "Since OnDial offers digital AI-based services, returns of intangible products (such as software, credits, subscriptions, or digital solutions) are not applicable.",
      "However, if you face any technical issues, service-related problems, or accidental billing errors, you may request a resolution through our customer support team within 7 days of purchase.",
      "Each request is carefully reviewed, and we strive to resolve issues promptly and fairly.",
    ],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    lead: "Refunds are only applicable under the following conditions:",
    bullets: [
      "Duplicate Payments – If you are charged twice accidentally.",
      "Service Not Delivered – In case the AI service is not activated or delivered due to a technical error.",
      "System Errors – If a technical glitch causes service disruption and the issue cannot be resolved.",
    ],
    footer:
      "Refunds will be processed back to your original payment method within 7-10 business days after approval.",
  },
  {
    id: "cancellation-policy",
    title: "Cancellation Policy",
    lead: "Subscription Services:",
    bullets: [
      "You may cancel your subscription at any time via your account dashboard or by contacting our support team.",
      "Once cancelled, your plan will remain active until the end of the current billing cycle. No partial refunds are provided for unused days.",
    ],
    footer: "One-Time Purchases: Digital products or credits are non-refundable once delivered.",
  },
] as const;

export const RETURN_POLICY_CONTACT = {
  title: "Customer Support & Contact",
  description:
    "If you have any concerns regarding returns, refunds, or cancellations, please contact us:",
  email: "support@ondial.ai",
  website: "https://www.ondial.ai",
  websiteLabel: "ondial.ai",
  responseTime: "Within 24–48 business hours",
  closing:
    "Our support team is always ready to assist you with your queries.",
} as const;
