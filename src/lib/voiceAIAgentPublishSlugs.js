/** CMS entry id max length for voice landing pages */
export const VOICE_PAGE_ENTRY_ID_MAX_LENGTH = 64;

/** URL path segment: lowercase letters, numbers, hyphens; 3–80 chars */
export const PUBLIC_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Common app routes - block publishing these as CMS landing slugs */
export const RESERVED_VOICE_PAGE_SLUGS = new Set([
  'api',
  'admin',
  'about',
  'auth',
  'blog',
  'cities',
  'contact',
  'dashboard',
  'industries',
  'login',
  'pricing',
  'privacy',
  'return-policy',
  'services',
  'signup',
  'terms-and-conditions',
  'voice-ai-agent-state',
  '_next',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
]);

export function normalizePublicSlug(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');
}

export function isReservedVoicePageSlug(slug) {
  const s = normalizePublicSlug(slug);
  if (!s || RESERVED_VOICE_PAGE_SLUGS.has(s)) return true;
  if (s.startsWith('dashboard') || s.startsWith('admin') || s.startsWith('api')) {
    return true;
  }
  return false;
}

export function validatePublicSlug(slug) {
  const s = normalizePublicSlug(slug);
  if (!s) return 'slug is required';
  if (s.length < 3) return 'slug must be at least 3 characters';
  if (s.length > 80) return 'slug must be at most 80 characters';
  if (s.length > VOICE_PAGE_ENTRY_ID_MAX_LENGTH) {
    return `slug must be at most ${VOICE_PAGE_ENTRY_ID_MAX_LENGTH} characters`;
  }
  if (!PUBLIC_SLUG_PATTERN.test(s)) {
    return 'slug must use lowercase letters, numbers, and hyphens only (e.g. best-english-voice-agent-united-kingdom)';
  }
  if (isReservedVoicePageSlug(s)) {
    return `slug "${s}" is reserved and cannot be used`;
  }
  return null;
}

/** snake_case key for voice page metadata / labels */
export function deriveStateKeyFromSlug(slug) {
  const s = normalizePublicSlug(slug);
  if (!s) return null;
  const key = s.replace(/-/g, '_');
  if (!/^[a-z][a-z0-9_]*$/.test(key)) return null;
  return key;
}

export function publicPathForSlug(slug) {
  const s = normalizePublicSlug(slug);
  return s ? `/${s}` : '/';
}
