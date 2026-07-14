import { SITE_URL, SITE_NAME } from './siteConfig';

/**
 * Site-wide WebSite JSON-LD with SearchAction (Sitelinks Searchbox eligibility).
 * Pages can reference via { "@id": "https://www.ondial.ai/#website" }.
 * Rendered once in the root layout (not duplicated on /blog).
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description:
    'AI voice agents that automate phone calls, reduce costs, and improve customer satisfaction.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
