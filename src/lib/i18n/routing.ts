import { DEFAULT_LOCALE, LOCALES, SEGMENTS, isLocale, sectionKind, type Locale } from "./config";
import {
  canonicalCategory,
  canonicalToolSlug,
  categorySlugFor,
  toolSlugFor,
} from "@/lib/tools/localize";
import type { ToolCategory } from "@/lib/tools/types";
import { findGuideBySlug, guideSlugFor } from "@/lib/guides/registry";
import { SITE_URL } from "@/lib/brand";

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

export function premiumParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].premium };
}

export function privacyParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].privacy };
}

export function cookiesParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].cookies };
}

export function termsParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].terms };
}

export function aboutParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].about };
}

export function loginParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].login };
}

export function registerParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].register };
}

export function forgotPasswordParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].forgotPassword };
}

export function accountParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].account };
}

export function guidesHubParams(locale: Locale) {
  return { lang: locale, section: SEGMENTS[locale].guides };
}

export function toolParams(locale: Locale, canonicalSlug: string) {
  return {
    lang: locale,
    section: SEGMENTS[locale].tools,
    slug: toolSlugFor(locale, canonicalSlug),
  };
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

export function guidesHubPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].guides}`;
}

export function premiumPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].premium}`;
}

export function privacyPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].privacy}`;
}

export function cookiesPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].cookies}`;
}

export function termsPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].terms}`;
}

export function aboutPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].about}`;
}

export function loginPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].login}`;
}

export function registerPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].register}`;
}

export function forgotPasswordPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].forgotPassword}`;
}

export function accountPath(locale: Locale) {
  return `/${locale}/${SEGMENTS[locale].account}`;
}

export function toolPath(locale: Locale, canonicalSlug: string) {
  return `/${locale}/${SEGMENTS[locale].tools}/${toolSlugFor(locale, canonicalSlug)}`;
}

export function categoryPath(locale: Locale, category: ToolCategory) {
  return `/${locale}/${SEGMENTS[locale].category}/${categorySlugFor(locale, category)}`;
}

export function guidePath(locale: Locale, canonicalSlug: string) {
  return `/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, canonicalSlug)}`;
}

export type PageRef =
  | { kind: "home" }
  | { kind: "catalog" }
  | { kind: "guidesHub" }
  | { kind: "privacy" }
  | { kind: "cookies" }
  | { kind: "terms" }
  | { kind: "about" }
  | { kind: "premium" }
  | { kind: "login" }
  | { kind: "register" }
  | { kind: "forgotPassword" }
  | { kind: "account" }
  | { kind: "tool"; canonicalSlug: string }
  | { kind: "category"; category: ToolCategory }
  | { kind: "guide"; canonicalSlug: string }
  | { kind: "unknown" };

/** Reads a pathname and returns the locale plus a locale-independent page ref. */
export function parsePath(pathname: string): { locale: Locale; page: PageRef } {
  const [langSegment, section, slug] = pathname.split("/").filter(Boolean);
  const locale = langSegment && isLocale(langSegment) ? langSegment : DEFAULT_LOCALE;
  if (!section) return { locale, page: { kind: "home" } };

  const kind = sectionKind(locale, section);
  if (kind === "privacy") return { locale, page: { kind: "privacy" } };
  if (kind === "cookies") return { locale, page: { kind: "cookies" } };
  if (kind === "terms") return { locale, page: { kind: "terms" } };
  if (kind === "about") return { locale, page: { kind: "about" } };
  if (kind === "premium") return { locale, page: { kind: "premium" } };
  if (kind === "login") return { locale, page: { kind: "login" } };
  if (kind === "register") return { locale, page: { kind: "register" } };
  if (kind === "forgotPassword") return { locale, page: { kind: "forgotPassword" } };
  if (kind === "account") return { locale, page: { kind: "account" } };
  if (kind === "tools") {
    if (!slug) return { locale, page: { kind: "catalog" } };
    const canonicalSlug = canonicalToolSlug(locale, slug);
    return { locale, page: canonicalSlug ? { kind: "tool", canonicalSlug } : { kind: "unknown" } };
  }
  if (kind === "category" && slug) {
    const category = canonicalCategory(locale, slug);
    return { locale, page: category ? { kind: "category", category } : { kind: "unknown" } };
  }
  if (kind === "guides") {
    if (!slug) return { locale, page: { kind: "guidesHub" } };
    const guide = findGuideBySlug(locale, slug);
    return { locale, page: guide ? { kind: "guide", canonicalSlug: guide.canonicalSlug } : { kind: "unknown" } };
  }
  return { locale, page: { kind: "unknown" } };
}

export function pathFor(locale: Locale, page: PageRef): string {
  switch (page.kind) {
    case "home":
      return homePath(locale);
    case "catalog":
      return catalogPath(locale);
    case "guidesHub":
      return guidesHubPath(locale);
    case "privacy":
      return privacyPath(locale);
    case "cookies":
      return cookiesPath(locale);
    case "terms":
      return termsPath(locale);
    case "about":
      return aboutPath(locale);
    case "premium":
      return premiumPath(locale);
    case "login":
      return loginPath(locale);
    case "register":
      return registerPath(locale);
    case "forgotPassword":
      return forgotPasswordPath(locale);
    case "account":
      return accountPath(locale);
    case "tool":
      return toolPath(locale, page.canonicalSlug);
    case "category":
      return categoryPath(locale, page.category);
    case "guide":
      return guidePath(locale, page.canonicalSlug);
    default:
      return homePath(locale);
  }
}

/** Same page in another language, used by the language switcher. */
export function translatePath(pathname: string, target: Locale): string {
  const { page } = parsePath(pathname);
  return pathFor(target, page);
}

/** rel=alternate hreflang links plus the canonical for the current page (absolute URLs for SEO). */
export function alternateLinks(locale: Locale, page: PageRef) {
  const links = LOCALES.map((item) => ({
    rel: "alternate",
    hrefLang: item,
    href: `${SITE_URL}${pathFor(item, page)}`,
  }));
  return [
    { rel: "canonical", href: `${SITE_URL}${pathFor(locale, page)}` },
    ...links,
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${pathFor(DEFAULT_LOCALE, page)}` },
  ];
}
