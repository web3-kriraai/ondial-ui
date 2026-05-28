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

/** Matte card fills — shared by service cards and marketing carousel. */
export const SERVICE_MATTE_COLORS = [
  "#5D57A3",
  "#0057C7",
  "#6A7036",
  "#BA6A36",
  "#4A4E69",
] as const;

/** Tailwind classes for service cards — must match keys in `service-card` BG_COLOR_MAP. */
const CARD_BG_COLORS = SERVICE_MATTE_COLORS.map(
  (hex) => `bg-[${hex}]`,
) as [
  "bg-[#5D57A3]",
  "bg-[#0057C7]",
  "bg-[#6A7036]",
  "bg-[#BA6A36]",
  "bg-[#4A4E69]",
];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2426&auto=format&fit=crop";

export type Industry = {
  id: number;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
};

export const DEFAULT_INDUSTRIES: Industry[] = [
  {
    id: 1,
    name: "Healthcare & Medical",
    slug: "healthcare-and-medical-services",
    icon: Heart,
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab result notifications, and chronic care management. Improve patient engagement and reduce no-shows.",
  },
  {
    id: 2,
    name: "Finance & Banking",
    slug: "financial-and-banking-services",
    icon: Building2,
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score notifications, and account activity updates. Enhance customer security and financial communication.",
  },
  {
    id: 3,
    name: "Real Estate",
    slug: "real-estate-services",
    icon: Building2,
    description:
      "Manage property inquiries, schedule site visits, share market updates, handle lease renewals, and streamline closing process communication.",
  },
  {
    id: 4,
    name: "Retail & E-commerce",
    slug: "retail-and-ecommerce-services",
    icon: ShoppingCart,
    description:
      "Recover abandoned carts, send order and delivery updates, collect customer feedback, manage returns, and promote seasonal offers with AI-powered outreach.",
  },
  {
    id: 5,
    name: "Insurance",
    slug: "insurance-services",
    icon: Shield,
    description:
      "Automate policy renewals, claim status updates, premium reminders, and risk assessment notifications. Improve customer trust and response times.",
  },
  {
    id: 6,
    name: "Sales & Lead Generation",
    slug: "sales-and-lead-generation-services",
    icon: TrendingUp,
    description:
      "Qualify leads, schedule appointments, follow up with prospects, and launch win-back campaigns. Increase conversions with automated engagement.",
  },
  {
    id: 7,
    name: "Call Centers & BPO",
    slug: "call-center-and-bpo-services",
    icon: Phone,
    description:
      "Automate customer surveys, feedback collection, compliance notifications, and data verification processes. Improve operational efficiency and service quality.",
  },
  {
    id: 8,
    name: "Telecom",
    slug: "telecommunications-services",
    icon: Phone,
    description:
      "Handle service activations, billing support, technical assistance, and contract renewal reminders. Deliver faster customer communication and support.",
  },
  {
    id: 9,
    name: "Automotive",
    slug: "automotive-services",
    icon: Car,
    description:
      "Manage service reminders, warranty extensions, recall notifications, insurance updates, and financing assistance. Keep customers informed throughout the ownership journey.",
  },
  {
    id: 10,
    name: "Education",
    slug: "education-services",
    icon: GraduationCap,
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni engagement campaigns. Improve communication across the education lifecycle.",
  },
  {
    id: 11,
    name: "Travel & Tourism",
    slug: "travel-and-tourism-services",
    icon: Plane,
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program notifications. Enhance traveler experience with real-time communication.",
  },
  {
    id: 12,
    name: "Hospitality Services",
    slug: "hospitality-services",
    icon: Hotel,
    description:
      "Streamline reservation confirmations, concierge assistance, check-in coordination, guest feedback collection, and loyalty program communication.",
  },
  {
    id: 13,
    name: "Legal Services",
    slug: "legal-services",
    icon: Scale,
    description:
      "Send case progress updates, appointment reminders, document notifications, and compliance deadline alerts. Deliver secure and professional client communication.",
  },
  {
    id: 14,
    name: "Government Services",
    slug: "government-services",
    icon: Landmark,
    description:
      "Manage application status updates, tax reminders, license renewals, compliance notifications, and citizen engagement surveys. Improve public service efficiency.",
  },
  {
    id: 15,
    name: "Utilities",
    slug: "utilities-services",
    icon: Zap,
    description:
      "Automate bill reminders, outage notifications, meter reading appointments, and energy-saving recommendations. Improve customer trust and service transparency.",
  },
  {
    id: 16,
    name: "Non-Profit Organizations",
    slug: "non-profit-organizations-services",
    icon: Users,
    description:
      "Run donation campaigns, recruit volunteers, send event invitations, share grant updates, and automate donor appreciation calls. Strengthen community engagement.",
  },
  {
    id: 17,
    name: "Transportation & Logistics",
    slug: "transportation-and-logistics-services",
    icon: Truck,
    description:
      "Provide delivery tracking updates, delay notifications, documentation reminders, rate quotations, and compliance alerts. Optimize supply chain communication.",
  },
  {
    id: 18,
    name: "Manufacturing",
    slug: "manufacturing-services",
    icon: Factory,
    description:
      "Automate production updates, quality assurance notifications, maintenance schedules, safety alerts, and supplier coordination workflows.",
  },
  {
    id: 19,
    name: "Construction",
    slug: "construction-services",
    icon: HardHat,
    description:
      "Send project progress updates, permit notifications, material delivery schedules, safety inspection reminders, and payment milestone alerts.",
  },
  {
    id: 20,
    name: "Agriculture",
    slug: "agriculture-services",
    icon: Leaf,
    description:
      "Enable crop management alerts, market updates, insurance claims, loan reminders, and equipment maintenance scheduling. Empower farmers with real-time updates.",
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
