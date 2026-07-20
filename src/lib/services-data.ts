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
  Zap,
  HardHat,
  Sprout,
  TrendingUp,
} from "lucide-react";

/** Matte card fills - shared by service cards and marketing carousel. */
export const SERVICE_MATTE_COLORS = [
  "#5D57A3",
  "#0057C7",
  "#6A7036",
  "#BA6A36",
  "#4A4E69",
] as const;

/** Tailwind classes for service cards - must match keys in `service-card` BG_COLOR_MAP. */
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
    slug: "ai-voice-agents-healthcare-medical",
    icon: Heart,
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab result notifications, and chronic care management. Improve patient engagement and reduce no-shows.",
  },
  {
    id: 2,
    name: "AI Voice Agents for Insurance",
    slug: "ai-voice-agents-insurance",
    icon: Shield,
    description:
      "Automate policy renewals, claim status updates, premium reminders, and risk assessment notifications. Improve customer trust and response times.",
  },
  {
    id: 3,
    name: "AI Voice Agents for Finance & Banking",
    slug: "ai-voice-agents-finance-banking",
    icon: Building2,
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score notifications, and account activity updates. Enhance customer security and financial communication.",
  },
  {
    id: 4,
    name: "AI Voice Agents for Real Estate",
    slug: "ai-voice-agents-real-estate",
    icon: Building2,
    description:
      "Manage property inquiries, schedule site visits, share market updates, handle lease renewals, and streamline closing process communication.",
  },
  {
    id: 5,
    name: "AI Voice Agents for Call Centers & BPO",
    slug: "ai-voice-agents-call-centers-bpo",
    icon: Phone,
    description:
      "Automate customer surveys, feedback collection, compliance notifications, and data verification processes. Improve operational efficiency and service quality.",
  },
  {
    id: 6,
    name: "AI Voice Agents for Travel & Tourism",
    slug: "ai-voice-agents-travel-tourism",
    icon: Plane,
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program notifications. Enhance traveler experience with real-time communication.",
  },
  {
    id: 7,
    name: "AI Voice Agents for Transportation & Logistics",
    slug: "ai-voice-agents-transportation-logistics",
    icon: Truck,
    description:
      "Provide delivery tracking updates, delay notifications, documentation reminders, rate quotations, and compliance alerts. Optimize supply chain communication.",
  },
  {
    id: 8,
    name: "AI Voice Agents for Retail & E-commerce",
    slug: "ai-voice-agents-retail-e-commerce",
    icon: ShoppingCart,
    description:
      "Recover abandoned carts, send order and delivery updates, collect customer feedback, manage returns, and promote seasonal offers with AI-powered outreach.",
  },
  {
    id: 9,
    name: "AI Voice Agents for Telecommunications",
    slug: "ai-voice-agents-telecommunications",
    icon: Phone,
    description:
      "Handle service activations, billing support, technical assistance, and contract renewal reminders. Deliver faster customer communication and support.",
  },
  {
    id: 10,
    name: "AI Voice Agents for Automotive",
    slug: "ai-voice-agents-automotive",
    icon: Car,
    description:
      "Manage service reminders, warranty extensions, recall notifications, insurance updates, and financing assistance. Keep customers informed throughout the ownership journey.",
  },
  {
    id: 11,
    name: "AI Voice Agents for Education",
    slug: "ai-voice-agents-education",
    icon: GraduationCap,
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni engagement campaigns. Improve communication across the education lifecycle.",
  },
  {
    id: 12,
    name: "AI Voice Agents for Hospitality",
    slug: "ai-voice-agents-hospitality",
    icon: Hotel,
    description:
      "Streamline reservation confirmations, concierge assistance, check-in coordination, guest feedback collection, and loyalty program communication.",
  },
  {
    id: 13,
    name: "AI Voice Agents for Legal",
    slug: "ai-voice-agents-legal",
    icon: Scale,
    description:
      "Send case progress updates, appointment reminders, document notifications, and compliance deadline alerts. Deliver secure and professional client communication.",
  },
  {
    id: 14,
    name: "AI Voice Agents for Government",
    slug: "ai-voice-agents-government",
    icon: Landmark,
    description:
      "Manage application status updates, tax reminders, license renewals, compliance notifications, and citizen engagement surveys. Improve public service efficiency.",
  },
  {
    id: 15,
    name: "AI Voice Agents for Manufacturing",
    slug: "ai-voice-agents-manufacturing",
    icon: Factory,
    description:
      "Automate production updates, quality assurance notifications, maintenance schedules, safety alerts, and supplier coordination workflows.",
  },
  {
    id: 16,
    name: "AI Voice Agents for Non-Profit Organizations",
    slug: "ai-voice-agents-non-profit-organizations",
    icon: Users,
    description:
      "Run donation campaigns, recruit volunteers, send event invitations, share grant updates, and automate donor appreciation calls. Strengthen community engagement.",
  },
  {
    id: 17,
    name: "AI Voice Agents for Event Management",
    slug: "ai-voice-agents-event-management",
    icon: CalendarDays,
    description:
      "Coordinate event registrations, send booking confirmations, manage attendee queries, and automate post-event feedback collection.",
  },
  {
    id: 18,
    name: "AI Voice Agents for Consultation",
    slug: "ai-voice-agents-consulting",
    icon: Brain,
    description:
      "Schedule advisory sessions, automate appointment follow-ups, gather client pre-intake information, and streamline advisory communication.",
  },
  {
    id: 19,
    name: "AI Voice Agents for Pharmaceuticals",
    slug: "ai-voice-agents-pharmaceuticals",
    icon: Pill,
    description:
      "Handle prescription order updates, automate delivery notifications, share medical guidelines, and support pharmacy customer inquiries.",
  },
  {
    id: 20,
    name: "AI Voice Agents for Sales & Lead Generation",
    slug: "ai-voice-agents-sales-lead-generation",
    icon: TrendingUp,
    description:
      "Automate outbound outreach, qualify leads, schedule follow-ups, and accelerate your sales pipeline with AI-powered voice automation.",
  },
  {
    id: 21,
    name: "AI Voice Agents for Utilities",
    slug: "ai-voice-agents-utilities",
    icon: Zap,
    description:
      "Automate billing inquiries, outage notifications, service requests, and account management for utility providers.",
  },
  {
    id: 22,
    name: "AI Voice Agents for Construction",
    slug: "ai-voice-agents-construction",
    icon: HardHat,
    description:
      "Streamline site coordination, project status updates, supplier communication, and team notifications with AI voice automation.",
  },
  {
    id: 23,
    name: "AI Voice Agents for Agriculture",
    slug: "ai-voice-agents-agriculture",
    icon: Sprout,
    description:
      "Automate farm guidance, crop advisory calls, supply chain updates, and field support with intelligent AI voice agents.",
  },
];

