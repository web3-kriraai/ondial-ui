"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  HelpCircle,
  Languages,
  ListChecks,
  Loader2,
  Save,
  Scale,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Trash2,
} from "lucide-react";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CountryFaqEditor } from "@/components/admin/country-faq-editor";
import { CountryIndustrySolutionsEditor } from "@/components/admin/country-industry-solutions-editor";
import { CountryIntegrationsEditor } from "@/components/admin/country-integrations-editor";
import { CountryPageImportPanel } from "@/components/admin/country-page-import-panel";
import { CountryPageFormSidebar } from "@/components/admin/country-page-form-sidebar";
import { InlineRichTextEditor } from "@/components/admin/inline-rich-text-editor";
import { TitledBulletListEditor } from "@/components/admin/titled-bullet-list-editor";
import { SEO_COUNTRIES_PATH } from "@/config/seo-admin";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";
import { stripHtml } from "@/lib/strip-html";
import {
  COUNTRY_SLUG_TAKEN_CODE,
  COUNTRY_SLUG_TAKEN_MESSAGE,
  normalizeCountrySlug,
  sanitizeCountrySlugInput,
} from "@/lib/countries/slug";
import {
  buildCountryPageFormState,
  countryPageFormHasContent,
  mergeCountryPageImport,
  type CountryPageFormState,
} from "@/lib/countries/form-state";
import type { CountryLanguageItem, TitledBullet } from "@/lib/countries/types";
import type { CountryPageRow } from "@/lib/db/types";

type CountryPageFormProps = {
  mode: "new" | "edit";
  countryPageId?: string;
  initialData?: CountryPageRow;
};

function languagesToBullets(languages: CountryLanguageItem[]): TitledBullet[] {
  return languages.map((language) => ({ title: language.name, description: language.description }));
}

function bulletsToLanguages(bullets: TitledBullet[]): CountryLanguageItem[] {
  return bullets.map((bullet) => ({ name: bullet.title, description: bullet.description }));
}

function nullIfEmptySection<T extends { title: string }>(
  section: T,
  hasItems: boolean,
): T | null {
  if (!section.title.trim() && !hasItems) return null;
  return section;
}

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10";

const ERROR_FIELD =
  "w-full rounded-lg border border-red-300 bg-red-50/50 px-3 py-2 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/15";

const LABEL = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5";
const MICRO_LABEL = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400";

function fieldClass(hasError: boolean) {
  return hasError ? ERROR_FIELD : FIELD;
}

function InlineError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1 text-xs text-red-600">
      <AlertCircle className="mt-0.5 size-3 shrink-0" />
      {message}
    </p>
  );
}

