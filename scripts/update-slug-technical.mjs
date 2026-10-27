import fs from 'node:fs';

const file = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Rediseñar bloque editorial práctico (TOOL_PRACTICAL_PROFILES)
const oldPracticalBlock = /\{\(\(\) => \{\s*const practical = TOOL_PRACTICAL_PROFILES\[tool\.canonicalSlug\];[\s\S]*?<\/section>\s*\);\s*\}\)\(\)\}/;

const newPracticalBlock = `{(() => {
        const practical = TOOL_PRACTICAL_PROFILES[tool.canonicalSlug];
        if (practical) {
          const eyebrow = practical.eyebrow[locale] || practical.eyebrow.es;
          const title = practical.title[locale] || practical.title.es;
          const engineDesc = practical.engineDescription[locale] || practical.engineDescription.es;
          const bestFor = practical.bestFor[locale] || practical.bestFor.es;
          const limitations = practical.limitations[locale] || practical.limitations.es;
          const proTip = practical.proTip[locale] || practical.proTip.es;

          return (
            <section className="mt-16 sm:mt-20" aria-labelledby="editorial-context">
              <div className="rounded-3xl border-2 border-[#0F0F12] bg-[#FFFFFF] p-8 sm:p-12 shadow-[6px_6px_0_#0F0F12]">
                {/* Etiqueta superior prominente con icono técnico de ajuste */}
                <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12]">
                  <SlidersHorizontal className="size-4.5" />
                  <span>{eyebrow}</span>
                </div>

                {/* Título de sección editorial grande y jerarquizado */}
                <h2 id="editorial-context" className="mt-4 text-[28px] sm:text-[36px] font-black text-[#0F0F12] tracking-tight leading-tight">
                  {title}
                </h2>

                {/* Explicación técnica legible y destacada */}
                <p className="mt-4 text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-semibold">
                  {engineDesc}
                </p>

                {/* 2 Tarjetas Neo-Brutalistas Luminosas: Casos de uso (Verde) vs Aspectos a considerar (Ámbar) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-slate-100">
                  {/* Tarjeta Casos de uso recomendados: Fondo verde menta suave #ECFDF5, borde negro 2px */}
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#ECFDF5] p-7 shadow-[4px_4px_0_#10B981] flex flex-col justify-start">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-black text-[16px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        ✓
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F0F12]">
                        {locale === "ca" ? "Casos d'ús recomanats" : locale === "en" ? "Recommended use cases" : "Casos de uso recomendados"}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3.5 text-[16px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                      {bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#10B981] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tarjeta Aspectos a considerar / Limitaciones: Fondo ámbar/amarillo muy suave #FFFBEB */}
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#FFFBEB] p-7 shadow-[4px_4px_0_#F59E0B] flex flex-col justify-start">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-[#F59E0B] text-[#0F0F12] flex items-center justify-center font-black text-[16px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        !
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F0F12]">
                        {locale === "ca" ? "Aspectes a tenir en compte" : locale === "en" ? "Technical constraints & trade-offs" : "Aspectos a tener en cuenta"}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3.5 text-[16px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                      {limitations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo práctico destacado: Fondo amarillo cálido con Mascota ilustrada */}
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
                    <span className="text-[16px] sm:text-[17px] font-bold text-[#0F0F12] leading-snug">
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
              </div>
            </section>
          );
        }`;

content = content.replace(oldPracticalBlock, newPracticalBlock);

// 2. Rediseñar FAQs con bordes negros 2px, sombras duras 4px, hover activo y chevron contundente
const oldFaqDetails = /<details[\s\S]*?key=\{item\.q\}[\s\S]*?<\/details>/;

const newFaqDetails = `<details
              key={item.q}
              open={idx < 2}
              className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-0.5 open:border-l-8 open:border-l-[#2563EB]"
            >
              <summary className="flex cursor-pointer items-center justify-between text-[18px] sm:text-[20px] font-black text-[#0F0F12] select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 rounded-lg">
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

// 3. Rediseñar banners contextuales de Guías dentro de la herramienta a Neo-Brutalista con borde 2px y sombra dura
content = content.replace(
  /className="mt-10 rounded-2xl border border-slate-200 bg-\[#F8FAFC\] p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"/g,
  'className="mt-12 rounded-2xl border-2 border-[#0F0F12] bg-[#EFF6FF] p-6 sm:p-8 shadow-[5px_5px_0_#0F0F12] transition-all hover:-translate-y-1"'
);

content = content.replace(
  /className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs"/g,
  'className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[2px_2px_0_#0F0F12]"'
);

content = content.replace(
  /className="shrink-0 inline-flex items-center gap-1\.5 rounded-xl bg-\[#EC3C2D\] px-5 py-2\.5 text-\[14px\] font-bold text-white shadow-sm transition-colors hover:bg-\[#D93426\]"/g,
  'className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] hover:bg-[#EC3C2D] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated $slug.tsx technical blocks, FAQs and guide banners');
