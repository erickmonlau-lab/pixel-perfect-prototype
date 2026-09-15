import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
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

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: UI[locale],
      tools: localizedTools(locale),
      categories: localizedCategories(locale),
      roadmap: localizedRoadmap(locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside a LocaleProvider");
  return value;
}
