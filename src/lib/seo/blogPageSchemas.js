/**
 * Blog index page JSON-LD (CollectionPage/WebPage + article ItemList).
 * @see https://www.ondial.ai/blog
 */

import { absoluteUrl, SITE_LOGO, SITE_NAME, SITE_URL } from './siteConfig';

const BLOG_PATH = '/blog';
const BLOG_URL = absoluteUrl(BLOG_PATH);
const ARTICLE_LIST_ID = `${BLOG_URL}#article-list`;

export const BLOG_PAGE_TITLE =
  'Best AI Voice Agent Automation Blogs & Insights | OnDial';
export const BLOG_PAGE_DESCRIPTION =
  "Stay updated with OnDial's blog on AI voice agents, automation, and customer experience. Learn strategies, trends, and tips to grow your business smarter.";

/**
 * @param {Array<{ title: string, slug: string }>} posts
 * Latest posts first (ItemListOrderDescending).
 */
export function buildBlogPageSchemas(posts = []) {
  const items = posts
    .filter((p) => p?.title && p?.slug)
    .map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
    }));

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': ['CollectionPage', 'WebPage'],
    '@id': `${BLOG_URL}#webpage`,
    url: BLOG_URL,
    name: BLOG_PAGE_TITLE,
    description: BLOG_PAGE_DESCRIPTION,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: SITE_LOGO,
      width: 1200,
      height: 630,
    },
    mainEntity: { '@id': ARTICLE_LIST_ID },
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
          name: 'Blog',
          item: BLOG_URL,
        },
      ],
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': ARTICLE_LIST_ID,
    name: `${SITE_NAME} Blog Articles`,
    description:
      'Latest articles from OnDial on AI voice agents, call automation, and customer experience.',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: items.length,
    itemListElement: items,
  };

  return [collectionPageSchema, itemListSchema];
}
