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
- Lighthouse CLI con Chrome sí midió producción dos veces por dispositivo (resultados de laboratorio, no PSI), antes de los cambios locales de imagen/contraste:

  | Dispositivo/corrida | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
  |---|---:|---:|---:|---:|---:|---:|---:|---:|
  | Móvil 1 (12:25) | 100 | 96 | 100 | 100 | 1,2 s | 1,2 s | 50 ms | 0,002 |
  | Móvil 2 (12:30) | 98 | 96 | 100 | 100 | 1,1 s | 1,1 s | 30 ms | 0 |
  | Escritorio 1 (12:28) | 98 | 97 | 100 | 100 | 0,3 s | 1,1 s | 0 ms | 0,005 |
  | Escritorio 2 (12:32) | 98 | 97 | 100 | 100 | 0,3 s | 1,2 s | 0 ms | 0,005 |

  El LCP observado fue texto del hero en móvil y la mascota hero en escritorio. La auditoría de contraste encontró 30 nodos móviles y 32 de escritorio; los tonos locales ya ajustados superan 4,5:1 según cálculo estático, pero aún falta repetir Lighthouse sobre esos cambios.
- La compilación cliente y SSR de `npm run build` pasó. El build conserva bundles grandes de catálogo y herramientas; no se modificó su división porque la traza móvil local quedó bloqueada antes de obtener un informe válido.
- Enlaces de producción observados responden desde Vercel (`Server: Vercel`, `x-vercel-id`). No se accedió a los logs ni al SHA publicado por falta de sesión del proveedor. Véase [`SEO_ADSENSE_AUDIT.md`](SEO_ADSENSE_AUDIT.md) para el estado público de publicidad y consentimiento.
- Cambio local derivado de la evidencia: la mascota visible de 36 px en móvil pasa de un PNG de 245.4 KB a un icono WebP de 3.1 KB (ahorro bruto aproximado 242.4 KB, 98.8%). La imagen hero desktop se mantiene en `<picture>` con prioridad alta. La medición local posterior no pudo ejecutarse: Chrome mostró un interstitial al navegar al servidor preview por `localhost`, incluso con el proxy desactivado. La compilación sí pasó, pero no se atribuye ninguna mejora de score o LCP a este cambio.
- Iteración local posterior: se añadieron preload de las dos fuentes que dibujan el hero de portada (Plus Jakarta Sans 800 e Inter 500, solo en rutas de inicio) y la descarga del script AdSense se pospuso hasta `load` + tiempo ocioso con timeout. No se alteran el publisher ID, las señales CMP/TCF, los slots ni el flag de monetización. El build volvió a pasar; falta una medición Lighthouse post-cambio porque el preview local activa un interstitial. No hay evidencia aún de mejora de producción.
- La medición Lighthouse previa atribuyó aproximadamente 235 KiB de JavaScript no usado en móvil y 247 KiB en escritorio; 136 KiB correspondían al script gestionado de AdSense y unos 38 KiB al marco de mensajes Funding Choices. La métrica es una oportunidad de laboratorio, no una indicación para desactivar anuncios ni consentimiento. Las variantes locales con colores accesibles corrigen algunos de los nodos detectados, pero el total de avisos de contraste requiere volver a medir la compilación actual.
- Validación de este árbol: `npm run build` pasó. No hay script de pruebas automatizadas en `package.json`; ESLint enfocado a los archivos tocados sigue fallando por problemas de formato y una advertencia de hooks presentes en esos archivos. No se declara aprobada la validación integral ni se publicará hasta aclarar este estado.

### Accesos para completar la medición

- Para repetir PSI sin cuota excedida, proporcionar una clave de API de PageSpeed Insights o habilitar una cuota/proyecto autorizado. Una clave no debe guardarse en el repositorio.
- Para Search Console y GA4 hace falta autorizar los scopes oficiales de solo lectura (`webmasters.readonly` y `analytics.readonly`) en una conexión disponible; las métricas siguen sin estar verificadas.
- Para confirmar producción hace falta acceso de lectura al proyecto/pipeline de Vercel o evidencia equivalente del deployment SHA. No declarar el commit publicado solo por el estado de Git.

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
