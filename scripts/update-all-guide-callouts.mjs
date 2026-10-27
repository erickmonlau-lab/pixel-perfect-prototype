import fs from 'node:fs';

const filePath = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace guide cards:
// 1. Academic guide callout
const oldAcademic = `      {/* Contextual Editorial Callout for Educational Workflows */}
      {(tool.canonicalSlug === "comprimir-pdf" || tool.canonicalSlug === "dividir-pdf-por-tamano") && (
        <aside
          aria-label="Guía académica relacionada"
          className="mt-10 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <BookOpen className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-blue-700">
                  {locale === "ca" ? "Guia Educativa" : locale === "en" ? "Academic Guide" : "Guía Educativa"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com reduir un PDF que supera el límit de pujada a un campus virtual"
                    : locale === "en"
                      ? "How to Reduce a PDF Exceeding Virtual Campus Upload Limits"
                      : "Cómo reducir un PDF que supera el límite de subida en un campus virtual"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Consells pràctics i mètodes per ajustar treballs a Moodle o campus universitaris sense perdre qualitat visual."
                    : locale === "en"
                      ? "Practical advice and workflows to adapt student assignments for Moodle without visual degradation."
                      : "Consejos prácticos y métodos para ajustar trabajos a Moodle o campus universitarios sin perder calidad visual."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "reducir-pdf-limite-subida-campus-virtual")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newAcademic = `      {/* Contextual Editorial Callout for Educational Workflows */}
      {(tool.canonicalSlug === "comprimir-pdf" || tool.canonicalSlug === "dividir-pdf-por-tamano") && (
        <aside
          aria-label="Guía académica relacionada"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F8FAFC] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[2px_2px_0_#0F0F12]">
                <BookOpen className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#DBEAFE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#1E40AF] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Educativa" : locale === "en" ? "Academic Guide" : "Guía Educativa"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com reduir un PDF que supera el límit de pujada a un campus virtual"
                    : locale === "en"
                      ? "How to Reduce a PDF Exceeding Virtual Campus Upload Limits"
                      : "Cómo reducir un PDF que supera el límite de subida en un campus virtual"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Consells pràctics i mètodes per ajustar treballs a Moodle o campus universitaris sense perdre qualitat visual."
                    : locale === "en"
                      ? "Practical advice and workflows to adapt student assignments for Moodle without visual degradation."
                      : "Consejos prácticos y métodos para ajustar trabajos a Moodle o campus universitarios sin perder calidad visual."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "reducir-pdf-limite-subida-campus-virtual")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 2. Ecommerce WebP
const oldWebp = `      {/* Contextual Editorial Callout for Ecommerce Image Optimization */}
      {tool.canonicalSlug === "imagen-a-webp" && (
        <aside
          aria-label="Guía técnica de ecommerce relacionada"
          className="mt-10 rounded-2xl border border-emerald-200 bg-[#F0FDF4] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                <BookOpen className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-800">
                  {locale === "ca" ? "Guia Ecommerce" : locale === "en" ? "Ecommerce Guide" : "Guía Ecommerce"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "WebP vs JPG i PNG a botigues online: quin format fer servir"
                    : locale === "en"
                      ? "WebP vs JPG and PNG for Online Stores: Format Selection Guide"
                      : "WebP vs JPG y PNG en tiendas online: qué formato usar y cómo optimizar"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Compara avantatges, transparències i regles pràctiques per millorar el rendiment del catàleg sense degradar la resolució."
                    : locale === "en"
                      ? "Compare advantages, transparency handling, and practical rules to speed up product galleries without degrading sharpness."
                      : "Compara ventajas, transparencias y reglas prácticas para mejorar el rendimiento del catálogo sin degradar la resolución."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "webp-vs-jpg-png-tiendas-online")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newWebp = `      {/* Contextual Editorial Callout for Ecommerce Image Optimization */}
      {tool.canonicalSlug === "imagen-a-webp" && (
        <aside
          aria-label="Guía técnica de ecommerce relacionada"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0FDF4] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#059669] text-white shadow-[2px_2px_0_#0F0F12]">
                <BookOpen className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#D1FAE5] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#065F46] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Ecommerce" : locale === "en" ? "Ecommerce Guide" : "Guía Ecommerce"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "WebP vs JPG i PNG a botigues online: quin format fer servir"
                    : locale === "en"
                      ? "WebP vs JPG and PNG for Online Stores: Format Selection Guide"
                      : "WebP vs JPG y PNG en tiendas online: qué formato usar y cómo optimizar"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Compara avantatges, transparències i regles pràctiques per millorar el rendiment del catàleg sense degradar la resolució."
                    : locale === "en"
                      ? "Compare advantages, transparency handling, and practical rules to speed up product galleries without degrading sharpness."
                      : "Compara ventajas, transparencias y reglas prácticas para mejorar el rendimiento del catálogo sin degradar la resolución."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "webp-vs-jpg-png-tiendas-online")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 3. WordPress & WooCommerce upload error
const oldWp = `      {/* Contextual Editorial Callout for WordPress & WooCommerce Uploads (comprimir-pdf, imagen-a-webp) */}
      {(tool.canonicalSlug === "comprimir-pdf" || tool.canonicalSlug === "imagen-a-webp") && (
        <aside
          aria-label="Guía editorial para solucionar subidas a WordPress y WooCommerce"
          className="mt-10 rounded-2xl border border-indigo-200 bg-[#EEF2FF] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <Server className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-indigo-800">
                  {locale === "ca" ? "Guia WordPress & Ecommerce" : locale === "en" ? "WordPress & Ecommerce Guide" : "Guía WordPress & Ecommerce"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com solucionar problemes en pujar fitxers grans a WordPress i WooCommerce"
                    : locale === "en"
                      ? "How to Fix Large File Upload Errors in WordPress & WooCommerce"
                      : "Cómo solucionar problemas al subir archivos grandes a WordPress y WooCommerce"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Aprèn a distingir límits de PHP (upload_max_filesize) d'errors de memòria o WAF, i com optimitzar catàlegs o imatges abans de modificar el servidor."
                    : locale === "en"
                      ? "Learn to distinguish PHP upload limits from memory exhaustion or firewall blocks, and optimize catalog PDFs or images before adjusting server directives."
                      : "Aprende a distinguir límites de PHP (upload_max_filesize) de errores de memoria o WAF, y cómo optimizar catálogos o imágenes antes de modificar el servidor."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "subir-archivos-grandes-wordpress-woocommerce")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newWp = `      {/* Contextual Editorial Callout for WordPress & WooCommerce Uploads (comprimir-pdf, imagen-a-webp) */}
      {(tool.canonicalSlug === "comprimir-pdf" || tool.canonicalSlug === "imagen-a-webp") && (
        <aside
          aria-label="Guía editorial para solucionar subidas a WordPress y WooCommerce"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#EEF2FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#4F46E5] text-white shadow-[2px_2px_0_#0F0F12]">
                <Server className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0E7FF] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#3730A3] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia WordPress & Ecommerce" : locale === "en" ? "WordPress & Ecommerce Guide" : "Guía WordPress & Ecommerce"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com solucionar problemes en pujar fitxers grans a WordPress i WooCommerce"
                    : locale === "en"
                      ? "How to Fix Large File Upload Errors in WordPress & WooCommerce"
                      : "Cómo solucionar problemas al subir archivos grandes a WordPress y WooCommerce"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Aprèn a distingir límits de PHP (upload_max_filesize) d'errors de memòria o WAF, i com optimitzar catàlegs o imatges abans de modificar el servidor."
                    : locale === "en"
                      ? "Learn to distinguish PHP upload limits from memory exhaustion or firewall blocks, and optimize catalog PDFs or images before adjusting server directives."
                      : "Aprende a distinguir límites de PHP (upload_max_filesize) de errores de memoria o WAF, y cómo optimizar catálogos o imágenes antes de modificar el servidor."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "subir-archivos-grandes-wordpress-woocommerce")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 4. Privacy Guide
const oldPrivacy = `      {/* Contextual Editorial Callout for Privacy & Sanitization (censurar-pdf, eliminar-metadatos-pdf, sanear-pdf) */}
      {(tool.canonicalSlug === "censurar-pdf" ||
        tool.canonicalSlug === "eliminar-metadatos-pdf" ||
        tool.canonicalSlug === "sanear-pdf") && (
        <aside
          aria-label="Guía editorial de privacidad y ocultación de datos en PDF"
          className="mt-10 rounded-2xl border border-sky-200 bg-[#F0F9FF] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-sky-800">
                  {locale === "ca" ? "Guia de Privacitat" : locale === "en" ? "Privacy Guide" : "Guía de Privacidad"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com ocultar dades personals en un PDF abans de compartir-lo"
                    : locale === "en"
                      ? "How to Hide Personal Data in a PDF Before Sharing It"
                      : "Cómo ocultar datos personales en un PDF antes de compartirlo"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Apreneu a coordinar censura visual, purga de metadades i sanejament tècnic abans d'enviar o publicar un document."
                    : locale === "en"
                      ? "Learn how to coordinate visual redaction, metadata purging, and technical sanitization before transferring or publishing files."
                      : "Aprende a coordinar censura visual, purga de metadatos y saneamiento técnico antes de enviar o publicar un documento."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "ocultar-datos-personales-pdf")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newPrivacy = `      {/* Contextual Editorial Callout for Privacy & Sanitization (censurar-pdf, eliminar-metadatos-pdf, sanear-pdf) */}
      {(tool.canonicalSlug === "censurar-pdf" ||
        tool.canonicalSlug === "eliminar-metadatos-pdf" ||
        tool.canonicalSlug === "sanear-pdf") && (
        <aside
          aria-label="Guía editorial de privacidad y ocultación de datos en PDF"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0F9FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0284C7] text-white shadow-[2px_2px_0_#0F0F12]">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0F2FE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#0369A1] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia de Privacitat" : locale === "en" ? "Privacy Guide" : "Guía de Privacidad"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com ocultar dades personals en un PDF abans de compartir-lo"
                    : locale === "en"
                      ? "How to Hide Personal Data in a PDF Before Sharing It"
                      : "Cómo ocultar datos personales en un PDF antes de compartirlo"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Apreneu a coordinar censura visual, purga de metadades i sanejament tècnic abans d'enviar o publicar un document."
                    : locale === "en"
                      ? "Learn how to coordinate visual redaction, metadata purging, and technical sanitization before transferring or publishing files."
                      : "Aprende a coordinar censura visual, purga de metadatos y saneamiento técnico antes de enviar o publicar un documento."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "ocultar-datos-personales-pdf")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 5. Excel Table
const oldExcel = `      {/* Contextual Editorial Callout for Excel Tables (pdf-a-excel, extraer-datos, ocr-pdf) */}
      {(tool.canonicalSlug === "pdf-a-excel" ||
        tool.canonicalSlug === "extraer-datos") && (
        <aside
          aria-label="Guía editorial de conversión de tablas PDF a Excel"
          className="mt-10 rounded-2xl border border-emerald-200 bg-[#F0FDF4] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                <FileSpreadsheet className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-800">
                  {locale === "ca" ? "Guia Financera" : locale === "en" ? "Finance Guide" : "Guía Financiera"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com passar taules d'un PDF a Excel sense perdre el format de les columnes"
                    : locale === "en"
                      ? "How to Convert PDF Tables to Excel While Preserving Column Layout"
                      : "Cómo pasar tablas de un PDF a Excel sin perder el formato de las columnas"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Recomanacions per detectar columnes complexes, tractar documents escanejats i auditar xifres i decimals abans de comptabilitzar."
                    : locale === "en"
                      ? "Best practices to handle complex columns, convert scanned files, and audit balances and decimals before using figures."
                      : "Recomendaciones para detectar columnas complejas, tratar documentos escaneados y auditar cifras y decimales antes de contabilizar."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "pasar-tablas-pdf-a-excel")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newExcel = `      {/* Contextual Editorial Callout for Excel Tables (pdf-a-excel, extraer-datos, ocr-pdf) */}
      {(tool.canonicalSlug === "pdf-a-excel" ||
        tool.canonicalSlug === "extraer-datos") && (
        <aside
          aria-label="Guía editorial de conversión de tablas PDF a Excel"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0FDF4] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#16A34A] text-white shadow-[2px_2px_0_#0F0F12]">
                <FileSpreadsheet className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#DCFCE7] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#15803D] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Financera" : locale === "en" ? "Finance Guide" : "Guía Financiera"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com passar taules d'un PDF a Excel sense perdre el format de les columnes"
                    : locale === "en"
                      ? "How to Convert PDF Tables to Excel While Preserving Column Layout"
                      : "Cómo pasar tablas de un PDF a Excel sin perder el formato de las columnas"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Recomanacions per detectar columnes complexes, tractar documents escanejats i auditar xifres i decimals abans de comptabilitzar."
                    : locale === "en"
                      ? "Best practices to handle complex columns, convert scanned files, and audit balances and decimals before using figures."
                      : "Recomendaciones para detectar columnas complejas, tratar documentos escaneados y auditar cifras y decimales antes de contabilizar."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "pasar-tablas-pdf-a-excel")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 6. OCR & Searchable
const oldOcr = `      {/* Contextual Editorial Callout for OCR & Searchable PDF (ocr-pdf, extraer-texto-pdf, pdf-a-word) */}
      {(tool.canonicalSlug === "ocr-pdf" ||
        tool.canonicalSlug === "extraer-texto-pdf" ||
        tool.canonicalSlug === "pdf-a-word") && (
        <aside
          aria-label="Guía editorial de OCR y documentos escaneados buscables"
          className="mt-10 rounded-2xl border border-indigo-200 bg-[#EEF2FF] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <ScanText className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-indigo-800">
                  {locale === "ca" ? "Guia d'Investigació" : locale === "en" ? "Research Guide" : "Guía de Investigación"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com fer cercable un PDF escanejat amb OCR"
                    : locale === "en"
                      ? "How to Make a Scanned PDF Searchable with OCR"
                      : "Cómo hacer buscable un PDF escaneado con OCR"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Aprèn a incrustar una capa de text invisible, habilitar Ctrl+F i evitar confusions de caràcters en documents escanejats."
                    : locale === "en"
                      ? "Learn how to embed an invisible text layer, enable Ctrl+F queries, and troubleshoot glyph detection in scanned archives."
                      : "Aprende a incrustar una capa de texto invisible, habilitar Ctrl+F y evitar confusiones de caracteres en documentos escaneados."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "hacer-buscable-pdf-escaneado-ocr")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newOcr = `      {/* Contextual Editorial Callout for OCR & Searchable PDF (ocr-pdf, extraer-texto-pdf, pdf-a-word) */}
      {(tool.canonicalSlug === "ocr-pdf" ||
        tool.canonicalSlug === "extraer-texto-pdf" ||
        tool.canonicalSlug === "pdf-a-word") && (
        <aside
          aria-label="Guía editorial de OCR y documentos escaneados buscables"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#EEF2FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#4F46E5] text-white shadow-[2px_2px_0_#0F0F12]">
                <ScanText className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0E7FF] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#3730A3] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia d'Investigació" : locale === "en" ? "Research Guide" : "Guía de Investigación"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com fer cercable un PDF escanejat amb OCR"
                    : locale === "en"
                      ? "How to Make a Scanned PDF Searchable with OCR"
                      : "Cómo hacer buscable un PDF escaneado con OCR"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Aprèn a incrustar una capa de text invisible, habilitar Ctrl+F i evitar confusions de caràcters en documents escanejats."
                    : locale === "en"
                      ? "Learn how to embed an invisible text layer, enable Ctrl+F queries, and troubleshoot glyph detection in scanned archives."
                      : "Aprende a incrustar una capa de texto invisible, habilitar Ctrl+F y evitar confusiones de caracteres en documentos escaneados."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "hacer-buscable-pdf-escaneado-ocr")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 7. Fill and Sign
const oldFill = `      {/* Contextual Editorial Callout for Fill & Sign Forms (rellenar-formulario-pdf, firmar-pdf, aplanar-pdf) */}
      {(tool.canonicalSlug === "rellenar-formulario-pdf" ||
        tool.canonicalSlug === "firmar-pdf" ||
        tool.canonicalSlug === "aplanar-pdf") && (
        <aside
          aria-label="Guía editorial para rellenar y firmar formularios PDF"
          className="mt-10 rounded-2xl border border-sky-200 bg-[#F0F9FF] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <ClipboardEdit className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-sky-800">
                  {locale === "ca" ? "Guia Administrativa" : locale === "en" ? "Administrative Guide" : "Guía Administrativa"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com omplir i signar un formulari PDF des del navegador"
                    : locale === "en"
                      ? "How to Fill and Sign a PDF Form from Your Browser"
                      : "Cómo rellenar y firmar un formulario PDF desde el navegador"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Completa camps AcroForm estructurats, estampa signatures visuals i distingeix rúbriques gràfiques de certificats digitals."
                    : locale === "en"
                      ? "Fill interactive AcroForm inputs, stamp visual signatures, and understand the difference between visual marks and digital certificates."
                      : "Completa campos AcroForm estructurados, estampa firmas visuales y distingue rúbricas gráficas de certificados digitales."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "rellenar-y-firmar-formulario-pdf")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newFill = `      {/* Contextual Editorial Callout for Fill & Sign Forms (rellenar-formulario-pdf, firmar-pdf, aplanar-pdf) */}
      {(tool.canonicalSlug === "rellenar-formulario-pdf" ||
        tool.canonicalSlug === "firmar-pdf" ||
        tool.canonicalSlug === "aplanar-pdf") && (
        <aside
          aria-label="Guía editorial para rellenar y firmar formularios PDF"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0F9FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0284C7] text-white shadow-[2px_2px_0_#0F0F12]">
                <ClipboardEdit className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0F2FE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#0369A1] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Administrativa" : locale === "en" ? "Administrative Guide" : "Guía Administrativa"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com omplir i signar un formulari PDF des del navegador"
                    : locale === "en"
                      ? "How to Fill and Sign a PDF Form from Your Browser"
                      : "Cómo rellenar y firmar un formulario PDF desde el navegador"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Completa camps AcroForm estructurats, estampa signatures visuals i distingeix rúbriques gràfiques de certificats digitals."
                    : locale === "en"
                      ? "Fill interactive AcroForm inputs, stamp visual signatures, and understand the difference between visual marks and digital certificates."
                      : "Completa campos AcroForm estructurados, estampa firmas visuales y distingue rúbricas gráficas de certificados digitales."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "rellenar-y-firmar-formulario-pdf")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 8. PDFA Guide
const oldPdfa = `      {/* Contextual Editorial Callout for PDF/A & Long-Term Archiving (pdf-a-pdfa, sanear-pdf, firmar-pdf) */}
      {(tool.canonicalSlug === "pdf-a-pdfa" ||
        tool.canonicalSlug === "sanear-pdf" ||
        tool.canonicalSlug === "firmar-pdf") && (
        <aside
          aria-label="Guía editorial sobre qué es PDF/A y cuándo convertir"
          className="mt-10 rounded-2xl border border-blue-200 bg-[#EFF6FF] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <Archive className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-blue-800">
                  {locale === "ca" ? "Guia d'Arxiu Digital" : locale === "en" ? "Digital Archiving Guide" : "Guía de Archivo Digital"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Què és PDF/A i quan necessites convertir un PDF a PDF/A"
                    : locale === "en"
                      ? "What Is PDF/A and When to Convert a PDF to PDF/A"
                      : "Qué es PDF/A y cuándo necesitas convertir un PDF a PDF/A"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Comprèn les diferències entre PDF convencional i PDF/A, les variants ISO (1, 2, 3) i la distinció essencial entre conversió i validació."
                    : locale === "en"
                      ? "Understand differences between standard PDF and PDF/A, ISO variants (1, 2, 3), and the essential distinction between conversion and validation."
                      : "Comprende las diferencias entre PDF convencional y PDF/A, las variantes ISO (1, 2, 3) y la distinción esencial entre conversión y validación."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "que-es-pdfa-cuando-convertir")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newPdfa = `      {/* Contextual Editorial Callout for PDF/A & Long-Term Archiving (pdf-a-pdfa, sanear-pdf, firmar-pdf) */}
      {(tool.canonicalSlug === "pdf-a-pdfa" ||
        tool.canonicalSlug === "sanear-pdf" ||
        tool.canonicalSlug === "firmar-pdf") && (
        <aside
          aria-label="Guía editorial sobre qué es PDF/A y cuándo convertir"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#EFF6FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[2px_2px_0_#0F0F12]">
                <Archive className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#DBEAFE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#1E40AF] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia d'Arxiu Digital" : locale === "en" ? "Digital Archiving Guide" : "Guía de Archivo Digital"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Què és PDF/A i quan necessites convertir un PDF a PDF/A"
                    : locale === "en"
                      ? "What Is PDF/A and When to Convert a PDF to PDF/A"
                      : "Qué es PDF/A y cuándo necesitas convertir un PDF a PDF/A"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Comprèn les diferències entre PDF convencional i PDF/A, les variants ISO (1, 2, 3) i la distinció essencial entre conversió i validació."
                    : locale === "en"
                      ? "Understand differences between standard PDF and PDF/A, ISO variants (1, 2, 3), and the essential distinction between conversion and validation."
                      : "Comprende las diferencias entre PDF convencional y PDF/A, las variantes ISO (1, 2, 3) y la distinción esencial entre conversión y validación."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "que-es-pdfa-cuando-convertir")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// 9. Blank Pages Guide
const oldBlank = `      {/* Contextual Editorial Callout for Blank Pages in Scanned PDFs (eliminar-paginas-en-blanco, eliminar-paginas-pdf, ocr-pdf) */}
      {(tool.canonicalSlug === "eliminar-paginas-en-blanco" ||
        tool.canonicalSlug === "eliminar-paginas-pdf" ||
        tool.canonicalSlug === "ocr-pdf") && (
        <aside
          aria-label="Guía editorial para eliminar páginas en blanco de un PDF escaneado"
          className="mt-10 rounded-2xl border border-teal-200 bg-[#F0FDFA] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                <FileSearch className="size-5" />
              </span>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-teal-800">
                  {locale === "ca" ? "Guia d'Escaneig & Arxiu" : locale === "en" ? "Scanning & Archiving Guide" : "Guía de Escaneo & Archivo"}
                </span>
                <h3 className="text-[16px] font-bold text-[#0F172A] mt-0.5">
                  {locale === "ca"
                    ? "Com eliminar pàgines en blanc d'un PDF escanejat a doble cara"
                    : locale === "en"
                      ? "How to Remove Blank Pages from a Double-Sided Scanned PDF"
                      : "Cómo eliminar páginas en blanco de un PDF escaneado a doble cara"}
                </h3>
                <p className="text-[14px] text-slate-600 mt-1 max-w-xl">
                  {locale === "ca"
                    ? "Comprèn com funciona la detecció per llindar de píxels, quan ajustar la sensibilitat i com preparar documents abans de l'OCR."
                    : locale === "en"
                      ? "Understand how pixel thresholding operates, when to calibrate sensitivity, and how to condition files prior to OCR indexing."
                      : "Comprende cómo funciona la detección por umbral de píxeles, cuándo calibrar la sensibilidad y cómo preparar documentos antes del OCR."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "eliminar-paginas-en-blanco-pdf-escaneado")}\` as any}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#D93426]"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )}`;

const newBlank = `      {/* Contextual Editorial Callout for Blank Pages in Scanned PDFs (eliminar-paginas-en-blanco, eliminar-paginas-pdf, ocr-pdf) */}
      {(tool.canonicalSlug === "eliminar-paginas-en-blanco" ||
        tool.canonicalSlug === "eliminar-paginas-pdf" ||
        tool.canonicalSlug === "ocr-pdf") && (
        <aside
          aria-label="Guía editorial para eliminar páginas en blanco de un PDF escaneado"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0FDFA] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0D9488] text-white shadow-[2px_2px_0_#0F0F12]">
                <FileSearch className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#CCFBF1] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#115E59] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia d'Escaneig & Arxiu" : locale === "en" ? "Scanning & Archiving Guide" : "Guía de Escaneo & Archivo"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com eliminar pàgines en blanc d'un PDF escanejat a doble cara"
                    : locale === "en"
                      ? "How to Remove Blank Pages from a Double-Sided Scanned PDF"
                      : "Cómo eliminar páginas en blanco de un PDF escaneado a doble cara"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Comprèn com funciona la detecció per llindar de píxels, quan ajustar la sensibilitat i com preparar documents abans de l'OCR."
                    : locale === "en"
                      ? "Understand how pixel thresholding operates, when to calibrate sensitivity, and how to condition files prior to OCR indexing."
                      : "Comprende cómo funciona la detección por umbral de píxeles, cuándo calibrar la sensibilidad y cómo preparar documentos antes del OCR."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "eliminar-paginas-en-blanco-pdf-escaneado")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}`;

// Normalize CRLF to LF for matching
const normalize = (str) => str.replace(/\\r\\n/g, '\\n');
content = normalize(content);

let replacedCount = 0;
const replacements = [
  [normalize(oldAcademic), normalize(newAcademic), 'Academic Guide'],
  [normalize(oldWebp), normalize(newWebp), 'WebP Guide'],
  [normalize(oldWp), normalize(newWp), 'WordPress Guide'],
  [normalize(oldPrivacy), normalize(newPrivacy), 'Privacy Guide'],
  [normalize(oldExcel), normalize(newExcel), 'Excel Guide'],
  [normalize(oldOcr), normalize(newOcr), 'OCR Guide'],
  [normalize(oldFill), normalize(newFill), 'Fill Guide'],
  [normalize(oldPdfa), normalize(newPdfa), 'PDFA Guide'],
  [normalize(oldBlank), normalize(newBlank), 'Blank Guide'],
];

for (const [oldBlock, newBlock, name] of replacements) {
  if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    replacedCount++;
    console.log('Successfully replaced:', name);
  } else {
    console.warn('Block NOT found for:', name);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Total replaced:', replacedCount, 'out of', replacements.length);
