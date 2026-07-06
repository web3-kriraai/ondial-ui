/**
 * Strips HTML tags and collapses whitespace, producing plain text suitable
 * for places that must never contain markup — JSON-LD structured data,
 * <meta> tags, previews/excerpts, etc.
 *
 * Not a sanitizer: only ever call this on content authored by trusted
 * admins (the SEO panel), never on untrusted user input.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
