"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import StructuredData from "./StructuredData";

const GRID_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500CFD' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

const iconMap = {
  HelpCircle,
  ChevronDown,
  ArrowRight,
};

export default function FAQSection({
  badgeIcon = "HelpCircle",
  badgeText = "Frequently Asked Questions",
  title = "Everything You Need to Know About",
  highlightedTitle = "OnDial",
  description = "Get answers to the most common questions about how OnDial can transform your business and never let you lose a customer again.",
  faqs = [
    {
      question: "What exactly is OnDial?",
      answer:
        "OnDial is like having a perfect employee who works 24/7, never takes breaks, and speaks every language. It's an AI that answers your customer calls instantly, just like a real person would.",
    },
    {
      question: "How does OnDial help my business?",
      answer:
        "It stops you from losing customers to long wait times. While your competitors make people wait on hold, OnDial answers every call instantly. Your customers get help immediately, and you never miss a sale.",
    },
    {
      question: "Can OnDial speak different languages?",
      answer:
        "Yes! OnDial speaks 100+ languages fluently. Whether your customer speaks Spanish, French, Mandarin, or any other language, OnDial handles it perfectly. No need to hire translators or language experts.",
    },
    {
      question: "What types of businesses use OnDial?",
      answer:
        "Any business that gets customer calls! Restaurants, retail stores, real estate agents, healthcare providers, and online businesses all use OnDial to never miss a customer call and provide instant support.",
    },
    {
      question: "Is OnDial good for small businesses?",
      answer:
        "Absolutely! Small businesses love OnDial because it's affordable and scales with your business. You can start small and grow without hiring more staff. It's like having a team of customer service experts for the price of one employee.",
    },
    {
      question: "How fast does OnDial respond?",
      answer:
        "Instantly! Your customers never wait. While traditional phone systems make people wait on hold listening to music, OnDial answers in milliseconds. It's faster than a human could pick up the phone.",
    },
    {
      question: "Can OnDial handle multiple calls at once?",
      answer:
        "Yes! OnDial can handle hundreds of calls simultaneously. Unlike human employees who can only talk to one person at a time, OnDial never gets overwhelmed and never puts anyone on hold.",
    },
    {
      question: "Is my customer information safe?",
      answer:
        "Completely safe! We use the same security that protects your bank account. Your customer data is encrypted and never stored in a way that could be compromised. We take privacy as seriously as you do.",
    },
    {
      question: "How much does OnDial cost?",
      answer:
        "OnDial is very affordable, especially compared to hiring staff. Most businesses see the system pay for itself within the first month. We offer flexible pricing plans that grow with your business.",
    },
    {
      question: "How do I get started with OnDial?",
      answer:
        "Getting started is easy! You can try OnDial for free with no commitment. Just schedule a demo to see how it works, and we'll help you set it up. Most businesses are up and running within a day.",
    },
  ],
  className = "",
  backgroundClass,
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const useDefaultBg = !backgroundClass;
  const BadgeIconComponent = iconMap[badgeIcon];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <motion.section
        className={`relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 ${backgroundClass || "bg-white"} ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {useDefaultBg && (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-white to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{ backgroundImage: GRID_PATTERN_BG }}
              aria-hidden
            />
          </>
        )}

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            className="mb-12 text-center md:mb-16"
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

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              {description}
            </p>

            <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    isOpen
                      ? "border-indigo-200 bg-indigo-50/30"
                      : "border-gray-100 hover:border-indigo-100"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <h3
                      className={`flex-1 text-sm font-medium leading-snug transition-colors duration-300 sm:text-base ${
                        isOpen ? "text-[#500CFD]" : "text-gray-900"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`shrink-0 ${isOpen ? "text-indigo-600" : "text-gray-400"}`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  <FaqAccordionPanel
                    isOpen={isOpen}
                    panelId={`faq-panel-${index}`}
                    triggerId={`faq-trigger-${index}`}
                  >
                    <div className="border-t border-gray-100/80 px-5 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
                      <p className="text-sm leading-relaxed text-gray-500">
                        {faq.answer}
                      </p>
                    </div>
                  </FaqAccordionPanel>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
