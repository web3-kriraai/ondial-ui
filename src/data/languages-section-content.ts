export type FeaturedLanguage = {
  id: string;
  name: string;
  nativeName: string;
  countryCode: string;
};

export const LANGUAGES_SECTION_HEADING = {
  eyebrow: "Global Voice Coverage",
  titleLead: "Connect in Every",
  titleTail: "",
  titleAccent: "Language & Region",
  subtitle:
    "Bridge linguistic divides with AI Voice Agents that speak 100+ languages fluently—so every customer feels understood.",
} as const;

export const LANGUAGES_SECTION_STATS = [
  { value: "100+", label: "Languages supported" },
  { value: "50+", label: "Regional accents" },
  { value: "<200ms", label: "Response latency" },
  { value: "99.4%", label: "Transcription accuracy" },
] as const;

export const FEATURED_LANGUAGES: readonly FeaturedLanguage[] = [
  { id: "english", name: "English", nativeName: "English", countryCode: "us" },
  { id: "hindi", name: "Hindi", nativeName: "हिन्दी", countryCode: "in" },
  { id: "tamil", name: "Tamil", nativeName: "தமிழ்", countryCode: "in" },
  { id: "telugu", name: "Telugu", nativeName: "తెలుగు", countryCode: "in" },
  { id: "bengali", name: "Bengali", nativeName: "বাংলা", countryCode: "in" },
  { id: "marathi", name: "Marathi", nativeName: "मराठी", countryCode: "in" },
  { id: "gujarati", name: "Gujarati", nativeName: "ગુજરાતી", countryCode: "in" },
  { id: "kannada", name: "Kannada", nativeName: "ಕನ್ನಡ", countryCode: "in" },
  { id: "malayalam", name: "Malayalam", nativeName: "മലയാളം", countryCode: "in" },
  { id: "punjabi", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", countryCode: "in" },
  { id: "spanish", name: "Spanish", nativeName: "Español", countryCode: "es" },
  { id: "french", name: "French", nativeName: "Français", countryCode: "fr" },
  { id: "german", name: "German", nativeName: "Deutsch", countryCode: "de" },
  { id: "portuguese", name: "Portuguese", nativeName: "Português", countryCode: "br" },
  { id: "japanese", name: "Japanese", nativeName: "日本語", countryCode: "jp" },
  { id: "chinese", name: "Chinese", nativeName: "中文", countryCode: "cn" },
  { id: "arabic", name: "Arabic", nativeName: "عربي", countryCode: "sa" },
  { id: "korean", name: "Korean", nativeName: "한국어", countryCode: "kr" },
  { id: "italian", name: "Italian", nativeName: "Italiano", countryCode: "it" },
  { id: "russian", name: "Russian", nativeName: "Русский", countryCode: "ru" },
] as const;

export const LANGUAGES_TOTAL_COUNT = "100+";
export const LANGUAGES_GRID_VISIBLE = FEATURED_LANGUAGES.length;

export type LanguageDisplayGroup = "featured" | "india" | "global";

// const INDIAN_LANGUAGE_IDS = new Set([
//   "hindi",
//   "tamil",
//   "telugu",
//   "bengali",
//   "marathi",
//   "gujarati",
//   "kannada",
//   "malayalam",
//   "punjabi",
// ]);

export const LANGUAGE_GROUP_ORDER: readonly LanguageDisplayGroup[] = ["featured", "india", "global"];

export const LANGUAGE_GROUP_LABELS: Record<LanguageDisplayGroup, string | null> = {
  featured: null,
  india: "Indian languages",
  global: "Global languages",
};

