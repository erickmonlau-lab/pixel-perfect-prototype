import fs from 'node:fs';

const file = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Technical Criteria Redesign
const oldTechnicalCriteria = `<div className="rounded-3xl border-2 border-[#0F0F12] bg-white p-8 sm:p-12 shadow-[6px_6px_0_#0F0F12]">
                {/* Etiqueta superior prominente con icono técnico de ajuste */}
                <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-3.5 py-1 text-[13px] sm:text-[14px] font-black uppercase tracking-wide text-white shadow-[2px_2px_0_#0F0F12]">
                  <SlidersHorizontal className="size-5" />
                  <span>{eyebrow}</span>
                </div>

                {/* Título de sección editorial grande y jerarquizado */}
                <h2 id="editorial-context" className="mt-3 text-[28px] sm:text-[34px] font-black text-[#0F172A] tracking-tight leading-snug">
                  {title}
                </h2>

                {/* Explicación técnica legible */}
                <p className="mt-4 text-[17.5px] sm:text-[19px] leading-relaxed text-slate-800 font-medium">
                  {engineDesc}
                </p>

                {/* Tarjetas de Casos de Uso y Limitaciones — Fondos 100% sólidos según especificación */}
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                  {/* Tarjeta Casos de uso recomendados: Borde azul / Fondo azul claro sólido #EAF2FF */}
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-7 shadow-[4px_4px_0_#0F0F12] flex flex-col justify-start">
                    <h3 className="text-[20px] sm:text-[21px] font-extrabold text-[#1E3A8A] flex items-center gap-3">
                      <span className="size-2.5 rounded-full bg-[#2563EB] inline-block shrink-0" />
                      {locale === "ca" ? "Casos d'ús recomanats" : locale === "en" ? "Recommended use cases" : "Casos de uso recomendados"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-[16px] sm:text-[17px] text-[#1E293B] font-medium leading-relaxed list-disc pl-6">
                      {bestFor.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tarjeta Limitaciones técnicas: Borde rojo / Fondo rojo claro sólido #FFF0EE */}
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white p-7 shadow-[4px_4px_0_#EC3C2D] flex flex-col justify-start [&_h3]:text-white [&_ul]:text-slate-200">
                    <h3 className="text-[20px] sm:text-[21px] font-extrabold text-[#1E3A8A] flex items-center gap-3">
                      <span className="size-2.5 rounded-full bg-[#EC3C2D] inline-block shrink-0" />
                      {locale === "ca" ? "Limitacions tècniques a considerar" : locale === "en" ? "Technical constraints & trade-offs" : "Limitaciones técnicas a considerar"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-[16px] sm:text-[17px] text-[#1E293B] font-medium leading-relaxed list-disc pl-6">
                      {limitations.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo práctico destacado: Fondo azul claro sólido #F0F5FF con borde nítido */}
                <div className="mt-6 rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white p-6 sm:p-7 text-[16.5px] sm:text-[17.5px] flex items-start gap-4 shadow-[4px_4px_0_#0F0F12] [&_p]:text-white [&_p]:font-bold">
                  <span className="inline-flex items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-1 text-[13px] font-black uppercase text-white shrink-0 tracking-wide shadow-[2px_2px_0_#0F0F12]">
                    {locale === "ca" ? "Consell" : locale === "en" ? "Pro Tip" : "Consejo"}
                  </span>
                  <p className="m-0 leading-relaxed text-slate-700">
                    {proTip}
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-slate-700 font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className={\`inline-flex size-3 rounded-full \${accent.iconBg} shrink-0 shadow-2xs\`} />
                    <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0F172A] leading-snug">
                      {locale === "ca"
                        ? "Processament privat al navegador sense transmissió a servidors"
                        : locale === "en"
                        ? "Private in-browser processing with zero remote network upload"
                        : "Procesamiento privado en navegador sin transmisión a servidores"}
                    </span>
                  </div>
                  <Link
                    to={categoryPath(locale, tool.category)}
                    className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] hover:bg-[#EC3C2D] text-white px-6 py-3 text-[15px] sm:text-[16px] font-black transition-all shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
                  >
                    <span>
                      {locale === "ca"
                        ? \`Explorar més eines de \${category.name}\`
                        : locale === "en"
                        ? \`Explore all \${category.name} tools\`
                        : \`Explorar más herramientas de \${category.name}\`}
                    </span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1 font-black text-white">→</span>
                  </Link>
                </div>
              </div>`;

