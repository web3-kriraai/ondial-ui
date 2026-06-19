/**
 * JSON-LD schema builders for page-scoped schemas.
 *
 * Convention:
 * - All builders return plain JSON-serialisable objects (no Dates, no undefined-in-arrays).
 * - URLs are absolute and use SITE_URL from siteConfig (single canonical host).
 * - Pages embed via <StructuredData data={schema} /> or pass an array.
 * - Page-scoped schemas reference the site Organization via @id ({@link organizationSchema}).
 */

import { absoluteUrl, SITE_URL, SITE_NAME, SITE_LOGO } from './siteConfig';

const ORG_REF = { '@id': `${SITE_URL}/#organization` };

function stripNullish(obj) {
  if (Array.isArray(obj)) return obj.filter((v) => v !== undefined && v !== null);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '')
    );
  }
  return obj;
}

/** WebPage / generic content page. Use for privacy, terms, return-policy, etc. */
export function buildWebPageSchema({
  url,
  name,
  description,
  type = 'WebPage',
  datePublished,
  dateModified,
  image,
  breadcrumb,
} = {}) {
  return stripNullish({
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(url)}#webpage`,
    url: absoluteUrl(url),
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: ORG_REF,
    datePublished,
    dateModified: dateModified || datePublished,
    primaryImageOfPage: image
      ? { '@type': 'ImageObject', url: image }
      : undefined,
    breadcrumb: breadcrumb ? { '@id': `${absoluteUrl(url)}#breadcrumb` } : undefined,
  });
}

/** BreadcrumbList. Pass [{name, url}], home is auto-prepended unless includeHome=false. */
export function buildBreadcrumbSchema(items = [], { includeHome = true, anchorUrl } = {}) {
  const all = includeHome
    ? [{ name: 'Home', url: SITE_URL }, ...items]
    : items;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': anchorUrl ? `${absoluteUrl(anchorUrl)}#breadcrumb` : undefined,
    itemListElement: all.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/** AboutPage with nested Organization main entity. */
export function buildAboutPageSchema({ url = '/about', name, description } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl(url)}#webpage`,
    url: absoluteUrl(url),
    name: name || `About ${SITE_NAME}`,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: ORG_REF,
  };
}

/** ContactPage with contactPoints via Organization. */
export function buildContactPageSchema({ url = '/contact', name, description } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absoluteUrl(url)}#webpage`,
    url: absoluteUrl(url),
    name: name || `Contact ${SITE_NAME}`,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: ORG_REF,
  };
}

/** BlogPosting / Article schema for a single blog post. */
export function buildBlogPostingSchema(post) {
  if (!post) return null;

  const url = absoluteUrl(`/blog/${post.slug}`);
  const headline = String(post.title || '').slice(0, 110);
  const description =
    post.metaDescription || post.excerpt || `Read ${post.title} on the ${SITE_NAME} blog.`;
  const image = post.image || post.featuredImage?.url || SITE_LOGO;

  return stripNullish({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline,
    description,
    image: [image],
    datePublished: post.date || post.publishDate || undefined,
    dateModified: post.updatedAt || post.date || post.publishDate || undefined,
    inLanguage: 'en-US',
    author: post.author || post.authorSlug
      ? {
          '@type': 'Person',
          name: post.author || 'OnDial Team',
          url: post.authorSlug
            ? absoluteUrl(`/blog/author/${post.authorSlug}`)
            : undefined,
        }
      : { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
    publisher: ORG_REF,
    articleSection: post.category || undefined,
    keywords: Array.isArray(post.tags) ? post.tags.join(', ') : undefined,
  });
}

/** Blog collection (list page) + ItemList of latest posts. */
export function buildBlogListSchema({ url = '/blog', posts = [], description } = {}) {
  const blogUrl = absoluteUrl(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    url: blogUrl,
    name: `${SITE_NAME} Blog`,
    description: description || `Latest articles from ${SITE_NAME} on AI voice automation.`,
    inLanguage: 'en-US',
    publisher: ORG_REF,
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date || p.publishDate || undefined,
      image: p.image ? [p.image] : undefined,
      author: {
        '@type': 'Person',
        name: p.author || 'OnDial Team',
      },
    })),
  };
}

