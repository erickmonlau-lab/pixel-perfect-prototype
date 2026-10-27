import fs from 'node:fs';
import path from 'node:path';

const slugPath = path.join(process.cwd(), 'src', 'routes', '$lang', '$section', '$slug.tsx');
let slugContent = fs.readFileSync(slugPath, 'utf8');

// 1. Rediseñar Header de la herramienta (líneas 388-440 aprox)
// - Reorganizar migas y etiquetas para no competir
// - Título h1 jerarquía clara y anchura apropiada
// - Descripción facilitando lectura rápida
// - Mascota integrada armónicamente
const oldHeaderRegex = /<header className="mt-4 sm:mt-5 animate-fade-in">[\s\S]*?<\/header>/;
const newHeader = `<header className="mt-4 sm:mt-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          {/* Columna Izquierda: Badge + H1 + Tagline */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Meta badges: Categoría + Favorito */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                to={categoryPath(locale, tool.category)}
                className={\`group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] px-3.5 py-1 text-[12.5px] sm:text-[13px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] transition-all \${accent.iconBg}\`}
              >
                <ToolIcon name={tool.icon} canonicalSlug={canonicalSlug} className="size-4 text-white" />
                <span>{category.name}</span>
              </Link>

              {/* Botón Favorito Neo-Brutalista */}
              <button
                type="button"
                onClick={() => toggleFavorite(canonicalSlug)}
                className={\`inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] px-3 py-1 text-[12.5px] sm:text-[13px] font-black transition-all cursor-pointer shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] \${
                  isFav
                    ? "bg-[#FEF08A] text-[#0F0F12]"
                    : "bg-white text-[#0F0F12] hover:bg-[#FEF08A]"
                }\`}
                title={isFav ? "Herramienta en favoritos" : "Añadir a mis favoritos"}
              >
                <Star className={\`size-3.5 \${isFav ? "fill-[#0F0F12] text-[#0F0F12]" : "fill-transparent text-[#0F0F12] stroke-[2.5]"}\`} />
                <span>{isFav ? "Favorita" : "Favorito"}</span>
              </button>
            </div>

            {/* H1 principal contundente pero equilibrado */}
            <h1 className="mt-3.5 text-[2.2rem] sm:text-[2.75rem] lg:text-[3.15rem] font-black tracking-[-0.03em] text-[#0F0F12] leading-[1.1]">
              {tool.h1}
            </h1>

            {/* Descripción clara y legible */}
            <p className="mt-3 text-[16.5px] sm:text-[18px] leading-relaxed text-slate-700 font-medium max-w-2xl">
              {tool.tagline}
            </p>
          </div>

          {/* Columna Derecha: Mascota BreadPDF integrada con presencia equilibrada */}
          <div className="hidden lg:flex shrink-0 items-center justify-center select-none pointer-events-none p-2">
            <div className="rounded-3xl border-2 border-[#0F0F12] bg-[#F1F1F4] p-4 shadow-[4px_4px_0_#0F0F12]">
              <GuideMascot
                variant={mascotForTool(tool.category, tool.canonicalSlug)}
                priority={true}
                alt={\`Mascota oficial de BreadPDF para \${tool.name}\`}
                className="w-auto h-[125px] xl:h-[145px] object-contain drop-shadow-xs animate-neo-wiggle"
              />
            </div>
          </div>
        </div>
      </header>`;

slugContent = slugContent.replace(oldHeaderRegex, newHeader);

// 2. Cómo funciona: Alineación consistente, alturas uniformes y números nítidos
const oldHowRegex = /<section className="mt-14 sm:mt-16" aria-labelledby="how">[\s\S]*?<\/section>/;
const newHow = `<section className="mt-12 sm:mt-14" aria-labelledby="how">
        <h2 id="how" className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#0F0F12]">
          {t.tool.howItWorks}
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3 list-none pl-0">
          {tool.howItWorks.map((step, index) => {
            const isObject = typeof step === "object" && step !== null;
            const title = isObject
              ? step.title
              : index === 0
                ? "Añade tus archivos"
                : index === 1
                  ? "Configura u ordena"
                  : "Descarga el resultado";
            const desc = isObject ? step.desc : step;

            return (
              <li
                key={index}
                className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-5 sm:p-6 shadow-[3px_3px_0_#0F0F12] flex flex-col justify-start transition-all duration-120 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white text-[15px] font-black shadow-[1.5px_1.5px_0_#0F0F12]">
                    0{index + 1}
                  </span>
                  <h3 className="text-[17px] sm:text-[18px] font-black text-[#0F0F12] leading-snug">
                    {title}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] sm:text-[15.5px] leading-relaxed text-slate-700 m-0 font-normal">
                  {desc}
                </p>
              </li>
            );
          })}
        </ol>
      </section>`;

slugContent = slugContent.replace(oldHowRegex, newHow);

// 3. FAQ: Reducir peso repetitivo, contornos limpios de 2px, sombras de 2.5px, sin sobrecarga
const oldFaqRegex = /<section className="mt-14 sm:mt-16" aria-labelledby="faq">[\s\S]*?<\/section>/;
const newFaq = `<section className="mt-12 sm:mt-14" aria-labelledby="faq">
        <h2 id="faq" className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#0F0F12]">
          {t.tool.faq}
        </h2>
        <div className="mt-5 space-y-3">
          {tool.faq.map((item, idx) => (
            <details
              key={item.q}
              open={idx === 0}
              className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-5 sm:p-6 shadow-[2.5px_2.5px_0_#0F0F12] transition-all duration-120 open:bg-[#FDFDFE]"
            >
              <summary className="flex cursor-pointer items-center justify-between text-[16.5px] sm:text-[17.5px] font-black text-[#0F0F12] select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F12] rounded-lg">
                <span className="pr-4 leading-snug">{item.q}</span>
                <span className="shrink-0 rounded-lg border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] p-1.5 shadow-[1px_1px_0_#0F0F12] group-hover:bg-[#FEF08A] transition-transform duration-200 group-open:rotate-180">
                  <ChevronRight className="size-4 rotate-90 stroke-[2.5]" />
                </span>
              </summary>
              <div className="mt-3.5 border-t border-slate-200 pt-3.5 text-[15px] sm:text-[16px] leading-relaxed text-slate-700 font-normal max-w-4xl">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>`;

slugContent = slugContent.replace(oldFaqRegex, newFaq);

fs.writeFileSync(slugPath, slugContent, 'utf8');
console.log('Successfully updated slug.tsx with unified neo-brutalist styling');
