import {
  EMPTY_BULLET_SECTION,
  EMPTY_HERO,
  type CountryPageFormState,
} from "@/lib/countries/form-state";
import { importTextToHtml } from "@/lib/countries/import-text-to-html";
import type {
  CountryBulletSection,
  CountryComparisonsContent,
  CountryFaqItem,
  CountryHeroContent,
  CountryIndustryItem,
  CountryIndustrySolutionsContent,
  CountryIntegrationGroup,
  CountryIntegrationsContent,
  CountryLanguageSupportContent,
  CountryOverviewContent,
  TitledBullet,
} from "@/lib/countries/types";
import type { CountryPageRow } from "@/lib/db/types";

export type ParseCountryPageImportResult = {
  ok: boolean;
  data: Partial<CountryPageFormState>;
  warnings: string[];
  filledSections: string[];
  errors: string[];
};

const SECTION_HEADER_RE = /^\[([A-Z0-9_]+)\]$/;
const BULLET_LINE_RE = /^-\s+(.+)$/;
const INDENTED_BULLET_RE = /^\s+-\s+(.+)$/;

function parseTitleDescription(line: string): { title: string; description: string } | null {
  const idx = line.indexOf(" :: ");
  if (idx === -1) return null;
  const title = line.slice(0, idx).trim();
  const description = line.slice(idx + 4).trim();
  if (!title || !description) return null;
  return { title, description: importTextToHtml(description) };
}

function parseCta(value: string): { label: string; href: string } | null {
  const idx = value.indexOf("|");
  if (idx === -1) return null;
  const label = value.slice(0, idx).trim();
  const href = value.slice(idx + 1).trim();
  if (!label || !href) return null;
  return { label, href };
}

function parseKeyValue(line: string): { key: string; value: string } | null {
  const idx = line.indexOf(":");
  if (idx === -1) return null;
  const key = line.slice(0, idx).trim().toLowerCase();
  const value = line.slice(idx + 1).trim();
  if (!key) return null;
  return { key, value };
}

function splitSections(text: string): { sections: Map<string, string[]>; warnings: string[] } {
  const sections = new Map<string, string[]>();
  const warnings: string[] = [];
  let current: string | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const headerMatch = line.trim().match(SECTION_HEADER_RE);
    if (headerMatch) {
      const name = headerMatch[1];
      if (sections.has(name)) {
        warnings.push(`Duplicate section [${name}] — last occurrence used.`);
      }
      current = name;
      sections.set(name, []);
      continue;
    }
    if (current) {
      sections.get(current)!.push(line);
    }
  }

  return { sections, warnings };
}

function parseTitledBullets(
  lines: string[],
  sectionName: string,
  warnings: string[],
  prefix: string,
): TitledBullet[] {
  const items: TitledBullet[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv || kv.key !== prefix) continue;
    const parsed = parseTitleDescription(kv.value);
    if (parsed) {
      items.push(parsed);
      continue;
    }
    const bullet = trimmed.match(BULLET_LINE_RE);
    if (bullet) {
      const fromBullet = parseTitleDescription(bullet[1]);
      if (fromBullet) {
        items.push(fromBullet);
        continue;
      }
    }
    warnings.push(`${sectionName}: skipped malformed line "${trimmed.slice(0, 60)}…"`);
  }
  return items;
}

function parseHeroBullets(lines: string[], warnings: string[]): TitledBullet[] {
  const items: TitledBullet[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const bullet = trimmed.match(BULLET_LINE_RE);
    if (!bullet) {
      warnings.push(`HERO_BULLETS: skipped malformed line "${trimmed.slice(0, 60)}…"`);
      continue;
    }
    const parsed = parseTitleDescription(bullet[1]);
    if (parsed) items.push(parsed);
    else warnings.push(`HERO_BULLETS: skipped malformed bullet "${trimmed.slice(0, 60)}…"`);
  }
  return items;
}

