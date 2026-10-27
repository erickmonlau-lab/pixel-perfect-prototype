import fs from 'node:fs';
import path from 'node:path';

const p = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(p, 'utf8');

const isCRLF = c.includes('\r\n');
if (isCRLF) c = c.replace(/\r\n/g, '\n');

// 1. Remove Trust Badges from Hero central card
const oldTrustBadgesRow = `            {/* Fila de Trust Badges compactos integrada de forma sutil */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-y-1.5 gap-x-5 text-[12px] sm:text-[12.5px] font-bold text-slate-700">
              <div className="inline-flex items-center gap-1.5">
                <span className="text-amber-500 font-black text-sm">⚡</span>
                <span>{locale === "ca" ? "Processament 100% Local (WASM)" : locale === "en" ? "100% Client-Side Processing (WASM)" : "Procesamiento 100% Local (WASM)"}</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="text-emerald-600 font-black text-sm">🔒</span>
                <span>{locale === "ca" ? "Privadesa Total (Zero pujades)" : locale === "en" ? "Total Privacy (Zero server uploads)" : "Privacidad Total (Cero subidas)"}</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="text-rose-500 font-black text-sm">✨</span>
                <span>{locale === "ca" ? "Sense registres ni marques" : locale === "en" ? "No sign-up or watermarks" : "Sin registros ni marcas"}</span>
              </div>
            </div>`;

