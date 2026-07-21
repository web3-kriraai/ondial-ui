/**
 * Industries hub page JSON-LD (WebPage + ItemList).
 * @see https://www.ondial.ai/industries
 */

import { absoluteUrl, SITE_LOGO, SITE_URL } from './siteConfig';

const INDUSTRIES_PATH = '/industries';
const INDUSTRIES_URL = absoluteUrl(INDUSTRIES_PATH);

const INDUSTRIES_HUB_PAGE_TITLE =
  'AI Voice Agent Solutions Built for Every Industry | OnDial';
const INDUSTRIES_HUB_PAGE_DESCRIPTION =
  'OnDial is the enterprise AI voice agent platform for every industry. Automate inbound and outbound calls, CRM integration, scheduling, and support 100+ languages.';

/** Industry destinations for the hub ItemList (SEO copy + crawlable URLs). */
const INDUSTRIES_ITEM_LIST = [
  {
    name: 'AI Voice Agents for Healthcare',
    href: '/industries/ai-voice-agents-healthcare-medical',
  },
  {
    name: 'AI Voice Agents for Real Estate',
    href: '/industries/ai-voice-agents-real-estate',
  },
  {
    name: 'AI Voice Agents for Financial Services',
    href: '/industries/ai-voice-agents-finance-banking',
  },
  {
    name: 'AI Voice Agents for Insurance',
    href: '/industries/ai-voice-agents-insurance',
  },
  {
    name: 'AI Voice Agents for Automotive',
    href: '/industries/ai-voice-agents-automotive',
  },
  {
    name: 'AI Voice Agents for Retail',
    href: '/industries/ai-voice-agents-retail-e-commerce',
  },
  {
    name: 'AI Voice Agents for E-commerce',
    href: '/industries/ai-voice-agents-retail-e-commerce',
  },
  {
    name: 'AI Voice Agents for Logistics',
    href: '/industries/ai-voice-agents-transportation-logistics',
  },
  {
    name: 'AI Voice Agents for Transportation',
    href: '/industries/ai-voice-agents-transportation-logistics',
  },
  {
    name: 'AI Voice Agents for Hospitality',
    href: '/industries/ai-voice-agents-hospitality',
  },
  {
    name: 'AI Voice Agents for Restaurants',
    href: '/industries/ai-voice-agents-hospitality',
  },
  {
    name: 'AI Voice Agents for Education',
    href: '/industries/ai-voice-agents-education',
  },
  {
    name: 'AI Voice Agents for SaaS',
    href: '/industries/ai-voice-agents-sales-lead-generation',
  },
  {
    name: 'AI Voice Agents for Telecommunications',
    href: '/industries/ai-voice-agents-telecommunications',
  },
  {
    name: 'AI Voice Agents for Manufacturing',
    href: '/industries/ai-voice-agents-manufacturing',
  },
  {
    name: 'AI Voice Agents for Government',
    href: '/industries/ai-voice-agents-government',
  },
  {
    name: 'AI Voice Agents for Legal',
    href: '/industries/ai-voice-agents-legal',
  },
  {
    name: 'AI Voice Agents for Travel',
    href: '/industries/ai-voice-agents-travel-tourism',
  },
  {
    name: 'AI Voice Agents for Recruitment',
    href: '/industries/ai-voice-agents-sales-lead-generation',
  },
];

export const industriesHubItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${INDUSTRIES_URL}#industry-list`,
  name: 'AI Voice Agent Solutions by Industry',
  description:
    'Industry-specific AI voice agent solutions from OnDial, each tuned to the workflows, compliance needs, and call types of that sector.',
  itemListOrder: 'https://schema.org/ItemListUnordered',
  numberOfItems: INDUSTRIES_ITEM_LIST.length,
  itemListElement: INDUSTRIES_ITEM_LIST.map((industry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: industry.name,
    url: absoluteUrl(industry.href),
  })),
};

export const industriesHubWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${INDUSTRIES_URL}#webpage`,
  url: INDUSTRIES_URL,
  name: INDUSTRIES_HUB_PAGE_TITLE,
  description: INDUSTRIES_HUB_PAGE_DESCRIPTION,
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: SITE_LOGO,
    width: 1200,
    height: 630,
  },
  mainEntity: { '@id': `${INDUSTRIES_URL}#industry-list` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Industries',
        item: INDUSTRIES_URL,
      },
    ],
  },
};

/** Page-scoped schemas for /industries (FAQ is composed in the page). */
export const INDUSTRIES_HUB_PAGE_SCHEMAS = [
  industriesHubWebPageSchema,
  industriesHubItemListSchema,
];
