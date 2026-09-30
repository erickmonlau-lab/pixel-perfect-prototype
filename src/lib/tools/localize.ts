import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { CATEGORIES, TOOLS } from "./registry";
import { POPULAR_SLUGS, ROADMAP_TOOLS, type RoadmapTool } from "./catalog";
import { CATEGORY_TEXT, ROADMAP_TEXT, type ToolText } from "./translations";
import { TOOL_SLUGS } from "./tool-slugs";
import type { OptionField, ToolCategory, ToolDefinition } from "./types";

/**
 * Builds the localised view of the catalogue. Processing logic (`run`) is never
 * touched: only slugs and copy change per locale.
 */

export type LocalizedTool = ToolDefinition & { canonicalSlug: string };

export type LocalizedCategory = {
  category: ToolCategory;
  slug: string;
  name: string;
  description: string;
};

type TranslatedLocale = Exclude<Locale, "es">;

function isTranslated(locale: Locale): locale is TranslatedLocale {
  return locale !== DEFAULT_LOCALE;
}

function textFor(locale: Locale, canonicalSlug: string): ToolText | undefined {
  if (!isTranslated(locale)) return undefined;
  return TOOL_TEXT[locale]?.[canonicalSlug];
}

/** Per-locale tool copy is code-split; loaded before rendering any locale route. */
const TOOL_TEXT: Partial<Record<TranslatedLocale, Record<string, ToolText>>> = {};

const pending = new Map<Locale, Promise<void>>();

/** Promise to suspend on while a locale's copy loads, or null when already available. */
export function localeTextPending(locale: Locale): Promise<void> | null {
  if (!isTranslated(locale) || TOOL_TEXT[locale]) return null;
  let promise = pending.get(locale);
  if (!promise) {
    promise = loadLocaleText(locale);
    pending.set(locale, promise);
  }
  return promise;
}

export async function loadLocaleText(locale: Locale): Promise<void> {
  if (!isTranslated(locale) || TOOL_TEXT[locale]) return;
  const mod = locale === "ca" ? await import("./translations-ca") : await import("./translations-en");
  TOOL_TEXT[locale] = mod.default;
  toolCache.delete(locale);
}

function localizeOptions(options: OptionField[] | undefined, text: ToolText | undefined) {
  if (!options) return undefined;
  if (!text?.options) return options;
  return options.map((option): OptionField => {
    const patch = text.options?.[option.key];
    if (!patch) return option;
    const label = patch.label ?? option.label;
    const help = patch.help ?? option.help;
    const base = { ...option, label, ...(help === undefined ? {} : { help }) };
    if (base.type === "text") {
      const placeholder = patch.placeholder ?? base.placeholder;
      return { ...base, ...(placeholder === undefined ? {} : { placeholder }) };
    }
    if (base.type === "select") {
      return {
        ...base,
        options: base.options.map((choice) => ({
          ...choice,
          label: patch.choices?.[choice.value] ?? choice.label,
        })),
      };
    }
    return base;
  });
}

function localizeTool(tool: ToolDefinition, locale: Locale): LocalizedTool {
  const text = textFor(locale, tool.slug);
  if (!text) {
    const slug = isTranslated(locale) ? TOOL_SLUGS[locale][tool.slug] : undefined;
    return { ...tool, canonicalSlug: tool.slug, ...(slug ? { slug } : {}) };
  }
  const pendingReason = text.pendingReason ?? tool.pendingReason;
  const options = localizeOptions(tool.options, text);
  return {
    ...tool,
    canonicalSlug: tool.slug,
    slug: text.slug,
    name: text.name,
    h1: text.h1,
    tagline: text.tagline,
    seoTitle: text.seoTitle,
    seoDescription: text.seoDescription,
    ctaLabel: text.ctaLabel,
    keywords: text.keywords,
    howItWorks: text.howItWorks,
    faq: text.faq,
    ...(pendingReason === undefined ? {} : { pendingReason }),
    ...(options === undefined ? {} : { options }),
  };
}

const toolCache = new Map<Locale, LocalizedTool[]>();

export function localizedTools(locale: Locale): LocalizedTool[] {
  const cached = toolCache.get(locale);
  if (cached) return cached;
  const built = TOOLS.map((tool) => localizeTool(tool, locale));
  if (!isTranslated(locale) || TOOL_TEXT[locale]) toolCache.set(locale, built);
  return built;
}

const categoryCache = new Map<Locale, LocalizedCategory[]>();

export function localizedCategories(locale: Locale): LocalizedCategory[] {
  const cached = categoryCache.get(locale);
  if (cached) return cached;
  const loc = locale;
  const built = Object.values(CATEGORIES).map((category): LocalizedCategory => {
    if (!isTranslated(loc)) {
      return {
        category: category.slug,
        slug: category.slug,
        name: category.name,
        description: category.description,
      };
    }
    const text = CATEGORY_TEXT[loc][category.slug]!;
    return { category: category.slug, ...text };
  });
  categoryCache.set(locale, built);
  return built;
}

