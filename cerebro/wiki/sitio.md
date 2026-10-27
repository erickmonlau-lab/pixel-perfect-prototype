# SITIO: BreadPDF (breadpdf.com)

- **URL en Producción:** `https://breadpdf.com`
- **Repositorio:** `pixel-perfect-prototype`
- **Framework & Runtime:** TanStack Start (React 19) sobre Nitro / Vite y empaquetado para Cloudflare Workers / Vercel Edge.
- **Idiomas Soportados:** Español (`es`, default), Catalán (`ca`), Inglés (`en`).
- **Contacto Oficial:** `breadpdfstudio@gmail.com`

---

## 1. Propuesta de Valor y Arquitectura
Según el código en `src/lib/brand.ts`, `src/components/site/AboutPage.tsx` y `src/routes/$lang/$section/index.tsx`:
1. **Procesamiento en Navegador (Client-Side):** Las manipulaciones de documentos (unión, división, compresión visual, rotación, conversión) se ejecutan localmente en el dispositivo del usuario mediante WebAssembly (WASM), PDF.js y pdf-lib.
2. **Privacidad por Diseño:** Ningún documento o archivo sensible (nóminas, contratos, historiales clínicos) se transmite a servidores remotos ni queda almacenado en la nube.
3. **Gratuito y sin Registro Obligatorio:** No requiere crear cuentas, login ni suscripciones premium ficticias.

---

## 2. Público Objetivo (Inferido del Código y Casos de Uso)
Según las herramientas (`src/lib/tools/registry.ts`) y las guías publicadas (`src/lib/guides/registry.ts`):
- **Estudiantes e Investigadores Universitarios:** Unificación de memorias, anexos y portadas de TFG/TFM; numeración formal de páginas y compresión para límites estrictos de campus virtuales (Moodle).
- **Profesionales, Pymes y Autónomos:** Rellenado y firma rápida de formularios oficiales, aplanado de campos AcroForm, combinación de facturas y contratos confidenciales.
- **Administradores y Diseñadores Web:** Conversión de imágenes de catálogo a WebP para tiendas online (WooCommerce, Shopify) y reducción de peso de PDFs para evitar bloqueos de subida en servidores.
- **Usuarios de la Administración Pública:** Preparación de expedientes en formato PDF/A con validación de requisitos de archivo digital.

---

## 3. Estructura Técnica de SEO en el Código
- **Enrutamiento:** Prefijo obligatorio por idioma (`/$lang/...`), con redirección 301 en la raíz `/` hacia `/es`.
- **SSR (Server-Side Rendering):** Renderizado de HTML inicial completo en servidor Nitro, con hidratación TanStack Router en cliente.
- **Localización (`hreflang`):** Generación automática de etiquetas `<link rel="alternate" hreflang="..." href="...">` en cabeceras HTML para `es`, `ca`, `en` y `x-default` apuntando a `/es`.
- **Datos Estructurados (Schema.org JSON-LD):**
  - En Home y Global: `Organization` y `WebSite`.
  - En Herramientas: `BreadcrumbList`, `WebApplication`, `FAQPage` y `HowTo`.
  - En Guías: `BreadcrumbList` y `Article`.
  - En Sobre Nosotros: `Organization` y `AboutPage`.
- **Sitemap (`sitemap.xml`):** Generación dinámica con 201 URLs indexables limpias (Home, Catálogo, 51 Herramientas, 10 Guías y 4 páginas institucionales/legales por cada idioma).
- **Directivas Robots:**
  - Rutas de categorías (`/categoria/*`): `<meta name="robots" content="noindex, follow"/>`.
  - Ruta de pasarela (`/premium`): `<meta name="robots" content="noindex, nofollow"/>`.

---

## 4. Estado Comercial y Monetización
- **Google AdSense:** Cuenta `ca-pub-7477829897419785` configurada con script diferido y `ads.txt` en producción. Los bloques de anuncio están aislados en áreas editoriales y de pie de página para no interferir con la zona interactiva del workspace.
- **Vaporware Eliminado:** Todos los botones simulados de login, registro y planes "Pro" fueron retirados del código en la auditoría forense para cumplir las políticas de Google AdSense y Search Console.

---

## 5. Datos Pendientes de Confirmar
- Métricas de tráfico real de usuarios activos por mes (MAU).
- Tasa de retención o herramientas con mayor frecuencia de uso recurrente.
- Confirmación de aprobación final de AdSense en el panel oficial de Google.
