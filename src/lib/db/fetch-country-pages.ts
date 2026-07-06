import "server-only";

import { cache } from "react";

import { createPublicClient } from "@/lib/db/client";
import type { CountryPageRow } from "@/lib/db/types";

// ---------------------------------------------------------------------------
// Summary type for the /countries index listing
// ---------------------------------------------------------------------------

export type CountryPageSummary = {
  slug: string;
  countryName: string;
  countryCode: string | null;
  excerpt: string;
};

const SUMMARY_SELECT = "slug, country_name, country_code, meta_description, hero, updated_at" as const;

function toSummary(
  row: Pick<CountryPageRow, "slug" | "country_name" | "country_code" | "meta_description" | "hero">,
): CountryPageSummary {
  return {
    slug: row.slug,
    countryName: row.country_name,
    countryCode: row.country_code,
    excerpt: row.meta_description ?? row.hero.description,
  };
}

// ---------------------------------------------------------------------------
// fetchCountryPageBySlug — public detail fetch, deduped per-request via cache()
// ---------------------------------------------------------------------------

async function fetchCountryPageBySlugImpl(slug: string): Promise<CountryPageRow | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("country_pages")
    .select("*")
    .eq("slug", normalizedSlug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // no rows
    throw new Error(`[db] fetchCountryPageBySlug("${normalizedSlug}"): ${error.message}`);
  }

  return data ?? null;
}

export const fetchCountryPageBySlug = cache(fetchCountryPageBySlugImpl);

// ---------------------------------------------------------------------------
// fetchAllCountryPageSummaries — for the /countries index
// ---------------------------------------------------------------------------

async function fetchAllCountryPageSummariesImpl(): Promise<CountryPageSummary[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("country_pages")
    .select(SUMMARY_SELECT)
    .eq("status", "published")
    .order("country_name", { ascending: true });

  if (error) throw new Error(`[db] fetchAllCountryPageSummaries: ${error.message}`);

  return (data ?? []).map(toSummary);
}

export const fetchAllCountryPageSummaries = cache(fetchAllCountryPageSummariesImpl);

// ---------------------------------------------------------------------------
// fetchAllCountryPageSlugs — for the sitemap
// ---------------------------------------------------------------------------

async function fetchAllCountryPageSlugsImpl(): Promise<Array<{ slug: string; updatedAt: string }>> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("country_pages")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("country_name", { ascending: true });

  if (error) throw new Error(`[db] fetchAllCountryPageSlugs: ${error.message}`);

  return (data ?? []).map((row) => ({ slug: row.slug, updatedAt: row.updated_at }));
}

export const fetchAllCountryPageSlugs = cache(fetchAllCountryPageSlugsImpl);
