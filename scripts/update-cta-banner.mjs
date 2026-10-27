import fs from 'node:fs';

const file = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the final CTA banner with Neo-Brutalist 3px black border, 8px solid shadow, and BreadPDF mascot
const oldCtaSection = /\{\/\* 7\. FINAL CATALOG CTA[\s\S]*?<\/section>/;

const newCtaSection = `{/* 7. FINAL CATALOG CTA: Neo-Brutalist High-Impact with BreadPDF Mascot and Solid 8px Shadow */}
      <section className="mt-16 mb-6 rounded-3xl border-3 border-[#0F0F12] bg-[#EC3C2D] p-8 sm:p-12 text-center shadow-[8px_8px_0_#0F0F12] text-white relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-white px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0" />
              <span>{tools.length} {locale === "ca" ? "EINES DISPONIBLES" : locale === "en" ? "AVAILABLE TOOLS" : "HERRAMIENTAS DISPONIBLES"}</span>
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white tracking-tight leading-tight">
              {locale === "ca"
                ? "Explora totes les eines de BreadPDF"
                : locale === "en"
                ? "Explore all BreadPDF tools"
                : "Explora todas las herramientas de BreadPDF"}
            </h2>

            <p className="mt-3 text-[16px] sm:text-[17.5px] text-white/95 leading-relaxed font-semibold">
              {locale === "ca"
                ? "Troba la utilitat exacta per a cada tasca: conversió d'Office, extracció OCR, signatura, seguretat i molt més."
                : locale === "en"
                ? "Find the exact tool for every task: Office conversion, OCR extraction, signing, security, and more."
                : "Encuentra la utilidad exacta para cada tarea: conversión de Office, extracción OCR, firma, seguridad y mucho más."}
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                to={SECTION_ROUTE}
                params={catalogParams(locale)}
                onClick={() => trackToolCatalogViewAllClicked({ source: "tool_page_bottom_cta", language: locale })}
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-[#0F0F12] bg-white hover:bg-[#F4F4F6] text-[#0F0F12] px-8 py-4 text-[16px] sm:text-[17px] font-black shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
              >
                <span>
                  {locale === "ca"
                    ? \`Veure catàleg complet (\${tools.length}) →\`
                    : locale === "en"
                    ? \`View full catalog (\${tools.length}) →\`
                    : \`Ver catálogo completo (\${tools.length}) →\`}
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Mascot celebrating */}
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={BRAND_ASSETS.mascots.celebrate}
              alt="BreadPDF Mascot Celebrate"
              width={160}
              height={160}
              className="size-36 sm:size-44 object-contain animate-neo-wiggle drop-shadow-md select-none pointer-events-none"
            />
          </div>

        </div>
      </section>`;

content = content.replace(oldCtaSection, newCtaSection);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated final CTA banner in $slug.tsx');
