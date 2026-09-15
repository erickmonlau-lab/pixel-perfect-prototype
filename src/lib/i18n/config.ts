/**
 * Locale configuration for ARVIO.
 * URLs are localised: /es/herramientas/comprimir-pdf, /ca/eines/comprimeix-pdf,
 * /en/tools/compress-pdf. Every locale uses the same route files with a
 * localised `$section` segment.
 */

export const LOCALES = ["es", "ca", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  ca: "Català",
  en: "English",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  es: "ES",
  ca: "CA",
  en: "EN",
};

/** Value used for <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  es: "es",
  ca: "ca",
  en: "en",
};

export type SectionKind = "tools" | "category" | "privacy";

/** Localised URL segments. Keep them unique inside each locale. */
export const SEGMENTS: Record<Locale, Record<SectionKind, string>> = {
  es: { tools: "herramientas", category: "categoria", privacy: "privacidad" },
  ca: { tools: "eines", category: "categoria", privacy: "privacitat" },
  en: { tools: "tools", category: "category", privacy: "privacy" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function sectionKind(locale: Locale, segment: string): SectionKind | undefined {
  const map = SEGMENTS[locale];
  if (segment === map.tools) return "tools";
  if (segment === map.category) return "category";
  if (segment === map.privacy) return "privacy";
  return undefined;
}

/** Maps browser language tags to a supported locale. */
export function detectLocale(tags: readonly string[]): Locale {
  for (const tag of tags) {
    const base = tag.toLowerCase().split("-")[0];
    if (base && isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export const LOCALE_STORAGE_KEY = "arvio.locale";

/** Stored manual preference, if any. Browser only. */
export function storedLocale(): Locale | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return value && isLocale(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

export function rememberLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage disabled */
  }
}

/** Preferred locale for a visitor: manual choice first, then the browser. */
export function preferredLocale(): Locale {
  const stored = storedLocale();
  if (stored) return stored;
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  return detectLocale(navigator.languages ?? [navigator.language]);
}
