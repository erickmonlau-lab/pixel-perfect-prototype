# Auditoría SEO y GEO de BreadPDF

**Revisión del código:** 28 de octubre de 2026
**Dominio objetivo configurado:** `https://breadpdf.com`
**Estado de producción:** no verificado en esta ejecución
**Alcance:** rutas y metadatos, sitemap, localización, contenido rastreable, señales de indexación disponibles, analítica, monetización, rendimiento registrado, descubrimiento para asistentes y prioridades.

## Resumen

La arquitectura tiene una base técnica útil: páginas localizadas en ES/CA/EN, slugs traducidos, canonicals y alternates generados por ruta, sitemap dinámico, metadatos por herramienta y diez guías. El inventario reproducible desde el código tiene **201 URLs en el sitemap**: 3 home, 3 hubs de guías, 12 páginas institucionales, 153 páginas de herramientas y 30 guías. Los enlaces `/es/herramientas` y equivalentes redirigen a `/{lang}#catalogo`; las 18 rutas de categoría redirigen a la home con la familia preseleccionada. Ninguna de esas rutas de redirección debe aparecer como URL indexable del sitemap.

La auditoría anterior `INFORME_SEO_GEO.md` contenía cifras y detalles que no coincidían con el código. Se reemplazó aquí con el recuento actual. También se regeneró `public/llms.txt` desde el registro real de herramientas y guías, que antes anunciaba 50 herramientas y enlazaba a varios slugs inexistentes.

Los datos disponibles no permiten afirmar tráfico, CTR, posiciones ni demanda de palabras clave. El extracto de Search Console es una instantánea de indexación fechada el 23 de octubre de 2026; no incluye consultas, clics ni impresiones. La última medición Lighthouse de producción encontrada es del 30 de septiembre, y no sustituye datos de campo actuales. En esta intervención se restauró la instalación con `npm ci` y el build local terminó correctamente; no se obtuvo acceso a Search Console/GA4 ni se pudo verificar la web pública.

Una revisión independiente del repositorio confirmó los riesgos de `llms.txt` obsoleto, la carga global de AdSense pese a la configuración apagada y la ausencia de una llamada de publicación para IndexNow; cada punto se volvió a cotejar con los archivos señalados antes de documentar los cambios.

## Inventario verificable

| Tipo | ES | CA | EN | Total en sitemap |
|---|---:|---:|---:|---:|
| Inicio | 1 | 1 | 1 | 3 |
| Hub de guías | 1 | 1 | 1 | 3 |
| Sobre nosotros, privacidad, cookies y términos | 4 | 4 | 4 | 12 |
| Herramientas con estado `live` | 51 | 51 | 51 | 153 |
| Guías editoriales | 10 | 10 | 10 | 30 |
| **Total** | **67** | **67** | **67** | **201** |

Hay además 3 rutas de catálogo y 18 rutas de categoría que redirigen a la home, 15 páginas transaccionales de premium/cuenta/autenticación con `noindex, nofollow` y la raíz `/`, que redirige a `/es` con código 301. Estas rutas no se cuentan como páginas indexables del sitemap. Aunque el `head` de la ruta de detalle todavía contiene metadatos `noindex` para categorías, el loader dispara antes una redirección; comprobar la respuesta real en producción y retirar código muerto tras verificación.

El CSV [`docs/SEO_ROUTE_INVENTORY.csv`](docs/SEO_ROUTE_INVENTORY.csv) lista la URL localizada, tipo, estado de indexabilidad, inclusión en sitemap, canonical y metadatos objetivo. Se genera con `node scripts/generate-seo-inventory.mjs`. El inventario es estático y se deriva del código; no comprueba el estado HTTP de cada URL en producción.

## Hallazgos y cambios realizados

### P1 — `llms.txt` tenía URLs obsoletas

El archivo anterior anunciaba 50 herramientas y contenía slugs inexistentes como `girar-pdf`, `anadir-texto-al-pdf` y `sanitizar-pdf`. Ahora el mismo script que genera los inventarios vuelve a producir `public/llms.txt` a partir de los 51 registros activos, los mapas ES/CA/EN y las guías. Se validó el número de enlaces generados frente al inventario local; la resolución HTTP en producción queda pendiente.

### P1 — carga incondicional de AdSense

`src/routes/__root.tsx` cargaba el JavaScript de AdSense aunque `.env.example` indicara que no se activara todavía y aunque `ADSENSE_CONFIG.isEnabled` controlara los slots. La carga del script ahora requiere `VITE_ADSENSE_ENABLED=true`, y el ejemplo deja el valor en `false`. Se eliminó del comentario de configuración la afirmación incorrecta de que anuncios no personalizados son seguros sin plataforma de consentimiento.

