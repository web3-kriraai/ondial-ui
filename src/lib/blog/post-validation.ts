export function isPostBodyEmpty(html: string): boolean {
  const trimmed = html.trim();
  if (!trimmed) return true;

  const text = trimmed
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length === 0;
}

export const AUTHOR_REQUIRED_MESSAGE = "Please select an author before saving.";
export const CONTENT_REQUIRED_MESSAGE = "Post content is required. Add body text before saving.";
