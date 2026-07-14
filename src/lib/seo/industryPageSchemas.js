/**
 * Per-industry page JSON-LD (WebPage + service ItemList).
 * Mirrors the healthcare template across every /industries/[slug] page.
 */

import { absoluteUrl, SITE_LOGO, SITE_URL } from './siteConfig';

/**
 * @param {object} input
 * @param {string} input.slug
 * @param {string} input.breadcrumbName Short label for breadcrumb (e.g. "Healthcare")
 * @param {string} input.title SEO / WebPage name
 * @param {string} input.description SEO / WebPage description
 * @param {string} input.serviceListName ItemList name (e.g. service headline)
 * @param {string} input.serviceListDescription ItemList description
 * @param {Array<{ title: string, description: string }>} input.services
 */
export function buildIndustryPageSchemas({
  slug,
  breadcrumbName,
  title,
  description,
  serviceListName,
  serviceListDescription,
  services = [],
}) {
  const path = `/industries/${slug}`;
  const url = absoluteUrl(path);
  const serviceListId = `${url}#service-list`;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': serviceListId,
    name: serviceListName,
    description: serviceListDescription,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
      },
    })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: SITE_LOGO,
      width: 1200,
      height: 630,
    },
    mainEntity: { '@id': serviceListId },
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
          item: absoluteUrl('/industries'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: breadcrumbName,
          item: url,
        },
      ],
    },
  };

  return [webPageSchema, itemListSchema];
}
