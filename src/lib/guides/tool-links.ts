/**
 * Contextual links from a tool page to the editorial guides that explain its
 * workflow. Only real, published guides are listed; tools without a matching
 * guide intentionally return no entry instead of forcing a generic link.
 *
 * Guide slugs are canonical slugs (see src/lib/guides/registry.ts).
 */
export const TOOL_GUIDE_LINKS: Record<string, string[]> = {
  // Optimizar
  "comprimir-pdf": ["unificar-memoria-anexos-portada-tfg-tfm", "como-preparar-pdf-para-lexnet"],
  "optimizar-pdf-para-impresion": ["unificar-memoria-anexos-portada-tfg-tfm"],
  "eliminar-paginas-en-blanco": ["eliminar-paginas-en-blanco-pdf-escaneado"],

  // Organizar
  "unir-pdf": ["unificar-memoria-anexos-portada-tfg-tfm"],
  "numerar-paginas": ["unificar-memoria-anexos-portada-tfg-tfm"],
  "eliminar-paginas-pdf": ["eliminar-paginas-en-blanco-pdf-escaneado"],
  "rotar-pdf": ["hacer-buscable-pdf-escaneado-ocr"],

  // Convertir
  "pdf-a-word": ["convertir-pdf-a-word-editable"],
  "pdf-a-excel": ["pasar-tablas-pdf-a-excel"],
  "extraer-datos": ["pasar-tablas-pdf-a-excel"],
  "extraer-texto-pdf": ["hacer-buscable-pdf-escaneado-ocr"],
  "pdf-a-pdfa": ["que-es-pdfa-cuando-convertir", "como-preparar-pdf-para-lexnet"],
  "word-a-pdf": ["unificar-memoria-anexos-portada-tfg-tfm"],
  "jpg-a-pdf": ["unificar-memoria-anexos-portada-tfg-tfm"],

  // Editar / seguridad
  "rellenar-formulario-pdf": ["rellenar-y-firmar-formulario-pdf"],
  "firmar-pdf": ["rellenar-y-firmar-formulario-pdf", "firma-electronica-simple-avanzada-cualificada-eidas"],
  "aplanar-pdf": ["rellenar-y-firmar-formulario-pdf", "como-preparar-pdf-para-lexnet"],
  "censurar-pdf": ["ocultar-datos-personales-pdf"],
  "eliminar-metadatos-pdf": ["ocultar-datos-personales-pdf"],
  "sanear-pdf": ["ocultar-datos-personales-pdf"],

  // Inteligencia
  "ocr-pdf": ["hacer-buscable-pdf-escaneado-ocr", "como-preparar-pdf-para-lexnet"],
};

export function guideSlugsForTool(canonicalSlug: string): string[] {
  return TOOL_GUIDE_LINKS[canonicalSlug] ?? [];
}
