import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Car,
  Factory,
  GraduationCap,
  Heart,
  Hotel,
  Landmark,
  Phone,
  Plane,
  Scale,
  Shield,
  ShoppingCart,
  Truck,
  Users,
  CalendarDays,
  Brain,
  Pill,
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
    name: "AI Voice Agents for Healthcare & Medical",
    slug: "healthcare-and-medical-services",
    icon: Heart,
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab result notifications, and chronic care management. Improve patient engagement and reduce no-shows.",
  },
  {
    id: 2,
    name: "AI Voice Agents for Insurance",
    slug: "insurance-services",
    icon: Shield,
    description:
      "Automate policy renewals, claim status updates, premium reminders, and risk assessment notifications. Improve customer trust and response times.",
  },
  {
    id: 3,
    name: "AI Voice Agents for Finance & Banking",
    slug: "financial-and-banking-services",
    icon: Building2,
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score notifications, and account activity updates. Enhance customer security and financial communication.",
  },
  {
    id: 4,
    name: "AI Voice Agents for Real Estate",
    slug: "real-estate-services",
    icon: Building2,
    description:
      "Manage property inquiries, schedule site visits, share market updates, handle lease renewals, and streamline closing process communication.",
  },
  {
    id: 5,
    name: "AI Voice Agents for Call Centers & BPO",
    slug: "call-center-and-bpo-services",
    icon: Phone,
    description:
      "Automate customer surveys, feedback collection, compliance notifications, and data verification processes. Improve operational efficiency and service quality.",
  },
  {
    id: 6,
    name: "AI Voice Agents for Travel & Tourism",
    slug: "travel-and-tourism-services",
    icon: Plane,
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program notifications. Enhance traveler experience with real-time communication.",
  },
  {
    id: 7,
    name: "AI Voice Agents for Transportation & Logistics",
    slug: "transportation-and-logistics-services",
    icon: Truck,
    description:
      "Provide delivery tracking updates, delay notifications, documentation reminders, rate quotations, and compliance alerts. Optimize supply chain communication.",
  },
  {
    id: 8,
    name: "AI Voice Agents for Retail & E-commerce",
    slug: "retail-and-ecommerce-services",
    icon: ShoppingCart,
    description:
      "Recover abandoned carts, send order and delivery updates, collect customer feedback, manage returns, and promote seasonal offers with AI-powered outreach.",
  },
  {
    id: 9,
    name: "AI Voice Agents for Telecommunications",
    slug: "telecommunications-services",
    icon: Phone,
    description:
      "Handle service activations, billing support, technical assistance, and contract renewal reminders. Deliver faster customer communication and support.",
  },
  {
    id: 10,
    name: "AI Voice Agents for Automotive",
    slug: "automotive-services",
    icon: Car,
    description:
      "Manage service reminders, warranty extensions, recall notifications, insurance updates, and financing assistance. Keep customers informed throughout the ownership journey.",
  },
  {
    id: 11,
    name: "AI Voice Agents for Education",
    slug: "education-services",
    icon: GraduationCap,
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni engagement campaigns. Improve communication across the education lifecycle.",
  },
  {
    id: 12,
    name: "AI Voice Agents for Hospitality",
    slug: "hospitality-services",
    icon: Hotel,
    description:
      "Streamline reservation confirmations, concierge assistance, check-in coordination, guest feedback collection, and loyalty program communication.",
  },
  {
    id: 13,
    name: "AI Voice Agents for Legal",
    slug: "legal-services",
    icon: Scale,
    description:
      "Send case progress updates, appointment reminders, document notifications, and compliance deadline alerts. Deliver secure and professional client communication.",
  },
  {
    id: 14,
    name: "AI Voice Agents for Government",
    slug: "government-services",
    icon: Landmark,
    description:
      "Manage application status updates, tax reminders, license renewals, compliance notifications, and citizen engagement surveys. Improve public service efficiency.",
  },
  {
    id: 15,
    name: "AI Voice Agents for Manufacturing",
    slug: "manufacturing-services",
    icon: Factory,
    description:
      "Automate production updates, quality assurance notifications, maintenance schedules, safety alerts, and supplier coordination workflows.",
  },
  {
    id: 16,
    name: "AI Voice Agents for Non-Profit Organizations",
    slug: "non-profit-organizations-services",
    icon: Users,
    description:
      "Run donation campaigns, recruit volunteers, send event invitations, share grant updates, and automate donor appreciation calls. Strengthen community engagement.",
  },
  {
    id: 17,
    name: "AI Voice Agents for Event Management",
    slug: "event-management-services",
    icon: CalendarDays,
    description:
      "Coordinate event registrations, send booking confirmations, manage attendee queries, and automate post-event feedback collection.",
  },
  {
    id: 18,
    name: "AI Voice Agents for Consultation",
    slug: "consulting-services",
    icon: Brain,
    description:
      "Schedule advisory sessions, automate appointment follow-ups, gather client pre-intake information, and streamline advisory communication.",
  },
  {
    id: 19,
    name: "AI Voice Agents for Pharmaceuticals",
    slug: "pharmaceutical-services",
    icon: Pill,
    description:
      "Handle prescription order updates, automate delivery notifications, share medical guidelines, and support pharmacy customer inquiries.",
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
