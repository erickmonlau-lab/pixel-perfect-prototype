# Medición SEO y analítica — BreadPDF

## Qué existe

**Estado comprobado el 28-10-2026:** no hay conexión activa de solo lectura a Search Console ni GA4 en las herramientas de esta sesión. La búsqueda de integraciones encontró opciones de terceros que requieren instalación/conexión; no se concedió acceso ni se consultaron métricas. El único extracto local sigue siendo una instantánea de indexación, no datos de consultas o rendimiento.

- `src/lib/analytics/gtm.ts` declara `GTM-M6D3R3JF` y eventos de página, selección, inicio/fin de proceso, descarga y navegación de catálogo. Los comentarios indican que no se transmiten nombres ni contenido de archivos; revisar la configuración publicada del contenedor para confirmar los tags y variables reales.
- `src/routes/__root.tsx` inicializa el dataLayer y carga GTM tras interacción o demora. La vista SPA envía `page_view` al cambiar ruta.
- `src/lib/indexnow.ts` ofrece una función con endpoint de envío, pero el repositorio no muestra un llamador automático desde publicación ni una clave configurada. No anunciarlo como activado.
- Hay archivos Lighthouse históricos y un extracto de URLs de Search Console aportado al repositorio. No hay export de consultas/rendimiento reciente ni acceso conectado de solo lectura en esta ejecución.

## Cierre de validación pública — 28-10-2026

- Rama `main`, `HEAD=f5b80c04044725edbbf2e2ff0f2ce9409892987f`; el árbol quedó limpio antes de ejecutar la compilación. El remoto es GitHub (`erickmonlau-lab/pixel-perfect-prototype`). La configuración local indica conexión de este branch con Lovable; el build emite configuración de worker para Cloudflare, mientras que las respuestas públicas usan cabeceras de Vercel. No hay evidencia disponible del panel/pipeline que permita asociar el SHA a un deployment de Vercel. Un push a `main` no basta para afirmar que se publicó.
- `https://breadpdf.com/robots.txt` y `/sitemap.xml` responden 200. El sitemap contiene 201 URLs únicas repartidas en 67 por idioma (ES/CA/EN); canonical y alternates se revisaron en la muestra de compresión localizada. Esto solo describe sitemap y respuestas HTTP; no demuestra indexación de Google.
- Las tres rutas públicas de compresión —`/es/herramientas/comprimir-pdf`, `/ca/eines/comprimeix-pdf`, `/en/tools/compress-pdf`— responden 200 con contenido localizado y canonical. `/es/herramientas` redirige a `/es#catalogo`; la categoría optimizar lleva a `/es?categoria=optimizar#catalogo`; un slug desconocido da una respuesta real 404.
- La medición de PSI nueva quedó **bloqueada**: `pagespeedonline/v5/runPagespeed` respondió HTTP 429 y el informe público no pudo leerse desde el navegador/lector disponible. Los scores del brief siguen siendo históricos y no se comparan directamente con Lighthouse.
- Lighthouse CLI con Chrome midió producción antes y después (resultados de laboratorio, no PSI). Las cuatro corridas originales, previas a cambios:

  | Dispositivo/corrida | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
  |---|---:|---:|---:|---:|---:|---:|---:|---:|
  | Móvil 1 (12:25) | 100 | 96 | 100 | 100 | 1,2 s | 1,2 s | 50 ms | 0,002 |
  | Móvil 2 (12:30) | 98 | 96 | 100 | 100 | 1,1 s | 1,1 s | 30 ms | 0 |
  | Escritorio 1 (12:28) | 98 | 97 | 100 | 100 | 0,3 s | 1,1 s | 0 ms | 0,005 |
  | Escritorio 2 (12:32) | 98 | 97 | 100 | 100 | 0,3 s | 1,2 s | 0 ms | 0,005 |

  En la referencia Lighthouse, el LCP observado fue texto del hero en móvil y la mascota hero en escritorio. Accesibilidad marcaba 30 nodos móviles y 32 de escritorio con contraste insuficiente.

### Resultados finales de producción — 28-10-2026

Después de publicar `98542c5`, `ef28cd3` y `8cd0b0e`, Lighthouse cargó nuevos hashes de los bundles y la variante WebP pública; esa es evidencia de que los cambios llegaron al dominio, aunque no se consultó el SHA desde el panel de Vercel. Las mediciones finales siguientes corresponden a la versión con WebP:

