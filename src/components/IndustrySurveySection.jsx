"use client";

import { motion } from "framer-motion";
import { revealMotion } from "@/lib/motion/revealMotion";
import {
  Heart,
  Building2,
  Car,
  GraduationCap,
  Plane,
  Hotel,
  Scale,
  Landmark,
  Zap,
  Users,
  Phone,
  Truck,
  Factory,
  HardHat,
  Leaf,
  ShoppingCart,
  Shield,
  TrendingUp,
  Globe,
  Briefcase,
  Pill,
  FlaskConical,
  Shirt,
  ShoppingBasket,
  Monitor,
  Gem,
  CreditCard,
  ShieldCheck,
  FileText,
  PieChart,
  Building,
  ClipboardCheck,
  Home,
  Laptop,
  Banknote,
  Stethoscope,
  Wrench,
  Package,
  Calendar,
  Ship,
  HeartPulse,
  BellRing,
  Warehouse,
  Headphones,
  BookOpen,
  PhoneCall,
  MessageCircle,
  DollarSign,
  ShoppingBag,
  Store,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const GRID_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500CFD' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

// Icon mapping for string-based icon names
const iconMap = {
  Heart,
  Building2,
  Car,
  GraduationCap,
  Plane,
  Hotel,
  Scale,
  Landmark,
  Zap,
  Users,
  Phone,
  Truck,
  Factory,
  HardHat,
  Leaf,
  ShoppingCart,
  Shield,
  TrendingUp,
  Globe,
  Briefcase,
  Pill,
  FlaskConical,
  Shirt,
  ShoppingBasket,
  Monitor,
  Gem,
  CreditCard,
  ShieldCheck,
  FileText,
  PieChart,
  Building,
  ClipboardCheck,
  Home,
  Laptop,
  Banknote,
  Stethoscope,
  Wrench,
  Package,
  Calendar,
  Ship,
  HeartPulse,
  BellRing,
  Warehouse,
  Headphones,
  BookOpen,
  PhoneCall,
  MessageCircle,
  DollarSign,
  ShoppingBag,
  Store,
  Heartbeat: HeartPulse
};

export default function IndustrySurveySection({
  title = "Industries We Serve",
  subtitle = "20+ Industries Transformed",
  description = "Discover how OnDial's AI voice automation is revolutionizing communication across diverse sectors, from healthcare to agriculture.",
  industries: customIndustries = null,
  className = "",
  showAllIndustries = false,
  unifiedGrid = false,
  revealOnMount = false,
}) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  const defaultIndustries = [
    {
      id: 1,
      name: "Healthcare & Medical",
      slug:"healthcare-and-medical-services",
      icon: Heart,
      description: "Automate appointment reminders, prescription refills, follow-ups, lab results, and chronic care management. Improve patient engagement and reduce no-shows.",
      color: "from-rose-500 via-pink-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50",
      category: "Health",
      useCases: ["Appointment Reminders", "Prescription Refills", "Lab Results", "Chronic Care Management"]
    },
    {
      id: 2,
      name: "Finance & Banking",
      slug:"financial-and-banking-services",
      icon: Building2,
      description: "Enable fraud alerts, loan status updates, payment reminders, credit score alerts, and account notifications.",
      color: "from-purple-600 via-indigo-600 to-indigo-700",
      bgColor: "from-purple-50 to-indigo-50",
      category: "Finance",
      useCases: ["Fraud Alerts", "Payment Reminders", "Credit Score Updates", "Account Notifications"]
    },
    {
      id: 3,
      name: "Real Estate",
      slug:"real-estate-services",
      icon: Building2,
      description: "Handle property inquiries, schedule viewings, send market updates, lease renewals, and closing process updates.",
      color: "from-violet-500 via-indigo-500 to-indigo-600",
      bgColor: "from-violet-50 to-indigo-50",
      category: "Property",
      useCases: ["Property Inquiries", "Viewing Scheduling", "Market Updates", "Lease Renewals"]
    },
    {
      id: 4,
      name: "Retail & E-commerce",
      slug:"retail-and-ecommerce-services",
      icon: ShoppingCart,
      description: "Recover abandoned carts, send order updates, collect feedback, manage returns, and promote seasonal offers.",
      color: "from-emerald-500 via-teal-500 to-cyan-600",
      bgColor: "from-emerald-50 to-teal-50",
      category: "Retail",
      useCases: ["Cart Recovery", "Order Updates", "Feedback Collection", "Returns Management"]
    },
    {
      id: 5,
      name: "Insurance",
      slug:"insurance-services",
      icon: Shield,
      description: "Automate policy renewals, claim updates, premium alerts, and risk assessments.",
      color: "from-cyan-500 via-indigo-500 to-indigo-600",
      bgColor: "from-cyan-50 to-indigo-50",
      category: "Insurance",
      useCases: ["Policy Renewals", "Claim Updates", "Premium Alerts", "Risk Assessments"]
    },
    {
      id: 6,
      name: "Sales & Lead Generation",
      slug:"sales-and-lead-generation-services",
      icon: TrendingUp,
      description: "Qualify leads, schedule appointments, follow up with prospects, and run win-back campaigns.",
      color: "from-orange-500 via-red-500 to-rose-600",
      bgColor: "from-indigo-50 to-indigo-50",
      category: "Sales",
      useCases: ["Lead Qualification", "Appointment Scheduling", "Prospect Follow-up", "Win-back Campaigns"]
    },
    {
      id: 7,
      name: "Call Centers & BPO",
      slug:"call-center-and-bpo-services",
      icon: Phone,
      description: "Automate surveys, feedback collection, compliance notifications, and data verification.",
      color: "from-indigo-500 via-indigo-500 to-violet-600",
      bgColor: "from-indigo-50 to-indigo-50",
      category: "BPO",
      useCases: ["Surveys", "Feedback Collection", "Compliance Notifications", "Data Verification"]
    },
    {
      id: 8,
      name: "Telecom",
      icon: Phone,
      slug:"telecommunications-services",
      description: "Handle service activations, billing inquiries, technical support, and contract renewals.",
      color: "from-teal-500 via-cyan-500 to-blue-600",
      bgColor: "from-teal-50 to-cyan-50",
      category: "Telecom",
      useCases: ["Service Activation", "Billing Support", "Technical Support", "Contract Renewals"]
    },
    {
      id: 9,
      name: "Automotive",
      icon: Car,
      slug:"automotive-services",
      description: "Manage service reminders, warranty extensions, recalls, insurance updates, and financing options.",
      color: "from-slate-600 via-gray-700 to-zinc-800",
      bgColor: "from-slate-50 to-gray-50",
      category: "Automotive",
      useCases: ["Service Reminders", "Warranty Extensions", "Recalls", "Insurance Updates"]
    },
    {
      id: 10,
      name: "Education",
      icon: GraduationCap,
      slug:"education-services",
      description: "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni outreach.",
      color: "from-amber-500 via-yellow-500 to-orange-600",
      bgColor: "from-amber-50 to-yellow-50",
      category: "Education",
      useCases: ["Enrollment Confirmations", "Tuition Reminders", "Progress Updates", "Alumni Outreach"]
    },
    {
      id: 11,
      name: "Travel & Tourism",
      slug:"travel-and-tourism-services",
      icon: Plane,
      description: "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program updates. Improve traveler satisfaction while reducing manual support.",
      color: "from-sky-500 via-blue-500 to-indigo-600",
      bgColor: "from-sky-50 to-blue-50",
      category: "Travel",
      useCases: ["Booking Confirmations", "Flight Updates", "Check-in Reminders", "Loyalty Programs"]
    },
    {
      id: 12,
      name: "Hospitality Services",
      slug:"hospitality-services",
      icon: Hotel,
      description: "Streamline reservation confirmations, concierge services, check-in procedures, feedback collection, and loyalty benefits. Deliver a seamless guest experience.",
      color: "from-pink-500 via-rose-500 to-red-600",
      bgColor: "from-sky-50 to-blue-50",
      category: "Hospitality",
      useCases: ["Reservation Confirmations", "Concierge Services", "Check-in Procedures", "Loyalty Benefits"]
    },
    {
      id: 13,
      name: "Legal Services",
      slug:"legal-services",
      icon: Scale,
      description: "Send case updates, appointment reminders, document notifications, and compliance deadlines. Enhance client communication with timely, professional AI calls.",
      color: "from-amber-500 via-yellow-500 to-orange-600",
      bgColor: "from-slate-50 to-gray-50",
      category: "Legal",
      useCases: ["Case Updates", "Appointment Reminders", "Document Notifications", "Compliance Deadlines"]
    },
    {
      id: 14,
      name: "Government Services",
      slug:"government-services",
      icon: Landmark,
      description: "Manage application status updates, tax notifications, renewal reminders, compliance monitoring, and citizen surveys. Improve public service efficiency.",
      color: "from-slate-600 via-gray-700 to-zinc-800",
      bgColor: "from-slate-50 to-gray-50",
      category: "Government",
      useCases: ["Application Updates", "Tax Notifications", "Renewal Reminders", "Citizen Surveys"]
    },
    {
      id: 15,
      name: "Utilities",
      icon: Zap,
      slug:"utilities-services",
      description: "Automate bill reminders, outage updates, meter reading appointments, and energy efficiency tips. Improve billing transparency and customer trust.",
      color: "from-yellow-400 via-orange-500 to-red-500",
      bgColor: "from-blue-50 to-indigo-50",
      category: "Utilities",
      useCases: ["Bill Reminders", "Outage Updates", "Meter Readings", "Energy Tips"]
    },
    {
      id: 16,
      name: "Non-Profit Organizations",
      icon: Users,
      slug:"non-profit-organizations-services",
      description: "Run donation campaigns, volunteer recruitment, event invitations, grant notifications, and donor thank-you calls. Strengthen community relationships with AI outreach.",
      color: "from-green-600 via-emerald-600 to-teal-700",
      bgColor: "from-green-50 to-emerald-50",
      category: "Non-Profit",
      useCases: ["Donation Campaigns", "Volunteer Recruitment", "Event Invitations", "Grant Notifications"]
    },
    {
      id: 17,
      name: "Transportation & Logistics",
      icon: Truck,
      slug:"transportation-and-logistics-services",
      description: "Provide delivery updates, delay notifications, documentation requirements, rate quotes, and compliance reminders. Optimize supply chain communication.",
      color: "from-blue-500 via-indigo-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      category: "Logistics",
      useCases: ["Delivery Updates", "Delay Notifications", "Documentation", "Rate Quotes"]
    },
    {
      id: 18,
      name: "Manufacturing",
      slug:"manufacturing-services",
      icon: Factory,
      description: "Automate order confirmations, quality updates, maintenance schedules, safety protocols, and supplier coordination. Ensure smooth production workflows.",
      color: "from-gray-500 via-slate-600 to-zinc-700",
      bgColor: "from-gray-50 to-slate-50",
      category: "Manufacturing",
      useCases: ["Order Confirmations", "Quality Updates", "Maintenance Schedules", "Safety Protocols"]
    },
    {
      id: 19,
      name: "Construction",
      slug:"construction-services",
      icon: HardHat,
      description: "Send project updates, permit status, material delivery schedules, safety inspections, and payment milestones. Improve communication with contractors and clients.",
      color: "from-orange-600 via-red-600 to-rose-700",
      bgColor: "from-green-50 to-lime-50",
      category: "Construction",
      useCases: ["Project Updates", "Permit Status", "Material Deliveries", "Safety Inspections"]
    },
    {
      id: 20,
      name: "Agriculture",
      icon: Leaf,
      slug:"agriculture-services",
      description: "Enable crop management alerts, market updates, insurance claims, loan reminders, and equipment maintenance scheduling. Empower farmers with real-time updates.",
      color: "from-green-500 via-lime-500 to-emerald-600",
      bgColor: "from-green-50 to-lime-50",
      category: "Agriculture",
      useCases: ["Crop Management", "Market Updates", "Insurance Claims", "Equipment Maintenance"]
    }
  ];

  // Use custom industries if provided, otherwise use default
  const industries = customIndustries || defaultIndustries;

  const filteredIndustries = industries.filter(industry =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedIndustries = showAllIndustries ? filteredIndustries : filteredIndustries.slice(0, 12);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isSearching = searchTerm.trim().length > 0;

  // Only triple the list for seamless infinite carousel when not searching and more items than fit on screen
  const enableCarouselLoop = !isSearching && displayedIndustries.length > itemsPerView;
  const useCarousel = !isSearching && displayedIndustries.length > itemsPerView;

  const sliderIndustries = displayedIndustries.length > 0
    ? enableCarouselLoop
      ? [...displayedIndustries, ...displayedIndustries, ...displayedIndustries]
      : displayedIndustries
    : [];

  const itemWidth = 100 / itemsPerView;
  const maxScrollPosition = Math.max(0, displayedIndustries.length - itemsPerView);

  const renderIndustryCard = (industry, key, fillSlot = false) => {
    const Icon = typeof industry.icon === 'string' ? iconMap[industry.icon] || Globe : industry.icon;
    const widthClass = fillSlot
      ? 'h-full w-full'
      : 'h-full w-full max-w-[280px] shrink-0';

    return (
      <motion.div
        key={key}
        className={`group flex cursor-pointer ${widthClass}`}
        {...revealMotion(revealOnMount, {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: 0.08, duration: 0.5 },
        })}
        onClick={() => setSelectedIndustry(industry)}
      >
        <article className="relative flex h-full min-h-[248px] w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-[#500CFD]/25">
          <div className="h-0.5 w-full shrink-0 bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-300" />

          <div className="flex flex-1 flex-col p-5">
            <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 ring-1 ring-indigo-100/80 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-5 w-5 text-[#500CFD]" />
              </div>
              <span className="shrink-0 rounded-full border border-indigo-100/80 bg-indigo-50/70 px-2.5 py-1 text-[11px] font-medium leading-none text-indigo-700">
                {industry.category}
              </span>
            </div>

            <h3 className="line-clamp-2 min-h-[2.75rem] shrink-0 text-base font-semibold leading-snug tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#500CFD]">
              {industry.name}
            </h3>

            <p className="mt-2.5 min-h-[5.5rem] shrink-0 line-clamp-4 text-sm leading-[1.375rem] text-gray-500">
              {industry.description}
            </p>

           
          </div>
        </article>
      </motion.div>
    );
  };

  // Auto-play: infinite loop only when carousel loop is enabled
  useEffect(() => {
    if (!isAutoPlaying || displayedIndustries.length === 0) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        if (enableCarouselLoop) {
          const next = prev + 1;
          if (next >= displayedIndustries.length * 2) return next;
          return next;
        }
        if (maxScrollPosition === 0) return 0;
        return prev >= maxScrollPosition ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayedIndustries.length, enableCarouselLoop, maxScrollPosition]);

  useEffect(() => {
    function updateItemsPerView() {
      const w = window.innerWidth;
      if (w >= 1280) setItemsPerView(4);
      else if (w >= 1024) setItemsPerView(3);
      else if (w >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    }

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Reset scroll when search/filter changes — avoid showing duplicate carousel clones
  useEffect(() => {
    if (enableCarouselLoop && displayedIndustries.length > 0) {
      setScrollPosition(displayedIndustries.length);
    } else {
      setScrollPosition(0);
    }
  }, [displayedIndustries.length, itemsPerView, isSearching, enableCarouselLoop]);

  useEffect(() => {
    if (isSearching) setIsAutoPlaying(false);
  }, [isSearching]);

  // Seamless loop boundary jumps (only when list is tripled)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !enableCarouselLoop || displayedIndustries.length === 0) return;

    if (scrollPosition >= displayedIndustries.length * 2) {
      const timeoutId = setTimeout(() => {
        slider.style.transition = 'none';
        setScrollPosition(displayedIndustries.length);
        slider.offsetHeight;
        requestAnimationFrame(() => {
          if (slider) slider.style.transition = '';
        });
      }, 700);
      return () => clearTimeout(timeoutId);
    }
    if (scrollPosition < displayedIndustries.length) {
      const timeoutId = setTimeout(() => {
        slider.style.transition = 'none';
        setScrollPosition(displayedIndustries.length * 2 - 1);
        slider.offsetHeight;
        requestAnimationFrame(() => {
          if (slider) slider.style.transition = '';
        });
      }, 700);
      return () => clearTimeout(timeoutId);
    }
  }, [scrollPosition, displayedIndustries.length, enableCarouselLoop]);

  return (
    <motion.section
      className={`relative px-4 sm:px-6 lg:px-8 ${unifiedGrid ? 'bg-transparent py-16 sm:py-20' : 'bg-white py-24'} ${className}`}
      {...revealMotion(revealOnMount, {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
      })}
    >
      {unifiedGrid ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/30 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: GRID_PATTERN_BG }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className={`text-center ${unifiedGrid ? 'mb-12' : 'mb-20'}`}
          {...revealMotion(revealOnMount, {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.8 },
          })}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50/90 backdrop-blur-sm border border-gray-100 shadow-sm text-gray-700 text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
            {subtitle}
          </div>
          <h2 className="section-heading text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-[#500CFD] to-indigo-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base mb-6">
            {description}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full mx-auto" />
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className={unifiedGrid ? 'mb-8' : 'mb-16'}
          {...revealMotion(revealOnMount, {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.4, duration: 0.6 },
          })}
        >
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3.5 pl-14 text-gray-700 bg-gray-50/90 backdrop-blur-sm border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-200 transition-all duration-300 group-hover:border-indigo-200"
              />
              <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
            </div>
          </div>
        </motion.div>

        {/* Industry cards — centered grid when searching or few results; carousel otherwise */}
        <motion.div
          className={`relative ${unifiedGrid ? 'mb-0' : 'mb-16'}`}
          {...revealMotion(revealOnMount, {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.6, duration: 0.8 },
          })}
        >
          {!useCarousel ? (
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {displayedIndustries.map((industry) => (
                <div key={`industry-static-${industry.id}`} className="flex h-full">
                  {renderIndustryCard(industry, `industry-static-${industry.id}`)}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="industry-slider-viewport relative w-full overflow-hidden overscroll-x-none py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div
                ref={sliderRef}
                className="flex items-stretch transition-transform duration-700 ease-out [&::-webkit-scrollbar]:hidden"
                style={{
                  transform: `translateX(-${scrollPosition * itemWidth}%)`,
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {sliderIndustries.map((industry, index) => (
                  <div
                    key={`industry-${industry.id}-${index}`}
                    className="box-border flex shrink-0 px-2 sm:px-3"
                    style={{ width: `${itemWidth}%` }}
                  >
                    {renderIndustryCard(industry, `industry-slide-${industry.id}-${index}`, true)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
