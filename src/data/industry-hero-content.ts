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
  /** Tailwind bg colour class for icon wrapper */
  iconBg: string;
  /** Tailwind text colour class for icon */
  iconColor: string;
  /** Lucide icon name string */
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

export type IndustryTestimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type IndustryDemoScenario = {
  label: string;
  duration: string;
  aiResponse: string;
  /** Optional real audio file served from /public */
  audioSrc?: string;
  /** BCP-47 language tag e.g. "hi", "en" — shown in the player */
  lang?: string;
  messages: { from: "caller" | "ai"; text: string }[];
};

export type IndustryPageContent = {
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  stats: IndustryStat[];
  demoScenarios: IndustryDemoScenario[];
  useCases: IndustryUseCase[];
  benefits: IndustryBenefit[];
  outcomes: IndustryOutcome[];
  testimonial: IndustryTestimonial;
  ctaHeadline: string;
  ctaSubheadline: string;
};

/* ─────────────────────────────────────────────────────────
   Per-industry page content
───────────────────────────────────────────────────────── */

const INDUSTRY_PAGE_CONTENT: Record<string, IndustryPageContent> = {
  "real-estate-services": {
    headline: "Never miss a lead",
    headlineHighlight: "again",
    subheadline: "Your AI calling agent answers every inquiry, qualifies buyers and tenants, and books property visits — 24 hours a day, without a single rep on the line.",
    stats: [
      { value: "3×",   label: "More leads qualified" },
      { value: "80%",  label: "Reduction in missed calls" },
      { value: "24/7", label: "Availability, zero downtime" },
      { value: "<2s",  label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Property inquiry",
        duration: "1:20",
        audioSrc: "/demos/property-inquiry.mp3",
        lang: "hi",
        aiResponse: `"नमस्ते रिधम, मैं आर्यन बोल रहा हूँ सिक्योर श्योर इंश्योरेंस से। क्या अभी आपसे बात करने का सही समय है?"`,
        messages: [
          { from: "ai",     text: "नमस्ते रिधम, मैं आर्यन बोल रहा हूँ सिक्योर श्योर इंश्योरेंस से। क्या अभी आपसे बात करने का सही समय है?" },
          { from: "caller", text: "हाँ, बताइए।" },
          { from: "ai",     text: "धन्यवाद। हम मेटा विज्ञापनों के ज़रिए लोगों को उनकी ज़रूरतों के हिसाब से सही बीमा चुनने में मदद कर रहे हैं। क्या आप अभी अपने लिए या अपने परिवार के लिए किसी खास तरह के बीमा, जैसे हेल्थ, लाइफ या ऑटो इंश्योरेंस के बारे में जानकारी लेना चाहेंगे?" },
          { from: "caller", text: "लाइफ इंश्योरेंस।" },
          { from: "ai",     text: "समझ गया, लाइफ इंश्योरेंस। क्या आप अपने लिए कोई टर्म प्लान देख रहे हैं जिसमें कम प्रीमियम में ज़्यादा कवर मिले, या फिर आप ऐसा प्लान चाहते हैं जिसमें मैच्योरिटी पर आपका पैसा वापस मिल जाए?" },
          { from: "caller", text: "वो क्या होता है?" },
          { from: "ai",     text: "टर्म प्लान में आपको कम पैसों में बहुत बड़ा कवर मिलता है, जैसे कि पचास लाख रुपये का बीमा, लेकिन इसमें मैच्योरिटी पर पैसा वापस नहीं मिलता। वहीं, रिटर्न ऑफ प्रीमियम प्लान में मैच्योरिटी के समय आपका जमा किया हुआ पैसा आपको वापस मिल जाता है। क्या आप इनमें से किसी एक के बारे में विस्तार से जानना चाहेंगे?" },
        ],
      },
      {
        label: "Booking a visit",
        duration: "0:22",
        aiResponse: `"Your viewing is confirmed for Saturday at 11:00 AM at 42 Marine Drive. You'll receive a confirmation SMS shortly."`,
        messages: [
          { from: "caller", text: "I'd like to book a visit for the Marine Drive apartment." },
          { from: "ai",     text: "Happy to help! I have Saturday 11am or Sunday 2pm available for that property. Which do you prefer?" },
          { from: "caller", text: "Saturday morning works." },
          { from: "ai",     text: "Confirmed! Your visit is booked for Saturday 11 AM. Can I take your name and a contact number to send a reminder?" },
        ],
      },
      {
        label: "Lead qualification",
        duration: "0:25",
        aiResponse: `"Based on your answers, I've marked this as a hot lead and notified your agent. Expect a call within the hour."`,
        messages: [
          { from: "caller", text: "I'm looking for a 2BHK, budget around 80 lakhs." },
          { from: "ai",     text: "Got it. Are you looking to move in within 3 months, or is this more of a long-term search?" },
          { from: "caller", text: "Within 3 months, ideally." },
          { from: "ai",     text: "Perfect. Do you need a home loan, or are you planning a cash purchase? This helps me match the right listings for you." },
        ],
      },
    ],
    useCases: [
      { title: "Property inquiries",    description: "Answers questions on listings, pricing, availability, and amenities — instantly, any hour.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneIncoming" },
      { title: "Visit scheduling",      description: "Books property viewings directly on the call — synced to your agent's calendar in real time.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Lead qualification",    description: "Asks budget, timeline, and preference questions to score and route the hottest leads first.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Filter" },
      { title: "Follow-up reminders",   description: "Calls back leads who didn't convert — automatically, with a personalised message.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "BellRing" },
      { title: "Rental applications",   description: "Walks tenants through application steps and collects key details over the phone.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "FileText" },
      { title: "Tenant support",        description: "Handles maintenance requests, payment queries, and lease questions without agent involvement.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],
    benefits: [
      { title: "Never miss an after-hours lead",  description: "The AI answers every call at 11 pm on a Sunday — just like a top agent would at 9 am on Monday.", icon: "Clock" },
      { title: "Consistent scripts, every call",  description: "Every caller hears the same professional, on-brand experience — regardless of volume or time of day.", icon: "MessageSquare" },
      { title: "Syncs with your CRM instantly",   description: "Pushes lead data, notes, and booked slots into HubSpot, Salesforce, or Zoho automatically.", icon: "Plug" },
      { title: "Speaks every buyer's language",   description: "Auto-detects the caller's language and responds naturally — across 100+ languages.", icon: "Languages" },
      { title: "Full visibility into call quality", description: "Transcripts, sentiment scores, and conversion rates for every call — in one dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes",        description: "Connect your number, pick a real estate template, and your agent is live — no IT team needed.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×",   label: "More qualified leads",   sublabel: "Per month vs manual call handling" },
      { value: "80%",  label: "Fewer missed calls",     sublabel: "After switching to AI call handling" },
      { value: "40%",  label: "More viewings booked",   sublabel: "Via automated scheduling on calls" },
      { value: "$28K", label: "Saved per year",         sublabel: "In staffing costs for a 5-agent office" },
    ],
    testimonial: {
      quote: "We were losing leads every weekend. Since OnDial, our AI answers every call, qualifies the buyer, and books the viewing — before I've even had my morning coffee. Our conversion rate is up 40% in 3 months.",
      name: "Ravi Shah",
      role: "Principal Broker · Prestige Realty, Mumbai",
      initials: "RS",
    },
    ctaHeadline: "Hear your AI agent handle a real estate call",
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
  },

  "healthcare-and-medical-services": {
    headline: "Every patient call",
    headlineHighlight: "answered",
    subheadline: "Your AI calling agent books appointments, sends reminders, and handles follow-ups — 24/7, so your staff can focus on care.",
    stats: [
      { value: "60%",  label: "Fewer no-shows" },
      { value: "24/7", label: "Patient availability" },
      { value: "90%",  label: "Call resolution rate" },
      { value: "<3s",  label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Appointment booking",
        duration: "0:20",
        aiResponse: `"Your appointment with Dr. Mehta is confirmed for Tuesday at 10:30 AM. You'll receive a reminder 24 hours before."`,
        messages: [
          { from: "caller", text: "Hi, I need to book an appointment with Dr. Mehta." },
          { from: "ai",     text: "Of course! Dr. Mehta has availability on Tuesday at 10:30 AM or Thursday at 2 PM. Which suits you?" },
          { from: "caller", text: "Tuesday morning, please." },
          { from: "ai",     text: "Perfect. Can I confirm your date of birth for the patient record?" },
        ],
      },
      {
        label: "Appointment reminder",
        duration: "0:15",
        aiResponse: `"This is a reminder for your appointment tomorrow at 10:30 AM with Dr. Mehta at City Health Clinic. Press 1 to confirm."`,
        messages: [
          { from: "ai",     text: "Hello, this is a reminder for your appointment tomorrow at 10:30 AM with Dr. Mehta." },
          { from: "caller", text: "Yes, I'll be there. Can I reschedule if needed?" },
          { from: "ai",     text: "Absolutely. You can call us back or press 2 now to reschedule. Is there anything else I can help with?" },
          { from: "caller", text: "No, that's all. Thank you." },
        ],
      },
      {
        label: "Lab result follow-up",
        duration: "0:18",
        aiResponse: `"Your test results are ready. I'm connecting you with the nurse on duty who can walk you through the report."`,
        messages: [
          { from: "caller", text: "I'm calling to check on my blood test results." },
          { from: "ai",     text: "I can see your results are ready from last Monday. Would you like me to connect you with a nurse to discuss them?" },
          { from: "caller", text: "Yes please." },
          { from: "ai",     text: "Connecting you now. Please hold for just a moment." },
        ],
      },
    ],
    useCases: [
      { title: "Appointment booking",   description: "Books and reschedules patient appointments instantly — synced to your clinic calendar in real time.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "CalendarDays" },
      { title: "Reminder calls",        description: "Reduces no-shows by calling patients 24–48 hours before their appointment automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Lab result follow-ups", description: "Notifies patients when results are ready and routes complex queries to clinical staff.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "FileText" },
      { title: "Prescription refills",  description: "Handles refill requests and routes urgent cases to the prescribing doctor automatically.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Pill" },
      { title: "Insurance queries",     description: "Answers coverage and pre-auth questions without tying up your front-desk staff.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "ShieldCheck" },
      { title: "Post-visit follow-up",  description: "Checks in on patients after procedures, collects feedback, and flags concerns to clinicians.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],
    benefits: [
      { title: "24/7 patient access",          description: "Patients can book or change appointments at 2 AM — without waking your reception team.", icon: "Clock" },
      { title: "Reduce administrative load",   description: "Free your staff from routine scheduling calls so they can focus on in-clinic patient care.", icon: "MessageSquare" },
      { title: "EHR & calendar sync",          description: "Pushes appointment data directly into your practice management system automatically.", icon: "Plug" },
      { title: "Multilingual support",         description: "Communicates in the patient's preferred language across 100+ languages seamlessly.", icon: "Languages" },
      { title: "Compliance-ready transcripts", description: "Every call is logged, transcribed, and stored in line with healthcare data requirements.", icon: "BarChart2" },
      { title: "Live in under 30 minutes",     description: "Connect your clinic number, choose a healthcare template, and you're live — no IT needed.", icon: "Settings" },
    ],
    outcomes: [
      { value: "60%",  label: "Fewer no-shows",       sublabel: "Via automated reminder calls" },
      { value: "3×",   label: "More appointments",    sublabel: "Booked outside working hours" },
      { value: "85%",  label: "Patient satisfaction", sublabel: "Score after switching to AI" },
      { value: "$22K", label: "Saved per year",       sublabel: "In admin staffing per clinic" },
    ],
    testimonial: {
      quote: "Our front desk was overwhelmed with appointment calls. OnDial now handles 70% of all bookings automatically. Our staff are happier and patients love the instant response.",
      name: "Dr. Priya Nair",
      role: "Medical Director · Wellness First Clinics, Bangalore",
      initials: "PN",
    },
    ctaHeadline: "Hear your AI agent handle a patient call",
    ctaSubheadline: "Free 14-day trial. No credit card. HIPAA-friendly setup in under 30 minutes.",
  },
};

/** Generic fallback content for industries without specific copy. */
function buildFallbackContent(industryName: string): IndustryPageContent {
  return {
    headline: `Transform your`,
    headlineHighlight: `${industryName} calls`,
    subheadline: `Your AI calling agent handles every inbound call, qualifies leads, and books follow-ups — 24 hours a day, automatically.`,
    stats: [
      { value: "3×",   label: "More calls handled" },
      { value: "80%",  label: "Reduction in missed calls" },
      { value: "24/7", label: "Availability, zero downtime" },
      { value: "<2s",  label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Inbound inquiry",
        duration: "0:18",
        aiResponse: `"Hi, thanks for calling! I'm the virtual assistant here. How can I help you today?"`,
        messages: [
          { from: "caller", text: "Hi, I have a question about your services." },
          { from: "ai",     text: "Happy to help! Could you tell me a bit more about what you're looking for so I can point you in the right direction?" },
          { from: "caller", text: "I'd like to know about pricing and availability." },
          { from: "ai",     text: "Great question. I can either share those details now or connect you with a specialist — which would you prefer?" },
        ],
      },
      {
        label: "Appointment booking",
        duration: "0:20",
        aiResponse: `"Your appointment is confirmed. You'll receive a reminder 24 hours before. Is there anything else I can help with?"`,
        messages: [
          { from: "caller", text: "I'd like to book an appointment." },
          { from: "ai",     text: "Of course! I have availability tomorrow at 10am or Thursday at 2pm. Which works for you?" },
          { from: "caller", text: "Tomorrow morning." },
          { from: "ai",     text: "Confirmed! Can I take your name and a contact number to send a reminder?" },
        ],
      },
      {
        label: "Follow-up call",
        duration: "0:15",
        aiResponse: `"I've noted your details and a specialist will follow up within the hour. Thank you for your time!"`,
        messages: [
          { from: "caller", text: "I was contacted earlier and wanted to follow up." },
          { from: "ai",     text: "Absolutely. Could I take your name and the reference number from your earlier call?" },
          { from: "caller", text: "Sure — it's John, reference 4821." },
          { from: "ai",     text: "Found it! Let me pull up your details and connect you with the right person." },
        ],
      },
    ],
    useCases: [
      { title: "Inbound call handling",  description: "Answers every call instantly, day or night, with a professional on-brand voice.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneIncoming" },
      { title: "Appointment scheduling", description: "Books and reschedules meetings directly on the call — synced to your team's calendar.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Lead qualification",     description: "Asks qualifying questions and routes hot prospects directly to your sales team.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Filter" },
      { title: "Follow-up automation",   description: "Re-engages prospects who didn't convert with personalised automated outreach.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "BellRing" },
      { title: "Customer support",       description: "Handles FAQs, status queries, and common issues without a human agent.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "MessageSquare" },
      { title: "CRM data capture",       description: "Automatically logs every call detail, notes, and outcome into your CRM.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Database" },
    ],
    benefits: [
      { title: "Never miss a call",           description: "The AI answers every call instantly — even at midnight on a public holiday.", icon: "Clock" },
      { title: "Consistent quality always",   description: "Every caller gets the same professional experience, regardless of call volume.", icon: "MessageSquare" },
      { title: "Instant CRM sync",            description: "Pushes call data, leads, and bookings into HubSpot, Salesforce, or Zoho automatically.", icon: "Plug" },
      { title: "Multilingual support",        description: "Speaks your customer's language — auto-detected across 100+ languages.", icon: "Languages" },
      { title: "Full call analytics",         description: "Transcripts, sentiment scores, and conversion data in one clean dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes",    description: "Connect your number, pick a template, and your agent is live — no engineering needed.", icon: "Settings" },
    ],
    outcomes: [
      { value: "3×",   label: "More calls handled",    sublabel: "Per agent vs manual handling" },
      { value: "80%",  label: "Fewer missed calls",    sublabel: "After switching to AI" },
      { value: "40%",  label: "Higher conversion",     sublabel: "On follow-up campaigns" },
      { value: "$25K", label: "Saved per year",        sublabel: "In call-handling staffing costs" },
    ],
    testimonial: {
      quote: `OnDial transformed how we handle calls. We went from missing 30% of inbound inquiries to answering 100% of them — automatically. The ROI was clear within the first month.`,
      name: "Alex Fernandes",
      role: `Operations Manager · ${industryName} Firm`,
      initials: "AF",
    },
    ctaHeadline: `Hear your AI agent handle a ${industryName.toLowerCase()} call`,
    ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",
  };
}

export function getIndustryPageContent(slug: string, industryName: string): IndustryPageContent {
  return INDUSTRY_PAGE_CONTENT[slug] ?? buildFallbackContent(industryName);
}
