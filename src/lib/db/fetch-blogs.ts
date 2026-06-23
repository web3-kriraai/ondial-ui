import "server-only";

import { Redis } from "@upstash/redis";
import { cache } from "react";

import { createServerClient, createPublicClient } from "@/lib/db/client";
import { shapeToDetail, shapeToSummary } from "@/lib/db/shapers";
import type { PostWithAuthor, PostWithDetail } from "@/lib/db/types";
import type { BlogRecordDetail, BlogRecordSummary } from "@/lib/blog/types";

// ---------------------------------------------------------------------------
// Redis client (singleton — reused across the module)
// ---------------------------------------------------------------------------

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const CACHE_TTL = 300; // seconds — matches blog ISR revalidate window

// Cache key helpers
const KEYS = {
  allSummaries: "blog:all-summaries",
  bySlug: (slug: string) => `blog:slug:${slug}`,
  byAuthor: (authorSlug: string) => `blog:author:${authorSlug}`,
  allSlugs: "blog:all-slugs",
} as const;

// ---------------------------------------------------------------------------
// Post select strings
// ---------------------------------------------------------------------------

const SUMMARY_SELECT = `
  slug, title, meta_title, meta_description,
  publish_date, featured_image_url,
  featured_image_width, featured_image_height,
  authors (id, slug, name, designation, avatar_url)
` as const;

const DETAIL_SELECT = `
  *,
  authors (*),
  faq_sections (
    id, title,
    faq_items (id, question, answer, sort_order)
  )
` as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function redisGet<T>(redis: Redis | null, key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch {
    return null;
  }
}

async function redisSet(redis: Redis | null, key: string, value: unknown): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, value, { ex: CACHE_TTL });
  } catch {
    // Non-fatal — page still works without Redis
  }
}

// ---------------------------------------------------------------------------
// fetchAllBlogSummaries
// ---------------------------------------------------------------------------

async function fetchAllBlogSummariesImpl(): Promise<BlogRecordSummary[]> {
  const redis = getRedis();
  const cached = await redisGet<BlogRecordSummary[]>(redis, KEYS.allSummaries);
  if (cached) return cached;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(SUMMARY_SELECT)
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  if (error) throw new Error(`[db] fetchAllBlogSummaries: ${error.message}`);

  const shaped = (data as unknown as PostWithAuthor[]).map(shapeToSummary);
  await redisSet(redis, KEYS.allSummaries, shaped);
  return shaped;
}

export const fetchAllBlogSummaries = cache(fetchAllBlogSummariesImpl);

// ---------------------------------------------------------------------------
// fetchBlogBySlug
// ---------------------------------------------------------------------------

async function fetchBlogBySlugImpl(slug: string): Promise<BlogRecordDetail | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  const redis = getRedis();
  const cached = await redisGet<BlogRecordDetail>(redis, KEYS.bySlug(normalizedSlug));
  if (cached) return cached;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(DETAIL_SELECT)
    .eq("slug", normalizedSlug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // no rows
    throw new Error(`[db] fetchBlogBySlug("${normalizedSlug}"): ${error.message}`);
  }

  if (!data) return null;

  const shaped = shapeToDetail(data as unknown as PostWithDetail);
  await redisSet(redis, KEYS.bySlug(normalizedSlug), shaped);
  return shaped;
}

export const fetchBlogBySlug = cache(fetchBlogBySlugImpl);

// ---------------------------------------------------------------------------
// fetchBlogsByAuthor
// ---------------------------------------------------------------------------

async function fetchBlogsByAuthorImpl(authorSlug: string): Promise<BlogRecordSummary[]> {
  const normalizedSlug = authorSlug.trim().toLowerCase();
  const redis = getRedis();
  const cached = await redisGet<BlogRecordSummary[]>(redis, KEYS.byAuthor(normalizedSlug));
  if (cached) return cached;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(SUMMARY_SELECT)
    .eq("status", "published")
    .eq("authors.slug", normalizedSlug)
    .not("authors", "is", null)
    .order("publish_date", { ascending: false });

  if (error) throw new Error(`[db] fetchBlogsByAuthor("${normalizedSlug}"): ${error.message}`);

  const shaped = (data as unknown as PostWithAuthor[])
    .filter((row) => row.authors?.slug === normalizedSlug)
    .map(shapeToSummary);

  await redisSet(redis, KEYS.byAuthor(normalizedSlug), shaped);
  return shaped;
}

export const fetchBlogsByAuthor = cache(fetchBlogsByAuthorImpl);

// ---------------------------------------------------------------------------
// fetchBlogSlugs (for sitemap generation)
// ---------------------------------------------------------------------------

async function fetchBlogSlugsImpl(): Promise<string[]> {
  const redis = getRedis();
  const cached = await redisGet<string[]>(redis, KEYS.allSlugs);
  if (cached) return cached;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  if (error) throw new Error(`[db] fetchBlogSlugs: ${error.message}`);

  const slugs = (data ?? []).map((row) => (row as { slug: string }).slug);
  await redisSet(redis, KEYS.allSlugs, slugs);
  return slugs;
}

export const fetchBlogSlugs = cache(fetchBlogSlugsImpl);

// ---------------------------------------------------------------------------
// Cache invalidation helpers (called by admin API routes)
// ---------------------------------------------------------------------------

export async function invalidateBlogCache(slug?: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  const keys: string[] = [KEYS.allSummaries, KEYS.allSlugs];
  if (slug) {
    keys.push(KEYS.bySlug(slug));
  }

  try {
    await Promise.all(keys.map((key) => redis.del(key)));
  } catch {
    // Non-fatal
  }
}

export async function invalidateAuthorCache(authorSlug: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    await Promise.all([
      redis.del(KEYS.byAuthor(authorSlug)),
      redis.del(KEYS.allSummaries),
    ]);
  } catch {
    // Non-fatal
  }
}
