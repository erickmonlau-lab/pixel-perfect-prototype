# INFORME FASE SEO & GEO: BREADPDF

**Fecha:** 19 de Septiembre de 2026  
**Dominio de Producción:** `https://breadpdf.com`  
**Alcance:** Arquitectura de URLs, Sitemap XML dinámico, Canonicals, Hreflang multilingüe (ES/CA/EN + x-default), Datos Estructurados JSON-LD, Robots.txt, Directivas para motores de búsqueda tradicionales e IA (GEO).

---

## 1. URLs Indexables

BreadPDF cuenta con un total exacto de **207 URLs indexables** con contenido de valor real, único y localizado, libre de páginas duplicadas o thin content:

| Tipo de Página | ES | CA | EN | Total | Descripción / Patrón |
|---|---|---|---|---|---|
| **Páginas Principales (Home)** | 1 | 1 | 1 | **3** | `/{lang}` (Hero, catálogo categorizado, beneficios) |
| **Catálogo Completo** | 1 | 1 | 1 | **3** | `/{lang}/{tools_segment}` (Explorador de herramientas) |
| **Landing Planes / Premium** | 1 | 1 | 1 | **3** | `/{lang}/{premium_segment}` (Comparativa de planes y pricing) |
| **Herramientas Operativas (50)** | 50 | 50 | 50 | **150** | `/{lang}/{tools_segment}/{tool_slug}` (Workspace real + FAQ + Guía paso a paso) |
| **Páginas de Categoría (6)** | 6 | 6 | 6 | **18** | `/{lang}/{category_segment}/{category_slug}` (Organizar, Convertir a PDF, etc.) |
| **Guías Editoriales (10)** | 10 | 10 | 10 | **30** | `/{lang}/{guides_segment}/{guide_slug}` (Artículos técnicos profundos) |
| **TOTAL GENERAL** | **69** | **69** | **69** | **207** | **URLs indexables en sitemap.xml** |

---

## 2. URLs No Indexables y Motivo

Se han configurado directivas explícitas de **`robots: noindex, nofollow`** tanto a nivel de cabeceras/meta tags como en `robots.txt` para las siguientes rutas:

1. **Rutas de Autenticación (`/login`, `/registro`, `/recuperar-password`) en los 3 idiomas:**
   - **Motivo:** Formularios transaccionales idénticos sin valor de contenido orgánico público. Evita canibalización, soft 404s y consumo inútil de crawl budget.
2. **Panel de Usuario / Dashboard (`/cuenta`, `/compte`, `/account`):**
   - **Motivo:** Área privada protegida por sesión Supabase Auth. Los motores de búsqueda no deben ni pueden indexar información de perfil privado.
3. **Endpoints de API (`/api/*`):**
   - **Motivo:** Respuestas JSON internas de servicios backend.
4. **Parámetros transaccionales o de callback (`?mode=updatePassword`, tokens):**
   - **Motivo:** Bloqueados para evitar indexación accidental de tokens efímeros.

---

## 3. Sitemap Generado

