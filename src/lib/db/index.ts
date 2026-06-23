/**
 * Public barrel export for the Supabase blog data layer.
 */

export {
  fetchAllBlogSummaries,
  fetchBlogBySlug,
  fetchBlogSlugs,
  fetchBlogsByAuthor,
  invalidateBlogCache,
  invalidateAuthorCache,
} from "@/lib/db/fetch-blogs";

export { mapBlogDetail, mapBlogSummaries, mapBlogSummary } from "@/lib/blog/mappers";
export type { BlogPostDetail, BlogPostSummary } from "@/lib/blog/types";

export { isSupabaseConfigured } from "@/lib/db/client";

export type { AuthorRow, PostRow, FaqSectionRow, FaqItemRow, PostWithAuthor, PostWithDetail } from "@/lib/db/types";
