import { readFile, writeFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.ondial.ai";

/** Format publish_date as YYYY-MM-DD in IST. */
function formatPublishDate(publishDate: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(publishDate));
}

function buildBlogUrlBlock(slug: string, publishDate: string): string {
  return `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${formatPublishDate(publishDate)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

async function loadNonBlogEntries(): Promise<string> {
  const templatePath = path.join(process.cwd(), "src/lib/sitemap/non-blog-entries.xml");
  const xml = await readFile(templatePath, "utf-8");
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g);
  if (!blocks?.length) {
    throw new Error("[sitemap] non-blog-entries.xml has no <url> entries");
  }
  return blocks.join("");
}

export async function generateAndWriteSitemap(): Promise<number> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[sitemap] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY — skipping");
    return 0;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug, publish_date")
    .eq("status", "published");

  if (error) {
    console.error("[sitemap] DB fetch failed:", error.message);
    throw error;
  }

  // Oldest → newest by publish date (matches the original sitemap ordering)
  const sortedPosts = [...(posts ?? [])].sort(
    (a, b) =>
      new Date((a as { publish_date: string }).publish_date).getTime() -
      new Date((b as { publish_date: string }).publish_date).getTime(),
  );

  const nonBlogXml = await loadNonBlogEntries();

  const blogXml = sortedPosts
    .map((p) =>
      buildBlogUrlBlock(
        (p as { slug: string }).slug,
        (p as { publish_date: string }).publish_date,
      ),
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nonBlogXml}${blogXml}
</urlset>`;

  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  await writeFile(sitemapPath, sitemap.trim(), "utf-8");

  const count = sortedPosts.length;
  console.log(
    `[sitemap] Regenerated — ${count} blog posts + static/voice/industry pages → public/sitemap.xml`,
  );
  return count;
}
