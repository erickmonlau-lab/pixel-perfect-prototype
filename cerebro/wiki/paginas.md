# PÁGINAS Y TAXONOMÍA: BreadPDF

Inventario de la estructura de páginas del proyecto verificado directamente contra el código fuente (`src/lib/sitemap.ts`, `src/lib/tools/registry.ts`, `src/lib/guides/registry.ts`, `src/lib/i18n/config.ts`) y contrastado con los datos reales de indexación de Google Search Console (`cerebro/raw/Tabla.csv`, 2026-10-23).

- **Total URLs en Sitemap actual:** **201 URLs indexables** (67 por idioma × 3 idiomas).
- **Total URLs Indexadas en Search Console (`Tabla.csv`):** **94 URLs**.
  - URLs indexadas que forman parte del sitemap actual: **84 URLs**.
  - URLs indexadas que corresponden a rutas retiradas del sitemap (categorías y premium): **10 URLs**.
- **URLs del Sitemap pendientes de indexación (faltantes en `Tabla.csv`):** **117 URLs**.

---

## 1. Desglose Numérico de URLs Indexadas vs Faltantes

### A) Por Idioma

| Idioma | Indexadas (`Tabla.csv`) | Faltantes del Sitemap | Total en Sitemap |
|---|---|---|---|
| **Español (`es`)** | 29 | 42 | 67 |
| **Catalán (`ca`)** | 31 | 38 | 67 |
| **Inglés (`en`)** | 34 | 37 | 67 |
| **Total** | **94** | **117** | **201** |

### B) Por Tipo de Página (URLs del Sitemap faltantes en el índice)

| Tipo de Contenido | Total en Sitemap | Faltantes en `Tabla.csv` | Indexadas del Sitemap |
|---|---|---|---|
| **Home (`/es`, `/ca`, `/en`)** | 3 | 0 (0%) | 3 (100%) |
| **Catálogo Central (`/herramientas`, `/eines`, `/tools`)** | 3 | 0 (0%) | 3 (100%) |
| **Herramientas Operativas (51 × 3)** | 153 | 99 (64.7%) | 54 (35.3%) |
| **Guías Editoriales (10 × 3)** | 30 | 12 (40%) | 18 (60%) |
| **Páginas Institucionales y Legales (4 × 3)** | 12 | 6 (50%) | 6 (50%) |
| **Total** | **201** | **117** | **84** |

*(Nota: Las otras 10 URLs indexadas en `Tabla.csv` son: 5 categorías (`/es/categoria/optimizar`, `organizar`, `convertir`; `/ca/categoria/convertir`; `/en/category/optimize`, `convert`), el hub `/en/guides` y 3 URLs de `/premium` previas a la auditoría).*

---

## 2. Herramientas con Disparidad Idiomática (Indexación Parcial)
Herramientas que Google tiene indexadas en 1 o 2 idiomas, pero no en todos (17 herramientas identificadas):

