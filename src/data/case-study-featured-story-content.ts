export const FEATURED_SUCCESS_STORY = {
  eyebrow: "Featured Success Story",
  company: {
    name: "Horizon Table",
    logoInitials: "HT",
    industry: "Hospitality",
    location: "Austin, TX · 18 locations",
  },
  primaryMetric: {
    value: "+72%",
    label: "Bookings Increased",
  },
  secondaryMetrics: [
    { value: "98%", label: "Calls Answered" },
    { value: "2.9x", label: "ROI" },
    { value: "24/7", label: "Bookings from Ondial" },
    { value: "100+", label: "Languages Supported" },
  ],
  quote: "Since implementing Ondial, our booking rates skyrocketed and it quickly became our highest-performing source of new business.",
  author: {
    name: "Elena Vasquez",
    role: "CEO, Horizon Table Restaurant Group",
    initials: "EV",
  },
  beforeAfter: {
    beforeLabel: "Before OnDial",
    afterLabel: "After OnDial",
    beforeValue: 34,
    afterValue: 89,
    metric: "Booking conversion",
  },
  revenueChart: {
    title: "Revenue growth",
    period: "Last 6 months",
    points: [
      { month: "Jan", value: 42 },
      { month: "Feb", value: 48 },
      { month: "Mar", value: 55 },
      { month: "Apr", value: 63 },
      { month: "May", value: 74 },
      { month: "Jun", value: 89 },
    ],
  },
} as const;
