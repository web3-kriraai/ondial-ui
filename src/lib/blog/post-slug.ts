/** Normalize a blog post URL slug (lowercase, hyphenated, DB-safe). */
export function normalizePostSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isSlugUniqueViolation(error: { code?: string; message?: string }): boolean {
  return (
    error.code === "23505" ||
    /duplicate key.*posts.*slug/i.test(error.message ?? "") ||
    /unique constraint.*slug/i.test(error.message ?? "")
  );
}

export const SLUG_TAKEN_MESSAGE =
  "This URL slug is already used by another post. Choose a different slug.";

export const SLUG_TAKEN_CODE = "SLUG_TAKEN";