Esto **no implementa un CMP ni constituye una revisión legal**. El texto de cookies afirma que habrá un panel de consentimiento para aceptar, configurar o rechazar publicidad, pero no encontramos una interfaz de consentimiento en `src`. Antes de activar publicidad hay que elegir e integrar una plataforma adecuada, probar sus señales reales y revisar el texto del sitio. El cambio actual evita la carga por defecto; no declara que la web ya cumpla requisitos de consentimiento.

La documentación oficial de Google confirma que servir anuncios personalizados en el EEE/Reino Unido/Suiza requiere CMP certificada por Google e integrada con TCF. AdSense permanece desactivado por defecto. `public/ads.txt` contiene el publisher ID configurado en el código, pero su respuesta en producción no se verificó.

### P1 — protección y desbloqueo usaban `Buffer` en el navegador

Los runners pasaban `Buffer.from(ArrayBuffer)` a `cryptpdf`, aunque la librería acepta `Uint8Array` y la herramienta se ejecuta en cliente; los navegadores no garantizan un global `Buffer`. Se cambió la entrada a `new Uint8Array(buffer)`. Una comprobación funcional creó, cifró y descifró un PDF de una página y confirmó que una contraseña incorrecta se rechaza. El build de cliente/SSR terminó después del cambio.

### QA heredado — salida engañosa y alcance del lint

`scripts/audit-tools.cjs` mostraba 30 herramientas al comprobar 51, imprimía `Status undefined` al fallar la conexión y siempre salía con código 0. Ahora informa el total real, comprueba metadatos y que cada herramienta tenga runner o espacio de trabajo dedicado, distingue redirects esperados y errores de conexión, comprueba un 404 auténtico y devuelve código distinto de cero si falla. El chequeo estático pasa para las 51; el entorno bloquea conexiones a loopback (`EACCES`/`ETIMEDOUT`), por lo que la parte HTTP no se pudo validar aquí. El comando de lint se limita a `src` y excluye perfiles temporales; el lint aún informa problemas heredados de formato y tipos, no corregidos masivamente en este lote.

### P2 — material anterior mezclaba objetivos e indicadores medidos

`BREADPDF_MASTER_KEYWORDS.csv` contiene bandas de volumen presentadas como agregados históricos, con fuentes y fechas genéricas; no se encontró exportación primaria que permita verificarlas. [`docs/SEO_KEYWORD_MAP.csv`](docs/SEO_KEYWORD_MAP.csv) ofrece un mapa auditable de 485 términos presentes en el código y asociados a landing pages, con `volume: not measured`. Son objetivos editoriales, no datos de demanda ni posiciones.

### P2 — automatización IndexNow descrita sin evidencia de ejecución

`src/lib/indexnow.ts` implementa una función que necesita clave y URLs, pero no encontramos una llamada desde el build, despliegue o flujo de publicación. Por tanto, no se debe describir IndexNow como automático ni configurado. La activación requiere una clave guardada en entorno seguro y un flujo de envío explícito; el protocolo solo notifica rastreo y no garantiza indexación.

### Base multilingüe

`src/lib/i18n/config.ts` define las tres locales y segmentos localizados. Las rutas de herramientas usan slugs traducidos, `alternateLinks` emite canonical, alternates de `es`, `ca`, `en` y `x-default`, y el sitemap repite las alternativas XHTML recíprocas. El sitemap lo sirve `src/server.ts` en `/sitemap.xml`, e incluye `changefreq` y `priority`; **no incluye `lastmod`**. Los hubs de guías sí están en el sitemap. Las rutas de catálogo/categoría que redirigen se excluyen. Evitar editar los slugs a mano: deben salir de los mapas compartidos.

### Marcado estructurado

El código de rutas de detalle genera `BreadcrumbList`; páginas de herramientas generan además `WebApplication`, `FAQPage` y `HowTo`; páginas de guía generan `Article` y breadcrumbs. La existencia del código no confirma que el JSON-LD renderizado esté libre de errores en producción ni garantiza resultados enriquecidos. Hace falta validar HTML renderizado y probar una muestra en validadores de Schema/Rich Results.

### Robots y asistentes

`public/robots.txt` permite el rastreo general y declara explícitamente Googlebot, Bingbot, Applebot, OAI-SearchBot y PerplexityBot; bloquea rutas de API, cuenta y autenticación y anuncia el sitemap. Esto permite el acceso de rastreadores, pero no garantiza indexación o inclusión en respuestas generativas.

## Señales de búsqueda y límites

