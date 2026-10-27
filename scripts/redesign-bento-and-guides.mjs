import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// Section 1: Replace Editorial Bento
const bentoRegex = /\{\/\* =+[\s\S]*?SECTION — EDITORIAL BENTO[\s\S]*?<\/section>/;

const newBento = `{/* ============================================================
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars (GYMVITY style)
          Strict Neo-Brutalist Surfaces: 2px border #0F0F12, 4px shadow #0F0F12, 0 pastel colors
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-5 text-[2.6rem] sm:text-[3.2rem] lg:text-[4rem] font-black tracking-tight leading-[1.05] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] sm:text-[19px] leading-relaxed text-slate-800 font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con 4 tarjetas alternas alto impacto (Blanco / Negro / Rojo) */}
          <div className="mt-14 sm:mt-16 grid gap-6 sm:grid-cols-2">
            {t.home.editorial.articles.map((article, idx) => {
              function DocumentOptimizeIcon({ className = "size-6" }: { className?: string }) {
                return (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                );
              }

              // Estricto sistema cromático: #0F0F12, #FFFFFF, #EC3C2D (CERO pastel/arcoíris)
              const BENTO_THEMES = [
                {
                  icon: Cpu,
                  cardBg: "bg-white text-[#0F0F12]",
                  iconBg: "bg-[#0F0F12] text-white",
                  iconColor: "text-white",
                  tagBg: "bg-[#0F0F12] text-white",
                  bodyColor: "text-slate-700",
                  tag: "MOTOR WASM",
                },
                {
                  icon: UserCheck,
                  cardBg: "bg-[#0F0F12] text-white",
                  iconBg: "bg-white text-[#0F0F12]",
                  iconColor: "text-[#0F0F12]",
                  tagBg: "bg-[#EC3C2D] text-white",
                  bodyColor: "text-slate-300",
                  tag: "SIN REGISTROS",
                },
                {
                  icon: ArrowLeftRight,
                  cardBg: "bg-[#0F0F12] text-white",
                  iconBg: "bg-white text-[#0F0F12]",
                  iconColor: "text-[#0F0F12]",
                  tagBg: "bg-white text-[#0F0F12]",
                  bodyColor: "text-slate-300",
                  tag: "FORMATOS NATIVOS",
                },
                {
                  icon: DocumentOptimizeIcon,
                  cardBg: "bg-white text-[#0F0F12]",
                  iconBg: "bg-[#0F0F12] text-white",
                  iconColor: "text-white",
                  tagBg: "bg-[#0F0F12] text-white",
                  bodyColor: "text-slate-700",
                  tag: "ALTA FIDELIDAD",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={\`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] \${theme.cardBg} p-8 sm:p-9 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12]\`}
                >
                  {/* Fila superior: Icono cuadrado y Tag contundente */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span
                      className={\`inline-flex size-[54px] sm:size-[58px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] \${theme.iconBg} shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-105\`}
                    >
                      <Icon className={\`size-6 \${theme.iconColor} stroke-[2.5]\`} />
                    </span>

                    {/* Tag de estado en alto contraste sin colores pastel */}
                    <span className={\`inline-flex items-center rounded-lg border-2 border-[#0F0F12] px-3.5 py-1.5 text-xs font-black tracking-wider uppercase whitespace-nowrap shadow-[2px_2px_0_#0F0F12] \${theme.tagBg}\`}>
                      {theme.tag}
                    </span>
                  </div>

                  {/* Título de la tarjeta */}
                  <h3 className="text-[22px] sm:text-[24px] font-black tracking-tight leading-snug">
                    {article.title}
                  </h3>

                  {/* Párrafo explicativo */}
                  <p className={\`mt-3 text-[16px] sm:text-[17px] leading-relaxed font-normal \${theme.bodyColor}\`}>
                    {article.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>}`;

c = c.replace(bentoRegex, newBento);

// Section 2: Replace Editorial Guides
const guidesRegex = /\{\/\* =+[\s\S]*?SECTION — EDITORIAL GUIDES[\s\S]*?<\/section>/;

const newGuides = `{/* ============================================================
          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (GYMVITY style)
          Strict surfaces: 100% white cards, red CTAs, zero rainbow tags, full author name
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header con tipografía display contundente */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                <BookOpen className="size-4" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES AND TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-[2.5rem] sm:text-[3.2rem] lg:text-[3.8rem] font-black text-[#0F0F12] leading-[1.08] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-3.5 text-[17px] sm:text-[19px] text-slate-700 max-w-2xl font-medium leading-relaxed">
                {locale === "ca"
                  ? "Manuals pràctics basats en estàndards tècnics per optimitzar, unificar i preparar documents oficials amb privadesa total."
                  : locale === "en"
                  ? "Practical in-depth manuals based on ISO standards to compress, merge, and protect sensitive documents locally."
                  : "Manuales prácticos basados en estándares técnicos para optimizar, unificar y preparar documentos oficiales con total privacidad."}
              </p>
            </div>

            {/* Botón rectangular neobrutalista rojo con sombra sólida negra perfecta shadow-[4px_4px_0_#0F0F12] */}
            <Link
              to={SECTION_ROUTE}
              params={guidesHubParams(locale)}
              className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-7 py-4 text-[16px] font-black text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 6 tarjetas: 100% BLANCAS, etiquetas monocromáticas, botón uniforme rojo */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide) => {
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              return (
                <article
                  key={guide.canonicalSlug}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12]"
                >
                  <div>
                    {/* Fila superior: Badge negro de categoría (cero colores arcoíris) y tiempo de lectura */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white px-3 py-1 text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-[2px_2px_0_#0F0F12]">
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-slate-600 text-xs shrink-0">
                        <Clock className="size-3.5 text-slate-500" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía h3 */}
                    <h3 className="text-[21px] sm:text-[23px] font-black text-[#0F0F12] leading-snug tracking-tight group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción con texto nítido de 16px/17px y leading-relaxed sin recortes extraños */}
                    <p className="mt-3.5 text-[16px] sm:text-[16.5px] leading-relaxed text-slate-700 font-normal">
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta con línea divisoria, nombre completo de autor sin truncar y botón rojo oficial */}
                  <div className="mt-7 pt-4 border-t-2 border-[#0F0F12]/10 flex items-center justify-between gap-3">
                    <span className="text-[13px] text-slate-800 font-bold leading-tight max-w-[150px]">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="group/btn inline-flex items-center gap-2 text-[15px] font-black text-white bg-[#EC3C2D] hover:bg-[#D93426] border-2 border-[#0F0F12] rounded-xl px-5 py-2.5 min-h-[46px] shadow-[3px_3px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] shrink-0"
                    >
                      <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>}`;

c = c.replace(guidesRegex, newGuides);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Successfully updated Bento and Guides!');
