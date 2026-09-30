/**
 * Central Brand Configuration for BreadPDF.
 *
 * All brand names, wordmarks, official colors, base URLs, and mascot characters
 * derive from this module to guarantee 100% consistency across UI, SEO, schemas,
 * metadata, and future domain transitions.
 */

export const BRAND_NAME = "BreadPDF" as const;
export const BRAND_SHORT = "BreadPDF" as const;
export const SITE_NAME = "BreadPDF" as const;

export const BRAND_WORDMARK = {
  bread: "Bread",
  pdf: "PDF",
} as const;

/**
 * Official contact and support email for BreadPDF across all languages and surfaces.
 */
export const OFFICIAL_CONTACT_EMAIL = "breadpdfstudio@gmail.com" as const;
export const OFFICIAL_CONTACT_MAILTO = `mailto:${OFFICIAL_CONTACT_EMAIL}` as const;

export const BRAND_COLORS = {
  /** Deep warm brown for 'Bread' wordmark & character line-art */
  bread: "#592316",
  /** Vibrant tech red for 'PDF' wordmark & document badge */
  pdf: "#EC3C2D",
  /** Golden caramel toast crust */
  crust: "#DE834C",
  /** Warm cream toast crumb/face */
  crumb: "#FEE7CE",
  /** Dark espresso character details (feet/hands/eyes) */
  ink: "#421A0F",
} as const;

export type MascotVariant = "run" | "think" | "sad" | "celebrate";

export const BRAND_ASSETS = {
  logo: "/brand/breadpdf-logo.png",
  logoSvg: "/brand/breadpdf-logo.svg",
  mascotSvg: "/brand/breadpdf-mascot.svg",
  mascotPng: "/brand/breadpdf-mascot.png",
  icon: "/brand/breadpdf-icon.png",
  iconWebp: "/brand/breadpdf-icon.webp",
  appIcon: "/brand/breadpdf-app-icon.png",
  faviconSvg: "/favicon.svg",
  faviconIco: "/favicon.ico",
  favicon32: "/brand/favicon-32x32.png",
  favicon16: "/brand/favicon-16x16.png",
  /**
   * Sistema centralizado de los 4 personajes oficiales de BreadPDF:
   * - run: velocidad / productividad / procesamiento rápido / Premium
   * - think: análisis / OCR / PDF Intelligence / documentos complejos
   * - sad: errores / PDF dañado / fallos / límites
   * - celebrate: éxito / descarga completada / confirmación
   */
  mascots: {
    run: "/brand/mascots/breadpdf-run.webp",
    think: "/brand/mascots/breadpdf-think.webp",
    sad: "/brand/mascots/breadpdf-sad.webp",
    celebrate: "/brand/mascots/breadpdf-celebrate.webp",
  },
} as const;

/**
 * Maps a tool category or slug to the most contextually relevant BreadPDF mascot:
 * - sad: repairing damaged/corrupt documents (reparar-pdf, desbloquear-pdf, sanear-pdf)
 * - celebrate: completion, signing, forms, watermarks (firmar-pdf, rellenar-formulario-pdf, marca-de-agua, numerar-paginas, unir-pdf)
 * - think: OCR, intelligence, analysis, data extraction, comparison, conversion to complex formats
 * - run: optimization, compression, resizing, print preparation, image conversion, rapid workflows
 */
export function mascotForTool(category: string, slug?: string): MascotVariant {
  // 1. TRISTE: Archivos dañados, errores, desbloqueo restrictivo
  if (
    slug === "reparar-pdf" ||
    slug === "desbloquear-pdf"
  ) {
    return "sad";
  }

  // 2. CELEBRANDO: Finalización, firma, formularios completados, unificación exitosa
  if (
    slug === "firmar-pdf" ||
    slug === "rellenar-formulario-pdf" ||
    slug === "marca-de-agua" ||
    slug === "numerar-paginas" ||
    slug === "unir-pdf"
  ) {
    return "celebrate";
  }

  // 3. PENSANDO: OCR, análisis, inteligencia, extracción, comparación, conversiones estructuradas
  if (
    category === "inteligencia" ||
    category === "seguridad" ||
    slug === "ocr-pdf" ||
    slug === "extraer-datos" ||
    slug === "resumir-pdf" ||
    slug === "comparar-pdf" ||
    slug === "extraer-texto-pdf" ||
    slug === "pdf-a-powerpoint" ||
    slug === "powerpoint-a-pdf" ||
    slug === "pdf-a-excel" ||
    slug === "excel-a-pdf" ||
    slug === "pdf-a-word" ||
    slug === "word-a-pdf" ||
    slug === "pdf-a-markdown" ||
    slug === "markdown-a-pdf"
  ) {
    return "think";
  }

  // 4. CORRIENDO: Velocidad, compresión, optimización, fragmentación y conversiones rápidas
  return "run";
}

/**
 * Canonical / Base site URL for BreadPDF.
 * Configurable via VITE_SITE_URL environment variable in production.
 * Defaults to https://breadpdf.com.
 */
export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env["VITE_SITE_URL"] as string | undefined)
    : undefined)?.replace(/\/$/, "") ?? "https://breadpdf.com";
