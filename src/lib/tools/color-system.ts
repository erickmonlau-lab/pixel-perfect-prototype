/**
 * Neo-Brutalist Tool Palette System for BreadPDF.
 * Defines vivid identifying color tokens per tool and category:
 * - Word / Texto / Markdown: Electric Blue
 * - Excel / Datos / CSV: Emerald Green
 * - PowerPoint: Energetic Orange
 * - Imágenes / WebP / JPG / PNG / SVG: Violet / Purple
 * - Comprimir / Dividir / Unir / Eliminar (Core PDF): Intense Coral Red
 * - Organizar / Rotar / Numerar / Marca de agua: Cyan / Turquoise
 * - Seguridad / Firmar / Proteger / Sanear: Mustard Amber with dark text/icon
 * - PDF Inteligente / OCR / Resumir / Comparar: Bright Pink / Magenta / Indigo
 */

export interface ToolColorTheme {
  bg: string;          // Tailwind class for solid icon background
  bgHex: string;       // Exact hex
  text: string;        // Text/icon contrast (white or black)
  shadowHover: string; // Tailwind shadow class on hover
  tintBg: string;      // Soft background tint for card on hover
  badgeBg: string;     // Badge background
  badgeText: string;   // Badge text
}

export const CATEGORY_COLORS: Record<string, ToolColorTheme> = {
  optimizar: {
    bg: "bg-[#EF4444]",
    bgHex: "#EF4444",
    text: "text-white",
    shadowHover: "group-hover:shadow-[6px_6px_0_#EF4444]",
    tintBg: "group-hover:bg-red-50/50",
    badgeBg: "bg-[#EF4444]",
    badgeText: "text-white",
  },
  organizar: {
    bg: "bg-[#06B6D4]",
    bgHex: "#06B6D4",
    text: "text-white",
    shadowHover: "group-hover:shadow-[6px_6px_0_#06B6D4]",
    tintBg: "group-hover:bg-cyan-50/50",
    badgeBg: "bg-[#06B6D4]",
    badgeText: "text-white",
  },
  convertir: {
    bg: "bg-[#2563EB]",
    bgHex: "#2563EB",
    text: "text-white",
    shadowHover: "group-hover:shadow-[6px_6px_0_#2563EB]",
    tintBg: "group-hover:bg-blue-50/50",
    badgeBg: "bg-[#2563EB]",
    badgeText: "text-white",
  },
  editar: {
    bg: "bg-[#F97316]",
    bgHex: "#F97316",
    text: "text-white",
    shadowHover: "group-hover:shadow-[6px_6px_0_#F97316]",
    tintBg: "group-hover:bg-orange-50/50",
    badgeBg: "bg-[#F97316]",
    badgeText: "text-white",
  },
  seguridad: {
    bg: "bg-[#F59E0B]",
    bgHex: "#F59E0B",
    text: "text-[#0F0F12]",
    shadowHover: "group-hover:shadow-[6px_6px_0_#F59E0B]",
    tintBg: "group-hover:bg-amber-50/50",
    badgeBg: "bg-[#F59E0B]",
    badgeText: "text-[#0F0F12]",
  },
  inteligencia: {
    bg: "bg-[#EC4899]",
    bgHex: "#EC4899",
    text: "text-white",
    shadowHover: "group-hover:shadow-[6px_6px_0_#EC4899]",
    tintBg: "group-hover:bg-pink-50/50",
    badgeBg: "bg-[#EC4899]",
    badgeText: "text-white",
  },
};

