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

/** Osaka reference tower PNG - decorative depth layer. */
const OSAKA_TOWER = "https://assets.codepen.io/605876/do-not-copy-osaka-tower.png";

/**
 * Per-industry background + optional foreground images.
 */
const INDUSTRY_IMAGES: Record<string, { background: string; foreground?: string }> = {
  "healthcare-and-medical-services": {
    background: "https://images.pexels.com/photos/23234956/pexels-photo-23234956.jpeg",
    foreground: "/industries/Untitled design.png",
  },
  "insurance-services": {
    background: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
  },
  "financial-and-banking-services": {
    background: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "real-estate-services": {
    background: "https://images.pexels.com/photos/23234956/pexels-photo-23234956.jpeg",
    foreground: "/industries/Untitled design.png",
  },
  "call-center-and-bpo-services": {
    background: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format&fit=crop",
  },
  "travel-and-tourism-services": {
    background: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "transportation-and-logistics-services": {
    background: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
  },
  "retail-and-ecommerce-services": {
    background: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop",
  },
  "telecommunications-services": {
    background: "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?q=80&w=1600&auto=format&fit=crop",
  },
  "automotive-services": {
    background: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
  },
  "education-services": {
    background: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
  },
  "hospitality-services": {
    background: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
  },
  "legal-services": {
    background: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
  },
  "government-services": {
    background: "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "manufacturing-services": {
    background: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1600&auto=format&fit=crop",
  },
  "non-profit-organizations-services": {
    background: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop",
  },
  "event-management-services": {
    background: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop",
  },
  "consulting-services": {
    background: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop",
  },
  "pharmaceutical-services": {
    background: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop",
  },
};

/** Per-industry audio demo tracks. */
const INDUSTRY_DEMOS: Record<string, AudioDemoTrack[]> = {
  "healthcare-and-medical-services": [
    { id: 1, label: "Appointment Reminder", artist: "AI Voice · Healthcare", from: "#1e3a8a", to: "#3b82f6", accent: "#60a5fa", seconds: 38 },
    { id: 2, label: "Prescription Refill", artist: "AI Voice · Healthcare", from: "#164e63", to: "#06b6d4", accent: "#22d3ee", seconds: 52 },
    { id: 3, label: "Lab Results Follow-up", artist: "AI Voice · Healthcare", from: "#1e1b4b", to: "#6366f1", accent: "#818cf8", seconds: 44 },
  ],
  "insurance-services": [
    { id: 1, label: "Policy Renewal", artist: "AI Voice · Insurance", from: "#1e1b4b", to: "#4f46e5", accent: "#818cf8", seconds: 48 },
    { id: 2, label: "Claim Status Update", artist: "AI Voice · Insurance", from: "#0f172a", to: "#334155", accent: "#94a3b8", seconds: 40 },
    { id: 3, label: "Premium Reminder", artist: "AI Voice · Insurance", from: "#172554", to: "#1d4ed8", accent: "#60a5fa", seconds: 34 },
  ],
  "financial-and-banking-services": [
    { id: 1, label: "Payment Due Reminder", artist: "AI Voice · Banking", from: "#064e3b", to: "#10b981", accent: "#34d399", seconds: 35 },
    { id: 2, label: "Fraud Alert", artist: "AI Voice · Banking", from: "#1c1917", to: "#78716c", accent: "#a8a29e", seconds: 28 },
    { id: 3, label: "Loan Application", artist: "AI Voice · Finance", from: "#052e16", to: "#16a34a", accent: "#4ade80", seconds: 58 },
  ],
  "real-estate-services": [
    { id: 1, label: "Showing Confirmation", artist: "AI Voice · Real Estate", from: "#78350f", to: "#f59e0b", accent: "#fbbf24", seconds: 42 },
    { id: 2, label: "Lead Follow-up", artist: "AI Voice · Real Estate", from: "#7c2d12", to: "#ea580c", accent: "#fb923c", seconds: 55 },
    { id: 3, label: "Lease Renewal", artist: "AI Voice · Real Estate", from: "#431407", to: "#dc2626", accent: "#f87171", seconds: 48 },
  ],
  "call-center-and-bpo-services": [
    { id: 1, label: "Customer Support", artist: "AI Voice · BPO", from: "#0c4a6e", to: "#0284c7", accent: "#38bdf8", seconds: 60 },
    { id: 2, label: "Complaint Resolution", artist: "AI Voice · BPO", from: "#164e63", to: "#0891b2", accent: "#22d3ee", seconds: 52 },
    { id: 3, label: "Survey Call", artist: "AI Voice · Call Center", from: "#1e3a8a", to: "#2563eb", accent: "#93c5fd", seconds: 45 },
  ],
  "travel-and-tourism-services": [
    { id: 1, label: "Booking Confirmation", artist: "AI Voice · Travel", from: "#042f2e", to: "#0f766e", accent: "#2dd4bf", seconds: 42 },
    { id: 2, label: "Flight Delay Alert", artist: "AI Voice · Travel", from: "#164e63", to: "#0e7490", accent: "#22d3ee", seconds: 30 },
    { id: 3, label: "Check-in Reminder", artist: "AI Voice · Tourism", from: "#065f46", to: "#059669", accent: "#34d399", seconds: 35 },
  ],
  "transportation-and-logistics-services": [
    { id: 1, label: "Delivery ETA Update", artist: "AI Voice · Logistics", from: "#1e3a8a", to: "#1d4ed8", accent: "#60a5fa", seconds: 30 },
    { id: 2, label: "Pickup Confirmation", artist: "AI Voice · Transport", from: "#0c4a6e", to: "#0284c7", accent: "#38bdf8", seconds: 28 },
    { id: 3, label: "Shipment Alert", artist: "AI Voice · Logistics", from: "#0f172a", to: "#334155", accent: "#94a3b8", seconds: 36 },
  ],
  "retail-and-ecommerce-services": [
    { id: 1, label: "Order Status Update", artist: "AI Voice · Retail", from: "#500724", to: "#db2777", accent: "#f472b6", seconds: 30 },
    { id: 2, label: "Return Confirmation", artist: "AI Voice · E-commerce", from: "#4a044e", to: "#a21caf", accent: "#c026d3", seconds: 36 },
    { id: 3, label: "Loyalty Points Alert", artist: "AI Voice · Retail", from: "#2e1065", to: "#7c3aed", accent: "#a78bfa", seconds: 44 },
  ],
  "telecommunications-services": [
    { id: 1, label: "Plan Upgrade Offer", artist: "AI Voice · Telecom", from: "#0c4a6e", to: "#0ea5e9", accent: "#38bdf8", seconds: 40 },
    { id: 2, label: "Outage Notification", artist: "AI Voice · Telecom", from: "#042f2e", to: "#0d9488", accent: "#2dd4bf", seconds: 28 },
    { id: 3, label: "Bill Reminder", artist: "AI Voice · Telecom", from: "#0f172a", to: "#1e40af", accent: "#60a5fa", seconds: 32 },
  ],
  "automotive-services": [
    { id: 1, label: "Service Due Reminder", artist: "AI Voice · Automotive", from: "#450a0a", to: "#dc2626", accent: "#f87171", seconds: 36 },
    { id: 2, label: "Test Drive Booking", artist: "AI Voice · Automotive", from: "#431407", to: "#c2410c", accent: "#fb923c", seconds: 50 },
    { id: 3, label: "Parts Ready Alert", artist: "AI Voice · Automotive", from: "#1c1917", to: "#57534e", accent: "#a8a29e", seconds: 28 },
  ],
  "education-services": [
    { id: 1, label: "Enrollment Reminder", artist: "AI Voice · Education", from: "#3b0764", to: "#7c3aed", accent: "#a78bfa", seconds: 44 },
    { id: 2, label: "Class Schedule Alert", artist: "AI Voice · Education", from: "#2e1065", to: "#6d28d9", accent: "#c4b5fd", seconds: 36 },
    { id: 3, label: "Tuition Due Notice", artist: "AI Voice · Education", from: "#1e1b4b", to: "#4338ca", accent: "#818cf8", seconds: 40 },
  ],
  "hospitality-services": [
    { id: 1, label: "Reservation Confirm", artist: "AI Voice · Hospitality", from: "#4c0519", to: "#e11d48", accent: "#fb7185", seconds: 38 },
    { id: 2, label: "Check-in Welcome", artist: "AI Voice · Hotel", from: "#881337", to: "#be123c", accent: "#fda4af", seconds: 30 },
    { id: 3, label: "Guest Feedback Survey", artist: "AI Voice · Hospitality", from: "#78350f", to: "#b45309", accent: "#fcd34d", seconds: 55 },
  ],
  "legal-services": [
    { id: 1, label: "Court Date Reminder", artist: "AI Voice · Legal", from: "#1c1917", to: "#44403c", accent: "#a8a29e", seconds: 36 },
    { id: 2, label: "Document Review Alert", artist: "AI Voice · Legal", from: "#0f172a", to: "#1e293b", accent: "#94a3b8", seconds: 42 },
    { id: 3, label: "Consultation Booking", artist: "AI Voice · Legal", from: "#172554", to: "#1e40af", accent: "#93c5fd", seconds: 50 },
  ],
  "government-services": [
    { id: 1, label: "Appointment Reminder", artist: "AI Voice · Government", from: "#172554", to: "#1d4ed8", accent: "#60a5fa", seconds: 40 },
    { id: 2, label: "Document Ready Alert", artist: "AI Voice · Government", from: "#1e3a8a", to: "#2563eb", accent: "#93c5fd", seconds: 32 },
    { id: 3, label: "Survey Call", artist: "AI Voice · Government", from: "#0c4a6e", to: "#0369a1", accent: "#38bdf8", seconds: 48 },
  ],
  "manufacturing-services": [
    { id: 1, label: "Order Dispatch Alert", artist: "AI Voice · Manufacturing", from: "#431407", to: "#c2410c", accent: "#fb923c", seconds: 35 },
    { id: 2, label: "Quality Check Notify", artist: "AI Voice · Manufacturing", from: "#1c1917", to: "#57534e", accent: "#a8a29e", seconds: 40 },
    { id: 3, label: "Maintenance Reminder", artist: "AI Voice · Manufacturing", from: "#78350f", to: "#b45309", accent: "#fbbf24", seconds: 44 },
  ],
  "non-profit-organizations-services": [
    { id: 1, label: "Donation Thank You", artist: "AI Voice · Non-Profit", from: "#052e16", to: "#15803d", accent: "#4ade80", seconds: 45 },
    { id: 2, label: "Event Invitation", artist: "AI Voice · Non-Profit", from: "#064e3b", to: "#059669", accent: "#34d399", seconds: 55 },
    { id: 3, label: "Volunteer Reminder", artist: "AI Voice · Non-Profit", from: "#042f2e", to: "#0f766e", accent: "#2dd4bf", seconds: 40 },
  ],
  "event-management-services": [
    { id: 1, label: "Registration Confirm", artist: "AI Voice · Events", from: "#581c87", to: "#a855f7", accent: "#d8b4fe", seconds: 30 },
    { id: 2, label: "Event Detail Update", artist: "AI Voice · Events", from: "#431407", to: "#ea580c", accent: "#fdba74", seconds: 45 },
    { id: 3, label: "Feedback Request", artist: "AI Voice · Events", from: "#0c4a6e", to: "#0ea5e9", accent: "#7dd3fc", seconds: 38 },
  ],
  "consulting-services": [
    { id: 1, label: "Meeting Schedule", artist: "AI Voice · Consulting", from: "#1e293b", to: "#64748b", accent: "#cbd5e1", seconds: 40 },
    { id: 2, label: "Intake Form Follow-up", artist: "AI Voice · Advisory", from: "#1e1b4b", to: "#4f46e5", accent: "#93c5fd", seconds: 50 },
    { id: 3, label: "Session Reminder", artist: "AI Voice · Consulting", from: "#064e3b", to: "#10b981", accent: "#a7f3d0", seconds: 32 },
  ],
  "pharmaceutical-services": [
    { id: 1, label: "Prescription Ready", artist: "AI Voice · Pharmacy", from: "#1e3a8a", to: "#3b82f6", accent: "#93c5fd", seconds: 35 },
    { id: 2, label: "Refill Renewal Alert", artist: "AI Voice · Pharmacy", from: "#164e63", to: "#06b6d4", accent: "#67e8f9", seconds: 44 },
    { id: 3, label: "Delivery Dispatched", artist: "AI Voice · Pharma", from: "#0f172a", to: "#475569", accent: "#94a3b8", seconds: 30 },
  ],
};

const FALLBACK_DEMOS: AudioDemoTrack[] = [
  { id: 1, label: "Appointment Reminder", artist: "AI Voice Demo", from: "#1e3a8a", to: "#3b82f6", accent: "#60a5fa", seconds: 42 },
  { id: 2, label: "Follow-up Call", artist: "AI Voice Demo", from: "#064e3b", to: "#10b981", accent: "#34d399", seconds: 55 },
  { id: 3, label: "Customer Support", artist: "AI Voice Demo", from: "#3b0764", to: "#8b5cf6", accent: "#a78bfa", seconds: 48 },
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

/* ─────────────────────────────────────────────────────────
   Industry page content types
   ───────────────────────────────────────────────────────── */

export type IndustryStat = {
  value: string;
  label: string;
};

export type IndustryUseCase = {
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: string;
};

export type IndustryBenefit = {
  title: string;
  description: string;
  icon: string;
};

export type IndustryOutcome = {
  value: string;
  label: string;
  sublabel: string;
};

export type IndustryService = {
  title: string;
  description: string;
  icon: string;
};

export type IndustryTestimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type IndustryDemoIdentityCheck = {
  field: string;
  value: string;
};

export type IndustryCallDirection = "inbound" | "outbound";

export type IndustryDemoScenario = {
  label: string;
  duration: string;
  /** Defaults to inbound unless the first message is from the AI (outbound opener). */
  callDirection?: IndustryCallDirection;
  aiResponse: string;
  audioSrc?: string;
  lang?: string;
  messages: { from: "caller" | "ai"; text: string }[];
  caller: string;
  num: string;
  av: string;
  intents: string[];
  tools: { label: string; icon: string }[];
  actions: { icon: string; label: string; val: string }[];
  logLines: { t: string; dot: "pur" | "grn" | "amb"; text: string }[];
  outcomes: { icon: string; label: string; val: string }[];
  /** Appointment flows - slots offered to the caller */
  availableSlots?: string[];
  /** Which slot the caller selects */
  selectedSlot?: string;
  /** Lab / order flows - fields the AI collects before lookup */
  identityChecks?: IndustryDemoIdentityCheck[];
};

export type IndustryPageContent = {
  question?: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  stats: IndustryStat[];
  demoScenarios: IndustryDemoScenario[];
  useCases: IndustryUseCase[];
  benefits: IndustryBenefit[];
  outcomes: IndustryOutcome[];
  services: IndustryService[];
  testimonial: IndustryTestimonial;
  ctaHeadline: string;
  ctaSubheadline: string;
  serviceHeadline: string;
  serviceSubheadline: string;
};

/* ─────────────────────────────────────────────────────────
   Per-industry page content
   ───────────────────────────────────────────────────────── */

const INDUSTRY_PAGE_CONTENT: Record<string, IndustryPageContent> = {
  "real-estate-services": {
    headline: "Never miss a lead",
    headlineHighlight: "again",
    subheadline: "Your AI calling agent answers every inquiry, qualifies buyers and tenants, and books property visits - 24 hours a day, without a single rep on the line.",
    stats: [
      { value: "3×", label: "More leads qualified" },
      { value: "80%", label: "Reduction in missed calls" },
      { value: "24/7", label: "Availability, zero downtime" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Property inquiry",
        duration: "1:12",
        audioSrc: "/demos/property-inquiry.mp3",
        lang: "en",
        aiResponse: "Yes, the 3BHK in Bandra West is still available! It's ₹1.2 Cr for 1,450 sq ft with parking. Would you like to schedule a viewing?",
        messages: [
          { from: "caller", text: "Hi, I saw a 3BHK listing on your site in Bandra West - is it still available, and what's the asking price?" },
          { from: "ai", text: "Let me check that listing for you right away." },
          { from: "caller", text: "Sure, thanks." },
          { from: "ai", text: "Yes, it's still available at ₹1.2 Cr. Would you like to book a viewing this week?" },
        ],
        caller: "Ravi Shah",
        num: "+91 98765 43210",
        av: "RS",
        intents: ["Property inquiry", "3BHK · Bandra West", "Positive", "English", "Normal"],
        tools: [
          { label: "listing_search()", icon: "Database" },
          { label: "price_lookup()", icon: "Tag" },
          { label: "crm_lookup()", icon: "Search" },
        ],
        actions: [
          { icon: "Database", label: "Listing fetched", val: "3BHK · Bandra West · ₹1.2Cr" },
          { icon: "UserPlus", label: "Lead created", val: "CRM · Ravi Shah" },
          { icon: "FileText", label: "Transcript saved", val: "Full call recorded" },
          { icon: "Bell", label: "Agent notified", val: "Slack alert sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:03", dot: "pur", text: "Intent detected: property inquiry" },
          { t: "0:04", dot: "amb", text: "listing_search() called → 1 result" },
          { t: "0:04", dot: "amb", text: "crm_lookup() → new lead" },
          { t: "0:06", dot: "pur", text: "Response generated + spoken" },
          { t: "0:09", dot: "grn", text: "Lead logged in CRM · agent notified" },
        ],
        outcomes: [
          { icon: "PhoneCall", label: "Call answered", val: "< 2s" },
          { icon: "UserCheck", label: "Lead captured", val: "CRM updated" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 12s" },
        ],

      },
      {
        label: "Booking a visit",
        duration: "0:22",
        aiResponse: `"Your viewing is confirmed for Saturday at 11:00 AM at 42 Marine Drive. You'll receive a confirmation SMS shortly."`,
        messages: [
          { from: "caller", text: "I'd like to book a visit for the Marine Drive apartment." },
          { from: "ai", text: "Happy to help! I have Saturday 11am or Sunday 2pm available for that property. Which do you prefer?" },
          { from: "caller", text: "Saturday morning works." },
          { from: "ai", text: "Confirmed! Your visit is booked for Saturday 11 AM. Can I take your name and a contact number to send a reminder?" },
        ],
        caller: "Priya Mehta",
        num: "+91 90000 11223",
        av: "PM",
        intents: ["Booking intent", "2BHK · Worli · Sat", "Positive", "English", "High"],
        tools: [
          { label: "calendar_check()", icon: "CalendarDays" },
          { label: "slot_book()", icon: "CalendarCheck" },
          { label: "sms_send()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "CalendarCheck", label: "Slot booked", val: "Sat · 11:00 AM · Worli" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmation to Priya" },
          { icon: "Database", label: "CRM updated", val: "Viewing scheduled" },
          { icon: "UserCheck", label: "Agent assigned", val: "Amit K. notified" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:03", dot: "pur", text: "Intent: viewing request - Worli 2BHK" },
          { t: "0:04", dot: "amb", text: "calendar_check() → Sat 11am free" },
          { t: "0:05", dot: "amb", text: "slot_book() → confirmed" },
          { t: "0:05", dot: "amb", text: "sms_send() → confirmation dispatched" },
          { t: "0:07", dot: "grn", text: "Viewing booked · agent notified" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Viewing booked", val: "Sat 11 AM" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmed" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 58s" },
        ],
      },
      {
        label: "Lead qualification",
        duration: "0:25",
        aiResponse: `"Based on your answers, I've marked this as a hot lead and notified your agent. Expect a call within the hour."`,
        messages: [
          { from: "caller", text: "I'm looking for a 2BHK, budget around 80 lakhs." },
          { from: "ai", text: "Got it. Are you looking to move in within 3 months, or is this more of a long-term search?" },
          { from: "caller", text: "Within 3 months, ideally." },
          { from: "ai", text: "Perfect. Do you need a home loan, or are you planning a cash purchase? This helps me match the right listings for you." },
        ],
        caller: "Ankit Desai",
        num: "+91 77711 88990",
        av: "AD",
        intents: ["Lead qualification", "Budget ₹60L · 2mo", "Positive", "English", "High urgency"],
        tools: [
          { label: "lead_score()", icon: "BarChart2" },
          { label: "listing_match()", icon: "Search" },
          { label: "crm_create()", icon: "UserPlus" },
          { label: "agent_alert()", icon: "Bell" },
        ],
        actions: [
          { icon: "Flame", label: "Lead scored", val: "Hot · 94 / 100" },
          { icon: "Search", label: "3 listings matched", val: "₹55–62L range" },
          { icon: "UserPlus", label: "Lead created", val: "CRM · High priority" },
          { icon: "Bell", label: "Agent alerted", val: "Immediate callback" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:03", dot: "pur", text: "Intent: lead qualification · budget ₹60L" },
          { t: "0:04", dot: "amb", text: "lead_score() → 94/100 hot lead" },
          { t: "0:04", dot: "amb", text: "listing_match() → 3 results" },
          { t: "0:05", dot: "amb", text: "crm_create() → lead saved" },
          { t: "0:06", dot: "grn", text: "Agent alerted · callback scheduled" },
        ],
        outcomes: [
          { icon: "Flame", label: "Hot lead", val: "Score 94/100" },
          { icon: "ListChecks", label: "Listings matched", val: "3 properties" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 30s" },
        ],
      },
    ],
    useCases: [
      { title: "Property inquiries", description: "Answers questions on listings, pricing, availability, and amenities - instantly, any hour.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneIncoming" },
      { title: "Visit scheduling", description: "Books property viewings directly on the call - synced to your agent's calendar in real time.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Lead qualification", description: "Asks budget, timeline, and preference questions to score and route the hottest leads first.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Filter" },
      { title: "Follow-up reminders", description: "Calls back leads who didn't convert - automatically, with a personalised message.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "BellRing" },
      { title: "Rental applications", description: "Walks tenants through application steps and collects key details over the phone.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "FileText" },
      { title: "Tenant support", description: "Handles maintenance requests, payment queries, and lease questions without agent involvement.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],
    benefits: [
      { title: "Never miss an after-hours lead", description: "The AI answers every call at 11 pm on a Sunday - just like a top agent would at 9 am on Monday.", icon: "Clock" },
      { title: "Consistent scripts, every call", description: "Every caller hears the same professional, on-brand experience - regardless of volume or time of day.", icon: "MessageSquare" },
      { title: "Syncs with your CRM instantly", description: "Pushes lead data, notes, and booked slots into HubSpot, Salesforce, or Zoho automatically.", icon: "Plug" },
      { title: "Speaks every buyer's language", description: "Auto-detects the caller's language and responds naturally - across 100+ languages.", icon: "Languages" },
      { title: "Full visibility into call quality", description: "Transcripts, sentiment scores, and conversion rates for every call - in one dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your number, pick a real estate template, and your agent is live - no IT team needed.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×", label: "More qualified leads", sublabel: "Per month vs manual call handling" },
      { value: "80%", label: "Fewer missed calls", sublabel: "After switching to AI call handling" },
      { value: "40%", label: "More viewings booked", sublabel: "Via automated scheduling on calls" },
      { value: "$28K", label: "Saved per year", sublabel: "In staffing costs for a 5-agent office" },
    ],
    services: [
      {
        title: "Property Inquiries & Lead Qualification",
        description: "AI voice agents handle initial property inquiries, qualify leads based on buyer intent, and route serious prospects directly to sales teams.",
        icon: "Home"
      },
      {
        title: "Viewing Appointment Scheduling",
        description: "Confirms availability, schedules property showings, and sends reminders via voice, SMS, or WhatsApp.",
        icon: "CalendarCheck"
      },
      {
        title: "Market Updates & Notifications",
        description: "Clients receive real-time alerts on price changes, new listings, and local market trends.",
        icon: "TrendingUp"
      },
      {
        title: "Client Testimonials & Feedback Collection",
        description: "Automatically collect post-transaction testimonials and satisfaction surveys to build trust.",
        icon: "MessageCircle"
      },
      {
        title: "Lease Renewal Reminders",
        description: "Remind tenants of upcoming lease expirations and guide them through renewal options.",
        icon: "Repeat"
      },
      {
        title: "Property Maintenance Coordination",
        description: "Schedule maintenance appointments, coordinate service providers, and send updates to tenants.",
        icon: "Database"
      },
      {
        title: "Investment Opportunities Alerts",
        description: "Identify suitable properties for investors and deliver instant alerts matching investment criteria.",
        icon: "PieChart"
      },
      {
        title: "Closing Process Updates & Document Notifications",
        description: "Keep clients informed throughout the closing process, from document submissions to final approvals.",
        icon: "FileText"
      }
    ],
    testimonial: {
      quote: "We were losing leads every weekend. Since OnDial, our AI answers every call, qualifies the buyer, and books the viewing - before I've even had my morning coffee. Our conversion rate is up 40% in 3 months.",
      name: "Ravi Shah",
      role: "Principal Broker · Prestige Realty, Mumbai",
      initials: "RS",
    },
    ctaHeadline: "Hear your AI agent handle a real estate call",
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
    serviceHeadline: "Core Real Estate AI Voice Services",
    serviceSubheadline: "Streamline property management, lead engagement, and client communication with AI-powered voice solutions.",
    question: "Why AI Voice Agents in Real Estate Industry?",
  },

  "healthcare-and-medical-services": {
    question: "Why AI Voice Agents in Healthcare & Medical Industry?",
    headline: "Every patient call",
    headlineHighlight: "answered",
    subheadline: "Your AI calling agent books appointments, sends reminders, and handles follow-ups - 24/7, so your staff can focus on care.",
    stats: [
      { value: "60%", label: "Fewer no-shows" },
      { value: "24/7", label: "Patient availability" },
      { value: "90%", label: "Call resolution rate" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Appointment booking",
        duration: "1:05",
        aiResponse: "You're all set, Asha. Your appointment with Dr. Mehta is confirmed for Tuesday at 10:30 AM. A confirmation SMS has been sent to your number on file.",
        messages: [
          { from: "caller", text: "Hi, I'd like to book a general check-up with Dr. Mehta." },
          { from: "ai", text: "Of course - let me check Dr. Mehta's available slots for you." },
          { from: "ai", text: "I have three openings: Tuesday 10:30 AM, Tuesday 11:45 AM, or Thursday 2:00 PM. Which works best for you?" },
          { from: "caller", text: "Tuesday at 10:30 AM, please." },
          { from: "ai", text: "Great choice. To complete the booking, I'll need your patient ID and date of birth." },
          { from: "caller", text: "Patient ID PAT-48291, date of birth March 14, 1991." },
        ],
        caller: "Asha Sharma",
        num: "+91 98765 00112",
        av: "AS",
        availableSlots: ["Tue · 10:30 AM", "Tue · 11:45 AM", "Thu · 2:00 PM"],
        selectedSlot: "Tue · 10:30 AM",
        identityChecks: [
          { field: "Patient ID", value: "PAT-48291" },
          { field: "Date of birth", value: "14 Mar 1991" },
        ],
        intents: ["Appointment booking", "Dr. Mehta · check-up", "Positive", "English", "Normal"],
        tools: [
          { label: "schedule_fetch()", icon: "CalendarDays" },
          { label: "patient_verify()", icon: "Search" },
          { label: "appointment_book()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "CalendarCheck", label: "Slot booked", val: "Tue · 10:30 AM" },
          { icon: "UserCheck", label: "Patient verified", val: "PAT-48291" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmation to Asha" },
          { icon: "Database", label: "EHR updated", val: "Appt logged" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound call answered by AI" },
          { t: "0:03", dot: "pur", text: "Intent: book appointment with Dr. Mehta" },
          { t: "0:04", dot: "amb", text: "schedule_fetch() → 3 slots returned" },
          { t: "0:08", dot: "pur", text: "Caller selected Tue 10:30 AM" },
          { t: "0:10", dot: "amb", text: "patient_verify() → PAT-48291 matched" },
          { t: "0:12", dot: "grn", text: "appointment_book() → Confirmed in EHR" },
        ],
        outcomes: [
          { icon: "PhoneCall", label: "Answer time", val: "< 3s" },
          { icon: "CalendarCheck", label: "Appt booked", val: "Tue 10:30 AM" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
      {
        label: "Lab report request",
        duration: "1:10",
        aiResponse: "Your CBC panel results are ready. I've sent a secure report link to asha.sharma@gmail.com - it expires in 48 hours.",
        messages: [
          { from: "caller", text: "I'm calling to check if my blood test results are ready." },
          { from: "ai", text: "I can help with that. For security, may I have your patient ID or medical record number?" },
          { from: "caller", text: "It's PAT-77320." },
          { from: "ai", text: "Thank you. And your date of birth, please?" },
          { from: "caller", text: "June 8, 1985." },
          { from: "ai", text: "Verified. Your results are ready - should I send the secure report link to your email on file, or a different address?" },
          { from: "caller", text: "Send it to asha.sharma@gmail.com." },
        ],
        caller: "Asha Sharma",
        num: "+91 91234 56789",
        av: "AS",
        identityChecks: [
          { field: "Patient ID / MRN", value: "PAT-77320" },
          { field: "Date of birth", value: "08 Jun 1985" },
          { field: "Email", value: "asha.sharma@gmail.com" },
        ],
        intents: ["Lab results inquiry", "Identity verify", "Positive", "English", "Normal"],
        tools: [
          { label: "patient_verify()", icon: "Search" },
          { label: "records_lookup()", icon: "FileText" },
          { label: "secure_link_send()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "UserCheck", label: "Patient verified", val: "PAT-77320" },
          { icon: "FileText", label: "Report found", val: "CBC panel · ready" },
          { icon: "MessageSquare", label: "Secure link sent", val: "asha.sharma@gmail.com" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound call answered by AI" },
          { t: "0:02", dot: "pur", text: "Intent: lab results inquiry" },
          { t: "0:04", dot: "amb", text: "patient_verify() → ID + DOB matched" },
          { t: "0:06", dot: "amb", text: "records_lookup() → CBC results ready" },
          { t: "0:09", dot: "grn", text: "secure_link_send() → Email dispatched" },
        ],
        outcomes: [
          { icon: "FileText", label: "Report status", val: "Ready" },
          { icon: "MessageSquare", label: "Link delivered", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 10s" },
        ],
      },
      {
        label: "Order tracking",
        duration: "0:55",
        aiResponse: "Your lab order LAB-22941 was processed yesterday. Results are finalized - I've emailed a copy to vikram.rao@email.com and updated your patient portal.",
        messages: [
          { from: "caller", text: "What's the status of my lab order from last week?" },
          { from: "ai", text: "I can look that up. What's your order reference number or patient ID?" },
          { from: "caller", text: "Order reference LAB-22941." },
          { from: "ai", text: "Got it. For verification, what's the email address on your account?" },
          { from: "caller", text: "vikram.rao@email.com." },
        ],
        caller: "Vikram Rao",
        num: "+91 88888 77777",
        av: "VR",
        identityChecks: [
          { field: "Order reference", value: "LAB-22941" },
          { field: "Email", value: "vikram.rao@email.com" },
        ],
        intents: ["Order status", "Lab tracking", "Neutral", "English", "Normal"],
        tools: [
          { label: "order_lookup()", icon: "Search" },
          { label: "patient_verify()", icon: "UserCheck" },
          { label: "portal_update()", icon: "Database" },
        ],
        actions: [
          { icon: "Search", label: "Order matched", val: "LAB-22941" },
          { icon: "UserCheck", label: "Email verified", val: "vikram.rao@email.com" },
          { icon: "FileText", label: "Status updated", val: "Results finalized" },
          { icon: "MessageSquare", label: "Email sent", val: "Report copy delivered" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound call answered by AI" },
          { t: "0:02", dot: "pur", text: "Intent: lab order status check" },
          { t: "0:04", dot: "amb", text: "order_lookup(LAB-22941) → found" },
          { t: "0:06", dot: "amb", text: "patient_verify() → email confirmed" },
          { t: "0:08", dot: "grn", text: "portal_update() → status + email sent" },
        ],
        outcomes: [
          { icon: "Search", label: "Order tracked", val: "LAB-22941" },
          { icon: "FileText", label: "Status", val: "Finalized" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 55s" },
        ],
      },
    ],
    useCases: [
      { title: "Appointment booking", description: "Books and reschedules patient appointments instantly - synced to your clinic calendar in real time.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "CalendarDays" },
      { title: "Reminder calls", description: "Reduces no-shows by calling patients 24–48 hours before their appointment automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Lab result follow-ups", description: "Notifies patients when results are ready and routes complex queries to clinical staff.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "FileText" },
      { title: "Prescription refills", description: "Handles refill requests and routes urgent cases to the prescribing doctor automatically.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Pill" },
      { title: "Insurance queries", description: "Answers coverage and pre-auth questions without tying up your front-desk staff.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "ShieldCheck" },
      { title: "Post-visit follow-up", description: "Checks in on patients after procedures, collects feedback, and flags concerns to clinicians.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],
    benefits: [
      { title: "24/7 patient access", description: "Patients can book or change appointments at 2 AM - without waking your reception team.", icon: "Clock" },
      { title: "Reduce administrative load", description: "Free your staff from routine scheduling calls so they can focus on in-clinic patient care.", icon: "MessageSquare" },
      { title: "EHR & calendar sync", description: "Pushes appointment data directly into your practice management system automatically.", icon: "Plug" },
      { title: "Multilingual support", description: "Communicates in the patient's preferred language across 100+ languages seamlessly.", icon: "Languages" },
      { title: "Compliance-ready transcripts", description: "Every call is logged, transcribed, and stored in line with healthcare data requirements.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your clinic number, choose a healthcare template, and you're live - no IT needed.", icon: "Settings" },
    ],
    outcomes: [
      { value: "60%", label: "Fewer no-shows", sublabel: "Via automated reminder calls" },
      { value: "3×", label: "More appointments", sublabel: "Booked outside working hours" },
      { value: "85%", label: "Patient satisfaction", sublabel: "Score after switching to AI" },
      { value: "$22K", label: "Saved per year", sublabel: "In admin staffing per clinic" },
    ],
    services: [
      {
        title: "Appointment Confirmations",
        description: "Automated calls help patients remember appointments, reducing no-shows and improving clinic efficiency.",
        icon: "CalendarCheck"
      },
      {
        title: "Prescription Reminders",
        description: "Voice agents notify patients about refills, dosage timings, and renewal requirements, improving medication adherence and treatment outcomes.",
        icon: "Pill"
      },
      {
        title: "Patient Follow-ups",
        description: "AI voice agents check in with patients post-treatment, ensuring recovery progress while minimizing the burden on doctors and nurses.",
        icon: "UserCheck"
      },
      {
        title: "Insurance Claims Processing",
        description: "Streamline insurance operations with automated claim status updates, documentation requests, and eligibility confirmations.",
        icon: "ClipboardCheck"
      },
      {
        title: "Lab Results Notifications",
        description: "Deliver test results quickly and securely. Patients receive clear voice notifications along with next-step instructions.",
        icon: "Bell"
      },
      {
        title: "Preventive Care Reminders",
        description: "Proactively remind patients about vaccinations, annual check-ups, and screenings to support preventive healthcare strategies.",
        icon: "ShieldCheck"
      },
      {
        title: "Surgery Pre/Post Care",
        description: "Automated voice guidance ensures patients receive proper instructions before and after surgery, reducing risks and complications.",
        icon: "Clock"
      },
      {
        title: "Chronic Disease Management",
        description: "Ongoing voice check-ins for diabetes, hypertension, and other chronic conditions help patients stay consistent with their treatment plans.",
        icon: "Repeat"
      }
    ],
    testimonial: {
      quote: "Our front desk was overwhelmed with appointment calls. OnDial now handles 70% of all bookings automatically. Our staff are happier and patients love the instant response.",
      name: "Dr. Priya Nair",
      role: "Medical Director · Wellness First Clinics, Bangalore",
      initials: "PN",
    },
    ctaHeadline: "Hear your AI agent handle a patient call",
    ctaSubheadline: "Free 14-day trial. No credit card. HIPAA-friendly setup in under 30 minutes.",
    serviceHeadline: "Core Healthcare & Medical AI Voice Services",
    serviceSubheadline: "Transform healthcare operations with AI-powered voice solutions.",
  },

  "insurance-services": {
    headline: "Every policy call",
    headlineHighlight: "handled",
    subheadline: "Your AI agent answers renewals, claims inquiries, and premium reminders - 24/7, so your advisors can focus on complex cases.",
    stats: [
      { value: "70%", label: "Faster claims triage" },
      { value: "24/7", label: "Policy support coverage" },
      { value: "85%", label: "First-call resolution" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Policy renewal",
        duration: "0:22",
        aiResponse: `"Your policy is due for renewal on July 15th. I've sent the updated premium details to your email. Would you like to confirm renewal now?"`,
        messages: [
          { from: "caller", text: "Hi, I got a notice about my policy renewal. Can you help?" },
          { from: "ai", text: "Of course! Your motor policy ending in 4521 is due on July 15th. Your new premium is ₹12,400. Shall I send the details to your registered email?" },
          { from: "caller", text: "Yes, please. And can I pay online?" },
          { from: "ai", text: "Absolutely. I've sent a secure payment link to your email and mobile. Is there anything else I can help you with?" },
        ],
        caller: "Arjun Nair",
        num: "+91 99887 65432",
        av: "AN",
        intents: ["Policy renewal", "Motor policy #4521", "Positive", "English", "Normal"],
        tools: [
          { label: "policy_lookup()", icon: "Search" },
          { label: "premium_calc()", icon: "BarChart2" },
          { label: "email_send()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Policy fetched", val: "Motor #4521 · Due Jul 15" },
          { icon: "MessageSquare", label: "Email dispatched", val: "Premium + payment link" },
          { icon: "FileText", label: "Renewal logged", val: "CRM updated" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound call answered by AI" },
          { t: "0:02", dot: "pur", text: "Intent: policy renewal inquiry" },
          { t: "0:03", dot: "amb", text: "policy_lookup() → Motor #4521" },
          { t: "0:04", dot: "amb", text: "premium_calc() → ₹12,400" },
          { t: "0:06", dot: "grn", text: "email_send() → Payment link sent" },
        ],
        outcomes: [
          { icon: "PhoneCall", label: "Answer time", val: "< 3s" },
          { icon: "FileText", label: "Renewal email", val: "Sent" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
      {
        label: "Claim status check",
        duration: "0:18",
        aiResponse: `"Your claim #CLM-9823 is currently under assessment. The expected resolution date is June 20th. I've sent the status update to your email."`,
        messages: [
          { from: "caller", text: "I want to check the status of my insurance claim." },
          { from: "ai", text: "Sure! Could I have your policy number or claim reference?" },
          { from: "caller", text: "It's CLM-9823." },
          { from: "ai", text: "Your claim is under assessment - estimated resolution by June 20th. Shall I email you the full status report?" },
        ],
        caller: "Sonia Patel",
        num: "+91 98877 11223",
        av: "SP",
        intents: ["Claim status", "Claim #CLM-9823", "Neutral", "English", "Normal"],
        tools: [
          { label: "claim_lookup()", icon: "Search" },
          { label: "status_fetch()", icon: "Database" },
        ],
        actions: [
          { icon: "Search", label: "Claim found", val: "#CLM-9823 · Under review" },
          { icon: "FileText", label: "Status emailed", val: "Resolution: Jun 20" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:02", dot: "pur", text: "Intent: claim status inquiry" },
          { t: "0:03", dot: "amb", text: "claim_lookup(CLM-9823) → found" },
          { t: "0:05", dot: "grn", text: "Status shared + email sent" },
        ],
        outcomes: [
          { icon: "Search", label: "Claim matched", val: "#CLM-9823" },
          { icon: "Bell", label: "Status update", val: "Emailed" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 55s" },
        ],
      },
      {
        label: "Premium reminder",
        duration: "0:15",
        aiResponse: `"Your premium of ₹8,200 is due in 3 days. I've sent the payment link to your mobile. Shall I connect you to an advisor for any queries?"`,
        messages: [
          { from: "ai", text: "Hello, this is a reminder that your health policy premium of ₹8,200 is due on June 14th." },
          { from: "caller", text: "Yes, I was going to pay. Can I get a payment link?" },
          { from: "ai", text: "I've just sent a secure payment link to your registered mobile. It'll be valid for 48 hours." },
          { from: "caller", text: "Perfect, thank you!" },
        ],
        caller: "Rahul Desai",
        num: "+91 91234 77890",
        av: "RD",
        intents: ["Premium due", "Health policy", "Positive", "English", "Normal"],
        tools: [
          { label: "policy_fetch()", icon: "Search" },
          { label: "sms_payment()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "MessageSquare", label: "SMS sent", val: "Payment link dispatched" },
          { icon: "FileText", label: "Log updated", val: "Reminder confirmed" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound reminder call placed" },
          { t: "0:02", dot: "pur", text: "Caller engaged - payment intent" },
          { t: "0:03", dot: "amb", text: "sms_payment() → Link sent" },
          { t: "0:05", dot: "grn", text: "Payment reminder logged" },
        ],
        outcomes: [
          { icon: "Bell", label: "Reminder sent", val: "Success" },
          { icon: "MessageSquare", label: "Pay link", val: "SMS dispatched" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 42s" },
        ],
      },
    ],
    useCases: [
      { title: "Policy renewals", description: "Proactively calls policyholders before expiry, shares premium details, and sends payment links.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "FileText" },
      { title: "Claims triage", description: "Collects claim details, assigns reference numbers, and routes complex cases to adjusters.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "ShieldCheck" },
      { title: "Premium reminders", description: "Sends automated reminder calls with payment links before policy lapses occur.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BellRing" },
      { title: "Coverage questions", description: "Answers FAQs on coverage, exclusions, and deductibles without waiting for an agent.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "MessageSquare" },
      { title: "Document collection", description: "Guides policyholders through uploading KYC or claim documents via automated prompts.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Database" },
      { title: "Customer retention", description: "Re-engages lapsed or at-risk policyholders with personalised outbound calls.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],
    benefits: [
      { title: "24/7 policy support", description: "Policyholders get instant answers at any hour - no hold queues, no lost calls.", icon: "Clock" },
      { title: "Reduce lapse rates", description: "Automated premium reminders with payment links cut policy lapses by up to 35%.", icon: "BellRing" },
      { title: "CRM & policy system sync", description: "Pushes call outcomes and updates directly into your policy management platform.", icon: "Plug" },
      { title: "Multilingual support", description: "Handles customers in their preferred language across 100+ languages automatically.", icon: "Languages" },
      { title: "Compliance-ready call logs", description: "Every call is recorded and transcribed in line with IRDAI and data regulations.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your number, choose an insurance template, and your AI is live instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "35%", label: "Fewer policy lapses", sublabel: "Via automated premium reminders" },
      { value: "70%", label: "Faster claims triage", sublabel: "Compared to manual intake process" },
      { value: "85%", label: "First-call resolution", sublabel: "On routine policy inquiries" },
      { value: "$30K", label: "Saved per year", sublabel: "In call centre staffing costs" },
    ],
    services: [
      {
        title: "Policy Renewals",
        description: "Automated AI voice agents send reminders, explain updated terms, and guide policyholders through seamless renewals.",
        icon: "Repeat"
      },
      {
        title: "Claims Processing",
        description: "Policyholders can check claim status, submit documentation requests via voice, and receive real-time updates.",
        icon: "ClipboardCheck"
      },
      {
        title: "Premium Payment Alerts",
        description: "Remind customers of due dates and set up automated payment schedules to reduce missed premiums.",
        icon: "CreditCard"
      },
      {
        title: "Risk Assessments",
        description: "Schedule property inspections, health screenings, and safety checks through AI voice automation.",
        icon: "ShieldCheck"
      },
      {
        title: "Coverage Reviews",
        description: "Conduct annual reviews, explain coverage gaps, and recommend policy upgrades based on customer needs.",
        icon: "FileText"
      },
      {
        title: "Claim Settlement",
        description: "Provide transparent payout notifications, settlement explanations, and timely status updates.",
        icon: "DollarSign"
      },
      {
        title: "New Product Offers",
        description: "Upsell or cross-sell policies by offering personalized coverage options at the right moment.",
        icon: "Gift"
      },
      {
        title: "Beneficiary Updates",
        description: "Ensure beneficiary details remain accurate with annual voice reminders, preventing disputes during claims.",
        icon: "UserCheck"
      }
    ],
    testimonial: {
      quote: "OnDial handles our renewal reminders and claim status calls completely on autopilot. Our advisors now only deal with complex cases. Policy lapse rates are down 30% since we started.",
      name: "Vikram Mehra",
      role: "VP Operations · SecureShield Insurance",
      initials: "VM",
    },
    ctaHeadline: "Hear your AI agent handle an insurance call",
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
    serviceHeadline: "Core Insurance AI Voice Services",
    serviceSubheadline: "Streamline policy management, claims processing, and customer engagement with AI-powered voice solutions.",
  },

  "financial-and-banking-services": {
    headline: "Every banking call",
    headlineHighlight: "resolved",
    subheadline: "Your AI calling agent handles balance inquiries, payment reminders, fraud alerts, and loan queries - securely, 24/7.",
    stats: [
      { value: "90%", label: "Routine call automation" },
      { value: "24/7", label: "Banking support" },
      { value: "60%", label: "Cost per call reduction" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Payment reminder",
        duration: "0:18",
        aiResponse: `"Your EMI of ₹14,500 is due on June 15th. I've sent the payment link to your registered mobile. Would you like to speak with a loan officer?"`,
        messages: [
          { from: "ai", text: "Hello, this is a reminder from First National Bank. Your loan EMI of ₹14,500 is due on June 15th." },
          { from: "caller", text: "Yes, I was planning to pay. Can I get the payment details?" },
          { from: "ai", text: "I've sent a secure payment link to your mobile number ending in 4521. It's valid for 24 hours." },
          { from: "caller", text: "Got it, thanks." },
        ],
        caller: "Amit Kumar",
        num: "+91 98877 00112",
        av: "AK",
        intents: ["EMI reminder", "Loan account", "Positive", "English", "Normal"],
        tools: [
          { label: "account_fetch()", icon: "Database" },
          { label: "sms_link()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Database", label: "Account fetched", val: "Loan acc #L-4521" },
          { icon: "MessageSquare", label: "SMS sent", val: "Payment link dispatched" },
          { icon: "FileText", label: "Call logged", val: "Reminder confirmed" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound EMI reminder placed" },
          { t: "0:02", dot: "pur", text: "Caller engaged" },
          { t: "0:03", dot: "amb", text: "account_fetch() → Loan #L-4521" },
          { t: "0:04", dot: "amb", text: "sms_link() → Payment link sent" },
          { t: "0:06", dot: "grn", text: "Reminder logged in CRM" },
        ],
        outcomes: [
          { icon: "Bell", label: "Reminder", val: "Delivered" },
          { icon: "MessageSquare", label: "SMS link", val: "Sent" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 48s" },
        ],
      },
      {
        label: "Fraud alert",
        duration: "0:15",
        aiResponse: `"We've detected a suspicious transaction of ₹25,000 on your card ending in 8811. Press 1 to confirm this was you, or press 2 to block your card immediately."`,
        messages: [
          { from: "ai", text: "This is an urgent alert from your bank. A transaction of ₹25,000 was attempted on your card ending 8811. Did you authorise this?" },
          { from: "caller", text: "No! I did not." },
          { from: "ai", text: "I've immediately blocked your card and raised a fraud dispute. Your replacement card will arrive in 3–5 business days. You'll receive an SMS confirmation now." },
        ],
        caller: "Priya Singh",
        num: "+91 90000 88811",
        av: "PS",
        intents: ["Fraud dispute", "Card block", "Urgent", "English", "High urgency"],
        tools: [
          { label: "txn_verify()", icon: "ShieldCheck" },
          { label: "card_block()", icon: "Database" },
          { label: "dispute_raise()", icon: "FileText" },
        ],
        actions: [
          { icon: "ShieldCheck", label: "Txn flagged", val: "₹25,000 · Card 8811" },
          { icon: "Database", label: "Card blocked", val: "Immediate block applied" },
          { icon: "FileText", label: "Dispute raised", val: "Case #FRD-7721" },
          { icon: "Bell", label: "SMS sent", val: "Confirmation dispatched" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound fraud alert placed" },
          { t: "0:02", dot: "pur", text: "Caller confirmed: NOT authorised" },
          { t: "0:03", dot: "amb", text: "card_block() → Immediate block" },
          { t: "0:04", dot: "amb", text: "dispute_raise() → Case #FRD-7721" },
          { t: "0:05", dot: "grn", text: "SMS confirmation sent" },
        ],
        outcomes: [
          { icon: "ShieldCheck", label: "Card blocked", val: "< 1 min" },
          { icon: "FileText", label: "Dispute raised", val: "#FRD-7721" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 55s" },
        ],
      },
      {
        label: "Loan inquiry",
        duration: "0:25",
        aiResponse: `"Based on your profile, you're eligible for a personal loan of up to ₹5 lakh at 10.5% p.a. I've scheduled a call with our loan officer for tomorrow at 11 AM."`,
        messages: [
          { from: "caller", text: "I'm interested in a personal loan. What are my options?" },
          { from: "ai", text: "Happy to help! Could I pull up your account to check your pre-approved offers?" },
          { from: "caller", text: "Sure, go ahead." },
          { from: "ai", text: "You're pre-approved for up to ₹5 lakh at 10.5% p.a. for 36 months. Would you like to speak with a loan specialist to proceed?" },
        ],
        caller: "Rohan Joshi",
        num: "+91 91234 56780",
        av: "RJ",
        intents: ["Loan inquiry", "Personal loan", "Positive", "English", "High"],
        tools: [
          { label: "eligibility_check()", icon: "BarChart2" },
          { label: "offer_fetch()", icon: "Database" },
          { label: "callback_book()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "BarChart2", label: "Eligible", val: "Up to ₹5L · 10.5% p.a." },
          { icon: "CalendarCheck", label: "Callback booked", val: "Tomorrow · 11:00 AM" },
          { icon: "UserPlus", label: "Lead created", val: "CRM · High priority" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:03", dot: "pur", text: "Intent: personal loan inquiry" },
          { t: "0:04", dot: "amb", text: "eligibility_check() → ₹5L approved" },
          { t: "0:05", dot: "amb", text: "callback_book() → Tomorrow 11 AM" },
          { t: "0:07", dot: "grn", text: "Lead logged · specialist alerted" },
        ],
        outcomes: [
          { icon: "BarChart2", label: "Offer matched", val: "₹5L approved" },
          { icon: "CalendarCheck", label: "Callback booked", val: "Tomorrow 11 AM" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 20s" },
        ],
      },
    ],
    useCases: [
      { title: "EMI & payment reminders", description: "Proactively reminds customers of upcoming EMIs and sends secure payment links automatically.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "BellRing" },
      { title: "Fraud alerts & blocking", description: "Instantly notifies customers of suspicious transactions and enables card blocking on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "ShieldCheck" },
      { title: "Loan & credit inquiries", description: "Checks eligibility, presents offers, and books specialist callbacks in one seamless call.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BarChart2" },
      { title: "Balance & statement queries", description: "Provides balances, mini-statements, and transaction history over voice - securely.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Database" },
      { title: "KYC follow-ups", description: "Reminds customers to complete KYC verification and guides them through the process.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "UserCheck" },
      { title: "Customer onboarding", description: "Walks new customers through account setup and collects required information on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserPlus" },
    ],
    benefits: [
      { title: "Secure by design", description: "All calls are encrypted and compliant with RBI, PCI-DSS, and banking data regulations.", icon: "ShieldCheck" },
      { title: "Zero missed payments", description: "Automated EMI reminders with payment links reduce delinquency before it happens.", icon: "BellRing" },
      { title: "Core banking integration", description: "Connects to your CBS, CRM, and fraud systems for real-time data on every call.", icon: "Plug" },
      { title: "Multilingual banking support", description: "Serves customers in 100+ languages - regional language support built in.", icon: "Languages" },
      { title: "Full audit trail", description: "Every interaction is logged, transcribed, and stored for compliance and quality review.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No engineering work required - connect your number and go live with a banking template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "90%", label: "Routine calls automated", sublabel: "Freeing advisors for complex cases" },
      { value: "60%", label: "Cost per call reduced", sublabel: "Vs traditional call centre handling" },
      { value: "40%", label: "Lower delinquency rate", sublabel: "On EMI accounts with reminders" },
      { value: "$45K", label: "Saved per year", sublabel: "Across a 20-seat call centre" },
    ],
    services: [
      {
        title: "Payment Reminders",
        description: "Reduce missed payments with automated AI calls that remind customers about upcoming due dates and overdue bills.",
        icon: "CreditCard"
      },
      {
        title: "Fraud Detection Alerts",
        description: "Enhance account safety with instant voice alerts for suspicious activities, transactions, or login attempts.",
        icon: "ShieldAlert"
      },
      {
        title: "Loan Follow-ups",
        description: "Simplify loan processes with proactive updates on application status, EMI schedules, and document submissions.",
        icon: "FileText"
      },
      {
        title: "Account Alerts",
        description: "Keep customers informed with balance updates, transaction confirmations, and spending limit warnings in real time.",
        icon: "Bell"
      },
      {
        title: "Credit Score Updates",
        description: "AI voice agents provide monthly credit report summaries and personalized improvement tips, boosting financial literacy.",
        icon: "TrendingUp"
      },
      {
        title: "Investment Portfolio Reviews",
        description: "Offer performance insights, risk alerts, and rebalancing recommendations to keep customers engaged.",
        icon: "PieChart"
      },
      {
        title: "Insurance Premium Reminders",
        description: "Automate policy renewal notifications and premium due alerts, reducing lapses in coverage.",
        icon: "CalendarCheck"
      },
      {
        title: "Mortgage Payment Assistance",
        description: "Support customers with refinancing opportunities, EMI reminders, and personalized repayment options.",
        icon: "Home"
      }
    ],
    testimonial: {
      quote: "OnDial handles our payment reminders, fraud alerts, and loan pre-qualification calls with zero human intervention. Collections improved 38% in the first quarter.",
      name: "Aisha Kapoor",
      role: "Head of Digital Banking · Horizon Bank",
      initials: "AK",
    },
    ctaHeadline: "Hear your AI agent handle a banking call",
    ctaSubheadline: "Free 14-day trial. No credit card. Secure banking setup in under 30 minutes.",
    serviceHeadline: "Core Financial & Banking AI Voice Services",
    serviceSubheadline: "Enhance financial operations and customer engagement with AI-powered voice solutions.",
  },

  "call-center-and-bpo-services": {
    headline: "Scale your call centre",
    headlineHighlight: "with AI",
    subheadline: "Your AI agent handles tier-1 calls, routes complex queries, and completes post-call work - so your team can focus on what matters.",
    stats: [
      { value: "3×", label: "More calls handled per agent" },
      { value: "50%", label: "AHT reduction" },
      { value: "24/7", label: "Blended AI + human coverage" },
      { value: "95%", label: "Call answer rate" },
    ],
    demoScenarios: [
      {
        label: "Customer support",
        duration: "0:20",
        aiResponse: `"I can see your order #ORD-5521 is delayed due to a courier issue. I've raised an escalation and you'll receive a delivery update within 2 hours."`,
        messages: [
          { from: "caller", text: "Hi, I've been waiting for my order for 5 days. What's going on?" },
          { from: "ai", text: "I'm sorry to hear that! Let me pull up your order. Could I have your order number or registered email?" },
          { from: "caller", text: "It's ORD-5521." },
          { from: "ai", text: "Your order is delayed at the courier hub due to a weather disruption. I've raised a priority escalation - you'll get an update within 2 hours. I apologise for the inconvenience." },
        ],
        caller: "Priya Sharma",
        num: "+91 98765 11223",
        av: "PS",
        intents: ["Order delay", "Complaint", "Negative", "English", "High urgency"],
        tools: [
          { label: "order_lookup()", icon: "Search" },
          { label: "escalate_ticket()", icon: "FileText" },
          { label: "notify_courier()", icon: "Bell" },
        ],
        actions: [
          { icon: "Search", label: "Order found", val: "#ORD-5521 · Delayed" },
          { icon: "FileText", label: "Escalation raised", val: "Priority ticket #ESC-112" },
          { icon: "Bell", label: "Courier notified", val: "Resolution in 2 hrs" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound complaint call answered" },
          { t: "0:02", dot: "pur", text: "Intent: order delay complaint" },
          { t: "0:03", dot: "amb", text: "order_lookup(ORD-5521) → delayed" },
          { t: "0:04", dot: "amb", text: "escalate_ticket() → #ESC-112" },
          { t: "0:06", dot: "grn", text: "Courier notified · customer informed" },
        ],
        outcomes: [
          { icon: "FileText", label: "Ticket raised", val: "#ESC-112" },
          { icon: "Bell", label: "Courier alerted", val: "2-hr SLA set" },
          { icon: "Star", label: "CSAT", val: "4.7 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 10s" },
        ],
      },
      {
        label: "Complaint resolution",
        duration: "0:22",
        aiResponse: `"I've logged your complaint and assigned it reference #CMP-8811. A senior agent will call you within 4 hours to resolve this."`,
        messages: [
          { from: "caller", text: "I want to raise a formal complaint about your billing." },
          { from: "ai", text: "I understand, and I'm sorry for the trouble. Could you describe the issue so I can log it accurately?" },
          { from: "caller", text: "I was charged twice for the same service last month." },
          { from: "ai", text: "I've raised a formal complaint - reference #CMP-8811. A senior agent will contact you within 4 hours and the duplicate charge will be reversed." },
        ],
        caller: "Aditya Rao",
        num: "+91 90000 22334",
        av: "AR",
        intents: ["Billing complaint", "Double charge", "Negative", "English", "High"],
        tools: [
          { label: "billing_lookup()", icon: "Database" },
          { label: "complaint_log()", icon: "FileText" },
          { label: "callback_schedule()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "Database", label: "Billing checked", val: "Duplicate charge found" },
          { icon: "FileText", label: "Complaint logged", val: "#CMP-8811 raised" },
          { icon: "CalendarCheck", label: "Callback scheduled", val: "Senior agent · 4 hrs" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound call answered by AI" },
          { t: "0:02", dot: "pur", text: "Intent: billing complaint" },
          { t: "0:03", dot: "amb", text: "billing_lookup() → duplicate found" },
          { t: "0:04", dot: "amb", text: "complaint_log() → #CMP-8811" },
          { t: "0:06", dot: "grn", text: "Senior callback scheduled" },
        ],
        outcomes: [
          { icon: "FileText", label: "Complaint", val: "#CMP-8811" },
          { icon: "CalendarCheck", label: "Callback", val: "< 4 hrs" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 25s" },
        ],
      },
      {
        label: "Survey call",
        duration: "0:18",
        aiResponse: `"Thank you for your time! Based on your feedback, we'll follow up with recommendations tailored to your experience."`,
        messages: [
          { from: "ai", text: "Hello, I'm calling on behalf of TechServ to gather your feedback on your recent support experience. This will take under 2 minutes." },
          { from: "caller", text: "Sure, go ahead." },
          { from: "ai", text: "On a scale of 1 to 10, how satisfied were you with the resolution of your issue?" },
          { from: "caller", text: "About a 7. The wait time was too long." },
          { from: "ai", text: "Thank you for that feedback. I've noted your concern about wait times. We'll use this to improve our service." },
        ],
        caller: "Neha Gupta",
        num: "+91 91234 00112",
        av: "NG",
        intents: ["CSAT survey", "Wait time concern", "Neutral", "English", "Normal"],
        tools: [
          { label: "survey_log()", icon: "FileText" },
          { label: "crm_update()", icon: "Database" },
        ],
        actions: [
          { icon: "FileText", label: "Response logged", val: "CSAT score: 7/10" },
          { icon: "Database", label: "CRM updated", val: "Feedback tagged" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound survey call placed" },
          { t: "0:03", dot: "pur", text: "Caller engaged" },
          { t: "0:05", dot: "amb", text: "survey_log() → CSAT 7/10" },
          { t: "0:06", dot: "grn", text: "Feedback saved to CRM" },
        ],
        outcomes: [
          { icon: "FileText", label: "Survey done", val: "CSAT 7/10" },
          { icon: "Database", label: "CRM updated", val: "Feedback tagged" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
    ],
    useCases: [
      { title: "Tier-1 call handling", description: "Resolves routine inquiries instantly - order status, FAQs, account info - without a human agent.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneIncoming" },
      { title: "Intelligent call routing", description: "Identifies caller intent and routes complex cases to the right agent or team automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Filter" },
      { title: "Complaint management", description: "Logs complaints, raises tickets, and schedules callbacks - all on the same call.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "FileText" },
      { title: "CSAT surveys", description: "Runs automated post-call satisfaction surveys and logs scores directly into your CRM.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "BarChart2" },
      { title: "Post-call wrap-up", description: "Completes call summaries, CRM updates, and ticket creation automatically after each call.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "CheckCheck" },
      { title: "Outbound campaigns", description: "Runs proactive outreach at scale - renewals, follow-ups, and win-back campaigns.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
    ],
    benefits: [
      { title: "Handle 3× more volume", description: "AI handles tier-1 calls while your agents focus on complex, high-value interactions.", icon: "PhoneIncoming" },
      { title: "Cut AHT by 50%", description: "Automated call summaries and CRM sync eliminate post-call work for every agent.", icon: "Clock" },
      { title: "CRM & ticketing integration", description: "Works with Salesforce, Zendesk, Freshdesk, and all major platforms out of the box.", icon: "Plug" },
      { title: "100+ language support", description: "Serve customers in their native language - multilingual handling built in.", icon: "Languages" },
      { title: "Real-time dashboards", description: "Live call monitoring, agent metrics, CSAT scores, and resolution rates in one place.", icon: "BarChart2" },
      { title: "Deploy in under 30 minutes", description: "No coding needed - connect your telephony and go live with a BPO-ready template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×", label: "More calls handled", sublabel: "Per agent per day vs before" },
      { value: "50%", label: "AHT reduction", sublabel: "Via AI-assisted call flows" },
      { value: "95%", label: "Call answer rate", sublabel: "Even at peak volume spikes" },
      { value: "$60K", label: "Saved per year", sublabel: "Across a 50-seat BPO team" },
    ],
    services: [
      {
        title: "Lead Qualification",
        description: "AI voice agents qualify prospects using multi-criteria evaluation and scoring, ensuring sales teams focus on high-value leads.",
        icon: "UserCheck"
      },
      {
        title: "Customer Feedback Collection",
        description: "Automated voice surveys collect real-time customer satisfaction insights to improve services.",
        icon: "MessageCircle"
      },
      {
        title: "Data Verification",
        description: "Agents validate and update customer contact details while ensuring record accuracy.",
        icon: "Database"
      },
      {
        title: "Query Resolution",
        description: "AI-powered bots resolve basic customer service inquiries instantly, freeing human agents for complex cases.",
        icon: "HelpCircle"
      },
      {
        title: "Compliance Support",
        description: "Stay updated with regulatory requirements, notifications, and documentation through automated voice reminders.",
        icon: "ShieldCheck"
      },
      {
        title: "Survey Campaigns",
        description: "Run market research and customer preference surveys faster with voice automation.",
        icon: "BarChart2"
      },
      {
        title: "Appointment Setting",
        description: "Schedule cross-department meetings with AI-driven appointment setting.",
        icon: "CalendarCheck"
      },
      {
        title: "Quality Assurance",
        description: "Track and evaluate service delivery performance through AI-driven monitoring and feedback.",
        icon: "TrendingUp"
      }
    ],
    testimonial: {
      quote: "We deployed OnDial for our BPO's tier-1 queue. Within 2 weeks, the AI was handling 60% of all inbound calls. Our agents now only touch escalations. CSAT went up, not down.",
      name: "Riya Bose",
      role: "Operations Head · SwiftCare BPO, Hyderabad",
      initials: "RB",
    },
    ctaHeadline: "Hear your AI agent handle a support call",
    ctaSubheadline: "Free 14-day trial. No credit card. BPO-ready in under 30 minutes.",
    serviceHeadline: "Core Call Centers & BPO AI Voice Services",
    serviceSubheadline: "Enhance customer support, operational efficiency, and compliance with AI-powered voice agents.",
  },

  "travel-and-tourism-services": {
    headline: "Every travel inquiry",
    headlineHighlight: "answered instantly",
    subheadline: "Your AI agent books trips, confirms reservations, handles cancellations, and sends real-time travel alerts - 24/7.",
    stats: [
      { value: "4×", label: "More bookings captured" },
      { value: "24/7", label: "Travel support coverage" },
      { value: "70%", label: "Fewer missed inquiries" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Booking confirmation",
        duration: "0:20",
        aiResponse: `"Your Goa trip is confirmed for December 20–25. You'll receive a full itinerary and hotel vouchers on your email within minutes."`,
        messages: [
          { from: "caller", text: "I'd like to confirm my Goa package booking for December." },
          { from: "ai", text: "Of course! I can see your booking reference GW-4821 for Goa from Dec 20–25 for 2 adults. Shall I confirm and send the vouchers?" },
          { from: "caller", text: "Yes please." },
          { from: "ai", text: "Done! Your hotel vouchers and itinerary are on their way to your email. Have a wonderful trip!" },
        ],
        caller: "Kavya Reddy",
        num: "+91 98765 55555",
        av: "KR",
        intents: ["Booking confirmation", "Goa package Dec 20-25", "Positive", "English", "Normal"],
        tools: [
          { label: "booking_fetch()", icon: "Search" },
          { label: "email_send()", icon: "MessageSquare" },
          { label: "crm_update()", icon: "Database" },
        ],
        actions: [
          { icon: "Search", label: "Booking found", val: "#GW-4821 · Goa · Dec 20-25" },
          { icon: "MessageSquare", label: "Vouchers sent", val: "Email + hotel voucher" },
          { icon: "Database", label: "CRM updated", val: "Booking confirmed" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:02", dot: "pur", text: "Intent: booking confirmation" },
          { t: "0:03", dot: "amb", text: "booking_fetch(GW-4821) → found" },
          { t: "0:05", dot: "amb", text: "email_send() → Vouchers dispatched" },
          { t: "0:07", dot: "grn", text: "CRM updated · booking confirmed" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Booking", val: "Confirmed" },
          { icon: "MessageSquare", label: "Vouchers", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 55s" },
        ],
      },
      {
        label: "Flight delay alert",
        duration: "0:12",
        aiResponse: `"Your IndiGo flight 6E-201 to Mumbai has been delayed by 2 hours. Your new departure time is 4:30 PM. I've updated your ground transfer accordingly."`,
        messages: [
          { from: "ai", text: "Important travel alert: Your flight 6E-201 to Mumbai is delayed by 2 hours. New departure is 4:30 PM." },
          { from: "caller", text: "Oh no. Can you reschedule my airport transfer too?" },
          { from: "ai", text: "Already done! Your transfer is now booked for 3:00 PM. You'll receive a confirmation SMS shortly." },
        ],
        caller: "Rahul Sharma",
        num: "+91 91234 44444",
        av: "RS",
        intents: ["Flight delay", "Transfer reschedule", "Concerned", "English", "High urgency"],
        tools: [
          { label: "flight_status()", icon: "Search" },
          { label: "transfer_reschedule()", icon: "CalendarCheck" },
          { label: "sms_send()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Delay confirmed", val: "6E-201 · +2 hrs" },
          { icon: "CalendarCheck", label: "Transfer updated", val: "3:00 PM pickup" },
          { icon: "MessageSquare", label: "SMS sent", val: "New schedule" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound delay alert placed" },
          { t: "0:02", dot: "pur", text: "Caller requests transfer change" },
          { t: "0:03", dot: "amb", text: "transfer_reschedule() → 3:00 PM" },
          { t: "0:05", dot: "grn", text: "SMS confirmation sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Transfer rebooked", val: "3:00 PM" },
          { icon: "MessageSquare", label: "Alert sent", val: "SMS delivered" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 42s" },
        ],
      },
      {
        label: "Check-in reminder",
        duration: "0:15",
        aiResponse: `"Your online check-in for 6E-201 is now open. I've sent the check-in link to your email. Your seat preference has been noted."`,
        messages: [
          { from: "ai", text: "Hello! Online check-in for your Mumbai flight tomorrow is now open. Would you like me to send the check-in link?" },
          { from: "caller", text: "Yes please. Can I also request a window seat?" },
          { from: "ai", text: "I've sent the check-in link and noted your window seat preference. You can select it during check-in. Safe travels!" },
        ],
        caller: "Sunita Rao",
        num: "+91 99887 33222",
        av: "SR",
        intents: ["Check-in reminder", "Seat preference", "Positive", "English", "Normal"],
        tools: [
          { label: "checkin_link()", icon: "MessageSquare" },
          { label: "seat_note()", icon: "Database" },
        ],
        actions: [
          { icon: "MessageSquare", label: "Check-in link", val: "Email + SMS sent" },
          { icon: "Database", label: "Preference", val: "Window seat noted" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound check-in reminder" },
          { t: "0:02", dot: "pur", text: "Caller requests window seat" },
          { t: "0:03", dot: "amb", text: "checkin_link() → sent" },
          { t: "0:05", dot: "grn", text: "Seat preference logged" },
        ],
        outcomes: [
          { icon: "MessageSquare", label: "Check-in link", val: "Sent" },
          { icon: "Database", label: "Preference", val: "Noted" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 38s" },
        ],
      },
    ],
    useCases: [
      { title: "Booking confirmations", description: "Confirms trips, sends vouchers, and updates itineraries automatically on every call.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Flight & hotel alerts", description: "Proactively alerts travellers of delays, changes, and check-in windows before they need to call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Bell" },
      { title: "Cancellations & refunds", description: "Handles cancellation requests, calculates refunds, and initiates the process on the call.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "RotateCcw" },
      { title: "Upsell & add-ons", description: "Offers relevant upgrades, travel insurance, and add-ons during booking confirmation calls.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Star" },
      { title: "Travel inquiries", description: "Answers destination, visa, and package questions instantly without agent involvement.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "MessageSquare" },
      { title: "Post-trip feedback", description: "Collects traveller satisfaction scores and reviews automatically after each journey.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BarChart2" },
    ],
    benefits: [
      { title: "24/7 traveller support", description: "Handles bookings and alerts around the clock - even for customers in different time zones.", icon: "Clock" },
      { title: "Never miss a booking", description: "Every inquiry is captured and responded to instantly - no missed calls, no lost revenue.", icon: "PhoneIncoming" },
      { title: "GDS & PMS integration", description: "Connects to your booking systems, GDS, and property management platforms in real time.", icon: "Plug" },
      { title: "Multilingual traveller care", description: "Speaks to tourists in their native language - 100+ languages supported automatically.", icon: "Languages" },
      { title: "Real-time trip analytics", description: "Track booking rates, call sentiment, and cancellations in your live dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No IT team required - connect your travel number and start handling bookings instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "4×", label: "More bookings captured", sublabel: "Inquiries answered 24/7" },
      { value: "70%", label: "Fewer missed calls", sublabel: "Peak season and weekends" },
      { value: "45%", label: "Lower cancellation rate", sublabel: "With proactive travel alerts" },
      { value: "$35K", label: "Saved per year", sublabel: "In travel support staffing" },
    ],
    services: [
      {
        title: "Booking Confirmations & Travel Document Reminders",
        description: "Travelers receive instant confirmations, ticket details, and reminders for essential documents.",
        icon: "CheckCircle"
      },
      {
        title: "Real-Time Flight Updates & Gate Information",
        description: "Notify passengers about schedule changes, delays, and gate shifts to reduce stress.",
        icon: "MessageCircle"
      },
      {
        title: "Seamless Check-In Reminders & Mobile Boarding Passes",
        description: "Guide travelers through online check-in, send boarding passes, and simplify airport processes.",
        icon: "CreditCard"
      },
      {
        title: "Smart Weather Alerts & Packing Suggestions",
        description: "Provide personalized weather alerts and practical packing advice.",
        icon: "CloudSun"
      },
      {
        title: "Personalized Local Recommendations",
        description: "Offer curated restaurant, attraction, and hotel suggestions tailored to traveler preferences.",
        icon: "MapPin"
      },
      {
        title: "Loyalty Program Assistance & Rewards Redemption",
        description: "Track points, tier upgrades, and redemption options to keep loyalty programs engaging.",
        icon: "Gift"
      },
      {
        title: "Travel Insurance Guidance & Claim Support",
        description: "Explain coverage options, assist with claims, and ensure travelers are protected.",
        icon: "ShieldCheck"
      },
      {
        title: "Post-Trip Surveys & Future Travel Recommendations",
        description: "Collect feedback and suggest next travel opportunities to retain loyal clients.",
        icon: "MessageCircle"
      }
    ],
    testimonial: {
      quote: "Peak season used to break our call centre. With OnDial, every inquiry is answered in seconds - bookings, alerts, and cancellations. We've grown revenue 40% without adding staff.",
      name: "Ananya Pillai",
      role: "Head of Customer Experience · SkyRoute Travel",
      initials: "AP",
    },
    ctaHeadline: "Hear your AI agent handle a travel inquiry",
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
    serviceHeadline: "Core Travel & Tourism AI Voice Services",
    serviceSubheadline: "Enhance traveler experience, operational efficiency, and engagement with AI-powered voice agents.",
  },

  "transportation-and-logistics-services": {
    headline: "Every shipment call",
    headlineHighlight: "tracked & resolved",
    subheadline: "Your AI agent handles delivery ETAs, pickup confirmations, shipment alerts, and driver coordination - automatically, 24/7.",
    stats: [
      { value: "80%", label: "Fewer WISMO calls" },
      { value: "24/7", label: "Delivery support" },
      { value: "3×", label: "More calls handled" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Delivery ETA update",
        duration: "0:15",
        aiResponse: `"Your shipment #SHP-7721 is out for delivery and will arrive between 2–4 PM today. The driver's contact number has been sent to your mobile."`,
        messages: [
          { from: "caller", text: "When will my delivery arrive? I've been waiting all day." },
          { from: "ai", text: "Your shipment #SHP-7721 is currently out for delivery. Based on current traffic, the estimated arrival window is 2–4 PM today." },
          { from: "caller", text: "Can I get the driver's number?" },
          { from: "ai", text: "I've sent the driver's contact number to your registered mobile. You can coordinate directly with them." },
        ],
        caller: "Suresh Kumar",
        num: "+91 98765 33311",
        av: "SK",
        intents: ["Delivery ETA", "WISMO", "Frustrated", "English", "High urgency"],
        tools: [
          { label: "shipment_track()", icon: "Search" },
          { label: "driver_info()", icon: "PhoneCall" },
          { label: "sms_send()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Shipment tracked", val: "#SHP-7721 · Out for delivery" },
          { icon: "MessageSquare", label: "Driver SMS sent", val: "Contact to Suresh" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound WISMO call answered" },
          { t: "0:02", dot: "pur", text: "Intent: delivery ETA inquiry" },
          { t: "0:03", dot: "amb", text: "shipment_track(SHP-7721) → OFD" },
          { t: "0:04", dot: "amb", text: "driver_info() → contact fetched" },
          { t: "0:05", dot: "grn", text: "SMS with driver contact sent" },
        ],
        outcomes: [
          { icon: "Search", label: "ETA shared", val: "2–4 PM today" },
          { icon: "MessageSquare", label: "Driver contact", val: "SMS sent" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 48s" },
        ],
      },
      {
        label: "Pickup confirmation",
        duration: "0:14",
        aiResponse: `"Your pickup is scheduled for tomorrow between 10 AM–12 PM. The driver will call 30 minutes before arrival."`,
        messages: [
          { from: "caller", text: "I booked a pickup for tomorrow. Can you confirm the time slot?" },
          { from: "ai", text: "Your pickup reference PK-2234 is scheduled for tomorrow between 10 AM and 12 PM. The driver will call 30 minutes ahead." },
          { from: "caller", text: "Great, thanks for confirming." },
        ],
        caller: "Nisha Patel",
        num: "+91 91234 22334",
        av: "NP",
        intents: ["Pickup confirmation", "Time slot check", "Positive", "English", "Normal"],
        tools: [
          { label: "pickup_lookup()", icon: "Search" },
          { label: "sms_confirm()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Pickup found", val: "#PK-2234 · Tomorrow 10-12" },
          { icon: "MessageSquare", label: "SMS confirmation", val: "Time slot confirmed" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:02", dot: "pur", text: "Intent: pickup slot confirmation" },
          { t: "0:03", dot: "amb", text: "pickup_lookup(PK-2234) → found" },
          { t: "0:05", dot: "grn", text: "SMS confirmation sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Pickup confirmed", val: "10–12 AM" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmed" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 35s" },
        ],
      },
      {
        label: "Shipment exception alert",
        duration: "0:16",
        aiResponse: `"Your shipment #SHP-5512 encountered a delay at the customs checkpoint. New estimated delivery is June 16th. I've raised a priority case for you."`,
        messages: [
          { from: "ai", text: "This is an alert regarding your shipment #SHP-5512. There is a delay at the customs checkpoint. Your new delivery date is June 16th." },
          { from: "caller", text: "This is urgent - I need it by June 15th. What can be done?" },
          { from: "ai", text: "I understand the urgency. I've raised a priority escalation with our customs team. You'll receive an update within 2 hours." },
        ],
        caller: "Arjun Mehta",
        num: "+91 99887 00112",
        av: "AM",
        intents: ["Customs delay", "Urgent escalation", "Concerned", "English", "High urgency"],
        tools: [
          { label: "shipment_track()", icon: "Search" },
          { label: "escalate_customs()", icon: "FileText" },
        ],
        actions: [
          { icon: "Search", label: "Exception logged", val: "Customs delay · Jun 16" },
          { icon: "FileText", label: "Priority raised", val: "Customs team alerted" },
          { icon: "Bell", label: "Customer notified", val: "Update in 2 hrs" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound exception alert placed" },
          { t: "0:02", dot: "pur", text: "Caller requests urgent resolution" },
          { t: "0:03", dot: "amb", text: "escalate_customs() → priority raised" },
          { t: "0:05", dot: "grn", text: "Customer & customs team notified" },
        ],
        outcomes: [
          { icon: "FileText", label: "Escalation", val: "Priority raised" },
          { icon: "Bell", label: "Alert sent", val: "2-hr SLA" },
          { icon: "Star", label: "CSAT", val: "4.7 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 52s" },
        ],
      },
    ],
    useCases: [
      { title: "WISMO call deflection", description: "Answers 'Where is my order?' calls instantly with live tracking data - no agent needed.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Search" },
      { title: "Pickup & delivery alerts", description: "Proactively notifies customers and drivers about pickups, ETAs, and schedule changes.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Bell" },
      { title: "Exception management", description: "Alerts customers of delays and raises escalations automatically with defined SLAs.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "FileText" },
      { title: "Driver coordination", description: "Handles driver check-ins, route confirmations, and delivery completions via voice.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "PhoneCall" },
      { title: "Returns & re-delivery", description: "Processes re-delivery requests and return pickups without involving a human agent.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "RotateCcw" },
      { title: "Fleet operations support", description: "Handles maintenance alerts, fuel reports, and compliance reminders for fleet managers.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Settings" },
    ],
    benefits: [
      { title: "Kill WISMO calls", description: "80% of 'where is my order?' calls are resolved automatically - no agent time wasted.", icon: "Search" },
      { title: "Proactive exception alerts", description: "Customers are notified of delays before they need to call - reducing inbound volume.", icon: "Bell" },
      { title: "TMS & WMS integration", description: "Connects to your transport and warehouse management systems for real-time tracking data.", icon: "Plug" },
      { title: "Multilingual logistics", description: "Communicates with customers and drivers in 100+ languages automatically.", icon: "Languages" },
      { title: "End-to-end call analytics", description: "Track call volumes, resolution rates, and exception trends in your operations dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No engineering work - connect your logistics number and start handling calls instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "80%", label: "Fewer WISMO calls", sublabel: "Deflected by automated tracking updates" },
      { value: "3×", label: "More calls handled", sublabel: "Per agent after AI deployment" },
      { value: "65%", label: "Faster exception SLA", sublabel: "With automated escalation flows" },
      { value: "$40K", label: "Saved per year", sublabel: "In logistics support staffing" },
    ],
    services: [
      {
        title: "Delivery Updates – Real-Time Package Tracking",
        description: "Provide instant delivery notifications, ETA updates, and tracking information to keep customers and businesses informed.",
        icon: "Truck"
      },
      {
        title: "Route Confirmations – Smarter Pickup & Coordination",
        description: "Streamline scheduling, pickup confirmations, and communication between dispatchers, drivers, and clients.",
        icon: "MapPin"
      },
      {
        title: "Delay Notifications – Proactive Communication",
        description: "Notify customers instantly about delays due to weather, traffic, or customs and suggest alternative arrangements.",
        icon: "AlertTriangle"
      },
      {
        title: "Documentation Requirements – Simplifying Paperwork",
        description: "Guide staff and customers through shipping paperwork, customs clearance, and compliance documentation to reduce errors.",
        icon: "FileText"
      },
      {
        title: "Rate Quotes – Faster Pricing Estimates",
        description: "Deliver quick and accurate service quotes and comparisons, eliminating delays from manual calculations.",
        icon: "DollarSign"
      },
      {
        title: "Account Reviews – Smarter Cost Optimization",
        description: "Analyze past shipments, highlight inefficiencies, and provide suggestions to reduce costs and boost performance.",
        icon: "BarChart"
      },
      {
        title: "Safety Compliance – Always Stay Updated",
        description: "Voice-enabled reminders about regulations, driver training, and safety checks ensure fleet compliance.",
        icon: "ShieldCheck"
      },
      {
        title: "Fleet Management – Smarter Operations",
        description: "Manage vehicle maintenance, driver scheduling, and operations efficiently with AI voice support.",
        icon: "Settings"
      }
    ],
    testimonial: {
      quote: "WISMO calls were killing our support team. OnDial now handles 75% of all tracking inquiries automatically. Our SLA compliance improved within the first week.",
      name: "Raju Menon",
      role: "VP Customer Operations · FastFreight Logistics",
      initials: "RM",
    },
    ctaHeadline: "Hear your AI agent handle a logistics call",
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
    serviceHeadline: "Core Transportation & Logistics AI Voice Services",
    serviceSubheadline: "Enhance logistics operations and customer communication with AI-powered voice agents for transportation and delivery services.",
  },

  "retail-and-ecommerce-services": {
    headline: "Every shopper call",
    headlineHighlight: "answered instantly",
    subheadline: "Your AI agent handles order status, returns, product questions, and loyalty queries - 24/7, without a single human agent.",
    stats: [
      { value: "75%", label: "Routine queries automated" },
      { value: "24/7", label: "Shopper support" },
      { value: "40%", label: "Cart recovery via call" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Order status update",
        duration: "0:14",
        aiResponse: "Your order #ORD-8821 has been shipped and will be delivered by June 14th. The tracking link has been sent to your email.",
        messages: [
          { from: "caller", text: "Hi, I want to check the status of my order." },
          { from: "ai", text: "Happy to help! Could I have your order number or the email you used?" },
          { from: "caller", text: "It's ORD-8821." },
        ],
        identityChecks: [
          { field: "Order number", value: "ORD-8821" },
        ],
        caller: "Meera Shah",
        num: "+91 98765 44411",
        av: "MS",
        intents: ["Order status", "Shipped query", "Neutral", "English", "Normal"],
        tools: [
          { label: "order_track()", icon: "Search" },
          { label: "email_link()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Order tracked", val: "#ORD-8821 · Shipped" },
          { icon: "MessageSquare", label: "Tracking email", val: "Sent to Meera" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound order inquiry answered" },
          { t: "0:02", dot: "pur", text: "Intent: order status check" },
          { t: "0:03", dot: "amb", text: "order_track(ORD-8821) → shipped" },
          { t: "0:05", dot: "grn", text: "Tracking email dispatched" },
        ],
        outcomes: [
          { icon: "Search", label: "Order found", val: "Shipped" },
          { icon: "MessageSquare", label: "Tracking link", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 40s" },
        ],
      },
      {
        label: "Return confirmation",
        duration: "0:18",
        aiResponse: `"Your return for order #ORD-5512 has been initiated. A pickup will be arranged within 2 business days and your refund processed within 5–7 days."`,
        messages: [
          { from: "caller", text: "I'd like to return an item from my recent order." },
          { from: "ai", text: "Of course! Could I have your order number?" },
          { from: "caller", text: "ORD-5512 - the blue shirt, it doesn't fit." },
          { from: "ai", text: "I've initiated a return for the blue shirt in order #ORD-5512. Pickup will be in 2 business days and your refund processed within 5–7 days." },
        ],
        caller: "Ravi Jain",
        num: "+91 91234 55522",
        av: "RJ",
        intents: ["Return request", "Size issue", "Neutral", "English", "Normal"],
        tools: [
          { label: "order_lookup()", icon: "Search" },
          { label: "return_init()", icon: "RotateCcw" },
          { label: "pickup_book()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "RotateCcw", label: "Return raised", val: "#ORD-5512 · Blue shirt" },
          { icon: "CalendarCheck", label: "Pickup booked", val: "Within 2 business days" },
          { icon: "FileText", label: "Refund queued", val: "5–7 days processing" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Return request call answered" },
          { t: "0:02", dot: "pur", text: "Intent: return item from ORD-5512" },
          { t: "0:03", dot: "amb", text: "return_init() → Return created" },
          { t: "0:04", dot: "amb", text: "pickup_book() → 2 business days" },
          { t: "0:06", dot: "grn", text: "Refund initiated · SMS sent" },
        ],
        outcomes: [
          { icon: "RotateCcw", label: "Return raised", val: "Success" },
          { icon: "CalendarCheck", label: "Pickup", val: "2 business days" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
      {
        label: "Loyalty points alert",
        duration: "0:14",
        aiResponse: `"You have 2,400 loyalty points worth ₹240 that expire on June 30th. Would you like me to send the redemption link to your email?"`,
        messages: [
          { from: "ai", text: "Hello! This is a reminder that your 2,400 loyalty points worth ₹240 expire on June 30th. Don't let them go to waste!" },
          { from: "caller", text: "Oh, I forgot! How do I use them?" },
          { from: "ai", text: "I'll send the redemption link and your current offers to your email right now. Points can be used on your next purchase." },
        ],
        caller: "Anjali Bose",
        num: "+91 99887 66600",
        av: "AB",
        intents: ["Loyalty points", "Expiry reminder", "Positive", "English", "Normal"],
        tools: [
          { label: "points_lookup()", icon: "Database" },
          { label: "email_offers()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Database", label: "Points checked", val: "2,400 pts · ₹240 · Jun 30" },
          { icon: "MessageSquare", label: "Offers emailed", val: "Redemption link sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound loyalty reminder placed" },
          { t: "0:02", dot: "pur", text: "Caller interested in redemption" },
          { t: "0:03", dot: "amb", text: "points_lookup() → 2,400 pts" },
          { t: "0:05", dot: "grn", text: "Offers emailed · link sent" },
        ],
        outcomes: [
          { icon: "Star", label: "Redemption", val: "Link sent" },
          { icon: "MessageSquare", label: "Offers email", val: "Delivered" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 42s" },
        ],
      },
    ],
    useCases: [
      { title: "Order status & tracking", description: "Answers WISMO calls instantly with live shipment data - no agent, no wait time.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Search" },
      { title: "Returns & refunds", description: "Initiates returns, schedules pickups, and tracks refund status automatically on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "RotateCcw" },
      { title: "Loyalty & rewards", description: "Reminds shoppers of expiring points, shares redemption options, and drives repeat purchases.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Star" },
      { title: "Product questions", description: "Answers availability, sizing, and product detail questions without hold queues.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "MessageSquare" },
      { title: "Abandoned cart recovery", description: "Calls shoppers who abandoned carts with personalised offers to recover lost revenue.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "BellRing" },
      { title: "Flash sale notifications", description: "Sends targeted outbound calls alerting VIP customers to exclusive deals and drops.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Flame" },
    ],
    benefits: [
      { title: "24/7 shopper support", description: "Customers get instant answers on orders, returns, and loyalty - day or night.", icon: "Clock" },
      { title: "Reduce support costs", description: "75% of routine retail queries are handled without any human agent involvement.", icon: "BarChart2" },
      { title: "OMS & CRM integration", description: "Connects to Shopify, WooCommerce, Magento, and all major order management systems.", icon: "Plug" },
      { title: "100+ language support", description: "Serves shoppers in their native language - regional language support built in.", icon: "Languages" },
      { title: "Revenue recovery calls", description: "Automated cart recovery and loyalty nudge calls drive measurable incremental revenue.", icon: "Flame" },
      { title: "Live in under 30 minutes", description: "No developer needed - connect your store's number and start handling calls instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "75%", label: "Queries automated", sublabel: "Order, return, and loyalty calls" },
      { value: "40%", label: "Cart recovery rate", sublabel: "On abandoned cart callback campaigns" },
      { value: "60%", label: "Support cost cut", sublabel: "Per 1,000 support interactions" },
      { value: "$28K", label: "Saved per year", sublabel: "In shopper support staffing" },
    ],
    services: [
      {
        title: "Cart Abandonment Recovery",
        description: "AI voice agents automatically reach out to customers who leave items in their carts, boosting conversion rates by up to 20–30%.",
        icon: "ShoppingCart"
      },
      {
        title: "Order Status Updates",
        description: "Provide real-time shipping confirmations and delivery notifications to reduce customer anxiety.",
        icon: "Package"
      },
      {
        title: "Customer Feedback Collection",
        description: "Capture post-purchase insights through AI-powered surveys and review requests, building trust and loyalty.",
        icon: "MessageCircle"
      },
      {
        title: "Loyalty Program Enrollment",
        description: "Guide customers through rewards program enrollment and explain benefits to increase repeat purchases.",
        icon: "Gift"
      },
      {
        title: "Product Recommendations",
        description: "Offer personalized upsell and cross-sell suggestions based on browsing and purchase history.",
        icon: "TrendingUp"
      },
      {
        title: "Return & Exchange Processing",
        description: "Simplify returns and exchanges with step-by-step guidance, improving satisfaction and retention.",
        icon: "RotateCcw"
      },
      {
        title: "Seasonal Promotions",
        description: "Deliver personalized offers at scale during holidays or sales events to ensure customers never miss a deal.",
        icon: "Gift"
      },
      {
        title: "Inventory Alerts",
        description: "Send back-in-stock notifications via voice calls to reduce lost revenue on high-demand items.",
        icon: "AlertCircle"
      }
    ],
    testimonial: {
      quote: "OnDial handles 80% of our customer support calls automatically - order status, returns, and loyalty queries. Our team now focuses on VIP shoppers. Support costs dropped 55%.",
      name: "Pooja Khanna",
      role: "Head of CX · StyleHub E-commerce",
      initials: "PK",
    },
    ctaHeadline: "Hear your AI agent handle a retail support call",
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
    serviceHeadline: "Core Retail & E-commerce AI Voice Services",
    serviceSubheadline: "Enhance customer engagement, boost conversions, and streamline operations with AI-powered voice solutions.",
  },

  "telecommunications-services": {
    headline: "Every telecom call",
    headlineHighlight: "resolved faster",
    subheadline: "Your AI agent handles plan queries, bill disputes, outage alerts, and upgrades - automatically, before customers need to escalate.",
    stats: [
      { value: "80%", label: "Tier-1 call deflection" },
      { value: "24/7", label: "Network & billing support" },
      { value: "50%", label: "AHT reduction" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Plan upgrade offer",
        duration: "0:20",
        aiResponse: `"Based on your usage, you'd save ₹200/month by switching to our Unlimited Pro plan. I can process the upgrade right now if you'd like."`,
        messages: [
          { from: "caller", text: "My current plan keeps running out of data. Is there a better option?" },
          { from: "ai", text: "I can see you're on the Basic 2GB plan. Based on your usage, the Unlimited Pro at ₹599/month would save you ₹200 and give unlimited data. Want me to upgrade you now?" },
          { from: "caller", text: "Yes, let's do it." },
          { from: "ai", text: "Done! Your plan has been upgraded to Unlimited Pro effective immediately. You'll receive a confirmation SMS." },
        ],
        caller: "Karthik Nair",
        num: "+91 98765 77700",
        av: "KN",
        intents: ["Data plan query", "Upgrade intent", "Positive", "English", "Normal"],
        tools: [
          { label: "usage_lookup()", icon: "BarChart2" },
          { label: "plan_compare()", icon: "Database" },
          { label: "plan_upgrade()", icon: "CheckCheck" },
        ],
        actions: [
          { icon: "BarChart2", label: "Usage analysed", val: "95% of plan used" },
          { icon: "Database", label: "Best plan found", val: "Unlimited Pro · ₹599" },
          { icon: "CheckCheck", label: "Plan upgraded", val: "Effective immediately" },
          { icon: "Bell", label: "SMS sent", val: "Confirmation dispatched" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound plan query answered" },
          { t: "0:02", dot: "pur", text: "Intent: data plan upgrade" },
          { t: "0:03", dot: "amb", text: "usage_lookup() → 95% used" },
          { t: "0:04", dot: "amb", text: "plan_compare() → Unlimited Pro" },
          { t: "0:05", dot: "grn", text: "plan_upgrade() → Done" },
        ],
        outcomes: [
          { icon: "CheckCheck", label: "Plan upgraded", val: "Unlimited Pro" },
          { icon: "Bell", label: "SMS sent", val: "Confirmed" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
      {
        label: "Outage notification",
        duration: "0:12",
        aiResponse: `"We're aware of a network outage in your area affecting services until approximately 3 PM today. Our engineers are working on it. I've logged your report."`,
        messages: [
          { from: "caller", text: "My internet has been down for 2 hours. What's happening?" },
          { from: "ai", text: "I can see there's a known network outage in your area. Our engineers are working on it - estimated resolution is 3 PM today." },
          { from: "caller", text: "Fine. Please log this complaint." },
          { from: "ai", text: "Done - your complaint is logged as case #OUT-4421. You'll receive an SMS when service is restored." },
        ],
        caller: "Deepa Menon",
        num: "+91 91234 88890",
        av: "DM",
        intents: ["Outage complaint", "Area outage", "Frustrated", "English", "High urgency"],
        tools: [
          { label: "outage_check()", icon: "Search" },
          { label: "complaint_log()", icon: "FileText" },
        ],
        actions: [
          { icon: "Search", label: "Outage confirmed", val: "Area outage · 3 PM ETA" },
          { icon: "FileText", label: "Complaint logged", val: "#OUT-4421" },
          { icon: "Bell", label: "SMS queued", val: "Resolution alert" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound outage complaint answered" },
          { t: "0:02", dot: "pur", text: "Intent: internet outage" },
          { t: "0:03", dot: "amb", text: "outage_check() → Known outage" },
          { t: "0:04", dot: "amb", text: "complaint_log() → #OUT-4421" },
          { t: "0:06", dot: "grn", text: "SMS alert queued for resolution" },
        ],
        outcomes: [
          { icon: "FileText", label: "Complaint", val: "#OUT-4421" },
          { icon: "Bell", label: "SMS alert", val: "Queued" },
          { icon: "Star", label: "CSAT", val: "4.7 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 45s" },
        ],
      },
      {
        label: "Bill reminder",
        duration: "0:14",
        aiResponse: `"Your bill of ₹799 is due on June 20th. I've sent the payment link to your mobile. Would you like to set up auto-pay to avoid reminders in future?"`,
        messages: [
          { from: "ai", text: "Hello, this is a reminder that your telecom bill of ₹799 is due on June 20th." },
          { from: "caller", text: "Yes, I'll pay. Can you send the link?" },
          { from: "ai", text: "I've sent the secure payment link to your mobile. Also, would you like to set up auto-pay for future bills?" },
          { from: "caller", text: "Yes, that would be helpful." },
          { from: "ai", text: "Auto-pay has been activated on your account. You'll never miss a payment again." },
        ],
        caller: "Vikas Gupta",
        num: "+91 99887 11100",
        av: "VG",
        intents: ["Bill due", "Auto-pay setup", "Positive", "English", "Normal"],
        tools: [
          { label: "bill_fetch()", icon: "Database" },
          { label: "sms_link()", icon: "MessageSquare" },
          { label: "autopay_set()", icon: "Settings" },
        ],
        actions: [
          { icon: "MessageSquare", label: "Payment SMS", val: "Link sent" },
          { icon: "Settings", label: "Auto-pay on", val: "Account updated" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound bill reminder placed" },
          { t: "0:02", dot: "pur", text: "Caller requests payment link" },
          { t: "0:03", dot: "amb", text: "sms_link() → payment link sent" },
          { t: "0:04", dot: "amb", text: "autopay_set() → activated" },
          { t: "0:06", dot: "grn", text: "Account updated · auto-pay live" },
        ],
        outcomes: [
          { icon: "MessageSquare", label: "Payment link", val: "SMS sent" },
          { icon: "Settings", label: "Auto-pay", val: "Activated" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 50s" },
        ],
      },
    ],
    useCases: [
      { title: "Plan queries & upgrades", description: "Recommends better plans based on usage and completes upgrades instantly on the call.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "BarChart2" },
      { title: "Billing & payment", description: "Sends bill reminders, payment links, and sets up auto-pay - reducing payment defaults.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Database" },
      { title: "Outage management", description: "Proactively alerts customers of outages and logs complaints without agent involvement.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Bell" },
      { title: "Technical troubleshooting", description: "Walks customers through self-service fixes for common connectivity issues.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Wrench" },
      { title: "Churn prevention", description: "Identifies at-risk customers and offers personalised retention packages proactively.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "UserCheck" },
      { title: "Service activations", description: "Activates new SIMs, value-added services, and plan changes on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CheckCheck" },
    ],
    benefits: [
      { title: "Deflect 80% of tier-1 calls", description: "Bill reminders, plan queries, and outage alerts handled without human agents.", icon: "PhoneIncoming" },
      { title: "Reduce churn proactively", description: "AI identifies at-risk customers and makes retention offers before they cancel.", icon: "UserCheck" },
      { title: "BSS & CRM integration", description: "Works with your billing system, CRM, and OSS/BSS platforms out of the box.", icon: "Plug" },
      { title: "Multilingual telecom support", description: "Handles subscribers in their regional language across 100+ languages.", icon: "Languages" },
      { title: "Network-aware intelligence", description: "Accesses outage data in real time to give accurate, context-aware responses.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your telecom number and go live with a carrier-ready AI template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "80%", label: "Tier-1 deflection", sublabel: "Calls resolved without a human agent" },
      { value: "50%", label: "AHT reduction", sublabel: "On billing and plan inquiry calls" },
      { value: "25%", label: "Churn reduction", sublabel: "Via proactive retention outreach" },
      { value: "$55K", label: "Saved per year", sublabel: "In telecom support centre costs" },
    ],
    services: [
      {
        title: "Service Activation & Setup",
        description: "AI voice agents streamline new service confirmations, SIM activations, and onboarding with instant guidance.",
        icon: "PhoneCall"
      },
      {
        title: "Billing Inquiries & Payments",
        description: "Customers can access billing details, resolve disputes, and make secure payments via voice commands.",
        icon: "CreditCard"
      },
      {
        title: "Technical Support",
        description: "Provide basic troubleshooting, escalate complex cases to humans, and reduce downtime.",
        icon: "Settings"
      },
      {
        title: "Plan Upgrades & Feature Additions",
        description: "Analyze usage patterns to recommend cost-effective plans and enable conversational plan upgrades.",
        icon: "TrendingUp"
      },
      {
        title: "Contract Renewals",
        description: "Deliver timely renewal reminders and allow customers to approve terms instantly.",
        icon: "Repeat"
      },
      {
        title: "Service Outage Updates",
        description: "Proactively notify customers about outages, provide real-time updates, and estimated restoration times.",
        icon: "AlertCircle"
      },
      {
        title: "New Feature Introductions",
        description: "Explain new services, assist with setup, and encourage adoption through natural language interactions.",
        icon: "Gift"
      },
      {
        title: "Usage Monitoring & Optimization",
        description: "Alert customers when nearing data limits and suggest optimized plans to reduce bill shocks.",
        icon: "Activity"
      }
    ],
    testimonial: {
      quote: "OnDial deflects 80% of our tier-1 calls - bill reminders, outage alerts, plan upgrades. Our NPS improved 15 points and we saved ₹40L in the first year.",
      name: "Sanjay Reddy",
      role: "GM Customer Experience · ConnectNow Telecom",
      initials: "SR",
    },
    ctaHeadline: "Hear your AI agent handle a telecom support call",
    ctaSubheadline: "Free 14-day trial. No credit card. Carrier-ready in under 30 minutes.",
    serviceHeadline: "Core Telecommunications AI Voice Services",
    serviceSubheadline: "Streamline customer support, billing, and service management with AI-powered voice agents for telecom providers.",
  },

  "automotive-services": {
    headline: "Every service call",
    headlineHighlight: "handled on cue",
    subheadline: "Your AI agent books service appointments, sends maintenance reminders, and follows up on test drives - automatically, 24/7.",
    stats: [
      { value: "3×", label: "More service bookings" },
      { value: "24/7", label: "Dealership support" },
      { value: "55%", label: "No-show reduction" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Service appointment",
        duration: "0:20",
        aiResponse: `"Your service appointment for your Honda City (MH-02-AB-1234) is confirmed for Saturday at 10 AM at Apex Honda, Andheri. You'll receive a reminder 24 hours before."`,
        messages: [
          { from: "caller", text: "I need to book my car for its annual service." },
          { from: "ai", text: "Sure! Could I have your vehicle registration number?" },
          { from: "caller", text: "MH-02-AB-1234 - it's a Honda City." },
          { from: "ai", text: "Your Honda City is due for its 10,000 km service. I have Saturday 10 AM available at Apex Honda, Andheri. Shall I confirm that?" },
          { from: "caller", text: "Yes, perfect." },
        ],
        caller: "Suresh Menon",
        num: "+91 98765 11234",
        av: "SM",
        intents: ["Service booking", "Honda City MH-02-AB-1234", "Positive", "English", "Normal"],
        tools: [
          { label: "vehicle_lookup()", icon: "Search" },
          { label: "service_book()", icon: "CalendarCheck" },
          { label: "sms_confirm()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Vehicle found", val: "Honda City · 10K km due" },
          { icon: "CalendarCheck", label: "Appt confirmed", val: "Sat 10 AM · Apex Honda" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmation to Suresh" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Service booking call answered" },
          { t: "0:02", dot: "pur", text: "Intent: annual service booking" },
          { t: "0:03", dot: "amb", text: "vehicle_lookup(MH-02-AB-1234)" },
          { t: "0:04", dot: "amb", text: "service_book() → Sat 10 AM" },
          { t: "0:06", dot: "grn", text: "SMS confirmation sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Appt booked", val: "Sat 10 AM" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmed" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 10s" },
        ],
      },
      {
        label: "Test drive booking",
        duration: "0:18",
        aiResponse: `"Your test drive for the Tata Nexon EV is booked for Sunday at 11 AM. Our executive will meet you at your preferred location."`,
        messages: [
          { from: "caller", text: "I'm interested in a test drive for the Tata Nexon EV." },
          { from: "ai", text: "Excellent choice! When would you prefer - this weekend? I can arrange a home test drive at your convenience." },
          { from: "caller", text: "Sunday at 11 AM would work." },
          { from: "ai", text: "Confirmed! Our sales executive will be at your location on Sunday at 11 AM with the Nexon EV. You'll receive their contact 30 minutes before arrival." },
        ],
        caller: "Riya Singh",
        num: "+91 91234 99988",
        av: "RS",
        intents: ["Test drive", "Nexon EV", "Positive", "English", "High"],
        tools: [
          { label: "slot_check()", icon: "CalendarDays" },
          { label: "drive_book()", icon: "CalendarCheck" },
          { label: "lead_create()", icon: "UserPlus" },
        ],
        actions: [
          { icon: "CalendarCheck", label: "Drive booked", val: "Sun 11 AM · Nexon EV" },
          { icon: "UserPlus", label: "Lead created", val: "CRM · Riya Singh" },
          { icon: "Bell", label: "Executive alert", val: "Assigned & notified" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Test drive inquiry answered" },
          { t: "0:02", dot: "pur", text: "Intent: home test drive booking" },
          { t: "0:03", dot: "amb", text: "slot_check() → Sunday 11 AM free" },
          { t: "0:04", dot: "amb", text: "drive_book() → confirmed" },
          { t: "0:06", dot: "grn", text: "Lead created · executive notified" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Drive booked", val: "Sunday 11 AM" },
          { icon: "UserPlus", label: "Lead", val: "CRM updated" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 00s" },
        ],
      },
      {
        label: "Parts ready alert",
        duration: "0:12",
        aiResponse: `"The parts for your Hyundai Creta service are ready. Your vehicle is expected to be delivered by 4 PM today. Should I notify you when it's ready for pickup?"`,
        messages: [
          { from: "ai", text: "Hello, your Hyundai Creta (TN-09-XY-4321) parts are in and the service is nearly complete. Estimated pickup at 4 PM today." },
          { from: "caller", text: "Can you call me when it's ready?" },
          { from: "ai", text: "Absolutely! I'll trigger an automated call and SMS the moment your vehicle is ready. Is there anything else I can help with?" },
        ],
        caller: "Anand Krishnan",
        num: "+91 99887 44321",
        av: "AK",
        intents: ["Service update", "Pickup alert", "Positive", "English", "Normal"],
        tools: [
          { label: "service_status()", icon: "Search" },
          { label: "alert_set()", icon: "Bell" },
        ],
        actions: [
          { icon: "Search", label: "Status checked", val: "Parts fitted · ETA 4 PM" },
          { icon: "Bell", label: "Alert queued", val: "Call + SMS on ready" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Service update alert placed" },
          { t: "0:02", dot: "pur", text: "Caller requests ready alert" },
          { t: "0:03", dot: "amb", text: "service_status() → ETA 4 PM" },
          { t: "0:05", dot: "grn", text: "Pickup alert queued" },
        ],
        outcomes: [
          { icon: "Search", label: "Status update", val: "ETA 4 PM" },
          { icon: "Bell", label: "Alert set", val: "Call + SMS" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 38s" },
        ],
      },
    ],
    useCases: [
      { title: "Service appointment booking", description: "Books, reschedules, and confirms service slots instantly - synced to your workshop calendar.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Test drive scheduling", description: "Captures interest, books home or showroom test drives, and creates CRM leads automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Star" },
      { title: "Maintenance reminders", description: "Proactively calls customers when their vehicle is due for service based on mileage or date.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BellRing" },
      { title: "Service status updates", description: "Keeps customers informed on their vehicle's service progress without agent involvement.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Wrench" },
      { title: "Parts & delivery alerts", description: "Alerts customers when their vehicle is ready and handles pickup coordination.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Bell" },
      { title: "Lead follow-up", description: "Re-engages test drive leads and showroom visitors who haven't converted yet.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserPlus" },
    ],
    benefits: [
      { title: "24/7 dealership support", description: "Customers can book service or test drives at any hour - your AI never sleeps.", icon: "Clock" },
      { title: "Reduce no-shows by 55%", description: "Automated reminder calls and SMS before every appointment reduce missed slots.", icon: "BellRing" },
      { title: "DMS & CRM integration", description: "Connects to your dealer management system and CRM for real-time vehicle and lead data.", icon: "Plug" },
      { title: "Multilingual customer care", description: "Speaks to customers in their preferred language - regional languages supported.", icon: "Languages" },
      { title: "Full service analytics", description: "Track appointment rates, no-shows, and test drive conversions in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your dealership number and launch with an automotive-ready AI template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×", label: "More bookings", sublabel: "Service and test drive appointments" },
      { value: "55%", label: "Fewer no-shows", sublabel: "With automated reminder calls" },
      { value: "35%", label: "More test drives", sublabel: "Captured via 24/7 AI booking" },
      { value: "$25K", label: "Saved per year", sublabel: "Per dealership in support costs" },
    ],
    services: [
      {
        title: "Service Reminders",
        description: "Automate oil change notifications, tire rotations, and maintenance schedules to reduce missed appointments.",
        icon: "Clock"
      },
      {
        title: "Recall Notifications",
        description: "Deliver urgent safety recall announcements instantly and provide repair scheduling support.",
        icon: "AlertCircle"
      },
      {
        title: "Warranty Extensions",
        description: "Provide coverage expiration alerts and offer extension opportunities through AI-driven upselling.",
        icon: "ShieldCheck"
      },
      {
        title: "Insurance Updates",
        description: "Assist with policy renewals, claim updates, and coverage adjustments for hassle-free insurance support.",
        icon: "FileText"
      },
      {
        title: "Financing Options",
        description: "Enable loan refinancing and payment plan modifications with AI-guided voice interactions.",
        icon: "DollarSign"
      },
      {
        title: "Parts Availability",
        description: "Notify customers when replacement parts are available and help schedule installation appointments.",
        icon: "CheckCircle"
      },
      {
        title: "Seasonal Preparations",
        description: "Provide winterization and summer-prep reminders to keep vehicles road-ready year-round.",
        icon: "Sun"
      },
      {
        title: "Trade-in Evaluations",
        description: "Provide instant trade-in value assessments and guide customers toward upgrades at dealerships.",
        icon: "Repeat"
      }
    ],
    testimonial: {
      quote: "OnDial books our service appointments and test drives automatically. Missed service slots dropped 50% in the first month. Customers love the instant confirmation.",
      name: "Deepak Verma",
      role: "Service Director · Apex Honda, Mumbai",
      initials: "DV",
    },
    ctaHeadline: "Hear your AI agent handle a dealership call",
    ctaSubheadline: "Free 14-day trial. No credit card. Dealer-ready in under 30 minutes.",
    serviceHeadline: "Core Automotive AI Voice Services",
    serviceSubheadline: "Enhance customer engagement, service management, and sales in the automotive industry with AI-powered voice agents.",
  },

  "education-services": {
    headline: "Every student inquiry",
    headlineHighlight: "answered",
    subheadline: "Your AI calling agent handles admissions, enrollment reminders, fee queries, and schedule changes - 24/7, so your staff can focus on teaching.",
    stats: [
      { value: "60%", label: "More inquiries captured" },
      { value: "24/7", label: "Student support" },
      { value: "45%", label: "Fewer no-shows on demos" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Enrollment reminder",
        duration: "0:18",
        aiResponse: `"Your enrollment for the MBA programme closes on June 20th. I've sent the admission form link and fee details to your email. Shall I connect you with an advisor?"`,
        messages: [
          { from: "ai", text: "Hello! This is a reminder that the enrollment deadline for the MBA programme is June 20th - just 5 days away." },
          { from: "caller", text: "I'm still deciding. Can you send me the fee structure?" },
          { from: "ai", text: "I've sent the fee structure and scholarship information to your registered email. Would you like to speak with an admission advisor?" },
          { from: "caller", text: "Yes, please arrange a call." },
          { from: "ai", text: "A callback is booked for tomorrow at 10 AM. You'll get a confirmation SMS shortly." },
        ],
        caller: "Ananya Sharma",
        num: "+91 98765 99900",
        av: "AS",
        intents: ["Enrollment query", "MBA programme", "Interested", "English", "Normal"],
        tools: [
          { label: "course_info()", icon: "Database" },
          { label: "email_details()", icon: "MessageSquare" },
          { label: "callback_book()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "MessageSquare", label: "Fee email sent", val: "Fees + scholarship info" },
          { icon: "CalendarCheck", label: "Callback booked", val: "Tomorrow 10 AM" },
          { icon: "UserPlus", label: "Lead created", val: "CRM · Ananya Sharma" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Enrollment reminder call placed" },
          { t: "0:02", dot: "pur", text: "Caller requests fee info" },
          { t: "0:03", dot: "amb", text: "email_details() → Fees sent" },
          { t: "0:04", dot: "amb", text: "callback_book() → Tomorrow 10 AM" },
          { t: "0:06", dot: "grn", text: "Lead logged · advisor alerted" },
        ],
        outcomes: [
          { icon: "MessageSquare", label: "Info email", val: "Sent" },
          { icon: "CalendarCheck", label: "Callback", val: "Tomorrow 10 AM" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 15s" },
        ],
      },
      {
        label: "Class schedule alert",
        duration: "0:14",
        aiResponse: `"Your Physics class scheduled for tomorrow at 9 AM has been moved to 11 AM in Room 204. I've updated your schedule and sent a reminder."`,
        messages: [
          { from: "ai", text: "Schedule alert: Your Physics class tomorrow at 9 AM has been rescheduled to 11 AM in Room 204." },
          { from: "caller", text: "Thanks. Can you also remind me an hour before?" },
          { from: "ai", text: "Absolutely! I've set a reminder call for 10 AM tomorrow. Is there anything else?" },
        ],
        caller: "Arjun Pillai",
        num: "+91 91234 77788",
        av: "AP",
        intents: ["Schedule change", "Reminder request", "Positive", "English", "Normal"],
        tools: [
          { label: "schedule_update()", icon: "CalendarDays" },
          { label: "reminder_set()", icon: "Bell" },
        ],
        actions: [
          { icon: "CalendarDays", label: "Schedule updated", val: "Physics → 11 AM Room 204" },
          { icon: "Bell", label: "Reminder set", val: "Call at 10 AM" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Schedule change alert placed" },
          { t: "0:02", dot: "pur", text: "Caller requests reminder" },
          { t: "0:03", dot: "amb", text: "reminder_set() → 10 AM call" },
          { t: "0:05", dot: "grn", text: "Schedule logged · reminder active" },
        ],
        outcomes: [
          { icon: "CalendarDays", label: "Schedule", val: "Updated" },
          { icon: "Bell", label: "Reminder", val: "Set for 10 AM" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 38s" },
        ],
      },
      {
        label: "Tuition due notice",
        duration: "0:16",
        aiResponse: `"Your tuition fee of ₹45,000 is due by June 25th. I've sent the payment link and instalment options to your email."`,
        messages: [
          { from: "ai", text: "This is a reminder that your tuition fee of ₹45,000 is due by June 25th." },
          { from: "caller", text: "Is there an EMI option available?" },
          { from: "ai", text: "Yes! You can split into 3 monthly instalments of ₹15,000 each. I've sent the instalment plan and payment link to your email." },
          { from: "caller", text: "Great, thank you." },
        ],
        caller: "Priya Bose",
        num: "+91 99887 00111",
        av: "PB",
        intents: ["Tuition fee", "EMI request", "Positive", "English", "Normal"],
        tools: [
          { label: "fee_lookup()", icon: "Database" },
          { label: "emi_options()", icon: "BarChart2" },
          { label: "email_plan()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "BarChart2", label: "EMI plan", val: "3 × ₹15,000" },
          { icon: "MessageSquare", label: "Email sent", val: "EMI plan + payment link" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Tuition reminder call placed" },
          { t: "0:02", dot: "pur", text: "Caller requests EMI option" },
          { t: "0:03", dot: "amb", text: "emi_options() → 3 × ₹15K" },
          { t: "0:05", dot: "grn", text: "Plan emailed · link sent" },
        ],
        outcomes: [
          { icon: "BarChart2", label: "EMI plan", val: "Presented" },
          { icon: "MessageSquare", label: "Email sent", val: "Payment + plan" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 52s" },
        ],
      },
    ],
    useCases: [
      { title: "Admissions & enrollment", description: "Answers program queries, sends brochures, and books advisor callbacks for prospective students.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "UserPlus" },
      { title: "Tuition & fee reminders", description: "Reminds students of payment deadlines and sends EMI options and payment links automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Schedule alerts", description: "Notifies students of class changes, cancellations, and exam schedules proactively.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "CalendarDays" },
      { title: "Demo class invitations", description: "Calls prospective students to book and confirm demo or trial class attendance.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Play" },
      { title: "Student support queries", description: "Handles attendance, grades, and assignment deadline queries without staff involvement.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "MessageSquare" },
      { title: "Parent communication", description: "Automates parent calls for progress updates, event invitations, and fee notifications.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "PhoneCall" },
    ],
    benefits: [
      { title: "24/7 student & parent support", description: "Inquiries, reminders, and schedule alerts handled around the clock without staff.", icon: "Clock" },
      { title: "Never lose an admission lead", description: "Every admissions inquiry is captured and followed up automatically.", icon: "UserPlus" },
      { title: "SIS & LMS integration", description: "Connects to your student information and learning management systems.", icon: "Plug" },
      { title: "Multilingual education", description: "Communicates with students and parents in their preferred language - 100+ supported.", icon: "Languages" },
      { title: "Enrolment analytics", description: "Track inquiry rates, conversion, fee collection, and class attendance in one dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No IT team required - connect your institution's number and start automating calls.", icon: "Settings" },
    ],
    outcomes: [
      { value: "60%", label: "More inquiries handled", sublabel: "Without additional admin staff" },
      { value: "45%", label: "Fewer no-shows", sublabel: "On demo classes with AI reminders" },
      { value: "35%", label: "Higher enrollment rate", sublabel: "Via proactive follow-up calls" },
      { value: "$20K", label: "Saved per year", sublabel: "In admissions team staffing" },
    ],
    services: [
      {
        title: "Enrollment Confirmations",
        description: "Instant voice updates confirm course registrations and class schedules without delays.",
        icon: "CheckCircle"
      },
      {
        title: "Tuition Reminders",
        description: "Automated voice reminders reduce missed payments and provide timely financial aid updates.",
        icon: "CreditCard"
      },
      {
        title: "Academic Progress Notifications",
        description: "Students receive grade updates and performance improvement suggestions through human-like voice interactions.",
        icon: "BarChart2"
      },
      {
        title: "Event Notifications",
        description: "Boost attendance with reminders for school functions, parent-teacher meetings, and graduation ceremonies.",
        icon: "CalendarCheck"
      },
      {
        title: "Scholarship Opportunities",
        description: "Announce financial aid programs and deadlines to ensure no student misses out.",
        icon: "Gift"
      },
      {
        title: "Course Availability Alerts",
        description: "Notify students about waitlist updates and class openings in real time.",
        icon: "AlertCircle"
      },
      {
        title: "Alumni Outreach",
        description: "Simplify donation drives, reunions, and networking invitations with personalized voice updates.",
        icon: "Users"
      },
      {
        title: "Student Services Support",
        description: "Automate reminders for counseling, mental health sessions, and support services.",
        icon: "UserCheck"
      }
    ],
    testimonial: {
      quote: "OnDial handles our admissions calls, fee reminders, and schedule alerts automatically. Our enrollment rate went up 35% and our team's workload dropped by half.",
      name: "Dr. Meera Iyer",
      role: "Director of Admissions · Excel Academy, Pune",
      initials: "MI",
    },
    ctaHeadline: "Hear your AI agent handle a student inquiry",
    ctaSubheadline: "Free 14-day trial. No credit card. Education-ready in under 30 minutes.",
    serviceHeadline: "Key Benefits of OnDial in Education",
    serviceSubheadline: "Enhance learning, communication, and administrative efficiency with AI voice agents",
  },

  "hospitality-services": {
    headline: "Every guest call",
    headlineHighlight: "answered with care",
    subheadline: "Your AI calling agent handles reservations, check-in reminders, guest requests, and post-stay feedback - 24/7, in every language.",
    stats: [
      { value: "4×", label: "More reservations captured" },
      { value: "24/7", label: "Guest support coverage" },
      { value: "50%", label: "No-show reduction" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Reservation confirm",
        duration: "0:18",
        aiResponse: `"Your reservation at The Grand Palms for 2 nights, June 20–22, is confirmed. Your sea-view room and breakfast package have been booked. Welcome!"`,
        messages: [
          { from: "caller", text: "Hi, I'd like to confirm my hotel reservation." },
          { from: "ai", text: "Of course! Could I have your booking reference?" },
          { from: "caller", text: "It's TGP-5521." },
          { from: "ai", text: "Your 2-night stay at The Grand Palms from June 20–22 is confirmed. Sea-view room with breakfast included. Shall I email the voucher?" },
          { from: "caller", text: "Yes please." },
        ],
        caller: "Priya Kapoor",
        num: "+91 98765 66611",
        av: "PK",
        intents: ["Reservation confirmation", "The Grand Palms Jun 20-22", "Positive", "English", "Normal"],
        tools: [
          { label: "booking_fetch()", icon: "Search" },
          { label: "email_voucher()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Booking found", val: "#TGP-5521 · Sea view · 2N" },
          { icon: "MessageSquare", label: "Voucher emailed", val: "Confirmation sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Reservation inquiry answered" },
          { t: "0:02", dot: "pur", text: "Intent: confirm booking #TGP-5521" },
          { t: "0:03", dot: "amb", text: "booking_fetch() → confirmed" },
          { t: "0:05", dot: "grn", text: "Voucher emailed to Priya" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Reservation", val: "Confirmed" },
          { icon: "MessageSquare", label: "Voucher", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 52s" },
        ],
      },
      {
        label: "Check-in welcome",
        duration: "0:14",
        aiResponse: `"Welcome, Mr. Raj! Your room 402 is ready. Check-in is at 2 PM. The pool and spa are open until 10 PM. Is there anything we can arrange before your arrival?"`,
        messages: [
          { from: "ai", text: "Welcome to The Grand Palms, Raj! Your room 402 is ready. Early check-in is available from 12 PM today." },
          { from: "caller", text: "Can I request an airport pickup?" },
          { from: "ai", text: "Absolutely! I've scheduled a complimentary airport pickup for you at 11:30 AM. The driver will text you 15 minutes before arrival." },
        ],
        caller: "Raj Kumar",
        num: "+91 91234 44455",
        av: "RK",
        intents: ["Check-in", "Airport pickup request", "Positive", "English", "Normal"],
        tools: [
          { label: "checkin_details()", icon: "Database" },
          { label: "transfer_book()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "Database", label: "Room confirmed", val: "Room 402 · Ready" },
          { icon: "CalendarCheck", label: "Pickup booked", val: "Airport · 11:30 AM" },
          { icon: "MessageSquare", label: "Driver SMS set", val: "15 min alert queued" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Pre-arrival welcome call placed" },
          { t: "0:02", dot: "pur", text: "Guest requests airport transfer" },
          { t: "0:03", dot: "amb", text: "transfer_book() → 11:30 AM" },
          { t: "0:05", dot: "grn", text: "Driver assigned · SMS queued" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Transfer booked", val: "11:30 AM" },
          { icon: "MessageSquare", label: "Driver alert", val: "Queued" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 45s" },
        ],
      },
      {
        label: "Guest feedback survey",
        duration: "0:16",
        aiResponse: `"Thank you for staying at The Grand Palms, Priya! We'd love your feedback. Your response has been recorded and we'll use it to improve our service."`,
        messages: [
          { from: "ai", text: "Hello Priya, thank you for your recent stay at The Grand Palms. Could you spare 2 minutes for a quick feedback survey?" },
          { from: "caller", text: "Sure, go ahead." },
          { from: "ai", text: "How would you rate your overall stay on a scale of 1 to 10?" },
          { from: "caller", text: "I'd give it a 9. The spa was excellent but the breakfast timing was a bit rushed." },
          { from: "ai", text: "Thank you! I've noted your feedback on breakfast timing. We hope to see you again soon." },
        ],
        caller: "Priya Kapoor",
        num: "+91 98765 66611",
        av: "PK",
        intents: ["Post-stay survey", "Breakfast feedback", "Positive", "English", "Normal"],
        tools: [
          { label: "survey_log()", icon: "FileText" },
          { label: "crm_update()", icon: "Database" },
        ],
        actions: [
          { icon: "FileText", label: "Feedback logged", val: "Score 9/10" },
          { icon: "Database", label: "CRM updated", val: "Breakfast note tagged" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Post-stay survey call placed" },
          { t: "0:03", dot: "pur", text: "Guest completed survey" },
          { t: "0:05", dot: "amb", text: "survey_log() → 9/10" },
          { t: "0:06", dot: "grn", text: "Feedback saved to CRM" },
        ],
        outcomes: [
          { icon: "FileText", label: "Survey score", val: "9/10" },
          { icon: "Database", label: "CRM updated", val: "Feedback tagged" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
    ],
    useCases: [
      { title: "Reservation handling", description: "Confirms, modifies, and cancels reservations instantly - synced to your PMS in real time.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Pre-arrival concierge", description: "Calls guests before arrival to share room details, arrange transfers, and upsell packages.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Star" },
      { title: "Guest feedback surveys", description: "Runs automated post-stay satisfaction surveys and feeds results into your review pipeline.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "MessageSquare" },
      { title: "Room service requests", description: "Takes in-room requests via voice and routes them to housekeeping or F&B instantly.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Bell" },
      { title: "Upsell & upgrades", description: "Offers room upgrades, spa packages, and dining reservations during pre-arrival calls.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Flame" },
      { title: "Late checkout handling", description: "Manages late checkout requests, availability checks, and charges - automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Clock" },
    ],
    benefits: [
      { title: "24/7 concierge service", description: "Guests get instant answers on reservations, amenities, and requests at any hour.", icon: "Clock" },
      { title: "Reduce no-shows by 50%", description: "Automated check-in reminders and pre-arrival calls cut last-minute cancellations.", icon: "BellRing" },
      { title: "PMS & CRS integration", description: "Connects to Opera, Cloudbeds, and all major property management systems.", icon: "Plug" },
      { title: "Multilingual guest care", description: "Hosts international guests in their native language - 100+ languages supported.", icon: "Languages" },
      { title: "Revenue per room analytics", description: "Track upsell conversion, guest satisfaction, and repeat bookings in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your hotel number and go live with a hospitality-grade AI template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "4×", label: "More bookings captured", sublabel: "Inquiries answered 24/7 instantly" },
      { value: "50%", label: "Fewer no-shows", sublabel: "With AI pre-arrival reminders" },
      { value: "30%", label: "More upsell revenue", sublabel: "Via pre-arrival concierge calls" },
      { value: "$32K", label: "Saved per year", sublabel: "In front-desk staffing costs" },
    ],
    services: [
      {
        title: "Reservation Confirmations",
        description: "Provide instant, accurate booking confirmations and acknowledge special requests automatically.",
        icon: "CheckCircle"
      },
      {
        title: "Check-in & Arrival Procedures",
        description: "Offer AI check-in automation with real-time updates on rooms, amenities, and personalized greetings.",
        icon: "DoorOpen"
      },
      {
        title: "Concierge Assistance",
        description: "Guests can request dining recommendations, reserve activities, or get travel assistance instantly.",
        icon: "User"
      },
      {
        title: "Room Upgrades & Offers",
        description: "Proactively notify guests about room upgrades and personalized deals to drive upsells and satisfaction.",
        icon: "Gift"
      },
      {
        title: "Event Coordination",
        description: "Use AI to schedule, coordinate vendors, and communicate with guests for weddings, conferences, or retreats.",
        icon: "CalendarCheck"
      },
      {
        title: "Feedback Collection",
        description: "Collect guest feedback through AI voice-driven surveys to improve service and understand priorities.",
        icon: "MessageCircle"
      },
      {
        title: "Loyalty & Rewards Programs",
        description: "Encourage repeat bookings with personalized rewards, discounts, and exclusive offers.",
        icon: "Star"
      },
      {
        title: "Future Booking Incentives",
        description: "Boost occupancy with AI-powered seasonal promotions and return-visit campaigns tailored to guest preferences.",
        icon: "TrendingUp"
      }
    ],
    testimonial: {
      quote: "Our AI concierge handles reservations, pre-arrival calls, and post-stay surveys automatically. Upsell revenue from AI calls grew 28% in the first quarter. Guests love it.",
      name: "Meera Pillai",
      role: "General Manager · The Grand Palms Resort, Goa",
      initials: "MP",
    },
    ctaHeadline: "Hear your AI agent handle a guest reservation call",
    ctaSubheadline: "Free 14-day trial. No credit card. Hospitality-ready in under 30 minutes.",
    serviceHeadline: "Core Hospitality AI Voice Services",
    serviceSubheadline: "Enhance guest experience, streamline operations, and boost loyalty with AI-powered voice agents for hotels and resorts.",
  },

  "legal-services": {
    headline: "Every client call",
    headlineHighlight: "managed professionally",
    subheadline: "Your AI calling agent handles client intake, court date reminders, consultation bookings, and document follow-ups - 24/7.",
    stats: [
      { value: "70%", label: "Faster client intake" },
      { value: "24/7", label: "Client support coverage" },
      { value: "50%", label: "Fewer missed court dates" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Court date reminder",
        duration: "0:16",
        aiResponse: `"This is a reminder that your hearing in the matter of Singh vs. Patel is scheduled for June 17th at 10 AM at the District Court, Room 4. Please confirm your attendance."`,
        messages: [
          { from: "ai", text: "This is a reminder from Kumar & Associates. Your hearing in Singh vs. Patel is on June 17th at 10 AM, District Court Room 4." },
          { from: "caller", text: "Yes, I'll be there. Can you send me the case documents?" },
          { from: "ai", text: "I'll flag your request to your attorney right away. You'll receive a call from them within 2 hours with the documents." },
        ],
        caller: "Rajesh Singh",
        num: "+91 98765 33344",
        av: "RS",
        intents: ["Court reminder", "Document request", "Positive", "English", "Normal"],
        tools: [
          { label: "case_lookup()", icon: "Search" },
          { label: "attorney_alert()", icon: "Bell" },
        ],
        actions: [
          { icon: "Search", label: "Case confirmed", val: "Singh vs Patel · Jun 17" },
          { icon: "Bell", label: "Attorney notified", val: "Doc request flagged" },
          { icon: "FileText", label: "Attendance logged", val: "Confirmed" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Court reminder call placed" },
          { t: "0:02", dot: "pur", text: "Client confirms attendance" },
          { t: "0:03", dot: "amb", text: "case_lookup() → Jun 17 10AM" },
          { t: "0:04", dot: "amb", text: "attorney_alert() → Doc request" },
          { t: "0:06", dot: "grn", text: "Attendance confirmed in CRM" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Attendance", val: "Confirmed" },
          { icon: "Bell", label: "Attorney", val: "Alerted" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 50s" },
        ],
      },
      {
        label: "Document review alert",
        duration: "0:14",
        aiResponse: `"Your property agreement documents have been reviewed by our team and are ready for your signature. I've sent the secure signing link to your email."`,
        messages: [
          { from: "ai", text: "Hello, your property agreement has been reviewed and is ready for your digital signature." },
          { from: "caller", text: "Can I review it before signing?" },
          { from: "ai", text: "Of course. I've sent the full document and the digital signing link to your email. Please review and sign at your convenience." },
        ],
        caller: "Sunita Mehra",
        num: "+91 91234 11100",
        av: "SM",
        intents: ["Document ready", "Review request", "Neutral", "English", "Normal"],
        tools: [
          { label: "doc_status()", icon: "FileText" },
          { label: "email_link()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "FileText", label: "Doc status", val: "Reviewed · Ready to sign" },
          { icon: "MessageSquare", label: "Email sent", val: "Document + sign link" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Document alert call placed" },
          { t: "0:02", dot: "pur", text: "Client requests doc review" },
          { t: "0:03", dot: "amb", text: "doc_status() → Ready to sign" },
          { t: "0:05", dot: "grn", text: "Email with signing link sent" },
        ],
        outcomes: [
          { icon: "FileText", label: "Doc status", val: "Ready" },
          { icon: "MessageSquare", label: "Email sent", val: "Sign link" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", "val": "0m 42s" },
        ],
      },
      {
        label: "Consultation booking",
        duration: "0:20",
        aiResponse: `"Your 30-minute consultation with Adv. Sharma is confirmed for June 18th at 3 PM. You'll receive a confirmation email with video call details."`,
        messages: [
          { from: "caller", text: "I need a legal consultation about a property dispute." },
          { from: "ai", text: "Absolutely. I can schedule you with Adv. Sharma, who specialises in property law. Would June 18th at 3 PM work?" },
          { from: "caller", text: "Yes, that works perfectly." },
          { from: "ai", text: "Confirmed! Your 30-minute consultation is booked. A video call link will be sent to your email." },
        ],
        caller: "Arun Nair",
        num: "+91 99887 55566",
        av: "AN",
        intents: ["Legal consultation", "Property dispute", "Positive", "English", "Normal"],
        tools: [
          { label: "attorney_match()", icon: "Search" },
          { label: "consultation_book()", icon: "CalendarCheck" },
          { label: "email_confirm()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Attorney matched", val: "Adv. Sharma · Property law" },
          { icon: "CalendarCheck", label: "Consultation booked", val: "Jun 18 · 3 PM · 30 min" },
          { icon: "MessageSquare", label: "Confirmation email", val: "Video link sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Consultation request answered" },
          { t: "0:02", dot: "pur", text: "Intent: property law consultation" },
          { t: "0:03", dot: "amb", text: "attorney_match() → Adv. Sharma" },
          { t: "0:04", dot: "amb", text: "consultation_book() → Jun 18 3PM" },
          { t: "0:06", dot: "grn", text: "Confirmation email sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Consultation", val: "Jun 18 3 PM" },
          { icon: "MessageSquare", label: "Email sent", val: "Confirmed" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 10s" },
        ],
      },
    ],
    useCases: [
      { title: "Client intake", description: "Collects case details, conflict checks, and client information over the call before the first meeting.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "UserCheck" },
      { title: "Court date reminders", description: "Calls clients before hearings to confirm attendance and share logistics automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Consultation booking", description: "Matches clients with the right attorney and books consultations - 24/7, without reception.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "CalendarDays" },
      { title: "Document follow-ups", description: "Alerts clients when documents are ready for review or signature and sends secure links.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "FileText" },
      { title: "Payment reminders", description: "Sends retainer payment reminders and billing notifications without awkward conversations.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Database" },
      { title: "Case status updates", description: "Provides automated updates on case progress and scheduled hearings to keep clients informed.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "MessageSquare" },
    ],
    benefits: [
      { title: "24/7 client availability", description: "Never miss a new client inquiry - your AI handles intake and bookings around the clock.", icon: "Clock" },
      { title: "Reduce missed court dates", description: "Automated hearing reminders cut missed appearances and last-minute rescheduling.", icon: "BellRing" },
      { title: "Practice management sync", description: "Integrates with Clio, MyCase, and other legal practice management platforms.", icon: "Plug" },
      { title: "Multilingual client care", description: "Communicates with clients in their preferred language - 100+ languages supported.", icon: "Languages" },
      { title: "Confidential call logging", description: "Every interaction is logged with attorney-client privilege compliance in mind.", icon: "ShieldCheck" },
      { title: "Live in under 30 minutes", description: "Connect your firm's number and go live with a legal-ready AI template instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "70%", label: "Faster client intake", sublabel: "Vs traditional phone reception" },
      { value: "50%", label: "Fewer missed hearings", sublabel: "With automated court reminders" },
      { value: "40%", label: "More consultations", sublabel: "Booked via 24/7 AI scheduling" },
      { value: "$18K", label: "Saved per year", sublabel: "In receptionist staffing costs" },
    ],
    services: [
      {
        title: "Appointment Scheduling & Consultation Bookings",
        description: "Clients can book consultations directly through AI voice agents, reducing missed calls and manual coordination.",
        icon: "CalendarCheck"
      },
      {
        title: "Case Updates & Next Steps Notifications",
        description: "Keep clients informed on the progress of legal matters, from filings to hearings.",
        icon: "FileText"
      },
      {
        title: "Document Requirement Reminders",
        description: "AI reminds clients of required paperwork and submission deadlines to avoid delays.",
        icon: "ClipboardCheck"
      },
      {
        title: "Court Date & Hearing Notifications",
        description: "Automated reminders ensure clients and lawyers are always prepared for hearings.",
        icon: "Clock"
      },
      {
        title: "Bill Explanations & Payment Assistance",
        description: "AI agents break down legal fees, send invoices, and guide clients on payment options.",
        icon: "DollarSign"
      },
      {
        title: "Settlement Notifications & Digital Signatures",
        description: "Instant voice updates notify clients about settlements and required approvals.",
        icon: "CheckCircle"
      },
      {
        title: "Compliance Deadlines & Regulatory Reminders",
        description: "AI ensures law firms meet filing requirements and avoid costly penalties.",
        icon: "ShieldCheck"
      },
      {
        title: "Client Check-ins & Feedback Calls",
        description: "Proactive follow-ups using AI voice agents help ensure client satisfaction and loyalty.",
        icon: "UserCheck"
      }
    ],
    testimonial: {
      quote: "OnDial handles our client intake calls, hearing reminders, and consultation bookings automatically. Our attorneys now start every client meeting fully prepared. Missed court dates are down 50%.",
      name: "Adv. Ananya Sharma",
      role: "Managing Partner · Sharma & Associates, Delhi",
      initials: "AS",
    },
    ctaHeadline: "Hear your AI agent handle a legal intake call",
    ctaSubheadline: "Free 14-day trial. No credit card. Law-firm ready in under 30 minutes.",
    serviceHeadline: "Core Legal AI Voice Services",
    serviceSubheadline: "Streamline client communication, case management, and compliance tasks with AI-powered voice agents for law firms.",
  },

  "government-services": {
    headline: "Every citizen call",
    headlineHighlight: "answered",
    subheadline: "Your AI calling agent handles appointment scheduling, document status inquiries, survey calls, and citizen information - 24/7, in every language.",
    stats: [
      { value: "80%", label: "Routine inquiries automated" },
      { value: "24/7", label: "Citizen support coverage" },
      { value: "60%", label: "Reduced wait times" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Appointment reminder",
        duration: "0:16",
        aiResponse: `"This is a reminder that your Aadhaar update appointment is scheduled for June 18th at 11 AM at the Regional Seva Kendra, Sector 14. Please bring your original documents."`,
        messages: [
          { from: "ai", text: "Namaste! This is a reminder from the Seva Kendra. Your Aadhaar update appointment is on June 18th at 11 AM, Sector 14 office." },
          { from: "caller", text: "What documents should I bring?" },
          { from: "ai", text: "Please bring your original Aadhaar card, a proof of address, and a photo ID. I've sent the checklist to your registered mobile." },
        ],
        caller: "Suresh Kumar",
        num: "+91 98765 44400",
        av: "SK",
        intents: ["Govt appointment", "Document checklist", "Positive", "Hindi", "Normal"],
        tools: [
          { label: "appointment_lookup()", icon: "Search" },
          { label: "sms_checklist()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Appointment found", val: "Jun 18 · 11 AM · Sector 14" },
          { icon: "MessageSquare", label: "Document SMS", val: "Checklist sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Outbound reminder call placed" },
          { t: "0:02", dot: "pur", text: "Citizen requests document list" },
          { t: "0:03", dot: "amb", text: "appointment_lookup() → Jun 18" },
          { t: "0:05", dot: "grn", text: "Document checklist SMS sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Reminder", val: "Delivered" },
          { icon: "MessageSquare", label: "Checklist SMS", val: "Sent" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 48s" },
        ],
      },
      {
        label: "Document ready alert",
        duration: "0:13",
        aiResponse: `"Your PAN card application (reference #PAN-8821) has been processed and is ready for collection at your nearest post office. You'll receive the tracking SMS shortly."`,
        messages: [
          { from: "ai", text: "Your PAN card application #PAN-8821 has been approved and dispatched to your registered address. Expected delivery: June 16th." },
          { from: "caller", text: "Can I track it?" },
          { from: "ai", text: "I've sent the courier tracking link to your mobile. It'll be delivered by Speed Post reference SP-7712." },
        ],
        caller: "Priya Rao",
        num: "+91 91234 55500",
        av: "PR",
        intents: ["Document status", "PAN card", "Positive", "English", "Normal"],
        tools: [
          { label: "doc_status()", icon: "Search" },
          { label: "sms_track()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Doc confirmed", val: "#PAN-8821 · Dispatched" },
          { icon: "MessageSquare", label: "Tracking SMS", val: "SP-7712 link sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Document status alert placed" },
          { t: "0:02", dot: "pur", text: "Citizen requests tracking" },
          { t: "0:03", dot: "amb", text: "doc_status() → dispatched" },
          { t: "0:05", dot: "grn", text: "Tracking SMS sent" },
        ],
        outcomes: [
          { icon: "Search", label: "Status", val: "Dispatched" },
          { icon: "MessageSquare", label: "Tracking SMS", val: "Sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 40s" },
        ],
      },
      {
        label: "Citizen survey",
        duration: "0:16",
        aiResponse: `"Thank you for your feedback on the Swachh Bharat initiative. Your responses have been recorded and will help improve services in your area."`,
        messages: [
          { from: "ai", text: "Namaste! I'm calling on behalf of the Municipal Corporation to gather your feedback on the Swachh Bharat scheme in your area. May I ask 3 quick questions?" },
          { from: "caller", text: "Yes, go ahead." },
          { from: "ai", text: "On a scale of 1 to 5, how would you rate waste collection frequency in your locality?" },
          { from: "caller", text: "I'd say 3. It's not regular enough." },
          { from: "ai", text: "Thank you. Your feedback has been recorded and will be shared with the concerned ward officer." },
        ],
        caller: "Amita Joshi",
        num: "+91 99887 33300",
        av: "AJ",
        intents: ["Citizen survey", "Waste management feedback", "Neutral", "Hindi", "Normal"],
        tools: [
          { label: "survey_log()", icon: "FileText" },
          { label: "report_flag()", icon: "Bell" },
        ],
        actions: [
          { icon: "FileText", label: "Survey recorded", val: "Waste: 3/5" },
          { icon: "Bell", label: "Ward officer", val: "Feedback flagged" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Citizen survey call placed" },
          { t: "0:04", dot: "pur", text: "Survey completed" },
          { t: "0:05", dot: "amb", text: "survey_log() → Score 3/5" },
          { t: "0:06", dot: "grn", text: "Feedback flagged to ward officer" },
        ],
        outcomes: [
          { icon: "FileText", label: "Survey done", val: "Score 3/5" },
          { icon: "Bell", label: "Officer alert", val: "Flagged" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 00s" },
        ],
      },
    ],
    useCases: [
      { title: "Appointment scheduling", description: "Books and reminds citizens of government service appointments automatically - in multiple languages.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Document status alerts", description: "Notifies citizens when documents are processed, ready, or dispatched for collection.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "FileText" },
      { title: "Citizen feedback surveys", description: "Runs large-scale citizen satisfaction and scheme feedback surveys at low cost.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BarChart2" },
      { title: "Grievance intake", description: "Collects citizen complaints, assigns reference numbers, and routes to the correct department.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "MessageSquare" },
      { title: "Scheme awareness calls", description: "Proactively informs citizens of government welfare schemes and eligibility criteria.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Bell" },
      { title: "Emergency & alert calls", description: "Sends mass alerts for weather, public safety, or civic emergencies in seconds.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
    ],
    benefits: [
      { title: "24/7 citizen access", description: "Citizens can get answers, schedule appointments, and check status at any hour.", icon: "Clock" },
      { title: "Scale to millions of calls", description: "Handle bulk citizen outreach - surveys, alerts, reminders - in seconds.", icon: "PhoneIncoming" },
      { title: "Government system integration", description: "Connects to legacy citizen management, HRMS, and grievance redressal portals.", icon: "Plug" },
      { title: "22 Indian language support", description: "Communicates in all scheduled Indian languages plus global language support.", icon: "Languages" },
      { title: "Transparent audit trail", description: "All citizen interactions are logged and reportable for accountability and compliance.", icon: "ShieldCheck" },
      { title: "Live in under 30 minutes", description: "No IT procurement needed - deploy on existing telephony with a government template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "80%", label: "Routine calls automated", sublabel: "Without staff involvement" },
      { value: "60%", label: "Reduced wait times", sublabel: "For citizens seeking information" },
      { value: "10M+", label: "Citizens reached", sublabel: "Via large-scale outbound campaigns" },
      { value: "40%", label: "Lower operational cost", sublabel: "Vs traditional helpline staffing" },
    ],
    services: [
      {
        title: "Application Status Tracking",
        description: "Citizens can check the real-time status of permits, licenses, and benefits with a simple voice query.",
        icon: "FileText"
      },
      {
        title: "Renewal Reminders",
        description: "Automatically notify citizens about license renewals, vehicle registrations, and compliance deadlines.",
        icon: "Clock"
      },
      {
        title: "Public Service Announcements",
        description: "Broadcast multilingual community updates, policy changes, or emergency alerts instantly.",
        icon: "Megaphone"
      },
      {
        title: "Appointment Scheduling",
        description: "Book or reschedule visits to government offices easily via AI voice agents.",
        icon: "CalendarCheck"
      },
      {
        title: "Tax Notifications",
        description: "Provide personalized updates on filing deadlines, refunds, and tax-related information.",
        icon: "DollarSign"
      },
      {
        title: "Benefit Eligibility & Enrollment",
        description: "Guide individuals through eligibility checks, enrollment, and application assistance for welfare, healthcare, or pensions.",
        icon: "UserCheck"
      },
      {
        title: "Compliance Monitoring",
        description: "Automated alerts keep businesses and citizens updated on regulations to prevent violations.",
        icon: "ShieldCheck"
      },
      {
        title: "Citizen Surveys",
        description: "Conduct multilingual surveys to collect feedback and help policymakers understand community needs.",
        icon: "MessageCircle"
      }
    ],
    testimonial: {
      quote: "OnDial handled our citizen appointment reminders and scheme awareness calls for over 200,000 households. Response rates were 4× higher than SMS and the cost was minimal.",
      name: "Rajendra Singh",
      role: "District Collector · Smart City Mission, Rajasthan",
      initials: "RS",
    },
    ctaHeadline: "Hear your AI agent handle a citizen service call",
    ctaSubheadline: "Free 14-day trial. No credit card. Government-ready in under 30 minutes.",
    serviceHeadline: "Core Government AI Voice Services",
    serviceSubheadline: "Enhance citizen engagement, streamline operations, and improve service delivery with AI-powered voice agents for government agencies.",
  },

  "manufacturing-services": {
    headline: "Every supply chain call",
    headlineHighlight: "automated",
    subheadline: "Your AI calling agent handles order dispatch alerts, quality notifications, vendor follow-ups, and maintenance reminders - 24/7.",
    stats: [
      { value: "70%", label: "Fewer manual follow-up calls" },
      { value: "24/7", label: "Operations support" },
      { value: "45%", label: "Faster dispatch communication" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Order dispatch alert",
        duration: "0:15",
        aiResponse: `"Your order #MFG-4421 of 500 units has been dispatched from our Pune facility. The AWB number is IN-78812 and estimated delivery is June 16th."`,
        messages: [
          { from: "ai", text: "This is a dispatch alert from Apex Manufacturing. Your order #MFG-4421 of 500 units has been shipped. AWB: IN-78812, delivery by June 16th." },
          { from: "caller", text: "Can you send me the invoice and packing list?" },
          { from: "ai", text: "I've emailed the invoice and packing list to your registered email. You'll also receive a tracking update when it reaches the distribution centre." },
        ],
        caller: "Manoj Gupta",
        num: "+91 98765 22200",
        av: "MG",
        intents: ["Dispatch alert", "Invoice request", "Positive", "English", "Normal"],
        tools: [
          { label: "order_dispatch()", icon: "Database" },
          { label: "email_docs()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Database", label: "Dispatch logged", val: "#MFG-4421 · 500 units" },
          { icon: "MessageSquare", label: "Invoice emailed", val: "Invoice + packing list" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Dispatch alert call placed" },
          { t: "0:02", dot: "pur", text: "Client requests invoice" },
          { t: "0:03", dot: "amb", text: "order_dispatch() → AWB IN-78812" },
          { t: "0:05", dot: "grn", text: "Invoice + docs emailed" },
        ],
        outcomes: [
          { icon: "Database", label: "Dispatch", val: "Confirmed" },
          { icon: "MessageSquare", label: "Invoice", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 45s" },
        ],
      },
      {
        label: "Quality check notify",
        duration: "0:14",
        aiResponse: `"Your batch #BATCH-221 has passed quality inspection. The QC report has been emailed. The batch is cleared for dispatch."`,
        messages: [
          { from: "ai", text: "Quality alert: Your batch #BATCH-221 has passed QC inspection and is cleared for dispatch." },
          { from: "caller", text: "Can I get the inspection report?" },
          { from: "ai", text: "The full QC report has been sent to your registered email. The batch is ready for pickup from Bay 4." },
        ],
        caller: "Ravi Sharma",
        num: "+91 91234 88811",
        av: "RS",
        intents: ["QC pass", "Report request", "Positive", "English", "Normal"],
        tools: [
          { label: "qc_status()", icon: "CheckCheck" },
          { label: "email_report()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "CheckCheck", label: "QC passed", val: "#BATCH-221 · Cleared" },
          { icon: "MessageSquare", label: "Report emailed", val: "Full QC report" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "QC pass notification placed" },
          { t: "0:02", dot: "pur", text: "Client requests QC report" },
          { t: "0:03", dot: "amb", text: "qc_status() → BATCH-221 passed" },
          { t: "0:05", dot: "grn", text: "QC report emailed" },
        ],
        outcomes: [
          { icon: "CheckCheck", label: "QC status", val: "Passed" },
          { icon: "MessageSquare", label: "Report", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 38s" },
        ],
      },
      {
        label: "Maintenance reminder",
        duration: "0:16",
        aiResponse: `"Preventive maintenance for Machine Line 3 is due on June 20th. I've scheduled a maintenance engineer visit and sent the checklist to the plant supervisor."`,
        messages: [
          { from: "ai", text: "Maintenance alert: Machine Line 3 at the Pune plant is due for preventive maintenance on June 20th." },
          { from: "caller", text: "Can you schedule the engineer and send the checklist?" },
          { from: "ai", text: "Done! A maintenance engineer is scheduled for June 20th at 8 AM. The checklist has been sent to the plant supervisor's email." },
        ],
        caller: "Priya Iyer",
        num: "+91 99887 77700",
        av: "PI",
        intents: ["Maintenance due", "Engineer scheduling", "Positive", "English", "Normal"],
        tools: [
          { label: "machine_status()", icon: "Wrench" },
          { label: "engineer_schedule()", icon: "CalendarCheck" },
          { label: "email_checklist()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "CalendarCheck", label: "Engineer booked", val: "Jun 20 · 8 AM" },
          { icon: "MessageSquare", label: "Checklist emailed", val: "Plant supervisor" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Maintenance alert call placed" },
          { t: "0:02", dot: "pur", text: "Supervisor requests scheduling" },
          { t: "0:03", dot: "amb", text: "engineer_schedule() → Jun 20" },
          { t: "0:05", dot: "grn", text: "Checklist emailed · confirmed" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Engineer booked", val: "Jun 20 8 AM" },
          { icon: "MessageSquare", label: "Checklist sent", val: "Email" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 52s" },
        ],
      },
    ],
    useCases: [
      { title: "Order dispatch alerts", description: "Notifies customers and distributors when orders ship, with AWB details and delivery ETAs.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Bell" },
      { title: "QC & inspection updates", description: "Alerts customers when batches pass or fail quality checks, with report delivery.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CheckCheck" },
      { title: "Maintenance reminders", description: "Schedules preventive maintenance calls for plant machinery based on defined schedules.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Wrench" },
      { title: "Vendor & supplier follow-ups", description: "Follows up on purchase orders, delivery ETAs, and pending invoices automatically.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "PhoneCall" },
      { title: "Production milestone alerts", description: "Notifies clients at key production stages - material sourcing, WIP, and completion.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "BarChart2" },
      { title: "Complaint & defect intake", description: "Collects product defect reports and routes them to the quality team automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "FileText" },
    ],
    benefits: [
      { title: "Eliminate manual follow-ups", description: "Automated dispatch, QC, and vendor calls replace hours of manual phone work.", icon: "PhoneCall" },
      { title: "Zero missed maintenance", description: "Proactive maintenance reminders reduce unplanned downtime and equipment failures.", icon: "Wrench" },
      { title: "ERP & MES integration", description: "Connects to SAP, Oracle, and other enterprise manufacturing systems in real time.", icon: "Plug" },
      { title: "Multilingual plant support", description: "Communicates with global vendors and customers in 100+ languages automatically.", icon: "Languages" },
      { title: "Supply chain analytics", description: "Track dispatch rates, QC pass rates, and vendor call outcomes in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No engineering work - connect your plant number and launch with a manufacturing template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "70%", label: "Fewer manual calls", sublabel: "Dispatch and QC alerts automated" },
      { value: "45%", label: "Faster dispatch comms", sublabel: "Customers notified within minutes" },
      { value: "35%", label: "Less unplanned downtime", sublabel: "Via proactive maintenance alerts" },
      { value: "$22K", label: "Saved per year", sublabel: "In operations communication costs" },
    ],
    services: [
      {
        title: "Order Confirmations",
        description: "Automatically confirm purchase orders, share delivery schedules, and reduce delays caused by manual acknowledgment processes.",
        icon: "CheckSquare"
      },
      {
        title: "Quality Updates",
        description: "Deliver inspection results, compliance reports, and product quality updates instantly to relevant teams.",
        icon: "ClipboardCheck"
      },
      {
        title: "Inventory Alerts",
        description: "Monitor stock levels and send real-time reorder reminders to ensure uninterrupted production flow.",
        icon: "Package"
      },
      {
        title: "Maintenance Schedules",
        description: "Coordinate equipment servicing, minimize downtime, and optimize predictive maintenance cycles with AI reminders.",
        icon: "CheckCircle"
      },
      {
        title: "Safety Protocols",
        description: "Send safety training reminders, emergency alerts, and incident reporting updates to keep workers safe and informed.",
        icon: "Shield"
      },
      {
        title: "Supplier Communications",
        description: "Enable seamless vendor coordination, material requirement updates, and multilingual communication across global suppliers.",
        icon: "Users"
      },
      {
        title: "Production Updates",
        description: "Provide real-time manufacturing status reports and delivery timeline adjustments for both internal teams and clients.",
        icon: "TrendingUp"
      },
      {
        title: "Regulatory Compliance",
        description: "Keep teams updated with industry standards, certification renewals, and audit reminders, reducing compliance risk.",
        icon: "FileText"
      }
    ],
    testimonial: {
      quote: "OnDial automated our dispatch alerts, QC notifications, and maintenance reminders. Our team spends zero time on routine calls now. Supply chain communication improved dramatically.",
      name: "Rajesh Menon",
      role: "Operations Director · Apex Industrial, Pune",
      initials: "RM",
    },
    ctaHeadline: "Hear your AI agent handle a manufacturing ops call",
    ctaSubheadline: "Free 14-day trial. No credit card. Plant-ready in under 30 minutes.",
    serviceHeadline: "Core Manufacturing AI Voice Services",
    serviceSubheadline: "Streamline factory operations, communication, and compliance with AI-powered voice agents for manufacturing.",
  },

  "non-profit-organizations-services": {
    headline: "Every donor call",
    headlineHighlight: "handled with purpose",
    subheadline: "Your AI calling agent handles donor outreach, event invitations, volunteer coordination, and impact updates - automatically.",
    stats: [
      { value: "4×", label: "More donor calls reached" },
      { value: "24/7", label: "Donor & volunteer support" },
      { value: "50%", label: "Lower fundraising cost" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Donation thank you",
        duration: "0:16",
        aiResponse: `"Thank you so much for your generous donation of ₹5,000 to Children First Foundation! Your support will fund meals for 50 children this month. Your tax receipt has been emailed."`,
        messages: [
          { from: "ai", text: "Hello Priya, this is Children First Foundation. We wanted to personally thank you for your generous donation of ₹5,000. It will fund meals for 50 children this month!" },
          { from: "caller", text: "That's lovely to hear. Can I get a tax receipt?" },
          { from: "ai", text: "Your Section 80G tax receipt has been emailed to you. Thank you for making a difference. Would you like to hear about our upcoming fundraiser?" },
          { from: "caller", text: "Yes, tell me more." },
        ],
        caller: "Priya Mehta",
        num: "+91 98765 55511",
        av: "PM",
        intents: ["Donor thanks", "Tax receipt", "Positive", "English", "Normal"],
        tools: [
          { label: "donor_lookup()", icon: "Search" },
          { label: "email_receipt()", icon: "MessageSquare" },
          { label: "event_share()", icon: "Bell" },
        ],
        actions: [
          { icon: "MessageSquare", label: "Tax receipt", val: "80G email sent" },
          { icon: "Bell", label: "Event invite", val: "Fundraiser details shared" },
          { icon: "Database", label: "Donor CRM", val: "Updated" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Thank you call placed" },
          { t: "0:02", dot: "pur", text: "Donor requests tax receipt" },
          { t: "0:03", dot: "amb", text: "email_receipt() → 80G sent" },
          { t: "0:05", dot: "grn", text: "Event invite shared · CRM updated" },
        ],
        outcomes: [
          { icon: "MessageSquare", label: "Receipt sent", val: "80G email" },
          { icon: "Bell", label: "Event shared", val: "Invited" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 00s" },
        ],
      },
      {
        label: "Event invitation",
        duration: "0:15",
        aiResponse: `"You're invited to our Annual Gala Dinner on June 25th at The Meridian, Mumbai. I've reserved a seat for you and sent the event details to your email."`,
        messages: [
          { from: "ai", text: "Hello! On behalf of the Children First Foundation, you're cordially invited to our Annual Gala on June 25th at The Meridian, Mumbai." },
          { from: "caller", text: "I'd love to attend. Can you confirm my seat?" },
          { from: "ai", text: "Your seat is reserved! I've sent the event details, dress code, and digital pass to your email. We look forward to seeing you." },
        ],
        caller: "Arjun Kapoor",
        num: "+91 91234 66600",
        av: "AK",
        intents: ["Event invite", "RSVP confirmed", "Positive", "English", "Normal"],
        tools: [
          { label: "seat_reserve()", icon: "CalendarCheck" },
          { label: "email_invite()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "CalendarCheck", label: "Seat reserved", val: "Gala · Jun 25" },
          { icon: "MessageSquare", label: "Digital pass", val: "Email sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Event invitation call placed" },
          { t: "0:02", dot: "pur", text: "Donor confirms attendance" },
          { t: "0:03", dot: "amb", text: "seat_reserve() → confirmed" },
          { t: "0:05", dot: "grn", text: "Event pass emailed" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "RSVP", val: "Confirmed" },
          { icon: "MessageSquare", label: "Event pass", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 42s" },
        ],
      },
      {
        label: "Volunteer reminder",
        duration: "0:14",
        aiResponse: `"Your volunteer shift for the Community Kitchen on June 18th at 9 AM is confirmed. Please report to the East Wing. Thank you for your service!"`,
        messages: [
          { from: "ai", text: "Hello! This is a reminder that your volunteer shift for Community Kitchen is this Saturday, June 18th at 9 AM." },
          { from: "caller", text: "Yes, I'll be there. Where should I report?" },
          { from: "ai", text: "Please report to the East Wing of the Seva Centre. I've sent the location and coordinator's contact to your mobile." },
        ],
        caller: "Nisha Sharma",
        num: "+91 99887 22200",
        av: "NS",
        intents: ["Volunteer shift", "Location query", "Positive", "English", "Normal"],
        tools: [
          { label: "shift_lookup()", icon: "Search" },
          { label: "sms_location()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Shift confirmed", val: "Jun 18 · 9 AM · East Wing" },
          { icon: "MessageSquare", label: "Location SMS", val: "Sent to Nisha" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Volunteer reminder placed" },
          { t: "0:02", dot: "pur", text: "Volunteer asks for location" },
          { t: "0:03", dot: "amb", text: "shift_lookup() → East Wing" },
          { t: "0:05", dot: "grn", text: "Location SMS sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Shift confirmed", val: "Jun 18 9 AM" },
          { icon: "MessageSquare", label: "Location SMS", val: "Sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 38s" },
        ],
      },
    ],
    useCases: [
      { title: "Donor outreach", description: "Runs personalised thank-you calls, impact updates, and re-engagement campaigns at scale.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneCall" },
      { title: "Event invitations", description: "Invites donors and stakeholders to fundraisers, galas, and community events automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Volunteer coordination", description: "Sends shift reminders, location details, and coordinator contacts to volunteers.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "UserCheck" },
      { title: "Fundraising campaigns", description: "Runs outbound donation campaigns with personalised asks based on donor history.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Flame" },
      { title: "Impact reporting calls", description: "Shares impact updates with donors - stories, outcomes, and fund utilisation.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "BarChart2" },
      { title: "Tax receipt dispatch", description: "Sends 80G/tax receipts and year-end giving summaries to donors automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "FileText" },
    ],
    benefits: [
      { title: "Reach more donors at lower cost", description: "AI calls replace expensive outbound telemarketing at a fraction of the cost.", icon: "Flame" },
      { title: "Automate volunteer management", description: "Shift reminders, confirmations, and coordination handled automatically.", icon: "UserCheck" },
      { title: "CRM & fundraising platform sync", description: "Integrates with Salesforce NPSP, Raiser's Edge, and popular NGO CRMs.", icon: "Plug" },
      { title: "Multilingual donor engagement", description: "Reaches donors in their preferred language - regional language support built in.", icon: "Languages" },
      { title: "Fundraising analytics", description: "Track call conversion, donation rates, and campaign ROI in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No IT team required - connect your number and launch your first campaign instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "4×", label: "More donors contacted", sublabel: "Per campaign vs manual calling" },
      { value: "50%", label: "Lower fundraising cost", sublabel: "Vs traditional outbound calling" },
      { value: "30%", label: "Higher donor retention", sublabel: "With personalised thank-you calls" },
      { value: "$15K", label: "Saved per year", sublabel: "In outreach and coordination costs" },
    ],
    services: [
      {
        title: "Donation Campaigns",
        description: "Reach thousands of donors, share campaign details, and collect pledges automatically, boosting fundraising success.",
        icon: "Gift"
      },
      {
        title: "Volunteer Recruitment",
        description: "Simplify volunteer scheduling and confirmations with AI voice bots, reducing administrative effort.",
        icon: "UserPlus"
      },
      {
        title: "Event Invitations",
        description: "Deliver personalized invitations, track RSVPs, and send reminders for fundraisers and galas.",
        icon: "Calendar"
      },
      {
        title: "Impact Updates",
        description: "Provide transparent project progress, success stories, and fund utilization updates to donors.",
        icon: "BarChart"
      },
      {
        title: "Membership Renewals",
        description: "Automate annual membership reminders to ensure higher retention without human intervention.",
        icon: "Repeat"
      },
      {
        title: "Grant Notifications",
        description: "Notify organizations about grant deadlines and opportunities, ensuring critical funding is never missed.",
        icon: "Bell"
      },
      {
        title: "Community Outreach",
        description: "Broadcast local service announcements, health drives, and awareness campaigns to reach thousands instantly.",
        icon: "Megaphone"
      },
      {
        title: "Thank You Calls",
        description: "Send personalized appreciation messages to donors, strengthening loyalty and recognition.",
        icon: "Heart"
      }
    ],
    testimonial: {
      quote: "OnDial calls 500 donors per day for our campaigns - thank-yous, invites, and impact updates. Donor retention improved 30% and our fundraising cost per dollar dropped by half.",
      name: "Sunita Krishnan",
      role: "Executive Director · Children First Foundation",
      initials: "SK",
    },
    ctaHeadline: "Hear your AI agent handle a donor outreach call",
    ctaSubheadline: "Free 14-day trial. No credit card. NGO-ready in under 30 minutes.",
    serviceHeadline: "Core Non-Profit AI Voice Services",
    serviceSubheadline: "Streamline donor engagement, volunteer coordination, and outreach efforts with AI-powered voice agents for non-profit organizations.",
  },

  "event-management-services": {
    headline: "Every event call",
    headlineHighlight: "managed flawlessly",
    subheadline: "Your AI calling agent handles registrations, confirmations, schedule updates, and post-event feedback - automatically, at any scale.",
    stats: [
      { value: "5×", label: "Faster registration handling" },
      { value: "24/7", label: "Event support coverage" },
      { value: "40%", label: "Fewer no-shows" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Registration confirm",
        duration: "0:15",
        aiResponse: `"Your registration for the Digital Marketing Summit on June 25th is confirmed. Your e-ticket and agenda have been sent to your email."`,
        messages: [
          { from: "caller", text: "I registered for the marketing summit. Can you confirm my registration?" },
          { from: "ai", text: "Your registration for the Digital Marketing Summit on June 25th at The Hyatt, Bangalore is confirmed." },
          { from: "caller", text: "Can you send me the agenda?" },
          { from: "ai", text: "I've sent your e-ticket and the full event agenda to your registered email. Doors open at 9 AM." },
        ],
        caller: "Vikram Rao",
        num: "+91 98765 88800",
        av: "VR",
        intents: ["Event registration", "Agenda request", "Positive", "English", "Normal"],
        tools: [
          { label: "registration_fetch()", icon: "Search" },
          { label: "email_ticket()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Registration confirmed", val: "Summit · Jun 25 · Hyatt" },
          { icon: "MessageSquare", label: "E-ticket + agenda", val: "Email sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Registration inquiry answered" },
          { t: "0:02", dot: "pur", text: "Intent: confirm registration" },
          { t: "0:03", dot: "amb", text: "registration_fetch() → confirmed" },
          { t: "0:05", dot: "grn", text: "E-ticket and agenda emailed" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Registration", val: "Confirmed" },
          { icon: "MessageSquare", label: "E-ticket", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 42s" },
        ],
      },
      {
        label: "Event detail update",
        duration: "0:14",
        aiResponse: `"Important update: The keynote session on June 25th has moved to Hall B at 10:30 AM. Your badge and entry details remain the same."`,
        messages: [
          { from: "ai", text: "Schedule alert: The keynote at the Digital Marketing Summit has moved from Hall A to Hall B at 10:30 AM on June 25th." },
          { from: "caller", text: "Thanks for the heads-up. Will the networking session still be at 4 PM?" },
          { from: "ai", text: "Yes, the networking session remains at 4 PM in the Grand Foyer. I've sent the updated agenda to your email." },
        ],
        caller: "Ananya Pillai",
        num: "+91 91234 77711",
        av: "AP",
        intents: ["Schedule change", "Agenda query", "Positive", "English", "Normal"],
        tools: [
          { label: "schedule_update()", icon: "CalendarDays" },
          { label: "email_agenda()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "CalendarDays", label: "Schedule updated", val: "Keynote → Hall B 10:30 AM" },
          { icon: "MessageSquare", label: "Agenda email", val: "Updated agenda sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Schedule change alert placed" },
          { t: "0:02", dot: "pur", text: "Attendee asks about networking" },
          { t: "0:03", dot: "amb", text: "schedule_update() → confirmed" },
          { t: "0:05", dot: "grn", text: "Updated agenda emailed" },
        ],
        outcomes: [
          { icon: "CalendarDays", label: "Schedule", val: "Updated" },
          { icon: "MessageSquare", label: "Agenda", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 40s" },
        ],
      },
      {
        label: "Feedback request",
        duration: "0:15",
        aiResponse: `"Thank you for attending the Digital Marketing Summit! Your feedback has been recorded. We're glad you enjoyed the sessions and look forward to seeing you next year."`,
        messages: [
          { from: "ai", text: "Hi! Thank you for attending the Digital Marketing Summit. Could you share your feedback? It'll take less than 2 minutes." },
          { from: "caller", text: "Sure!" },
          { from: "ai", text: "How would you rate the overall event experience on a scale of 1 to 10?" },
          { from: "caller", text: "I'd give it a 9. The speakers were excellent." },
          { from: "ai", text: "Wonderful! Your feedback has been recorded. We'll share the session recordings with you next week." },
        ],
        caller: "Rohan Bose",
        num: "+91 99887 44411",
        av: "RB",
        intents: ["Post-event survey", "Speaker feedback", "Positive", "English", "Normal"],
        tools: [
          { label: "feedback_log()", icon: "FileText" },
          { label: "crm_update()", icon: "Database" },
        ],
        actions: [
          { icon: "FileText", label: "Feedback saved", val: "Score 9/10" },
          { icon: "Database", label: "CRM updated", val: "Feedback tagged" },
          { icon: "Bell", label: "Recording alert", val: "Queued for next week" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Post-event survey placed" },
          { t: "0:04", dot: "pur", text: "Survey completed" },
          { t: "0:05", dot: "amb", text: "feedback_log() → 9/10" },
          { t: "0:06", dot: "grn", text: "CRM updated · recording queued" },
        ],
        outcomes: [
          { icon: "FileText", label: "Survey score", val: "9/10" },
          { icon: "Database", label: "CRM updated", val: "Feedback tagged" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 00s" },
        ],
      },
    ],
    useCases: [
      { title: "Registration management", description: "Confirms registrations, sends e-tickets and agendas, and handles waitlist inquiries automatically.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "UserCheck" },
      { title: "Attendee reminders", description: "Sends personalised reminder calls before events to reduce no-shows significantly.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Schedule change alerts", description: "Notifies attendees of venue changes, session updates, and schedule modifications instantly.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "CalendarDays" },
      { title: "Sponsor & exhibitor calls", description: "Handles sponsor inquiry calls, package details, and booth allocation queries.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Star" },
      { title: "Post-event feedback", description: "Collects attendee and speaker satisfaction scores automatically after each event.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "MessageSquare" },
      { title: "Vendor coordination", description: "Automates vendor confirmation calls for catering, AV, logistics, and venue setup.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "PhoneCall" },
    ],
    benefits: [
      { title: "Scale to any event size", description: "Handle thousands of registration confirmations and reminders in minutes.", icon: "PhoneIncoming" },
      { title: "Reduce no-shows by 40%", description: "Personalised reminder calls achieve better attendance rates than email alone.", icon: "BellRing" },
      { title: "CRM & event tech integration", description: "Works with Eventbrite, Hopin, Cvent, and all major event management platforms.", icon: "Plug" },
      { title: "Multilingual event support", description: "Communicates with international attendees in 100+ languages automatically.", icon: "Languages" },
      { title: "Post-event analytics", description: "Satisfaction scores, attendance rates, and feedback themes in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your event line and launch registration confirmations instantly.", icon: "Settings" },
    ],
    outcomes: [
      { value: "5×", label: "Faster registration handling", sublabel: "vs manual confirmation calls" },
      { value: "40%", label: "Fewer no-shows", sublabel: "With AI reminder calls" },
      { value: "90%", label: "Post-event survey response", sublabel: "vs 20% email response rate" },
      { value: "$18K", label: "Saved per event", sublabel: "In event coordination costs" },
    ],
    services: [
      {
        title: "Lead Qualification",
        description: "AI voice agents quickly assess prospects’ interest, budget, and timeline, ensuring your sales team focuses on high-quality leads.",
        icon: "UserCheck"
      },
      {
        title: "Appointment Scheduling",
        description: "Integrates with calendars to schedule meetings efficiently, eliminating endless back-and-forth emails.",
        icon: "CalendarCheck"
      },
      {
        title: "Prospect Follow-Ups",
        description: "Automated follow-up calls and reminders keep prospects engaged until conversion.",
        icon: "Repeat"
      },
      {
        title: "Quote Deliveries",
        description: "Instantly share quotes and personalized proposals through intelligent AI conversations.",
        icon: "FileText"
      },
      {
        title: "Customer Onboarding",
        description: "Guide new customers through onboarding, ensuring a seamless first experience.",
        icon: "UserPlus"
      },
      {
        title: "Referral Generation",
        description: "Engage satisfied clients with automated referral requests and incentive reminders.",
        icon: "Share2"
      },
      {
        title: "Pipeline Management",
        description: "Track deal progress, send reminders, and ensure every opportunity moves forward efficiently.",
        icon: "TrendingUp"
      }
    ],
    testimonial: {
      quote: "OnDial handles all our registration confirmations, schedule change alerts, and post-event surveys automatically. Our team now focuses on delivering great events instead of managing calls.",
      name: "Kavya Nair",
      role: "Managing Director · EventFirst Productions, Bangalore",
      initials: "KN",
    },
    ctaHeadline: "Hear your AI agent handle an event registration call",
    ctaSubheadline: "Free 14-day trial. No credit card. Event-ready in under 30 minutes.",
    serviceHeadline: "Core Event Management AI Voice Services",
    serviceSubheadline: "Streamline event registration, attendance tracking, and post-event feedback with AI-powered voice agents for event organizers.",
  },

  "consulting-services": {
    headline: "Every client engagement",
    headlineHighlight: "starts here",
    subheadline: "Your AI calling agent handles intake calls, meeting scheduling, session reminders, and follow-ups - so your consultants focus on delivering value.",
    stats: [
      { value: "3×", label: "More consultations booked" },
      { value: "24/7", label: "Client support coverage" },
      { value: "50%", label: "Faster intake processing" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Meeting schedule",
        duration: "0:18",
        aiResponse: `"Your strategy session with our senior consultant is confirmed for June 19th at 2 PM. A video call link has been sent to your email."`,
        messages: [
          { from: "caller", text: "I'd like to schedule a strategy session with your firm." },
          { from: "ai", text: "Certainly! Could I know the nature of the engagement - business strategy, digital transformation, or HR consulting?" },
          { from: "caller", text: "Business strategy. I'm looking for a 1-hour initial session." },
          { from: "ai", text: "I've scheduled you with our senior strategy consultant for June 19th at 2 PM. A video call link is on its way to your email." },
        ],
        caller: "Rahul Mehta",
        num: "+91 98765 11100",
        av: "RM",
        intents: ["Consultation booking", "Business strategy", "Positive", "English", "High"],
        tools: [
          { label: "consultant_match()", icon: "Search" },
          { label: "meeting_book()", icon: "CalendarCheck" },
          { label: "email_link()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Consultant matched", val: "Sr. Strategy Consultant" },
          { icon: "CalendarCheck", label: "Meeting booked", val: "Jun 19 · 2 PM · 1 hr" },
          { icon: "MessageSquare", label: "Video link sent", val: "Email dispatched" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Consultation inquiry answered" },
          { t: "0:02", dot: "pur", text: "Intent: strategy session booking" },
          { t: "0:03", dot: "amb", text: "consultant_match() → Sr. Strategist" },
          { t: "0:04", dot: "amb", text: "meeting_book() → Jun 19 2PM" },
          { t: "0:06", dot: "grn", text: "Video link emailed" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Meeting booked", val: "Jun 19 2 PM" },
          { icon: "MessageSquare", label: "Video link", val: "Email sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
      {
        label: "Intake form follow-up",
        duration: "0:16",
        aiResponse: `"Thank you for submitting your intake form. I've reviewed your requirements and matched you with our Change Management specialist. A detailed proposal will reach you within 24 hours."`,
        messages: [
          { from: "ai", text: "Hello, we received your intake form regarding change management consulting. I'm calling to confirm your key requirements." },
          { from: "caller", text: "Yes. We're undergoing a merger and need support with organisational change." },
          { from: "ai", text: "I've matched you with our Change Management specialist. Expect a detailed proposal in 24 hours and a call to discuss next steps." },
        ],
        caller: "Sunita Reddy",
        num: "+91 91234 99900",
        av: "SR",
        intents: ["Intake follow-up", "Change management", "Positive", "English", "High"],
        tools: [
          { label: "intake_fetch()", icon: "FileText" },
          { label: "specialist_match()", icon: "Search" },
          { label: "proposal_queue()", icon: "Database" },
        ],
        actions: [
          { icon: "Search", label: "Specialist matched", val: "Change Management expert" },
          { icon: "Database", label: "Proposal queued", val: "24-hr turnaround" },
          { icon: "UserPlus", label: "Lead created", val: "CRM · Sunita Reddy" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Intake follow-up call placed" },
          { t: "0:02", dot: "pur", text: "Requirements confirmed" },
          { t: "0:03", dot: "amb", text: "specialist_match() → CM expert" },
          { t: "0:05", dot: "grn", text: "Proposal queued · lead logged" },
        ],
        outcomes: [
          { icon: "Search", label: "Specialist", val: "Matched" },
          { icon: "Database", label: "Proposal", val: "Queued 24hr" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 55s" },
        ],
      },
      {
        label: "Session reminder",
        duration: "0:13",
        aiResponse: `"Your advisory session with Dr. Kapoor is tomorrow at 11 AM via Zoom. I've resent the meeting link and pre-read materials to your email."`,
        messages: [
          { from: "ai", text: "Reminder: Your advisory session with Dr. Kapoor is tomorrow at 11 AM via Zoom." },
          { from: "caller", text: "Can you resend the meeting link? I can't find it." },
          { from: "ai", text: "Done! I've sent the Zoom link and pre-read materials to your email. See you tomorrow." },
        ],
        caller: "Arjun Bose",
        num: "+91 99887 00000",
        av: "AB",
        intents: ["Session reminder", "Link resend", "Positive", "English", "Normal"],
        tools: [
          { label: "session_lookup()", icon: "Search" },
          { label: "email_link()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Session confirmed", val: "Tomorrow 11 AM · Dr. Kapoor" },
          { icon: "MessageSquare", label: "Link + materials", val: "Email resent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Session reminder placed" },
          { t: "0:02", dot: "pur", text: "Client requests link resend" },
          { t: "0:03", dot: "amb", text: "session_lookup() → Tomorrow 11 AM" },
          { t: "0:05", dot: "grn", text: "Link and materials emailed" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Session", val: "Tomorrow 11 AM" },
          { icon: "MessageSquare", label: "Link sent", val: "Email" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 38s" },
        ],
      },
    ],
    useCases: [
      { title: "Client intake & discovery", description: "Collects project briefs and requirements over the call before the first consultant meeting.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "UserCheck" },
      { title: "Consultation booking", description: "Matches clients with the right specialist and books sessions - 24/7, without admin staff.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Session reminders", description: "Sends personalised reminders with meeting links and pre-read materials before every session.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BellRing" },
      { title: "Proposal follow-ups", description: "Re-engages prospects who received proposals but haven't responded with personalised calls.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "FileText" },
      { title: "Feedback collection", description: "Gathers client satisfaction and project outcome feedback automatically after engagements.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "BarChart2" },
      { title: "Retainer billing reminders", description: "Sends monthly retainer payment reminders and invoice copies without awkward calls.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Database" },
    ],
    benefits: [
      { title: "24/7 client availability", description: "Clients can book consultations and get intake handled at any hour, any day.", icon: "Clock" },
      { title: "Never lose a new lead", description: "Every inbound inquiry is captured and followed up without admin involvement.", icon: "UserPlus" },
      { title: "CRM & scheduling integration", description: "Connects to Salesforce, HubSpot, Calendly, and all major consulting platforms.", icon: "Plug" },
      { title: "Multilingual client support", description: "Engages global clients in their preferred language - 100+ languages supported.", icon: "Languages" },
      { title: "Engagement analytics", description: "Track conversion rates, meeting show rates, and client satisfaction in one dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your firm's number and launch with a consulting-ready AI template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×", label: "More consultations booked", sublabel: "24/7 AI booking vs business hours" },
      { value: "50%", label: "Faster intake processing", sublabel: "Pre-qualified before first meeting" },
      { value: "35%", label: "Higher proposal conversion", sublabel: "With AI follow-up calls" },
      { value: "$20K", label: "Saved per year", sublabel: "In admin and scheduling staff" },
    ],
    services: [
      {
        title: "Project Updates",
        description: "Deliver instant progress reports, milestone alerts, and completion notices without human follow-up, keeping teams aligned.",
        icon: "Activity"
      },
      {
        title: "Permit Status",
        description: "Track permit approvals and schedule inspections with voice-enabled updates, ensuring compliance efficiently.",
        icon: "FileCheck"
      },
      {
        title: "Material Deliveries",
        description: "Coordinate supply schedules, confirm arrivals, and notify teams of site preparation needs to minimize delays.",
        icon: "Package"
      },
      {
        title: "Safety Inspections",
        description: "Conduct compliance checks and send reminders for corrective actions, helping prevent accidents and maintain safety standards.",
        icon: "ShieldCheck"
      },
      {
        title: "Change Orders",
        description: "Manage change requests, approvals, and notifications via voice AI to reduce confusion and disputes among stakeholders.",
        icon: "Repeat"
      },
      {
        title: "Payment Schedules",
        description: "Keep billing on track with AI-driven invoice reminders and payment milestone notifications.",
        icon: "CreditCard"
      },
      {
        title: "Weather Delays",
        description: "Automatically adjust schedules, alert teams, and suggest backup plans during weather-related disruptions.",
        icon: "CloudLightning"
      },
      {
        title: "Completion Notices",
        description: "Ensure smooth project handovers with automated finalization notices and task closures.",
        icon: "CheckCircle"
      }
    ],
    testimonial: {
      quote: "OnDial handles our client intake, meeting scheduling, and session reminders automatically. Our consultants arrive at every meeting fully briefed. Pipeline conversion improved 35%.",
      name: "Rohan Kapoor",
      role: "Managing Partner · Insight Strategy Group",
      initials: "RK",
    },
    ctaHeadline: "Hear your AI agent handle a consulting intake call",
    ctaSubheadline: "Free 14-day trial. No credit card. Consulting-ready in under 30 minutes.",
    serviceHeadline: "Core consulting AI Voice Services",
    serviceSubheadline: "Optimize project management, safety, and communication for consulting firms with AI-powered voice agents.",
  },

  "pharmaceutical-services": {
    headline: "Every patient & partner call",
    headlineHighlight: "handled compliantly",
    subheadline: "Your AI calling agent handles prescription reminders, delivery alerts, HCP outreach, and refill notifications - securely, 24/7.",
    stats: [
      { value: "65%", label: "Better medication adherence" },
      { value: "24/7", label: "Patient & pharmacy support" },
      { value: "50%", label: "Fewer missed refills" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Prescription ready",
        duration: "0:15",
        aiResponse: `"Your prescription for Metformin 500mg is ready at Apollo Pharmacy, Koramangala. It can be collected today between 10 AM and 8 PM."`,
        messages: [
          { from: "ai", text: "Hello, your prescription for Metformin 500mg is ready at Apollo Pharmacy, Koramangala. You can collect it today between 10 AM and 8 PM." },
          { from: "caller", text: "Can I get it delivered instead?" },
          { from: "ai", text: "Absolutely! I've scheduled a home delivery for today between 3–5 PM. You'll receive a confirmation SMS shortly." },
        ],
        caller: "Geeta Sharma",
        num: "+91 98765 11222",
        av: "GS",
        intents: ["Prescription ready", "Home delivery request", "Positive", "English", "Normal"],
        tools: [
          { label: "rx_status()", icon: "Search" },
          { label: "delivery_book()", icon: "CalendarCheck" },
          { label: "sms_confirm()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Rx confirmed", val: "Metformin · Apollo Koramangala" },
          { icon: "CalendarCheck", label: "Delivery booked", val: "Today 3–5 PM" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmation to Geeta" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Prescription ready alert placed" },
          { t: "0:02", dot: "pur", text: "Patient requests home delivery" },
          { t: "0:03", dot: "amb", text: "delivery_book() → Today 3-5 PM" },
          { t: "0:05", dot: "grn", text: "SMS confirmation sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Delivery booked", val: "3–5 PM" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmed" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 48s" },
        ],
      },
      {
        label: "Refill renewal alert",
        duration: "0:16",
        aiResponse: `"Your Amlodipine refill is due in 5 days. I've sent the refill request to your pharmacy and it'll be ready for collection by June 14th."`,
        messages: [
          { from: "ai", text: "Hello, this is a medication reminder. Your Amlodipine 5mg prescription is due for renewal in 5 days." },
          { from: "caller", text: "Can you arrange the refill automatically?" },
          { from: "ai", text: "Done! I've sent the refill request to your registered pharmacy. Your medication will be ready by June 14th. I'll send a collection reminder closer to the date." },
        ],
        caller: "Mohan Rao",
        num: "+91 91234 33300",
        av: "MR",
        intents: ["Refill due", "Auto-refill request", "Positive", "English", "Normal"],
        tools: [
          { label: "rx_due_check()", icon: "Search" },
          { label: "refill_request()", icon: "Database" },
          { label: "reminder_set()", icon: "Bell" },
        ],
        actions: [
          { icon: "Database", label: "Refill requested", val: "Amlodipine · Pharmacy" },
          { icon: "Bell", label: "Reminder set", val: "Collection alert Jun 14" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Refill reminder call placed" },
          { t: "0:02", dot: "pur", text: "Patient requests auto-refill" },
          { t: "0:03", dot: "amb", text: "refill_request() → sent to pharmacy" },
          { t: "0:05", dot: "grn", text: "Collection reminder scheduled" },
        ],
        outcomes: [
          { icon: "Database", label: "Refill", val: "Requested" },
          { icon: "Bell", label: "Reminder", val: "Jun 14" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", "val": "0m 42s" },
        ],
      },
      {
        label: "Delivery dispatched",
        duration: "0:13",
        aiResponse: `"Your medication delivery is on the way. Estimated arrival is 4–5 PM today. The delivery executive's contact number has been sent to your mobile."`,
        messages: [
          { from: "ai", text: "Your medication delivery is out for delivery and will arrive between 4–5 PM today." },
          { from: "caller", text: "Can I get the delivery person's number?" },
          { from: "ai", text: "I've sent the delivery executive's contact to your mobile. They'll call 15 minutes before arrival." },
        ],
        caller: "Anita Joshi",
        num: "+91 99887 66611",
        av: "AJ",
        intents: ["Delivery ETA", "Delivery contact", "Positive", "English", "Normal"],
        tools: [
          { label: "delivery_track()", icon: "Search" },
          { label: "sms_contact()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Search", label: "Delivery tracked", val: "ETA: 4–5 PM" },
          { icon: "MessageSquare", label: "Contact SMS", val: "Executive number sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Delivery dispatch alert placed" },
          { t: "0:02", dot: "pur", text: "Patient requests contact" },
          { t: "0:03", dot: "amb", text: "delivery_track() → 4-5 PM ETA" },
          { t: "0:05", dot: "grn", text: "Executive contact SMS sent" },
        ],
        outcomes: [
          { icon: "Search", label: "ETA", val: "4–5 PM" },
          { icon: "MessageSquare", label: "Contact", val: "SMS sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", "val": "0m 38s" },
        ],
      },
    ],
    useCases: [
      { title: "Prescription ready alerts", description: "Notifies patients when their prescription is ready for collection or initiates home delivery.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Bell" },
      { title: "Refill reminders", description: "Proactively reminds patients when medications are due for renewal and automates the refill request.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Adherence calls", description: "Checks in on patients taking chronic medication to ensure compliance and flag missed doses.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "UserCheck" },
      { title: "HCP outreach", description: "Automates medical representative calls to doctors for detailing, sampling, and appointment scheduling.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "PhoneCall" },
      { title: "Clinical trial recruitment", description: "Calls eligible patients to pre-screen, inform, and book clinical trial consultations.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Search" },
      { title: "Pharmacovigilance reports", description: "Collects adverse event reports from patients and routes them to safety teams compliantly.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "ShieldCheck" },
    ],
    benefits: [
      { title: "Improve medication adherence", description: "Automated refill and adherence reminders improve patient outcomes and reduce lapses.", icon: "UserCheck" },
      { title: "HIPAA & regulatory compliant", description: "All patient calls are encrypted and compliant with pharma data and privacy regulations.", icon: "ShieldCheck" },
      { title: "CRM & pharmacy system sync", description: "Connects to your pharmacy management system, CRM, and HCP database in real time.", icon: "Plug" },
      { title: "Multilingual patient support", description: "Communicates with patients in their regional language - 100+ languages supported.", icon: "Languages" },
      { title: "Drug safety reporting", description: "Structures and routes adverse event reports to pharmacovigilance teams automatically.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your pharma helpline and go live with a healthcare-grade AI template.", icon: "Settings" },
    ],
    outcomes: [
      { value: "65%", label: "Better adherence", sublabel: "Chronic patients with AI reminders" },
      { value: "50%", label: "Fewer missed refills", sublabel: "Via automated renewal alerts" },
      { value: "3×", label: "More HCP calls reached", sublabel: "Via AI-assisted med rep outreach" },
      { value: "$30K", label: "Saved per year", sublabel: "In pharmacy support staffing" },
    ],
    services: [
      {
        title: "Order Confirmations",
        description: "Automatically confirm purchase orders, share delivery schedules, and reduce delays caused by manual acknowledgment processes.",
        icon: "CheckSquare"
      },
      {
        title: "Quality Updates",
        description: "Deliver inspection results, compliance reports, and product quality updates instantly to relevant teams.",
        icon: "ClipboardCheck"
      },
      {
        title: "Inventory Alerts",
        description: "Monitor stock levels and send real-time reorder reminders to ensure uninterrupted production flow.",
        icon: "Package"
      },
      {
        title: "Maintenance Schedules",
        description: "Coordinate equipment servicing, minimize downtime, and optimize predictive maintenance cycles with AI reminders.",
        icon: "CheckCircle"
      },
      {
        title: "Safety Protocols",
        description: "Send safety training reminders, emergency alerts, and incident reporting updates to keep workers safe and informed.",
        icon: "Shield"
      },
      {
        title: "Supplier Communications",
        description: "Enable seamless vendor coordination, material requirement updates, and multilingual communication across global suppliers.",
        icon: "Users"
      },
      {
        title: "Production Updates",
        description: "Provide real-time manufacturing status reports and delivery timeline adjustments for both internal teams and clients.",
        icon: "TrendingUp"
      },
      {
        title: "Regulatory Compliance",
        description: "Keep teams updated with industry standards, certification renewals, and audit reminders, reducing compliance risk.",
        icon: "FileText"
      }
    ],
    testimonial: {
      quote: "OnDial's automated prescription reminders improved our patient adherence by 60%. Refill drop-off reduced dramatically. Our med rep outreach now reaches 3× more doctors per day.",
      name: "Dr. Anil Kapoor",
      role: "Head of Patient Services · MedLife Pharma",
      initials: "AK",
    },
    ctaHeadline: "Hear your AI agent handle a pharma patient call",
    ctaSubheadline: "Free 14-day trial. No credit card. HIPAA-friendly setup in under 30 minutes.",
    serviceHeadline: "Core Pharmaceutical AI Voice Services",
    serviceSubheadline: "Automate prescription management, refill reminders, adherence tracking, and patient outreach with AI-powered voice agents for healthcare providers.",
  },
};

/** Generic fallback content for industries without specific copy. */
function buildFallbackContent(industryName: string): IndustryPageContent {
  const shortName = industryName.split("&")[0]?.trim() || industryName;

  return {
    headline: `Transform your`,
    headlineHighlight: `${industryName} calls`,
    subheadline: `Your AI calling agent handles every inbound call, qualifies leads, and books follow-ups - 24 hours a day, automatically.`,
    stats: [
      { value: "3×", label: "More calls handled" },
      { value: "80%", label: "Reduction in missed calls" },
      { value: "24/7", label: "Availability, zero downtime" },
      { value: "<2s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Inbound inquiry",
        duration: "0:18",
        aiResponse: `"Hi, thanks for calling! I'm the virtual assistant here. How can I help you today?"`,
        messages: [
          { from: "caller", text: `Hi, I have a question about your ${shortName.toLowerCase()} services.` },
          { from: "ai", text: "Happy to help! Could you tell me a bit more about what you're looking for so I can point you in the right direction?" },
          { from: "caller", text: "I'd like to know about pricing and availability." },
          { from: "ai", text: "Great question. I can either share those details now or connect you with a specialist - which would you prefer?" },
        ],
        caller: "Aarav Sharma",
        num: "+91 98765 01234",
        av: "AS",
        intents: [`${shortName} inquiry`, "Pricing/Info", "Neutral", "English", "Normal"],
        tools: [
          { label: "info_lookup()", icon: "Search" },
          { label: "crm_lookup()", icon: "Database" },
        ],
        actions: [
          { icon: "Search", label: "Details fetched", val: `${shortName} info` },
          { icon: "UserPlus", label: "Contact updated", val: "Aarav Sharma" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound call answered by AI" },
          { t: "0:03", dot: "pur", text: "Intent: service inquiry" },
          { t: "0:04", dot: "amb", text: "info_lookup() called" },
          { t: "0:06", dot: "pur", text: "Response generated" },
        ],
        outcomes: [
          { icon: "PhoneCall", label: "Call answered", val: "< 2s" },
          { icon: "UserCheck", label: "Lead captured", val: "CRM updated" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 45s" },
        ],
      },
      {
        label: "Appointment booking",
        duration: "0:20",
        aiResponse: `"Your appointment is confirmed. You'll receive a reminder 24 hours before. Is there anything else I can help with?"`,
        messages: [
          { from: "caller", text: `I'd like to book a ${shortName.toLowerCase()} consultation.` },
          { from: "ai", text: "Of course! I have availability tomorrow at 10 AM or Thursday at 2 PM. Which works for you?" },
          { from: "caller", text: "Tomorrow morning." },
          { from: "ai", text: "Confirmed! Can I take your name and a contact number to send a reminder?" },
        ],
        caller: "Neha Gupta",
        num: "+91 91234 56789",
        av: "NG",
        intents: ["Booking request", `${shortName} service`, "Positive", "English", "High"],
        tools: [
          { label: "calendar_check()", icon: "CalendarDays" },
          { label: "slot_book()", icon: "CalendarCheck" },
        ],
        actions: [
          { icon: "CalendarCheck", label: "Slot booked", val: "Tomorrow 10:00 AM" },
          { icon: "MessageSquare", label: "SMS sent", val: "Confirmation to Neha" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:03", dot: "pur", text: "Intent: booking request" },
          { t: "0:04", dot: "amb", text: "calendar_check() → Slot free" },
          { t: "0:05", dot: "amb", text: "slot_book() → Confirmed" },
          { t: "0:07", dot: "grn", text: "SMS confirmation sent" },
        ],
        outcomes: [
          { icon: "CalendarCheck", label: "Slot booked", val: "10:00 AM" },
          { icon: "MessageSquare", label: "SMS confirmation", val: "Sent" },
          { icon: "Star", label: "CSAT", val: "5.0 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 52s" },
        ],
      },
      {
        label: "Follow-up call",
        duration: "0:15",
        aiResponse: `"I've noted your details and a specialist will follow up within the hour. Thank you for your time!"`,
        messages: [
          { from: "caller", text: "I was contacted earlier and wanted to follow up." },
          { from: "ai", text: "Absolutely. Could I take your name and the reference number from your earlier call?" },
          { from: "caller", text: "Sure - it's John, reference 4821." },
          { from: "ai", text: "Found it! Let me pull up your details and connect you with the right person." },
        ],
        caller: "Kabir Mehta",
        num: "+91 88888 99999",
        av: "KM",
        intents: ["Follow-up", "Ticket/Ref lookup", "Neutral", "English", "Normal"],
        tools: [
          { label: "ticket_lookup()", icon: "Search" },
          { label: "agent_route()", icon: "PhoneCall" },
        ],
        actions: [
          { icon: "Search", label: "Ref found", val: "Ref #4821" },
          { icon: "PhoneCall", label: "Call routed", val: "Transferring..." },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:02", dot: "pur", text: "Intent: follow-up request" },
          { t: "0:03", dot: "amb", text: "ticket_lookup(4821) → Found" },
          { t: "0:05", dot: "grn", text: "Routing to the assigned team" },
        ],
        outcomes: [
          { icon: "Search", label: "Ticket matched", val: "#4821" },
          { icon: "PhoneCall", label: "Routed to agent", val: "Connected" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 15s" },
        ],
      },
    ],
    useCases: [
      { title: "Inbound call handling", description: "Answers every call instantly, day or night, with a professional on-brand voice.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneIncoming" },
      { title: "Appointment scheduling", description: "Books and reschedules meetings directly on the call - synced to your team's calendar.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Lead qualification", description: "Asks qualifying questions and routes hot prospects directly to your sales team.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Filter" },
      { title: "Follow-up automation", description: "Re-engages prospects who didn't convert with personalised automated outreach.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "BellRing" },
      { title: "Customer support", description: "Handles FAQs, status queries, and common issues without a human agent.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "MessageSquare" },
      { title: "CRM data capture", description: "Automatically logs every call detail, notes, and outcome into your CRM.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Database" },
    ],
    benefits: [
      { title: "Never miss a call", description: "The AI answers every call instantly - even at midnight on a public holiday.", icon: "Clock" },
      { title: "Consistent quality always", description: "Every caller gets the same professional experience, regardless of call volume.", icon: "MessageSquare" },
      { title: "Instant CRM sync", description: "Pushes call data, leads, and bookings into HubSpot, Salesforce, or Zoho automatically.", icon: "Plug" },
      { title: "Multilingual support", description: "Speaks your customer's language - auto-detected across 100+ languages.", icon: "Languages" },
      { title: "Full call analytics", description: "Transcripts, sentiment scores, and conversion data in one clean dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your number, pick a template, and your agent is live - no engineering needed.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×", label: "More calls handled", sublabel: "Per agent vs manual handling" },
      { value: "80%", label: "Fewer missed calls", sublabel: "After switching to AI" },
      { value: "40%", label: "Higher conversion", sublabel: "On follow-up campaigns" },
      { value: "$25K", label: "Saved per year", sublabel: "In call-handling staffing costs" },
    ],
    services: [
      { title: "Appointment Confirmations", description: "Automated calls help patients remember appointments, reducing no-shows and improving clinic efficiency.", icon: "PhoneIncoming" },
      { title: "Prescription Reminders", description: "Voice agents notify patients about refills, dosage timings, and renewal requirements, improving medication adherence and treatment outcomes.", icon: "CalendarDays" },
      { title: "Patient Follow-ups", description: "AI voice agents check in with patients post-treatment, ensuring recovery progress while minimizing the burden on doctors and nurses.", icon: "Filter" },
      { title: "Insurance Claims Processing", description: "Streamline insurance operations with automated claim status updates, documentation requests, and eligibility confirmations.", icon: "BellRing" },
      { title: "Lab Results Notifications", description: "Deliver test results quickly and securely. Patients receive clear voice notifications along with next-step instructions.", icon: "MessageSquare" },
      { title: "Preventive Care Reminders", description: "Proactively remind patients about vaccinations, annual check-ups, and screenings to support preventive healthcare strategies.", icon: "Database" },
      { title: "Surgery Pre/Post Care", description: "Automated voice guidance ensures patients receive proper instructions before and after surgery, reducing risks and complications.", icon: "Database" },
      { title: "Chronic Disease Management", description: "Ongoing voice check-ins for diabetes, hypertension, and other chronic conditions help patients stay consistent with their treatment plans.", icon: "Database" },
    ],
    testimonial: {
      quote: `OnDial transformed how we handle calls. We went from missing 30% of inbound inquiries to answering 100% of them - automatically. The ROI was clear within the first month.`,
      name: "Alex Fernandes",
      role: `Operations Manager · ${industryName} Firm`,
      initials: "AF",
    },
    ctaHeadline: `Hear your AI agent handle a ${industryName.toLowerCase()} call`,
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
    serviceHeadline: "Core Healthcare & Medical AI Voice Services",
    serviceSubheadline: "Transform healthcare operations with AI-powered voice solutions.",
  };
}

export function getIndustryPageContent(slug: string, industryName: string): IndustryPageContent {
  return INDUSTRY_PAGE_CONTENT[slug] ?? buildFallbackContent(industryName);
}
