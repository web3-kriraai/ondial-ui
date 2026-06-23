import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@/lib/db/client";
import { requireAdminApiAuth } from "@/lib/admin/api-auth";
import {
  isSlugUniqueViolation,
  normalizePostSlug,
  SLUG_TAKEN_CODE,
  SLUG_TAKEN_MESSAGE,
} from "@/lib/blog/post-slug";
import {
  AUTHOR_REQUIRED_MESSAGE,
  CONTENT_REQUIRED_MESSAGE,
  isPostBodyEmpty,
} from "@/lib/blog/post-validation";
import { invalidateBlogCache } from "@/lib/db/fetch-blogs";
import type { PostRow, FaqSectionRow } from "@/lib/db/types";

function slugTakenResponse() {
  return NextResponse.json(
    { error: SLUG_TAKEN_MESSAGE, code: SLUG_TAKEN_CODE },
    { status: 409 },
  );
}

function getHtmlBodyContent(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const record = body as { type?: string; content?: string };
  if (record.type === "html" && typeof record.content === "string") return record.content;
  return "";
}

function validatePostPayload(fields: {
  author_id?: string | null;
  body?: unknown;
}): NextResponse | null {
  if (!fields.author_id) {
    return NextResponse.json({ error: AUTHOR_REQUIRED_MESSAGE, code: "AUTHOR_REQUIRED" }, { status: 400 });
  }
  if (isPostBodyEmpty(getHtmlBodyContent(fields.body))) {
    return NextResponse.json({ error: CONTENT_REQUIRED_MESSAGE, code: "CONTENT_REQUIRED" }, { status: 400 });
  }
  return null;
}

function validatePostPayloadPatch(
  fields: Partial<{ author_id: string | null; body: unknown }>,
): NextResponse | null {
  if ("author_id" in fields && !fields.author_id) {
    return NextResponse.json({ error: AUTHOR_REQUIRED_MESSAGE, code: "AUTHOR_REQUIRED" }, { status: 400 });
  }
  if ("body" in fields && isPostBodyEmpty(getHtmlBodyContent(fields.body))) {
    return NextResponse.json({ error: CONTENT_REQUIRED_MESSAGE, code: "CONTENT_REQUIRED" }, { status: 400 });
  }
  return null;
}

async function findSlugConflict(
  supabase: ReturnType<typeof createServerClient>,
  slug: string,
  excludeId?: string | null,
) {
  const { data } = await supabase
    .from("posts")
    .select("id, title")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;
  if (excludeId && data.id === excludeId) return null;
  return data as { id: string; title: string };
}

// ---------------------------------------------------------------------------
// GET  /api/admin/posts
// Returns all posts (all statuses) for the admin dashboard
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const supabase = createServerClient();
  const { searchParams } = new URL(req.url);

  const checkSlug = searchParams.get("checkSlug");
  if (checkSlug !== null) {
    const slug = normalizePostSlug(checkSlug);
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
      conflictTitle: conflict?.title ?? null,
      error: conflict ? SLUG_TAKEN_MESSAGE : null,
    });
  }

  const status = searchParams.get("status") as PostRow["status"] | null;

  let query = supabase
    .from("posts")
    .select("id, slug, title, meta_title, status, publish_date, category, created_at, updated_at, author_id")
    .order("publish_date", { ascending: false });

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
// POST  /api/admin/posts
// Creates a new post and busts the relevant caches
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const body = await req.json() as {
    slug: string;
    title: string;
    meta_title?: string;
    meta_description?: string;
    publish_date: string;
    featured_image_url?: string;
    featured_image_width?: number;
    featured_image_height?: number;
    body?: unknown;
    author_id?: string;
    category?: string;
    status?: PostRow["status"];
    faqs?: { title?: string; items: Array<{ question: string; answer: string }> };
  };

  const supabase = createServerClient();
  const slug = normalizePostSlug(body.slug);
  if (!slug) {
    return NextResponse.json({ error: "URL slug is required." }, { status: 400 });
  }

  const requiredError = validatePostPayload({ author_id: body.author_id, body: body.body });
  if (requiredError) return requiredError;

  if (await findSlugConflict(supabase, slug)) {
    return slugTakenResponse();
  }

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      slug,
      title: body.title,
      meta_title: body.meta_title ?? null,
      meta_description: body.meta_description ?? null,
      publish_date: body.publish_date,
      featured_image_url: body.featured_image_url ?? null,
      featured_image_width: body.featured_image_width ?? null,
      featured_image_height: body.featured_image_height ?? null,
      body: body.body ?? null,
      author_id: body.author_id ?? null,
      category: body.category ?? "Insights",
      status: body.status ?? "draft",
    })
    .select()
    .single();

  if (error) {
    if (isSlugUniqueViolation(error)) return slugTakenResponse();
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const createdPost = post as PostRow;

  // Insert FAQs if provided
  if (body.faqs && Array.isArray(body.faqs.items) && body.faqs.items.length > 0) {
    const { data: faqSection } = await supabase
      .from("faq_sections")
      .insert({
        post_id: createdPost.id,
        title: body.faqs.title ?? "Frequently asked questions",
      })
      .select()
      .single();

    const createdSection = faqSection as FaqSectionRow | null;
    if (createdSection) {
      await supabase.from("faq_items").insert(
        body.faqs.items.map((item, i) => ({
          section_id: createdSection.id,
          question: item.question,
          answer: item.answer,
          sort_order: i,
        })),
      );
    }
  }

  // Bust caches
  await invalidateBlogCache(slug);
  if (body.status === "published") {
    revalidatePath("/blog", "page");
    revalidatePath(`/blog/${slug}`, "page");
  }

  return NextResponse.json(createdPost, { status: 201 });
}

