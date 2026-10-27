# REGISTRO DE DECISIONES DE ARQUITECTURA Y SEO (BreadPDF)

Historial documentado de decisiones técnicas, de indexación y diseño tomadas en el proyecto.

---

## [2026-10-19] Decisión 01: Corrección de `<html lang>` dinámico en SSR
- **Contexto:** En `src/routes/__root.tsx`, la etiqueta `<html lang="es">` estaba cableada en el servidor para todas las páginas en catalán (`/ca`) e inglés (`/en`).
- **Decisión:** Extraer el parámetro de ruta en el servidor y renderizar `<html lang={HTML_LANG[locale]}>` dinámico.
- **Impacto SEO:** Se solucionó la contradicción entre hreflang, lenguaje de documento y crawler de Google AdSense.

---

## [2026-10-19] Decisión 02: Redirección permanente 301 en raíz (`/`)
- **Contexto:** La raíz `https://breadpdf.com/` respondía con `302 Found` temporal hacia `/es`. Google Search Console clasificaba la raíz como redirección no canónica inestable.
- **Decisión:** Cambiar el código de estado en `src/routes/index.tsx` de 302 a 301.
- **Impacto SEO:** Consolidación de autoridad de dominio en la versión lingüística primaria y eliminación de alertas de redirección temporal.

---

## [2026-10-19] Decisión 03: Desindexación de taxonomías (`/categoria/*`) y limpieza del Sitemap
- **Contexto:** El sitemap contenía 222 URLs, de las cuales 21 correspondían a taxonomías que competían y canibalizaban las palabras clave del catálogo `/herramientas` y de las herramientas individuales.
- **Decisión:** Retirar las rutas `/categoria/*` del sitemap y aplicar `<meta name="robots" content="noindex, follow"/>` en su componente. Reducir el sitemap a 201 URLs limpias y con contenido de alto valor.
- **Impacto SEO:** Concentración de presupuesto de rastreo (crawl budget) en herramientas y guías indexables.

---

## [2026-10-19] Decisión 04: Creación de página institucional «Sobre Nosotros» (`AboutPage`)
- **Contexto:** Google AdSense y evaluadores de calidad (E-E-A-T) penalizaban el sitio por falta de transparencia sobre la identidad del proyecto, autores y contacto directo.
- **Decisión:** Crear `/es/sobre-nosotros`, `/ca/sobre-nosaltres` y `/en/about` con explicación técnica del motor WASM, límites de memoria y correo institucional `breadpdfstudio@gmail.com`, acompañado de Schema JSON-LD `AboutPage` y `Organization`.
- **Impacto SEO:** Transparencia institucional y soporte formal para aprobación de AdSense.

---

## [2026-10-19] Decisión 05: Eliminación total de elementos "Vaporware"
- **Contexto:** La interfaz mostraba botones de "Iniciar sesión", "Crear cuenta" y "BreadPDF Pro" que conducían a diálogos o rutas simuladas sin servicio real.
- **Decisión:** Eliminar modales de login, botones del header y banners de suscripción en la Home, reemplazándolos por enlaces útiles a las guías y a la página de información.
- **Impacto SEO:** Cumplimiento con las políticas de valor y veracidad de Google AdSense.
