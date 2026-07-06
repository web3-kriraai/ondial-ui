/** Escape HTML entities for safe insertion into rich-text fields. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wrap plain imported text in a single paragraph for TipTap. */
export function importTextToHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("<")) return trimmed;
  return `<p>${escapeHtml(trimmed)}</p>`;
}