function parseIndustrySolutions(
  lines: string[],
  warnings: string[],
): CountryIndustrySolutionsContent {
  const result: CountryIndustrySolutionsContent = { title: "", intro: "", industries: [] };
  const industryMap = new Map<string, CountryIndustryItem>();
  let pendingUseCasesIndustry: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const kv = parseKeyValue(trimmed);
    if (kv) {
      if (kv.key === "title") result.title = kv.value;
      else if (kv.key === "intro") result.intro = importTextToHtml(kv.value);
      else if (kv.key === "industry") {
        pendingUseCasesIndustry = null;
        const parsed = parseTitleDescription(kv.value);
        if (parsed) {
          const item: CountryIndustryItem = {
            name: parsed.title,
            description: parsed.description,
            useCases: [],
          };
          industryMap.set(parsed.title, item);
          result.industries.push(item);
        } else {
          warnings.push(`INDUSTRY_SOLUTIONS: skipped malformed industry "${kv.value.slice(0, 60)}…"`);
        }
      } else if (kv.key === "industry_use_cases") {
        pendingUseCasesIndustry = kv.value;
        if (!industryMap.has(kv.value)) {
          warnings.push(`INDUSTRY_SOLUTIONS: industry_use_cases references unknown industry "${kv.value}"`);
        }
      }
      continue;
    }

    const indented = line.match(INDENTED_BULLET_RE);
    if (indented && pendingUseCasesIndustry) {
      const industry = industryMap.get(pendingUseCasesIndustry);
      if (industry) industry.useCases.push(indented[1].trim());
    }
  }

  return result;
}

function parseIntegrations(lines: string[], warnings: string[]): CountryIntegrationsContent {
  const result: CountryIntegrationsContent = { title: "", intro: "", groups: [], note: "" };
  let currentGroup: CountryIntegrationGroup | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const kv = parseKeyValue(trimmed);
    if (kv) {
      if (kv.key === "title") result.title = kv.value;
      else if (kv.key === "intro") result.intro = importTextToHtml(kv.value);
      else if (kv.key === "note") result.note = importTextToHtml(kv.value);
      else if (kv.key === "group") {
        currentGroup = { label: kv.value, items: [] };
        result.groups.push(currentGroup);
      }
      continue;
    }

    const indented = line.match(INDENTED_BULLET_RE);
    if (indented) {
      if (currentGroup) currentGroup.items.push(indented[1].trim());
      else warnings.push(`INTEGRATIONS: list item without preceding group: "${indented[1].trim()}"`);
    }
  }

  return result;
}

function parseFaqs(lines: string[], warnings: string[]): CountryFaqItem[] {
  const faqs: CountryFaqItem[] = [];
  let pendingQuestion: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv) {
      warnings.push(`FAQS: skipped unrecognized line "${trimmed.slice(0, 60)}…"`);
      continue;
    }
    if (kv.key === "q") {
      pendingQuestion = kv.value;
    } else if (kv.key === "a") {
      if (pendingQuestion) {
        faqs.push({ question: pendingQuestion, answer: importTextToHtml(kv.value) });
        pendingQuestion = null;
      } else {
        warnings.push(`FAQS: answer without question "${kv.value.slice(0, 60)}…"`);
      }
    }
  }

  if (pendingQuestion) {
    warnings.push(`FAQS: question without answer "${pendingQuestion.slice(0, 60)}…"`);
  }

  return faqs;
}

function parseBulletSection(
  lines: string[],
  sectionName: string,
  warnings: string[],
): CountryBulletSection {
  const section: CountryBulletSection = { ...EMPTY_BULLET_SECTION, items: [] };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv) continue;
    if (kv.key === "title") section.title = kv.value;
    else if (kv.key === "intro") section.intro = importTextToHtml(kv.value);
    else if (kv.key === "item") {
      const parsed = parseTitleDescription(kv.value);
      if (parsed) section.items.push(parsed);
      else warnings.push(`${sectionName}: skipped malformed item "${kv.value.slice(0, 60)}…"`);
    }
  }
  return section;
}

