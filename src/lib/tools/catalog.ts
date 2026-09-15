import type { ToolCategory } from "./types";

/**
 * Visual layer of the catalog: family accents, popular ordering and the
 * public roadmap. No processing logic lives here.
 */

export type FamilyAccent = {
  /** Icon foreground colour class. */
  icon: string;
  /** Soft icon background class. */
  iconBg: string;
  /** Small dot/indicator class. */
  dot: string;
  /** Hover border class for cards. */
  hoverBorder: string;
  /** Text colour for the micro CTA. */
  text: string;
  /** Arrow colour on hover. */
  arrow: string;
};

export const FAMILY_ACCENTS: Record<ToolCategory, FamilyAccent> = {
  optimizar: {
    icon: "text-primary-foreground",
    iconBg: "bg-fam-optimizar",
    dot: "bg-fam-optimizar",
    hoverBorder: "group-hover:border-fam-optimizar/40",
    text: "text-fam-optimizar",
    arrow: "group-hover:text-fam-optimizar",
  },
  organizar: {
    icon: "text-primary-foreground",
    iconBg: "bg-fam-organizar",
    dot: "bg-fam-organizar",
    hoverBorder: "group-hover:border-fam-organizar/40",
    text: "text-fam-organizar",
    arrow: "group-hover:text-fam-organizar",
  },
  convertir: {
    icon: "text-primary-foreground",
    iconBg: "bg-fam-convertir",
    dot: "bg-fam-convertir",
    hoverBorder: "group-hover:border-fam-convertir/40",
    text: "text-fam-convertir",
    arrow: "group-hover:text-fam-convertir",
  },
  editar: {
    icon: "text-primary-foreground",
    iconBg: "bg-fam-editar",
    dot: "bg-fam-editar",
    hoverBorder: "group-hover:border-fam-editar/40",
    text: "text-fam-editar",
    arrow: "group-hover:text-fam-editar",
  },
  seguridad: {
    icon: "text-primary-foreground",
    iconBg: "bg-fam-seguridad",
    dot: "bg-fam-seguridad",
    hoverBorder: "group-hover:border-fam-seguridad/40",
    text: "text-fam-seguridad",
    arrow: "group-hover:text-fam-seguridad",
  },
  inteligencia: {
    icon: "text-primary-foreground",
    iconBg: "bg-fam-inteligencia",
    dot: "bg-fam-inteligencia",
    hoverBorder: "group-hover:border-fam-inteligencia/40",
    text: "text-fam-inteligencia",
    arrow: "group-hover:text-fam-inteligencia",
  },
};

/** Slugs shown as "populares", in display order. */
export const POPULAR_SLUGS = [
  "comprimir-pdf",
  "unir-pdf",
  "dividir-pdf",
  "pdf-a-jpg",
  "jpg-a-pdf",
  "rotar-pdf",
  "extraer-paginas-pdf",
  "pdf-a-word",
];

export type RoadmapTool = {
  name: string;
  tagline: string;
  icon: string;
  category: ToolCategory;
};

/**
 * Real roadmap entries (see roadmap.md). They are rendered as non-interactive
 * "Próximamente" cards: no fake buttons, no fake pages.
 */
export const ROADMAP_TOOLS: RoadmapTool[] = [
  {
    name: "Proteger PDF",
    tagline: "Añade contraseña y permisos de apertura a un documento.",
    icon: "Lock",
    category: "seguridad",
  },
  {
    name: "Desbloquear PDF",
    tagline: "Quita la contraseña de un PDF del que tienes la clave.",
    icon: "Unlock",
    category: "seguridad",
  },
  {
    name: "Firmar PDF",
    tagline: "Firma documentos y solicita firmas a otras personas.",
    icon: "Signature",
    category: "seguridad",
  },
  {
    name: "Marca de agua",
    tagline: "Sella cada página con texto o imagen y control de opacidad.",
    icon: "Droplets",
    category: "seguridad",
  },
  {
    name: "OCR de PDF",
    tagline: "Convierte escaneos en documentos con texto buscable.",
    icon: "ScanText",
    category: "inteligencia",
  },
  {
    name: "Resumir PDF",
    tagline: "Resúmenes y puntos clave de documentos largos.",
    icon: "Sparkles",
    category: "inteligencia",
  },
  {
    name: "Extraer datos",
    tagline: "Saca tablas y campos estructurados de facturas y formularios.",
    icon: "TableProperties",
    category: "inteligencia",
  },
  {
    name: "Comparar PDF",
    tagline: "Detecta las diferencias entre dos versiones de un documento.",
    icon: "FileSearch",
    category: "inteligencia",
  },
  {
    name: "Numerar páginas",
    tagline: "Inserta numeración con formato y posición configurables.",
    icon: "Hash",
    category: "editar",
  },
  {
    name: "Reparar PDF",
    tagline: "Recupera documentos dañados o incompletos.",
    icon: "Wrench",
    category: "optimizar",
  },
  {
    name: "PDF a Excel",
    tagline: "Pasa tablas de un PDF a una hoja de cálculo.",
    icon: "FileSpreadsheet",
    category: "convertir",
  },
  {
    name: "PDF a PowerPoint",
    tagline: "Convierte presentaciones en PDF a formato editable.",
    icon: "Presentation",
    category: "convertir",
  },
];

export function roadmapByCategory(category: ToolCategory): RoadmapTool[] {
  return ROADMAP_TOOLS.filter((tool) => tool.category === category);
}
