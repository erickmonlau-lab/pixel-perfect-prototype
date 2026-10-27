# KEYWORDS: BreadPDF

Mapa de términos de búsqueda objetivo, estructurado según las intenciones transaccionales e informativas del código (`src/lib/tools/registry.ts`, `src/lib/guides/registry.ts` y metadata SEO).

---

## 1. Núcleo Head / Alta Demanda (Herramientas Core)
Consultas de máxima competencia y volumen transaccional en el sector PDF:

| Término Principal (ES) | Slug de Herramienta Asociado | Intención SERP | Elemento Diferenciador en BreadPDF |
|---|---|---|---|
| `comprimir pdf online gratis` | `comprimir-pdf` | Transaccional (herramienta) | Sin subir a servidor, sin esperas de cola, 100% privado en navegador |
| `unir pdf online` | `unir-pdf` | Transaccional (herramienta) | Vista previa visual de páginas, arrastrar y soltar ilimitado en memoria |
| `dividir pdf online` | `dividir-pdf` | Transaccional (herramienta) | Extracción visual hoja a hoja o intervalos por páginas |
| `pdf a jpg` | `pdf-a-jpg` | Transaccional (conversor) | Renderizado vectorial nítido directo a ZIP con imágenes |
| `jpg a pdf` | `jpg-a-pdf` | Transaccional (conversor) | Conversión instantánea sin límite artificial de fotos |
| `pdf a word online gratis` | `pdf-a-word` | Transaccional (conversor) | Generación DOCX estructurada en memoria |
| `pdf a excel gratis` | `pdf-a-excel` | Transaccional (conversor) | Extracción de tablas tabulares limpias |
| `firmar pdf online` | `firmar-pdf` | Transaccional / Legal | Trazado directo en canvas o carga de rúbrica sin registros |
| `proteger pdf con contraseña` | `proteger-pdf` | Transaccional / Seguridad | Cifrado criptográfico cliente (AES) sin enviar clave a servidores |
| `desbloquear pdf online` | `desbloquear-pdf` | Transaccional / Seguridad | Descifrado local en memoria |

---

## 2. Oportunidades Long-Tail y Consultas Específicas
Búsquedas con menor volumen global pero con intención de alta conversión y menor dominio absoluto de los gigantes consolidados:

1. **Sector Educativo / Universitario:**
   - `comprimir pdf para moodle` → Resuelto en `comprimir-pdf` y guía `reducir-pdf-limite-subida-campus-virtual`.
   - `numerar pdf tfg tfm` → Resuelto en `numerar-paginas` y guía `unificar-memoria-anexos-portada-tfg-tfm`.
   - `unir anexos y memoria tfg en un pdf` → Resuelto en `unir-pdf`.
2. **Administración Pública y Legal:**
   - `convertir pdf a pdfa hacienda` → Resuelto en `pdf-a-pdfa` y guía `que-es-pdfa-cuando-convertir`.
   - `aplanar formulario pdf antes de presentar` → Resuelto en `aplanar-pdf` y `rellenar-formulario-pdf`.
   - `eliminar datos personales de pdf antes de enviar` → Resuelto en `sanear-pdf` y guía `ocultar-datos-personales-pdf`.
3. **Escaneo y Digitalización:**
   - `eliminar paginas en blanco pdf escaneado` → Resuelto en herramienta dedicada `eliminar-paginas-en-blanco` y guía `eliminar-paginas-en-blanco-pdf-escaneado`.
   - `hacer buscable pdf escaneado ocr gratis` → Resuelto en `ocr-pdf` y guía técnica `hacer-buscable-pdf-escaneado-ocr`.
4. **Desarrollo Web & Tiendas Online:**
   - `convertir catalogo pdf a webp para tienda online` → Resuelto en `imagen-a-webp` y guía `webp-vs-jpg-png-tiendas-online`.
   - `error subida archivo grande pdf wordpress woocommerce` → Resuelto en guía `subir-archivos-grandes-wordpress-woocommerce`.

---

## 3. Palabras Clave en Idiomas Secundarios (Catalán e Inglés)
Configuradas en `src/lib/i18n/ui.ts` y traducciones oficiales:
- **Catalán (`ca`):** `comprimir pdf en linia gratis`, `unir pdf en català`, `dividir pdf`, `convertir pdf a word`, `signar pdf digitalment`.
- **Inglés (`en`):** `compress pdf in browser free`, `merge pdf client-side private`, `split pdf pages online`, `pdf to excel converter`, `sign pdf locally`.

---

## 4. Datos Pendientes de Confirmar (Search Console)
- Lista real de consultas (Queries) con clics e impresiones en GSC durante los últimos 28 días.
- Posición media real de BreadPDF para `numerar paginas pdf`, `comprimir pdf` y `unir pdf`.
- CTR medio por bloque temático de palabras clave.
