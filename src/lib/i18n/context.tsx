import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { UI, type Dict } from "./ui";
import {
  localizedCategories,
  localizedRoadmap,
  localizedTools,
  type LocalizedCategory,
  type LocalizedTool,
} from "@/lib/tools/localize";
import type { RoadmapTool } from "@/lib/tools/catalog";

type LocaleContextValue = {
  locale: Locale;
  t: Dict;
  tools: LocalizedTool[];
  categories: LocalizedCategory[];
  roadmap: RoadmapTool[];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function createLocaleValue(locale: Locale): LocaleContextValue {
  return {
    locale,
    t: UI[locale],
    tools: localizedTools(locale),
    categories: localizedCategories(locale),
    roadmap: localizedRoadmap(locale),
  };
}

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(
    () => createLocaleValue(locale),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) {
    return createLocaleValue(DEFAULT_LOCALE);
  }
  return value;
}

/** Convenient alias providing { lang, locale, t } for components */
export function useI18n() {
  const { locale, t } = useLocale();
  return { lang: locale, locale, t };
}
