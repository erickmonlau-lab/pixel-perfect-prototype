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

Después de publicar `98542c5` y la corrección puntual `ef28cd3`, Lighthouse cargó nuevos hashes de los bundles públicos; esa es evidencia de que ambos cambios llegaron al dominio, aunque no se consultó el SHA desde el panel de Vercel. Las dos mediciones finales corresponden a la versión con `ef28cd3`:

| Dispositivo/corrida | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Móvil final (12:48) | 98 | 100 | 100 | 100 | 1,1 s | 1,1 s | 70 ms | 0 |
| Escritorio final (12:47) | 99 | 100 | 100 | 100 | 0,5 s | 0,8 s | 0 ms | 0,002 |

El contraste reportó 0 nodos con error en móvil y escritorio. Rendimiento varió entre corridas previas de 97–100 móvil y 97–100 escritorio; las puntuaciones son laboratorio y no demuestran una mejora estable ni sustituyen a PSI/CWV de campo. En estas corridas el FCP/LCP quedaron bajo los objetivos técnicos de 1,8/2,5 s. El ahorro estimado de JavaScript no usado siguió siendo 246 KiB móvil y 224 KiB escritorio, principalmente scripts publicitarios/consentimiento; diferir AdSense no elimina ese trabajo reportado por Lighthouse.

- Cambios de código publicados: precarga de Plus Jakarta Sans 800 e Inter 500 solo en la portada; carga de AdSense tras `load` y tiempo ocioso cuando `VITE_ADSENSE_ENABLED=true` (sin cambiar publisher, consentimiento, CMP, slots ni estado de anuncios); variante WebP ligera para la mascota de 36 px; fondos oscuros en etiquetas pequeñas para contraste legible; color corregido del chip “Todas”.
- Verificación: `npm run build` pasó con `VITE_ADSENSE_ENABLED=true` en el entorno de build. `git diff --check` pasó. No hay script de pruebas automatizadas en `package.json`; ESLint no pasó en archivos tocados (errores de Prettier/formato y un warning de hooks), así que no se declara validación integral ni se afirma que todos los flujos funcionales de herramientas se hayan reejecutado.
- PSI oficial continúa sin medición: el endpoint previamente devolvió HTTP 429. Los números de esta sección son Lighthouse CLI contra producción, no PageSpeed Insights.
- La mascota visible móvil usa WebP de 3,1 KB frente al PNG previo de 245,4 KB (ahorro bruto aproximado 242,4 KB / 98,8%). No se atribuye una mejora de LCP a ese ahorro: el LCP móvil medido es texto del hero.
- Véase [`SEO_ADSENSE_AUDIT.md`](SEO_ADSENSE_AUDIT.md) para cuenta, `ads.txt`, CMP/TCF y estado de anuncios. La aprobación y publicación real de anuncios no se verificaron desde la cuenta.

### Accesos para completar la medición

- Para repetir PSI sin cuota excedida, proporcionar una clave de API de PageSpeed Insights o habilitar una cuota/proyecto autorizado. Una clave no debe guardarse en el repositorio.
- Para Search Console y GA4 hace falta autorizar los scopes oficiales de solo lectura (`webmasters.readonly` y `analytics.readonly`) en una conexión disponible; las métricas siguen sin estar verificadas.
- El commit en GitHub y los assets con hash nuevo se comprobaron; para confirmar el SHA exacto del deployment hace falta acceso de lectura al panel/pipeline de Vercel.

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
