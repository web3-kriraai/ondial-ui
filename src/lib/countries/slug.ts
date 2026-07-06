/** Characters allowed in a country page slug (final URL segment). */
const COUNTRY_SLUG_CHAR_RE = /[^a-z0-9_-]/g;

/**
 * Light sanitization while the user is typing — keeps trailing `-` / `_` and
 * does not trim edges so mid-word separators are not swallowed.
 */
export function sanitizeCountrySlugInput(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(COUNTRY_SLUG_CHAR_RE, "");
}

/** Normalize a country page URL slug for save, uniqueness checks, and public URLs. */
export function normalizeCountrySlug(text: string): string {
  return sanitizeCountrySlugInput(text.trim())
    .replace(/-+/g, "-")
    .replace(/_+/g, "_")
    .replace(/^[-_]+|[-_]+$/g, "");
}

export function isCountrySlugValid(text: string): boolean {
  return normalizeCountrySlug(text).length > 0;
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
