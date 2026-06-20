import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_SAME_AS,
  absoluteUrl,
} from '@/lib/seo/siteConfig';

const PRIMARY_PAGES = [
  { path: '/', label: 'Home', description: 'AI Voice Agents for inbound and outbound phone call automation' },
  { path: '/services', label: 'Services', description: 'AI voice call automation for support, sales, and reminders' },
  { path: '/pricing', label: 'Pricing', description: 'Plans and rates for AI voice agent usage' },
  { path: '/about', label: 'About', description: 'Mission, team, and company overview' },
  { path: '/ondial-for-enterprise', label: 'Enterprise', description: 'Large-scale calling, compliance, and CRM integrations' },
  { path: '/blog', label: 'Blog', description: 'Articles on AI voice agents and business automation' },
  { path: '/contact', label: 'Contact', description: 'Sales and support inquiries' },
];

const INDUSTRY_PAGES = [
  { path: '/industries/ai-voice-agents-healthcare-medical', label: 'Healthcare' },
  { path: '/industries/ai-voice-agents-retail-e-commerce', label: 'Retail & E-commerce' },
  { path: '/industries/ai-voice-agents-finance-banking', label: 'Finance & Banking' },
  { path: '/industries/ai-voice-agents-real-estate', label: 'Real Estate' },
  { path: '/industries/ai-voice-agents-insurance', label: 'Insurance' },
  { path: '/industries/ai-voice-agents-sales-lead-generation', label: 'Sales & Lead Generation' },
  { path: '/industries/ai-voice-agents-call-centers-bpo', label: 'Call Center & BPO' },
];

const LEGAL_PAGES = [
  { path: '/privacy', label: 'Privacy Policy' },
  { path: '/terms-and-conditions', label: 'Terms and Conditions' },
  { path: '/return-policy', label: 'Return Policy' },
];

function formatLink({ path, label, description }) {
  const url = absoluteUrl(path);
  return description
    ? `- [${label}](${url}): ${description}`
    : `- [${label}](${url})`;
}

/** Plain-text llms.txt body for AI crawlers and assistants. */
export function buildLlmsTxt() {
  const socialLinks = ORGANIZATION_SAME_AS.map((url) => `- ${url}`).join('\n');

  return `# ${SITE_LEGAL_NAME}

> ${ORGANIZATION_DESCRIPTION}

${SITE_NAME} (${SITE_URL}) builds AI voice agents for inbound and outbound business calls. The platform supports 100+ languages, sub-300ms response latency, voice cloning, CRM integrations (HubSpot, Zoho, Odoo, Google Sheets, Shopify), and compliance for Indian businesses (TRAI DLT, DPDP).

## Primary pages

${PRIMARY_PAGES.map(formatLink).join('\n')}

## Industries

${INDUSTRY_PAGES.map(formatLink).join('\n')}

More industry pages are listed in the sitemap.

## Legal

${LEGAL_PAGES.map(formatLink).join('\n')}

## Contact

- Email: info@ondial.ai
- Phone (India): +91-9979620507
- Phone (Sales): +91-8160835445
- [Contact form](${absoluteUrl('/contact')})

## Social

${socialLinks}

## Optional

- Full sitemap: ${absoluteUrl('/sitemap.xml')}
- Robots: ${absoluteUrl('/robots.txt')}
`;
}
