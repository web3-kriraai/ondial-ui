import { stripHtml } from "@/lib/strip-html";
import type {
  CountryBulletSection,
  CountryComparisonsContent,
  CountryFaqItem,
  CountryHeroContent,
  CountryIndustrySolutionsContent,
  CountryIntegrationsContent,
  CountryLanguageSupportContent,
  CountryOverviewContent,
} from "@/lib/countries/types";
import type { CountryPageRow } from "@/lib/db/types";

export type CountryPageFormState = {
  country_name: string;
  slug: string;
  country_code: string;
  meta_title: string;
  meta_description: string;
  status: CountryPageRow["status"];
  hero: CountryHeroContent;
  overview: CountryOverviewContent;
  whyChooseUs: CountryBulletSection;
  industrySolutions: CountryIndustrySolutionsContent;
  languageSupport: CountryLanguageSupportContent;
  useCases: CountryBulletSection;
  complianceSecurity: CountryBulletSection;
  integrations: CountryIntegrationsContent;
  comparisons: CountryComparisonsContent;
  faqs: CountryFaqItem[];
};

export const EMPTY_HERO: CountryHeroContent = {
  title: "",
  description: "",
  bullets: [],
  primaryCta: { label: "Book Demo", href: "/contact" },
  secondaryCta: { label: "Talk to Expert", href: "/contact" },
};

export const EMPTY_BULLET_SECTION: CountryBulletSection = { title: "", intro: "", items: [] };

export function buildCountryPageFormState(initialData?: CountryPageRow): CountryPageFormState {
  return {
    country_name: initialData?.country_name ?? "",
    slug: initialData?.slug ?? "",
    country_code: initialData?.country_code ?? "",
    meta_title: initialData?.meta_title ?? "",
    meta_description: initialData?.meta_description ?? "",
    status: initialData?.status ?? "draft",
    hero: initialData?.hero ?? EMPTY_HERO,
    overview: initialData?.overview ?? { title: "", paragraphs: [] },
    whyChooseUs: initialData?.why_choose_us ?? { ...EMPTY_BULLET_SECTION },
    industrySolutions: initialData?.industry_solutions ?? { title: "", intro: "", industries: [] },
    languageSupport: initialData?.language_support ?? { title: "", intro: "", languages: [], note: "" },
    useCases: initialData?.use_cases ?? { ...EMPTY_BULLET_SECTION },
    complianceSecurity: initialData?.compliance_security ?? { ...EMPTY_BULLET_SECTION },
    integrations: initialData?.integrations ?? { title: "", intro: "", groups: [], note: "" },
    comparisons: initialData?.comparisons ?? { title: "", items: [] },
    faqs: initialData?.faqs ?? [],
  };
}

/** Merge parsed import data into existing form state (import wins for provided fields). */
export function mergeCountryPageImport(
  current: CountryPageFormState,
  imported: Partial<CountryPageFormState>,
): CountryPageFormState {
  return {
    country_name: imported.country_name ?? current.country_name,
    slug: imported.slug ?? current.slug,
    country_code: imported.country_code ?? current.country_code,
    meta_title: imported.meta_title ?? current.meta_title,
    meta_description: imported.meta_description ?? current.meta_description,
    status: imported.status ?? current.status,
    hero: imported.hero ? { ...current.hero, ...imported.hero } : current.hero,
    overview: imported.overview ? { ...current.overview, ...imported.overview } : current.overview,
    whyChooseUs: imported.whyChooseUs ? { ...current.whyChooseUs, ...imported.whyChooseUs } : current.whyChooseUs,
    industrySolutions: imported.industrySolutions
      ? { ...current.industrySolutions, ...imported.industrySolutions }
      : current.industrySolutions,
    languageSupport: imported.languageSupport
      ? { ...current.languageSupport, ...imported.languageSupport }
      : current.languageSupport,
    useCases: imported.useCases ? { ...current.useCases, ...imported.useCases } : current.useCases,
    complianceSecurity: imported.complianceSecurity
      ? { ...current.complianceSecurity, ...imported.complianceSecurity }
      : current.complianceSecurity,
    integrations: imported.integrations
      ? { ...current.integrations, ...imported.integrations }
      : current.integrations,
    comparisons: imported.comparisons
      ? { ...current.comparisons, ...imported.comparisons }
      : current.comparisons,
    faqs: imported.faqs ?? current.faqs,
  };
}

export function countryPageFormHasContent(form: CountryPageFormState): boolean {
  return Boolean(
    form.country_name.trim() ||
      stripHtml(form.hero.title) ||
      stripHtml(form.hero.description) ||
      stripHtml(form.overview.title) ||
      form.overview.paragraphs.length > 0 ||
      form.whyChooseUs.items.length > 0 ||
      form.industrySolutions.industries.length > 0 ||
      form.languageSupport.languages.length > 0 ||
      form.useCases.items.length > 0 ||
      form.complianceSecurity.items.length > 0 ||
      form.integrations.groups.length > 0 ||
      form.comparisons.items.length > 0 ||
      form.faqs.length > 0,
  );
}
