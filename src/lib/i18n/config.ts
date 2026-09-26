/**
 * Locale configuration for BreadPDF.
 * URLs are localised: /es/herramientas/comprimir-pdf, /ca/eines/comprimeix-pdf,
 * /en/tools/compress-pdf. Every locale uses the same route files with a
 * localised `$section` segment.
 */

import { BRAND_NAME } from "@/lib/brand";

export { BRAND_NAME };

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

export type SectionKind = "tools" | "category" | "privacy" | "cookies" | "terms" | "guides" | "premium" | "login" | "register" | "forgotPassword" | "account";

/** Localised URL segments. Keep them unique inside each locale. */
export const SEGMENTS: Record<Locale, Record<SectionKind, string>> = {
  es: { tools: "herramientas", category: "categoria", privacy: "privacidad", cookies: "cookies", terms: "terminos", guides: "guias", premium: "premium", login: "login", register: "registro", forgotPassword: "recuperar-password", account: "cuenta" },
  ca: { tools: "eines", category: "categoria", privacy: "privacitat", cookies: "cookies", terms: "termes", guides: "guies", premium: "premium", login: "login", register: "registre", forgotPassword: "recuperar-contrasenya", account: "compte" },
  en: { tools: "tools", category: "category", privacy: "privacy", cookies: "cookies", terms: "terms", guides: "guides", premium: "premium", login: "login", register: "register", forgotPassword: "forgot-password", account: "account" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function sectionKind(locale: Locale, segment: string): SectionKind | undefined {
  const map = SEGMENTS[locale];
  if (segment === map.tools) return "tools";
  if (segment === map.category) return "category";
  if (segment === map.privacy) return "privacy";
  if (segment === map.cookies) return "cookies";
  if (segment === map.terms) return "terms";
  if (segment === map.guides) return "guides";
  if (segment === map.premium) return "premium";
  if (segment === map.login) return "login";
  if (segment === map.register) return "register";
  if (segment === map.forgotPassword) return "forgotPassword";
  if (segment === map.account) return "account";
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

export const LOCALE_STORAGE_KEY = "breadpdf.locale";
const LEGACY_LOCALE_STORAGE_KEY = "arvio.locale";

/** Stored manual preference, if any. Browser only. Migrates legacy arvio.locale if present. */
export function storedLocale(): Locale | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    let value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (!value) {
      const legacy = window.localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY);
      if (legacy && isLocale(legacy)) {
        value = legacy;
        try {
          window.localStorage.setItem(LOCALE_STORAGE_KEY, legacy);
          window.localStorage.removeItem(LEGACY_LOCALE_STORAGE_KEY);
        } catch {
          // ignore write errors
        }
      }
    }
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
