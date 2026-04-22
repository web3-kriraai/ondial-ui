import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Car,
  Factory,
  GraduationCap,
  HardHat,
  Heart,
  Hotel,
  Landmark,
  Leaf,
  Phone,
  Plane,
  Scale,
  Shield,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";

/** Card SVG fill palette — must match keys in `service-card` BG_COLOR_MAP. */
const CARD_BG_COLORS = [
  "bg-[#5D57A3]",
  "bg-[#0057C7]",
  "bg-[#6A7036]",
  "bg-[#BA6A36]",
  "bg-[#4A4E69]",
] as const;

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2426&auto=format&fit=crop";

export type Industry = {
  id: number;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  color: string;
  bgColor: string;
  category: string;
  useCases: string[];
};

export const DEFAULT_INDUSTRIES: Industry[] = [
  {
    id: 1,
    name: "Healthcare & Medical",
    slug: "healthcare-and-medical-services",
    icon: Heart,
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab results, and chronic care management. Improve patient engagement and reduce no-shows.",
    color: "from-rose-500 via-pink-500 to-indigo-600",
    bgColor: "from-purple-50 to-indigo-50",
    category: "Health",
    useCases: [
      "Appointment Reminders",
      "Prescription Refills",
      "Lab Results",
      "Chronic Care Management",
    ],
  },
  {
    id: 2,
    name: "Finance & Banking",
    slug: "financial-and-banking-services",
    icon: Building2,
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score alerts, and account notifications.",
    color: "from-purple-600 via-indigo-600 to-indigo-700",
    bgColor: "from-purple-50 to-indigo-50",
    category: "Finance",
    useCases: ["Fraud Alerts", "Payment Reminders", "Credit Score Updates", "Account Notifications"],
  },
  {
    id: 3,
    name: "Real Estate",
    slug: "real-estate-services",
    icon: Building2,
    description:
      "Handle property inquiries, schedule viewings, send market updates, lease renewals, and closing process updates.",
    color: "from-violet-500 via-indigo-500 to-indigo-600",
    bgColor: "from-violet-50 to-indigo-50",
    category: "Property",
    useCases: ["Property Inquiries", "Viewing Scheduling", "Market Updates", "Lease Renewals"],
  },
  {
    id: 4,
    name: "Retail & E-commerce",
    slug: "retail-and-ecommerce-services",
    icon: ShoppingCart,
    description:
      "Recover abandoned carts, send order updates, collect feedback, manage returns, and promote seasonal offers.",
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    bgColor: "from-emerald-50 to-teal-50",
    category: "Retail",
    useCases: ["Cart Recovery", "Order Updates", "Feedback Collection", "Returns Management"],
  },
  {
    id: 5,
    name: "Insurance",
    slug: "insurance-services",
    icon: Shield,
    description: "Automate policy renewals, claim updates, premium alerts, and risk assessments.",
    color: "from-cyan-500 via-indigo-500 to-indigo-600",
    bgColor: "from-cyan-50 to-indigo-50",
    category: "Insurance",
    useCases: ["Policy Renewals", "Claim Updates", "Premium Alerts", "Risk Assessments"],
  },
  {
    id: 6,
    name: "Sales & Lead Generation",
    slug: "sales-and-lead-generation-services",
    icon: TrendingUp,
    description:
      "Qualify leads, schedule appointments, follow up with prospects, and run win-back campaigns.",
    color: "from-orange-500 via-red-500 to-rose-600",
    bgColor: "from-indigo-50 to-indigo-50",
    category: "Sales",
    useCases: [
      "Lead Qualification",
      "Appointment Scheduling",
      "Prospect Follow-up",
      "Win-back Campaigns",
    ],
  },
  {
    id: 7,
    name: "Call Centers & BPO",
    slug: "call-center-and-bpo-services",
    icon: Phone,
    description: "Automate surveys, feedback collection, compliance notifications, and data verification.",
    color: "from-indigo-500 via-indigo-500 to-violet-600",
    bgColor: "from-indigo-50 to-indigo-50",
    category: "BPO",
    useCases: ["Surveys", "Feedback Collection", "Compliance Notifications", "Data Verification"],
  },
  {
    id: 8,
    name: "Telecom",
    slug: "telecommunications-services",
    icon: Phone,
    description:
      "Handle service activations, billing inquiries, technical support, and contract renewals.",
    color: "from-teal-500 via-cyan-500 to-blue-600",
    bgColor: "from-teal-50 to-cyan-50",
    category: "Telecom",
    useCases: ["Service Activation", "Billing Support", "Technical Support", "Contract Renewals"],
  },
  {
    id: 9,
    name: "Automotive",
    slug: "automotive-services",
    icon: Car,
    description:
      "Manage service reminders, warranty extensions, recalls, insurance updates, and financing options.",
    color: "from-slate-600 via-gray-700 to-zinc-800",
    bgColor: "from-slate-50 to-gray-50",
    category: "Automotive",
    useCases: ["Service Reminders", "Warranty Extensions", "Recalls", "Insurance Updates"],
  },
  {
    id: 10,
    name: "Education",
    slug: "education-services",
    icon: GraduationCap,
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni outreach.",
    color: "from-amber-500 via-yellow-500 to-orange-600",
    bgColor: "from-amber-50 to-yellow-50",
    category: "Education",
    useCases: ["Enrollment Confirmations", "Tuition Reminders", "Progress Updates", "Alumni Outreach"],
  },
  {
    id: 11,
    name: "Travel & Tourism",
    slug: "travel-and-tourism-services",
    icon: Plane,
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program updates. Improve traveler satisfaction while reducing manual support.",
    color: "from-sky-500 via-blue-500 to-indigo-600",
    bgColor: "from-sky-50 to-blue-50",
    category: "Travel",
    useCases: ["Booking Confirmations", "Flight Updates", "Check-in Reminders", "Loyalty Programs"],
  },
  {
    id: 12,
    name: "Hospitality Services",
    slug: "hospitality-services",
    icon: Hotel,
    description:
      "Streamline reservation confirmations, concierge services, check-in procedures, feedback collection, and loyalty benefits. Deliver a seamless guest experience.",
    color: "from-pink-500 via-rose-500 to-red-600",
    bgColor: "from-sky-50 to-blue-50",
    category: "Hospitality",
    useCases: [
      "Reservation Confirmations",
      "Concierge Services",
      "Check-in Procedures",
      "Loyalty Benefits",
    ],
  },
  {
    id: 13,
    name: "Legal Services",
    slug: "legal-services",
    icon: Scale,
    description:
      "Send case updates, appointment reminders, document notifications, and compliance deadlines. Enhance client communication with timely, professional AI calls.",
    color: "from-amber-500 via-yellow-500 to-orange-600",
    bgColor: "from-slate-50 to-gray-50",
    category: "Legal",
    useCases: [
      "Case Updates",
      "Appointment Reminders",
      "Document Notifications",
      "Compliance Deadlines",
    ],
  },
  {
    id: 14,
    name: "Government Services",
    slug: "government-services",
    icon: Landmark,
    description:
      "Manage application status updates, tax notifications, renewal reminders, compliance monitoring, and citizen surveys. Improve public service efficiency.",
    color: "from-slate-600 via-gray-700 to-zinc-800",
    bgColor: "from-slate-50 to-gray-50",
    category: "Government",
    useCases: ["Application Updates", "Tax Notifications", "Renewal Reminders", "Citizen Surveys"],
  },
  {
    id: 15,
    name: "Utilities",
    slug: "utilities-services",
    icon: Zap,
    description:
      "Automate bill reminders, outage updates, meter reading appointments, and energy efficiency tips. Improve billing transparency and customer trust.",
    color: "from-yellow-400 via-orange-500 to-red-500",
    bgColor: "from-blue-50 to-indigo-50",
    category: "Utilities",
    useCases: ["Bill Reminders", "Outage Updates", "Meter Readings", "Energy Tips"],
  },
  {
    id: 16,
    name: "Non-Profit Organizations",
    slug: "non-profit-organizations-services",
    icon: Users,
    description:
      "Run donation campaigns, volunteer recruitment, event invitations, grant notifications, and donor thank-you calls. Strengthen community relationships with AI outreach.",
    color: "from-green-600 via-emerald-600 to-teal-700",
    bgColor: "from-green-50 to-emerald-50",
    category: "Non-Profit",
    useCases: [
      "Donation Campaigns",
      "Volunteer Recruitment",
      "Event Invitations",
      "Grant Notifications",
    ],
  },
  {
    id: 17,
    name: "Transportation & Logistics",
    slug: "transportation-and-logistics-services",
    icon: Truck,
    description:
      "Provide delivery updates, delay notifications, documentation requirements, rate quotes, and compliance reminders. Optimize supply chain communication.",
    color: "from-blue-500 via-indigo-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    category: "Logistics",
    useCases: ["Delivery Updates", "Delay Notifications", "Documentation", "Rate Quotes"],
  },
  {
    id: 18,
    name: "Manufacturing",
    slug: "manufacturing-services",
    icon: Factory,
    description:
      "Automate order confirmations, quality updates, maintenance schedules, safety protocols, and supplier coordination. Ensure smooth production workflows.",
    color: "from-gray-500 via-slate-600 to-zinc-700",
    bgColor: "from-gray-50 to-slate-50",
    category: "Manufacturing",
    useCases: ["Order Confirmations", "Quality Updates", "Maintenance Schedules", "Safety Protocols"],
  },
  {
    id: 19,
    name: "Construction",
    slug: "construction-services",
    icon: HardHat,
    description:
      "Send project updates, permit status, material delivery schedules, safety inspections, and payment milestones. Improve communication with contractors and clients.",
    color: "from-orange-600 via-red-600 to-rose-700",
    bgColor: "from-green-50 to-lime-50",
    category: "Construction",
    useCases: ["Project Updates", "Permit Status", "Material Deliveries", "Safety Inspections"],
  },
  {
    id: 20,
    name: "Agriculture",
    slug: "agriculture-services",
    icon: Leaf,
    description:
      "Enable crop management alerts, market updates, insurance claims, loan reminders, and equipment maintenance scheduling. Empower farmers with real-time updates.",
    color: "from-green-500 via-lime-500 to-emerald-600",
    bgColor: "from-green-50 to-lime-50",
    category: "Agriculture",
    useCases: ["Crop Management", "Market Updates", "Insurance Claims", "Equipment Maintenance"],
  },
];

export const SERVICES_DATA = DEFAULT_INDUSTRIES.map((industry, index) => ({
  id: industry.id,
  title: industry.name,
  description: industry.description,
  image: PLACEHOLDER_IMAGE,
  bgColor: CARD_BG_COLORS[index % CARD_BG_COLORS.length],
  link: `/industries/${industry.slug}`,
}));
