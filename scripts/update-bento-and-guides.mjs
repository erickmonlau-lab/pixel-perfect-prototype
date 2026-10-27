import fs from 'node:fs';

const filePath = 'src/routes/$lang/index.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace both the Bento Section and the Guides Section with the requested deep refactor

const newBentoAndGuides = `      {/* ============================================================
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars (Clean white cards, max-w-6xl)
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#F4F4F5] bg-neo-dots py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-white shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-4 text-[2.4rem] sm:text-[2.9rem] lg:text-[3.4rem] font-black tracking-[-0.03em] leading-[1.08] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-2xl text-[18px] sm:text-[19px] leading-relaxed text-gray-600 font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con 4 tarjetas 100% BLANCAS, borde-t-4 de color, ancho max-w-6xl y layout amplio */}
          <div className="mt-12 sm:mt-14 grid gap-6 sm:grid-cols-2">
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

              const BENTO_THEMES = [
                {
                  icon: Cpu,
                  iconBg: "bg-[#2563EB]",       // Azul eléctrico
                  topBorder: "border-t-4 border-t-[#2563EB]",
                  shadow: "hover:shadow-[6px_6px_0_#2563EB]",
                  tag: "MOTOR WASM",
                  badgeStyle: "bg-[#DBEAFE] text-[#1E40AF] border border-[#2563EB]/40",
                },
                {
                  icon: UserCheck,
                  iconBg: "bg-[#10B981]",       // Verde esmeralda
                  topBorder: "border-t-4 border-t-[#10B981]",
                  shadow: "hover:shadow-[6px_6px_0_#10B981]",
                  tag: "SIN REGISTROS",
                  badgeStyle: "bg-[#D1FAE5] text-[#065F46] border border-[#10B981]/40",
                },
                {
                  icon: ArrowLeftRight,
                  iconBg: "bg-[#8B5CF6]",       // Púrpura / Violeta
                  topBorder: "border-t-4 border-t-[#8B5CF6]",
                  shadow: "hover:shadow-[6px_6px_0_#8B5CF6]",
                  tag: "FORMATOS NATIVOS",
                  badgeStyle: "bg-[#EDE9FE] text-[#5B21B6] border border-[#8B5CF6]/40",
                },
                {
                  icon: DocumentOptimizeIcon,
                  iconBg: "bg-[#F97316]",       // Naranja energético
                  topBorder: "border-t-4 border-t-[#F97316]",
                  shadow: "hover:shadow-[6px_6px_0_#F97316]",
                  tag: "ALTA FIDELIDAD",
                  badgeStyle: "bg-[#FFEDD5] text-[#9A3412] border border-[#F97316]/40",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={\`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] bg-white \${theme.topBorder} p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 \${theme.shadow}\`}
                >
                  {/* Fila superior: Icono cuadrado a la izquierda y Badge de estado a la derecha */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span
                      className={\`inline-flex size-[52px] sm:size-[56px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] \${theme.iconBg} text-white shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3\`}
                    >
                      <Icon className="size-6 text-white stroke-[2.4]" />
                    </span>

                    {/* Badge tipo píldora elegante, sin romper líneas (whitespace-nowrap) */}
                    <span className={\`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap \${theme.badgeStyle}\`}>
                      {theme.tag}
                    </span>
                  </div>

                  {/* Título h3 ocupando todo el ancho debajo de la fila icono+badge */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] tracking-tight leading-snug">
                    {article.title}
                  </h3>

                  {/* Cuerpo de texto con tamaño 15-16px, gris oscuro profundo y interlineado relaxed */}
                  <p className="mt-3 text-base text-gray-700 leading-relaxed font-normal">
                    {article.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (Clean white cards, pt-20)
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-20 pb-16 sm:pt-24 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header con margen superior holgado (sin solapamiento de badge) */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                <BookOpen className="size-3.5" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES & TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F0F12] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-2.5 text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
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
              className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-6 py-3.5 text-[15px] font-bold text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 6 tarjetas: 100% BLANCAS, tipografía nítida y pie de tarjeta alineado */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide) => {
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              const catBadgeStyle = (() => {
                const c = guide.category?.toLowerCase() || "";
                if (c.includes("optimi") || c.includes("comprim")) return "bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]/30";
                if (c.includes("conver") || c.includes("word") || c.includes("excel")) return "bg-[#DBEAFE] text-[#1E40AF] border-[#2563EB]/30";
                if (c.includes("segur") || c.includes("priva")) return "bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]/30";
                if (c.includes("ocr") || c.includes("intel")) return "bg-[#FCE7F3] text-[#9D174D] border-[#EC4899]/30";
                if (c.includes("tfg") || c.includes("tfm") || c.includes("educa")) return "bg-[#D1FAE5] text-[#065F46] border-[#10B981]/30";
                return "bg-[#EDE9FE] text-[#5B21B6] border-[#8B5CF6]/30";
              })();

              return (
                <article
                  key={guide.canonicalSlug}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#0F0F12] bg-white p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12]"
                >
                  <div>
                    {/* Fila superior: Badge de categoría pastel (sin rotura de línea) y tiempo de lectura */}
                    <div className="flex items-center justify-between text-xs font-semibold mb-4">
                      <span className={\`inline-block rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap \${catBadgeStyle}\`}>
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-gray-500 text-xs">
                        <Clock className="size-3.5 text-gray-400" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía h3 */}
                    <h3 className="text-xl font-bold text-[#111827] leading-snug tracking-tight group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción con texto nítido de 15px/16px y leading-relaxed */}
                    <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-gray-700 font-normal line-clamp-3">
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta con línea divisoria sutil y botón neobrutalista interactivo */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-500 font-medium truncate">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="group/btn inline-flex items-center gap-1.5 text-sm font-bold text-[#0F0F12] bg-[#FEF08A] hover:bg-[#0F0F12] hover:text-white border-2 border-[#0F0F12] rounded-lg px-4 py-2 shadow-[2px_2px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] shrink-0"
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
      </section>`;

const startIndex = content.indexOf('{/* ============================================================\n          SECTION — EDITORIAL BENTO:');
const endIndex = content.indexOf('</>\n  );\n}');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + newBentoAndGuides.trim() + '\n    </>\n  );\n}';
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Bento and Guides sections!');
} else {
  console.error('Indices not found:', { startIndex, endIndex });
}
