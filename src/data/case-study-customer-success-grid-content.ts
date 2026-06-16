export type CustomerSuccessStoryId =
  | "horizon-realty"
  | "riverside-clinic"
  | "summit-hvac"
  | "flowright-plumbing"
  | "northstar-insurance"
  | "hartwell-legal";

export type CustomerSuccessStory = {
  id: CustomerSuccessStoryId;
  company: string;
  initials: string;
  industry: string;
  mainResult: { value: string; label: string };
  supportingMetrics: readonly [
    { value: string; label: string },
    { value: string; label: string },
  ];
  description: string;
  href: string;
};

export const CUSTOMER_SUCCESS_GRID_HEADING = {
  eyebrow: "Customer success",
  title: "Results that speak for themselves",
  description:
    "Six teams across industries — same outcome: more answered calls, more booked revenue, and less strain on staff.",
} as const;

export const CUSTOMER_SUCCESS_STORIES: readonly CustomerSuccessStory[] = [
  {
    id: "horizon-realty",
    company: "Horizon Realty Group",
    initials: "HR",
    industry: "Real Estate",
    mainResult: { value: "+67%", label: "Bookings" },
    supportingMetrics: [
      { value: "98%", label: "Answer Rate" },
      { value: "$120K", label: "Revenue Added" },
    ],
    description:
      "Inbound buyers are qualified in real time, preferences captured, and viewings scheduled — with hot leads routed instantly to agents.",
    href: "/case-studies#horizon-realty",
  },
  {
    id: "riverside-clinic",
    company: "Riverside Family Clinic",
    initials: "RF",
    industry: "Healthcare",
    mainResult: { value: "85%", label: "Fewer Missed Calls" },
    supportingMetrics: [
      { value: "92%", label: "Caller Satisfaction" },
      { value: "30s", label: "Avg. Wait Time" },
    ],
    description:
      "Appointment scheduling, insurance triage, and callback routing run around the clock while staff focus on in-person care.",
    href: "/case-studies#riverside-clinic",
  },
  {
    id: "summit-hvac",
    company: "Summit Climate Services",
    initials: "SC",
    industry: "HVAC",
    mainResult: { value: "+40%", label: "Service Bookings" },
    supportingMetrics: [
      { value: "100%", label: "After-hours Capture" },
      { value: "24/7", label: "Dispatch Coverage" },
    ],
    description:
      "AI agents triage emergency vs routine calls, capture equipment details, and schedule technicians directly into the field calendar.",
    href: "/case-studies#summit-hvac",
  },
  {
    id: "flowright-plumbing",
    company: "FlowRight Plumbing Group",
    initials: "FP",
    industry: "Plumbing",
    mainResult: { value: "8s", label: "Avg. Answer Time" },
    supportingMetrics: [
      { value: "99%", label: "Emergency Capture" },
      { value: "+52%", label: "Jobs Booked" },
    ],
    description:
      "OnDial qualifies urgency, captures address and issue type, and dispatches the nearest crew — even at 2 AM on weekends.",
    href: "/case-studies#flowright-plumbing",
  },
  {
    id: "northstar-insurance",
    company: "Northstar Insurance Partners",
    initials: "NI",
    industry: "Insurance",
    mainResult: { value: "2.4×", label: "Qualified Leads" },
    supportingMetrics: [
      { value: "12", label: "Product Lines" },
      { value: "$340K", label: "Pipeline Added" },
    ],
    description:
      "Voice agents capture policy interest, coverage needs, and contact details — routing only sales-ready prospects to agents.",
    href: "/case-studies#northstar-insurance",
  },
  {
    id: "hartwell-legal",
    company: "Hartwell & Associates",
    initials: "HA",
    industry: "Legal",
    mainResult: { value: "3×", label: "Intake Consults" },
    supportingMetrics: [
      { value: "97%", label: "Answer Rate" },
      { value: "+61%", label: "After-hours Leads" },
    ],
    description:
      "Prospective clients get immediate responses on practice areas, fees, and availability — with consults booked before competitors call back.",
    href: "/case-studies#hartwell-legal",
  },
] as const;
