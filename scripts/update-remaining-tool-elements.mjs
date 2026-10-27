import fs from 'node:fs';

const filePath = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Tool Header badges (Category badge + Favorite button)
const oldBadges = `<div className="flex items-center gap-2.5">
              <Link
                to={categoryPath(locale, tool.category)}
                className={\`group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[12px] font-black uppercase tracking-wider text-white shadow-xs transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 \${accent.iconBg}\`}
              >
                <ToolIcon name={tool.icon} canonicalSlug={canonicalSlug} className="size-3.5 text-white" />
                <span>{category.name}</span>
              </Link>

              {/* Botón Favorito para esta herramienta — Token global sólido */}
              <button
                type="button"
                onClick={() => toggleFavorite(canonicalSlug)}
                className={\`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold border transition-all duration-150 cursor-pointer \${
                  isFav
                    ? "bg-[#F59E0B] border-[#F59E0B] text-white shadow-2xs hover:brightness-95"
                    : "bg-white border-slate-200 text-[#0F172A] hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-white"
                }\`}
                title={isFav ? "Herramienta en favoritos" : "Añadir a mis favoritos"}
              >
                <Star className={\`size-3.5 \${isFav ? "fill-white text-white" : "fill-transparent stroke-[2.2]"}\`} />
                <span>{isFav ? "Favorita" : "Favorito"}</span>
              </button>
            </div>`;

const newBadges = `<div className="flex items-center gap-3">
              <Link
                to={categoryPath(locale, tool.category)}
                className={\`group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] px-4 py-1.5 text-[13px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F12] \${accent.iconBg}\`}
              >
                <ToolIcon name={tool.icon} canonicalSlug={canonicalSlug} className="size-4 text-white" />
                <span>{category.name}</span>
              </Link>

              {/* Botón Favorito Neo-Brutalista con borde y sombra dura */}
              <button
                type="button"
                onClick={() => toggleFavorite(canonicalSlug)}
                className={\`inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] px-3.5 py-1.5 text-[13px] font-black transition-all cursor-pointer shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] \${
                  isFav
                    ? "bg-[#FEF08A] text-[#0F0F12]"
                    : "bg-white text-[#0F0F12] hover:bg-[#FEF08A]"
                }\`}
                title={isFav ? "Herramienta en favoritos" : "Añadir a mis favoritos"}
              >
                <Star className={\`size-4 \${isFav ? "fill-[#0F0F12] text-[#0F0F12]" : "fill-transparent text-[#0F0F12] stroke-[2.5]"}\`} />
                <span>{isFav ? "Favorita" : "Favorito"}</span>
              </button>
            </div>`;

// 2. Right mascot in header: add neo-wiggle animation
const oldMascot = `<GuideMascot
              variant={mascotForTool(tool.category, tool.canonicalSlug)}
              priority={true}
              alt={\`Mascota oficial de BreadPDF para \${tool.name}\`}
              className="w-auto h-[145px] md:h-[165px] lg:h-[185px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.10)] transition-transform hover:scale-105"
            />`;

const newMascot = `<GuideMascot
              variant={mascotForTool(tool.category, tool.canonicalSlug)}
              priority={true}
              alt={\`Mascota oficial de BreadPDF para \${tool.name}\`}
              className="w-auto h-[145px] md:h-[165px] lg:h-[185px] object-contain drop-shadow-md animate-neo-wiggle"
            />`;

// 3. Fallback technical / use cases section
const oldFallback = `        if (!t.category.details[tool.category]?.useCases) return null;

        return (
          <section className="mt-14 sm:mt-16" aria-labelledby="editorial-context">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-2.5 text-[14px] font-black uppercase tracking-wide text-[#EC3C2D]">
                <SlidersHorizontal className="size-5" />
                <span>
                  {locale === "ca"
                    ? "Criteris tècnics & Aplicació documental"
                    : locale === "en"
                    ? "Technical Standards & Document Workflows"
                    : "Criterios técnicos & Aplicación documental"}
                </span>
              </div>
              <h2 id="editorial-context" className="mt-3 text-[24px] sm:text-[28px] font-black text-[#0F172A] tracking-tight">
                {locale === "ca"
                  ? \`Àmbit d'aplicació i recomanacions per a \${category.name}\`
                  : locale === "en"
                  ? \`Workflow Scenarios and Best Practices for \${category.name}\`
                  : \`Ámbito de aplicación y recomendaciones para \${category.name}\`}
              </h2>
              <p className="mt-4 text-[17.5px] sm:text-[19px] leading-relaxed text-slate-800 font-medium">
                {t.category.details[tool.category].useCases}
              </p>
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <span className={\`inline-flex size-3 rounded-full \${accent.iconBg} shrink-0 shadow-2xs\`} />
                  <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0F172A] leading-snug">
                    {locale === "ca"
                      ? "Processament en memòria local en el navegador del dispositiu"
                      : locale === "en"
                      ? "Client-side volatile memory processing in browser"
                      : "Procesamiento en memoria local en el navegador del dispositivo"}
                  </span>
                </div>
                <Link
                  to={categoryPath(locale, tool.category)}
                  className={\`group inline-flex items-center gap-2 rounded-xl \${accent.iconBg} hover:opacity-90 text-white px-5 py-2.5 text-[15px] sm:text-[15.5px] font-bold transition-all shadow-xs hover:shadow-md cursor-pointer\`}
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
        );`;