| Herramienta (Slug Canónico) | Nombre | Indexada en ES | Indexada en CA | Indexada en EN |
|---|---|---|---|---|
| `unir-pdf` | Unir PDF | ❌ No | ✅ Sí (`uneix-pdf`) | ✅ Sí (`merge-pdf`) |
| `dividir-pdf` | Dividir PDF | ✅ Sí (`dividir-pdf`) | ❌ No | ❌ No |
| `pdf-a-jpg` | PDF a JPG | ✅ Sí (`pdf-a-jpg`) | ❌ No | ✅ Sí (`pdf-to-jpg`) |
| `jpg-a-pdf` | JPG a PDF | ❌ No | ✅ Sí (`jpg-a-pdf`) | ✅ Sí (`jpg-to-pdf`) |
| `extraer-paginas-pdf` | Extraer páginas | ❌ No | ✅ Sí (`extreu-pagines-pdf`) | ✅ Sí (`extract-pdf-pages`) |
| `firmar-pdf` | Firmar PDF | ✅ Sí (`firmar-pdf`) | ✅ Sí (`signar-pdf`) | ❌ No |
| `resumir-pdf` | Resumir PDF | ❌ No | ✅ Sí (`resumir-pdf`) | ❌ No |
| `qr-pdf` | Generar QR a PDF | ❌ No | ✅ Sí (`qr-pdf`) | ✅ Sí (`qr-to-pdf`) |
| `recortar-pdf` | Recortar PDF | ✅ Sí (`recortar-pdf`) | ❌ No | ✅ Sí (`crop-pdf`) |
| `reordenar-paginas-pdf` | Reordenar páginas | ✅ Sí (`reordenar-paginas-pdf`) | ✅ Sí (`reordenar-pagines-pdf`) | ❌ No |
| `png-a-pdf` | PNG a PDF | ✅ Sí (`png-a-pdf`) | ✅ Sí (`png-a-pdf`) | ❌ No |
| `redimensionar-pdf` | Ajustar tamaño de página | ❌ No | ❌ No | ✅ Sí (`resize-pdf`) |
| `editar-metadatos-pdf` | Editar metadatos PDF | ❌ No | ✅ Sí (`editar-metadades-pdf`) | ❌ No |
| `anadir-texto-pdf` | Añadir texto al PDF | ✅ Sí (`anadir-texto-pdf`) | ❌ No | ✅ Sí (`add-text-to-pdf`) |
| `extraer-imagenes-pdf` | Extraer imágenes de PDF | ❌ No | ✅ Sí (`extreure-imatges-pdf`) | ✅ Sí (`extract-pdf-images`) |
| `dividir-pdf-por-tamano` | Dividir PDF por tamaño | ✅ Sí (`dividir-pdf-por-tamano`) | ✅ Sí (`dividir-pdf-per-mida`) | ❌ No |
| `imagen-a-webp` | Imagen a WebP | ✅ Sí (`imagen-a-webp`) | ✅ Sí (`imatge-a-webp`) | ❌ No |

---

## 3. Guías con Disparidad Idiomática
Guías que solo están indexadas en inglés mientras las versiones en español y catalán siguen en espera:

| Guía Canónica | Título (ES) | ES | CA | EN |
|---|---|---|---|---|
| `pasar-tablas-pdf-a-excel` | Pasar tablas de PDF a Excel | ❌ No | ❌ No | ✅ Sí (`convert-pdf-tables-to-excel`) |
| `hacer-buscable-pdf-escaneado-ocr` | Hacer buscable un PDF escaneado con OCR | ❌ No | ❌ No | ✅ Sí (`make-scanned-pdf-searchable-with-ocr`) |
| `rellenar-y-firmar-formulario-pdf` | Rellenar y firmar formulario PDF | ❌ No | ❌ No | ✅ Sí (`fill-and-sign-pdf-form`) |

*(Las otras 7 guías o están indexadas en los 3 idiomas o no han entrado todavía).*

---

## 4. Patrón Detectado en las URLs Faltantes
1. **Sin sesgo de idioma:** Las URLs indexadas y las no indexadas se distribuyen casi simétricamente (ES: 29 vs 42, CA: 31 vs 38, EN: 34 vs 37). Googlebot no tiene preferencia por un idioma concreto.
2. **Sesgo por tipo y profundidad de contenido:**
   - **100% de éxito en Hubs:** Las 3 Homes y los 3 Catálogos principales están 100% indexados.
   - **Las Guías tienen mayor tasa de indexación (60%) que las Herramientas (35.3%):** Las guías editoriales superan las 1.200 palabras de contenido textual único y profundo.
   - **Retraso en Herramientas secundarias y utilidades técnicas:** De las 51 herramientas, las 15 herramientas más complejas o recientes (`mejorar-imagenes`, `sanear-pdf`, `svg-a-pdf`, `markdown-a-pdf`, `pdf-a-markdown`, `aplanar-pdf`) no están indexadas en ningún idioma todavía.
   - **Retraso en páginas creadas recientemente:** Las rutas institucionales (`/es/sobre-nosotros`, `/ca/sobre-nosaltres`, `/en/about`), creadas en la auditoría del 19 de octubre, aún no aparecen en este corte de rastreo del 23 de octubre.

---

## 5. Registro Completo de las 117 URLs del Sitemap Pendientes de Indexación

<details>
<summary><strong>Ver lista completa de las 117 URLs pendientes (clic para desplegar)</strong></summary>

