export type LanguageVoice = {
  code: string;
  name: string;
  iso2: string;
  voice: string;
  region: string;
};

export const LANGUAGE_VOICES: LanguageVoice[] = [
  { code: "en-GB", name: "English", iso2: "gb", voice: "British Male/Female", region: "United Kingdom" },
  { code: "en-US", name: "English", iso2: "us", voice: "American Male/Female", region: "United States" },
  { code: "en-IN", name: "English", iso2: "in", voice: "Indian English Male/Female", region: "India" },
  { code: "es-US", name: "Spanish", iso2: "us", voice: "US Spanish Male/Female", region: "United States" },
  { code: "hi-IN", name: "Hindi", iso2: "in", voice: "Hindi Male/Female", region: "India" },
  { code: "gu-IN", name: "Gujarati", iso2: "in", voice: "Gujarati Male/Female", region: "India" },
  { code: "kn-IN", name: "Kannada", iso2: "in", voice: "Kannada Male/Female", region: "India" },
  { code: "ml-IN", name: "Malayalam", iso2: "in", voice: "Malayalam Male/Female", region: "India" },
  { code: "mr-IN", name: "Marathi", iso2: "in", voice: "Marathi Male/Female", region: "India" },
  { code: "pa", name: "Punjabi", iso2: "in", voice: "Punjabi Male/Female", region: "India" },
  { code: "pa-IN", name: "Punjabi", iso2: "in", voice: "Punjabi Male/Female", region: "India" },
  { code: "ta-IN", name: "Tamil", iso2: "in", voice: "Tamil Male/Female", region: "India" },
  { code: "te-IN", name: "Telugu", iso2: "in", voice: "Telugu Male/Female", region: "India" },
  { code: "bn-IN", name: "Bengali", iso2: "in", voice: "Bengali Male/Female", region: "India" },
  { code: "fr-FR", name: "Français", iso2: "fr", voice: "French Male/Female", region: "France" },
  { code: "de", name: "German", iso2: "de", voice: "German Male/Female", region: "Germany" },
  { code: "de-DE", name: "German", iso2: "de", voice: "German Male/Female", region: "Germany" },
  { code: "es-ES", name: "Spanish", iso2: "es", voice: "Spanish Male/Female", region: "Spain" },
  { code: "es-MX", name: "Spanish", iso2: "mx", voice: "Mexican Spanish Male/Female", region: "Mexico" },
  { code: "es-CO", name: "Spanish", iso2: "co", voice: "Colombian Spanish Male/Female", region: "Colombia" },
  { code: "es-AR", name: "Spanish", iso2: "ar", voice: "Argentine Spanish Male/Female", region: "Argentina" },
  { code: "es-419", name: "Spanish", iso2: "mx", voice: "Latin American Spanish Male/Female", region: "Latin America" },
  { code: "en-AU", name: "English", iso2: "au", voice: "Australian Male/Female", region: "Australia" },
  { code: "en-PH", name: "English", iso2: "ph", voice: "Filipino English Male/Female", region: "Philippines" },
  { code: "pt-BR", name: "Portuguese", iso2: "br", voice: "Brazilian Male/Female", region: "Brazil" },
  { code: "ar-XA", name: "العربية", iso2: "sa", voice: "Arabic Male/Female", region: "Middle East" },
  { code: "ja-JP", name: "Japanese", iso2: "jp", voice: "Japanese Male/Female", region: "Japan" },
  { code: "ko-KR", name: "Korean", iso2: "kr", voice: "Korean Male/Female", region: "South Korea" },
  { code: "cmn-CN", name: "Mandarin", iso2: "cn", voice: "Mandarin Male/Female", region: "China" },
  { code: "it-IT", name: "Italian", iso2: "it", voice: "Italian Male/Female", region: "Italy" },
  { code: "nl-NL", name: "Dutch", iso2: "nl", voice: "Dutch Male/Female", region: "Netherlands" },
  { code: "tr-TR", name: "Turkish", iso2: "tr", voice: "Turkish Male/Female", region: "Turkey" },
  { code: "vi-VN", name: "Vietnamese", iso2: "vn", voice: "Vietnamese Male/Female", region: "Vietnam" },
  { code: "id-ID", name: "Indonesian", iso2: "id", voice: "Indonesian Male/Female", region: "Indonesia" },
  { code: "ru-RU", name: "Russian", iso2: "ru", voice: "Russian Male/Female", region: "Russia" },
  { code: "th-TH", name: "Thai", iso2: "th", voice: "Thai Male/Female", region: "Thailand" },
  { code: "fr-CA", name: "Français", iso2: "ca", voice: "Canadian French Male/Female", region: "Canada" },
];

/** Display label for locale codes used in free-trial / marketing forms. */
export function getLanguageDisplayLabel(code: string): string {
  const raw = String(code || "").trim();
  if (!raw) return "";
  const row = LANGUAGE_VOICES.find((l) => l.code.toLowerCase() === raw.toLowerCase());
  if (row) {
    if (row.region && row.region !== row.name) {
      // Prefer "English (en-IN)" style for clarity when multiple English locales exist
      return `${row.name} (${raw})`;
    }
    return `${row.name} (${raw})`;
  }
  // Fallback: expand known short prefixes
  const FALLBACK: Record<string, string> = {
    "en-IN": "English (en-IN)",
    "pa-IN": "Punjabi (pa-IN)",
    "hi-IN": "Hindi (hi-IN)",
  };
  return FALLBACK[raw] || raw;
}

export const REGION_LABELS: Record<string, string> = {
  India: "India / भारत",
  "Middle East": "Middle East / الشرق الأوسط",
  France: "France",
  Germany: "Germany",
  Spain: "Spain",
  Brazil: "Brazil",
  Japan: "Japan",
  China: "China",
  "South Korea": "South Korea",
  Italy: "Italy",
  Netherlands: "Netherlands",
  Turkey: "Turkey",
  Vietnam: "Vietnam",
  Indonesia: "Indonesia",
  Russia: "Russia",
  Thailand: "Thailand",
  Australia: "Australia",
  Canada: "Canada",
  "United Kingdom": "United Kingdom",
  "United States": "United States",
};

export type SupportedLanguage = {
  code: string;
  country: string;
  language: string;
  countryCode: string;
};

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = LANGUAGE_VOICES.map((item) => ({
  code: item.code,
  country: REGION_LABELS[item.region] ?? item.region,
  language: item.name,
  countryCode: item.iso2,
}));

const ROW_COUNT = 3;

/** Split languages into staggered rows (round-robin for visual variety). */
export function getLanguageRows(
  languages: SupportedLanguage[] = SUPPORTED_LANGUAGES,
): SupportedLanguage[][] {
  const rows: SupportedLanguage[][] = Array.from({ length: ROW_COUNT }, () => []);
  languages.forEach((item, index) => {
    rows[index % ROW_COUNT]!.push(item);
  });
  return rows;
}

/** Self-hosted WebP flags (generated via `npm run optimize:assets`). */
export function flagImageUrl(countryCode: string): string {
  return `/flags/${countryCode}.webp`;
}
