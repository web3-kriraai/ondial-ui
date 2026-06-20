'use client';

import { motion } from "framer-motion";
import { useRef, Suspense } from "react"
import { ArrowRight, CheckCircle } from "lucide-react";
import VariableProximity from "@/components/ui/VariableProximity"

export default function SubServiceHeroSection({
  title = "AI Voice Agents for Healthcare & Medical",
  subtitle = "Healthcare and medical organizations face a constant challenge: improving patient engagement while reducing operational costs. Missed appointments, delayed follow-ups, and inefficient claims processes not only affect care quality but also increase expenses.",
  description = "At OnDial, we provide AI voice agents for healthcare & medical services that help hospitals, clinics, and insurance providers deliver seamless, personalized, and automated communication.",
  primaryButtonText = "Get Started",
  secondaryButtonText,
  primaryButtonLink = "/login",
  secondaryButtonLink
}) {
  const containerRef = useRef(null)
  return (
    <div className="relative pt-20 pb-16 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-indigo-50/50">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 1, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-[1.2] sm:leading-[1.3] tracking-tight">
                <div
                  ref={containerRef}
                  style={{ position: 'relative ' }}
                >
                  <Suspense fallback={<span> With OnDial AI Voice Agents</span>}>
                    <VariableProximity
                      label={title}
                      className={'variable-proximity-demo leading-[1.2] sm:leading-[1.3] tracking-tight bg-gradient-to-r from-[#500CFD] to-indigo-600 bg-clip-text text-transparent'}
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={containerRef}
                      radius={100}
                      falloff='linear'
                    />
                  </Suspense>
                </div>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-900 max-w-2xl mx-auto lg:mx-0 leading-relaxed my-4"
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 lg:mx-0 "
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-5"
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <motion.a
                href={primaryButtonLink}
                className="group bg-gradient-to-r from-[#500CFD] to-indigo-600 text-white rounded-lg  transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 min-w-[150px] px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {secondaryButtonText && (
                <motion.a
                  href={secondaryButtonLink}
                  className="group bg-white text-gray-700 rounded-lg  transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-gray-300 flex items-center justify-center space-x-2 min-w-[180px] p-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{secondaryButtonText}</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 1, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="w-full h-auto relative rounded-2xl overflow-hidden ps-20 py-10">
              <img
                src="/img/vector/vector2.png"
                alt="AI Voice Agents for Healthcare"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