const newFallback = `        if (!t.category.details[tool.category]?.useCases) return null;

        return (
          <section className="mt-14 sm:mt-16" aria-labelledby="editorial-context">
            <div className="rounded-3xl border-2 border-[#0F0F12] bg-white p-7 sm:p-10 shadow-[6px_6px_0_#0F0F12]">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[2px_2px_0_#0F0F12]">
                  <SlidersHorizontal className="size-5" />
                </span>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#FEECEB] px-3 py-1 text-[12.5px] sm:text-[13px] font-black uppercase tracking-wider text-[#EC3C2D] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca"
                    ? "Criteris tècnics & Aplicació documental"
                    : locale === "en"
                    ? "Technical Standards & Document Workflows"
                    : "Criterios técnicos & Aplicación documental"}
                </span>
              </div>

              <h2 id="editorial-context" className="mt-4 text-[24px] sm:text-[28px] font-black text-[#0F0F12] tracking-tight">
                {locale === "ca"
                  ? \`Àmbit d'aplicació i recomanacions per a \${category.name}\`
                  : locale === "en"
                  ? \`Workflow Scenarios and Best Practices for \${category.name}\`
                  : \`Ámbito de aplicación y recomendaciones para \${category.name}\`}
              </h2>

              <p className="mt-4 text-[17px] sm:text-[18.5px] leading-relaxed text-slate-800 font-medium max-w-4xl">
                {t.category.details[tool.category].useCases}
              </p>

              <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-5 text-slate-700 font-medium">
                <div className="flex items-center gap-3">
                  <span className={\`inline-flex size-3.5 rounded-full border border-[#0F0F12] \${accent.iconBg} shrink-0 shadow-[1px_1px_0_#0F0F12]\`} />
                  <span className="text-[15.5px] sm:text-[16.5px] font-black text-[#0F0F12] leading-snug">
                    {locale === "ca"
                      ? "Processament en memòria local en el navegador del dispositiu"
                      : locale === "en"
                      ? "Client-side volatile memory processing in browser"
                      : "Procesamiento en memoria local en el navegador del dispositivo"}
                  </span>
                </div>

                <Link
                  to={categoryPath(locale, tool.category)}
                  className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] text-white px-6 py-3 text-[15px] sm:text-[16px] font-black transition-all shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
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
        );`;

// 4. Related tools header "Ver catálogo completo" button
const oldRelatedBtn = `          <Link
            to={SECTION_ROUTE}
            params={catalogParams(locale)}
            onClick={() => trackToolCatalogViewAllClicked({ source: "related_tools_header", language: locale })}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[14.5px] font-bold text-[#0F172A] hover:border-[#EC3C2D] hover:bg-[#EC3C2D] hover:text-white transition-all shadow-xs hover:shadow-sm"
            aria-label={
              locale === "ca"
                ? "Veure el catàleg complet d'eines"
                : locale === "en"
                ? "View full tools catalog"
                : "Ver el catálogo completo de herramientas"
            }
          >
            <span>
              {locale === "ca"
                ? "Veure catàleg complet"
                : locale === "en"
                ? "View full catalog"
                : "Ver catálogo completo"}
            </span>
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-1 font-bold"
            >
              →
            </span>
          </Link>`;

const newRelatedBtn = `          <Link
            to={SECTION_ROUTE}
            params={catalogParams(locale)}
            onClick={() => trackToolCatalogViewAllClicked({ source: "related_tools_header", language: locale })}
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-5 py-2.5 text-[15px] font-black text-[#0F0F12] hover:bg-[#FEF08A] transition-all shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
            aria-label={
              locale === "ca"
                ? "Veure el catàleg complet d'eines"
                : locale === "en"
                ? "View full tools catalog"
                : "Ver el catálogo completo de herramientas"
            }
          >
            <span>
              {locale === "ca"
                ? "Veure catàleg complet"
                : locale === "en"
                ? "View full catalog"
                : "Ver catálogo completo"}
            </span>
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-1 font-black"
            >
              →
            </span>
          </Link>`;

const normalize = (s) => s.replace(/\\r\\n/g, '\\n');
content = normalize(content);

let replaced = 0;
const targets = [
  [normalize(oldBadges), normalize(newBadges), 'Badges Header'],
  [normalize(oldMascot), normalize(newMascot), 'Header Mascot Animation'],
  [normalize(oldFallback), normalize(newFallback), 'Fallback Technical Section'],
  [normalize(oldRelatedBtn), normalize(newRelatedBtn), 'Related Tools Button'],
];

for (const [oldB, newB, label] of targets) {
  if (content.includes(oldB)) {
    content = content.replace(oldB, newB);
    replaced++;
    console.log('Replaced:', label);
  } else {
    console.warn('NOT found:', label);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Total replaced:', replaced, 'out of', targets.length);
