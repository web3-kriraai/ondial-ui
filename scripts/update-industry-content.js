/**
 * Transformation script to update industry page content and FAQs.
 * Run with: node scripts/update-industry-content.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ─── Helper: replace exact string once ───────────────────────────────────────
function replaceOnce(content, oldStr, newStr, label) {
  if (!content.includes(oldStr)) {
    console.warn(`WARN: Could not find target for: ${label || oldStr.slice(0, 80)}`);
    return content;
  }
  return content.replace(oldStr, newStr);
}

// ─── Load files ───────────────────────────────────────────────────────────────
// Normalize to LF so all pattern matches work cross-platform
let heroContent = fs.readFileSync(path.join(ROOT, 'src/data/industry-hero-content.ts'), 'utf8').replace(/\r\n/g, '\n');
let faqContent  = fs.readFileSync(path.join(ROOT, 'src/data/site-faqs.ts'), 'utf8').replace(/\r\n/g, '\n');

// ══════════════════════════════════════════════════════════════════════════════
// PART 1 – site-faqs.ts: fix duplicate item in sales-lead-generation
// ══════════════════════════════════════════════════════════════════════════════
faqContent = replaceOnce(
  faqContent,
  `    {
      id: "do-ai-voice-agents-handle-appointment-scheduling",
      question: "Do AI voice agents handle appointment scheduling?",
      answer: "Yes, AI voice agents integrate with calendars to schedule, confirm, or reschedule meetings. This ensures smooth coordination without manual effort, saving sales reps valuable time and improving prospect experience.",
    },
    {
      id: "how-do-ai-agents-support-customer-onboarding",`,
  `    {
      id: "how-do-ai-agents-support-customer-onboarding",`,
  'faq:sales-lead-generation duplicate removal'
);

fs.writeFileSync(path.join(ROOT, 'src/data/site-faqs.ts'), faqContent);
console.log('✓ site-faqs.ts updated');

// ══════════════════════════════════════════════════════════════════════════════
// PART 2 – industry-hero-content.ts changes
// ══════════════════════════════════════════════════════════════════════════════

// ─── Single-line field replacements ─────────────────────────────────────────

const singleLineChanges = [
  // ── real-estate ──────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a real estate call"',
   'ctaHeadline: "Revolutionize Your Real Estate Business"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",\n    serviceHeadline: "Core Real Estate AI Voice Services"',
   'ctaSubheadline: "Automate inquiries, improve client engagement, and close deals faster with OnDial\'s AI voice agents. Book a demo with OnDial today.",\n    serviceHeadline: "Core Real Estate AI Voice Services"'],
  ['useCasesTitle: "Why Real Estate Needs AI Voice Agents ?"',
   'useCasesTitle: "Use Cases Across Real Estate"'],

  // ── healthcare ────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a patient call"',
   'ctaHeadline: "Boost Patient Engagement & Streamline Operations"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. HIPAA-friendly setup in under 30 minutes."',
   'ctaSubheadline: "Boost patient engagement and streamline operations with AI voice agents. Contact OnDial today to transform your healthcare & medical communication."'],
  ['useCasesTitle: "Why AI Voice Agents in Healthcare & Medical Industry ?"',
   'useCasesTitle: "Use Cases in Healthcare & Medical Industry"'],

  // ── insurance ─────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle an insurance call"',
   'ctaHeadline: "Get Started with AI Voice Agents for Insurance"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",\n    serviceHeadline: "Core Insurance AI Voice Services"',
   'ctaSubheadline: "Ready to modernize your insurance services? With OnDial, you can transform claims, renewals, and customer engagement into streamlined, AI-powered experiences. Book a demo today.",\n    serviceHeadline: "Core Insurance AI Voice Services"'],
  ['useCasesTitle: "Why Insurance Companies Need AI Voice Agents ?"',
   'useCasesTitle: "Core Insurance AI Voice Services"'],

  // ── finance-banking ────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a banking call"',
   'ctaHeadline: "Ready to Transform Your Financial Services?"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Secure banking setup in under 30 minutes."',
   'ctaSubheadline: "Book a demo with OnDial and see how we help banks and financial institutions deliver secure, scalable, and personalized customer experiences."'],
  ['serviceHeadline: "Core Financial & Banking AI Voice Services"',
   'serviceHeadline: "Core Finance & Banking AI Voice Services"'],
  ['useCasesTitle: "Why Banking & Financial Services Need AI Voice Agents ?"',
   'useCasesTitle: "Use Cases Across Finance & Banking"'],

  // ── call-centers-bpo ──────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a support call"',
   'ctaHeadline: "Ready to Revolutionize Your BPO or Call Center?"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. BPO-ready in under 30 minutes."',
   'ctaSubheadline: "Partner with OnDial AI Voice Agents to reduce costs, scale operations, and deliver global-ready customer experiences."'],
  ['useCasesTitle: "Why Call Centers & BPOs Need AI Voice Agents ?"',
   'useCasesTitle: "Core Call Centers & BPO AI Voice Services"'],

  // ── travel-tourism ────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a travel inquiry"',
   'ctaHeadline: "Get Started with OnDial Today"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",\n    serviceHeadline: "Core Travel & Tourism AI Voice Services"',
   'ctaSubheadline: "Ready to revolutionize your travel services? Partner with OnDial\'s AI Voice Agents for Travel & Tourism Services to delight customers and scale your business globally.",\n    serviceHeadline: "Core Travel & Tourism AI Voice Services"'],
  ['useCasesTitle: "Why Travel & Tourism Industry Needs AI Voice Agents ?"',
   'useCasesTitle: "Core Travel & Tourism AI Voice Services"'],

  // ── transportation-logistics ──────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a logistics call"',
   'ctaHeadline: "Boost Logistics Efficiency with OnDial\'s AI Voice Agents"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",\n    serviceHeadline: "Core Transportation & Logistics AI Voice Services"',
   'ctaSubheadline: "Boost logistics efficiency with OnDial\'s AI voice agents. Request a demo and see how our solutions transform your operations.",\n    serviceHeadline: "Core Transportation & Logistics AI Voice Services"'],
  ['useCasesTitle: "Why Transportation & Logistics Industry Needs AI Voice Agents ?"',
   'useCasesTitle: "Use Cases: Where AI Voice Agents Deliver Value"'],

  // ── retail-e-commerce ─────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a retail support call"',
   'ctaHeadline: "Get Started with OnDial Today"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Live in under 30 minutes.",\n    serviceHeadline: "Core Retail & E-commerce AI Voice Services"',
   'ctaSubheadline: "Don\'t let cart abandonment, poor customer engagement, or missed opportunities limit your growth. With OnDial\'s AI Voice Agents for Retail & E-commerce, you can scale faster, serve better, and grow globally.",\n    serviceHeadline: "Core Retail & E-commerce AI Voice Services"'],
  ['useCasesTitle: "Why Retail & E-commerce Industry Needs AI Voice Agents ?"',
   'useCasesTitle: "Use Cases Across Global Retail & E-commerce"'],

  // ── telecommunications ────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a telecom support call"',
   'ctaHeadline: "Future-Ready Telecom Companies Lead with AI"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Carrier-ready in under 30 minutes."',
   'ctaSubheadline: "Future-ready telecom companies are already investing in AI voice automation in telecom. Don\'t fall behind."'],
  ['useCasesTitle: "Why Choose OnDial for Telecom AI Voice Agents ?"',
   'useCasesTitle: "Core Telecommunications AI Voice Services"'],

  // ── automotive ────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a dealership call"',
   'ctaHeadline: "Get Started with AI Voice Agents for Automotive Services"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Dealer-ready in under 30 minutes."',
   'ctaSubheadline: "The automotive industry is moving fast—don\'t let your customer experience fall behind. Embrace AI voice agents for automotive services with OnDial. Book a demo today."'],
  ['useCasesTitle: "Why AI Voice Agents Matter in the Automotive Industry ?"',
   'useCasesTitle: "Industries & Use Cases in Automotive"'],

  // ── education ─────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a student inquiry"',
   'ctaHeadline: "Transform Your Education Services with AI Voice Agents"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Education-ready in under 30 minutes."',
   'ctaSubheadline: "Transform your education services with AI voice agents. Make communication instant, personalized, and impactful with OnDial."'],
  ['serviceHeadline: "Key Benefits of OnDial in Education"',
   'serviceHeadline: "Core Education AI Voice Services"'],
  ['serviceSubheadline: "Enhance learning, communication, and administrative efficiency with AI voice agents"',
   'serviceSubheadline: "Streamline student engagement, administrative tasks, and institutional communication with AI-powered voice agents."'],
  ['useCasesTitle: "Why Education Needs AI Voice Agents ?"',
   'useCasesTitle: "Core Education AI Voice Services"'],

  // ── hospitality ───────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a guest reservation call"',
   'ctaHeadline: "Upgrade Your Guest Experience Today"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Hospitality-ready in under 30 minutes."',
   'ctaSubheadline: "Book a demo with OnDial and discover how AI voice agents can transform your hospitality business."'],
  ['useCasesTitle: "Why Do Hotels & Resorts Need AI Voice Agents ?"',
   'useCasesTitle: "Key Use Cases Across the Hospitality Industry"'],

  // ── legal ─────────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a legal intake call"',
   'ctaHeadline: "Transform Your Legal Practice with AI Voice Agents"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Law-firm ready in under 30 minutes."',
   'ctaSubheadline: "Transform your legal practice with AI voice agents. Schedule a demo with OnDial today and see how AI can streamline client communication and case management."'],
  ['useCasesTitle: "Why Do Law Firms Need AI Voice Agents ?"',
   'useCasesTitle: "Use Cases of AI Voice Agents in Legal Firms"'],

  // ── government ────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a citizen service call"',
   'ctaHeadline: "Ready to Transform How Your Government Connects with Citizens?"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Government-ready in under 30 minutes."',
   'ctaSubheadline: "Partner with OnDial to build secure, multilingual, and scalable AI voice agents for government services."'],
  ['useCasesTitle: "Why Do Government Agencies Need AI Voice Agents ?"',
   'useCasesTitle: "Use Cases: AI Voice Agents in Action"'],

  // ── manufacturing ─────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a manufacturing ops call"',
   'ctaHeadline: "Boost Efficiency, Safety & Compliance"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. Plant-ready in under 30 minutes."',
   'ctaSubheadline: "Boost efficiency, safety, and compliance with OnDial\'s AI voice agents for manufacturing services. Contact OnDial today to discover how voice AI can transform your manufacturing operations."'],
  ['useCasesTitle: "Why Manufacturing Needs AI Voice Agents ?"',
   'useCasesTitle: "Core Manufacturing AI Voice Services"'],

  // ── non-profit ────────────────────────────────────────────────────────────
  ['ctaHeadline: "Hear your AI agent handle a donor outreach call"',
   'ctaHeadline: "Ready to Scale Your Nonprofit\'s Impact?"'],
  ['ctaSubheadline: "Free 14-day trial. No credit card. NGO-ready in under 30 minutes."',
   'ctaSubheadline: "Empower your organization with AI voice agents. Increase donations, engage volunteers, and build stronger communities with OnDial."'],
  ['useCasesTitle: "What Are AI Voice Agents for Non-Profits?"',
   'useCasesTitle: "Core Non-Profit AI Voice Services"'],
];

for (const [oldStr, newStr] of singleLineChanges) {
  heroContent = replaceOnce(heroContent, oldStr, newStr, `single-line: ${oldStr.slice(0, 60)}`);
}
console.log('✓ Single-line fields updated');

// ─── Benefits array replacements ─────────────────────────────────────────────

const benefitsReplacements = {

  'real-estate': {
    old: `    benefits: [
      { title: "Never miss an after-hours lead", description: "The AI answers every call at 11 pm on a Sunday - just like a top agent would at 9 am on Monday.", icon: "Clock" },
      { title: "Consistent scripts, every call", description: "Every caller hears the same professional, on-brand experience - regardless of volume or time of day.", icon: "MessageSquare" },
      { title: "Syncs with your CRM instantly", description: "Pushes lead data, notes, and booked slots into HubSpot, Salesforce, or Zoho automatically.", icon: "Plug" },
      { title: "Speaks every buyer's language", description: "Auto-detects the caller's language and responds naturally - across 100+ languages.", icon: "Languages" },
      { title: "Full visibility into call quality", description: "Transcripts, sentiment scores, and conversion rates for every call - in one dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your number, pick a real estate template, and your agent is live - no IT team needed.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Faster Lead Response", description: "Respond to inquiries instantly, driving higher conversions", icon: "MessageCircle" },
      { title: "24/7 Multilingual Support", description: "Serve global clients in their preferred language anytime", icon: "Languages" },
      { title: "Reduced Workload", description: "Automate repetitive tasks for brokers and agents", icon: "Server" },
      { title: "Personalized Communication", description: "Tailor messages and updates to each client", icon: "UserCheck" },
      { title: "Proactive Client Updates", description: "Keep clients informed about listings, price changes, and market trends", icon: "Bell" },
      { title: "Increased Investor Engagement", description: "Deliver instant alerts on investment opportunities and property updates", icon: "TrendingUp" },
    ],`,
  },

  'healthcare': {
    old: `    benefits: [
      { title: "24/7 patient access", description: "Patients can book or change appointments at 2 AM - without waking your reception team.", icon: "Clock" },
      { title: "Reduce administrative load", description: "Free your staff from routine scheduling calls so they can focus on in-clinic patient care.", icon: "MessageSquare" },
      { title: "EHR & calendar sync", description: "Pushes appointment data directly into your practice management system automatically.", icon: "Plug" },
      { title: "Multilingual support", description: "Communicates in the patient's preferred language across 100+ languages seamlessly.", icon: "Languages" },
      { title: "Compliance-ready transcripts", description: "Every call is logged, transcribed, and stored in line with healthcare data requirements.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your clinic number, choose a healthcare template, and you're live - no IT needed.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "24/7 Patient Support", description: "Always available for reminders and updates", icon: "Clock" },
      { title: "Multilingual Communication", description: "Engage patients in their preferred language", icon: "Languages" },
      { title: "HIPAA-Compliant Security", description: "Ensuring data privacy and trust", icon: "ShieldCheck" },
      { title: "Scalability", description: "Suitable for small clinics and large hospitals alike", icon: "Server" },
      { title: "Personalized Experience", description: "AI adapts tone and message to patient needs", icon: "UserCheck" },
    ],`,
  },

  'insurance': {
    old: `    benefits: [
      { title: "24/7 policy support", description: "Policyholders get instant answers at any hour - no hold queues, no lost calls.", icon: "Clock" },
      { title: "Reduce lapse rates", description: "Automated premium reminders with payment links cut policy lapses by up to 35%.", icon: "BellRing" },
      { title: "CRM & policy system sync", description: "Pushes call outcomes and updates directly into your policy management platform.", icon: "Plug" },
      { title: "Multilingual support", description: "Handles customers in their preferred language across 100+ languages automatically.", icon: "Languages" },
      { title: "Compliance-ready call logs", description: "Every call is recorded and transcribed in line with IRDAI and data regulations.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your number, choose an insurance template, and your AI is live instantly.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Faster Claim Resolutions", description: "Automated updates reduce waiting times", icon: "Clock" },
      { title: "24/7 Multilingual Support", description: "Customers can get help anytime, anywhere", icon: "Languages" },
      { title: "Reduced Operational Costs", description: "Fewer manual interventions required", icon: "DollarSign" },
      { title: "Enhanced Accuracy", description: "Minimizes errors in renewals and claim settlements", icon: "CheckCircle" },
      { title: "Improved Customer Loyalty", description: "Personalized interactions build trust", icon: "UserCheck" },
    ],`,
  },

  'finance-banking': {
    old: `    benefits: [
      { title: "Secure by design", description: "All calls are encrypted and compliant with RBI, PCI-DSS, and banking data regulations.", icon: "ShieldCheck" },
      { title: "Zero missed payments", description: "Automated EMI reminders with payment links reduce delinquency before it happens.", icon: "BellRing" },
      { title: "Core banking integration", description: "Connects to your CBS, CRM, and fraud systems for real-time data on every call.", icon: "Plug" },
      { title: "Multilingual banking support", description: "Serves customers in 100+ languages - regional language support built in.", icon: "Languages" },
      { title: "Full audit trail", description: "Every interaction is logged, transcribed, and stored for compliance and quality review.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No engineering work required - connect your number and go live with a banking template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "24/7 Customer Support", description: "Always-on support for customer needs", icon: "Clock" },
      { title: "Faster Loan Approvals", description: "Speed up processing with proactive updates", icon: "TrendingUp" },
      { title: "Fraud Prevention", description: "Immediate alerts prevent major losses", icon: "ShieldCheck" },
      { title: "Customer Trust", description: "Transparent, secure, and real-time communication builds loyalty", icon: "UserCheck" },
      { title: "Reduced Workload", description: "Free up human agents for complex cases", icon: "Server" },
    ],`,
  },

  'call-centers-bpo': {
    old: `    benefits: [
      { title: "Handle 3× more volume", description: "AI handles tier-1 calls while your agents focus on complex, high-value interactions.", icon: "PhoneIncoming" },
      { title: "Cut AHT by 50%", description: "Automated call summaries and CRM sync eliminate post-call work for every agent.", icon: "Clock" },
      { title: "CRM & ticketing integration", description: "Works with Salesforce, Zendesk, Freshdesk, and all major platforms out of the box.", icon: "Plug" },
      { title: "100+ language support", description: "Serve customers in their native language - multilingual handling built in.", icon: "Languages" },
      { title: "Real-time dashboards", description: "Live call monitoring, agent metrics, CSAT scores, and resolution rates in one place.", icon: "BarChart2" },
      { title: "Deploy in under 30 minutes", description: "No coding needed - connect your telephony and go live with a BPO-ready template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Reduced Operational Costs", description: "Automation lowers staffing and overhead expenses", icon: "DollarSign" },
      { title: "24/7 Multilingual Support", description: "Serve global customers anytime in their preferred language", icon: "Languages" },
      { title: "Faster Query Resolution", description: "Instant responses improve customer satisfaction", icon: "Clock" },
      { title: "Enhanced Compliance & Accuracy", description: "AI ensures correct handling of sensitive data", icon: "ShieldCheck" },
      { title: "Personalized Customer Experience", description: "Deliver tailored conversations at scale", icon: "UserCheck" },
      { title: "Scalable Solutions", description: "Handle seasonal call surges without compromising service", icon: "Server" },
    ],`,
  },

  'travel-tourism': {
    old: `    benefits: [
      { title: "24/7 traveller support", description: "Handles bookings and alerts around the clock - even for customers in different time zones.", icon: "Clock" },
      { title: "Never miss a booking", description: "Every inquiry is captured and responded to instantly - no missed calls, no lost revenue.", icon: "PhoneIncoming" },
      { title: "GDS & PMS integration", description: "Connects to your booking systems, GDS, and property management platforms in real time.", icon: "Plug" },
      { title: "Multilingual traveller care", description: "Speaks to tourists in their native language - 100+ languages supported automatically.", icon: "Languages" },
      { title: "Real-time trip analytics", description: "Track booking rates, call sentiment, and cancellations in your live dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No IT team required - connect your travel number and start handling bookings instantly.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "24/7 Global Assistance", description: "Multilingual support across different time zones", icon: "Globe" },
      { title: "Lower Operational Costs", description: "Automates repetitive queries, freeing staff for complex cases", icon: "DollarSign" },
      { title: "Improved Customer Loyalty", description: "Personalized experiences encourage repeat bookings", icon: "Heart" },
      { title: "Real-Time Problem Solving", description: "Proactive updates prevent traveler frustration", icon: "AlertCircle" },
      { title: "Scalability", description: "Handle thousands of customer interactions simultaneously", icon: "Server" },
    ],`,
  },

  'transportation-logistics': {
    old: `    benefits: [
      { title: "Kill WISMO calls", description: "80% of 'where is my order?' calls are resolved automatically - no agent time wasted.", icon: "Search" },
      { title: "Proactive exception alerts", description: "Customers are notified of delays before they need to call - reducing inbound volume.", icon: "Bell" },
      { title: "TMS & WMS integration", description: "Connects to your transport and warehouse management systems for real-time tracking data.", icon: "Plug" },
      { title: "Multilingual logistics", description: "Communicates with customers and drivers in 100+ languages automatically.", icon: "Languages" },
      { title: "End-to-end call analytics", description: "Track call volumes, resolution rates, and exception trends in your operations dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No engineering work - connect your logistics number and start handling calls instantly.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Reduced Delays", description: "Faster communication keeps shipments on track", icon: "Clock" },
      { title: "Improved Customer Experience", description: "Real-time updates and proactive notifications", icon: "UserCheck" },
      { title: "Lower Costs", description: "Automated processes reduce manual workload", icon: "DollarSign" },
      { title: "Enhanced Safety & Compliance", description: "Automated reminders prevent violations", icon: "ShieldCheck" },
      { title: "Optimized Fleet Performance", description: "Predictive scheduling and maintenance improve efficiency", icon: "Truck" },
    ],`,
  },

  'retail-e-commerce': {
    old: `    benefits: [
      { title: "24/7 shopper support", description: "Customers get instant answers on orders, returns, and loyalty - day or night.", icon: "Clock" },
      { title: "Reduce support costs", description: "75% of routine retail queries are handled without any human agent involvement.", icon: "BarChart2" },
      { title: "OMS & CRM integration", description: "Connects to Shopify, WooCommerce, Magento, and all major order management systems.", icon: "Plug" },
      { title: "100+ language support", description: "Serves shoppers in their native language - regional language support built in.", icon: "Languages" },
      { title: "Revenue recovery calls", description: "Automated cart recovery and loyalty nudge calls drive measurable incremental revenue.", icon: "Flame" },
      { title: "Live in under 30 minutes", description: "No developer needed - connect your store's number and start handling calls instantly.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Increase Conversions", description: "Recover abandoned carts and encourage more purchases", icon: "ShoppingCart" },
      { title: "Improve Customer Experience", description: "Provide instant, human-like voice interactions", icon: "UserCheck" },
      { title: "Reduce Costs", description: "Automate routine queries and order updates", icon: "DollarSign" },
      { title: "Scale Globally", description: "Support multiple languages and regions seamlessly", icon: "Globe" },
      { title: "Boost Loyalty", description: "Engage customers with personalized offers, rewards, and recommendations", icon: "Gift" },
    ],`,
  },

  'telecommunications': {
    old: `    benefits: [
      { title: "Deflect 80% of tier-1 calls", description: "Bill reminders, plan queries, and outage alerts handled without human agents.", icon: "PhoneIncoming" },
      { title: "Reduce churn proactively", description: "AI identifies at-risk customers and makes retention offers before they cancel.", icon: "UserCheck" },
      { title: "BSS & CRM integration", description: "Works with your billing system, CRM, and OSS/BSS platforms out of the box.", icon: "Plug" },
      { title: "Multilingual telecom support", description: "Handles subscribers in their regional language across 100+ languages.", icon: "Languages" },
      { title: "Network-aware intelligence", description: "Accesses outage data in real time to give accurate, context-aware responses.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your telecom number and go live with a carrier-ready AI template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "24/7 Global Support", description: "Serve customers anytime in multiple languages", icon: "Clock" },
      { title: "Cost Reduction", description: "Automate high-volume, low-complexity calls", icon: "DollarSign" },
      { title: "Improved Efficiency", description: "Faster query resolution and issue handling", icon: "TrendingUp" },
      { title: "Scalability", description: "Handle millions of users simultaneously without downtime", icon: "Server" },
      { title: "Personalized Customer Experience", description: "AI-driven recommendations for tailored interactions", icon: "UserCheck" },
    ],`,
  },

  'automotive': {
    old: `    benefits: [
      { title: "24/7 dealership support", description: "Customers can book service or test drives at any hour - your AI never sleeps.", icon: "Clock" },
      { title: "Reduce no-shows by 55%", description: "Automated reminder calls and SMS before every appointment reduce missed slots.", icon: "BellRing" },
      { title: "DMS & CRM integration", description: "Connects to your dealer management system and CRM for real-time vehicle and lead data.", icon: "Plug" },
      { title: "Multilingual customer care", description: "Speaks to customers in their preferred language - regional languages supported.", icon: "Languages" },
      { title: "Full service analytics", description: "Track appointment rates, no-shows, and test drive conversions in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your dealership number and launch with an automotive-ready AI template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Reduce No-Shows", description: "Automated reminders minimize missed appointments", icon: "Calendar" },
      { title: "Boost Customer Loyalty", description: "Personalized support keeps customers engaged", icon: "Heart" },
      { title: "Upsell Opportunities", description: "Extend warranties and offer seasonal packages", icon: "ArrowUpRight" },
      { title: "Cost Reduction", description: "Automate repetitive tasks to save on call center overhead", icon: "DollarSign" },
      { title: "Ensure Safety", description: "Streamline recall handling and compliance updates", icon: "ShieldCheck" },
    ],`,
  },

  'education': {
    old: `    benefits: [
      { title: "24/7 student & parent support", description: "Inquiries, reminders, and schedule alerts handled around the clock without staff.", icon: "Clock" },
      { title: "Never lose an admission lead", description: "Every admissions inquiry is captured and followed up automatically.", icon: "UserPlus" },
      { title: "SIS & LMS integration", description: "Connects to your student information and learning management systems.", icon: "Plug" },
      { title: "Multilingual education", description: "Communicates with students and parents in their preferred language - 100+ supported.", icon: "Languages" },
      { title: "Enrolment analytics", description: "Track inquiry rates, conversion, fee collection, and class attendance in one dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No IT team required - connect your institution's number and start automating calls.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Improved Student Engagement", description: "Personalized updates keep students on track", icon: "UserCheck" },
      { title: "Higher Payment Compliance", description: "Automated reminders reduce missed tuition deadlines", icon: "Calendar" },
      { title: "Multilingual Communication", description: "Global-ready for diverse student bases", icon: "Languages" },
      { title: "Time Savings for Staff", description: "Less admin work, more focus on students", icon: "Clock" },
      { title: "Better Alumni Relationships", description: "Voice-driven engagement keeps networks strong", icon: "Users" },
      { title: "Scalable & Reliable", description: "From small schools to global universities", icon: "Server" },
    ],`,
  },

  'hospitality': {
    old: `    benefits: [
      { title: "24/7 concierge service", description: "Guests get instant answers on reservations, amenities, and requests at any hour.", icon: "Clock" },
      { title: "Reduce no-shows by 50%", description: "Automated check-in reminders and pre-arrival calls cut last-minute cancellations.", icon: "BellRing" },
      { title: "PMS & CRS integration", description: "Connects to Opera, Cloudbeds, and all major property management systems.", icon: "Plug" },
      { title: "Multilingual guest care", description: "Hosts international guests in their native language - 100+ languages supported.", icon: "Languages" },
      { title: "Revenue per room analytics", description: "Track upsell conversion, guest satisfaction, and repeat bookings in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "Connect your hotel number and go live with a hospitality-grade AI template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Increase Bookings", description: "Proactive upsell offers boost reservations and revenue", icon: "ShoppingCart" },
      { title: "Improve Guest Satisfaction", description: "Personalized service creates memorable experiences", icon: "Smile" },
      { title: "Reduce Operational Load", description: "Automate routine tasks to free up staff time", icon: "UserCheck" },
      { title: "Data-Driven Insights", description: "Gain actionable intelligence for better decision-making", icon: "BarChart" },
      { title: "Scalable Operations", description: "Easily scale from boutique hotels to global chains", icon: "Server" },
    ],`,
  },

  'legal': {
    old: `    benefits: [
      { title: "24/7 client availability", description: "Never miss a new client inquiry - your AI handles intake and bookings around the clock.", icon: "Clock" },
      { title: "Reduce missed court dates", description: "Automated hearing reminders cut missed appearances and last-minute rescheduling.", icon: "BellRing" },
      { title: "Practice management sync", description: "Integrates with Clio, MyCase, and other legal practice management platforms.", icon: "Plug" },
      { title: "Multilingual client care", description: "Communicates with clients in their preferred language - 100+ languages supported.", icon: "Languages" },
      { title: "Confidential call logging", description: "Every interaction is logged with attorney-client privilege compliance in mind.", icon: "ShieldCheck" },
      { title: "Live in under 30 minutes", description: "Connect your firm's number and go live with a legal-ready AI template instantly.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Save Time", description: "Automate repetitive tasks, freeing lawyers for casework", icon: "Clock" },
      { title: "Boost Client Trust", description: "Provide fast, transparent communication", icon: "UserCheck" },
      { title: "Improve Compliance", description: "Avoid missing critical deadlines", icon: "ShieldCheck" },
      { title: "Enhance Efficiency", description: "Optimize billable hours and reduce administrative costs", icon: "Server" },
      { title: "Scalable Operations", description: "AI adapts to solo practitioners or large law firms", icon: "Layers" },
    ],`,
  },

  'government': {
    old: `    benefits: [
      { title: "24/7 citizen access", description: "Citizens can get answers, schedule appointments, and check status at any hour.", icon: "Clock" },
      { title: "Scale to millions of calls", description: "Handle bulk citizen outreach - surveys, alerts, reminders - in seconds.", icon: "PhoneIncoming" },
      { title: "Government system integration", description: "Connects to legacy citizen management, HRMS, and grievance redressal portals.", icon: "Plug" },
      { title: "22 Indian language support", description: "Communicates in all scheduled Indian languages plus global language support.", icon: "Languages" },
      { title: "Transparent audit trail", description: "All citizen interactions are logged and reportable for accountability and compliance.", icon: "ShieldCheck" },
      { title: "Live in under 30 minutes", description: "No IT procurement needed - deploy on existing telephony with a government template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "24/7 Citizen Support", description: "No waiting lines, instant responses anytime", icon: "Clock" },
      { title: "Multilingual Communication", description: "Reach diverse populations with local language support", icon: "Languages" },
      { title: "Cost Efficiency", description: "Automate repetitive citizen queries and reduce staff workload", icon: "DollarSign" },
      { title: "Faster Service Delivery", description: "Shorten response times for licenses, benefits, and taxes", icon: "Zap" },
      { title: "Improved Citizen Trust", description: "Consistent, transparent, and reliable communication", icon: "ShieldCheck" },
    ],`,
  },

  'manufacturing': {
    old: `    benefits: [
      { title: "Eliminate manual follow-ups", description: "Automated dispatch, QC, and vendor calls replace hours of manual phone work.", icon: "PhoneCall" },
      { title: "Zero missed maintenance", description: "Proactive maintenance reminders reduce unplanned downtime and equipment failures.", icon: "Wrench" },
      { title: "ERP & MES integration", description: "Connects to SAP, Oracle, and other enterprise manufacturing systems in real time.", icon: "Plug" },
      { title: "Multilingual plant support", description: "Communicates with global vendors and customers in 100+ languages automatically.", icon: "Languages" },
      { title: "Supply chain analytics", description: "Track dispatch rates, QC pass rates, and vendor call outcomes in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No engineering work - connect your plant number and launch with a manufacturing template.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Faster Decision-Making", description: "Real-time voice updates enable quicker operational choices", icon: "Clock" },
      { title: "Reduced Downtime", description: "Predictive maintenance reminders keep production running smoothly", icon: "Activity" },
      { title: "Improved Safety", description: "Instant compliance alerts minimize workplace risks", icon: "ShieldCheck" },
      { title: "Streamlined Supplier Communication", description: "Seamless updates across borders and time zones", icon: "Users" },
      { title: "Cost Savings", description: "Automation reduces manual tasks and errors", icon: "DollarSign" },
    ],`,
  },

  'non-profit': {
    old: `    benefits: [
      { title: "Reach more donors at lower cost", description: "AI calls replace expensive outbound telemarketing at a fraction of the cost.", icon: "Flame" },
      { title: "Automate volunteer management", description: "Shift reminders, confirmations, and coordination handled automatically.", icon: "UserCheck" },
      { title: "CRM & fundraising platform sync", description: "Integrates with Salesforce NPSP, Raiser's Edge, and popular NGO CRMs.", icon: "Plug" },
      { title: "Multilingual donor engagement", description: "Reaches donors in their preferred language - regional language support built in.", icon: "Languages" },
      { title: "Fundraising analytics", description: "Track call conversion, donation rates, and campaign ROI in your dashboard.", icon: "BarChart2" },
      { title: "Live in under 30 minutes", description: "No IT team required - connect your number and launch your first campaign instantly.", icon: "Settings" },
    ],`,
    new: `    benefits: [
      { title: "Cost Efficiency", description: "Reduce staffing expenses by automating repetitive calls", icon: "DollarSign" },
      { title: "24/7 Availability", description: "Engage supporters anytime, across time zones", icon: "Clock" },
      { title: "Scalability", description: "Reach thousands of donors and volunteers simultaneously", icon: "Server" },
      { title: "Multilingual Support", description: "Connect with diverse communities worldwide", icon: "Languages" },
      { title: "Stronger Engagement", description: "Personalized, human-like interactions boost donor retention", icon: "UserCheck" },
    ],`,
  },
};

for (const [slug, rep] of Object.entries(benefitsReplacements)) {
  heroContent = replaceOnce(heroContent, rep.old, rep.new, `benefits:${slug}`);
}
console.log('✓ Benefits arrays updated');

// ─── useCases array replacements (only for industries with useCases.industries in JSON) ─────

const useCasesReplacements = {

  'healthcare': {
    old: `    useCases: [
      { title: "Appointment booking", description: "Books and reschedules patient appointments instantly - synced to your clinic calendar in real time.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "CalendarDays" },
      { title: "Reminder calls", description: "Reduces no-shows by calling patients 24–48 hours before their appointment automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Lab result follow-ups", description: "Notifies patients when results are ready and routes complex queries to clinical staff.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "FileText" },
      { title: "Prescription refills", description: "Handles refill requests and routes urgent cases to the prescribing doctor automatically.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Pill" },
      { title: "Insurance queries", description: "Answers coverage and pre-auth questions without tying up your front-desk staff.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "ShieldCheck" },
      { title: "Post-visit follow-up", description: "Checks in on patients after procedures, collects feedback, and flags concerns to clinicians.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],`,
    new: `    useCases: [
      { title: "Hospitals & Clinics", description: "Appointment scheduling, patient engagement, and care coordination", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Heart" },
      { title: "Pharmacies", description: "Medication reminders, refill alerts, and prescription management", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Pill" },
      { title: "Diagnostic Labs", description: "Lab results delivery, test reminders, and appointment scheduling", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "FlaskConical" },
      { title: "Insurance Providers", description: "Automated claim processing, policy communication, and eligibility verification", iconBg: "bg-cyan-50", iconColor: "text-cyan-600", icon: "Shield" },
    ],`,
  },

  'retail-e-commerce': {
    old: `    useCases: [
      { title: "Order status & tracking", description: "Answers WISMO calls instantly with live shipment data - no agent, no wait time.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Search" },
      { title: "Returns & refunds", description: "Initiates returns, schedules pickups, and tracks refund status automatically on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "RotateCcw" },
      { title: "Loyalty & rewards", description: "Reminds shoppers of expiring points, shares redemption options, and drives repeat purchases.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Star" },
      { title: "Product questions", description: "Answers availability, sizing, and product detail questions without hold queues.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "MessageSquare" },
      { title: "Abandoned cart recovery", description: "Calls shoppers who abandoned carts with personalised offers to recover lost revenue.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "BellRing" },
      { title: "Flash sale notifications", description: "Sends targeted outbound calls alerting VIP customers to exclusive deals and drops.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Flame" },
    ],`,
    new: `    useCases: [
      { title: "Fashion & Apparel Stores", description: "Deliver personalized recommendations and streamline return assistance", iconBg: "bg-pink-50", iconColor: "text-pink-600", icon: "Shirt" },
      { title: "Grocery & Essentials", description: "Automate delivery notifications and highlight seasonal promotions", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "ShoppingBasket" },
      { title: "Electronics Retailers", description: "Provide product updates and real-time troubleshooting support", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Monitor" },
      { title: "Luxury Brands", description: "Enable premium, personalized engagement with high-value customers", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "Gem" },
      { title: "Global Marketplaces", description: "Offer multilingual support for buyers across international markets", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "Globe" },
    ],`,
  },

  'finance-banking': {
    old: `    useCases: [
      { title: "EMI & payment reminders", description: "Proactively reminds customers of upcoming EMIs and sends secure payment links automatically.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "BellRing" },
      { title: "Fraud alerts & blocking", description: "Instantly notifies customers of suspicious transactions and enables card blocking on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "ShieldCheck" },
      { title: "Loan & credit inquiries", description: "Checks eligibility, presents offers, and books specialist callbacks in one seamless call.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BarChart2" },
      { title: "Balance & statement queries", description: "Provides balances, mini-statements, and transaction history over voice - securely.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Database" },
      { title: "KYC follow-ups", description: "Reminds customers to complete KYC verification and guides them through the process.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "UserCheck" },
      { title: "Customer onboarding", description: "Walks new customers through account setup and collects required information on the call.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserPlus" },
    ],`,
    new: `    useCases: [
      { title: "Retail Banking", description: "Balance updates, transaction alerts, and KYC verification", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "CreditCard" },
      { title: "Insurance", description: "Premium reminders, claims follow-up, and policy renewals", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "ShieldCheck" },
      { title: "Investment Firms", description: "Portfolio updates, real-time market alerts, and risk advisory", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "TrendingUp" },
      { title: "Lending & NBFCs", description: "Loan EMI reminders, application tracking, and repayment options", iconBg: "bg-cyan-50", iconColor: "text-cyan-600", icon: "FileText" },
      { title: "Wealth Management", description: "Personalized financial insights, advisory calls, and portfolio optimization", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "PieChart" },
    ],`,
  },

  'real-estate': {
    old: `    useCases: [
      { title: "Property inquiries", description: "Answers questions on listings, pricing, availability, and amenities - instantly, any hour.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "PhoneIncoming" },
      { title: "Visit scheduling", description: "Books property viewings directly on the call - synced to your agent's calendar in real time.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CalendarDays" },
      { title: "Lead qualification", description: "Asks budget, timeline, and preference questions to score and route the hottest leads first.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Filter" },
      { title: "Follow-up reminders", description: "Calls back leads who didn't convert - automatically, with a personalised message.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "BellRing" },
      { title: "Rental applications", description: "Walks tenants through application steps and collects key details over the phone.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "FileText" },
      { title: "Tenant support", description: "Handles maintenance requests, payment queries, and lease questions without agent involvement.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserCheck" },
    ],`,
    new: `    useCases: [
      { title: "Real Estate Brokers & Agencies", description: "Streamline client communication and property inquiries", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Building" },
      { title: "Property Management Companies", description: "Automate tenant updates, rent reminders, and maintenance scheduling", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "ClipboardCheck" },
      { title: "Commercial Real Estate Firms", description: "Improve lead qualification and accelerate deal closures", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "Briefcase" },
      { title: "Independent Property Investors", description: "Stay updated on property performance and market opportunities", iconBg: "bg-cyan-50", iconColor: "text-cyan-600", icon: "TrendingUp" },
      { title: "Rental Property Owners & Landlords", description: "Reduce vacancies with faster responses to tenant inquiries", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "Home" },
    ],`,
  },

  'automotive': {
    old: `    useCases: [
      { title: "Service appointment booking", description: "Books, reschedules, and confirms service slots instantly - synced to your workshop calendar.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Test drive scheduling", description: "Captures interest, books home or showroom test drives, and creates CRM leads automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Star" },
      { title: "Maintenance reminders", description: "Proactively calls customers when their vehicle is due for service based on mileage or date.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BellRing" },
      { title: "Service status updates", description: "Keeps customers informed on their vehicle's service progress without agent involvement.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Wrench" },
      { title: "Parts & delivery alerts", description: "Alerts customers when their vehicle is ready and handles pickup coordination.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Bell" },
      { title: "Lead follow-up", description: "Re-engages test drive leads and showroom visitors who haven't converted yet.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "UserPlus" },
    ],`,
    new: `    useCases: [
      { title: "Car Dealerships", description: "Automated sales follow-ups, financing updates, and trade-in evaluations", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Car" },
      { title: "Auto Repair Shops", description: "AI-powered scheduling, reminders, and real-time service updates", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Wrench" },
      { title: "Insurance Companies", description: "Streamlined claim processing, policy renewals, and support", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "ShieldCheck" },
      { title: "Financing Institutions", description: "AI-assisted loan modifications, EMI reminders, and refinancing options", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "Banknote" },
      { title: "Parts Retailers", description: "Automated parts ordering, stock updates, and appointment confirmations", iconBg: "bg-red-50", iconColor: "text-red-600", icon: "Package" },
    ],`,
  },

  'hospitality': {
    old: `    useCases: [
      { title: "Reservation handling", description: "Confirms, modifies, and cancels reservations instantly - synced to your PMS in real time.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Pre-arrival concierge", description: "Calls guests before arrival to share room details, arrange transfers, and upsell packages.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Star" },
      { title: "Guest feedback surveys", description: "Runs automated post-stay satisfaction surveys and feeds results into your review pipeline.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "MessageSquare" },
      { title: "Room service requests", description: "Takes in-room requests via voice and routes them to housekeeping or F&B instantly.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Bell" },
      { title: "Upsell & upgrades", description: "Offers room upgrades, spa packages, and dining reservations during pre-arrival calls.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Flame" },
      { title: "Late checkout handling", description: "Manages late checkout requests, availability checks, and charges - automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Clock" },
    ],`,
    new: `    useCases: [
      { title: "Hotels & Resorts", description: "Automated reservations, seamless check-ins, and concierge support", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Hotel" },
      { title: "Vacation Rentals", description: "Contactless communication and automated guest support", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Home" },
      { title: "Travel Agencies", description: "AI-driven travel queries, booking assistance, and itinerary updates", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "Plane" },
      { title: "Event Venues", description: "Manage guest inquiries and streamline event logistics", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "Calendar" },
      { title: "Cruise Lines", description: "Provide multilingual assistance and enhance global guest experience", iconBg: "bg-cyan-50", iconColor: "text-cyan-600", icon: "Ship" },
    ],`,
  },

  'legal': {
    old: `    useCases: [
      { title: "Client intake", description: "Collects case details, conflict checks, and client information over the call before the first meeting.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "UserCheck" },
      { title: "Court date reminders", description: "Calls clients before hearings to confirm attendance and share logistics automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Consultation booking", description: "Matches clients with the right attorney and books consultations - 24/7, without reception.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "CalendarDays" },
      { title: "Document follow-ups", description: "Alerts clients when documents are ready for review or signature and sends secure links.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "FileText" },
      { title: "Payment reminders", description: "Sends retainer payment reminders and billing notifications without awkward conversations.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Database" },
      { title: "Case status updates", description: "Provides automated updates on case progress and scheduled hearings to keep clients informed.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "MessageSquare" },
    ],`,
    new: `    useCases: [
      { title: "Small & Mid-Size Firms", description: "Affordable automation to support limited staff and maximize efficiency", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Scale" },
      { title: "Large Firms", description: "Manage thousands of client calls with AI-driven multilingual support", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Building" },
      { title: "Corporate Legal Teams", description: "Track compliance requirements and internal case progress seamlessly", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "Briefcase" },
      { title: "Legal Consultancies", description: "Deliver round-the-clock client support and timely case updates", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "FileText" },
    ],`,
  },

  'government': {
    old: `    useCases: [
      { title: "Appointment scheduling", description: "Books and reminds citizens of government service appointments automatically - in multiple languages.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CalendarDays" },
      { title: "Document status alerts", description: "Notifies citizens when documents are processed, ready, or dispatched for collection.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "FileText" },
      { title: "Citizen feedback surveys", description: "Runs large-scale citizen satisfaction and scheme feedback surveys at low cost.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BarChart2" },
      { title: "Grievance intake", description: "Collects citizen complaints, assigns reference numbers, and routes to the correct department.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "MessageSquare" },
      { title: "Scheme awareness calls", description: "Proactively informs citizens of government welfare schemes and eligibility criteria.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "Bell" },
      { title: "Emergency & alert calls", description: "Sends mass alerts for weather, public safety, or civic emergencies in seconds.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
    ],`,
    new: `    useCases: [
      { title: "Healthcare & Public Health", description: "Automate appointment scheduling, vaccination reminders, and public health program enrollment", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "HeartPulse" },
      { title: "Transport & Licensing", description: "Simplify renewals, registrations, and traffic fine notifications with AI voice assistance", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Car" },
      { title: "Emergency Response", description: "Deliver disaster alerts, safety protocols, and real-time crisis communication", iconBg: "bg-red-50", iconColor: "text-red-600", icon: "BellRing" },
      { title: "Tax & Finance Departments", description: "Support citizens with filing assistance, payment reminders, and fraud prevention alerts", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "FileText" },
      { title: "Community Engagement", description: "Empower citizens to participate in surveys, opinion polls, and town halls via voice agents", iconBg: "bg-cyan-50", iconColor: "text-cyan-600", icon: "Users" },
    ],`,
  },

  'transportation-logistics': {
    old: `    useCases: [
      { title: "WISMO call deflection", description: "Answers 'Where is my order?' calls instantly with live tracking data - no agent needed.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Search" },
      { title: "Pickup & delivery alerts", description: "Proactively notifies customers and drivers about pickups, ETAs, and schedule changes.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Bell" },
      { title: "Exception management", description: "Alerts customers of delays and raises escalations automatically with defined SLAs.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "FileText" },
      { title: "Driver coordination", description: "Handles driver check-ins, route confirmations, and delivery completions via voice.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "PhoneCall" },
      { title: "Returns & re-delivery", description: "Processes re-delivery requests and return pickups without involving a human agent.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "RotateCcw" },
      { title: "Fleet operations support", description: "Handles maintenance alerts, fuel reports, and compliance reminders for fleet managers.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Settings" },
    ],`,
    new: `    useCases: [
      { title: "E-commerce Logistics", description: "Provide customers with instant voice or SMS package tracking and delivery updates", iconBg: "bg-blue-50", iconColor: "text-blue-600", icon: "Package" },
      { title: "Freight & Shipping", description: "Simplify documentation and customs clearance with guided AI interactions", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Ship" },
      { title: "Fleet Operations", description: "Automate vehicle maintenance schedules, driver assignments, and compliance checks", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "Truck" },
      { title: "Warehousing", description: "Enable smooth coordination between drivers, warehouse staff, and dispatch teams", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "Warehouse" },
    ],`,
  },
};

for (const [slug, rep] of Object.entries(useCasesReplacements)) {
  heroContent = replaceOnce(heroContent, rep.old, rep.new, `useCases:${slug}`);
}
console.log('✓ useCases arrays updated');

// ─── Add new industry entries before the closing `};` of INDUSTRY_PAGE_CONTENT ─

const newIndustries = `
  "ai-voice-agents-sales-lead-generation": {
    headline: "Every sales call",
    headlineHighlight: "converted",
    subheadline: "Your AI calling agent qualifies leads, schedules appointments, and follows up automatically - 24 hours a day, so your sales team can focus on closing.",
    stats: [
      { value: "60%", label: "Fewer no-shows" },
      { value: "24/7", label: "Patient availability" },
      { value: "90%", label: "Call resolution rate" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Lead qualification",
        duration: "1:05",
        aiResponse: "Based on your answers, I've qualified you as a strong candidate and scheduled a meeting with our sales team for Tuesday at 10:30 AM.",
        messages: [
          { from: "caller", text: "Hi, I'm interested in your AI solution for our sales team." },
          { from: "ai", text: "Great! Let me ask a few quick questions to find the best fit. How many reps are on your sales team?" },
          { from: "caller", text: "About 15 reps." },
          { from: "ai", text: "Perfect. Are you looking to automate lead follow-ups, appointment scheduling, or both?" },
        ],
        caller: "Arjun Mehta",
        num: "+91 98765 00112",
        av: "AM",
        intents: ["Lead qualification", "Sales automation", "Positive", "English", "High"],
        tools: [
          { label: "lead_score()", icon: "BarChart2" },
          { label: "calendar_check()", icon: "CalendarDays" },
          { label: "crm_create()", icon: "UserPlus" },
        ],
        actions: [
          { icon: "BarChart2", label: "Lead scored", val: "Hot · 88/100" },
          { icon: "CalendarCheck", label: "Meeting booked", val: "Tue · 10:30 AM" },
          { icon: "UserPlus", label: "CRM updated", val: "Arjun Mehta" },
          { icon: "Bell", label: "Rep notified", val: "Slack alert sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Call answered by AI agent" },
          { t: "0:03", dot: "pur", text: "Intent: sales inquiry" },
          { t: "0:04", dot: "amb", text: "lead_score() → 88/100 hot lead" },
          { t: "0:05", dot: "amb", text: "calendar_check() → Tue 10:30 AM free" },
          { t: "0:07", dot: "grn", text: "Meeting booked · rep notified" },
        ],
        outcomes: [
          { icon: "BarChart2", label: "Lead scored", val: "Hot 88/100" },
          { icon: "CalendarCheck", label: "Meeting booked", val: "Tue 10:30 AM" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "1m 05s" },
        ],
      },
    ],
    useCases: [
      { title: "B2B SaaS", description: "Automate lead qualification and schedule product demos seamlessly", iconBg: "bg-indigo-50", iconColor: "text-indigo-600", icon: "Laptop" },
      { title: "E-commerce & Retail", description: "Recover lost sales with abandoned cart follow-ups and promotions", iconBg: "bg-pink-50", iconColor: "text-pink-600", icon: "ShoppingCart" },
      { title: "Real Estate", description: "Automate property visit bookings and manage inquiries 24/7", iconBg: "bg-green-50", iconColor: "text-green-600", icon: "Building" },
      { title: "Financial Services", description: "Qualify and nurture leads for loans, insurance, and investments", iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: "Banknote" },
      { title: "Healthcare", description: "Assist with patient inquiries, onboarding, and appointment scheduling", iconBg: "bg-red-50", iconColor: "text-red-600", icon: "Stethoscope" },
    ],
    benefits: [
      { title: "Boosted Conversions", description: "AI ensures no missed opportunities", icon: "TrendingUp" },
      { title: "Shorter Sales Cycles", description: "Immediate engagement accelerates decisions", icon: "Clock" },
      { title: "Improved Customer Experience", description: "Personalized and empathetic conversations", icon: "UserCheck" },
      { title: "Cost-Effective Scaling", description: "Replace repetitive tasks with AI agents", icon: "Server" },
      { title: "Global Expansion", description: "Multilingual AI supports businesses in worldwide markets", icon: "Globe" },
    ],
    outcomes: [
      { value: "60%", label: "Fewer no-shows", sublabel: "Via automated reminder calls" },
      { value: "3×", label: "More meetings booked", sublabel: "Outside working hours" },
      { value: "85%", label: "Lead conversion rate", sublabel: "With AI follow-up sequences" },
      { value: "$22K", label: "Saved per year", sublabel: "In sales team admin costs" },
    ],
    services: [
      { title: "Lead Qualification", description: "AI voice agents quickly assess prospects' interest, budget, and timeline, ensuring your sales team focuses on high-quality leads.", icon: "UserCheck" },
      { title: "Appointment Scheduling", description: "Integrates with calendars to schedule meetings efficiently, eliminating endless back-and-forth emails.", icon: "CalendarCheck" },
      { title: "Prospect Follow-Ups", description: "Automated follow-up calls and reminders keep prospects engaged until conversion.", icon: "Repeat" },
      { title: "Quote Deliveries", description: "Instantly share quotes and personalized proposals through intelligent AI conversations.", icon: "FileText" },
      { title: "Customer Onboarding", description: "Guide new customers through onboarding, ensuring a seamless first experience.", icon: "UserPlus" },
      { title: "Referral Generation", description: "Engage satisfied clients with automated referral requests and incentive reminders.", icon: "Share2" },
      { title: "Pipeline Management", description: "Track deal progress, send reminders, and ensure every opportunity moves forward efficiently.", icon: "TrendingUp" },
    ],
    testimonial: {
      quote: "Our front desk was overwhelmed with appointment calls. OnDial now handles 70% of all bookings automatically. Our staff are happier and patients love the instant response.",
      name: "Dr. Priya Nair",
      role: "Medical Director · Wellness First Clinics, Bangalore",
      initials: "PN",
    },
    ctaHeadline: "Get Started with OnDial's AI Voice Agents",
    ctaSubheadline: "Sales is about timing. The faster you respond, the higher your chances of winning a deal. With OnDial's AI voice agents for Sales & Lead Generation Services, your business gains the power to respond instantly, engage deeply, and scale globally.",
    serviceHeadline: "Core Sales & Lead Generation AI Voice Services",
    serviceSubheadline: "Boost sales efficiency, engage prospects, and streamline lead management with AI-powered voice agents.",
    useCasesTitle: "Industries Leveraging AI Voice Agents for Sales",
  },

  "ai-voice-agents-utilities": {
    headline: "Every utility call",
    headlineHighlight: "answered",
    subheadline: "Your AI calling agent handles billing inquiries, outage updates, and customer service - 24 hours a day, without a single rep on the line.",
    stats: [
      { value: "60%", label: "Fewer no-shows" },
      { value: "24/7", label: "Customer availability" },
      { value: "90%", label: "Call resolution rate" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Billing inquiry",
        duration: "0:45",
        aiResponse: "Your current bill is $142.50 due on the 15th. I've sent a payment link to your registered email. Would you like to set up auto-pay?",
        messages: [
          { from: "caller", text: "Hi, I have a question about my electricity bill." },
          { from: "ai", text: "Happy to help! Let me pull up your account. Could I have your account number or registered email?" },
          { from: "caller", text: "My account is 847291." },
          { from: "ai", text: "Your current bill is $142.50 due on the 15th. Would you like a payment link sent to your email?" },
        ],
        caller: "Sarah Johnson",
        num: "+1 555-234-5678",
        av: "SJ",
        intents: ["Billing inquiry", "Account lookup", "Neutral", "English", "Normal"],
        tools: [
          { label: "account_fetch()", icon: "Database" },
          { label: "sms_link()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Database", label: "Account fetched", val: "Acc #847291" },
          { icon: "MessageSquare", label: "Payment link", val: "Email sent" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Inbound billing inquiry answered" },
          { t: "0:03", dot: "amb", text: "account_fetch() → Bill $142.50" },
          { t: "0:05", dot: "grn", text: "Payment link emailed" },
        ],
        outcomes: [
          { icon: "Database", label: "Bill fetched", val: "$142.50" },
          { icon: "MessageSquare", label: "Link sent", val: "Email" },
          { icon: "Star", label: "CSAT", val: "4.8 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 45s" },
        ],
      },
    ],
    useCases: [
      { title: "Appointment booking", description: "Books and reschedules service appointments instantly - synced to your team calendar in real time.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "CalendarDays" },
      { title: "Billing reminders", description: "Sends automated payment reminders and provides billing details via voice.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "BellRing" },
      { title: "Outage notifications", description: "Proactively notifies customers about service disruptions and estimated restoration times.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "AlertCircle" },
      { title: "Energy efficiency tips", description: "Provides personalized conservation tips and promotes green energy programs.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "Zap" },
      { title: "Account management", description: "Handles account updates, auto-pay setup, and service requests automatically.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "UserCheck" },
      { title: "Emergency alerts", description: "Instantly communicates safety warnings and emergency protocols to customers.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "ShieldAlert" },
    ],
    benefits: [
      { title: "24/7 Availability", description: "Uninterrupted support for customers at all times", icon: "Clock" },
      { title: "Faster Response Times", description: "Immediate updates during emergencies and service outages", icon: "Zap" },
      { title: "Reduced Operational Costs", description: "Automate repetitive tasks to save resources", icon: "DollarSign" },
      { title: "Personalized Engagement", description: "Multilingual and contextual responses tailored to each customer", icon: "UserCheck" },
      { title: "Higher Customer Satisfaction", description: "Proactive communication ensures a better customer experience", icon: "Smile" },
    ],
    outcomes: [
      { value: "60%", label: "Fewer missed payments", sublabel: "Via automated billing reminders" },
      { value: "80%", label: "Outage call deflection", sublabel: "With proactive notifications" },
      { value: "90%", label: "Customer satisfaction", sublabel: "Score after switching to AI" },
      { value: "$30K", label: "Saved per year", sublabel: "In customer service staffing" },
    ],
    services: [
      { title: "Bill Reminders & Payment Notifications", description: "Automatically send bill reminders with due dates, outstanding amounts, and payment links to reduce late payments.", icon: "CreditCard" },
      { title: "Service Outage Updates", description: "Proactively notify customers about outages or maintenance with estimated restoration timelines.", icon: "AlertTriangle" },
      { title: "Energy Efficiency & Conservation Tips", description: "Provide personalized energy-saving tips to help customers reduce costs and promote sustainability.", icon: "Zap" },
      { title: "Meter Reading Scheduling & Confirmations", description: "Customers can schedule or confirm meter readings via AI voice assistants for smoother operations.", icon: "CalendarCheck" },
      { title: "Rate Change Notifications", description: "Notify customers about new pricing, rate adjustments, or policy updates through AI voice alerts.", icon: "TrendingUp" },
      { title: "Green Energy Options & Enrollment", description: "Promote renewable energy programs and simplify enrollment for eco-friendly plans.", icon: "Leaf" },
      { title: "Emergency Preparedness Alerts", description: "Instantly communicate storm warnings, gas leak alerts, and safety protocols via voice notifications.", icon: "ShieldAlert" },
      { title: "Account Management & Self-Service", description: "Streamline account management tasks like auto-pay setup or paperless billing using AI voice agents.", icon: "UserCog" },
    ],
    testimonial: {
      quote: "Our front desk was overwhelmed with appointment calls. OnDial now handles 70% of all bookings automatically. Our staff are happier and patients love the instant response.",
      name: "Dr. Priya Nair",
      role: "Medical Director · Wellness First Clinics, Bangalore",
      initials: "PN",
    },
    ctaHeadline: "Ready to Modernize Your Utilities Customer Experience?",
    ctaSubheadline: "OnDial helps utilities companies deliver faster, smarter, and cost-efficient communication with AI voice agents.",
    serviceHeadline: "Core Utilities AI Voice Services",
    serviceSubheadline: "Enhance customer engagement, streamline operations, and improve service delivery with AI-powered voice agents for utilities companies.",
    useCasesTitle: "Core Utilities AI Voice Services",
  },

  "ai-voice-agents-construction": {
    headline: "Every project call",
    headlineHighlight: "coordinated",
    subheadline: "Your AI calling agent handles project updates, permit tracking, material coordination, and safety compliance - automatically, around the clock.",
    stats: [
      { value: "60%", label: "Fewer no-shows" },
      { value: "24/7", label: "Project availability" },
      { value: "90%", label: "Call resolution rate" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Project update",
        duration: "0:50",
        aiResponse: "The foundation work is 80% complete and on schedule. The next milestone is framing, starting Monday. I've sent a detailed progress report to your email.",
        messages: [
          { from: "caller", text: "Hi, can I get an update on the downtown project?" },
          { from: "ai", text: "Of course! Let me pull up the latest status for the downtown project." },
          { from: "caller", text: "Thanks, specifically the foundation progress." },
          { from: "ai", text: "Foundation work is 80% complete and on track. Framing starts Monday. Shall I email you the full report?" },
        ],
        caller: "Mike Thompson",
        num: "+1 555-987-6543",
        av: "MT",
        intents: ["Project update", "Progress inquiry", "Positive", "English", "Normal"],
        tools: [
          { label: "project_status()", icon: "Activity" },
          { label: "email_report()", icon: "MessageSquare" },
        ],
        actions: [
          { icon: "Activity", label: "Status fetched", val: "Foundation 80%" },
          { icon: "MessageSquare", label: "Report sent", val: "Email to Mike" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Project update call answered" },
          { t: "0:03", dot: "amb", text: "project_status() → 80% complete" },
          { t: "0:05", dot: "grn", text: "Report emailed to stakeholder" },
        ],
        outcomes: [
          { icon: "Activity", label: "Progress", val: "80% complete" },
          { icon: "MessageSquare", label: "Report sent", val: "Email" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 50s" },
        ],
      },
    ],
    useCases: [
      { title: "Project updates", description: "Delivers instant progress reports and milestone alerts to all stakeholders.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Activity" },
      { title: "Permit tracking", description: "Notifies teams about permit approvals and inspection schedules automatically.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "FileCheck" },
      { title: "Material coordination", description: "Confirms delivery schedules and notifies teams of supply chain updates.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "Package" },
      { title: "Safety compliance", description: "Sends safety reminders, inspection alerts, and compliance notifications.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "ShieldCheck" },
      { title: "Payment scheduling", description: "Tracks payment milestones and sends invoice reminders automatically.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "CreditCard" },
      { title: "Weather delay management", description: "Automatically adjusts schedules and notifies teams during weather disruptions.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "CloudLightning" },
    ],
    benefits: [
      { title: "Faster Communication", description: "Instant updates across all stakeholders keep projects on track", icon: "MessageCircle" },
      { title: "Reduced Delays", description: "Timely notifications improve project timelines", icon: "Clock" },
      { title: "Lower Costs", description: "Prevent miscommunication and costly rework", icon: "DollarSign" },
      { title: "Enhanced Safety", description: "Proactive compliance monitoring reduces risks on site", icon: "ShieldCheck" },
      { title: "Seamless Coordination", description: "Effortless collaboration between contractors, suppliers, and clients", icon: "Users" },
    ],
    outcomes: [
      { value: "70%", label: "Fewer communication gaps", sublabel: "With automated project updates" },
      { value: "50%", label: "Faster permit processing", sublabel: "Via automated permit tracking" },
      { value: "40%", label: "Reduced site delays", sublabel: "Through proactive coordination" },
      { value: "$25K", label: "Saved per year", sublabel: "In project communication costs" },
    ],
    services: [
      { title: "Project Updates", description: "Deliver instant progress reports, milestone alerts, and completion notices without human follow-up, keeping teams aligned.", icon: "Activity" },
      { title: "Permit Status", description: "Track permit approvals and schedule inspections with voice-enabled updates, ensuring compliance efficiently.", icon: "FileCheck" },
      { title: "Material Deliveries", description: "Coordinate supply schedules, confirm arrivals, and notify teams of site preparation needs to minimize delays.", icon: "Package" },
      { title: "Safety Inspections", description: "Conduct compliance checks and send reminders for corrective actions, helping prevent accidents and maintain safety standards.", icon: "ShieldCheck" },
      { title: "Change Orders", description: "Manage change requests, approvals, and notifications via voice AI to reduce confusion and disputes among stakeholders.", icon: "Repeat" },
      { title: "Payment Schedules", description: "Keep billing on track with AI-driven invoice reminders and payment milestone notifications.", icon: "CreditCard" },
      { title: "Weather Delays", description: "Automatically adjust schedules, alert teams, and suggest backup plans during weather-related disruptions.", icon: "CloudLightning" },
      { title: "Completion Notices", description: "Ensure smooth project handovers with automated finalization notices and task closures.", icon: "CheckCircle" },
    ],
    testimonial: {
      quote: "Our front desk was overwhelmed with appointment calls. OnDial now handles 70% of all bookings automatically. Our staff are happier and patients love the instant response.",
      name: "Dr. Priya Nair",
      role: "Medical Director · Wellness First Clinics, Bangalore",
      initials: "PN",
    },
    ctaHeadline: "Get Started with AI Voice Agents for Construction Today",
    ctaSubheadline: "Future-ready construction companies are already using AI to gain a competitive edge. Don't let outdated communication slow you down. Book a demo with OnDial and transform your construction services with intelligent AI voice automation.",
    serviceHeadline: "Core Construction AI Voice Services",
    serviceSubheadline: "Optimize project management, safety, and communication in construction with AI-powered voice agents.",
    useCasesTitle: "Core Construction AI Voice Services",
  },

  "ai-voice-agents-agriculture": {
    headline: "Every farm call",
    headlineHighlight: "answered",
    subheadline: "Your AI calling agent provides real-time crop guidance, market updates, and equipment alerts - 24 hours a day, so farmers can focus on growing.",
    stats: [
      { value: "60%", label: "Fewer no-shows" },
      { value: "24/7", label: "Farmer availability" },
      { value: "90%", label: "Call resolution rate" },
      { value: "<3s", label: "Average answer time" },
    ],
    demoScenarios: [
      {
        label: "Crop advisory",
        duration: "0:55",
        aiResponse: "Based on current weather patterns, I recommend irrigating tomorrow morning. Rainfall is expected Thursday, so hold off on pesticide application until Friday.",
        messages: [
          { from: "caller", text: "Hi, I need advice on irrigation timing for my wheat crop." },
          { from: "ai", text: "Happy to help! What's your current soil moisture level and local weather forecast?" },
          { from: "caller", text: "Soil is dry and no rain expected for 2 days." },
          { from: "ai", text: "I recommend irrigating tomorrow morning before the heat. Rain is forecast Thursday - hold pesticides until Friday." },
        ],
        caller: "Ramesh Patel",
        num: "+91 98765 55443",
        av: "RP",
        intents: ["Crop advisory", "Irrigation guidance", "Positive", "English", "Normal"],
        tools: [
          { label: "weather_check()", icon: "CloudSun" },
          { label: "crop_advisory()", icon: "Activity" },
        ],
        actions: [
          { icon: "CloudSun", label: "Weather checked", val: "Rain Thu" },
          { icon: "Activity", label: "Advisory sent", val: "Irrigate tomorrow" },
        ],
        logLines: [
          { t: "0:01", dot: "pur", text: "Crop advisory call answered" },
          { t: "0:03", dot: "amb", text: "weather_check() → Rain Thu" },
          { t: "0:05", dot: "grn", text: "Advisory delivered to farmer" },
        ],
        outcomes: [
          { icon: "Activity", label: "Advisory", val: "Delivered" },
          { icon: "CloudSun", label: "Weather", val: "Integrated" },
          { icon: "Star", label: "CSAT", val: "4.9 / 5" },
          { icon: "Clock", label: "Handle time", val: "0m 55s" },
        ],
      },
    ],
    useCases: [
      { title: "Crop management", description: "Provides real-time alerts on planting, irrigation, and harvest schedules.", iconBg: "bg-[#E6F1FB]", iconColor: "text-[#0C447C]", icon: "Activity" },
      { title: "Market price updates", description: "Delivers live commodity prices and demand trends to maximize returns.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "TrendingUp" },
      { title: "Equipment maintenance", description: "Reminds farmers about machinery servicing and preventive checks.", iconBg: "bg-[#FAEEDA]", iconColor: "text-[#633806]", icon: "BarChart2" },
      { title: "Financial assistance", description: "Guides farmers through loan payments, insurance renewals, and claims.", iconBg: "bg-[#EEEDFE]", iconColor: "text-[#534AB7]", icon: "CreditCard" },
      { title: "Regulatory compliance", description: "Updates farmers on environmental rules and certification requirements.", iconBg: "bg-[#FCEBEB]", iconColor: "text-[#A32D2D]", icon: "ShieldCheck" },
      { title: "Cooperative support", description: "Manages group purchasing notifications and membership updates.", iconBg: "bg-[#E1F5EE]", iconColor: "text-[#085041]", icon: "Users" },
    ],
    benefits: [
      { title: "Efficiency Boost", description: "Automates repetitive updates, freeing time for farming activities", icon: "Clock" },
      { title: "Cost Savings", description: "Prevents equipment breakdowns, financial penalties, and missed selling opportunities", icon: "DollarSign" },
      { title: "Data-Driven Decisions", description: "Provides real-time insights for better crop and market planning", icon: "BarChart" },
      { title: "Global Accessibility", description: "Multilingual and voice-based, user-friendly for all literacy levels", icon: "Globe" },
      { title: "Scalability", description: "Works for individual farmers, cooperatives, and large agribusinesses", icon: "Server" },
    ],
    outcomes: [
      { value: "40%", label: "Higher crop yields", sublabel: "With timely irrigation guidance" },
      { value: "30%", label: "Lower equipment costs", sublabel: "Via preventive maintenance alerts" },
      { value: "25%", label: "Better market prices", sublabel: "Through real-time price optimization" },
      { value: "$15K", label: "Saved per year", sublabel: "In farm management costs" },
    ],
    services: [
      { title: "Crop Management Assistance", description: "Receive real-time voice alerts on planting schedules, harvest timing, irrigation needs, and weather patterns—helping improve yields and reduce losses.", icon: "Activity" },
      { title: "Equipment Maintenance & Monitoring", description: "Voice agents remind farmers about machinery servicing, seasonal preparation, and preventive maintenance, extending the lifespan of agricultural equipment.", icon: "BarChart2" },
      { title: "Market & Price Updates", description: "Access live commodity prices, demand trends, and selling opportunities, ensuring optimal timing for maximum returns.", icon: "TrendingUp" },
      { title: "Insurance & Loan Assistance", description: "Simplify financial tasks with AI reminders for loan payments, policy renewals, and claims for weather or pest damage.", icon: "CreditCard" },
      { title: "Regulatory Compliance Guidance", description: "Stay updated on environmental rules, certification requirements, and government regulations to ensure compliance without confusion.", icon: "ShieldCheck" },
      { title: "Supply Chain & Cooperative Support", description: "Schedule deliveries for seeds, fertilizers, and equipment, while cooperatives benefit from group purchasing updates and membership notifications.", icon: "Truck" },
    ],
    testimonial: {
      quote: "Our front desk was overwhelmed with appointment calls. OnDial now handles 70% of all bookings automatically. Our staff are happier and patients love the instant response.",
      name: "Dr. Priya Nair",
      role: "Medical Director · Wellness First Clinics, Bangalore",
      initials: "PN",
    },
    ctaHeadline: "Empower Your Farm with OnDial's AI Voice Agents",
    ctaSubheadline: "Empower your farm with OnDial's AI Voice Agents for Agriculture Services. Smarter decisions, higher yields, and global farming support—start today.",
    serviceHeadline: "Core Agriculture AI Voice Services",
    serviceSubheadline: "Empower farmers, cooperatives, and agribusinesses with real-time, AI-driven voice assistance for smarter, more efficient operations.",
    useCasesTitle: "Core Agriculture AI Voice Services",
  },
`;

// Insert new industries before the closing `};` of INDUSTRY_PAGE_CONTENT
heroContent = replaceOnce(
  heroContent,
  '\n};\n\n/** Generic fallback content',
  `\n${newIndustries}\n};\n\n/** Generic fallback content`,
  'insert new industries'
);
console.log('✓ New industries added');

fs.writeFileSync(path.join(ROOT, 'src/data/industry-hero-content.ts'), heroContent);
console.log('✓ industry-hero-content.ts written');
console.log('\n✅ All transformations complete!');