| Dispositivo/corrida | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Móvil final repetida (12:55) | 98 | 100 | 100 | 100 | 1,1 s | 1,1 s | 80 ms | 0 |
| Escritorio final repetida (12:55) | 100 | 100 | 100 | 100 | 0,4 s | 0,7 s | 0 ms | 0,002 |

El contraste reportó 0 nodos con error en móvil y escritorio. Rendimiento móvil osciló entre 97–98 en las corridas; escritorio quedó entre 99–100 antes de la variante final y 100 en la repetición final. Son resultados de laboratorio y no sustituyen PSI/CWV de campo. En las últimas corridas FCP/LCP quedaron bajo los objetivos técnicos de 1,8/2,5 s. El ahorro estimado de JavaScript no usado fue 246 KiB móvil y 224 KiB escritorio, principalmente scripts publicitarios/consentimiento; diferir AdSense no elimina ese trabajo reportado por Lighthouse. La oportunidad estimada de imágenes en escritorio bajó de 103 KiB a 13 KiB tras servir el WebP de 27,2 KB.

- Cambios de código publicados: precarga de Plus Jakarta Sans 800 e Inter 500 solo en la portada; integración asíncrona de AdSense (el estado inicial se midió con espera tras `load`, actualizada el 28-10 para cargar el script oficial en la cabecera sin espera artificial); variante WebP de escritorio para la mascota hero (113,45 KB → 27,08 KB, ahorro 86,37 KB / 76,1%) y WebP ligera para la mascota de 36 px; fondos oscuros en etiquetas pequeñas para contraste legible; color corregido del chip “Todas”.
- Verificación: `npm run build` pasó con `VITE_ADSENSE_ENABLED=true` en el entorno de build. `git diff --check` pasó. No hay script de pruebas automatizadas en `package.json`; ESLint no pasó en archivos tocados (errores de Prettier/formato y un warning de hooks), así que no se declara validación integral ni se afirma que todos los flujos funcionales de herramientas se hayan reejecutado.
- PSI oficial continúa sin medición: el endpoint previamente devolvió HTTP 429. Los números de esta sección son Lighthouse CLI contra producción, no PageSpeed Insights.
- La mascota visible móvil usa WebP de 3,1 KB frente al PNG previo de 245,4 KB (ahorro bruto aproximado 242,4 KB / 98,8%). No se atribuye una mejora de LCP a ese ahorro: el LCP móvil medido es texto del hero. En escritorio Lighthouse descargó el WebP hero de 27,2 KB.
- Véase [`SEO_ADSENSE_AUDIT.md`](SEO_ADSENSE_AUDIT.md) para cuenta, `ads.txt`, CMP/TCF y estado de anuncios. La aprobación y publicación real de anuncios no se verificaron desde la cuenta.

### Accesos para completar la medición

- Para repetir PSI sin cuota excedida, proporcionar una clave de API de PageSpeed Insights o habilitar una cuota/proyecto autorizado. Una clave no debe guardarse en el repositorio.
- Para Search Console y GA4 hace falta autorizar los scopes oficiales de solo lectura (`webmasters.readonly` y `analytics.readonly`) en una conexión disponible; las métricas siguen sin estar verificadas.
- El commit en GitHub y los assets con hash nuevo se comprobaron; para confirmar el SHA exacto del deployment hace falta acceso de lectura al panel/pipeline de Vercel.

### Verificación posterior — AdSense/CMP y hub de guías — 28-10-2026

- `a0494ce` se subió a `main`. Una consulta posterior a `https://breadpdf.com/es` respondió 200 y el HTML público contenía exactamente una referencia al script oficial `adsbygoogle.js` y no contenía el antiguo temporizador `requestIdleCallback(load)`. Las corridas Lighthouse observaron solicitudes a Google Funding Choices; eso prueba la carga técnica de la CMP, pero no su certificación TCF, la configuración de consentimiento ni la aprobación de la cuenta.
- Lighthouse CLI 13.6.0, producción, tres ejecuciones comparables por dispositivo. Móvil usó preset móvil; escritorio usó `--preset=desktop`. Las primeras corridas etiquetadas como escritorio se descartaron: aplicaban por error red móvil y no son comparables.

  | Dispositivo/corrida | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
  |---|---:|---:|---:|---:|---:|---:|---:|---:|
  | Móvil 1 | 98 | 100 | 100 | 100 | 1,1 s | 1,1 s | 50 ms | 0 |
  | Móvil 2 | 98 | 100 | 100 | 100 | 1,1 s | 1,1 s | 70 ms | 0 |
  | Móvil 3 | 98 | 100 | 100 | 100 | 1,1 s | 1,1 s | 90 ms | 0 |
  | Escritorio 1 | 99 | 100 | 100 | 100 | 0,3 s | 0,8 s | 0 ms | 0,003 |
  | Escritorio 2 | 99 | 100 | 100 | 100 | 0,3 s | 0,9 s | 0 ms | 0,003 |
  | Escritorio 3 | 99 | 100 | 100 | 100 | 0,3 s | 1,0 s | 0 ms | 0,003 |

