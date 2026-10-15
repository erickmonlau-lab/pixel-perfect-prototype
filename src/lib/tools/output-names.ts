import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

/**
 * Runners produce Spanish file names. Only the visible name is translated here;
 * the processing logic is untouched.
 */
const REPLACEMENTS: Record<Exclude<Locale, "es">, [string, string][]> = {
  ca: [
    ["breadpdf-documento-unido", "breadpdf-document-unit"],
    ["breadpdf-imagenes", "breadpdf-imatges"],
    ["-pagina-", "-pagina-"],
    ["-rotado", "-girat"],
    ["-extraido", "-extret"],
    ["-sin-paginas", "-sense-pagines"],
    ["-comprimido", "-comprimit"],
    ["-separadas", "-separades"],
    ["-mejorada", "-millorada"],
    ["breadpdf-imagenes-mejoradas", "breadpdf-imatges-millorades"],
  ],
  en: [
    ["breadpdf-documento-unido", "breadpdf-merged-document"],
    ["breadpdf-imagenes", "breadpdf-images"],
    ["-pagina-", "-page-"],
    ["-rotado", "-rotated"],
    ["-extraido", "-extracted"],
    ["-sin-paginas", "-pages-removed"],
    ["-comprimido", "-compressed"],
    ["-separadas", "-split"],
    ["-mejorada", "-enhanced"],
    ["breadpdf-imagenes-mejoradas", "breadpdf-enhanced-images"],
  ],
};

export function localizeOutputName(locale: Locale, name: string): string {
  if (locale === DEFAULT_LOCALE) return name;
  const rules = REPLACEMENTS[locale as Exclude<Locale, "es">];
  return rules.reduce((current, [from, to]) => current.split(from).join(to), name);
}