- **Ruta física:** `/sitemap.xml` (servida dinámicamente vía endpoint Nitro/TanStack Start en `src/routes/sitemap.xml.ts`).
- **Formato y Namespace:**
  - Cumple el estándar Sitemaps 0.9 (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`).
  - Incluye extensión oficial W3C XHTML (`xmlns:xhtml="http://www.w3.org/1999/xhtml"`).
- **Atributos de entrada:** Cada uno de los 207 nodos `<url>` incluye:
  - `<loc>`: URL canónica absoluta con HTTPS.
  - `<lastmod>`: Fecha ISO actualizada.
  - `<changefreq>`: Ajustado por relevancia (`daily` para home/catálogo, `weekly` para herramientas, `monthly` para guías y legal).
  - `<priority>`: `1.0` (Home), `0.9` (Herramientas más populares), `0.8` (Resto de herramientas), `0.7` (Categorías y guías).
  - **Enlaces cruzados `<xhtml:link rel="alternate">`** declarando las versiones `es`, `ca`, `en` y `x-default` para esa misma entidad.

---

## 4. Hreflang Implementado

Se ha garantizado la reciprocidad absoluta y bidireccional entre las tres lenguas principales y el fallback global:
- **`es`**: Español (idioma por defecto).
- **`ca`**: Catalán (con traducción de slugs canónicos adaptados a búsquedas locales: e.g. `/ca/eines/uneix-pdf`).
- **`en`**: Inglés (slugs internacionales: e.g. `/en/tools/merge-pdf`).
- **`x-default`**: Apunta siempre a la versión en español (`/es/...`) como fallback para regiones e idiomas no coincidentes.
- **Implementación dual:**
  1. En el encabezado `<head>` de cada página mediante etiquetas `<link rel="alternate" hreflang="..." href="...">`.
  2. Dentro del propio `sitemap.xml` con nodos `<xhtml:link>`, maximizando el descubrimiento por parte de Googlebot.

---

## 5. Canonicals

- Cada página cuenta con su etiqueta única `<link rel="canonical" href="...">`.
- **Comportamiento:**
  - En las URLs de herramientas, apunta exactamente a la URL localizada con el slug correspondiente a su idioma actual.
  - No hay canónicos cruzados entre idiomas (se usa `hreflang` para la relación multilingüe, no `canonical`).
  - La raíz `/` redirige de forma limpia a `/{locale}` según cabecera del navegador o `/es` por defecto, manteniendo siempre canónicos absolutos y consistentes.

---

## 6. Structured Data (JSON-LD)

Se implementó una estrategia estricta de marcado semántico Schema.org basado **exclusivamente en contenido visible real** (sin datos ficticios):

1. **`BreadcrumbList` (en todas las páginas jerárquicas):**
   - Refleja el camino de migas de pan visible: Inicio → Sección/Categoría → Herramienta / Guía.
2. **`WebApplication` (en las 50 herramientas):**
   - Propiedades: `@type: "WebApplication"`, `applicationCategory: "UtilitiesApplication"`, `operatingSystem: "All"`, `offers: { price: "0", priceCurrency: "EUR" }`.
3. **`FAQPage` (en las herramientas):**
   - Extraído directamente del array de preguntas y respuestas reales visibles en el acordeón de FAQ inferior de cada herramienta.
4. **`HowTo` (en las herramientas):**
   - Construido a partir de las secciones "Cómo funciona" visibles en pantalla (`tool.howItWorks`), con pasos secuenciales reales (`HowToStep`).
5. **`Organization` y `WebSite` (en la Home):**
   - Declara la marca BreadPDF, logo SVG, URL base y descripción general en el idioma activo.
6. **`Article` (en las 10 guías técnicas):**
   - Datos de autoría, fecha de publicación y cuerpo temático del artículo.

---

## 7. Robots.txt y Motores de IA (GEO)

Ubicación: `public/robots.txt`.
- **Rastreadores tradicionales:** Permitido explícitamente `Googlebot`, `Bingbot`, `Applebot`.
- **Optimización para Motores Generativos (GEO / AI Overviews):**
  - Se permite expresamente el acceso a `OAI-SearchBot` y `PerplexityBot` para que los motores de búsqueda basados en LLMs puedan citar y enlazar a las herramientas de BreadPDF en respuestas generativas.
- **Restricciones:**
  - Bloqueo de directorios `/api/`, `/*/cuenta`, `/*/login`, `/*/registro`, `/*/recuperar-password`.
- **Referencia a sitemap:**
  - `Sitemap: https://breadpdf.com/sitemap.xml`.

---

## 8. Problemas Encontrados y Corregidos

1. **Falta de namespaces XHTML en el sitemap:**
   - *Problema:* El generador de sitemap XML no declaraba `xmlns:xhtml="http://www.w3.org/1999/xhtml"`, lo que provocaba que las etiquetas `<xhtml:link>` fueran rechazadas por validadores estrictos de Google Search Console.
   - *Corrección:* Se añadió el namespace W3C XHTML y la generación automática de los bloques de idiomas alternativos (`es`, `ca`, `en`, `x-default`) en cada entrada.
2. **Inconsistencia en slugs catalanes de herramientas:**
   - *Problema:* Algunas herramientas compartían slugs castellanos en catalán (`unir-pdf` frente a `uneix-pdf`).
   - *Corrección:* Se mapearon correctamente los slugs nativos en catalán en `routing.ts`, asegurando URLs 100% orgánicas para la intención de búsqueda catalana.
3. **Ausencia de marcado HowTo en herramientas:**
   - *Problema:* Las herramientas contaban con pasos explicativos visuales ("Cómo funciona"), pero no contaban con el marcado Schema `HowTo`.
   - *Corrección:* Se integró en `@graph` de la ruta `$slug.tsx` la conversión directa de `tool.howItWorks` a `HowToStep`.
4. **Metadatos OpenGraph y Twitter unificados:**
   - *Problema:* Algunas páginas no contaban con OpenGraph localized tags (`og:locale:alternate`).
   - *Corrección:* Se completó la metainformación de redes sociales con imágenes de preview, locale primario y locales alternativos.

---

## 9. Decisiones SEO que Requieren Revisión antes de Continuar

1. **Verificación de Propiedades en Google Search Console y Bing Webmaster Tools:**
   - Recomiendo registrar la propiedad de dominio `breadpdf.com` mediante registro DNS (TXT) para abarcar todos los subdominios y protocolos.
2. **Estrategia de IndexNow:**
   - BreadPDF está listo para enviar automáticamente pings a Bing e IndexNow cada vez que se actualice el sitemap en despliegues futuros.
3. **Dominio principal y certificados SSL en Cloudflare:**
   - Asegurar que la redirección de `http://` a `https://` y de `www.breadpdf.com` a `breadpdf.com` esté forzada a nivel de Edge en Cloudflare para evitar bifurcación de PageRank.
