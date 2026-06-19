"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import IllustrationImg from "@/components/IllustrationImg";
import {
  ArrowRight,
  Phone,
  Heart,
  Zap,
  Star,
  Bot,
  Users,
  Globe,
  Clock,
  Shield,
  Play,
  CheckCircle,
  Building2,
  ShoppingCart,
  Car,
  GraduationCap,
  Briefcase,
  Home,
} from "lucide-react";

const iconMap = {
  ArrowRight,
  Phone,
  Heart,
  Zap,
  Star,
  Bot,
  Users,
  Globe,
  Clock,
  Shield,
  Play,
  CheckCircle,
  Building2,
  ShoppingCart,
  Car,
  GraduationCap,
  Briefcase,
  Home,
};

const GRID_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500CFD' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

const primaryBtnClass =
  "group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#500CFD] to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:from-[#500CFD] hover:to-indigo-700 sm:px-8 sm:py-3.5 sm:text-base cursor-pointer";

const secondaryBtnClass =
  "group inline-flex items-center justify-center rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700 sm:px-8 sm:py-3.5 sm:text-base cursor-pointer";

export default function CTASection({
  badgeIcon = "Heart",
  badgeText = "Transform Your Business Today",
  title = "Stop Losing Customers to",
  highlightedTitle = "Long Wait Times",
  description = "Join thousands of businesses that never miss a call, never lose a sale, and always provide exceptional customer service with OnDial.",
  primaryButtonText = "Start Free Trial",
  secondaryButtonText = "Schedule Demo",
  primaryButtonIcon = "ArrowRight",
  secondaryButtonIcon = "Phone",
  primaryButtonLink = "/login",
  secondaryButtonLink = "/contact",
  onPrimaryClick,
  onSecondaryClick,
  imageSrc = "/img/vector/vector5.png",
  imageAlt = "AI Voice Agents in Action",
  showIllustration = false,
  backgroundClass,
  className = "",
}) {
  const useDefaultBg = !backgroundClass;
  const BadgeIconComponent = iconMap[badgeIcon];
  const PrimaryIconComponent = iconMap[primaryButtonIcon];
  const SecondaryIconComponent = iconMap[secondaryButtonIcon];

  const contentBlock = (
    <motion.div
      className={`py-10 ${showIllustration ? "text-center lg:text-left" : "mx-auto max-w-3xl text-center"}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mb-6 inline-flex items-center rounded-full border border-gray-100 bg-gray-50/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm">
        {BadgeIconComponent && (
          <BadgeIconComponent className="mr-2 h-4 w-4 text-indigo-600" />
        )}
        {badgeText}
      </div>

      <h2 className="section-heading mb-6 text-gray-900">
        {title}
        <span className="mt-2 block bg-gradient-to-r from-[#500CFD] to-indigo-500 bg-clip-text text-transparent">
          {highlightedTitle}
        </span>
      </h2>

      <p className="mb-8 text-sm leading-relaxed text-gray-500 md:text-base">
        {description}
      </p>

      <div
        className={`mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300 ${
          showIllustration ? "mx-auto lg:mx-0" : "mx-auto"
        }`}
      />

      <div
        className={`flex flex-col items-center gap-4 sm:flex-row ${
          showIllustration ? "justify-center lg:justify-start" : "justify-center"
        }`}
      >
        {onPrimaryClick ? (
          <button type="button" onClick={onPrimaryClick} className={primaryBtnClass}>
            {primaryButtonText}
            {PrimaryIconComponent && (
              <PrimaryIconComponent className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        ) : (
          <Link href={primaryButtonLink} className={primaryBtnClass}>
            {primaryButtonText}
            {PrimaryIconComponent && (
              <PrimaryIconComponent className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            )}
          </Link>
        )}

        {onSecondaryClick ? (
          <button type="button" onClick={onSecondaryClick} className={secondaryBtnClass}>
            {SecondaryIconComponent && (
              <SecondaryIconComponent className="mr-2 h-5 w-5 text-indigo-600" />
            )}
            {secondaryButtonText}
          </button>
        ) : (
          <Link href={secondaryButtonLink || "#"} className={secondaryBtnClass}>
            {SecondaryIconComponent && (
              <SecondaryIconComponent className="mr-2 h-5 w-5 text-indigo-600" />
            )}
            {secondaryButtonText}
          </Link>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.section
      className={`relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 ${backgroundClass || "bg-white"} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {useDefaultBg && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-white to-transparent" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: GRID_PATTERN_BG }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl">
        {showIllustration ? (
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] lg:h-[350px] lg:w-[350px]">
                <IllustrationImg
                  preferredSrc={imageSrc}
                  alt={imageAlt}
                  width={350}
                  height={350}
                  className="h-full w-full max-h-full max-w-full object-contain"
                />
              </div>
            </motion.div>
            {contentBlock}
          </div>
        ) : (
          contentBlock
        )}
      </div>
    </motion.section>
  );
}
