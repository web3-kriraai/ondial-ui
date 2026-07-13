import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin/api-auth";
import { createServerClient } from "@/lib/db/client";
import type { CountryPageRow } from "@/lib/db/types";
import {
  COUNTRY_SLUG_TAKEN_CODE,
  COUNTRY_SLUG_TAKEN_MESSAGE,
  isCountrySlugUniqueViolation,
  normalizeCountrySlug,
} from "@/lib/countries/slug";
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

type CountryPagePayload = {
  slug: string;
  country_name: string;
  country_code?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  status?: CountryPageRow["status"];
  hero: CountryHeroContent;
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

const COUNTRY_NAME_REQUIRED_MESSAGE = "Country name is required.";
const HERO_REQUIRED_MESSAGE = "Hero title and description are required.";

function slugTakenResponse() {
  return NextResponse.json(
    { error: COUNTRY_SLUG_TAKEN_MESSAGE, code: COUNTRY_SLUG_TAKEN_CODE },
    { status: 409 },
  );
}

function validateCountryPagePayload(fields: {
  country_name?: string | null;
  hero?: CountryHeroContent | null;
}): NextResponse | null {
  if (!fields.country_name || !fields.country_name.trim()) {
    return NextResponse.json({ error: COUNTRY_NAME_REQUIRED_MESSAGE, code: "COUNTRY_NAME_REQUIRED" }, { status: 400 });
  }
  if (!fields.hero || !stripHtml(fields.hero.title) || !stripHtml(fields.hero.description)) {
    return NextResponse.json({ error: HERO_REQUIRED_MESSAGE, code: "HERO_REQUIRED" }, { status: 400 });
  }
  return null;
}

async function findSlugConflict(
  supabase: ReturnType<typeof createServerClient>,
  slug: string,
  excludeId?: string | null,
) {
  const { data } = await supabase
    .from("country_pages")
    .select("id, country_name")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;
  if (excludeId && data.id === excludeId) return null;
  return data as { id: string; country_name: string };
}

function revalidateCountryPaths(slug: string) {
  revalidatePath("/countries", "page");
  revalidatePath(`/countries/${slug}`, "page");
  revalidatePath("/sitemap.xml");
}

// ---------------------------------------------------------------------------
// GET  /api/admin/country-pages
// Returns all country pages (all statuses) for the admin dashboard,
// or checks slug availability via ?checkSlug=
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const supabase = createServerClient();
  const { searchParams } = new URL(req.url);

  const checkSlug = searchParams.get("checkSlug");
  if (checkSlug !== null) {
    const slug = normalizeCountrySlug(checkSlug);
    if (!slug) {
      return NextResponse.json({
        available: false,
        slug: "",
        error: "URL slug is required.",
      });
    }

    const excludeId = searchParams.get("excludeId");
    const conflict = await findSlugConflict(supabase, slug, excludeId);

    return NextResponse.json({
      available: !conflict,
      slug,
      conflictCountryName: conflict?.country_name ?? null,
      error: conflict ? COUNTRY_SLUG_TAKEN_MESSAGE : null,
    });
  }

  const status = searchParams.get("status") as CountryPageRow["status"] | null;

  let query = supabase
    .from("country_pages")
    .select("id, slug, country_name, country_code, status, created_at, updated_at")
    .order("country_name", { ascending: true });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

// ---------------------------------------------------------------------------
// POST  /api/admin/country-pages
// Creates a new country page and revalidates the relevant public routes
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const body = (await req.json()) as CountryPagePayload;

  const supabase = createServerClient();
  const slug = normalizeCountrySlug(body.slug || body.country_name);
  if (!slug) {
    return NextResponse.json({ error: "URL slug is required." }, { status: 400 });
  }

  const requiredError = validateCountryPagePayload({ country_name: body.country_name, hero: body.hero });
  if (requiredError) return requiredError;

  if (await findSlugConflict(supabase, slug)) {
    return slugTakenResponse();
  }

  const { data: created, error } = await supabase
    .from("country_pages")
    .insert({
      slug,
      country_name: body.country_name,
      country_code: body.country_code ?? null,
      meta_title: body.meta_title ?? null,
      meta_description: body.meta_description ?? null,
      status: body.status ?? "draft",
      hero: body.hero,
      overview: body.overview ?? null,
      why_choose_us: body.why_choose_us ?? null,
      industry_solutions: body.industry_solutions ?? null,
      language_support: body.language_support ?? null,
      use_cases: body.use_cases ?? null,
      compliance_security: body.compliance_security ?? null,
      integrations: body.integrations ?? null,
      comparisons: body.comparisons ?? null,
      faqs: body.faqs ?? null,
    })
    .select()
    .single();

  if (error) {
    if (isCountrySlugUniqueViolation(error)) return slugTakenResponse();
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const createdPage = created as CountryPageRow;

  if (createdPage.status === "published") {
    revalidateCountryPaths(createdPage.slug);
  }

  return NextResponse.json(createdPage, { status: 201 });
}

// ---------------------------------------------------------------------------
// PATCH  /api/admin/country-pages?id=<country_page_id>
// Updates a country page and revalidates the relevant public routes
// ---------------------------------------------------------------------------

export async function PATCH(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing country page id" }, { status: 400 });
  }

  const fields = (await req.json()) as Partial<CountryPagePayload>;

  const supabase = createServerClient();

  if ("country_name" in fields || "hero" in fields) {
    const patchError = validateCountryPagePayload({
      country_name: fields.country_name,
      hero: fields.hero,
    });
    if (patchError) return patchError;
  }

  if (typeof fields.slug === "string") {
    const slug = normalizeCountrySlug(fields.slug);
    if (!slug) {
      return NextResponse.json({ error: "URL slug is required." }, { status: 400 });
    }
    fields.slug = slug;
    if (await findSlugConflict(supabase, slug, id)) {
      return slugTakenResponse();
    }
  }

  const { data: existing } = await supabase
    .from("country_pages")
    .select("slug")
    .eq("id", id)
    .single();
  const previousSlug = (existing as Pick<CountryPageRow, "slug"> | null)?.slug ?? null;

  const { data, error } = await supabase
    .from("country_pages")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (isCountrySlugUniqueViolation(error)) return slugTakenResponse();
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const updatedPage = data as CountryPageRow;

  revalidateCountryPaths(updatedPage.slug);
  if (previousSlug && previousSlug !== updatedPage.slug) {
    revalidatePath(`/countries/${previousSlug}`, "page");
  }

  return NextResponse.json(updatedPage);
}

// ---------------------------------------------------------------------------
// DELETE  /api/admin/country-pages?id=<country_page_id>
// Hard-deletes a country page
// ---------------------------------------------------------------------------

export async function DELETE(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing country page id" }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data: existing } = await supabase
    .from("country_pages")
    .select("slug")
    .eq("id", id)
    .single();

  const existingPage = existing as Pick<CountryPageRow, "slug"> | null;

  const { error } = await supabase.from("country_pages").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (existingPage?.slug) {
    revalidateCountryPaths(existingPage.slug);
  }

  return NextResponse.json({ success: true });
}