- Las mediciones siguen siendo Lighthouse de laboratorio, no PageSpeed Insights ni Core Web Vitals de campo. No se repitió PSI porque su API ya había respondido 429. El LCP queda bajo 2,5 s en ambas configuraciones; las puntuaciones de Rendimiento observadas fueron 98 móvil y 99 escritorio. El JavaScript de anuncios y Funding Choices aparece en la red y en el trabajo de terceros; no se modificó ni bloqueó ese código.
- Las auditorías Lighthouse no identifican una causa concreta para la redistribución forzada de 50 ms de la captura inicial. No se añadió una corrección especulativa al DOM. La oportunidad de CSS bloqueante se mantiene pequeña y el CSS global pesa unos 31,4 KB comprimido; no se introdujo CSS crítico duplicado.
- El índice editorial de guías se compactó en ES/CA/EN: contenedor más estrecho, encabezado blanco sólido, jerarquía tipográfica reducida, tarjetas blancas con borde negro y acento cromático sólido por categoría. Se conservaron títulos, descripciones, autores y rutas localizadas. Tras subir `0e1a5d3`, `/es/guias`, `/ca/guies` y `/en/guides` respondieron 200 con las diez tarjetas localizadas y el nuevo marcado de tarjeta. `vercel inspect` mostró el deployment más reciente en estado Ready, entorno Production, con el alias `breadpdf.com`; Vercel CLI no expuso el SHA de Git, por lo que el enlace commit-deployment se infiere de la hora y el HTML público, no del campo de SHA en Vercel.
- La cuenta de AdSense y su aprobación no son visibles desde esta sesión. `ads.txt`, CMP/TCF y publicación real de anuncios mantienen el estado de la auditoría existente en [`SEO_ADSENSE_AUDIT.md`](SEO_ADSENSE_AUDIT.md); la presencia de scripts no prueba que haya anuncios servidos.

### Cierre de optimización de plantillas y accesibilidad — 28-10-2026

Esta sección cierra la tanda iniciada en `ec0f79a`. Todas las cifras son Lighthouse CLI 13.6.0 contra producción (laboratorio, throttling simulado), no PageSpeed Insights ni datos de campo.

**Cadena commit → deployment.** Verificada con la API de Vercel leyendo `meta.githubCommitSha` de cada deployment, no por fecha ni por inferencia. Los cinco deployments están en estado `READY`, entorno `production`, y el log de build indica la rama y el commit clonados.

| Commit | Deployment | Log de build |
|---|---|---|
| `ec0f79a` | `dpl_67H89ios3hKmaKDU82UcSKMT9nmW` | referencia inicial medida |
| `dbef8f3` | `dpl_7KD1AYRSCAmbSt43oV5ETQZKAWN5` | `Cloning … (Branch: main, Commit: dbef8f3)` · `Build Completed in /vercel/output [15s]` |
| `976f53e` | `dpl_92vqEAzEks4F6u5PG25nTLUad3gD` | commit `976f53e` en `meta.githubCommitSha`, sin errores de compilación |
| `0540fb2` | `dpl_8ZLBo3Yr55iMv8SrFsCYTuxbth4S` | `Cloning … (Branch: main, Commit: 0540fb2)` · `Build Completed in /vercel/output [13s]` |
| `316ce5a` | `dpl_9yAmXXe53upLc2ESz23QKbKzKayg` | `Cloning … (Branch: main, Commit: 316ce5a)` · `Build Completed in /vercel/output [13s]` |

El endpoint `v5/now/deployments/<id>` devolvió el campo `alias` vacío en estas consultas, así que la publicación en `breadpdf.com` no se deduce de ese campo. Se comprobó por contenido servido: el HTML público de `/es/guias` incluye `bg-emerald-700`, el CSS servido cambió a `/assets/styles-DGlQA_iw.css` y contiene `.text-eyebrow` con `#C9302C`, y `/es/guias/pasar-tablas-pdf-a-excel` sirve el título del callout como `<p class="…guide-mascot-callout__title">`. El log de build no mostró errores; solo los avisos conocidos de npm y de Vite.

**Portada (`/es`) tras `316ce5a`:**