function parseLanguageSupport(lines: string[], warnings: string[]): CountryLanguageSupportContent {
  const section: CountryLanguageSupportContent = { title: "", intro: "", languages: [], note: "" };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv) continue;
    if (kv.key === "title") section.title = kv.value;
    else if (kv.key === "intro") section.intro = importTextToHtml(kv.value);
    else if (kv.key === "note") section.note = importTextToHtml(kv.value);
    else if (kv.key === "language") {
      const parsed = parseTitleDescription(kv.value);
      if (parsed) section.languages.push({ name: parsed.title, description: parsed.description });
      else warnings.push(`LANGUAGE_SUPPORT: skipped malformed language "${kv.value.slice(0, 60)}…"`);
    }
  }
  return section;
}

function parseOverview(lines: string[]): CountryOverviewContent {
  const overview: CountryOverviewContent = { title: "", paragraphs: [] };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv) continue;
    if (kv.key === "title") overview.title = kv.value;
    else if (kv.key === "paragraph") overview.paragraphs.push(importTextToHtml(kv.value));
  }
  return overview;
}

function parseHero(lines: string[], bulletLines: string[], warnings: string[]): CountryHeroContent {
  const hero: CountryHeroContent = { ...EMPTY_HERO, bullets: [] };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv) continue;
    if (kv.key === "title") hero.title = kv.value;
    else if (kv.key === "description") hero.description = kv.value;
    else if (kv.key === "primary_cta") {
      const cta = parseCta(kv.value);
      if (cta) hero.primaryCta = cta;
      else warnings.push(`HERO: malformed primary_cta "${kv.value}"`);
    } else if (kv.key === "secondary_cta") {
      const cta = parseCta(kv.value);
      if (cta) hero.secondaryCta = cta;
      else warnings.push(`HERO: malformed secondary_cta "${kv.value}"`);
    }
  }
  hero.bullets = parseHeroBullets(bulletLines, warnings);
  return hero;
}

function parseComparisons(lines: string[], warnings: string[]): CountryComparisonsContent {
  const comparisons: CountryComparisonsContent = { title: "", items: [] };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const kv = parseKeyValue(trimmed);
    if (!kv) continue;
    if (kv.key === "title") comparisons.title = kv.value;
    else if (kv.key === "item") {
      const parsed = parseTitleDescription(kv.value);
      if (parsed) comparisons.items.push(parsed);
      else warnings.push(`COMPARISONS: skipped malformed item "${kv.value.slice(0, 60)}…"`);
    }
  }
  return comparisons;
}

type JsonPayload = {
  slug?: string;
  country_name?: string;
  country_code?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  status?: CountryPageRow["status"];
  hero?: CountryHeroContent;
  overview?: CountryOverviewContent | null;
  why_choose_us?: CountryBulletSection | null;
  industry_solutions?: CountryIndustrySolutionsContent | null;
  language_support?: CountryLanguageSupportContent | null;
  use_cases?: CountryBulletSection | null;
  compliance_security?: CountryBulletSection | null;
  integrations?: CountryIntegrationsContent | null;
  comparisons?: CountryComparisonsContent | null;
  faqs?: CountryFaqItem[] | null;
};

function richTextFieldsFromJson(obj: unknown): unknown {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(richTextFieldsFromJson);
  const record = obj as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (key === "description" && typeof value === "string") {
      out[key] = value.startsWith("<") ? value : importTextToHtml(value);
    } else if (key === "intro" || key === "note" || key === "answer") {
      out[key] = typeof value === "string" ? (value.startsWith("<") ? value : importTextToHtml(value)) : value;
    } else if (key === "paragraphs" && Array.isArray(value)) {
      out[key] = value.map((p) =>
        typeof p === "string" ? (p.startsWith("<") ? p : importTextToHtml(p)) : p,
      );
    } else {
      out[key] = richTextFieldsFromJson(value);
    }
  }
  return out;
}

