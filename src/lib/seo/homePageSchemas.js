/**
 * Homepage-scoped JSON-LD schemas (BreadcrumbList, Product, ItemList, HowTo, Service).
 */

import { absoluteUrl, SITE_LOGO, SITE_NAME, SITE_URL } from './siteConfig';

const ORG = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

/** Home-only breadcrumb (root page). */
export const homeBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ],
};

/** Product + SoftwareApplication for the OnDial platform. */
export const homeProductSchema = {
  '@context': 'https://schema.org',
  '@type': ['Product', 'SoftwareApplication'],
  '@id': `${SITE_URL}/#product`,
  name: 'OnDial AI Voice Agent Platform',
  description:
    'OnDial is an enterprise AI voice agent platform that automates phone calls end to end. It handles inbound and outbound calls 24/7, speaks 100+ languages, integrates with your CRM, calendar, and telephony stack, and includes live agent handoff, real-time sentiment intelligence, and call analytics. Build production-ready voice agents with no code.',
  url: `${SITE_URL}/`,
  brand: ORG,
  image: SITE_LOGO,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Voice Agent Platform',
  operatingSystem: 'Web-based, Cloud',
  featureList: [
    '24/7 inbound and outbound AI call handling',
    '100+ language multilingual support',
    'Appointment scheduling and booking automation',
    'Automatic CRM logging and call summarization',
    'Lead qualification and routing',
    'Real-time sentiment intelligence',
    'Context-aware live agent handoff',
    'No-code AI agent builder',
    'Enterprise integrations (CRM, ERP, ticketing, telephony)',
    'Call analytics with CSAT and resolution tracking',
  ],
  offers: {
    '@type': 'Offer',
    url: absoluteUrl('/pricing'),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    category: 'SaaS Subscription',
  },
};

/** Homepage industries (aligned with carousel destinations). */
const HOME_INDUSTRIES = [
  { name: 'Healthcare & Medical', href: '/industries/ai-voice-agents-healthcare-medical' },
  { name: 'Insurance', href: '/industries/ai-voice-agents-insurance' },
  { name: 'Finance & Banking', href: '/industries/ai-voice-agents-finance-banking' },
  { name: 'Real Estate', href: '/industries/ai-voice-agents-real-estate' },
  { name: 'Manufacturing', href: '/industries/ai-voice-agents-manufacturing' },
  { name: 'Travel & Tourism', href: '/industries/ai-voice-agents-travel-tourism' },
  { name: 'Transportation & Logistics', href: '/industries/ai-voice-agents-transportation-logistics' },
  { name: 'Retail & E-commerce', href: '/industries/ai-voice-agents-retail-e-commerce' },
  { name: 'Telecommunication', href: '/industries/ai-voice-agents-telecommunications' },
  { name: 'Automotive', href: '/industries/ai-voice-agents-automotive' },
  { name: 'Education', href: '/industries/ai-voice-agents-education' },
  { name: 'Hospitality', href: '/industries/ai-voice-agents-hospitality' },
];

/** Industries ItemList with crawlable industry page URLs. */
export const homeIndustriesItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': absoluteUrl('/industries'),
  name: 'Industries Served by OnDial AI Voice Agents',
  description:
    'Industries that use OnDial AI voice agents for customer support, sales calls, appointment booking, and call automation.',
  itemListOrder: 'https://schema.org/ItemListUnordered',
  numberOfItems: HOME_INDUSTRIES.length,
  itemListElement: HOME_INDUSTRIES.map((industry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: industry.name,
    item: absoluteUrl(industry.href),
  })),
};

/** How to get started with OnDial. */
export const homeHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}/#howto`,
  name: 'How to Get Started with OnDial AI Voice Agents',
  description:
    'Deploy an AI voice agent with OnDial to automate your business phone calls 24/7.',
  totalTime: 'PT15M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Book a free demo',
      text: 'Schedule a free demo with OnDial to see how real-time, multilingual AI voice agents handle your calls.',
      url: absoluteUrl('/contact'),
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Connect your existing stack',
      text: 'Connect OnDial to your CRM, calendar, telephony, and communication tools in minutes. No engineering required.',
      url: `${SITE_URL}/`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Build your AI voice agent',
      text: 'Use the no-code builder to configure a production-ready AI voice agent trained on your knowledge base, policies, and product information.',
      url: absoluteUrl('/services'),
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Go live 24/7',
      text: 'Launch your agent to handle inbound and outbound calls around the clock, with automatic CRM logging, analytics, and live agent handoff when needed.',
      url: `${SITE_URL}/`,
    },
  ],
};

/** Homepage Service schema with offer catalog of core capabilities. */
export const homeServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/#service`,
  serviceType: 'AI Voice Agent Automation',
  name: 'OnDial AI Voice Agents',
  description:
    'AI voice agents that answer instantly, speak like a human, and log every call to your CRM automatically. OnDial handles inbound and outbound calls, appointment scheduling, multilingual conversations, lead qualification, and smart analytics, 24/7.',
  provider: ORG,
  url: absoluteUrl('/services'),
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/`,
    availableLanguage: [
      'English',
      'Hindi',
      'Tamil',
      'Telugu',
      'Bengali',
      'Marathi',
      'Gujarati',
      'Kannada',
      'Malayalam',
      'Punjabi',
      'Spanish',
      'French',
      'German',
      'Portuguese',
      'Japanese',
      'Chinese',
      'Arabic',
      'Korean',
      'Italian',
      'Russian',
    ],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'OnDial AI Voice Agent Capabilities',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Voice Agents',
          description:
            'AI voice agents answer instantly, speak like a human, and log every call to your CRM automatically. No hold music, no missed calls.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Appointment Scheduling',
          description:
            'AI checks availability, schedules appointments, and confirms bookings instantly with no human intervention.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Multilingual AI Communication',
          description:
            'Auto-detects language and responds naturally across 100+ languages with no extra setup.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Lead Qualification',
          description: 'Asks the right questions and routes hot leads to your team instantly.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Smart Analytics',
          description:
            'Sentiment, CSAT, and resolution rate in one AI-powered analytics dashboard.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Context-Aware Live Agent Handoff',
          description:
            'Transfer conversations to human agents instantly with complete conversational context.',
        },
      },
    ],
  },
};

/** All homepage JSON-LD graphs to embed via StructuredData. */
export const HOME_PAGE_SCHEMAS = [
  homeBreadcrumbSchema,
  homeProductSchema,
  homeIndustriesItemListSchema,
  homeHowToSchema,
  homeServiceSchema,
];
