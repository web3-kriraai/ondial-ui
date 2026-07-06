"use client";

import type { ReactNode } from "react";
import { Archive, Clock, Globe, Loader2, Search } from "lucide-react";

import { cn } from "@/lib/utils";

const STATUS_OPTS = [
  { value: "draft" as const, label: "Draft", icon: Clock, color: "text-amber-600" },
  { value: "published" as const, label: "Published", icon: Globe, color: "text-emerald-600" },
  { value: "archived" as const, label: "Archived", icon: Archive, color: "text-gray-500" },
];

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10";

const LABEL = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

const PANEL =
  "overflow-visible rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]";

function SidebarGroup({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(PANEL, className)}>
      <div className="mb-4 border-b border-gray-100 pb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-800">{title}</h2>
        {description ? (
          <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function InlineError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-600">
      {message}
    </p>
  );
}

type CountryPageFormSidebarProps = {
  countryNameRef: React.RefObject<HTMLDivElement | null>;
  slugRef: React.RefObject<HTMLDivElement | null>;
  form: {
    country_name: string;
    country_code: string;
    meta_description: string;
    meta_title: string;
    slug: string;
    status: "draft" | "published" | "archived";
  };
  countryNameError: string | null;
  slugError: string | null;
  slugChecking: boolean;
  onFieldChange: (key: string, value: string) => void;
  onSlugChange: (value: string) => void;
  onSlugBlur: () => void;
};

export function CountryPageFormSidebar({
  countryNameRef,
  slugRef,
  form,
  countryNameError,
  slugError,
  slugChecking,
  onFieldChange,
  onSlugChange,
  onSlugBlur,
}: CountryPageFormSidebarProps) {
  return (
    <aside className="flex w-full min-w-0 flex-col gap-4 xl:sticky xl:top-0 xl:w-[400px] xl:shrink-0 xl:self-start 2xl:w-[420px]">
      <SidebarGroup title="Publish" description="Status of this country page.">
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 xl:grid-cols-1">
          {STATUS_OPTS.map(({ value, label, icon: Icon, color }) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all",
                form.status === value
                  ? "border-[#534AB7]/35 bg-[#534AB7]/5 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80",
              )}
            >
              <input
                type="radio"
                name="status"
                value={value}
                checked={form.status === value}
                onChange={() => onFieldChange("status", value)}
                className="sr-only"
              />
              <Icon className={cn("size-4 shrink-0", color)} />
              <span
                className={cn("text-xs font-medium", form.status === value ? "text-gray-900" : "text-gray-600")}
              >
                {label}
              </span>
              {form.status === value ? <span className="ml-auto size-1.5 rounded-full bg-[#534AB7]" /> : null}
            </label>
          ))}
        </div>
      </SidebarGroup>

      <SidebarGroup title="Country" description="Identity and URL for this page.">
        <div ref={countryNameRef}>
          <label className={LABEL} htmlFor="country_name">
            Country name <span className="text-red-400">*</span>
          </label>
          <input
            id="country_name"
            type="text"
            value={form.country_name}
            onChange={(e) => onFieldChange("country_name", e.target.value)}
            placeholder="e.g. United States"
            aria-invalid={Boolean(countryNameError)}
            className={FIELD}
          />
          {countryNameError ? <InlineError id="country-name-error" message={countryNameError} /> : null}
        </div>

        <div ref={slugRef}>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            URL slug
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-gray-400">/countries/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              onBlur={onSlugBlur}
              placeholder="united-states"
              aria-invalid={Boolean(slugError)}
              className={`flex-1 rounded-md border bg-gray-50 px-2.5 py-1.5 text-xs font-mono text-gray-700 outline-none transition-all focus:bg-white focus:ring-1 ${
                slugError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
                  : "border-gray-200 focus:border-[#534AB7] focus:ring-[#534AB7]/10"
              }`}
            />
            {slugChecking && <Loader2 className="size-3.5 shrink-0 animate-spin text-gray-400" aria-hidden />}
          </div>
          {slugError ? (
            <InlineError id="slug-error" message={slugError} />
          ) : (
            <p className="mt-1.5 text-[11px] text-gray-400">
              Lowercase letters, numbers, hyphens, and underscores. Spaces become hyphens.
            </p>
          )}
        </div>

        <div>
          <label className={LABEL} htmlFor="country_code">
            ISO country code
          </label>
          <input
            id="country_code"
            type="text"
            value={form.country_code}
            onChange={(e) => onFieldChange("country_code", e.target.value.toUpperCase().slice(0, 2))}
            placeholder="US"
            maxLength={2}
            className={`${FIELD} font-mono uppercase`}
          />
          <p className="mt-1.5 text-[11px] text-gray-400">
            ISO alpha-2 code — drives the flag icon and structured-data areaServed.
          </p>
        </div>
      </SidebarGroup>

      <SidebarGroup title="SEO" description="Search and social preview metadata." className="pb-6">
        <div className="flex items-center gap-2 rounded-lg border border-[#534AB7]/15 bg-[#534AB7]/4 px-3 py-2">
          <Search className="size-3.5 shrink-0 text-[#534AB7]" />
          <p className="text-[11px] text-gray-600">Leave empty to fall back to the hero title/description.</p>
        </div>

        <div>
          <label className={LABEL} htmlFor="meta_title">
            Meta title
          </label>
          <input
            id="meta_title"
            type="text"
            value={form.meta_title}
            onChange={(e) => onFieldChange("meta_title", e.target.value)}
            placeholder="Defaults to hero title"
            className={`${FIELD} text-xs`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="meta_description">
            Meta description
          </label>
          <textarea
            id="meta_description"
            value={form.meta_description}
            onChange={(e) => onFieldChange("meta_description", e.target.value)}
            placeholder="Short summary for Google & social (160 chars max)"
            rows={3}
            className={`${FIELD} resize-none text-xs`}
          />
          <p
            className={cn(
              "mt-1 text-right text-xs",
              form.meta_description.length > 160 ? "text-red-500" : "text-gray-400",
            )}
          >
            {form.meta_description.length}/160
          </p>
        </div>
      </SidebarGroup>
    </aside>
  );
}