function tryParseJsonImport(text: string): Partial<CountryPageFormState> | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    const raw = JSON.parse(trimmed) as JsonPayload;
    const data: Partial<CountryPageFormState> = {};

    if (raw.country_name) data.country_name = raw.country_name;
    if (raw.slug) data.slug = raw.slug;
    if (raw.country_code) data.country_code = raw.country_code;
    if (raw.meta_title) data.meta_title = raw.meta_title ?? "";
    if (raw.meta_description) data.meta_description = raw.meta_description ?? "";
    if (raw.status) data.status = raw.status;

    if (raw.hero) {
      const hero = richTextFieldsFromJson(raw.hero) as CountryHeroContent;
      data.hero = {
        ...EMPTY_HERO,
        ...hero,
        description: raw.hero.description,
        bullets: (hero.bullets ?? []).map((b) => ({
          title: b.title,
          description:
            typeof b.description === "string" && !b.description.startsWith("<")
              ? importTextToHtml(b.description)
              : b.description,
        })),
      };
    }

    if (raw.overview) data.overview = richTextFieldsFromJson(raw.overview) as CountryOverviewContent;
    if (raw.why_choose_us) data.whyChooseUs = richTextFieldsFromJson(raw.why_choose_us) as CountryBulletSection;
    if (raw.industry_solutions)
      data.industrySolutions = richTextFieldsFromJson(raw.industry_solutions) as CountryIndustrySolutionsContent;
    if (raw.language_support)
      data.languageSupport = richTextFieldsFromJson(raw.language_support) as CountryLanguageSupportContent;
    if (raw.use_cases) data.useCases = richTextFieldsFromJson(raw.use_cases) as CountryBulletSection;
    if (raw.compliance_security)
      data.complianceSecurity = richTextFieldsFromJson(raw.compliance_security) as CountryBulletSection;
    if (raw.integrations) data.integrations = richTextFieldsFromJson(raw.integrations) as CountryIntegrationsContent;
    if (raw.comparisons) data.comparisons = richTextFieldsFromJson(raw.comparisons) as CountryComparisonsContent;
    if (raw.faqs) {
      data.faqs = raw.faqs.map((faq) => ({
        question: faq.question,
        answer:
          typeof faq.answer === "string" && !faq.answer.startsWith("<")
            ? importTextToHtml(faq.answer)
            : faq.answer,
      }));
    }

    return Object.keys(data).length > 0 ? data : null;
  } catch {
    return null;
  }
}

function collectFilledSections(data: Partial<CountryPageFormState>): string[] {
  const filled: string[] = [];
  if (data.country_name?.trim()) filled.push("Country");
  if (data.meta_title?.trim() || data.meta_description?.trim()) filled.push("SEO");
  if (data.hero?.title?.trim()) filled.push("Hero");
  if (data.hero?.bullets?.length) filled.push("Hero bullets");
  if (data.overview?.title?.trim() || data.overview?.paragraphs?.length) filled.push("Overview");
  if (data.whyChooseUs?.title?.trim() || data.whyChooseUs?.items?.length) filled.push("Why choose us");
  if (data.industrySolutions?.industries?.length) filled.push("Industry solutions");
  if (data.languageSupport?.languages?.length) filled.push("Language support");
  if (data.useCases?.items?.length) filled.push("Use cases");
  if (data.complianceSecurity?.items?.length) filled.push("Compliance & security");
  if (data.integrations?.groups?.length) filled.push("Integrations");
  if (data.comparisons?.items?.length) filled.push("Comparisons");
  if (data.faqs?.length) filled.push("FAQs");
  return filled;
}