const newTechnicalCriteria = `<div className="rounded-3xl border-2 border-[#0F0F12] bg-[#FFFFFF] p-8 sm:p-12 shadow-[6px_6px_0_#0F0F12]">
                <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12]">
                  <SlidersHorizontal className="size-4.5" />
                  <span>{eyebrow}</span>
                </div>

                <h2 id="editorial-context" className="mt-4 text-[28px] sm:text-[36px] font-black text-[#0F0F12] tracking-tight leading-tight">
                  {title}
                </h2>

                <p className="mt-4 text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-semibold">
                  {engineDesc}
                </p>

                {/* 2 Tarjetas Luminosas: Casos de Uso (Verde suave) vs Aspectos a considerar (Ámbar suave) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-slate-100">
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#ECFDF5] p-7 shadow-[4px_4px_0_#10B981] flex flex-col justify-start">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-black text-[16px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        ✓
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F0F12]">
                        {locale === "ca" ? "Casos d'ús recomanats" : locale === "en" ? "Recommended use cases" : "Casos de uso recomendados"}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3 text-[16px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                      {bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#10B981] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#FFFBEB] p-7 shadow-[4px_4px_0_#F59E0B] flex flex-col justify-start">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-[#F59E0B] text-[#0F0F12] flex items-center justify-center font-black text-[16px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        !
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F0F12]">
                        {locale === "ca" ? "Aspectes a tenir en compte" : locale === "en" ? "Technical constraints & trade-offs" : "Aspectos a tener en cuenta"}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3 text-[16px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                      {limitations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo Pro con Mascota ilustrada */}
                <div className="mt-8 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="flex items-center gap-3 shrink-0">
                    <img
                      src={BRAND_ASSETS.mascots.think}
                      alt="BreadPDF Pro Tip"
                      width={56}
                      height={56}
                      className="size-14 object-contain animate-neo-wiggle shrink-0 drop-shadow-xs"
                    />
                    <span className="inline-flex items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1 text-[13px] font-black uppercase text-white shrink-0 tracking-wide shadow-[2px_2px_0_#0F0F12]">
                      {locale === "ca" ? "Consell Pro" : locale === "en" ? "Pro Tip" : "Consejo Pro"}
                    </span>
                  </div>
                  <p className="m-0 leading-relaxed text-slate-900 font-bold text-[16px] sm:text-[17.5px]">
                    {proTip}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-4 text-slate-800 font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex size-3 rounded-full bg-[#10B981] shrink-0" />
                    <span className="text-[16px] sm:text-[17px] font-bold text-[#0F172A] leading-snug">
                      {locale === "ca"
                        ? "Processament privat al navegador sense transmissió a servidors"
                        : locale === "en"
                        ? "Private in-browser processing with zero remote network upload"
                        : "Procesamiento privado en navegador sin transmisión a servidores"}
                    </span>
                  </div>
                  <Link
                    to={categoryPath(locale, tool.category)}
                    className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] hover:bg-[#EC3C2D] text-white px-6 py-3 text-[15px] sm:text-[16px] font-black transition-all shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
                  >
                    <span>
                      {locale === "ca"
                        ? \`Explorar més eines de \${category.name}\`
                        : locale === "en"
                        ? \`Explore all \${category.name} tools\`
                        : \`Explorar más herramientas de \${category.name}\`}
                    </span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1 font-black text-white">→</span>
                  </Link>
                </div>
              </div>`;

content = content.replace(oldTechnicalCriteria, newTechnicalCriteria);

// 2. FAQs Redesign
const oldFaqDetails = /<details[\s\S]*?key=\{item\.q\}[\s\S]*?<\/details>/;
const newFaqDetails = `<details
              key={item.q}
              open={idx < 2}
              className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-0.5 open:border-l-8 open:border-l-[#2563EB]"
            >
              <summary className="flex cursor-pointer items-center justify-between text-[18px] sm:text-[20px] font-black text-[#0F172A] select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 rounded-lg">
                <span className="pr-4 leading-snug">{item.q}</span>
                <span className="shrink-0 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white p-2 shadow-[2px_2px_0_#0F0F12] group-hover:bg-[#2563EB] transition-transform duration-200 group-open:rotate-180">
                  <ChevronRight className="size-4.5 rotate-90 text-white stroke-[3]" />
                </span>
              </summary>
              <div className="mt-4 border-t-2 border-slate-100 pt-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-700 font-medium">
                {item.a}
              </div>
            </details>`;

content = content.replace(oldFaqDetails, newFaqDetails);

// 3. Final CTA Banner
const oldCtaBanner = /\{\/\* 7\. FINAL CATALOG CTA[\s\S]*?<\/section>/;
const newCtaBanner = `{/* 7. FINAL CATALOG CTA: Neo-Brutalist High-Impact with BreadPDF Mascot and Solid 8px Shadow */}
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

content = content.replace(oldCtaBanner, newCtaBanner);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated $slug.tsx components');
