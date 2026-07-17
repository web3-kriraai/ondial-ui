import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import StructuredData from "@/components/StructuredData";
import { CountryFlag } from "@/components/ui/country-picker";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass, marketingSectionContainerClass } from "@/config/marketing-layout";
import { fetchAllCountryPageSummaries, type CountryPageSummary } from "@/lib/db";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schemaBuilders";
import { indexablePageRobots } from "@/lib/seo/siteConfig";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "AI Voice Agent Solutions by Country | OnDial" },
  description:
    "Explore OnDial's enterprise AI voice agent solutions tailored to the regulatory, language, and industry needs of each country we serve.",
  alternates: { canonical: "https://www.ondial.ai/countries" },
  robots: indexablePageRobots(),
  openGraph: {
    title: "AI Voice Agent Solutions by Country | OnDial",
    description:
      "Explore OnDial's enterprise AI voice agent solutions tailored to the regulatory, language, and industry needs of each country we serve.",
    url: "https://www.ondial.ai/countries",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Countries" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agent Solutions by Country | OnDial",
    description:
      "Explore OnDial's enterprise AI voice agent solutions tailored to the regulatory, language, and industry needs of each country we serve.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

async function getCountryPages(): Promise<CountryPageSummary[]> {
  try {
    return await fetchAllCountryPageSummaries();
  } catch (error) {
    console.error("[countries] Failed to load country pages:", error);
    return [];
  }
}

export default async function CountriesIndexPage() {
  const countryPages = await getCountryPages();

  const pageSchemas = [
    (buildWebPageSchema as any)({
      url: "/countries",
      name: "AI Voice Agent Solutions by Country",
      description:
        "Explore OnDial's enterprise AI voice agent solutions tailored to the regulatory, language, and industry needs of each country we serve.",
    }),
    (buildBreadcrumbSchema as any)([{ name: "Countries", url: "/countries" }], { anchorUrl: "/countries" }),
  ];

  return (
    <BlogPageShell>
      <StructuredData data={pageSchemas} />
      <main className="flex flex-1 flex-col">
        <section className="w-full bg-transparent pb-12 pt-6 sm:pb-16 sm:pt-8 lg:pb-20">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6 lg:max-w-4xl">
            <p className={marketingEyebrowClass}>Global coverage</p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              <TextReveal as="span" className="block" delay={0.05} stagger={0.04} inViewAmount={0.4}>
                AI Voice Agent Solutions by Country
              </TextReveal>
            </h1>
            <TextReveal
              as="p"
              className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              delay={0.16}
              stagger={0.026}
              inViewAmount={0.3}
            >
              Every market has its own regulations, languages, and industries. See how OnDial adapts its enterprise
              AI voice agents for each country we serve.
            </TextReveal>
          </div>
        </section>

        <div className={marketingSectionContainerClass}>
          {countryPages.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-black/[0.06] bg-black/[0.015] py-16 text-center">
              <Globe2 className="size-10 text-muted-foreground/40" strokeWidth={1.5} />
              <p className="text-sm font-medium text-muted-foreground">Country pages are coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
              {countryPages.map((countryPage) => (
                <Link
                  key={countryPage.slug}
                  href={`/countries/${countryPage.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#534AB7]/30 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    {countryPage.countryCode ? (
                      <CountryFlag iso2={countryPage.countryCode} className="h-4 w-6" alt={`${countryPage.countryName} flag`} />
                    ) : (
                      <Globe2 className="size-4 text-muted-foreground" />
                    )}
                    <h2 className="text-base font-semibold text-foreground transition-colors group-hover:text-[#534AB7]">
                      {countryPage.countryName}
                    </h2>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{countryPage.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-[#534AB7]">
                    Explore solutions
                    <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </BlogPageShell>
  );
}
