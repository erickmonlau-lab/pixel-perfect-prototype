import type { ToolCategory } from "./types";

/**
 * Visual layer of the catalog: family accents, popular ordering and the
 * public roadmap. No processing logic lives here.
 */

export type FamilyAccent = {
  /** Icon foreground colour class. */
  icon: string;
  /** Solid icon background class. */
  iconBg: string;
  /** Small dot/indicator class. */
  dot: string;
  /** Hover border class for cards. */
  hoverBorder: string;
  /** Focus ring class for cards accessibility. */
  focusRing: string;
  /** Text colour for the micro CTA / title hover. */
  text: string;
  /** Arrow colour on hover. */
  arrow: string;
  /** Solid light-tint background for the open/active nav pill. */
  activeBg: string;
  /** Text colour for the open/active nav pill. */
  activeText: string;
  /** Ring colour for the open/active nav pill. */
  activeRing: string;
};

export const FAMILY_ACCENTS: Record<ToolCategory, FamilyAccent> = {
  optimizar: {
    icon: "text-white",
    iconBg: "bg-[#2563EB]",
    dot: "bg-[#2563EB]",
    hoverBorder: "hover:border-[#2563EB]",
    focusRing: "focus-visible:ring-[#2563EB]",
    text: "text-[#2563EB]",
    arrow: "group-hover:text-[#2563EB]",
    activeBg: "bg-[#EFF6FF]",
    activeText: "text-[#1D4ED8]",
    activeRing: "ring-[#BFDBFE]",
  },
  organizar: {
    icon: "text-white",
    iconBg: "bg-[#7C3AED]",
    dot: "bg-[#7C3AED]",
    hoverBorder: "hover:border-[#7C3AED]",
    focusRing: "focus-visible:ring-[#7C3AED]",
    text: "text-[#7C3AED]",
    arrow: "group-hover:text-[#7C3AED]",
    activeBg: "bg-[#F5F3FF]",
    activeText: "text-[#6D28D9]",
    activeRing: "ring-[#DDD6FE]",
  },
  convertir: {
    icon: "text-white",
    iconBg: "bg-[#059669]",
    dot: "bg-[#059669]",
    hoverBorder: "hover:border-[#059669]",
    focusRing: "focus-visible:ring-[#059669]",
    text: "text-[#059669]",
    arrow: "group-hover:text-[#059669]",
    activeBg: "bg-[#ECFDF5]",
    activeText: "text-[#047857]",
    activeRing: "ring-[#6EE7B7]",
  },
  editar: {
    icon: "text-white",
    iconBg: "bg-[#EA580C]",
    dot: "bg-[#EA580C]",
    hoverBorder: "hover:border-[#EA580C]",
    focusRing: "focus-visible:ring-[#EA580C]",
    text: "text-[#EA580C]",
    arrow: "group-hover:text-[#EA580C]",
    activeBg: "bg-[#FFF7ED]",
    activeText: "text-[#C2410C]",
    activeRing: "ring-[#FED7AA]",
  },
  seguridad: {
    icon: "text-white",
    iconBg: "bg-[#0284C7]",
    dot: "bg-[#0284C7]",
    hoverBorder: "hover:border-[#0284C7]",
    focusRing: "focus-visible:ring-[#0284C7]",
    text: "text-[#0284C7]",
    arrow: "group-hover:text-[#0284C7]",
    activeBg: "bg-[#E0F2FE]",
    activeText: "text-[#0369A1]",
    activeRing: "ring-[#BAE6FD]",
  },
  inteligencia: {
    icon: "text-white",
    iconBg: "bg-[#9333EA]",
    dot: "bg-[#9333EA]",
    hoverBorder: "hover:border-[#9333EA]",
    focusRing: "focus-visible:ring-[#9333EA]",
    text: "text-[#9333EA]",
    arrow: "group-hover:text-[#9333EA]",
    activeBg: "bg-[#F3E8FF]",
    activeText: "text-[#7E22CE]",
    activeRing: "ring-[#E9D5FF]",
  },
};

/** Slugs shown as "populares", in display order. */
export const POPULAR_SLUGS = [
  "comprimir-pdf",
  "unir-pdf",
  "dividir-pdf",
  "pdf-a-jpg",
  "extraer-paginas-pdf",
  "jpg-a-pdf",
  "rotar-pdf",
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
export const ROADMAP_TOOLS: RoadmapTool[] = [];

export function roadmapByCategory(category: ToolCategory): RoadmapTool[] {
  return ROADMAP_TOOLS.filter((tool) => tool.category === category);
}
