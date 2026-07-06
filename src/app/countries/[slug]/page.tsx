import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  CountryComparisonsSection,
  CountryComplianceSection,
  CountryFaqSection,
  CountryHeroSection,
  CountryIndustrySolutionsSection,
  CountryIntegrationsSection,
  CountryLanguageSupportSection,
  CountryOverviewSection,
  CountryUseCasesSection,
  CountryWhyChooseSection,
} from "@/components/marketing/country-page-sections";
import StructuredData from "@/components/StructuredData";
import { fetchCountryPageBySlug } from "@/lib/db";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo/schemaBuilders";
import { stripHtml } from "@/lib/strip-html";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const countryPage = await fetchCountryPageBySlug(slug);
    if (!countryPage) {
      return { title: "Country", robots: { index: false } };
    }

    const title = countryPage.meta_title || countryPage.hero.title;
    const description = countryPage.meta_description || countryPage.hero.description;
    const canonicalUrl = `https://www.ondial.ai/countries/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "OnDial",
        images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: title }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://www.ondial.ai/img/logo/og.png"],
        creator: "@ondialai",
      },
    };
  } catch {
    return { title: "Country", robots: { index: false } };
  }
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;

  let countryPage;
  try {
    countryPage = await fetchCountryPageBySlug(slug);
  } catch (error) {
    console.error(`[countries] Failed to load country page "${slug}":`, error);
    notFound();
  }

  if (!countryPage) {
    notFound();
  }

  const title = countryPage.meta_title || countryPage.hero.title;
  const description = countryPage.meta_description || countryPage.hero.description;

  const countrySchemas = [
    buildServiceSchema({
      url: `/countries/${slug}`,
      name: title,
      description,
      serviceType: `AI Voice Automation for ${countryPage.country_name}`,
      areaServed: countryPage.country_code ? [countryPage.country_code] : undefined,
    }),
    (buildBreadcrumbSchema as any)(
      [
        { name: "Countries", url: "/countries" },
        { name: countryPage.country_name, url: `/countries/${slug}` },
      ],
      { anchorUrl: `/countries/${slug}` },
    ),
  ];

  const faqSchema = countryPage.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: countryPage.faqs.map((faq) => ({
          "@type": "Question",
          name: stripHtml(faq.question),
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(faq.answer),
          },
        })),
      }
    : null;

  return (
    <BlogPageShell>
      <StructuredData data={faqSchema ? [...countrySchemas, faqSchema] : countrySchemas} />
      <main className="flex flex-1 flex-col">
        <CountryHeroSection
          hero={countryPage.hero}
          countryName={countryPage.country_name}
          countryCode={countryPage.country_code}
        />
        {countryPage.overview ? <CountryOverviewSection overview={countryPage.overview} /> : null}
        {countryPage.why_choose_us ? <CountryWhyChooseSection section={countryPage.why_choose_us} /> : null}
        {countryPage.industry_solutions ? (
          <CountryIndustrySolutionsSection content={countryPage.industry_solutions} />
        ) : null}
        {countryPage.language_support ? (
          <CountryLanguageSupportSection content={countryPage.language_support} />
        ) : null}
        {countryPage.use_cases ? <CountryUseCasesSection section={countryPage.use_cases} /> : null}
        {countryPage.compliance_security ? (
          <CountryComplianceSection section={countryPage.compliance_security} />
        ) : null}
        {countryPage.integrations ? <CountryIntegrationsSection content={countryPage.integrations} /> : null}
        {countryPage.comparisons ? <CountryComparisonsSection content={countryPage.comparisons} /> : null}
        {countryPage.faqs?.length ? (
          <CountryFaqSection faqs={countryPage.faqs} countryName={countryPage.country_name} />
        ) : null}
      </main>
    </BlogPageShell>
  );
}
