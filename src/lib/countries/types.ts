/**
 * Content shapes for the country_pages JSONB columns.
 * These are the TypeScript mirror of docs/country-pages-schema.sql —
 * keep both in sync when a section shape changes.
 */

export type TitledBullet = {
  title: string;
  description: string;
};

export type CountryCta = {
  label: string;
  href: string;
};

export type CountryHeroContent = {
  title: string;
  description: string;
  bullets: TitledBullet[];
  primaryCta: CountryCta;
  secondaryCta?: CountryCta;
};

export type CountryOverviewContent = {
  title: string;
  paragraphs: string[];
};

export type CountryBulletSection = {
  title: string;
  intro?: string;
  items: TitledBullet[];
};

export type CountryIndustryItem = {
  name: string;
  description: string;
  useCases: string[];
};

export type CountryIndustrySolutionsContent = {
  title: string;
  intro?: string;
  industries: CountryIndustryItem[];
};

export type CountryLanguageItem = {
  name: string;
  description: string;
};

export type CountryLanguageSupportContent = {
  title: string;
  intro?: string;
  languages: CountryLanguageItem[];
  note?: string;
};

export type CountryIntegrationGroup = {
  label: string;
  items: string[];
};

export type CountryIntegrationsContent = {
  title: string;
  intro?: string;
  groups: CountryIntegrationGroup[];
  note?: string;
};

export type CountryComparisonsContent = {
  title: string;
  items: TitledBullet[];
};

export type CountryFaqItem = {
  question: string;
  answer: string;
};

/** Full, typed content for a single country page (all sections optional except hero). */
export type CountryPageContent = {
  hero: CountryHeroContent;
  overview: CountryOverviewContent | null;
  whyChooseUs: CountryBulletSection | null;
  industrySolutions: CountryIndustrySolutionsContent | null;
  languageSupport: CountryLanguageSupportContent | null;
  useCases: CountryBulletSection | null;
  complianceSecurity: CountryBulletSection | null;
  integrations: CountryIntegrationsContent | null;
  comparisons: CountryComparisonsContent | null;
  faqs: CountryFaqItem[] | null;
};
