import type { ToolCategory } from "./types";

/** Icon shown next to a family name in tiles, mega menu and headers. */
export const FAMILY_ICONS: Record<ToolCategory, string> = {
  optimizar: "Minimize2",
  organizar: "Combine",
  convertir: "FileType2",
  editar: "FileOutput",
  seguridad: "Lock",
  inteligencia: "Sparkles",
};

/** Shared responsive grid for tool cards: 1 → 2 → 3 → 4 → 5 columns. */
export const TOOL_GRID =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
