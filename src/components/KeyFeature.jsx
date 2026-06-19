'use client'

import React, { useMemo, memo, useState, useEffect, useRef } from 'react';
import {
  Mic,
  Mic2,
  Target,
  Phone,
  Calendar,
  ShieldCheck,
  Briefcase,
  PhoneCall,
  Globe,
  Bot,
  TrendingUp,
  MessageCircle,
  Headphones,
  RefreshCw,
  BarChart3,
  Brain,
  Volume2,
  Waves,
  Zap,
  Sparkles,
  Cpu,
  Lightbulb,
  Link2,
  Plug,
  Layers,
  Users,
  Languages,
  FileText,
  ClipboardList,
  CheckCircle2,
  Server,
  LineChart,
  PieChart,
  Mail,
  Send,
  Bell,
  Clock,
  Award,
  Rocket,
  Wallet,
  CreditCard,
  ShoppingCart,
  Home,
  Stethoscope,
  GraduationCap,
  Building2,
  Laptop,
  Smartphone,
  Radar,
  AudioLines,
  BookOpen,
  Factory,
  Truck,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { normalizeKeyFeatureIconName, resolveKeyFeatureIconName } from '@/lib/keyFeatureIcons';

const iconMap = {
  Mic,
  Mic2,
  Target,
  Phone,
  Calendar,
  ShieldCheck,
  Briefcase,
  PhoneCall,
  Globe,
  Bot,
  TrendingUp,
  MessageCircle,
  Headphones,
  RefreshCw,
  BarChart3,
  Brain,
  Volume2,
  Waves,
  Zap,
  Sparkles,
  Cpu,
  Lightbulb,
  Link2,
  Plug,
  Layers,
  Users,
  Languages,
  FileText,
  ClipboardList,
  CheckCircle2,
  Server,
  LineChart,
  PieChart,
  Mail,
  Send,
  Bell,
  Clock,
  Award,
  Rocket,
  Wallet,
  CreditCard,
  ShoppingCart,
  Home,
  Stethoscope,
  GraduationCap,
  Building2,
  Laptop,
  Smartphone,
  Radar,
  AudioLines,
  BookOpen,
  Factory,
  Truck,
  Shield,
  HelpCircle,
};

/** Brand-aligned icon tile: same for every key-feature card */
const KEY_FEATURE_ICON_GRADIENT = 'from-[#6A32F8] to-indigo-600';
const KEY_FEATURE_CARD_GLOW = 'linear-gradient(135deg, #6A32F820, #4f46e520)';

const KeyFeature = memo(({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  const { title, features } = data;

  const processedFeatures = useMemo(() => {
    return (
      features?.map((feature, index) => ({
        ...feature,
        resolvedIcon: resolveKeyFeatureIconName(feature),
        computedGradient: KEY_FEATURE_CARD_GLOW,
        animationDelay: `${index * 150}ms`,
      })) || []
    );
  }, [features]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"
    >
      {/* Lazy-loaded Background Elements */}
      {isVisible && (
        <div className="absolute inset-0">
          {/* Simplified geometric shapes - reduced blur and count */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/25 to-indigo-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>

          {/* Minimal floating elements */}
          <div className="absolute top-20 right-32 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      )}

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-indigo-100/90 backdrop-blur-sm rounded-full text-sm  text-indigo-800 border border-indigo-200/50 mb-6 shadow-lg">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 animate-pulse"></div>
            Advanced AI Technology
          </div>

          <h2 className="section-heading text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful capabilities that make our Gujarati AI voice agent the perfect solution for modern businesses
          </p>
        </div>

        {/* Features Grid - Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative will-change-transform"
              style={{ animationDelay: feature.animationDelay }}
            >
              {/* Simplified background glow - pre-calculated */}
              <div
                className="absolute -inset-1 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-md"
                style={{ background: feature.computedGradient }}
              ></div>

              {/* Optimized main card - reduced hover effects */}
              <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Icon with pre-calculated gradient */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${KEY_FEATURE_ICON_GRADIENT} mb-4 text-2xl shadow-md`}
                >
                  {(() => {
                    const name =
                      feature.resolvedIcon ||
                      normalizeKeyFeatureIconName(resolveKeyFeatureIconName(feature));
                    const IconComponent = iconMap[name] || MessageCircle;
                    return <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />;
                  })()}
                </div>

                {/* Title */}
                <h3 className="text-xl text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 min-h-[3.75rem]">
                  {feature.description}
                </p>

                {/* Simplified decorative element */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#6A32F8] opacity-35"></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Simplified bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
});

// Add display name for better debugging
KeyFeature.displayName = 'KeyFeature';

export default KeyFeature;
