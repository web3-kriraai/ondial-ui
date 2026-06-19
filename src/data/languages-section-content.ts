export type LanguageAccent = {
  id: string;
  label: string;
  countryCode: string;
};

export type FeaturedLanguage = {
  id: string;
  name: string;
  nativeName: string;
  countryCode: string;
  callerLine: string;
  agentReply: string;
  accents: readonly LanguageAccent[];
};

export const LANGUAGES_SECTION_HEADING = {
  // eyebrow: "Languages",
  // titleLead: "Speaks every language",
  // titleTail: "your customers",
  // titleAccent: "do",
  // subtitle: "Auto-detects the caller's language. Responds naturally. Zero extra setup.",
  eyebrow: "Global Voice Coverage",
  titleLead: "Connect in Every",
  titleTail: "",
  titleAccent: "Language & Region",
  subtitle: "Bridge linguistic divides with AI Voice Agents that speak 100+ languages fluently—so every customer feels understood.",
} as const;

export const LANGUAGES_SECTION_STATS = [
  { value: "100+", label: "Languages supported" },
  { value: "50+", label: "Regional accents" },
  { value: "<200ms", label: "Response latency" },
  { value: "99.4%", label: "Transcription accuracy" },
] as const;

export const FEATURED_LANGUAGES: readonly FeaturedLanguage[] = [
  {
    id: "english",
    name: "English",
    nativeName: "English",
    countryCode: "us",
    callerLine: 'Caller: "I\'d like to book an appointment."',
    agentReply: '"Sure! What date works best for you?"',
    accents: [
      { id: "en-us", label: "American", countryCode: "us" },
      { id: "en-gb", label: "British", countryCode: "gb" },
      { id: "en-au", label: "Australian", countryCode: "au" },
      { id: "en-in", label: "Indian", countryCode: "in" },
      { id: "en-ca", label: "Canadian", countryCode: "ca" },
      { id: "en-za", label: "South African", countryCode: "za" },
    ],
  },
  {
    id: "hindi",
    name: "Hindi",
    nativeName: "हिन्दी",
    countryCode: "in",
    callerLine: 'Caller: "मुझे अपॉइंटमेंट बुक करनी है।"',
    agentReply: '"ज़रूर! आपके लिए कौन-सी तारीख सही रहेगी?"',
    accents: [
      { id: "hi-delhi", label: "Delhi", countryCode: "in" },
      { id: "hi-mumbai", label: "Mumbai", countryCode: "in" },
      { id: "hi-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "tamil",
    name: "Tamil",
    nativeName: "தமிழ்",
    countryCode: "in",
    callerLine: 'Caller: "நான் ஒரு சந்திப்பை முன்பதிவு செய்ய விரும்புகிறேன்."',
    agentReply: '"நிச்சயமாக! உங்களுக்கு எந்த தேதி வசதியாக இருக்கும்?"',
    accents: [
      { id: "ta-chennai", label: "Chennai", countryCode: "in" },
      { id: "ta-madurai", label: "Madurai", countryCode: "in" },
      { id: "ta-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "telugu",
    name: "Telugu",
    nativeName: "తెలుగు",
    countryCode: "in",
    callerLine: 'Caller: "నాకు అపాయింట్మెంట్ బుక్ చేయాలి."',
    agentReply: '"ఖచ్చితంగా! మీకు ఏ తేదీ సరిపోతుంది?"',
    accents: [
      { id: "te-hyderabad", label: "Hyderabad", countryCode: "in" },
      { id: "te-vijayawada", label: "Vijayawada", countryCode: "in" },
      { id: "te-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "bengali",
    name: "Bengali",
    nativeName: "বাংলা",
    countryCode: "in",
    callerLine: 'Caller: "আমি একটি অ্যাপয়েন্টমেন্ট বুক করতে চাই।"',
    agentReply: '"অবশ্যই! আপনার জন্য কোন তারিখটি সুবিধাজনক?"',
    accents: [
      { id: "bn-kolkata", label: "Kolkata", countryCode: "in" },
      { id: "bn-dhaka", label: "Dhaka", countryCode: "bd" },
      { id: "bn-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "marathi",
    name: "Marathi",
    nativeName: "मराठी",
    countryCode: "in",
    callerLine: 'Caller: "मला भेटीची वेळ बुक करायची आहे."',
    agentReply: '"नक्कीच! तुमच्यासाठी कोणती तारीख योग्य असेल?"',
    accents: [
      { id: "mr-mumbai", label: "Mumbai", countryCode: "in" },
      { id: "mr-pune", label: "Pune", countryCode: "in" },
      { id: "mr-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "gujarati",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    countryCode: "in",
    callerLine: 'Caller: "હું એપોઇન્ટમેન્ટ બુક કરવા માંગુ છું."',
    agentReply: '"ચોક્કસ! તમારા માટે કઈ તારીખ યોગ્ય રહેશે?"',
    accents: [
      { id: "gu-ahmedabad", label: "Ahmedabad", countryCode: "in" },
      { id: "gu-surat", label: "Surat", countryCode: "in" },
      { id: "gu-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "kannada",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    countryCode: "in",
    callerLine: 'Caller: "ನಾನು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ."',
    agentReply: '"ಖಂಡಿತ! ನಿಮಗೆ ಯಾವ ದಿನಾಂಕ ಸೂಕ್ತವಾಗಿದೆ?"',
    accents: [
      { id: "kn-bengaluru", label: "Bengaluru", countryCode: "in" },
      { id: "kn-mysuru", label: "Mysuru", countryCode: "in" },
      { id: "kn-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "malayalam",
    name: "Malayalam",
    nativeName: "മലയാളം",
    countryCode: "in",
    callerLine: 'Caller: "എനിക്ക് ഒരു അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യണം."',
    agentReply: '"തീർച്ചയായും! നിങ്ങൾക്ക് ഏത് തീയതി അനുയോജ്യമാണ്?"',
    accents: [
      { id: "ml-kochi", label: "Kochi", countryCode: "in" },
      { id: "ml-thiruvananthapuram", label: "Thiruvananthapuram", countryCode: "in" },
      { id: "ml-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "punjabi",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    countryCode: "in",
    callerLine: 'Caller: "ਮੈਂ ਇੱਕ ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰਨੀ ਚਾਹੁੰਦਾ ਹਾਂ."',
    agentReply: '"ਜ਼ਰੂਰ! ਤੁਹਾਡੇ ਲਈ ਕਿਹੜੀ ਤਾਰੀਖ ਠੀਕ ਰਹੇਗੀ?"',
    accents: [
      { id: "pa-amritsar", label: "Amritsar", countryCode: "in" },
      { id: "pa-ludhiana", label: "Ludhiana", countryCode: "in" },
      { id: "pa-standard", label: "Standard", countryCode: "in" },
    ],
  },
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    countryCode: "es",
    callerLine: 'Caller: "Quisiera reservar una cita."',
    agentReply: '"¡Claro! ¿Qué fecha le viene mejor?"',
    accents: [
      { id: "es-es", label: "Spain", countryCode: "es" },
      { id: "es-mx", label: "Mexican", countryCode: "mx" },
      { id: "es-ar", label: "Argentine", countryCode: "ar" },
      { id: "es-co", label: "Colombian", countryCode: "co" },
    ],
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    countryCode: "fr",
    callerLine: 'Caller: "Je voudrais prendre rendez-vous."',
    agentReply: '"Bien sûr ! Quelle date vous convient ?"',
    accents: [
      { id: "fr-paris", label: "Parisian", countryCode: "fr" },
      { id: "fr-qc", label: "Québec", countryCode: "ca" },
      { id: "fr-be", label: "Belgian", countryCode: "be" },
    ],
  },
  {
    id: "german",
    name: "German",
    nativeName: "Deutsch",
    countryCode: "de",
    callerLine: 'Caller: "Ich möchte einen Termin buchen."',
    agentReply: '"Natürlich! Welches Datum passt Ihnen?"',
    accents: [
      { id: "de-standard", label: "Standard", countryCode: "de" },
      { id: "de-at", label: "Austrian", countryCode: "at" },
      { id: "de-ch", label: "Swiss", countryCode: "ch" },
    ],
  },
  {
    id: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    countryCode: "br",
    callerLine: 'Caller: "Gostaria de marcar uma consulta."',
    agentReply: '"Claro! Qual data funciona melhor para você?"',
    accents: [
      { id: "pt-br", label: "Brazilian", countryCode: "br" },
      { id: "pt-pt", label: "European", countryCode: "pt" },
    ],
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    countryCode: "jp",
    callerLine: "Caller: 「予約を取りたいのですが。」",
    agentReply: "「かしこまりました。ご都合のよい日はいつですか？」",
    accents: [
      { id: "ja-tokyo", label: "Tokyo", countryCode: "jp" },
      { id: "ja-osaka", label: "Osaka", countryCode: "jp" },
    ],
  },
  {
    id: "chinese",
    name: "Chinese",
    nativeName: "中文",
    countryCode: "cn",
    callerLine: "Caller: 「我想预约。」",
    agentReply: "「好的！您方便哪一天？」",
    accents: [
      { id: "zh-mandarin", label: "Mandarin", countryCode: "cn" },
      { id: "zh-tw", label: "Taiwanese", countryCode: "tw" },
      { id: "zh-hk", label: "Cantonese", countryCode: "hk" },
    ],
  },
  {
    id: "arabic",
    name: "Arabic",
    nativeName: "عربي",
    countryCode: "sa",
    callerLine: 'Caller: "أود حجز موعد."',
    agentReply: '"بالتأكيد! ما التاريخ المناسب لك؟"',
    accents: [
      { id: "ar-gulf", label: "Gulf", countryCode: "ae" },
      { id: "ar-sa", label: "Saudi", countryCode: "sa" },
      { id: "ar-eg", label: "Egyptian", countryCode: "eg" },
    ],
  },
  {
    id: "korean",
    name: "Korean",
    nativeName: "한국어",
    countryCode: "kr",
    callerLine: 'Caller: "예약하고 싶어요."',
    agentReply: '"네! 어떤 날짜가 편하세요?"',
    accents: [
      { id: "ko-seoul", label: "Seoul", countryCode: "kr" },
      { id: "ko-busan", label: "Busan", countryCode: "kr" },
    ],
  },
  {
    id: "italian",
    name: "Italian",
    nativeName: "Italiano",
    countryCode: "it",
    callerLine: 'Caller: "Vorrei prenotare un appuntamento."',
    agentReply: '"Certo! Quale data le va bene?"',
    accents: [
      { id: "it-standard", label: "Standard", countryCode: "it" },
      { id: "it-south", label: "Southern", countryCode: "it" },
    ],
  },
  {
    id: "russian",
    name: "Russian",
    nativeName: "Русский",
    countryCode: "ru",
    callerLine: 'Caller: "Я хотел бы записаться."',
    agentReply: '"Конечно! Какая дата вам подходит?"',
    accents: [
      { id: "ru-moscow", label: "Moscow", countryCode: "ru" },
      { id: "ru-standard", label: "Standard", countryCode: "ru" },
    ],
  },
] as const;

export const LANGUAGES_TOTAL_COUNT = "100+";
export const LANGUAGES_GRID_VISIBLE = FEATURED_LANGUAGES.length;

export type LanguageDisplayGroup = "featured" | "india" | "global";

const INDIAN_LANGUAGE_IDS = new Set([
  "hindi",
  "tamil",
  "telugu",
  "bengali",
  "marathi",
  "gujarati",
  "kannada",
  "malayalam",
  "punjabi",
]);

export const LANGUAGE_GROUP_ORDER: readonly LanguageDisplayGroup[] = ["featured", "india", "global"];

export const LANGUAGE_GROUP_LABELS: Record<LanguageDisplayGroup, string | null> = {
  featured: null,
  india: "Indian languages",
  global: "Global languages",
};

export function getLanguageDisplayGroup(id: string): LanguageDisplayGroup {
  if (id === "english") return "featured";
  if (INDIAN_LANGUAGE_IDS.has(id)) return "india";
  return "global";
}

export function getGroupedLanguages(): {
  group: LanguageDisplayGroup;
  label: string | null;
  languages: FeaturedLanguage[];
}[] {
  return LANGUAGE_GROUP_ORDER.map((group) => ({
    group,
    label: LANGUAGE_GROUP_LABELS[group],
    languages: FEATURED_LANGUAGES.filter((lang) => getLanguageDisplayGroup(lang.id) === group),
  })).filter((entry) => entry.languages.length > 0);
}