| Corrida | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | SI | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Móvil 1 | 98 | 100 | 100 | 100 | 1079 ms | 1079 ms | 49 ms | 3821 ms | 0 |
| Móvil 2 | 97 | 100 | 100 | 100 | 1079 ms | 1079 ms | 111 ms | 3793 ms | 0 |
| Escritorio 1 | 99 | 100 | 100 | 100 | 320 ms | 857 ms | 0 ms | 466 ms | 0 |
| Escritorio 2 | 99 | 100 | 100 | 100 | 318 ms | 878 ms | 0 ms | 434 ms | 0 |

La diferencia frente a `dbef8f3` (móvil 98/98/98, escritorio 99/99/99) está dentro de la variación del laboratorio: el TBT móvil osciló 49–111 ms y el SI 3793–3821 ms en la misma versión. No se atribuye ninguna mejora de rendimiento a los cambios de color o de etiquetado.

**Plantillas medidas antes/después (móvil, una corrida por estado):**

| Plantilla | Antes | Después | Cambios que la explican |
|---|---|---|---|
| Herramienta `/es/herramientas/comprimir-pdf` | 98 / **87** / 100 / 100 | 99 / **100** / 100 / 100 | Contraste `#C9302C`, `role="region"` en el contenedor de anuncio, `aria-label` en el input de archivo, nombre accesible del botón de favorito y del enlace de catálogo alineado con el texto visible |
| Guía `/es/guias/pasar-tablas-pdf-a-excel` | 98 / **94** / 100 / 100 | 98 / **100** / 100 / 100 | Contraste y orden de encabezados (callout y pie de guía) |
| Guía `/es/guias/eliminar-paginas-en-blanco-pdf-escaneado` | no medida | 98 / **100** / 100 / 100 | Validación cruzada del mismo componente de guía |
| Hub `/es/guias` | no medida (a11y **96**) | 97 / **100** / 100 / 100 | Insignias de categoría a `-700`, CTA y cifra destacada a `#C9302C` |
| Legal `/es/privacidad` | no medida (a11y **96**) | 98 / **100** / 100 / 100 | `.text-eyebrow` a `#C9302C` |
| Portadas `/ca` y `/en`; herramienta `/ca/eines/comprimeix-pdf`; guía `/ca/guies/ocultar-dades-personals-pdf` | — | a11y **100** en las cuatro | Mismos tokens compartidos |

El único rojo de marca que se cambió en plantillas de herramienta y guía, hub y etiquetas pequeñas es `#EC3C2D`/`#F13B32` → `#C9302C` (contraste 4,56–5,33 según fondo claro). La portada y la cabecera conservan su paleta. No se ocultaron elementos, no se desactivaron animaciones ni anuncios y no se alteró el orden visual.

**Rastreo y enlaces internos (repetidos tras `316ce5a`).** Los resultados actualizados están en [`SEO_CRAWL_SUMMARY.csv`](SEO_CRAWL_SUMMARY.csv) y [`SEO_INTERNAL_LINKS.csv`](SEO_INTERNAL_LINKS.csv), generados con `npm run seo:audit` y `npm run seo:links`:

- 201 URLs: 0 respuestas no-200, 0 sin `title`/`description`/`canonical`, 0 canonical distinta, 0 `noindex`, 0 páginas delgadas, exactamente un `h1` en cada una y 0 sin hreflang.
- Títulos duplicados: 0 (antes 1, ES/CA de cookies). Títulos cortos: 0 (antes 1, EN de cookies; ahora «Cookie Policy: Cookies, Consent and Ads | BreadPDF», 50 caracteres).
- Pendiente editorial, no técnico: 29 títulos de 66–74 caracteres (17 de herramienta, 12 de guía) y 6 descripciones de 166–176 caracteres. Superan la guía de longitud de SERP pero no rompen canonical, indexabilidad ni deduplicación.
- Enlaces internos: 0 páginas huérfanas y 0 páginas con solo 1–2 enlaces entrantes; las 201 tienen al menos 3.

**Precarga de la mascota de escritorio (`dbef8f3`).** Se añadió `preload` de `hero-mascot-perfect.webp` con `media="(min-width: 1280px)"` y `fetchPriority="high"`. En producción el preload aparece en el HTML. El LCP de escritorio no mejoró de forma medible: 837 ms antes frente a 846/834/839 ms después; la latencia de carga del recurso varió 159 ms frente a 123 ms. Se mantiene porque elimina un descubrimiento tardío, pero no se presenta como mejora demostrada.

