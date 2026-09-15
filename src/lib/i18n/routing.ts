import {
  DEFAULT_LOCALE,
  LOCALES,
  SEGMENTS,
  isLocale,
  sectionKind,
  type Locale,
} from "./config";
import {
  canonicalCategory,
  canonicalToolSlug,
  categorySlugFor,
  toolSlugFor,
} from "@/lib/tools/localize";
import type { ToolCategory } from "@/lib/tools/types";

/** Route descriptors used with <Link to=... params=...>. */
export const HOME_ROUTE = "/$lang" as const;
export const SECTION_ROUTE = "/$lang/$section" as const;
export const DETAIL_ROUTE = "/$lang/$section/$slug" as const;

export function homeParams(locale: Locale) {
  return { lang: locale };
}

export function catalogParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].tools };
}

export function privacyParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].privacy };
}

export function toolParams(locale: Locale, canonicalSlug: string) {
  return { lang: locale, section: SEGMENTS[locale].tools, slug: toolSlugFor(locale, canonicalSlug) };
}

export function categoryParams(locale: Locale, category: ToolCategory) {
  return {
    lang: locale,
    section: SEGMENTS[locale].category,
    slug: categorySlugFor(locale, category),
  };
}

/** Plain string paths, for canonical/hreflang metadata. */
export function homePath(locale: Locale) {
  return `/${locale}`;
}

export function catalogPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].tools}`;
}

export function privacyPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].privacy}`;
}

export function toolPath(locale: Locale, canonicalSlug: string) {
  return `/${locale}/${SEGMENTS[locale].tools}/${toolSlugFor(locale, canonicalSlug)}`;
}

export function categoryPath(locale: Locale, category: ToolCategory) {
  return `/${locale}/${SEGMENTS[locale].category}/${categorySlugFor(locale, category)}`;
}

export type PageRef =
  | { kind: "home" }
  | { kind: "catalog" }
  | { kind: "privacy" }
  | { kind: "tool"; canonicalSlug: string }
  | { kind: "category"; category: ToolCategory }
  | { kind: "unknown" };

/** Reads a pathname and returns the locale plus a locale-independent page ref. */
export function parsePath(pathname: string): { locale: Locale; page: PageRef } {
  const [langSegment, section, slug] = pathname.split("/").filter(Boolean);
  const locale = langSegment && isLocale(langSegment) ? langSegment : DEFAULT_LOCALE;
  if (!section) return { locale, page: { kind: "home" } };

  const kind = sectionKind(locale, section);
  if (kind === "privacy") return { locale, page: { kind: "privacy" } };
  if (kind === "tools") {
    if (!slug) return { locale, page: { kind: "catalog" } };
    const canonicalSlug = canonicalToolSlug(locale, slug);
    return { locale, page: canonicalSlug ? { kind: "tool", canonicalSlug } : { kind: "unknown" } };
  }
  if (kind === "category" && slug) {
    const category = canonicalCategory(locale, slug);
    return { locale, page: category ? { kind: "category", category } : { kind: "unknown" } };
  }
  return { locale, page: { kind: "unknown" } };
}

export function pathFor(locale: Locale, page: PageRef): string {
  switch (page.kind) {
    case "home":
      return homePath(locale);
    case "catalog":
      return catalogPath(locale);
    case "privacy":
      return privacyPath(locale);
    case "tool":
      return toolPath(locale, page.canonicalSlug);
    case "category":
      return categoryPath(locale, page.category);
    default:
      return homePath(locale);
  }
}

/** Same page in another language, used by the language switcher. */
export function translatePath(pathname: string, target: Locale): string {
  const { page } = parsePath(pathname);
  return pathFor(target, page);
}

/** rel=alternate hreflang links plus the canonical for the current page. */
export function alternateLinks(locale: Locale, page: PageRef) {
  const links = LOCALES.map((item) => ({
    rel: "alternate",
    hrefLang: item,
    href: pathFor(item, page),
  }));
  return [
    { rel: "canonical", href: pathFor(locale, page) },
    ...links,
    { rel: "alternate", hrefLang: "x-default", href: pathFor(DEFAULT_LOCALE, page) },
  ];
}
