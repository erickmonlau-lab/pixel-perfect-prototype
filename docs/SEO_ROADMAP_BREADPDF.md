# Hoja de ruta SEO/GEO de BreadPDF

Priorización basada en el código y las evidencias locales disponibles al 28-10-2026. El impacto es una hipótesis relativa, no una previsión de tráfico.

| Prioridad | Acción | Impacto | Confianza | Esfuerzo | Dependencia / validación |
|---|---|---|---|---|---|
| Hecho | Excluir del sitemap las rutas catalog/category que redirigen; incluir los hubs de guías independientes. | Alto: sitemap refleja destinos 200 y hubs indexables. | Alta según código; HTTP pendiente | S | Actualizado `src/lib/sitemap.ts`; comprobar 201 URLs en despliegue. |
| Hecho | Sincronizar `llms.txt` y el inventario con los 51 registros de herramienta y slugs localizados. | Medio: evita descubrimiento con enlaces muertos. | Alta para fuente local; HTTP pendiente | S | Generación repetible en `scripts/generate-seo-inventory.mjs`. |
| Hecho | Restaurar instalación reproducible y build local con el `package-lock.json`. | Muy alto: permite detectar errores antes de desplegar. | Alta | S | `npm ci` y build cliente/SSR pasan. Sigue pendiente comprobar CI alojado. |
| Hecho | Corregir el uso de `Buffer` en proteger/desbloquear PDF, incompatible con runtimes de navegador sin polyfill. | Alto: evita que fallen ambas herramientas en cliente. | Alta | S | `Uint8Array` y prueba de cifrado/descifrado PDF con contraseña errónea rechazada. |
| P0 | Conectar acceso de solo lectura a Search Console y Analytics para exportar consultas, impresiones, clics, CTR, posición y páginas de los últimos 28/90 días. | Muy alto para elegir oportunidades reales. | Alta | S | Acceso/exports del propietario; guardar fecha, zona y filtros. No inventar volúmenes. |
| P0 | Integrar una CMP certificada y alinear el texto de cookies antes de activar publicidad; verificar bloqueo previo, aceptar/rechazar, cambios y persistencia en ES/CA/EN. | Alto: confianza, configuración publicitaria y consistencia del sitio. | Alta | L | Decisión de CMP y revisión legal. El script de AdSense queda detrás de `VITE_ADSENSE_ENABLED`, apagado por defecto. |
| P1 | Validar todos los 201 URLs del sitemap en producción: status, canonical, robots, hreflang recíproco, title/description únicos, HTML SSR y páginas sin contenido. | Muy alto: fuente de verdad técnica. | Alta | M | Producción accesible; rastreo automatizado con reporte reproducible. |
| P1 | Analizar las 117 URLs ausentes del listado de indexación de 23-10-2026 con Inspección de URL y causas agrupadas; actualizar cobertura con fecha actual. | Alto | Media: listado antiguo y sin rendimiento | M | GSC de solo lectura; separar descubierta, rastreada, canonical alternativa, soft 404 y errores. |
| P1 | Medir CWV actuales por plantilla y dispositivo y priorizar la página de comprimir PDF, cuya captura sintética de 30-09 registró LCP 4,98 s. | Alto | Media: un solo test antiguo | M | Lighthouse repetido + CrUX/Search Console CWV cuando haya datos de campo; no comparar localhost. |
| P1 | Mantener `llms.txt` generado desde el registro, validar URLs en producción y revisar cada cambio de catálogo. | Medio | Alta para fuente local | S | El generador actual ya sincroniza 51 herramientas y 10 guías por 3 idiomas. |
| P1 | Revisar privacidad real de las herramientas y de analítica: evitar promesas globales de “sin servidores” si la descarga de modelos, telemetría o servicios de una herramienta usa red. | Alto para confianza y conversión | Alta como control, comportamiento debe probarse | M | Inspección de red por herramienta y actualizar texto localizado donde haga falta. OCR carga Tesseract dinámicamente; probar recursos de worker/modelo. |
| P2 | Optimizar páginas de intención larga usando consultas reales: Moodle/límite MB, CV, unificar documentos, OCR y extracción de tablas. Mejorar herramienta y guía existente, no clonar páginas por variante. | Alto si GSC confirma impresiones/intención | Media | M | Search Console + validación editorial/producto y enlaces recíprocos. |
| P2 | Validar los datos estructurados renderizados en muestra de herramientas, guías y páginas institucionales y retirar tipos/propiedades que no correspondan a contenido visible. | Medio | Alta para encontrar errores | S | HTML servido de producción y Rich Results Test. El schema no garantiza resultados enriquecidos. |
| P2 | Comprobar exactitud idiomática y metadatos en catalán e inglés con revisión humana y una auditoría automatizada de campos incompletos. | Medio | Alta | M | Revisor por idioma; evitar publicar traducciones automáticas sin revisión. |
| P3 | Investigar IndexNow como mejora operativa para Bing cuando exista clave y un evento fiable de publicación. | Bajo/medio | Alta | S | Clave privada, endpoint de verificación y envío post-deploy; medir aceptación, no indexación garantizada. |

## Segmentos de oportunidad para contrastar con GSC

El mapa [`SEO_KEYWORD_MAP.csv`](SEO_KEYWORD_MAP.csv) enlaza términos ya presentes en metadatos/listas del producto a páginas de destino, pero no mide demanda. Como hipótesis inicial se priorizan:

1. **Acción inmediata:** comprimir, unir y dividir PDF; páginas transaccionales con competencia alta y diferenciación de procesamiento en navegador.
2. **Problema específico:** bajar PDF a un límite de MB, Moodle/campus, CV/portales de empleo; herramienta con preset útil + guía que explique límites y expectativas.
3. **Conversión de oficina:** PDF a Word/Excel/PowerPoint y viceversa; describir con claridad los límites de extracción y preservar expectativas realistas.
4. **Escaneo y privacidad:** OCR, eliminar páginas en blanco, censurar/sanear; demostrar diferencia entre ocultar visualmente y borrar datos, y explicar pasos.
5. **Catalán e inglés:** medir cada idioma por separado; no inferir demanda comparando el tamaño de mercados o traducciones.

## Competencia (inspección de páginas oficiales, 28-10-2026)

- iLovePDF hace visibles presets de compresión y su flujo de carga/procesamiento: [comprimir PDF](https://www.ilovepdf.com/compress_pdf).
- Smallpdf estructura niveles de compresión y presenta descarga/uso móvil: [Compress PDF](https://smallpdf.com/compress-pdf).
- PDF24 expone controles específicos de imagen y detalla el procesamiento y manejo de archivos: [Comprimir PDF](https://tools.pdf24.org/es/comprimir-pdf).
- Adobe presenta los pasos de seleccionar, nivel y descargar: [Compress PDF](https://www.adobe.com/acrobat/online/compress-pdf.html).

La revisión es cualitativa y se limita a páginas de producto actuales. No se rastrearon posiciones de SERP ni se corroboraron volúmenes, anuncios o cuotas de mercado. La ventaja estratégica potencial de BreadPDF es la ejecución local del documento y el control directo del límite; debe probarse por herramienta y explicarse sin afirmaciones absolutas no verificadas.