### Español (`es`) — 42 URLs
1. `https://breadpdf.com/es/sobre-nosotros`
2. `https://breadpdf.com/es/cookies`
3. `https://breadpdf.com/es/terminos`
4. `https://breadpdf.com/es/herramientas/unir-pdf`
5. `https://breadpdf.com/es/herramientas/jpg-a-pdf`
6. `https://breadpdf.com/es/herramientas/extraer-paginas-pdf`
7. `https://breadpdf.com/es/herramientas/eliminar-paginas-pdf`
8. `https://breadpdf.com/es/herramientas/extraer-texto-pdf`
9. `https://breadpdf.com/es/herramientas/pdf-a-word`
10. `https://breadpdf.com/es/herramientas/word-a-pdf`
11. `https://breadpdf.com/es/herramientas/marca-de-agua`
12. `https://breadpdf.com/es/herramientas/ocr-pdf`
13. `https://breadpdf.com/es/herramientas/reparar-pdf`
14. `https://breadpdf.com/es/herramientas/desbloquear-pdf`
15. `https://breadpdf.com/es/herramientas/pdf-a-excel`
16. `https://breadpdf.com/es/herramientas/comparar-pdf`
17. `https://breadpdf.com/es/herramientas/resumir-pdf`
18. `https://breadpdf.com/es/herramientas/pdf-a-powerpoint`
19. `https://breadpdf.com/es/herramientas/pdf-a-webp`
20. `https://breadpdf.com/es/herramientas/qr-pdf`
21. `https://breadpdf.com/es/herramientas/censurar-pdf`
22. `https://breadpdf.com/es/herramientas/pdf-a-markdown`
23. `https://breadpdf.com/es/herramientas/pdf-a-pdfa`
24. `https://breadpdf.com/es/herramientas/excel-a-pdf`
25. `https://breadpdf.com/es/herramientas/aplanar-pdf`
26. `https://breadpdf.com/es/herramientas/eliminar-metadatos-pdf`
27. `https://breadpdf.com/es/herramientas/redimensionar-pdf`
28. `https://breadpdf.com/es/herramientas/editar-metadatos-pdf`
29. `https://breadpdf.com/es/herramientas/insertar-paginas-pdf`
30. `https://breadpdf.com/es/herramientas/webp-a-pdf`
31. `https://breadpdf.com/es/herramientas/markdown-a-pdf`
32. `https://breadpdf.com/es/herramientas/powerpoint-a-pdf`
33. `https://breadpdf.com/es/herramientas/svg-a-pdf`
34. `https://breadpdf.com/es/herramientas/extraer-imagenes-pdf`
35. `https://breadpdf.com/es/herramientas/sanear-pdf`
36. `https://breadpdf.com/es/herramientas/rellenar-formulario-pdf`
37. `https://breadpdf.com/es/herramientas/mejorar-imagenes`
38. `https://breadpdf.com/es/guias/webp-vs-jpg-png-tiendas-online`
39. `https://breadpdf.com/es/guias/ocultar-datos-personales-pdf`
40. `https://breadpdf.com/es/guias/pasar-tablas-pdf-a-excel`
41. `https://breadpdf.com/es/guias/hacer-buscable-pdf-escaneado-ocr`
42. `https://breadpdf.com/es/guias/rellenar-y-firmar-formulario-pdf`

