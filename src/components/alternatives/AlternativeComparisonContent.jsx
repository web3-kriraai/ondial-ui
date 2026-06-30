'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  X,
  Minus,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Building2,
  TrendingUp,
} from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import ComplianceTrustSection from '@/components/ComplianceTrustSection';
const GRID_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500CFD' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

function getPageSections(competitorName) {
  return [
    { id: 'overview', label: 'Overview' },
    { id: 'competitor-features', label: competitorName },
    { id: 'pain-points', label: 'Pain Points' },
    { id: 'comparison', label: 'Compare' },
    { id: 'why-ondial', label: 'Why OnDial' },
    { id: 'ondial-features', label: 'Features' },
    { id: 'industries', label: 'Industries' },
    { id: 'migration', label: 'Migration' },
    { id: 'results', label: 'Results' },
    { id: 'faqs', label: 'FAQs' },
  ];
}

function SectionBadge({ children }) {
  return (
    <div className="mb-5 inline-flex items-center rounded-full border border-indigo-200/50 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
      <Sparkles className="mr-2 h-4 w-4 text-indigo-600" />
      {children}
    </div>
  );
}

function SectionHeader({ badge, title, subtitle, centered = true }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {badge && <SectionBadge>{badge}</SectionBadge>}
      <h2 className="section-heading text-gray-900">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

function ExpandableBlock({ summary, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-gray-100 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/80"
      >
        <span className="text-sm leading-relaxed text-gray-700 sm:text-base">{summary}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-indigo-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageNav({ sections }) {
  return (
    <nav
      aria-label="Page sections"
      className="z-30 border-b border-gray-200/80 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 sm:text-sm"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function HeroSection({ data, competitorName }) {
  const { hero } = data;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-indigo-50/50 pt-24 pb-14">
      <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <SectionBadge>{hero.badge}</SectionBadge>
            <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-[#500CFD] to-indigo-600 bg-clip-text text-transparent">
                {hero.title}
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">{hero.subtitle}</p>

            <ul className="mt-6 space-y-2.5 text-left">
              {hero.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 sm:text-base">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                  {item}
                </li>
              ))}
            </ul>

            <ExpandableBlock summary={`Why teams switch from ${competitorName}`}>
              <p>{hero.description}</p>
            </ExpandableBlock>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={hero.primaryButtonLink}
                className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#500CFD] to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02]"
              >
                {hero.primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                {hero.secondaryButtonText}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {hero.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-md backdrop-blur-sm sm:p-5"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#500CFD] to-indigo-600">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-base font-semibold text-gray-900 sm:text-lg">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-gray-600 sm:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatIsCompetitorSection({ data }) {
  const whatIsCompetitor = data.whatIsCompetitor ?? data.whatIsRingg;

  return (
    <section id="overview" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: GRID_PATTERN_BG }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={whatIsCompetitor.badge} title={whatIsCompetitor.title} subtitle={whatIsCompetitor.summary} />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="grid grid-cols-2 gap-3 lg:col-span-2">
            {whatIsCompetitor.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white p-5 text-center"
              >
                <p className="text-2xl font-semibold text-indigo-700">{stat.value}</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-gray-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-100 bg-slate-50/50 p-6">
              <p className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase">At a glance</p>
              <ul className="space-y-3">
                {whatIsCompetitor.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <ExpandableBlock summary="Read full platform overview">
                  <div className="space-y-4">
                    {whatIsCompetitor.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </ExpandableBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompetitorFeaturesSection({ data }) {
  const competitorFeatures = data.competitorFeatures ?? data.ringgFeatures;

  return (
    <section id="competitor-features" className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={competitorFeatures.badge}
          title={competitorFeatures.title}
          subtitle={competitorFeatures.subtitle}
        />
        <div className="mt-10 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {competitorFeatures.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group">
                <div className="flex items-start gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{feature.summary}</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs font-medium text-indigo-600 hover:text-indigo-800">
                        More detail
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
                    </details>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PainPointsSection({ data }) {
  const { whyLookForAlternative } = data;

  return (
    <section id="pain-points" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={whyLookForAlternative.badge}
          title={whyLookForAlternative.title}
          subtitle={whyLookForAlternative.painPointsSubtitle ?? whyLookForAlternative.subtitle}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {whyLookForAlternative.reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-indigo-50/30 to-white p-5 sm:p-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                    {index + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-black">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-indigo-700">{reason.title}</h3>
                  <p className="mt-1 text-sm font-medium">{reason.summary}</p>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700">
                      Full context
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{reason.description}</p>
                  </details>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
          {whyLookForAlternative.subtitle}
        </p>
      </div>
    </section>
  );
}

function ComparisonCell({ status, note }) {
  if (status === 'yes') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CheckCircle className="h-3.5 w-3.5" />
        Yes
      </span>
    );
  }
  if (status === 'no') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
        <X className="h-3.5 w-3.5" />
        {note ? `No · ${note}` : 'No'}
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
        <Minus className="h-3.5 w-3.5" />
        {note ? `Partial · ${note}` : 'Partial'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
      <Minus className="h-3.5 w-3.5" />
      {note || 'Not stated'}
    </span>
  );
}

function getCompetitorStatus(row) {
  return row.competitor ?? row.ringg;
}

function ComparisonSection({ data, competitorName }) {
  const { comparison } = data;
  const ondialWins = comparison.rows.filter((r) => {
    const status = getCompetitorStatus(r);
    return r.ondial === 'yes' && (status === 'no' || status === 'partial' || status === 'not-stated');
  }).length;

  return (
    <section id="comparison" className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={comparison.badge} title={comparison.title} subtitle={comparison.subtitle} />

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 text-center">
            <p className="text-2xl font-bold text-indigo-700">{ondialWins}</p>
            <p className="mt-1 text-xs text-indigo-900/80">OnDial advantages</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{comparison.rows.length}</p>
            <p className="mt-1 text-xs text-gray-600">Features compared</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">100+</p>
            <p className="mt-1 text-xs text-emerald-900/80">OnDial languages</p>
          </div>
        </div>

        {/* Desktop table */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:block">
          <div className="grid grid-cols-3 border-b border-gray-200 bg-slate-50 text-sm font-semibold text-gray-700">
            <div className="px-6 py-4">Feature</div>
            <div className="border-l border-gray-200 bg-indigo-50/60 px-6 py-4 text-indigo-800">OnDial</div>
            <div className="border-l border-gray-200 px-6 py-4">{competitorName}</div>
          </div>
          {comparison.rows.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 text-sm ${index < comparison.rows.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="px-6 py-4 font-medium text-gray-900">{row.feature}</div>
              <div className="border-l border-gray-100 bg-indigo-50/20 px-6 py-4">
                <ComparisonCell status={row.ondial} />
              </div>
              <div className="border-l border-gray-100 px-6 py-4">
                <ComparisonCell status={getCompetitorStatus(row)} note={row.competitorNote ?? row.ringgNote} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="mt-8 space-y-3 md:hidden">
          {comparison.rows.map((row, index) => (
            <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 font-medium text-gray-900">{row.feature}</p>
              <div className="flex flex-wrap gap-2">
                <ComparisonCell status={row.ondial} />
                <ComparisonCell status={getCompetitorStatus(row)} note={row.competitorNote ?? row.ringgNote} />
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-indigo-900">
          {comparison.closing}
        </p>
      </div>
    </section>
  );
}

function WhyOnDialSection({ data }) {
  const { whyOnDial } = data;

  return (
    <section id="why-ondial" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={whyOnDial.badge} title={whyOnDial.title} subtitle={whyOnDial.intro} />

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {whyOnDial.highlightPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-800"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          {whyOnDial.features.map((feature, index) => {
            const Icon = feature.icon;
            const reversed = index % 2 === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                viewport={{ once: true }}
                className={`flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-indigo-50/20 p-5 sm:flex-row sm:items-center sm:p-6 ${reversed ? 'sm:flex-row-reverse' : ''}`}
              >
                <div className="flex shrink-0 items-center gap-4 sm:w-64">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#500CFD] to-indigo-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-sm text-indigo-700">{feature.summary}</p>
                  </div>
                </div>
                <div className="flex-1 border-t border-gray-100 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                  <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OnDialFeaturesTabs({ data }) {
  const { ondialFeatures } = data;
  const [activeTab, setActiveTab] = useState(ondialFeatures.categories[0].id);

  const filtered = ondialFeatures.features.filter((f) => f.category === activeTab);

  return (
    <section id="ondial-features" className="bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={ondialFeatures.badge}
          title={ondialFeatures.title}
          subtitle={ondialFeatures.subtitle}
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {ondialFeatures.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-[#500CFD] to-indigo-600 text-white shadow-md'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-indigo-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="wait">
            {filtered.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm font-medium text-indigo-700">{feature.summary}</p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs font-medium text-gray-500">Learn more</summary>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
                </details>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function IndustriesHubSection({ data, competitorName }) {
  const { useCases, industriesUsingOnDial } = data;
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [view, setView] = useState('compare');

  const active = useCases.industries[activeIndustry];
  const ActiveIcon = active.icon;

  return (
    <section id="industries" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Industries"
          title={useCases.hubTitle ?? `Where OnDial outperforms ${competitorName}`}
          subtitle={useCases.hubSubtitle ?? 'Explore by sector - compliance proof, language reach, and automation playbooks.'}
        />

        <div className="mt-8 flex justify-center gap-2">
          {['compare', 'all'].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                view === v
                  ? 'bg-indigo-600 text-white'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {v === 'compare' ? `vs ${competitorName}` : 'All industries'}
            </button>
          ))}
        </div>

        {view === 'compare' ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {useCases.industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.title}
                    type="button"
                    onClick={() => setActiveIndustry(index)}
                    className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all lg:w-full ${
                      activeIndustry === index
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-indigo-100'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${activeIndustry === index ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium text-gray-900">{industry.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-indigo-50/30 p-6 lg:col-span-8 lg:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                  <ActiveIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{active.title}</h3>
                  <p className="text-sm text-gray-600">{active.summary}</p>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {active.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm"
                  >
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/50 px-4 py-3">
                <p className="text-xs font-semibold tracking-wide text-indigo-800 uppercase">OnDial edge</p>
                <p className="mt-1 text-sm text-indigo-900">{active.edge}</p>
              </div>

              <details className="mt-5">
                <summary className="cursor-pointer text-sm font-medium text-gray-500">Full industry breakdown</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{active.description}</p>
              </details>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industriesUsingOnDial.industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.title}
                  className="rounded-2xl border border-gray-100 bg-slate-50/50 p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{industry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{industry.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function MigrationTimeline({ data }) {
  const { migration } = data;

  return (
    <section id="migration" className="bg-gradient-to-br from-indigo-50/30 via-white to-blue-50/30 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={migration.badge} title={migration.title} subtitle={migration.subtitle} />

        <div className="relative mt-12">
          <div className="absolute top-0 left-5 h-full w-px bg-indigo-200 sm:left-6" />
          <div className="space-y-8">
            {migration.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="relative flex gap-5 pl-12 sm:pl-14"
                >
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-200 bg-white shadow-sm sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-1 text-xs font-semibold text-indigo-600">Step {index + 1}</div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm font-medium text-gray-700">{step.summary}</p>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-medium text-gray-500">Details</summary>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                    </details>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SwitchBenefitsSection({ data }) {
  const { switchBenefits } = data;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={switchBenefits.badge}
          title={switchBenefits.title}
          subtitle={switchBenefits.subtitle}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {switchBenefits.benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-indigo-50/20 p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{benefit.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-indigo-700">{benefit.summary}</p>
              <details className="mt-3 text-left">
                <summary className="cursor-pointer text-center text-xs text-gray-400 hover:text-gray-600">
                  More
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">{benefit.description}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStoriesSection({ data }) {
  const { successStories } = data;

  return (
    <section id="results" className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={successStories.badge}
          title={successStories.title}
          subtitle={successStories.intro}
        />

        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-gray-500">
          {successStories.outcomesNote}
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {successStories.examples.map((example, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="absolute top-0 right-0 rounded-bl-xl bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                Illustrative
              </div>
              <Building2 className="mb-3 h-5 w-5 text-indigo-500" />
              <h3 className="font-semibold text-gray-900">{example.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{example.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-100 bg-white p-6 sm:p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">{successStories.roiTitle}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {successStories.roiBullets.map((item) => (
              <div key={item.label} className="rounded-xl bg-indigo-50/50 p-4 text-center">
                <p className="text-sm font-semibold text-indigo-800">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-500">
            {successStories.roiDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AlternativeComparisonContent({ data }) {
  const competitorName = data.competitor?.name ?? 'Ringg AI';
  const { faqs, cta } = data;
  const pageSections = getPageSections(competitorName);
  const faqTitle = data.faqSection?.title ?? `${competitorName} Alternative -`;
  const faqHighlight = data.faqSection?.highlightedTitle ?? 'FAQs';
  const faqDescription =
    data.faqSection?.description ??
    `Get answers to common questions about switching from ${competitorName} to OnDial.`;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection data={data} competitorName={competitorName} />
      <PageNav sections={pageSections} />
      <WhatIsCompetitorSection data={data} />
      <CompetitorFeaturesSection data={data} />
      <PainPointsSection data={data} />
      <ComparisonSection data={data} competitorName={competitorName} />
      <WhyOnDialSection data={data} />
      <OnDialFeaturesTabs data={data} />
      <ComplianceTrustSection />
      <IndustriesHubSection data={data} competitorName={competitorName} />
      <MigrationTimeline data={data} />
      <SwitchBenefitsSection data={data} />
      <SuccessStoriesSection data={data} />

      <div id="faqs">
        <FAQSection
          badgeIcon="HelpCircle"
          badgeText="Frequently Asked Questions"
          title={faqTitle}
          highlightedTitle={faqHighlight}
          description={faqDescription}
          faqs={faqs}
          backgroundClass="bg-gradient-to-br from-indigo-50/30 via-white to-blue-50/30"
          className="py-20"
        />
      </div>

      <CTASection
        badgeIcon={cta.badgeIcon}
        badgeText={cta.badgeText}
        title={cta.title}
        highlightedTitle={cta.highlightedTitle}
        description={cta.description}
        primaryButtonText={cta.primaryButtonText}
        secondaryButtonText={cta.secondaryButtonText}
        primaryButtonLink={cta.primaryButtonLink}
        secondaryButtonLink={cta.secondaryButtonLink}
        backgroundClass="bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50"
      />
    </div>
  );
}
