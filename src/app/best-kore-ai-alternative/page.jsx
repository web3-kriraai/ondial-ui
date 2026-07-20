import KoreAIAlternativeContent from '@/components/alternatives/KoreAIAlternativeContent';
import StructuredData from '@/components/StructuredData';
import { buildWebPageSchema, buildBreadcrumbSchema } from '@/lib/seo/schemaBuilders';
import { SITE_URL } from '@/lib/seo/siteConfig';
import { koreAIAlternativeMeta as meta } from '@/data/best-kore-ai-alternative-meta';

export const metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: `https://www.ondial.ai${meta.canonical}` },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `https://www.ondial.ai${meta.canonical}`,
    siteName: 'OnDial',
    images: [{ url: 'https://www.ondial.ai/img/logo/og.png', width: 1200, height: 630, alt: 'OnDial vs Kore AI' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['https://www.ondial.ai/img/logo/og.png'],
    creator: '@ondialai',
  },
};

const pageSchemas = [
  buildWebPageSchema({
    url: meta.canonical,
    type: 'WebPage',
    name: meta.title,
    description: meta.description,
    image: `${SITE_URL}/img/logo/og.png`,
  }),
  buildBreadcrumbSchema(
    [
      { name: 'Comparisons', url: '/services' },
      { name: 'Best Kore AI Alternative', url: meta.canonical },
    ],
    { anchorUrl: meta.canonical }
  ),
];

export default function BestKoreAIAlternativePage() {
  return (
    <>
      <StructuredData data={pageSchemas} />
      <KoreAIAlternativeContent />
    </>
  );
}