/** Per-industry SEO meta titles and descriptions for `generateMetadata`. */
export const INDUSTRY_SEO_METADATA: Record<string, { title: string; description: string }> = {
  "ai-voice-agents-healthcare-medical": {
    title: "AI Voice Agent for Healthcare and Medical Services | OnDial",
    description:
      "Enhance healthcare and medical services with OnDial's AI-powered voice solutions. Improve patient care, streamline operations, and drive efficiency.",
  },
  "ai-voice-agents-finance-banking": {
    title: "AI Voice Agent for Finance & Banking Services | OnDial",
    description:
      "Transform customer support in finance & banking with OnDial's AI Voice Agent. Automate queries, boost security, and deliver seamless, 24/7 client experiences.",
  },
  "ai-voice-agents-real-estate": {
    title: "AI Voice Agents for Real Estate Lead Qualification & Sales",
    description:
      "Convert more property inquiries with OnDial's AI Voice Agents. Automate lead qualification, follow-ups, customer support, and appointment booking.",
  },
  "ai-voice-agents-retail-e-commerce": {
    title: "AI Voice Agent for Retail & E-commerce Services | OnDial",
    description:
      "Boost customer engagement with OnDial's AI Voice Agent for Retail & E-commerce Services. Automate support, personalize shopping, and drive sales with ease.",
  },
  "ai-voice-agents-insurance": {
    title: "AI Voice Agent for Insurance Services | OnDial Solutions",
    description:
      "Transform insurance support with OnDial's AI Voice Agent for Insurance Services. Automate claims, boost customer experience, and cut response times seamlessly.",
  },
  "ai-voice-agents-sales-lead-generation": {
    title: "AI Voice Agent for Sales & Lead Generation Services",
    description:
      "Boost revenue with OnDial's AI Voice Agent for Sales & Lead Generation Services. Automate outreach, qualify leads, and close deals faster with smart voice AI.",
  },
  "ai-voice-agents-call-centers-bpo": {
    title: "AI Voice Agent for Call Centers & BPO Services | OnDial",
    description:
      "Boost efficiency with OnDial's AI Voice Agent for Call Centers & BPO Services. Automate support, cut costs, and deliver exceptional customer experiences.",
  },
  "ai-voice-agents-telecommunications": {
    title: "AI Voice Agent for Telecommunications Services | OnDial",
    description:
      "Boost call centers and customer care with OnDial's AI Voice Agent for Telecommunications Services - streamline support, cut costs, and elevate user experiences.",
  },
  "ai-voice-agents-automotive": {
    title: "AI Voice Agent for Automotive Services | OnDial",
    description:
      "Streamline bookings, diagnostics, and customer support with OnDial's AI Voice Agent for Automotive Services - smarter, faster, and always on for your garage.",
  },
  "ai-voice-agents-education": {
    title: "AI Voice Agent for Education Services - OnDial",
    description:
      "Enhance student engagement and streamline admin tasks with OnDial's AI Voice Agent for Education Services. 24/7 support, multilingual, and secure.",
  },
  "ai-voice-agents-travel-tourism": {
    title: "AI Voice Agent for Travel & Tourism Services | OnDial",
    description:
      "Transform travel experiences with OnDial's AI Voice Agent for Travel & Tourism Services - bookings, assist travelers, and boost customer satisfaction.",
  },
  "ai-voice-agents-hospitality": {
    title: "AI Voice Agent for Hospitality Services | OnDial",
    description:
      "Enhance guest experiences with OnDial's AI Voice Agent. 24/7 support, multilingual capabilities, and instant responses for seamless hospitality services.",
  },
  "ai-voice-agents-legal": {
    title: "Best AI Voice Agent for Legal Services | OnDial",
    description:
      "Enhance your law firm's efficiency with OnDial's AI Voice Agent. Automate client intake, lead qualification, and appointment scheduling 24/7.",
  },
  "ai-voice-agents-government": {
    title: "Best AI Voice Agent for Government Services - OnDial",
    description:
      "Enhance citizen engagement with OnDial's AI Voice Agent. Provide 24/7 multilingual support, automate inquiries, and streamline government services efficiently.",
  },
  "ai-voice-agents-utilities": {
    title: "Best AI Voice Agent for Utilities Services | OnDial",
    description:
      "Enhance customer support and operational efficiency with OnDial's AI Voice Agent for Utilities Services. Automate queries, billing, and real-time assistance.",
  },
  "ai-voice-agents-non-profit-organizations": {
    title: "AI Calling Agents for Non-Profit Organizations | OnDial",
    description:
      "Empower your non-profit with OnDial's AI Voice Agents. Automate donor outreach, volunteer coordination, event reminders, and supporter engagement 24/7.",
  },
  "ai-voice-agents-transportation-logistics": {
    title: "AI Voice Agent for Transportation & Logistics Services",
    description:
      "Boost efficiency and streamline operations with OnDial's AI Voice Agent for Transportation & Logistics Services. Smart automation for faster deliveries.",
  },
  "ai-voice-agents-manufacturing": {
    title: "AI Voice Agent for Manufacturing Services | OnDial",
    description:
      "Boost efficiency and streamline operations with OnDial's AI Voice Agent for Manufacturing Services, transforming production and factory communication.",
  },
  "ai-voice-agents-construction": {
    title: "AI Voice Agents for Construction Companies | OnDial",
    description:
      "Automate project inquiries, lead qualification, site visit scheduling, and customer support with OnDial's AI Voice Agents for construction companies.",
  },
  "ai-voice-agents-agriculture": {
    title: "Best AI Voice Agent for Agriculture Services | OnDial",
    description:
      "Boost farm efficiency with OnDial's AI Voice Agent for Agriculture Services. Automate guidance, support, and insights for smarter farming operations.",
  },
  "ai-voice-agents-event-management": {
    title: "AI Voice Agent for Event Management Services | OnDial",
    description:
      "Streamline event registrations, bookings, and attendee communication with OnDial's AI Voice Agent for Event Management Services.",
  },
  "ai-voice-agents-consulting": {
    title: "AI Voice Agent for Consulting Services | OnDial",
    description:
      "Automate client intake, appointment scheduling, and advisory follow-ups with OnDial's AI Voice Agent for Consulting Services.",
  },
  "ai-voice-agents-pharmaceuticals": {
    title: "AI Voice Agent for Pharmaceutical Services | OnDial",
    description:
      "Enhance prescription support, delivery notifications, and customer care with OnDial's AI Voice Agent for Pharmaceutical Services.",
  },
};

export const SERVICES_DATA = DEFAULT_INDUSTRIES.map((industry, index) => ({
  id: industry.id,
  title: industry.name,
  description: industry.description,
  image: PLACEHOLDER_IMAGE,
  bgColor: CARD_BG_COLORS[index % CARD_BG_COLORS.length],
  link: `/industries/${industry.slug}`,
}));
