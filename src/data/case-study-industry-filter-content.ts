export type CaseStudyIndustryId =
  | "all"
  | "hvac"
  | "plumbing"
  | "healthcare"
  | "insurance"
  | "legal"
  | "real-estate";

export type CaseStudyCard = {
  id: string;
  industry: Exclude<CaseStudyIndustryId, "all">;
  industryLabel: string;
  company: string;
  headline: string;
  metric: { value: string; label: string };
  summary: string;
  readTime: string;
  location: string;
};

export const CASE_STUDY_FILTER_HEADING = {
  eyebrow: "Browse by industry",
  title: "Stories from teams like yours",
  description:
    "Filter by vertical to see how OnDial handles calls, qualifies leads, and recovers revenue in your industry.",
} as const;

export const CASE_STUDY_INDUSTRY_FILTERS: readonly { id: CaseStudyIndustryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hvac", label: "HVAC" },
  { id: "plumbing", label: "Plumbing" },
  { id: "healthcare", label: "Healthcare" },
  { id: "insurance", label: "Insurance" },
  { id: "legal", label: "Legal" },
  { id: "real-estate", label: "Real Estate" },
] as const;

export const CASE_STUDY_CARDS: readonly CaseStudyCard[] = [
  {
    id: "hvac-summit",
    industry: "hvac",
    industryLabel: "HVAC",
    company: "Summit Climate Services",
    headline: "40% more service calls booked without adding dispatch staff",
    metric: { value: "+40%", label: "Service bookings" },
    summary:
      "AI agents triage emergency vs routine calls, capture equipment details, and schedule technicians directly into the field calendar.",
    readTime: "4 min read",
    location: "Denver, CO",
  },
  {
    id: "hvac-proair",
    industry: "hvac",
    industryLabel: "HVAC",
    company: "ProAir Mechanical",
    headline: "After-hours maintenance requests captured 100% of the time",
    metric: { value: "100%", label: "After-hours capture" },
    summary:
      "Seasonal demand spikes no longer mean voicemail. Every caller gets instant answers on pricing, availability, and next steps.",
    readTime: "3 min read",
    location: "Phoenix, AZ",
  },
  {
    id: "plumbing-flow",
    industry: "plumbing",
    industryLabel: "Plumbing",
    company: "FlowRight Plumbing Group",
    headline: "Emergency calls answered in under 8 seconds, 24/7",
    metric: { value: "8s", label: "Avg. answer time" },
    summary:
      "OnDial qualifies urgency, captures address and issue type, and dispatches the nearest crew — even at 2 AM on weekends.",
    readTime: "3 min read",
    location: "Dallas, TX",
  },
  {
    id: "healthcare-riverside",
    industry: "healthcare",
    industryLabel: "Healthcare",
    company: "Riverside Family Clinic",
    headline: "Missed patient calls dropped 85% in six weeks",
    metric: { value: "85%", label: "Fewer missed calls" },
    summary:
      "Appointment scheduling, insurance triage, and callback routing run around the clock while staff focus on in-person care.",
    readTime: "4 min read",
    location: "Portland, OR",
  },
  {
    id: "insurance-northstar",
    industry: "insurance",
    industryLabel: "Insurance",
    company: "Northstar Insurance Partners",
    headline: "Lead qualification automated across 12 product lines",
    metric: { value: "2.4x", label: "Qualified leads" },
    summary:
      "Voice agents capture policy interest, coverage needs, and contact details — routing only sales-ready prospects to agents.",
    readTime: "4 min read",
    location: "Chicago, IL",
  },
  {
    id: "legal-hartwell",
    industry: "legal",
    industryLabel: "Legal",
    company: "Hartwell & Associates",
    headline: "3× more intake consults booked after business hours",
    metric: { value: "3×", label: "Intake consults" },
    summary:
      "Prospective clients get immediate responses on practice areas, fees, and availability — with consults booked before competitors call back.",
    readTime: "5 min read",
    location: "Atlanta, GA",
  },
  {
    id: "real-estate-horizon",
    industry: "real-estate",
    industryLabel: "Real Estate",
    company: "Horizon Realty Group",
    headline: "3× more leads handled without adding headcount",
    metric: { value: "3×", label: "Lead volume" },
    summary:
      "Inbound buyers are qualified in real time, preferences captured, and viewings scheduled — with hot leads routed instantly to agents.",
    readTime: "3 min read",
    location: "Miami, FL",
  },
  {
    id: "real-estate-urban",
    industry: "real-estate",
    industryLabel: "Real Estate",
    company: "Urban Key Properties",
    headline: "Weekend lead capture hit 100% for the first time",
    metric: { value: "41%", label: "Higher conversion" },
    summary:
      "Every weekend inquiry gets a human-like conversation within seconds, keeping buyers engaged until an agent is available.",
    readTime: "3 min read",
    location: "Austin, TX",
  },
] as const;
