/**
 * Contentful → Supabase migration script
 *
 * Run:
 *   node --env-file=.env.local scripts/migrate-from-contentful.mjs
 *
 * What it does:
 *  1. Fetches every published blog post from Contentful (all configured spaces)
 *  2. Fetches every author and links them to their posts
 *  3. Uploads featured images + author avatars to Cloudinary (from URL)
 *  4. Stores the Contentful Rich Text body as-is — BlogRichText already renders it
 *  5. Upserts authors then posts into Supabase
 *
 * Safe to re-run — slugs/author-slugs are used as natural keys (UPSERT).
 */

import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";

// ─── Config ──────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes("--dry-run");
const INCLUDE_DRAFTS = process.argv.includes("--include-drafts");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Contentful spaces
const SPACES = buildSpaceList();

function buildSpaceList() {
  const spaces = [];
  const primaryId = process.env.CONTENTFUL_SPACE_ID;
  const primaryEnv = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

  // When --include-drafts is set, use the Preview API + preview token
  const primaryToken = INCLUDE_DRAFTS
    ? (process.env.CONTENTFUL_PREVIEW_TOKEN ?? process.env.CONTENTFUL_GRAPHQL_TOKEN)
    : process.env.CONTENTFUL_GRAPHQL_TOKEN;

  const baseUrl = INCLUDE_DRAFTS
    ? `https://preview.contentful.com/spaces/${primaryId}/environments/${primaryEnv}`
    : `https://graphql.contentful.com/content/v1/spaces/${primaryId}/environments/${primaryEnv}`;

  if (primaryId && primaryToken) {
    spaces.push({
      spaceId: primaryId,
      token: primaryToken,
      endpoint: baseUrl,
      preview: INCLUDE_DRAFTS,
    });
  }

  const additionalRaw = process.env.NEXT_PUBLIC_CONTENTFUL_ADDITIONAL_SPACES;
  if (additionalRaw) {
    try {
      const list = JSON.parse(additionalRaw);
      for (const item of list) {
        const spaceEnv = item.environment ?? "master";

        // Prefer a space-specific GraphQL token from env vars over the one
        // embedded in NEXT_PUBLIC_CONTENTFUL_ADDITIONAL_SPACES — the latter
        // is sometimes a CMA (management) token which the GraphQL API rejects.
        const spaceToken =
          process.env[`CONTENTFUL_GRAPHQL_TOKEN_${item.spaceId}`] ??
          item.accessToken;

        const spaceEndpoint = INCLUDE_DRAFTS
          ? `https://preview.contentful.com/spaces/${item.spaceId}/environments/${spaceEnv}`
          : `https://graphql.contentful.com/content/v1/spaces/${item.spaceId}/environments/${spaceEnv}`;

        spaces.push({
          spaceId: item.spaceId,
          token: spaceToken,
          endpoint: spaceEndpoint,
          preview: INCLUDE_DRAFTS,
        });
      }
    } catch {
      console.warn("⚠️  Could not parse NEXT_PUBLIC_CONTENTFUL_ADDITIONAL_SPACES");
    }
  }

  return spaces;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function assertEnv() {
  const missing = [];
  if (!SUPABASE_URL) missing.push("SUPABASE_URL");
  if (!SUPABASE_SERVICE_KEY) missing.push("SUPABASE_SERVICE_KEY");
  if (!CLOUDINARY_CLOUD_NAME) missing.push("CLOUDINARY_CLOUD_NAME");
  if (!CLOUDINARY_API_KEY) missing.push("CLOUDINARY_API_KEY");
  if (!CLOUDINARY_API_SECRET) missing.push("CLOUDINARY_API_SECRET");
  if (SPACES.length === 0) missing.push("CONTENTFUL_SPACE_ID + CONTENTFUL_GRAPHQL_TOKEN");
  if (missing.length) {
    console.error("❌ Missing env vars:", missing.join(", "));
    process.exit(1);
  }
}

// ─── Clients ──────────────────────────────────────────────────────────────────

function makeClients() {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });

  return { supabase };
}

// ─── Cloudinary helpers ───────────────────────────────────────────────────────

/** Cache: contentful URL → cloudinary result  */
const cloudinaryCache = new Map();

async function uploadUrlToCloudinary(url, folder) {
  if (!url) return null;
  const cached = cloudinaryCache.get(url);
  if (cached) return cached;

  try {
    const result = await cloudinary.uploader.upload(url, {
      folder,
      resource_type: "image",
      transformation: [{ quality: "auto:good", fetch_format: "auto" }],
    });
    const entry = {
      url: result.secure_url,
      width: result.width,
      height: result.height,
      publicId: result.public_id,
    };
    cloudinaryCache.set(url, entry);
    return entry;
  } catch (err) {
    console.warn(`  ⚠️  Cloudinary upload failed for ${url.slice(0, 60)}…: ${err.message}`);
    return null;
  }
}

