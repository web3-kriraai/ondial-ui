"use client";

import { motion } from "framer-motion";
import { 
  Sparkles,
  FileText,
  Upload,
  SlidersHorizontal,
  PhoneCall,
  MessagesSquare,
  BarChart3,
  CheckCircle2,
  Settings,
  Server,
  Bell,
  Zap,
  Award,
  ShieldCheck,
  Mic,
  Brain,
  MessageSquare,
  Volume2
} from "lucide-react";

export default function HowOnDialWorks({
  title = "How OnDial Works",
  subtitle = "Launch AI Voice Campaigns in Minutes",
  description = "Set up, automate, and scale your customer communication with OnDial's powerful AI voice platform.",
  className = "",
  steps = [
    {
      id: 1,
      title: "Enter Campaign Details & Company Info",
      description: "Provide your campaign name, company details, and basic information to set the foundation for your calling campaign.",
      icon: "Upload",
      accent: "from-blue-500 via-indigo-500 to-indigo-600",
    },
    {
      id: 2,
      title: "Choose Services",
      description: "Select from property inquiries, lead qualification, appointment scheduling, or market updates to customize your campaign focus.",
      icon: "SlidersHorizontal",
      accent: "from-cyan-500 via-blue-500 to-indigo-600",
    },
    {
      id: 3,
      title: "Write Your Purpose for the Call",
      description: "Craft the main message or intent of the call. Use ready-made templates or customize your own for personalization.",
      icon: "FileText",
      accent: "from-emerald-500 via-teal-500 to-cyan-600",
    },
    {
      id: 4,
      title: "Upload Contacts & Pick a Voice",
      description: "Upload your contact list (CSV/Excel) and choose a natural voice that represents your brand's tone and language.",
      icon: "PhoneCall",
      accent: "from-teal-500 via-cyan-500 to-indigo-600",
    },
    {
      id: 5,
      title: "Go Live",
      description: "Launch your campaign instantly or schedule it for later. OnDial will begin calling your contacts automatically.",
      icon: "MessagesSquare",
      accent: "from-indigo-500 via-violet-500 to-indigo-600",
    },
    {
      id: 6,
      title: "Track Results",
      description: "Monitor live dashboards to track call outcomes, conversion rates, retries, and follow-ups in real time.",
      icon: "BarChart3",
      accent: "from-cyan-500 via-sky-500 to-blue-600",
    },
  ]
}) {
  const getIconComponent = (iconName) => {
    const iconClasses = "w-6 h-6";
    
    switch (iconName) {
      case "Upload":
        return <Upload className={iconClasses} />;
      case "SlidersHorizontal":
        return <SlidersHorizontal className={iconClasses} />;
      case "FileText":
        return <FileText className={iconClasses} />;
      case "PhoneCall":
        return <PhoneCall className={iconClasses} />;
      case "MessagesSquare":
        return <MessagesSquare className={iconClasses} />;
      case "BarChart3":
        return <BarChart3 className={iconClasses} />;
      case "Server":
        return <Server className={iconClasses} />;
      case "Settings":
        return <Settings className={iconClasses} />;
      case "Bell":
        return <Bell className={iconClasses} />;
      case "MessageSquare":
        return <MessageSquare className={iconClasses} />;
      case "Zap":
        return <Zap className={iconClasses} />;
      case "Award":
        return <Award className={iconClasses} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClasses} />;
      case "CheckCircle2":
        return <CheckCircle2 className={iconClasses} />;
      case "Mic":
        return <Mic className={iconClasses} />;
      case "Brain":
        return <Brain className={iconClasses} />;
      case "Volume2":
        return <Volume2 className={iconClasses} />;
      default:
        return <Upload className={iconClasses} />;
    }
  };
  return (
    <motion.section
      className={`relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 w-72 h-72 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute -bottom-48 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-indigo-200 rounded-full blur-3xl opacity-30 animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
            {subtitle}
          </div>
          <h2 className="section-heading text-gray-900 mb-5">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Steps - Creative Timeline Grid */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-indigo-100 to-indigo-100 rounded-full hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  className={`relative group ${isLeft ? 'lg:pr-10' : 'lg:pl-10'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Dot connector for lg */}
                  <div className={`hidden lg:block absolute top-8 ${isLeft ? 'right-0' : 'left-0'} w-5 h-5 -translate-y-1/2 ${isLeft ? 'translate-x-2.5' : '-translate-x-2.5'}`}>
                    <div className={`w-5 h-5 bg-gradient-to-r ${step.accent} rounded-full shadow-lg`} />
                  </div>

                  <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[140px]`}> 
                    {/* Accent gradient bar */}
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${step.accent}`} />

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.accent} flex items-center justify-center text-white shadow-md mb-4`}> 
                      {getIconComponent(step.icon)}
                    </div>

                    {/* Title and description */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl  text-gray-900">
                          {step.id}. {step.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom features */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-4 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-700">Enterprise-grade security & compliance</span>
          </div>
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-4 shadow-sm">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-700">Easy setup, no engineering required</span>
          </div>
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-4 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700">Proven templates across 20+ industries</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