### Catalán (`ca`) — 38 URLs
1. `https://breadpdf.com/ca/sobre-nosaltres`
2. `https://breadpdf.com/ca/cookies`
3. `https://breadpdf.com/ca/eines/divideix-pdf`
4. `https://breadpdf.com/ca/eines/pdf-a-jpg`
5. `https://breadpdf.com/ca/eines/elimina-pagines-pdf`
6. `https://breadpdf.com/ca/eines/extreu-text-pdf`
7. `https://breadpdf.com/ca/eines/pdf-a-word`
8. `https://breadpdf.com/ca/eines/word-a-pdf`
9. `https://breadpdf.com/ca/eines/marca-daigua`
10. `https://breadpdf.com/ca/eines/ocr-pdf`
11. `https://breadpdf.com/ca/eines/reparar-pdf`
12. `https://breadpdf.com/ca/eines/desbloquejar-pdf`
13. `https://breadpdf.com/ca/eines/pdf-a-excel`
14. `https://breadpdf.com/ca/eines/comparar-pdf`
15. `https://breadpdf.com/ca/eines/pdf-a-powerpoint`
16. `https://breadpdf.com/ca/eines/pdf-a-webp`
17. `https://breadpdf.com/ca/eines/censurar-pdf`
18. `https://breadpdf.com/ca/eines/retallar-pdf`
19. `https://breadpdf.com/ca/eines/pdf-a-markdown`
20. `https://breadpdf.com/ca/eines/pdf-a-pdfa`
21. `https://breadpdf.com/ca/eines/excel-a-pdf`
22. `https://breadpdf.com/ca/eines/aplanar-pdf`
23. `https://breadpdf.com/ca/eines/eliminar-metadades-pdf`
24. `https://breadpdf.com/ca/eines/redimensionar-pdf`
25. `https://breadpdf.com/ca/eines/afegir-text-pdf`
26. `https://breadpdf.com/ca/eines/inserir-pagines-pdf`
27. `https://breadpdf.com/ca/eines/webp-a-pdf`
28. `https://breadpdf.com/ca/eines/markdown-a-pdf`
29. `https://breadpdf.com/ca/eines/powerpoint-a-pdf`
30. `https://breadpdf.com/ca/eines/svg-a-pdf`
31. `https://breadpdf.com/ca/eines/sanear-pdf`
32. `https://breadpdf.com/ca/eines/emplenar-formulari-pdf`
33. `https://breadpdf.com/ca/eines/millorar-imatges`
34. `https://breadpdf.com/ca/guies/webp-vs-jpg-png-botigues-online`
35. `https://breadpdf.com/ca/guies/ocultar-dades-personals-pdf`
36. `https://breadpdf.com/ca/guies/passar-taules-pdf-a-excel`
37. `https://breadpdf.com/ca/guies/fer-buscable-pdf-escanejat-ocr`
38. `https://breadpdf.com/ca/guies/omplir-i-signar-formulari-pdf`

### Inglés (`en`) — 37 URLs
1. `https://breadpdf.com/en/about`
2. `https://breadpdf.com/en/tools/split-pdf`
3. `https://breadpdf.com/en/tools/delete-pdf-pages`
4. `https://breadpdf.com/en/tools/extract-pdf-text`
5. `https://breadpdf.com/en/tools/pdf-to-word`
6. `https://breadpdf.com/en/tools/word-to-pdf`
7. `https://breadpdf.com/en/tools/watermark-pdf`
8. `https://breadpdf.com/en/tools/ocr-pdf`
9. `https://breadpdf.com/en/tools/repair-pdf`
10. `https://breadpdf.com/en/tools/unlock-pdf`
11. `https://breadpdf.com/en/tools/sign-pdf`
12. `https://breadpdf.com/en/tools/pdf-to-excel`
13. `https://breadpdf.com/en/tools/compare-pdf`
14. `https://breadpdf.com/en/tools/summarize-pdf`
15. `https://breadpdf.com/en/tools/pdf-to-powerpoint`
16. `https://breadpdf.com/en/tools/pdf-to-webp`
17. `https://breadpdf.com/en/tools/redact-pdf`
18. `https://breadpdf.com/en/tools/pdf-to-markdown`
19. `https://breadpdf.com/en/tools/pdf-to-pdfa`
20. `https://breadpdf.com/en/tools/excel-to-pdf`
21. `https://breadpdf.com/en/tools/reorder-pdf-pages`
22. `https://breadpdf.com/en/tools/flatten-pdf`
23. `https://breadpdf.com/en/tools/remove-pdf-metadata`
24. `https://breadpdf.com/en/tools/png-to-pdf`
25. `https://breadpdf.com/en/tools/edit-pdf-metadata`
26. `https://breadpdf.com/en/tools/insert-pages-pdf`
27. `https://breadpdf.com/en/tools/webp-to-pdf`
28. `https://breadpdf.com/en/tools/markdown-to-pdf`
29. `https://breadpdf.com/en/tools/powerpoint-to-pdf`
30. `https://breadpdf.com/en/tools/svg-to-pdf`
31. `https://breadpdf.com/en/tools/split-pdf-by-size`
32. `https://breadpdf.com/en/tools/image-to-webp`
33. `https://breadpdf.com/en/tools/sanitize-pdf`
34. `https://breadpdf.com/en/tools/fill-pdf-form`
35. `https://breadpdf.com/en/tools/enhance-image`
36. `https://breadpdf.com/en/guides/webp-vs-jpg-png-online-stores`
37. `https://breadpdf.com/en/guides/hide-personal-data-in-pdf`

</details>
