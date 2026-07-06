/** Normalize a country page URL slug (lowercase, hyphenated, DB-safe). */
export function normalizeCountrySlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isCountrySlugUniqueViolation(error: { code?: string; message?: string }): boolean {
  return (
    error.code === "23505" ||
    /duplicate key.*country_pages.*slug/i.test(error.message ?? "") ||
    /unique constraint.*slug/i.test(error.message ?? "")
  );
}

export const COUNTRY_SLUG_TAKEN_MESSAGE =
  "This URL slug is already used by another country page. Choose a different slug.";

export const COUNTRY_SLUG_TAKEN_CODE = "SLUG_TAKEN";