- `cerebro/raw/Tabla.csv` y la comparación adjunta reflejan una instantánea aportada de Search Console del **23 de octubre de 2026**: 94 URLs indexadas en el listado, de las cuales 84 coinciden con el sitemap usado en esa comparación; 117 URLs del sitemap no aparecían en ese listado. La tabla no contiene consultas ni métricas de rendimiento. Tratarlo como una foto histórica de cobertura, no como estado actual.
- Hay auditorías Lighthouse guardadas. La última de producción encontrada es `lh-final-check.json` del 30 de septiembre de 2026: una ejecución sintética móvil de `/es` registró Performance 0,95, LCP 2,39 s y CLS 0. La herramienta `/es/herramientas/comprimir-pdf` tiene una captura del 30 de septiembre (`lh-live-compress.json`) con Performance 0,74 y LCP 4,98 s. Son ejecuciones antiguas y aisladas, no percentiles de usuarios reales ni CWV actuales. No se encontró métrica INP en esos informes.
- `lh-initial-local.json`, del 26 de octubre, mide `localhost` con LCP de 92 s y no representa producción de forma válida.
- No había una conexión de Search Console/GA4 disponible para esta ejecución ni se halló un export actual de consultas. No se deben crear estimaciones de clics, CTR, posiciones o demanda a partir de estos archivos.
- Se compararon páginas oficiales de compresión de iLovePDF, Smallpdf, PDF24 y Adobe. Todas hacen visibles la carga y los niveles/resultado; PDF24 y Adobe describen procesamiento en servidor, mientras la implementación de BreadPDF declara procesamiento del documento en el navegador. La comparación sirve para revisar patrones de producto, no posiciones orgánicas: [iLovePDF](https://www.ilovepdf.com/compress_pdf), [Smallpdf](https://smallpdf.com/compress-pdf), [PDF24](https://tools.pdf24.org/es/comprimir-pdf), [Adobe Acrobat](https://www.adobe.com/acrobat/online/compress-pdf.html).

## GEO / contenido útil

La oportunidad de BreadPDF es describir tareas concretas (límite de Moodle, unir anexos, OCR, censurar, comprimir a un límite) enlazándolas a la herramienta que las resuelve. Mantener respuestas visibles y verificables; evitar páginas programáticas que solo cambian una keyword, promesas de rankings o volúmenes no documentados. Las diez guías actuales ya cubren varios de esos contextos; la prioridad es comprobar calidad, idioma, enlaces de ida y vuelta y utilidad real antes de crear más.

## Validación ejecutada y bloqueos

- `node scripts/generate-seo-inventory.mjs`: correcto; produjo 238 filas de rutas (201 incluidas en sitemap) y 485 objetivos keyword.
- Auditoría del repositorio: `git diff --check` correcto antes de la última iteración de UI.
- `npm ci --no-audit --no-fund`: correcto; instaló 519 paquetes desde `package-lock.json` sin modificar el lockfile.
- `npm run build`: correcto para cliente y SSR; el bundler advierte que `cryptpdf` contiene un fallback a `node:crypto`, mientras la comprobación funcional de cifrado pasó con Web Crypto disponible.
- `node scripts/generate-seo-inventory.mjs`: correcto; produjo 238 filas de rutas (201 incluidas en sitemap) y 485 objetivos keyword; no modificó el inventario existente.
- `node scripts/audit-tools.cjs` con `QA_SKIP_HTTP=1`: metadatos y cobertura de ejecución (runner o espacio de trabajo especializado) pasan para 51 herramientas. La batería HTTP no pudo conectar a loopback desde este entorno; no se cuentan esas rutas como validadas.
- `npm run lint`: no pasa por problemas preexistentes de formato y tipos en `src` (2.733 errores y 17 avisos en la ejecución local); no se reformateó masivamente el repositorio.
- La apertura directa de las URLs públicas y las solicitudes HTTP locales no estuvieron disponibles desde este entorno. No se verificaron códigos HTTP, HTML desplegado, sitemap servido, métricas de campo ni publicación.

## Fuentes de referencia

- [Google Search Central: versiones localizadas y `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Google AdSense: CMP y requisito de consentimiento para EEE/Reino Unido/Suiza](https://support.google.com/adsense/answer/13554116?hl=en)
- [Bing Webmaster Tools: IndexNow](https://www.bing.com/webmasters/help/indexnow-0z209wby)

## Referencias internas

- Inventario de rutas: [`docs/SEO_ROUTE_INVENTORY.csv`](docs/SEO_ROUTE_INVENTORY.csv)
- Mapa de keywords no medido: [`docs/SEO_KEYWORD_MAP.csv`](docs/SEO_KEYWORD_MAP.csv)
- Hoja de ruta: [`docs/SEO_ROADMAP_BREADPDF.md`](docs/SEO_ROADMAP_BREADPDF.md)
- Internacionalización: [`docs/SEO_INTERNATIONALIZATION.md`](docs/SEO_INTERNATIONALIZATION.md)
- Analítica y medición: [`docs/SEO_MONITORING.md`](docs/SEO_MONITORING.md)
- AdSense y consentimiento: [`docs/SEO_ADSENSE_AUDIT.md`](docs/SEO_ADSENSE_AUDIT.md)