export function getToolColorTheme(canonicalSlug?: string, category?: string): ToolColorTheme {
  const s = canonicalSlug || "";

  // 1. Core PDF: Comprimir, Unir, Dividir, Eliminar páginas, Aplanar
  if (
    s === "comprimir-pdf" ||
    s === "unir-pdf" ||
    s === "dividir-pdf" ||
    s === "eliminar-paginas-pdf" ||
    s === "aplanar-pdf" ||
    s === "dividir-pdf-por-tamano" ||
    s === "eliminar-paginas-en-blanco"
  ) {
    return {
      bg: "bg-[#EF4444]",
      bgHex: "#EF4444",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#EF4444]",
      tintBg: "group-hover:bg-red-50/60",
      badgeBg: "bg-[#EF4444]",
      badgeText: "text-white",
    };
  }

  // 2. Word / Texto / Markdown: Azul Eléctrico
  if (
    s === "pdf-a-word" ||
    s === "word-a-pdf" ||
    s === "extraer-texto-pdf" ||
    s === "pdf-a-markdown" ||
    s === "markdown-a-pdf"
  ) {
    return {
      bg: "bg-[#2563EB]",
      bgHex: "#2563EB",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#2563EB]",
      tintBg: "group-hover:bg-blue-50/60",
      badgeBg: "bg-[#2563EB]",
      badgeText: "text-white",
    };
  }

  // 3. Excel / Datos / CSV: Verde Esmeralda
  if (
    s === "pdf-a-excel" ||
    s === "excel-a-pdf" ||
    s === "extraer-datos-pdf"
  ) {
    return {
      bg: "bg-[#10B981]",
      bgHex: "#10B981",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#10B981]",
      tintBg: "group-hover:bg-emerald-50/60",
      badgeBg: "bg-[#10B981]",
      badgeText: "text-white",
    };
  }

  // 4. PowerPoint: Naranja Energético
  if (
    s === "pdf-a-pptx" ||
    s === "powerpoint-a-pdf"
  ) {
    return {
      bg: "bg-[#F97316]",
      bgHex: "#F97316",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#F97316]",
      tintBg: "group-hover:bg-orange-50/60",
      badgeBg: "bg-[#F97316]",
      badgeText: "text-white",
    };
  }

  // 5. Imágenes / WebP / JPG / PNG / SVG: Violeta / Púrpura
  if (
    s === "pdf-a-jpg" ||
    s === "jpg-a-pdf" ||
    s === "pdf-a-png" ||
    s === "png-a-pdf" ||
    s === "pdf-a-webp" ||
    s === "webp-a-pdf" ||
    s === "svg-a-pdf" ||
    s === "imagen-a-webp" ||
    s === "extraer-imagenes-pdf" ||
    s === "mejorar-imagenes"
  ) {
    return {
      bg: "bg-[#8B5CF6]",
      bgHex: "#8B5CF6",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#8B5CF6]",
      tintBg: "group-hover:bg-purple-50/60",
      badgeBg: "bg-[#8B5CF6]",
      badgeText: "text-white",
    };
  }

  // 6. Organizar / Rotar / Numerar / Marca de agua / Recortar: Cian / Turquesa
  if (
    s === "rotar-pdf" ||
    s === "reordenar-paginas-pdf" ||
    s === "extraer-paginas-pdf" ||
    s === "insertar-paginas-pdf" ||
    s === "numerar-paginas" ||
    s === "marca-de-agua" ||
    s === "recortar-pdf" ||
    s === "redimensionar-pdf" ||
    s === "optimizar-pdf-para-impresion"
  ) {
    return {
      bg: "bg-[#06B6D4]",
      bgHex: "#06B6D4",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#06B6D4]",
      tintBg: "group-hover:bg-cyan-50/60",
      badgeBg: "bg-[#06B6D4]",
      badgeText: "text-white",
    };
  }

  // 7. Seguridad / Firmar / Proteger / Desbloquear / Sanear: Ámbar / Mostaza
  if (
    s === "proteger-pdf" ||
    s === "desbloquear-pdf" ||
    s === "firmar-pdf" ||
    s === "sanear-pdf" ||
    s === "censurar-pdf" ||
    s === "eliminar-metadatos-pdf" ||
    s === "editar-metadatos-pdf" ||
    s === "reparar-pdf" ||
    s === "pdf-a-pdfa"
  ) {
    return {
      bg: "bg-[#F59E0B]",
      bgHex: "#F59E0B",
      text: "text-[#0F0F12]",
      shadowHover: "group-hover:shadow-[6px_6px_0_#F59E0B]",
      tintBg: "group-hover:bg-amber-50/60",
      badgeBg: "bg-[#F59E0B]",
      badgeText: "text-[#0F0F12]",
    };
  }

  // 8. PDF Inteligente / OCR / Resumir / Comparar: Rosa / Magenta / Índigo
  if (
    s === "ocr-pdf" ||
    s === "resumir-pdf" ||
    s === "comparar-pdf" ||
    s === "generar-qr-pdf" ||
    s === "rellenar-formulario-pdf" ||
    s === "anadir-texto-pdf"
  ) {
    return {
      bg: "bg-[#EC4899]",
      bgHex: "#EC4899",
      text: "text-white",
      shadowHover: "group-hover:shadow-[6px_6px_0_#EC4899]",
      tintBg: "group-hover:bg-pink-50/60",
      badgeBg: "bg-[#EC4899]",
      badgeText: "text-white",
    };
  }

  // Fallback to Category
  if (category && CATEGORY_COLORS[category]) {
    return CATEGORY_COLORS[category];
  }

  return {
    bg: "bg-[#EC3C2D]",
    bgHex: "#EC3C2D",
    text: "text-white",
    shadowHover: "group-hover:shadow-[6px_6px_0_#EC3C2D]",
    tintBg: "group-hover:bg-red-50/50",
    badgeBg: "bg-[#EC3C2D]",
    badgeText: "text-white",
  };
}
