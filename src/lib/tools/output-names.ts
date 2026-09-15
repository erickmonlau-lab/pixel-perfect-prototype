import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

/**
 * Runners produce Spanish file names. Only the visible name is translated here;
 * the processing logic is untouched.
 */
const REPLACEMENTS: Record<Exclude<Locale, "es">, [string, string][]> = {
  ca: [
    ["arvio-documento-unido", "arvio-document-unit"],
    ["arvio-imagenes", "arvio-imatges"],
    ["-pagina-", "-pagina-"],
    ["-rotado", "-girat"],
    ["-extraido", "-extret"],
    ["-sin-paginas", "-sense-pagines"],
    ["-comprimido", "-comprimit"],
  ],
  en: [
    ["arvio-documento-unido", "arvio-merged-document"],
    ["arvio-imagenes", "arvio-images"],
    ["-pagina-", "-page-"],
    ["-rotado", "-rotated"],
    ["-extraido", "-extracted"],
    ["-sin-paginas", "-pages-removed"],
    ["-comprimido", "-compressed"],
  ],
};

export function localizeOutputName(locale: Locale, name: string): string {
  if (locale === DEFAULT_LOCALE) return name;
  const rules = REPLACEMENTS[locale as Exclude<Locale, "es">];
  return rules.reduce((current, [from, to]) => current.split(from).join(to), name);
}