// ─── Contentful GraphQL ───────────────────────────────────────────────────────

const BLOG_DETAIL_FIELDS = `
  title
  slug
  metaTitle
  metaDescription
  publishDate
  featuredImage { url width height }
  description {
    json
    links {
      assets {
        block {
          sys { id }
          url
          title
          description
          contentType
          width
          height
        }
      }
    }
  }
  faqs {
    ... on FaqSection {
      title
      faqsCollection {
        items {
          question
          answer
        }
      }
    }
  }
`;

const AUTHOR_FIELDS = `
  authorName
  slug
  authorDesignation
  authorDescription
  authorImage { url }
  linkedFrom {
    blogsCollection(limit: 200) {
      items { slug }
    }
  }
`;

async function contentfulFetch(endpoint, token, query, variables = {}) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Contentful HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const json = await res.json();

  // Contentful returns partial data with link-resolution errors — that's fine
  if (json.errors?.length) {
    const allLinkErrors = json.errors.every(
      (e) => e.message.includes("cannot be resolved") || e.message.includes("Link from entry"),
    );
    if (!allLinkErrors || !json.data) {
      throw new Error(json.errors.map((e) => e.message).join("; "));
    }
    // warn but continue with partial data
    console.warn(`  ℹ️  Unresolved Contentful links (continuing with partial data)`);
  }

  return json.data;
}

async function fetchAllBlogsFromSpace({ endpoint, token, preview = false }) {
  // description.json is a full rich-text document — very high GraphQL complexity.
  // Contentful's limit is 11,000. Keep page size small to stay under the limit.
  const PAGE_SIZE = 5;
  const all = [];
  let skip = 0;
  let total = Infinity; // will be set on first response

  while (skip < total) {
    // `preview: true` in the query makes Contentful return drafts (requires Preview API token)
    const previewArg = preview ? ", preview: true" : "";
    const query = `
      query GetBlogs($limit: Int!, $skip: Int!) {
        blogsCollection(limit: $limit, skip: $skip${previewArg}, order: [publishDate_DESC, sys_firstPublishedAt_DESC]) {
          total
          items { ${BLOG_DETAIL_FIELDS} }
        }
      }
    `;

    const data = await contentfulFetch(endpoint, token, query, { limit: PAGE_SIZE, skip });

    // raw items (may contain nulls for broken/deleted Contentful references)
    const rawItems = data?.blogsCollection?.items ?? [];
    const validItems = rawItems.filter(Boolean);
    total = data?.blogsCollection?.total ?? 0;

    all.push(...validItems);
    process.stdout.write(`\r     fetched ${all.length}/${total} posts (page skip=${skip})…`);

    // Advance by the raw page size — NOT the filtered count — so null entries
    // in the middle of a page don't cause early loop termination.
    if (rawItems.length === 0) break; // truly empty page = done
    skip += rawItems.length;

    // Small delay to avoid rate-limiting
    await new Promise((r) => setTimeout(r, 300));
  }
  process.stdout.write("\n");

  return all;
}

async function fetchAllAuthorsFromSpace({ endpoint, token }) {
  const PAGE_SIZE = 10;
  const all = [];
  let skip = 0;

  while (true) {
    const query = `
      query GetAuthors($limit: Int!, $skip: Int!) {
        authorCollection(limit: $limit, skip: $skip) {
          total
          items { ${AUTHOR_FIELDS} }
        }
      }
    `;

    const data = await contentfulFetch(endpoint, token, query, { limit: PAGE_SIZE, skip });
    const items = (data?.authorCollection?.items ?? []).filter(Boolean);
    const total = data?.authorCollection?.total ?? 0;

    all.push(...items);
    if (items.length < PAGE_SIZE || all.length >= total) break;
    skip += PAGE_SIZE;
  }

  return all;
}