// ---------------------------------------------------------------------------
// PATCH  /api/admin/posts?id=<post_id>
// Updates a post and busts caches
// ---------------------------------------------------------------------------

export async function PATCH(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }

  const rawBody = await req.json() as Partial<Omit<PostRow, "id" | "created_at" | "updated_at">> & {
    faqs?: { title?: string; items: Array<{ question: string; answer: string }> } | null;
  };

  // Strip `faqs` — it lives in faq_sections/faq_items, not in the posts table
  const { faqs, ...postFields } = rawBody;

  const supabase = createServerClient();

  const patchError = validatePostPayloadPatch(postFields);
  if (patchError) return patchError;

  if (typeof postFields.slug === "string") {
    const slug = normalizePostSlug(postFields.slug);
    if (!slug) {
      return NextResponse.json({ error: "URL slug is required." }, { status: 400 });
    }
    postFields.slug = slug;
    if (await findSlugConflict(supabase, slug, id)) {
      return slugTakenResponse();
    }
  }

  const { data, error } = await supabase
    .from("posts")
    .update(postFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (isSlugUniqueViolation(error)) return slugTakenResponse();
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const updatedPost = data as PostRow;

  // Handle FAQs — always replace (delete existing, re-insert if provided)
  await supabase.from("faq_sections").delete().eq("post_id", id);

  if (faqs && Array.isArray(faqs.items) && faqs.items.length > 0) {
    const { data: section, error: sectionErr } = await supabase
      .from("faq_sections")
      .insert({ post_id: id, title: faqs.title ?? "Frequently asked questions" })
      .select("id")
      .single();

    if (!sectionErr && section) {
      const faqSection = section as FaqSectionRow;
      await supabase.from("faq_items").insert(
        faqs.items.map((item, i) => ({
          section_id: faqSection.id,
          question: item.question,
          answer: item.answer,
          sort_order: i,
        })),
      );
    }
  }

  await invalidateBlogCache(updatedPost.slug);
  revalidatePath("/blog", "page");
  revalidatePath(`/blog/${updatedPost.slug}`, "page");

  return NextResponse.json(updatedPost);
}

// ---------------------------------------------------------------------------
// DELETE  /api/admin/posts?id=<post_id>
// Hard-deletes a post
// ---------------------------------------------------------------------------

export async function DELETE(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }

  const supabase = createServerClient();

  // Fetch slug before deleting so we can bust the cache
  const { data: existing } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .single();

  const existingPost = existing as Pick<PostRow, "slug"> | null;

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (existingPost?.slug) {
    await invalidateBlogCache(existingPost.slug);
    revalidatePath("/blog", "page");
    revalidatePath(`/blog/${existingPost.slug}`, "page");
  }

  return NextResponse.json({ success: true });
}
