import { INDUSTRIES_NAV_ITEMS } from "@/config/industries-nav";
import type { Industry } from "@/lib/services-data";
import { DEFAULT_INDUSTRIES } from "@/lib/services-data";

export type AudioDemoTrack = {
  id: number;
  label: string;
  artist: string;
  /** Gradient start colour (dark shade) */
  from: string;
  /** Gradient end colour (light shade) */
  to: string;
  /** Accent / highlight colour */
  accent: string;
  /** Demo duration in seconds */
  seconds: number;
};

export type IndustryHeroContent = {
  slug: string;
  title: string;
  highlight: string;
  subtitle: string;
  backgroundImage: string;
  /** Optional transparent-PNG depth layer (sits in front of title). */
  foregroundImage?: string;
  /** Per-industry audio demo tracks for the player widget. */
  audioDemos: AudioDemoTrack[];
};

/** Osaka reference tower PNG — decorative depth layer. */
const OSAKA_TOWER = "https://assets.codepen.io/605876/do-not-copy-osaka-tower.png";

/**
 * Per-industry background + optional foreground images.
 * backgroundImage → full-bleed landscape photo (sky/scene layer)
 * foregroundImage → transparent PNG depth layer (optional)
 */
const INDUSTRY_IMAGES: Record<string, { background: string; foreground?: string }> = {
  "healthcare-and-medical-services": {
    background:
      "https://images.pexels.com/photos/23234956/pexels-photo-23234956.jpeg",
    foreground: "/industries/Untitled design.png",
  },
  "financial-and-banking-services": {
    background:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "real-estate-services": {
    background:
    "https://images.pexels.com/photos/23234956/pexels-photo-23234956.jpeg",
    foreground: "/industries/Untitled design.png",
  },
  "retail-and-ecommerce-services": {
    background:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop",
  },
  "insurance-services": {
    background:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
  },
  "sales-and-lead-generation-services": {
    background:
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop",
  },
  "call-center-and-bpo-services": {
    background:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format&fit=crop",
  },
  "telecommunications-services": {
    background:
      "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?q=80&w=1600&auto=format&fit=crop",
  },
  "automotive-services": {
    background:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
  },
  "education-services": {
    background:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
  },
  "travel-and-tourism-services": {
    background:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "hospitality-services": {
    background:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
  },
  "legal-services": {
    background:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
  },
  "government-services": {
    background:
      "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "utilities-services": {
    background:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop",
  },
  "non-profit-organizations-services": {
    background:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop",
  },
  "transportation-and-logistics-services": {
    background:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
  },
  "manufacturing-services": {
    background:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1600&auto=format&fit=crop",
  },
  "construction-services": {
    background:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
  },
  "agriculture-services": {
    background:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop",
  },
};

/** Per-industry audio demo tracks. */
const INDUSTRY_DEMOS: Record<string, AudioDemoTrack[]> = {
  "healthcare-and-medical-services": [
    { id: 1, label: "Appointment Reminder",  artist: "AI Voice · Healthcare", from: "#1e3a8a", to: "#3b82f6", accent: "#60a5fa", seconds: 38 },
    { id: 2, label: "Prescription Refill",   artist: "AI Voice · Healthcare", from: "#164e63", to: "#06b6d4", accent: "#22d3ee", seconds: 52 },
    { id: 3, label: "Lab Results Follow-up", artist: "AI Voice · Healthcare", from: "#1e1b4b", to: "#6366f1", accent: "#818cf8", seconds: 44 },
  ],
  "financial-and-banking-services": [
    { id: 1, label: "Payment Due Reminder",  artist: "AI Voice · Banking",   from: "#064e3b", to: "#10b981", accent: "#34d399", seconds: 35 },
    { id: 2, label: "Fraud Alert",           artist: "AI Voice · Banking",   from: "#1c1917", to: "#78716c", accent: "#a8a29e", seconds: 28 },
    { id: 3, label: "Loan Application",      artist: "AI Voice · Finance",   from: "#052e16", to: "#16a34a", accent: "#4ade80", seconds: 58 },
  ],
  "real-estate-services": [
    { id: 1, label: "Showing Confirmation",  artist: "AI Voice · Real Estate", from: "#78350f", to: "#f59e0b", accent: "#fbbf24", seconds: 42 },
    { id: 2, label: "Lead Follow-up",        artist: "AI Voice · Real Estate", from: "#7c2d12", to: "#ea580c", accent: "#fb923c", seconds: 55 },
    { id: 3, label: "Lease Renewal",         artist: "AI Voice · Real Estate", from: "#431407", to: "#dc2626", accent: "#f87171", seconds: 48 },
  ],
  "retail-and-ecommerce-services": [
    { id: 1, label: "Order Status Update",   artist: "AI Voice · Retail",     from: "#500724", to: "#db2777", accent: "#f472b6", seconds: 30 },
    { id: 2, label: "Return Confirmation",   artist: "AI Voice · E-commerce", from: "#4a044e", to: "#a21caf", accent: "#c026d3", seconds: 36 },
    { id: 3, label: "Loyalty Points Alert",  artist: "AI Voice · Retail",     from: "#2e1065", to: "#7c3aed", accent: "#a78bfa", seconds: 44 },
  ],
  "insurance-services": [
    { id: 1, label: "Policy Renewal",        artist: "AI Voice · Insurance",  from: "#1e1b4b", to: "#4f46e5", accent: "#818cf8", seconds: 48 },
    { id: 2, label: "Claim Status Update",   artist: "AI Voice · Insurance",  from: "#0f172a", to: "#334155", accent: "#94a3b8", seconds: 40 },
    { id: 3, label: "Premium Reminder",      artist: "AI Voice · Insurance",  from: "#172554", to: "#1d4ed8", accent: "#60a5fa", seconds: 34 },
  ],
  "sales-and-lead-generation-services": [
    { id: 1, label: "Lead Qualification",    artist: "AI Voice · Sales",      from: "#431407", to: "#f97316", accent: "#fb923c", seconds: 55 },
    { id: 2, label: "Demo Booking",          artist: "AI Voice · Sales",      from: "#7c2d12", to: "#ea580c", accent: "#fdba74", seconds: 42 },
    { id: 3, label: "Follow-up Call",        artist: "AI Voice · Sales",      from: "#78350f", to: "#d97706", accent: "#fcd34d", seconds: 38 },
  ],
  "call-center-and-bpo-services": [
    { id: 1, label: "Customer Support",      artist: "AI Voice · BPO",        from: "#0c4a6e", to: "#0284c7", accent: "#38bdf8", seconds: 60 },
    { id: 2, label: "Complaint Resolution",  artist: "AI Voice · BPO",        from: "#164e63", to: "#0891b2", accent: "#22d3ee", seconds: 52 },
    { id: 3, label: "Survey Call",           artist: "AI Voice · Call Center",from: "#1e3a8a", to: "#2563eb", accent: "#93c5fd", seconds: 45 },
  ],
  "telecommunications-services": [
    { id: 1, label: "Plan Upgrade Offer",    artist: "AI Voice · Telecom",    from: "#0c4a6e", to: "#0ea5e9", accent: "#38bdf8", seconds: 40 },
    { id: 2, label: "Outage Notification",   artist: "AI Voice · Telecom",    from: "#042f2e", to: "#0d9488", accent: "#2dd4bf", seconds: 28 },
    { id: 3, label: "Bill Reminder",         artist: "AI Voice · Telecom",    from: "#0f172a", to: "#1e40af", accent: "#60a5fa", seconds: 32 },
  ],
  "automotive-services": [
    { id: 1, label: "Service Due Reminder",  artist: "AI Voice · Automotive", from: "#450a0a", to: "#dc2626", accent: "#f87171", seconds: 36 },
    { id: 2, label: "Test Drive Booking",    artist: "AI Voice · Automotive", from: "#431407", to: "#c2410c", accent: "#fb923c", seconds: 50 },
    { id: 3, label: "Parts Ready Alert",     artist: "AI Voice · Automotive", from: "#1c1917", to: "#57534e", accent: "#a8a29e", seconds: 28 },
  ],
  "education-services": [
    { id: 1, label: "Enrollment Reminder",   artist: "AI Voice · Education",  from: "#3b0764", to: "#7c3aed", accent: "#a78bfa", seconds: 44 },
    { id: 2, label: "Class Schedule Alert",  artist: "AI Voice · Education",  from: "#2e1065", to: "#6d28d9", accent: "#c4b5fd", seconds: 36 },
    { id: 3, label: "Tuition Due Notice",    artist: "AI Voice · Education",  from: "#1e1b4b", to: "#4338ca", accent: "#818cf8", seconds: 40 },
  ],
  "travel-and-tourism-services": [
    { id: 1, label: "Booking Confirmation",  artist: "AI Voice · Travel",     from: "#042f2e", to: "#0f766e", accent: "#2dd4bf", seconds: 42 },
    { id: 2, label: "Flight Delay Alert",    artist: "AI Voice · Travel",     from: "#164e63", to: "#0e7490", accent: "#22d3ee", seconds: 30 },
    { id: 3, label: "Check-in Reminder",     artist: "AI Voice · Tourism",    from: "#065f46", to: "#059669", accent: "#34d399", seconds: 35 },
  ],
  "hospitality-services": [
    { id: 1, label: "Reservation Confirm",   artist: "AI Voice · Hospitality",from: "#4c0519", to: "#e11d48", accent: "#fb7185", seconds: 38 },
    { id: 2, label: "Check-in Welcome",      artist: "AI Voice · Hotel",      from: "#881337", to: "#be123c", accent: "#fda4af", seconds: 30 },
    { id: 3, label: "Guest Feedback Survey", artist: "AI Voice · Hospitality",from: "#78350f", to: "#b45309", accent: "#fcd34d", seconds: 55 },
  ],
  "legal-services": [
    { id: 1, label: "Court Date Reminder",   artist: "AI Voice · Legal",      from: "#1c1917", to: "#44403c", accent: "#a8a29e", seconds: 36 },
    { id: 2, label: "Document Review Alert", artist: "AI Voice · Legal",      from: "#0f172a", to: "#1e293b", accent: "#94a3b8", seconds: 42 },
    { id: 3, label: "Consultation Booking",  artist: "AI Voice · Legal",      from: "#172554", to: "#1e40af", accent: "#93c5fd", seconds: 50 },
  ],
  "government-services": [
    { id: 1, label: "Appointment Reminder",  artist: "AI Voice · Government", from: "#172554", to: "#1d4ed8", accent: "#60a5fa", seconds: 40 },
    { id: 2, label: "Document Ready Alert",  artist: "AI Voice · Government", from: "#1e3a8a", to: "#2563eb", accent: "#93c5fd", seconds: 32 },
    { id: 3, label: "Survey Call",           artist: "AI Voice · Government", from: "#0c4a6e", to: "#0369a1", accent: "#38bdf8", seconds: 48 },
  ],
  "utilities-services": [
    { id: 1, label: "Outage Notification",   artist: "AI Voice · Utilities",  from: "#713f12", to: "#ca8a04", accent: "#facc15", seconds: 28 },
    { id: 2, label: "Bill Due Reminder",     artist: "AI Voice · Utilities",  from: "#78350f", to: "#d97706", accent: "#fcd34d", seconds: 34 },
    { id: 3, label: "Meter Reading Alert",   artist: "AI Voice · Utilities",  from: "#065f46", to: "#16a34a", accent: "#4ade80", seconds: 40 },
  ],
  "non-profit-organizations-services": [
    { id: 1, label: "Donation Thank You",    artist: "AI Voice · Non-Profit", from: "#052e16", to: "#15803d", accent: "#4ade80", seconds: 45 },
    { id: 2, label: "Event Invitation",      artist: "AI Voice · Non-Profit", from: "#064e3b", to: "#059669", accent: "#34d399", seconds: 55 },
    { id: 3, label: "Volunteer Reminder",    artist: "AI Voice · Non-Profit", from: "#042f2e", to: "#0f766e", accent: "#2dd4bf", seconds: 40 },
  ],
  "transportation-and-logistics-services": [
    { id: 1, label: "Delivery ETA Update",   artist: "AI Voice · Logistics",  from: "#1e3a8a", to: "#1d4ed8", accent: "#60a5fa", seconds: 30 },
    { id: 2, label: "Pickup Confirmation",   artist: "AI Voice · Transport",  from: "#0c4a6e", to: "#0284c7", accent: "#38bdf8", seconds: 28 },
    { id: 3, label: "Shipment Alert",        artist: "AI Voice · Logistics",  from: "#0f172a", to: "#334155", accent: "#94a3b8", seconds: 36 },
  ],
  "manufacturing-services": [
    { id: 1, label: "Order Dispatch Alert",  artist: "AI Voice · Manufacturing",from: "#431407", to: "#c2410c", accent: "#fb923c", seconds: 35 },
    { id: 2, label: "Quality Check Notify",  artist: "AI Voice · Manufacturing",from: "#1c1917", to: "#57534e", accent: "#a8a29e", seconds: 40 },
    { id: 3, label: "Maintenance Reminder",  artist: "AI Voice · Manufacturing",from: "#78350f", to: "#b45309", accent: "#fbbf24", seconds: 44 },
  ],
  "construction-services": [
    { id: 1, label: "Site Safety Alert",     artist: "AI Voice · Construction",from: "#78350f", to: "#d97706", accent: "#fcd34d", seconds: 32 },
    { id: 2, label: "Project Update",        artist: "AI Voice · Construction",from: "#431407", to: "#ea580c", accent: "#fdba74", seconds: 48 },
    { id: 3, label: "Inspection Reminder",   artist: "AI Voice · Construction",from: "#1c1917", to: "#44403c", accent: "#d6d3d1", seconds: 38 },
  ],
  "agriculture-services": [
    { id: 1, label: "Weather Alert",         artist: "AI Voice · Agriculture", from: "#14532d", to: "#16a34a", accent: "#4ade80", seconds: 28 },
    { id: 2, label: "Harvest Schedule",      artist: "AI Voice · Agriculture", from: "#3f6212", to: "#65a30d", accent: "#a3e635", seconds: 42 },
    { id: 3, label: "Supply Delivery ETA",   artist: "AI Voice · Agriculture", from: "#064e3b", to: "#059669", accent: "#34d399", seconds: 36 },
  ],
};

const FALLBACK_DEMOS: AudioDemoTrack[] = [
  { id: 1, label: "Appointment Reminder", artist: "AI Voice Demo", from: "#1e3a8a", to: "#3b82f6", accent: "#60a5fa", seconds: 42 },
  { id: 2, label: "Follow-up Call",       artist: "AI Voice Demo", from: "#064e3b", to: "#10b981", accent: "#34d399", seconds: 55 },
  { id: 3, label: "Customer Support",     artist: "AI Voice Demo", from: "#3b0764", to: "#8b5cf6", accent: "#a78bfa", seconds: 48 },
];

/** Fallback images for any slug not in the map above. */
const FALLBACK_IMAGES = {
  background:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  foreground: OSAKA_TOWER,
};

function shortIndustryTitle(industry: Industry) {
  const navItem = INDUSTRIES_NAV_ITEMS.find((item) => item.slug === industry.slug);
  if (navItem) return navItem.label.toUpperCase();
  return industry.name.split("&")[0]?.trim().toUpperCase() ?? industry.name.toUpperCase();
}

export function getIndustryBySlug(slug: string) {
  return DEFAULT_INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustryHeroContent(industry: Industry): IndustryHeroContent {
  const images = INDUSTRY_IMAGES[industry.slug] ?? FALLBACK_IMAGES;
  return {
    slug: industry.slug,
    title: shortIndustryTitle(industry),
    highlight: industry.name,
    subtitle: "AI voice automation",
    backgroundImage: images.background,
    foregroundImage: images.foreground,
    audioDemos: INDUSTRY_DEMOS[industry.slug] ?? FALLBACK_DEMOS,
  };
}

export function getAllIndustrySlugs() {
  return DEFAULT_INDUSTRIES.map((industry) => industry.slug);
}
