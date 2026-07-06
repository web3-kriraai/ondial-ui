import { createPublicClient } from "@/lib/db/client";
import type { AuthorRow, PostRow } from "@/lib/db/types";

// Force dynamic rendering — never cache at build time, always query Supabase live.
// Combined with the Cache-Control header below, this keeps the feed in sync with
// the blog within minutes of a post being published/edited, with no manual step.
export const dynamic = "force-dynamic";

const BASE_URL = "https://www.ondial.ai";
const FEED_URL = `${BASE_URL}/feed.xml`;
const MAX_FEED_ITEMS = 50;

type FeedPostRow = Pick<
  PostRow,
  "slug" | "title" | "meta_description" | "publish_date" | "featured_image_url"
> & {
  authors: Pick<AuthorRow, "name"> | null;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Formats a date as RFC 822 in IST (e.g. "Mon, 20 Apr 2026 09:00:00 +0530"),
 * the timezone all blog `publish_date` values are authored in.
 *
 * Deliberately avoids `Intl.DateTimeFormat` for the time-of-day parts: some
 * Node/ICU builds mis-render midnight as "24:00:00" with `hour12: false`.
 * Plain UTC-ms arithmetic sidesteps that entirely.
 */
function formatRfc822Date(value: string | null): string {
  const date = value ? new Date(value) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const ist = new Date(safeDate.getTime() + IST_OFFSET_MS);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    `${days[ist.getUTCDay()]}, ${pad(ist.getUTCDate())} ${months[ist.getUTCMonth()]} ` +
    `${ist.getUTCFullYear()} ${pad(ist.getUTCHours())}:${pad(ist.getUTCMinutes())}:${pad(ist.getUTCSeconds())} +0530`
  );
}

function inferImageMimeType(url: string): string {
  const extension = url.split("?")[0].split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    default:
      return "image/webp";
  }
}

function buildFeedItemBlock(post: FeedPostRow): string {
  const link = `${BASE_URL}/blog/${post.slug}`;
  const title = escapeXml(post.title);
  const description = escapeXml(post.meta_description?.trim() || post.title);
  const creator = escapeXml(post.authors?.name?.trim() || "OnDial Team");
  const pubDate = formatRfc822Date(post.publish_date);

  const mediaBlock = post.featured_image_url
    ? `
    <media:content url="${escapeXml(post.featured_image_url)}" medium="image" />
    <enclosure url="${escapeXml(post.featured_image_url)}" type="${inferImageMimeType(post.featured_image_url)}" length="0" />`
    : "";

  return `
  <item>
    <title>${title}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <description>${description}</description>
    <dc:creator>${creator}</dc:creator>
    <pubDate>${pubDate}</pubDate>${mediaBlock}
  </item>`;
}

export async function GET() {
  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from("posts")
      .select("slug, title, meta_description, publish_date, featured_image_url, authors (name)")
      .eq("status", "published")
      .order("publish_date", { ascending: false })
      .limit(MAX_FEED_ITEMS);

    if (error) {
      console.error("[feed] DB fetch failed:", error.message);
      return new Response("Failed to generate feed", { status: 500 });
    }

    const posts = (data ?? []) as unknown as FeedPostRow[];
    const itemsXml = posts.map(buildFeedItemBlock).join("");
    const lastBuildDate = formatRfc822Date(null);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:media="http://search.yahoo.com/mrss/">
 <channel>
   <title>OnDial Blog - AI Voice Agent Insights</title>
   <link>${BASE_URL}/blog</link>
   <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
   <description>Explore AI voice tech trends, tools, and tips to grow smarter and connect with customers better. Insights on AI voice agents, call automation, and customer communication from OnDial.</description>
   <language>en-US</language>
   <copyright>Copyright ${new Date().getFullYear()} OnDial AI. All Rights Reserved.</copyright>
   <managingEditor>contact@ondial.ai (OnDial Team)</managingEditor>
   <webMaster>contact@ondial.ai (OnDial Team)</webMaster>
   <generator>OnDial RSS Generator</generator>
   <lastBuildDate>${lastBuildDate}</lastBuildDate>
   <ttl>1440</ttl>
   <image>
     <url>${BASE_URL}/img/logo/og.png</url>
     <title>OnDial Blog - AI Voice Agent Insights</title>
     <link>${BASE_URL}/blog</link>
   </image>${itemsXml}
 </channel>
</rss>`;

    return new Response(xml.trim(), {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        // 5 min CDN cache, serve stale while revalidating in background
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("[feed] Unexpected error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