// ─── Main migration ───────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║      Contentful → Supabase Migration Script          ║");
  console.log("╚══════════════════════════════════════════════════════╝");

  if (DRY_RUN) console.log("🔸 DRY RUN mode — no data will be written");
  if (INCLUDE_DRAFTS) console.log("📝 DRAFTS mode — fetching published + draft entries\n");
  else console.log("");

  assertEnv();
  const { supabase } = makeClients();

  // ── 1. Collect all posts and authors from every Contentful space ──────────

  console.log(`\n📥 Fetching data from ${SPACES.length} Contentful space(s)…`);

  const allBlogsMap = new Map(); // slug → blog
  const allAuthorsMap = new Map(); // authorSlug → author
  const blogToAuthorMap = new Map(); // blogSlug → author

  for (const space of SPACES) {
    console.log(`  🌐 Space: ${space.spaceId}`);

    // Fetch blogs
    let blogs = [];
    try {
      blogs = await fetchAllBlogsFromSpace({ ...space });
      console.log(`     ✓ ${blogs.length} blog posts`);
    } catch (err) {
      console.error(`     ✗ Failed to fetch blogs: ${err.message}`);
    }

    for (const blog of blogs) {
      const slug = blog.slug?.trim().toLowerCase();
      if (!slug) continue;
      if (!allBlogsMap.has(slug)) allBlogsMap.set(slug, blog);
    }

    // Fetch authors (with their linked blog slugs)
    let authors = [];
    try {
      authors = await fetchAllAuthorsFromSpace(space);
      console.log(`     ✓ ${authors.length} authors`);
    } catch (err) {
      console.error(`     ✗ Failed to fetch authors: ${err.message}`);
    }

    for (const author of authors) {
      const aSlug = author.slug?.trim().toLowerCase();
      if (!aSlug) continue;
      if (!allAuthorsMap.has(aSlug)) allAuthorsMap.set(aSlug, author);

      // Map blog slug → author
      const linkedSlugs = author.linkedFrom?.blogsCollection?.items ?? [];
      for (const link of linkedSlugs) {
        const bSlug = link?.slug?.trim().toLowerCase();
        if (bSlug) blogToAuthorMap.set(bSlug, author);
      }
    }
  }

  console.log(`\n📊 Total unique blogs: ${allBlogsMap.size}`);
  console.log(`📊 Total unique authors: ${allAuthorsMap.size}`);

  // ── 2. Migrate authors ────────────────────────────────────────────────────

  console.log("\n👤 Migrating authors…");

  const authorSlugToSupabaseId = new Map(); // authorSlug → supabase UUID

  // Fetch existing authors from Supabase
  const { data: existingAuthors } = await supabase.from("authors").select("id, slug");
  for (const a of existingAuthors ?? []) {
    authorSlugToSupabaseId.set(a.slug, a.id);
  }

  let authorCreated = 0;
  let authorUpdated = 0;

  for (const [authorSlug, author] of allAuthorsMap.entries()) {
    process.stdout.write(`  • ${author.authorName ?? authorSlug}… `);

    // Upload avatar to Cloudinary
    let avatarUrl = author.authorImage?.url ?? null;
    if (avatarUrl && !DRY_RUN) {
      const uploaded = await uploadUrlToCloudinary(
        avatarUrl.startsWith("//") ? `https:${avatarUrl}` : avatarUrl,
        "blog/authors",
      );
      if (uploaded) avatarUrl = uploaded.url;
    }

    const row = {
      slug: authorSlug,
      name: author.authorName ?? authorSlug,
      designation: author.authorDesignation ?? null,
      description: author.authorDescription ?? null,
      avatar_url: avatarUrl,
    };

    if (DRY_RUN) {
      console.log("(dry run)");
      continue;
    }

    const { data, error } = await supabase
      .from("authors")
      .upsert(row, { onConflict: "slug" })
      .select("id")
      .single();

    if (error) {
      console.log(`❌ ${error.message}`);
      continue;
    }

    const isNew = !authorSlugToSupabaseId.has(authorSlug);
    authorSlugToSupabaseId.set(authorSlug, data.id);
    isNew ? authorCreated++ : authorUpdated++;
    console.log(isNew ? "✅ created" : "🔄 updated");
  }

  // ── 3. Migrate blog posts ─────────────────────────────────────────────────

  console.log("\n📝 Migrating blog posts…");

  // Fetch existing post slugs from Supabase
  const { data: existingPosts } = await supabase.from("posts").select("id, slug");
  const existingPostSlugs = new Map((existingPosts ?? []).map((p) => [p.slug, p.id]));

  let postCreated = 0;
  let postUpdated = 0;
  let postFailed = 0;

  const blogEntries = Array.from(allBlogsMap.entries());

  for (let i = 0; i < blogEntries.length; i++) {
    const [slug, blog] = blogEntries[i];

    const progress = `[${i + 1}/${blogEntries.length}]`;
    console.log(`\n${progress} "${blog.title ?? slug}"`);
    console.log(`  slug: ${slug}`);

    // Resolve author
    const authorData = blogToAuthorMap.get(slug);
    const authorSlug = authorData?.slug?.trim().toLowerCase();
    const authorId = authorSlug ? authorSlugToSupabaseId.get(authorSlug) ?? null : null;
    if (authorSlug) {
      console.log(`  author: ${authorData?.authorName ?? authorSlug} (id: ${authorId ?? "not found"})`);
    }

    // Upload featured image to Cloudinary
    let featuredImageUrl = blog.featuredImage?.url ?? null;
    let featuredImageWidth = blog.featuredImage?.width ?? null;
    let featuredImageHeight = blog.featuredImage?.height ?? null;

    if (featuredImageUrl && !DRY_RUN) {
      const normalizedUrl = featuredImageUrl.startsWith("//")
        ? `https:${featuredImageUrl}`
        : featuredImageUrl;
      process.stdout.write(`  uploading featured image… `);
      const uploaded = await uploadUrlToCloudinary(normalizedUrl, "blog/featured");
      if (uploaded) {
        featuredImageUrl = uploaded.url;
        featuredImageWidth = uploaded.width;
        featuredImageHeight = uploaded.height;
        console.log(`✅ ${uploaded.width}×${uploaded.height}`);
      } else {
        console.log("⚠️  kept original URL");
      }
    }

    // Build body — store Contentful Rich Text as-is (BlogRichText already renders it)
    const body = blog.description ?? null;

    // Build FAQs payload for the API
    const faqsPayload = blog.faqs?.faqsCollection?.items?.length
      ? {
          title: blog.faqs.title ?? "Frequently asked questions",
          items: blog.faqs.faqsCollection.items
            .filter(Boolean)
            .map((item) => ({ question: item.question ?? "", answer: item.answer ?? "" })),
        }
      : null;

    const postRow = {
      slug,
      title: blog.title ?? slug,
      meta_title: blog.metaTitle ?? null,
      meta_description: blog.metaDescription ?? null,
      publish_date: blog.publishDate ?? new Date().toISOString(),
      featured_image_url: featuredImageUrl,
      featured_image_width: featuredImageWidth,
      featured_image_height: featuredImageHeight,
      author_id: authorId,
      category: "Insights",
      // Keep drafts as "draft" in Supabase; published Contentful posts → "published"
      status: INCLUDE_DRAFTS && !blog.publishDate ? "draft" : "published",
      body,
    };

    if (DRY_RUN) {
      console.log("  (dry run — skipping DB write)");
      continue;
    }

    try {
      // Upsert the post
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .upsert(postRow, { onConflict: "slug" })
        .select("id")
        .single();

      if (postError) throw postError;

      const postId = postData.id;
      const isNew = !existingPostSlugs.has(slug);
      console.log(`  post: ${isNew ? "✅ created" : "🔄 updated"} (id: ${postId})`);

      // Handle FAQs — delete existing then re-insert
      if (faqsPayload) {
        // Delete existing faq_sections (cascade deletes faq_items)
        await supabase.from("faq_sections").delete().eq("post_id", postId);

        const { data: section, error: sectionErr } = await supabase
          .from("faq_sections")
          .insert({ post_id: postId, title: faqsPayload.title })
          .select("id")
          .single();

        if (sectionErr) {
          console.warn(`  ⚠️  FAQ section insert failed: ${sectionErr.message}`);
        } else if (faqsPayload.items.length > 0) {
          const faqItems = faqsPayload.items.map((item, idx) => ({
            section_id: section.id,
            question: item.question,
            answer: item.answer,
            sort_order: idx,
          }));
          const { error: itemsErr } = await supabase.from("faq_items").insert(faqItems);
          if (itemsErr) console.warn(`  ⚠️  FAQ items insert failed: ${itemsErr.message}`);
          else console.log(`  faqs: ✅ ${faqItems.length} FAQ items`);
        }
      }

      isNew ? postCreated++ : postUpdated++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      postFailed++;
    }
  }

  // ── 4. Summary ────────────────────────────────────────────────────────────

  console.log("\n╔══════════════════════════════════════╗");
  console.log("║           Migration Complete          ║");
  console.log("╚══════════════════════════════════════╝");
  if (DRY_RUN) {
    console.log("🔸 DRY RUN — nothing was written to the database");
  } else {
    console.log(`Authors  : ${authorCreated} created, ${authorUpdated} updated`);
    console.log(`Posts    : ${postCreated} created, ${postUpdated} updated, ${postFailed} failed`);
  }
  console.log("");
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
