/**
 * Blog post detail JSON-LD.
 * Keeps WebPage + ImageObject + FAQPage and restores BlogPosting + BreadcrumbList.
 * All fields derive from the mapped post / DB — no hardcoded article copy.
 */

import { absoluteUrl, SITE_LOGO, SITE_URL } from './siteConfig';

function stripNullish(obj) {
  if (Array.isArray(obj)) return obj.filter((v) => v !== undefined && v !== null);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ''),
    );
  }
  return obj;
}

function toAbsoluteImageUrl(url) {
  if (!url) return SITE_LOGO;
  if (/^https?:\/\//i.test(url)) return url;
  return absoluteUrl(url.startsWith('/') ? url : `/${url}`);
}

/**
 * @param {object} post BlogPostDetail-like shape from mapBlogDetail
 * @returns {object[]} JSON-LD graphs (null FAQ omitted when no items)
 */
export function buildBlogPostPageSchemas(post) {
  if (!post?.slug) return [];

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const primaryImageId = `${url}#primaryimage`;
  const pageName = post.metaTitle || post.title;
  const pageDescription =
    post.metaDescription || post.excerpt || `Read ${post.title} on the OnDial blog.`;
  const breadcrumbName = post.title || pageName;
  const imageUrl = toAbsoluteImageUrl(post.image);
  const imageWidth = post.imageWidth || 1200;
  const imageHeight = post.imageHeight || 630;
  const datePublished = post.datePublished || post.date || undefined;
  const dateModified = post.dateModified || post.datePublished || post.date || undefined;

  const authorPerson = stripNullish({
    '@type': 'Person',
    name: post.author?.name || 'OnDial Team',
    url: post.author?.slug ? absoluteUrl(`/blog/author/${post.author.slug}`) : undefined,
    jobTitle: post.authorDesignation || undefined,
  });

  const breadcrumbListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: absoluteUrl('/blog'),
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: breadcrumbName,
      item: url,
    },
  ];

  const webPageSchema = stripNullish({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: pageName,
    description: pageDescription,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    datePublished,
    dateModified,
    author: authorPerson,
    publisher: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: { '@id': primaryImageId },
    image: { '@id': primaryImageId },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbListElement,
    },
  });

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': primaryImageId,
    url: imageUrl,
    contentUrl: imageUrl,
    width: imageWidth,
    height: imageHeight,
    caption: pageName,
  };

  // Restored: standalone BlogPosting (previous detail-page schema).
  const blogPostingSchema = stripNullish({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
    headline: String(post.title || pageName).slice(0, 110),
    description: pageDescription,
    image: [imageUrl],
    datePublished,
    dateModified,
    inLanguage: 'en-US',
    author: authorPerson,
    publisher: { '@id': `${SITE_URL}/#organization` },
    articleSection: post.category || undefined,
  });

  // Restored: standalone BreadcrumbList (previous detail-page schema).
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbListElement,
  };

  const faqItems = post.faqs?.items?.filter((item) => item?.question && item?.answer) ?? [];

  const faqPageSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return [
    webPageSchema,
    imageObjectSchema,
    blogPostingSchema,
    breadcrumbSchema,
    faqPageSchema,
  ].filter(Boolean);
}