export function localizedCategory(locale: Locale, category: ToolCategory): LocalizedCategory {
  const found = localizedCategories(locale).find((item) => item.category === category);
  // Every ToolCategory has an entry, so this fallback is unreachable in practice.
  return found ?? { category, slug: category, name: category, description: "" };
}

export function findCategoryBySlug(locale: Locale, slug: string): LocalizedCategory | undefined {
  return localizedCategories(locale).find((item) => item.slug === slug);
}

export function findToolBySlug(locale: Locale, slug: string): LocalizedTool | undefined {
  return localizedTools(locale).find((tool) => tool.slug === slug);
}

export function toolSlugFor(locale: Locale, canonicalSlug: string): string {
  return (isTranslated(locale) ? TOOL_SLUGS[locale][canonicalSlug] : undefined) ?? canonicalSlug;
}

export function categorySlugFor(locale: Locale, category: ToolCategory): string {
  return localizedCategory(locale, category).slug;
}

/** Canonical slug for a slug written in `locale` (used to translate URLs). */
export function canonicalToolSlug(locale: Locale, slug: string): string | undefined {
  return findToolBySlug(locale, slug)?.canonicalSlug;
}

export function canonicalCategory(locale: Locale, slug: string): ToolCategory | undefined {
  return findCategoryBySlug(locale, slug)?.category;
}

export function localizedToolsByCategory(locale: Locale, category: ToolCategory): LocalizedTool[] {
  return localizedTools(locale).filter((tool) => tool.category === category);
}

export function localizedPopular(locale: Locale): LocalizedTool[] {
  const all = localizedTools(locale);
  return POPULAR_SLUGS.map((slug) => all.find((tool) => tool.canonicalSlug === slug)).filter(
    (tool): tool is LocalizedTool => Boolean(tool),
  );
}

export function localizedRelated(locale: Locale, tool: LocalizedTool, limit = 4): LocalizedTool[] {
  const all = localizedTools(locale);
  const sameCategory = all.filter(
    (item) => item.category === tool.category && item.slug !== tool.slug,
  );
  const others = all.filter((item) => item.category !== tool.category && item.status === "live");
  return [...sameCategory, ...others].slice(0, limit);
}

export function localizedRoadmap(locale: Locale): RoadmapTool[] {
  if (!isTranslated(locale)) return ROADMAP_TOOLS;
  const loc = locale;
  return ROADMAP_TOOLS.map((tool) => {
    const text = ROADMAP_TEXT[loc][tool.name];
    return text ? { ...tool, name: text.name, tagline: text.tagline } : tool;
  });
}

export function localizedRoadmapByCategory(locale: Locale, category: ToolCategory): RoadmapTool[] {
  return localizedRoadmap(locale).filter((tool) => tool.category === category);
}

function normalizeSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function isSubsequence(needle: string, hay: string): boolean {
  let i = 0;
  for (const char of hay) {
    if (char === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return i === needle.length;
}

/** Locale-aware fuzzy search over the localised names, keywords, canonical slugs and taglines with accent normalization. */
export function searchLocalizedTools(locale: Locale, query: string): LocalizedTool[] {
  const q = normalizeSearch(query);
  const all = localizedTools(locale);
  if (!q) return all;

  const score = (tool: LocalizedTool): number => {
    // Check direct matches across key fields
    const nameNorm = normalizeSearch(tool.name);
    const slugNorm = normalizeSearch(tool.slug);
    const canonicalNorm = normalizeSearch(tool.canonicalSlug);
    const categoryNorm = normalizeSearch(tool.category);
    const taglineNorm = normalizeSearch(tool.tagline);
    const keywordsNorm = tool.keywords.map(normalizeSearch);

    // Exact matches
    if (nameNorm === q || slugNorm === q || canonicalNorm === q) return 1000;
    if (nameNorm.startsWith(q)) return 500;
    if (nameNorm.includes(q)) return 300;

    // Keyword matches
    for (const kw of keywordsNorm) {
      if (kw === q) return 250;
      if (kw.startsWith(q)) return 180;
      if (kw.includes(q)) return 120;
    }

    // Slug / canonical matches
    if (slugNorm.startsWith(q) || canonicalNorm.startsWith(q)) return 100;
    if (slugNorm.includes(q) || canonicalNorm.includes(q)) return 80;

    // Tagline matches
    if (taglineNorm.includes(q)) return 50;

    // Category matches
    if (categoryNorm.startsWith(q) || categoryNorm === q) return 40;

    // Subsequence on tool name
    if (isSubsequence(q, nameNorm)) return 20;

    return 0;
  };

  return all
    .map((tool) => ({ tool, value: score(tool) }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value)
    .map((entry) => entry.tool);
}

export function liveCount(): number {
  return TOOLS.filter((tool) => tool.status === "live").length;
}

export function soonCount(): number {
  return ROADMAP_TOOLS.length + TOOLS.filter((tool) => tool.status === "pending").length;
}
