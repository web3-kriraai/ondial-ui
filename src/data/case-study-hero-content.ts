export type CaseStudyHeroMetricId = "revenue" | "calls" | "answer-rate" | "bookings";

export type CaseStudyHeroMetric = {
  id: CaseStudyHeroMetricId;
  value: string;
  label: string;
  side: "left" | "right";
};

export const CASE_STUDY_HERO_CONTENT = {
  eyebrow: "Case Studies",
  titleLines: ["Real businesses.", "Real conversations.", "Real growth."] as const,
  description:
    "See how teams automate calls, recover missed revenue, and scale customer support with Ondial.",
} as const;

export const CASE_STUDY_HERO_METRICS: readonly CaseStudyHeroMetric[] = [
  { id: "revenue", value: "$3.8M+", label: "Revenue Generated", side: "left" },
  { id: "calls", value: "250K+", label: "Calls Automated", side: "left" },
  { id: "answer-rate", value: "99.9%", label: "Answer Rate", side: "right" },
  { id: "bookings", value: "67%", label: "More Bookings", side: "right" },
] as const;
