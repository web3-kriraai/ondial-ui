import BolnaAlternativeContent from '@/components/alternatives/BolnaAlternativeContent';
import StructuredData from '@/components/StructuredData';
import { buildWebPageSchema, buildBreadcrumbSchema } from '@/lib/seo/schemaBuilders';
import { SITE_URL } from '@/lib/seo/siteConfig';
import { bolnaAlternativeMeta as meta } from '@/data/best-bolna-alternative-meta';

export const metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: `https://www.ondial.ai${meta.canonical}` },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `https://www.ondial.ai${meta.canonical}`,
    siteName: 'OnDial',
    images: [{ url: 'https://www.ondial.ai/img/logo/og.png', width: 1200, height: 630, alt: 'OnDial vs Bolna' }],
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
      { name: 'Best Bolna Alternative', url: meta.canonical },
    ],
    { anchorUrl: meta.canonical }
  ),
];

export default function BestBolnaAlternativePage() {
  return (
    <>
      <StructuredData data={pageSchemas} />
      <BolnaAlternativeContent />
    </>
  );
}
