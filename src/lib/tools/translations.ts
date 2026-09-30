import type { Locale } from "@/lib/i18n/config";
import type { ToolCategory } from "./types";

/**
 * Localised content for the catalogue. Keys are the canonical (Spanish) slugs
 * from the registry; each locale provides its own URL slug and natural copy.
 * Spanish text lives in the registry itself and is derived at runtime.
 */

export type ToolOptionText = {
  label?: string;
  help?: string;
  placeholder?: string;
  /** Localised labels keyed by option value. */
  choices?: Record<string, string>;
};

export type ToolText = {
  slug: string;
  name: string;
  h1: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  ctaLabel: string;
  keywords: string[];
  howItWorks: string[];
  faq: { q: string; a: string }[];
  pendingReason?: string;
  options?: Record<string, ToolOptionText>;
};

export const CATEGORY_TEXT: Record<
  Exclude<Locale, "es">,
  Record<ToolCategory, { slug: string; name: string; description: string }>
> = {
  ca: {
    optimizar: {
      slug: "optimitzar",
      name: "Optimitzar",
      description: "Redueix el pes dels teus documents sense perdre el control de la qualitat.",
    },
    organizar: {
      slug: "organitzar",
      name: "Organitzar",
      description: "Uneix, divideix, gira i reordena pàgines en pocs segons.",
    },
    convertir: {
      slug: "convertir",
      name: "Convertir",
      description: "Passa de PDF a imatge, text o Office i al contrari.",
    },
    editar: {
      slug: "editar",
      name: "Editar",
      description: "Extreu, modifica i treballa amb el contingut dels teus PDF.",
    },
    seguridad: {
      slug: "seguretat",
      name: "Seguretat",
      description: "Protegeix els teus documents i controla qui els pot obrir.",
    },
    inteligencia: {
      slug: "pdf-intelligence",
      name: "PDF Intelligence",
      description: "OCR, extracció intel·ligent, anàlisi i eines amb IA.",
    },
  },
  en: {
    optimizar: {
      slug: "optimize",
      name: "Optimize",
      description: "Shrink your documents without losing control over quality.",
    },
    organizar: {
      slug: "organize",
      name: "Organize",
      description: "Merge, split, rotate and reorder pages in seconds.",
    },
    convertir: {
      slug: "convert",
      name: "Convert",
      description: "Move between PDF, images, text and Office formats.",
    },
    editar: {
      slug: "edit",
      name: "Edit",
      description: "Extract, change and work with the content of your PDFs.",
    },
    seguridad: {
      slug: "security",
      name: "Security",
      description: "Protect your documents and control who can open them.",
    },
    inteligencia: {
      slug: "pdf-intelligence",
      name: "PDF Intelligence",
      description: "OCR, smart extraction, analysis and AI-assisted tools.",
    },
  },
};

/** Roadmap copy, keyed by the Spanish roadmap name. */
export const ROADMAP_TEXT: Record<
  Exclude<Locale, "es">,
  Record<string, { name: string; tagline: string }>
> = {
  ca: {
    "Proteger PDF": {
      name: "Protegeix PDF",
      tagline: "Afegeix contrasenya i permisos d'obertura a un document.",
    },
    "Desbloquear PDF": {
      name: "Desbloqueja PDF",
      tagline: "Treu la contrasenya d'un PDF del qual tens la clau.",
    },
    "Firmar PDF": {
      name: "Signa PDF",
      tagline: "Signa documents i demana signatures a altres persones.",
    },
    "Marca de agua": {
      name: "Marca d'aigua",
      tagline: "Segella cada pàgina amb text o imatge i control d'opacitat.",
    },
    "OCR de PDF": {
      name: "OCR de PDF",
      tagline: "Converteix escanejos en documents amb text cercable.",
    },
    "Resumir PDF": {
      name: "Resumeix PDF",
      tagline: "Resums i punts clau de documents llargs.",
    },
    "Extraer datos": {
      name: "Extreu dades",
      tagline: "Treu taules i camps estructurats de factures i formularis.",
    },
    "Comparar PDF": {
      name: "Compara PDF",
      tagline: "Detecta les diferències entre dues versions d'un document.",
    },
    "Numerar páginas": {
      name: "Numera pàgines",
      tagline: "Insereix numeració amb format i posició configurables.",
    },
    "Reparar PDF": {
      name: "Repara PDF",
      tagline: "Recupera documents malmesos o incomplets.",
    },
    "PDF a Excel": {
      name: "PDF a Excel",
      tagline: "Passa taules d'un PDF a un full de càlcul.",
    },
    "PDF a PowerPoint": {
      name: "PDF a PowerPoint",
      tagline: "Converteix presentacions en PDF a format editable.",
    },
  },
  en: {
    "Proteger PDF": {
      name: "Protect PDF",
      tagline: "Add a password and opening permissions to a document.",
    },
    "Desbloquear PDF": {
      name: "Unlock PDF",
      tagline: "Remove the password from a PDF you have the key for.",
    },
    "Firmar PDF": {
      name: "Sign PDF",
      tagline: "Sign documents and request signatures from other people.",
    },
    "Marca de agua": {
      name: "Watermark",
      tagline: "Stamp every page with text or an image and control opacity.",
    },
    "OCR de PDF": {
      name: "PDF OCR",
      tagline: "Turn scans into documents with searchable text.",
    },
    "Resumir PDF": {
      name: "Summarize PDF",
      tagline: "Summaries and key points from long documents.",
    },
    "Extraer datos": {
      name: "Extract data",
      tagline: "Pull tables and structured fields from invoices and forms.",
    },
    "Comparar PDF": {
      name: "Compare PDF",
      tagline: "Spot the differences between two versions of a document.",
    },
    "Numerar páginas": {
      name: "Number pages",
      tagline: "Insert page numbers with configurable format and position.",
    },
    "Reparar PDF": {
      name: "Repair PDF",
      tagline: "Recover damaged or incomplete documents.",
    },
    "PDF a Excel": {
      name: "PDF to Excel",
      tagline: "Move tables from a PDF into a spreadsheet.",
    },
    "PDF a PowerPoint": {
      name: "PDF to PowerPoint",
      tagline: "Convert PDF presentations into an editable format.",
    },
  },
};