/** ProfilePage + Person for /blog/author/[slug]. */
export function buildProfilePageSchema({ author, url, blogCount = 0 } = {}) {
  if (!author) return null;
  const profileUrl = absoluteUrl(url || `/blog/author/${author.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${profileUrl}#profile`,
    url: profileUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: stripNullish({
      '@type': 'Person',
      '@id': `${profileUrl}#person`,
      name: author.authorName,
      jobTitle: author.authorDesignation,
      description: author.authorDescription,
      image: author.authorImage?.url || author.authorImage,
      url: profileUrl,
      worksFor: ORG_REF,
    }),
    interactionStatistic: blogCount
      ? {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/WriteAction',
          userInteractionCount: blogCount,
        }
      : undefined,
  };
}

/** Service schema for /industries/[slug] and similar service-oriented pages. */
export function buildServiceSchema({
  url,
  name,
  description,
  serviceType,
  areaServed,
  image,
} = {}) {
  return stripNullish({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(url)}#service`,
    url: absoluteUrl(url),
    name,
    description,
    serviceType: serviceType || name,
    provider: ORG_REF,
    areaServed: areaServed || ['IN', 'US'],
    image: image ? [image] : [SITE_LOGO],
    audience: {
      '@type': 'Audience',
      audienceType: 'Business',
    },
  });
}

/**
 * LocalBusiness schema for state / region landing pages (/voice-ai-agent-state/[slug]).
 * Falls back to Service when state name is unknown.
 */
export function buildLocalBusinessSchema({
  url,
  name,
  description,
  region,
  image,
} = {}) {
  return stripNullish({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${absoluteUrl(url)}#business`,
    url: absoluteUrl(url),
    name: name || SITE_NAME,
    description,
    image: image || SITE_LOGO,
    parentOrganization: ORG_REF,
    areaServed: region
      ? {
          '@type': 'AdministrativeArea',
          name: region,
          containedInPlace: { '@type': 'Country', name: 'India' },
        }
      : { '@type': 'Country', name: 'India' },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: region || undefined,
    },
  });
}

/** Product + OfferCatalog for /pricing. */
export function buildPricingSchema({ plans = [], url = '/pricing' } = {}) {
  const offers = plans
    .filter((p) => p?.name)
    .map((p) => {
      const perMin = p.features?.find((f) => f.type === 'perMinute');
      const priceStr = perMin?.price || p.price || '';
      const price = String(priceStr).replace(/[^\d.]/g, '');
      return stripNullish({
        '@type': 'Offer',
        name: p.name,
        description: p.description,
        url: absoluteUrl(url),
        price: price || undefined,
        priceCurrency: 'USD',
        priceSpecification: price
          ? {
              '@type': 'UnitPriceSpecification',
              price,
              priceCurrency: 'USD',
              unitText: 'minute',
            }
          : undefined,
        availability: 'https://schema.org/InStock',
      });
    });

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(url)}#product`,
    name: `${SITE_NAME} AI Voice Agent — Pricing Plans`,
    description:
      'Flexible per-minute pricing for AI voice call automation. Starter, Professional, and Enterprise tiers.',
    brand: ORG_REF,
    image: [SITE_LOGO],
    offers: {
      '@type': 'AggregateOffer',
      offerCount: offers.length || 3,
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '999',
      offers,
    },
  };
}

/** SoftwareApplication schema for /ondial-for-enterprise. */
export function buildEnterpriseSoftwareApplicationSchema({
  url = '/ondial-for-enterprise',
  name = 'OnDial for Enterprise',
  description,
  featureList = [],
} = {}) {
  return stripNullish({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(url)}#software`,
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      description ||
      'Enterprise-grade AI voice agent platform that handles thousands of concurrent outbound and inbound calls with ultra-low latency. Built for Indian businesses with TRAI DLT-aligned communication, DPDP-ready data handling, CRM integration, conversation analytics, and voice cloning.',
    url: absoluteUrl(url),
    featureList: featureList.length
      ? featureList
      : [
          'Massive concurrent call handling',
          'Stable ultra-low latency conversations',
          'Super-human voice quality',
          'Deep conversation analytics',
          'Intelligent sales automation',
          'Voice cloning',
          'Inbound support agent',
          'CRM integration',
          'TRAI DLT aligned communication',
          'DPDP ready data handling',
          'Ready-to-deploy industry templates',
        ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      description:
        'Flexible enterprise plans with transparent pricing. Custom enterprise pricing available on request.',
    },
    provider: ORG_REF,
  });
}
