import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { CATEGORIES, TOOLS } from "./registry";
import { POPULAR_SLUGS, ROADMAP_TOOLS, type RoadmapTool } from "./catalog";
import { CATEGORY_TEXT, ROADMAP_TEXT, TOOL_TEXT, type ToolText } from "./translations";
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
  return TOOL_TEXT[locale][canonicalSlug];
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
  if (!text) return { ...tool, canonicalSlug: tool.slug };
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
  toolCache.set(locale, built);
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
  return (
    found ?? { category, slug: category, name: category, description: "" }
  );
}

export function findCategoryBySlug(locale: Locale, slug: string): LocalizedCategory | undefined {
  return localizedCategories(locale).find((item) => item.slug === slug);
}

export function findToolBySlug(locale: Locale, slug: string): LocalizedTool | undefined {
  return localizedTools(locale).find((tool) => tool.slug === slug);
}

export function toolSlugFor(locale: Locale, canonicalSlug: string): string {
  return textFor(locale, canonicalSlug)?.slug ?? canonicalSlug;
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

function isSubsequence(needle: string, hay: string): boolean {
  let i = 0;
  for (const char of hay) {
    if (char === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return i === needle.length;
}

/** Locale-aware fuzzy search over the localised names, keywords and taglines. */
export function searchLocalizedTools(locale: Locale, query: string): LocalizedTool[] {
  const q = query.trim().toLowerCase();
  const all = localizedTools(locale);
  if (!q) return all;

  const score = (tool: LocalizedTool): number => {
    const haystacks = [tool.name, ...tool.keywords, tool.tagline].map((h) => h.toLowerCase());
    let best = 0;
    for (const [index, hay] of haystacks.entries()) {
      const weight = index === 0 ? 3 : index < tool.keywords.length + 1 ? 2 : 1;
      if (hay === q) best = Math.max(best, 100 * weight);
      else if (hay.startsWith(q)) best = Math.max(best, 60 * weight);
      else if (hay.includes(q)) best = Math.max(best, 40 * weight);
      else if (isSubsequence(q, hay)) best = Math.max(best, 12 * weight);
    }
    return best;
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
