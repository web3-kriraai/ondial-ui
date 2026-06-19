"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Globe2,
  Globe,
  Shield,
  TrendingUp,
  Star,
  Stethoscope,
  HeartPulse,
  Plug,
  ShieldCheck,
  Server,
  UserCheck,
  Building,
  Settings,
  Users,
  Languages,
  Layers,
  MessageSquare,
  Calendar,
  PhoneCall,
  Award,
  BarChart,
  Headphones,
  Puzzle,
  GraduationCap,
  Map,
  Clock,
  Scale,
  FileText,
  Briefcase,
  Heart,
  ChartBar,
  Truck,
  Cog,
  ClipboardList,
  Link,
  BarChart3,
  Cpu,
  CheckCircle,
  Bot,
} from "lucide-react";

const iconMap = {
  Zap,
  Globe,
  Globe2,
  Shield,
  TrendingUp,
  Star,
  Stethoscope,
  HeartPulse,
  Plug,
  ShieldCheck,
  Server,
  UserCheck,
  Building,
  Settings,
  Users,
  Languages,
  Layers,
  MessageSquare,
  Calendar,
  PhoneCall,
  Award,
  BarChart,
  Headphones,
  Puzzle,
  GraduationCap,
  Map,
  Clock,
  Scale,
  FileText,
  Briefcase,
  Heart,
  ChartBar,
  Truck,
  Cog,
  ClipboardList,
  Link,
  BarChart3,
  Cpu,
  CheckCircle,
  Bot,
};

const GRID_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500CFD' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

/**
 * WhyChooseSection - Premium centered feature highlights
 */
export default function WhyChooseSection({
  features = [
    {
      icon: Zap,
      title: "Ultra-Low Latency Calls",
      description:
        "Enjoy human-like conversations with under 500 ms response time for a seamless user experience.",
    },
    {
      icon: Globe2,
      title: "Global Communication",
      description:
        "Support for 100+ languages and cultural nuances to connect with customers worldwide.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-Grade Security",
      description: "GDPR and CCPA compliance with encrypted data handling.",
    },
    {
      icon: Server,
      title: "Flexible Deployment",
      description:
        "Choose between API integration for developers or a no-code platform for business teams.",
    },
    {
      icon: TrendingUp,
      title: "Proven ROI",
      description:
        "Reduce operational costs while increasing customer satisfaction and conversion rates.",
    },
  ],
  title = "Trusted by All Businesses Worldwide",
  subtitle = "Why Choose OnDial?",
  description = "OnDial delivers real-time, multilingual AI Voice Agents that empower companies to handle calls, automate workflows, and connect with customers—faster, smarter, and at scale.",
  highlightText = "All Businesses",
  className = "",
}) {
  return (
    <motion.section
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: GRID_PATTERN_BG }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header — centered, premium minimal */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50/90 backdrop-blur-sm border border-gray-100 shadow-sm text-gray-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 text-indigo-600" />
            {subtitle}
          </div>

          <h2 className="section-heading text-gray-900 mb-6">
            {title.includes(highlightText) ? (
              <>
                {title.split(highlightText)[0]}
                <span className="bg-gradient-to-r from-[#500CFD] to-indigo-500 bg-clip-text text-transparent">
                  {highlightText}
                </span>
                {title.split(highlightText)[1]}
              </>
            ) : (
              title
            )}
          </h2>

          {description ? (
            <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-sm md:text-base mb-6">
              {description}
            </p>
          ) : null}

          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full mx-auto" />
        </motion.div>

        {/* Features — large line icons, centered (reference layout) */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-14 sm:gap-x-14 lg:gap-x-20 lg:gap-y-16 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon =
              typeof feature.icon === "string"
                ? iconMap[feature.icon]
                : feature.icon;

            return (
              <motion.article
                key={`${feature.title}-${index}`}
                className="flex w-full max-w-[280px] flex-col items-center px-4 text-center sm:w-[calc(50%-1.75rem)] lg:w-[calc(33.333%-2.5rem)]"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 sm:mb-8 flex h-14 sm:h-16 items-center justify-center">
                  {Icon ? (
                    <Icon
                      className="w-11 h-11 sm:w-12 sm:h-12 text-gray-900"
                      strokeWidth={1.25}
                    />
                  ) : (
                    <Star
                      className="w-11 h-11 sm:w-12 sm:h-12 text-gray-900"
                      strokeWidth={1.25}
                    />
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
