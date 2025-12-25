export const locales = [
  "en", // English
  "zh", // Chinese (Mandarin)
  "hi", // Hindi
  "es", // Spanish
  "ar", // Arabic
  "fr", // French
  "bn", // Bengali
  "pt", // Portuguese
  "ru", // Russian
  "ur", // Urdu
  "id", // Indonesian
  "de", // German
  "ja", // Japanese
  "sw", // Swahili
  "mr", // Marathi
  "te", // Telugu
  "tr", // Turkish
  "ta", // Tamil
  "vi", // Vietnamese
  "ko", // Korean
  "it", // Italian
  "th", // Thai
  "gu", // Gujarati
  "pl", // Polish
  "uk", // Ukrainian
  "fa", // Persian (Farsi)
  "ml", // Malayalam
  "kn", // Kannada
  "or", // Odia
  "my", // Burmese
] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  hi: "हिन्दी",
  es: "Español",
  ar: "العربية",
  fr: "Français",
  bn: "বাংলা",
  pt: "Português",
  ru: "Русский",
  ur: "اردو",
  id: "Bahasa Indonesia",
  de: "Deutsch",
  ja: "日本語",
  sw: "Kiswahili",
  mr: "मराठी",
  te: "తెలుగు",
  tr: "Türkçe",
  ta: "தமிழ்",
  vi: "Tiếng Việt",
  ko: "한국어",
  it: "Italiano",
  th: "ไทย",
  gu: "ગુજરાતી",
  pl: "Polski",
  uk: "Українська",
  fa: "فارسی",
  ml: "മലയാളം",
  kn: "ಕನ್ನಡ",
  or: "ଓଡ଼ିଆ",
  my: "မြန်မာဘာသာ",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  zh: "🇨🇳",
  hi: "🇮🇳",
  es: "🇪🇸",
  ar: "🇸🇦",
  fr: "🇫🇷",
  bn: "🇧🇩",
  pt: "🇵🇹",
  ru: "🇷🇺",
  ur: "🇵🇰",
  id: "🇮🇩",
  de: "🇩🇪",
  ja: "🇯🇵",
  sw: "🇰🇪",
  mr: "🇮🇳",
  te: "🇮🇳",
  tr: "🇹🇷",
  ta: "🇮🇳",
  vi: "🇻🇳",
  ko: "🇰🇷",
  it: "🇮🇹",
  th: "🇹🇭",
  gu: "🇮🇳",
  pl: "🇵🇱",
  uk: "🇺🇦",
  fa: "🇮🇷",
  ml: "🇮🇳",
  kn: "🇮🇳",
  or: "🇮🇳",
  my: "🇲🇲",
}
