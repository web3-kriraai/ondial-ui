import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * On-demand ISR revalidation endpoint.
 * Protected by a shared secret in REVALIDATE_SECRET.
 *
 * Body (all optional):
 * {
 *   path?: string     -- revalidate a single path, e.g. "/blog/my-post"
 *   paths?: string[]  -- revalidate multiple paths at once
 * }
 *
 * If no paths are provided the /blog root is revalidated.
 * Called from admin CRUD routes after content is saved or published.
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Invalid revalidate token" }, { status: 401 });
  }

  let body: { path?: string; paths?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    // Empty body — revalidate the blog root
  }

  const paths = body.paths ?? (body.path ? [body.path] : ["/blog"]);
  const revalidated: string[] = [];

  for (const path of paths) {
    revalidatePath(path, "page");
    revalidated.push(path);
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