function parseTemplateImport(text: string): { data: Partial<CountryPageFormState>; warnings: string[] } {
  const { sections, warnings } = splitSections(text);
  const data: Partial<CountryPageFormState> = {};

  const countryLines = sections.get("COUNTRY");
  if (countryLines) {
    for (const line of countryLines) {
      const kv = parseKeyValue(line.trim());
      if (!kv) continue;
      if (kv.key === "name") data.country_name = kv.value;
      else if (kv.key === "code") data.country_code = kv.value.toUpperCase().slice(0, 2);
      else if (kv.key === "slug") data.slug = kv.value;
      else if (kv.key === "status" && ["draft", "published", "archived"].includes(kv.value)) {
        data.status = kv.value as CountryPageRow["status"];
      }
    }
  }

  const seoLines = sections.get("SEO");
  if (seoLines) {
    for (const line of seoLines) {
      const kv = parseKeyValue(line.trim());
      if (!kv) continue;
      if (kv.key === "meta_title") data.meta_title = kv.value;
      else if (kv.key === "meta_description") data.meta_description = kv.value;
    }
  }

  const heroLines = sections.get("HERO");
  const heroBulletLines = sections.get("HERO_BULLETS") ?? [];
  if (heroLines) {
    data.hero = parseHero(heroLines, heroBulletLines, warnings);
  } else if (heroBulletLines.length > 0) {
    data.hero = { ...EMPTY_HERO, bullets: parseHeroBullets(heroBulletLines, warnings) };
  }

  if (sections.has("OVERVIEW")) data.overview = parseOverview(sections.get("OVERVIEW")!);
  if (sections.has("WHY_CHOOSE_US"))
    data.whyChooseUs = parseBulletSection(sections.get("WHY_CHOOSE_US")!, "WHY_CHOOSE_US", warnings);
  if (sections.has("INDUSTRY_SOLUTIONS"))
    data.industrySolutions = parseIndustrySolutions(sections.get("INDUSTRY_SOLUTIONS")!, warnings);
  if (sections.has("LANGUAGE_SUPPORT"))
    data.languageSupport = parseLanguageSupport(sections.get("LANGUAGE_SUPPORT")!, warnings);
  if (sections.has("USE_CASES"))
    data.useCases = parseBulletSection(sections.get("USE_CASES")!, "USE_CASES", warnings);
  if (sections.has("COMPLIANCE_SECURITY"))
    data.complianceSecurity = parseBulletSection(
      sections.get("COMPLIANCE_SECURITY")!,
      "COMPLIANCE_SECURITY",
      warnings,
    );
  if (sections.has("INTEGRATIONS"))
    data.integrations = parseIntegrations(sections.get("INTEGRATIONS")!, warnings);
  if (sections.has("COMPARISONS"))
    data.comparisons = parseComparisons(sections.get("COMPARISONS")!, warnings);
  if (sections.has("FAQS")) data.faqs = parseFaqs(sections.get("FAQS")!, warnings);

  return { data, warnings };
}

export function parseCountryPageImport(text: string): ParseCountryPageImportResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: false, data: {}, warnings: [], filledSections: [], errors: ["Paste is empty."] };
  }

  const jsonData = tryParseJsonImport(trimmed);
  if (jsonData) {
    const filledSections = collectFilledSections(jsonData);
    return {
      ok: filledSections.length > 0,
      data: jsonData,
      warnings: ["Parsed as JSON payload."],
      filledSections,
      errors: filledSections.length === 0 ? ["JSON parsed but contained no recognizable fields."] : [],
    };
  }

  const { data, warnings } = parseTemplateImport(trimmed);
  const filledSections = collectFilledSections(data);
  const errors: string[] = [];

  if (filledSections.length === 0) {
    errors.push(
      "No sections recognized. Use [SECTION] headers from the template or paste valid JSON.",
    );
  }

  const hasSectionHeaders = /\[[A-Z0-9_]+\]/.test(trimmed);

  if (!hasSectionHeaders && filledSections.length === 0) {
    errors.push("Missing section headers like [COUNTRY], [HERO], [OVERVIEW].");
  }

  return {
    ok: filledSections.length > 0 && errors.length === 0,
    data,
    warnings,
    filledSections,
    errors,
  };
}

export function getImportMissingRequired(data: Partial<CountryPageFormState>): string[] {
  const missing: string[] = [];
  if (!data.country_name?.trim()) missing.push("Country name");
  if (!data.hero?.title?.trim()) missing.push("Hero title");
  if (!data.hero?.description?.trim()) missing.push("Hero description");
  return missing;
}