if (c.includes(oldTrustBadgesRow)) {
  c = c.replace(oldTrustBadgesRow, '');
  console.log('Removed Trust Badges row from Hero central card!');
} else {
  // Try regex removal in case whitespace differs
  const regex = /\{\/\* Fila de Trust Badges[\s\S]*?Sin registros ni marcas"\}<\/span>\s*<\/div>\s*<\/div>/;
  if (regex.test(c)) {
    c = c.replace(regex, '');
    console.log('Removed Trust Badges row using regex!');
  } else {
    console.log('Trust Badges row not found directly, checking...');
  }
}

// 2. Overhaul Bento section (Benefits) with wide canvas (max-w-[1440px]), explicit contrast on dark cards (text-white titles, text-slate-300 body), clamp titles
const bentoRegex = /\{\/\* =+[\s\S]*?SECTION — EDITORIAL BENTO:[\s\S]*?<\/section>/;

const newBento = `{/* ============================================================
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars (GYMVITY style)
          Wide canvas max-w-[1440px], 2-column layout, explicit high contrast on dark surfaces
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-4 py-1.5 text-xs sm:text-sm font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-5 text-[2.6rem] sm:text-[3.5rem] lg:text-[4.2rem] font-black tracking-tight leading-[1.05] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con 4 tarjetas de alto impacto (Blanco y Negro alternadas) */}
          <div className="mt-14 sm:mt-16 grid gap-8 sm:grid-cols-2">
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

              // Estricto sistema cromático con contraste explícito:
              // Tarjeta 0: Blanca (fondo blanco, título negro, texto gris oscuro)
              // Tarjeta 1: Negra (fondo negro, título BLANCO EXPLÍCITO, texto slate-200)
              // Tarjeta 2: Negra (fondo negro, título BLANCO EXPLÍCITO, texto slate-200)
              // Tarjeta 3: Blanca (fondo blanco, título negro, texto gris oscuro)
              const BENTO_THEMES = [
                {
                  icon: Cpu,
                  cardBg: "bg-white",
                  titleColor: "text-[#0F0F12]",
                  bodyColor: "text-slate-700",
                  iconBg: "bg-[#0F0F12]",
                  iconColor: "text-white",
                  tagBg: "bg-[#0F0F12] text-white",
                  tag: "MOTOR WASM",
                },
                {
                  icon: UserCheck,
                  cardBg: "bg-[#0F0F12]",
                  titleColor: "text-white",
                  bodyColor: "text-slate-200",
                  iconBg: "bg-white",
                  iconColor: "text-[#0F0F12]",
                  tagBg: "bg-[#EC3C2D] text-white",
                  tag: "SIN REGISTROS",
                },
                {
                  icon: ArrowLeftRight,
                  cardBg: "bg-[#0F0F12]",
                  titleColor: "text-white",
                  bodyColor: "text-slate-200",
                  iconBg: "bg-white",
                  iconColor: "text-[#0F0F12]",
                  tagBg: "bg-white text-[#0F0F12]",
                  tag: "FORMATOS NATIVOS",
                },
                {
                  icon: DocumentOptimizeIcon,
                  cardBg: "bg-white",
                  titleColor: "text-[#0F0F12]",
                  bodyColor: "text-slate-700",
                  iconBg: "bg-[#0F0F12]",
                  iconColor: "text-white",
                  tagBg: "bg-[#0F0F12] text-white",
                  tag: "ALTA FIDELIDAD",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={\`group relative flex flex-col justify-start rounded-3xl border-2 border-[#0F0F12] \${theme.cardBg} p-8 sm:p-10 shadow-[6px_6px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0F0F12]\`}
                >
                  {/* Fila superior: Icono cuadrado y Tag contundente */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span
                      className={\`inline-flex size-[58px] sm:size-[64px] shrink-0 items-center justify-center rounded-2xl border-2 border-[#0F0F12] \${theme.iconBg} shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-105\`}
                    >
                      <Icon className={\`size-7 \${theme.iconColor} stroke-[2.5]\`} />
                    </span>

                    {/* Tag de estado en alto contraste sin colores pastel */}
                    <span className={\`inline-flex items-center rounded-lg border-2 border-[#0F0F12] px-4 py-1.5 text-xs font-black tracking-wider uppercase whitespace-nowrap shadow-[2px_2px_0_#0F0F12] \${theme.tagBg}\`}>
                      {theme.tag}
                    </span>
                  </div>

                  {/* Título de la tarjeta con color explícito */}
                  <h3 className={\`text-[24px] sm:text-[28px] font-black tracking-tight leading-snug \${theme.titleColor}\`}>
                    {article.title}
                  </h3>

                  {/* Párrafo explicativo */}
                  <p className={\`mt-3 text-[17px] sm:text-[18.5px] leading-relaxed font-normal \${theme.bodyColor}\`}>
                    {article.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>}`;

c = c.replace(bentoRegex, newBento);

// 3. Overhaul Guides section on Home to wide canvas max-w-[1440px] and alternating white/black cards
const guidesRegex = /\{\/\* =+[\s\S]*?SECTION — EDITORIAL GUIDES:[\s\S]*?<\/section>/;

const newGuides = `{/* ============================================================
          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (GYMVITY style)
          Wide canvas max-w-[1440px], 3-column layout, display headline clamp, alternating cards
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          
          {/* Header con tipografía display contundente y botón rectangular rojo neobrutalista */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                <BookOpen className="size-4 text-[#EC3C2D]" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES AND TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-[2.8rem] sm:text-[3.6rem] lg:text-[4.2rem] font-black text-[#0F0F12] leading-[1.05] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-4 text-[18px] sm:text-[20px] text-slate-800 max-w-3xl font-medium leading-relaxed">
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
              className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-8 py-4 text-[16px] font-black text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 6 tarjetas: ancho generoso 3 columnas en escritorio, alternando blanco y negro */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide, idx) => {
              const isBlackCard = idx % 3 === 1; // Alternancia elegante
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              return (
                <article
                  key={guide.canonicalSlug}
                  className={\`group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#0F0F12] p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] \${
                    isBlackCard ? "bg-[#0F0F12] text-white" : "bg-white text-[#0F0F12]"
                  }\`}
                >
                  <div>
                    {/* Fila superior: Badge de categoría y tiempo de lectura */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className={\`inline-block rounded-lg border-2 border-[#0F0F12] px-3.5 py-1 text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-[2px_2px_0_#0F0F12] \${
                        isBlackCard ? "bg-white text-[#0F0F12]" : "bg-[#0F0F12] text-white"
                      }\`}>
                        {guide.category}
                      </span>
                      <span className={\`flex items-center gap-1.5 font-bold text-xs shrink-0 \${
                        isBlackCard ? "text-slate-300" : "text-slate-600"
                      }\`}>
                        <Clock className="size-3.5" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía: 23-26px con contraste explícito */}
                    <h3 className={\`text-[22px] sm:text-[25px] font-black leading-snug tracking-tight transition-colors \${
                      isBlackCard ? "text-white group-hover:text-[#EC3C2D]" : "text-[#0F0F12] group-hover:text-[#EC3C2D]"
                    }\`}>
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción con texto nítido de 16px/17px */}
                    <p className={\`mt-3.5 text-[16px] sm:text-[17px] leading-relaxed font-normal \${
                      isBlackCard ? "text-slate-300" : "text-slate-700"
                    }\`}>
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta con autor y botón rojo uniforme */}
                  <div className={\`mt-8 pt-5 border-t-2 flex items-center justify-between gap-3 \${
                    isBlackCard ? "border-white/15" : "border-[#0F0F12]/10"
                  }\`}>
                    <span className={\`text-[13px] font-bold leading-tight max-w-[150px] \${
                      isBlackCard ? "text-slate-400" : "text-slate-700"
                    }\`}>
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

fs.writeFileSync(p, isCRLF ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('Successfully updated $lang/index.tsx with wide canvas, high contrast Bento and Guides!');
