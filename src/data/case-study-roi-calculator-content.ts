export const ROI_CALCULATOR_HEADING = {
  eyebrow: "ROI calculator",
  title: "Quantify the cost of missed calls",
  description:
    "Model your revenue at risk and the opportunity OnDial can recover — adjust the sliders to match your business.",
} as const;

/** Share of lost pipeline typically recoverable with 24/7 AI call handling. */
export const ROI_RECOVERY_RATE = 0.85;

export const ROI_INPUTS = {
  missedCalls: {
    id: "missed-calls",
    label: "Monthly Missed Calls",
    hint: "Calls that ring out or go to voicemail",
    min: 1,
    max: 500,
    step: 5,
    default: 85,
  },
  jobValue: {
    id: "job-value",
    label: "Average Job Value",
    hint: "Typical revenue per closed deal",
    min: 100,
    max: 25_000,
    step: 100,
    default: 2_500,
  },
  closeRate: {
    id: "close-rate",
    label: "Close Rate",
    hint: "% of qualified leads that convert",
    min: 5,
    max: 80,
    step: 1,
    default: 35,
    suffix: "%",
  },
} as const;

export const ROI_RESULTS = [
  {
    id: "potential-lost",
    label: "Potential Revenue Lost",
    description: "Monthly pipeline walking out the door",
    emphasis: false,
  },
  {
    id: "monthly-recovery",
    label: "Monthly Revenue Recovery",
    description: "Estimated capture with OnDial",
    emphasis: true,
  },
  {
    id: "annual-opportunity",
    label: "Annual Revenue Opportunity",
    description: "12-month upside at current volume",
    emphasis: false,
  },
] as const;

export function computeRoiResults(
  missedCalls: number,
  jobValue: number,
  closeRate: number,
) {
  const potentialRevenueLost =
    missedCalls * jobValue * (closeRate / 100);
  const monthlyRevenueRecovery =
    potentialRevenueLost * ROI_RECOVERY_RATE;
  const annualRevenueOpportunity = monthlyRevenueRecovery * 12;

  return {
    potentialRevenueLost,
    monthlyRevenueRecovery,
    annualRevenueOpportunity,
  };
}