**Diagnóstico del Speed Index móvil (3,8–4,1 s).** Se descartaron como causa el bundle de la aplicación, las fuentes y los terceros: con el JS propio bloqueado, el primer pintado observado siguió en ~2,4 s; con terceros y fuentes bloqueados ocurrió lo mismo (~2,6 s). Las capturas de las tramas 2–6 del informe son `#111111` (marcador de «sin fotograma») y la primera trama con contenido aparece en ~3 s, aunque el DOM y el texto del hero están en el HTML SSR inicial y el FCP simulado es ~1,08 s. El retraso se interpreta como artefacto del pipeline de captura de Lighthouse con este diseño animado, no como una pantalla bloqueada para el usuario; no se modificó el producto para maquillar la métrica. Solo se añadió un guard de `prefers-reduced-motion` en el placeholder animado del buscador.

**AdSense, consentimiento y datos externos.** Hechos comprobados: `ads.txt` contiene `pub-7477829897419785`, cada página carga un único `adsbygoogle.js`, las guías y la portada no renderizan `<ins class="adsbygoogle">`, las herramientas renderizan uno, y se observan peticiones a Funding Choices. `VITE_ADSENSE_ENABLED` existe solo en Production, por lo que un deployment de preview no muestra anuncios y no sirve para comparar rendimiento publicitario. No verificados por falta de acceso: aprobación de la cuenta, anuncios realmente servidos, certificación TCF de la CMP, mensajes publicados y estado en Search Console/GA4/Bing. Tampoco se pudo enviar IndexNow: no hay `INDEXNOW_API_KEY` ni archivo de clave en el sitio; el script `npm run seo:indexnow` falla con un mensaje explícito y `--write-key` genera la clave para publicarla.

**Herramientas añadidas al repositorio.** `scripts/crawl-seo-audit.mjs` (metadatos, canonical, robots, hreflang, h1, palabras), `scripts/internal-links-audit.mjs` (enlaces entrantes desde el sitemap) y `scripts/indexnow.mjs` (envío y generación de clave). Se ejecutan con `npm run seo:audit`, `npm run seo:links` y `npm run seo:indexnow`; no requieren credenciales salvo IndexNow.

**Límites de esta validación.** No se probaron los flujos funcionales de las 51 herramientas ni la descarga/procesado real de archivos; el alcance fue HTML servido, metadatos, enlaces y auditorías de plantilla. Las cifras de rendimiento son de laboratorio y varían entre corridas. PSI sigue sin medirse por HTTP 429.

## No confundir con evidencia de negocio

- `cerebro/raw/Tabla.csv` registra URL y último rastreo, no clics/impresiones/CTR/consulta. Su fecha de referencia es 23-10-2026.
- `BREADPDF_MASTER_KEYWORDS.csv` declara bandas de volumen y fuentes históricas, pero no incluye el export original verificable. No usar esas bandas como métricas.
- [`SEO_KEYWORD_MAP.csv`](SEO_KEYWORD_MAP.csv) tiene 485 objetivos inferidos de listas del código, con volumen `not measured`.
- Lighthouse es una prueba sintética por URL/dispositivo/fecha; no representa el CWV de campo ni mide demanda SEO.

## Panel mínimo a habilitar

Exportar una vez por semana desde Search Console (solo lectura) con ventana fija de 28 y 90 días:

| Dimensión | Métricas |
|---|---|
| Query | clics, impresiones, CTR, posición, país, dispositivo |
| Page | clics, impresiones, CTR, posición, país, dispositivo |
| Indexación | razón de exclusión/estado, canonical declarada y elegida cuando esté disponible |
| Core Web Vitals | estado móvil/desktop y URLs/grupos afectados |
| Sitemap | URLs enviadas, leídas, indexadas y última lectura |

Segmentar ES/CA/EN y familias, separar consultas de marca de no marca y comparar por tipo de página. No sumar filas de query y page como si fueran la misma métrica. Guardar fecha de extracción, zona horaria, filtros, límites y fuente.

En Analytics, primero comprobar que la medición respeta la política de consentimiento configurada. Una vez autorizada y validada, instrumentar eventos agregados por herramienta/idioma y resultado sin nombre de archivo ni texto del PDF; observar tasa de selección → proceso → descarga, errores y abandono. Evitar optimizar con eventos que todavía no se sabe si se disparan en producción.

## Objetivos técnicos

Utilizar los umbrales recomendados actualmente por Google para datos de campo al percentil 75: LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1. Revisar tendencias y plantillas; no marcar una tarea como aprobada con un único test local. Fuente: [Core Web Vitals en Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals).