function SectionCard({
  icon: Icon,
  title,
  description,
  optional,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#534AB7]/10 text-[#534AB7]">
          <Icon className="size-4" strokeWidth={2} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            {optional ? (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                Optional
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-xs text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function CountryPageForm({ mode, countryPageId, initialData }: CountryPageFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [slugManual, setSlugManual] = useState(Boolean(initialData?.slug));
  const [showValidation, setShowValidation] = useState(false);
  const [slugAvailabilityError, setSlugAvailabilityError] = useState<string | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);
  const slugCheckVersion = useRef(0);
  const countryNameRef = useRef<HTMLDivElement>(null);
  const slugRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<CountryPageFormState>(() => buildCountryPageFormState(initialData));

  function setField<K extends keyof CountryPageFormState>(key: K, value: CountryPageFormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "country_name" && !slugManual) {
        next.slug = normalizeCountrySlug(value as string);
      }
      return next;
    });
    if (key === "slug") setSlugAvailabilityError(null);
  }

  function handleSlugInputChange(value: string) {
    setSlugManual(true);
    setField("slug", sanitizeCountrySlugInput(value));
  }

  function handleSlugBlur() {
    const normalized = normalizeCountrySlug(form.slug);
    if (normalized !== form.slug) {
      setField("slug", normalized);
    }
  }

  function handleImportApply(
    imported: Partial<CountryPageFormState>,
    options: { slugImported: boolean },
  ) {
    setForm((prev) => mergeCountryPageImport(prev, imported));
    if (options.slugImported) setSlugManual(true);
    setShowValidation(false);
    showToast("success", "Import applied — review fields and save when ready.");
  }

  useEffect(() => {
    const normalized = normalizeCountrySlug(form.slug);

    if (!normalized) {
      setSlugAvailabilityError(null);
      setSlugChecking(false);
      return;
    }

    const version = ++slugCheckVersion.current;
    setSlugChecking(true);

    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ checkSlug: normalized });
        if (mode === "edit" && countryPageId) params.set("excludeId", countryPageId);

        const res = await fetch(`/api/admin/country-pages?${params.toString()}`, SEO_FETCH_INIT);
        if (!res.ok) return;

        const data = (await res.json()) as {
          available?: boolean;
          conflictCountryName?: string | null;
          error?: string | null;
        };

        if (version !== slugCheckVersion.current) return;

        if (data.available) {
          setSlugAvailabilityError(null);
        } else if (data.conflictCountryName) {
          setSlugAvailabilityError(`This slug is already used by "${data.conflictCountryName}".`);
        } else {
          setSlugAvailabilityError(data.error ?? COUNTRY_SLUG_TAKEN_MESSAGE);
        }
      } finally {
        if (version === slugCheckVersion.current) setSlugChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [form.slug, mode, countryPageId]);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  const normalizedSlug = normalizeCountrySlug(form.slug);
  const countryNameError = showValidation && !form.country_name.trim() ? "Country name is required." : null;
  const slugFormatError = showValidation
    ? !normalizedSlug
      ? form.slug.trim()
        ? "URL slug is invalid."
        : "URL slug is required."
      : null
    : null;
  const slugError = slugFormatError ?? (showValidation ? slugAvailabilityError : null);
  const heroTitleError = showValidation && !stripHtml(form.hero.title) ? "Hero title is required." : null;
  const heroDescriptionError =
    showValidation && !stripHtml(form.hero.description) ? "Hero description is required." : null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setShowValidation(true);

    const hasCountryNameError = !form.country_name.trim();
    const hasSlugFormatError = !normalizedSlug;
    const hasHeroError = !stripHtml(form.hero.title) || !stripHtml(form.hero.description);
    const hasSlugAvailabilityError = Boolean(slugAvailabilityError);

    if (hasCountryNameError || hasSlugFormatError || hasHeroError || hasSlugAvailabilityError) {
      requestAnimationFrame(() => {
        const target = hasCountryNameError
          ? countryNameRef.current
          : hasSlugFormatError || hasSlugAvailabilityError
            ? slugRef.current
            : heroRef.current;
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      showToast("error", "Please fix the highlighted fields before saving.");
      return;
    }

    if (slugChecking) {
      showToast("error", "Please wait while the slug is being checked.");
      return;
    }

    setSaving(true);

    const payload = {
      slug: normalizedSlug,
      country_name: form.country_name,
      country_code: form.country_code || null,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      status: form.status,
      hero: form.hero,
      overview: nullIfEmptySection(form.overview, form.overview.paragraphs.length > 0),
      why_choose_us: nullIfEmptySection(form.whyChooseUs, form.whyChooseUs.items.length > 0),
      industry_solutions: nullIfEmptySection(form.industrySolutions, form.industrySolutions.industries.length > 0),
      language_support: nullIfEmptySection(form.languageSupport, form.languageSupport.languages.length > 0),
      use_cases: nullIfEmptySection(form.useCases, form.useCases.items.length > 0),
      compliance_security: nullIfEmptySection(form.complianceSecurity, form.complianceSecurity.items.length > 0),
      integrations: nullIfEmptySection(form.integrations, form.integrations.groups.length > 0),
      comparisons: nullIfEmptySection(form.comparisons, form.comparisons.items.length > 0),
      faqs: form.faqs.length > 0 ? form.faqs : null,
    };

    try {
      const res = await fetch(
        mode === "new" ? "/api/admin/country-pages" : `/api/admin/country-pages?id=${countryPageId}`,
        {
          method: mode === "new" ? "POST" : "PATCH",
          ...SEO_FETCH_INIT,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
        if (res.status === 409 || err.code === COUNTRY_SLUG_TAKEN_CODE) {
          setShowValidation(true);
          setSlugAvailabilityError(err.error ?? COUNTRY_SLUG_TAKEN_MESSAGE);
        }
        throw new Error(err.error ?? "Save failed");
      }

      showToast("success", mode === "new" ? "Country page created!" : "Country page saved!");
      if (mode === "new") {
        const data = (await res.json()) as { id?: string };
        if (data.id) router.push(`${SEO_COUNTRIES_PATH}/${data.id}`);
      }
      router.refresh();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!countryPageId) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/country-pages?id=${countryPageId}`, {
        method: "DELETE",
        ...SEO_FETCH_INIT,
      });
      setDeleteOpen(false);
      router.push(SEO_COUNTRIES_PATH);
      router.refresh();
    } catch {
      showToast("error", "Delete failed.");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(SEO_COUNTRIES_PATH)}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Countries
          </button>
          <span className="text-gray-200">|</span>
          <h1 className="text-sm font-semibold text-gray-900">
            {mode === "new" ? "New country page" : "Edit country page"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              disabled={deleting}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              {deleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={saving || slugChecking}
            className="flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#4338ca] disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete this country page?"
        description={`"${form.country_name || "Untitled"}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete page"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setDeleteOpen(false)}
      />

      {toast && (
        <div
          className={`absolute right-5 top-16 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {toast.message}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-8 2xl:max-w-[1520px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex min-w-0 flex-col gap-4">
            <CountryPageImportPanel
              formHasContent={countryPageFormHasContent(form)}
              onApply={handleImportApply}
            />
            {/* Hero */}
            <div ref={heroRef}>
              <SectionCard icon={Sparkles} title="Hero" description="The top banner shown on the country page.">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className={LABEL}>
                      Title <span className="text-red-400">*</span>
                    </label>
                    <InlineRichTextEditor
                      content={form.hero.title}
                      onChange={(html) => setField("hero", { ...form.hero, title: html })}
                      placeholder="Enterprise AI Voice Agent Solutions for Businesses in…"
                      variant="title"
                    />
                    {heroTitleError ? <InlineError id="hero-title-error" message={heroTitleError} /> : null}
                  </div>
                  <div>
                    <label className={LABEL}>
                      Description <span className="text-red-400">*</span>
                    </label>
                    <InlineRichTextEditor
                      content={form.hero.description}
                      onChange={(html) => setField("hero", { ...form.hero, description: html })}
                      placeholder="One or two sentences summarizing the offer for this country…"
                      minHeight={72}
                    />
                    <p className="mt-1 text-[11px] text-gray-400">
                      Formatting is shown on the page. Plain text is used for SEO meta description when one isn&apos;t set below.
                    </p>
                    {heroDescriptionError ? (
                      <InlineError id="hero-description-error" message={heroDescriptionError} />
                    ) : null}
                  </div>
                  <div>
                    <label className={MICRO_LABEL}>Bullets</label>
                    <TitledBulletListEditor
                      items={form.hero.bullets}
                      onChange={(bullets) => setField("hero", { ...form.hero, bullets })}
                      addLabel="Add bullet"
                      emptyMessage="No hero bullets yet."
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 bg-gray-50/40 p-3">
                      <label className={MICRO_LABEL}>Primary CTA label</label>
                      <input
                        type="text"
                        value={form.hero.primaryCta.label}
                        onChange={(e) =>
                          setField("hero", { ...form.hero, primaryCta: { ...form.hero.primaryCta, label: e.target.value } })
                        }
                        placeholder="Book Demo"
                        className={`${FIELD} mb-2`}
                      />
                      <label className={MICRO_LABEL}>Primary CTA link</label>
                      <input
                        type="text"
                        value={form.hero.primaryCta.href}
                        onChange={(e) =>
                          setField("hero", { ...form.hero, primaryCta: { ...form.hero.primaryCta, href: e.target.value } })
                        }
                        placeholder="/contact"
                        className={FIELD}
                      />
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50/40 p-3">
                      <label className={MICRO_LABEL}>Secondary CTA label</label>
                      <input
                        type="text"
                        value={form.hero.secondaryCta?.label ?? ""}
                        onChange={(e) =>
                          setField("hero", {
                            ...form.hero,
                            secondaryCta: { label: e.target.value, href: form.hero.secondaryCta?.href ?? "" },
                          })
                        }
                        placeholder="Talk to Expert"
                        className={`${FIELD} mb-2`}
                      />
                      <label className={MICRO_LABEL}>Secondary CTA link</label>
                      <input
                        type="text"
                        value={form.hero.secondaryCta?.href ?? ""}
                        onChange={(e) =>
                          setField("hero", {
                            ...form.hero,
                            secondaryCta: { label: form.hero.secondaryCta?.label ?? "", href: e.target.value },
                          })
                        }
                        placeholder="/contact"
                        className={FIELD}
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Overview */}
            <SectionCard icon={FileText} title="Country overview" description="Market context paragraphs." optional>
              <div className="flex flex-col gap-3">
                <InlineRichTextEditor
                  content={form.overview.title}
                  onChange={(html) => setField("overview", { ...form.overview, title: html })}
                  placeholder="Country Overview: The Contact Center and CX Market"
                  variant="title"
                />
                <div>
                  <label className={MICRO_LABEL}>Paragraphs</label>
                  <div className="flex flex-col gap-2">
                    {form.overview.paragraphs.map((paragraph, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <InlineRichTextEditor
                            content={paragraph}
                            onChange={(html) =>
                              setField("overview", {
                                ...form.overview,
                                paragraphs: form.overview.paragraphs.map((p, idx) => (idx === i ? html : p)),
                              })
                            }
                            placeholder="Write a market-context paragraph…"
                            minHeight={56}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setField("overview", {
                              ...form.overview,
                              paragraphs: form.overview.paragraphs.filter((_, idx) => idx !== i),
                            })
                          }
                          className="mt-1 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setField("overview", { ...form.overview, paragraphs: [...form.overview.paragraphs, ""] })
                      }
                      className="rounded-lg border border-dashed border-gray-200 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
                    >
                      + Add paragraph
                    </button>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Why choose us */}
            <SectionCard icon={ThumbsUp} title="Why choose us" description="Country-specific differentiators." optional>
              <div className="flex flex-col gap-3">
                <InlineRichTextEditor
                  content={form.whyChooseUs.title}
                  onChange={(html) => setField("whyChooseUs", { ...form.whyChooseUs, title: html })}
                  placeholder="Why Businesses in [Country] Choose OnDial"
                  variant="title"
                />
                <InlineRichTextEditor
                  content={form.whyChooseUs.intro ?? ""}
                  onChange={(html) => setField("whyChooseUs", { ...form.whyChooseUs, intro: html })}
                  placeholder="Intro sentence (optional)…"
                  minHeight={48}
                />
                <TitledBulletListEditor
                  items={form.whyChooseUs.items}
                  onChange={(items) => setField("whyChooseUs", { ...form.whyChooseUs, items })}
                  addLabel="Add reason"
                />
              </div>
            </SectionCard>

            {/* Industry solutions */}
            <SectionCard icon={Building2} title="Industry solutions" description="Per-industry use cases." optional>
              <CountryIndustrySolutionsEditor
                value={form.industrySolutions}
                onChange={(industrySolutions) => setField("industrySolutions", industrySolutions)}
              />
            </SectionCard>

            {/* Language support */}
            <SectionCard icon={Languages} title="Language support" description="Languages covered in this country." optional>
              <div className="flex flex-col gap-3">
                <InlineRichTextEditor
                  content={form.languageSupport.title}
                  onChange={(html) => setField("languageSupport", { ...form.languageSupport, title: html })}
                  placeholder="Language Support"
                  variant="title"
                />
                <InlineRichTextEditor
                  content={form.languageSupport.intro ?? ""}
                  onChange={(html) => setField("languageSupport", { ...form.languageSupport, intro: html })}
                  placeholder="Intro sentence (optional)…"
                  minHeight={48}
                />
                <TitledBulletListEditor
                  items={languagesToBullets(form.languageSupport.languages)}
                  onChange={(bullets) =>
                    setField("languageSupport", { ...form.languageSupport, languages: bulletsToLanguages(bullets) })
                  }
                  titleLabel="Language"
                  titlePlaceholder="e.g. Spanish"
                  descriptionPlaceholder="Where it's spoken and why it matters…"
                  addLabel="Add language"
                />
                <InlineRichTextEditor
                  content={form.languageSupport.note ?? ""}
                  onChange={(html) => setField("languageSupport", { ...form.languageSupport, note: html })}
                  placeholder="Closing note (optional)…"
                  minHeight={48}
                />
              </div>
            </SectionCard>

            {/* Use cases */}
            <SectionCard icon={ListChecks} title="Country-specific use cases" description="Numbered use-case list." optional>
              <div className="flex flex-col gap-3">
                <InlineRichTextEditor
                  content={form.useCases.title}
                  onChange={(html) => setField("useCases", { ...form.useCases, title: html })}
                  placeholder="Country-Specific Use Cases"
                  variant="title"
                />
                <InlineRichTextEditor
                  content={form.useCases.intro ?? ""}
                  onChange={(html) => setField("useCases", { ...form.useCases, intro: html })}
                  placeholder="Intro sentence (optional)…"
                  minHeight={48}
                />
                <TitledBulletListEditor
                  items={form.useCases.items}
                  onChange={(items) => setField("useCases", { ...form.useCases, items })}
                  addLabel="Add use case"
                />
              </div>
            </SectionCard>

            {/* Compliance & security */}
            <SectionCard icon={ShieldCheck} title="Compliance and security" description="Regulatory alignment points." optional>
              <div className="flex flex-col gap-3">
                <InlineRichTextEditor
                  content={form.complianceSecurity.title}
                  onChange={(html) => setField("complianceSecurity", { ...form.complianceSecurity, title: html })}
                  placeholder="Compliance and Security"
                  variant="title"
                />
                <InlineRichTextEditor
                  content={form.complianceSecurity.intro ?? ""}
                  onChange={(html) => setField("complianceSecurity", { ...form.complianceSecurity, intro: html })}
                  placeholder="Disclaimer / intro sentence (optional)…"
                  minHeight={48}
                />
                <TitledBulletListEditor
                  items={form.complianceSecurity.items}
                  onChange={(items) => setField("complianceSecurity", { ...form.complianceSecurity, items })}
                  addLabel="Add compliance item"
                />
              </div>
            </SectionCard>

            {/* Integrations */}
            <SectionCard icon={Globe2} title="Enterprise integrations" description="CRM, helpdesk, and telephony groups." optional>
              <CountryIntegrationsEditor
                value={form.integrations}
                onChange={(integrations) => setField("integrations", integrations)}
              />
            </SectionCard>

            {/* Comparisons */}
            <SectionCard icon={Scale} title="Comparisons" description="AI voice agent vs traditional options." optional>
              <div className="flex flex-col gap-3">
                <InlineRichTextEditor
                  content={form.comparisons.title}
                  onChange={(html) => setField("comparisons", { ...form.comparisons, title: html })}
                  placeholder="AI Voice Agent vs Traditional Options"
                  variant="title"
                />
                <TitledBulletListEditor
                  items={form.comparisons.items}
                  onChange={(items) => setField("comparisons", { ...form.comparisons, items })}
                  addLabel="Add comparison"
                />
              </div>
            </SectionCard>

            {/* FAQs */}
            <SectionCard icon={HelpCircle} title="FAQs" description="Shown as an accordion at the bottom of the page." optional>
              <CountryFaqEditor items={form.faqs} onChange={(faqs) => setField("faqs", faqs)} />
            </SectionCard>
          </div>

          <CountryPageFormSidebar
            countryNameRef={countryNameRef}
            slugRef={slugRef}
            form={form}
            countryNameError={countryNameError}
            slugError={slugError}
            slugChecking={slugChecking}
            onFieldChange={(key, value) =>
              setField(key as keyof CountryPageFormState, value as CountryPageFormState[keyof CountryPageFormState])
            }
            onSlugChange={handleSlugInputChange}
            onSlugBlur={handleSlugBlur}
          />
        </div>
      </div>
    </form>
  );
}
