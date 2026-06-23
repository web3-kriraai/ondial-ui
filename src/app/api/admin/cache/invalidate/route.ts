import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { requireAdminApiAuth } from "@/lib/admin/api-auth";
import { invalidateBlogCache, invalidateAuthorCache } from "@/lib/db/fetch-blogs";

/**
 * POST /api/admin/cache/invalidate
 *
 * Body (all fields optional):
 * {
 *   slug?: string        -- bust a single post's cache key
 *   authorSlug?: string  -- bust an author's cache key
 *   paths?: string[]     -- also call revalidatePath() for these paths
 * }
 *
 * Called by SEO save/publish actions after writing to Supabase.
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req);
  if (authError) return authError;

  let body: { slug?: string; authorSlug?: string; paths?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    // Empty body is fine — bust everything
  }

  const ops: Promise<void>[] = [];

  if (body.slug) {
    ops.push(invalidateBlogCache(body.slug));
  } else {
    ops.push(invalidateBlogCache());
  }

  if (body.authorSlug) {
    ops.push(invalidateAuthorCache(body.authorSlug));
  }

  await Promise.all(ops);

  const paths: string[] = body.paths ?? ["/blog"];
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ success: true, revalidated: paths });
}
