import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@/lib/db/client";
import { requireAdminApiAuth } from "@/lib/admin/api-auth";
import { invalidateAuthorCache } from "@/lib/db/fetch-blogs";
import type { AuthorRow } from "@/lib/db/types";

// ---------------------------------------------------------------------------
// GET  /api/admin/authors
// Returns all authors
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []) as AuthorRow[]);
}

// ---------------------------------------------------------------------------
// POST  /api/admin/authors
// Creates a new author
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const body = await req.json() as {
    slug: string;
    name: string;
    designation?: string;
    description?: string;
    avatar_url?: string;
  };

  if (!body.slug || !body.name) {
    return NextResponse.json(
      { error: "slug and name are required" },
      { status: 400 },
    );
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("authors")
    .insert({
      slug: body.slug.trim().toLowerCase(),
      name: body.name,
      designation: body.designation ?? null,
      description: body.description ?? null,
      avatar_url: body.avatar_url ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data as AuthorRow, { status: 201 });
}

// ---------------------------------------------------------------------------
// PATCH  /api/admin/authors?id=<author_id>
// Updates an author and busts author-level caches
// ---------------------------------------------------------------------------

export async function PATCH(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing author id" }, { status: 400 });
  }

  const body = await req.json() as Partial<Omit<AuthorRow, "id" | "created_at">>;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("authors")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const updatedAuthor = data as AuthorRow;
  await invalidateAuthorCache(updatedAuthor.slug);

  return NextResponse.json(updatedAuthor);
}

// ---------------------------------------------------------------------------
// DELETE  /api/admin/authors?id=<author_id>
// Deletes an author (only safe if the author has no posts — enforced by DB FK)
// ---------------------------------------------------------------------------

export async function DELETE(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing author id" }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data: existing } = await supabase
    .from("authors")
    .select("slug")
    .eq("id", id)
    .single();

  const existingAuthor = existing as Pick<AuthorRow, "slug"> | null;

  const { error } = await supabase.from("authors").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (existingAuthor?.slug) {
    await invalidateAuthorCache(existingAuthor.slug);
  }

  return NextResponse.json({ success: true });
}
