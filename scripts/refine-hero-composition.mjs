import fs from "fs";

const file = "src/routes/$lang/index.tsx";
let code = fs.readFileSync(file, "utf8");

// 1. Update Home component to get tools and roadmap counts
code = code.replace(
  'const { locale, t } = useLocale();',
  'const { locale, t, tools, roadmap } = useLocale();\n  const totalToolsCount = tools.length + roadmap.length;'
);

// 2. Redesign Insignia block:
// - Mascot icon in prominent size (size-7)
// - Bold number of tools
// - HERRAMIENTAS PDF as main text
// - GRATIS EN TU NAVEGADOR as clear secondary
// - Yellow solid background #FEF08A, 2px border #0F0F12, hard shadow
const oldInsigniaRegex = /{\/\* INSIGNIA SUPERIOR:[\s\S]*?<\/a>\s*<\/div>/;

const newInsignia = `{/* INSIGNIA SUPERIOR: RECONOCIBLE, POTENTE Y DINÁMICA */}
            <div className="inline-flex items-center justify-center mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#FEF08A] border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:shadow-[5px_5px_0_#0F0F12] hover:bg-[#FDE047] text-[#0F0F12] transition-all cursor-pointer"
                title="Explorar las herramientas en el catálogo"
              >
                {/* Mascota oficial en tamaño visible */}
                <img
                  src={BRAND_ASSETS.iconWebp}
                  alt=""
                  width={28}
                  height={28}
                  className="size-6 sm:size-7 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                />

                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="text-sm sm:text-base font-black tracking-tight text-[#0F0F12]">
                    {totalToolsCount}
                  </span>
                  <span className="text-xs sm:text-[13.5px] font-black uppercase tracking-wide text-[#0F0F12]">
                    {locale === "ca" ? "Eines PDF" : locale === "en" ? "PDF Tools" : "Herramientas PDF"}
                  </span>
                </div>

                <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F12]/30" aria-hidden="true" />

                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  {locale === "ca" ? "Gratis al teu Navegador" : locale === "en" ? "Free in your Browser" : "Gratis en tu Navegador"}
                </span>
              </a>
            </div>`;

code = code.replace(oldInsigniaRegex, newInsignia);

// 3. Update H1 Display:
// - Horizontal separation: ml-3.5 sm:ml-5
// - Well balanced
const oldH1Regex = /{\/\* H1 PROTAGONISTA ABSOLUTO:[\s\S]*?<\/h1>/;

const newH1 = `{/* H1 PROTAGONISTA ABSOLUTO: Display condensada con separación limpia */}
            <h1 className="text-display mx-auto max-w-6xl text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-black leading-[1.08] tracking-[-0.03em] text-[#0F0F12] uppercase">
              <span className="inline-flex items-center justify-center flex-wrap">
                <span className="tracking-tight">{heroCopy.line1}</span>
                <span className="inline-block ml-3 sm:ml-4 lg:ml-5 transform -rotate-2 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#0F0F12] bg-[#EC3C2D] text-white px-3 sm:px-4 py-0.5 shadow-[3.5px_3.5px_0_#0F0F12] select-none text-[0.88em]">
                  PDF.
                </span>
              </span>
              <span className="relative inline-block mt-1 sm:mt-1.5 pb-2.5 sm:pb-3">
                <span className="relative z-10">{heroCopy.line2}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-[#EC3C2D] rounded-full" />
              </span>
            </h1>`;

code = code.replace(oldH1Regex, newH1);

// 4. Update Benefits Strip count to totalToolsCount dynamic
code = code.replace(
  '{locale === "ca" ? "51 Eines en un Sol Lloc" : locale === "en" ? "51 Tools in One Place" : "51 Herramientas en un Solo Lugar"}',
  `{\`\${totalToolsCount} \${locale === "ca" ? "Eines en un Sol Lloc" : locale === "en" ? "Tools in One Place" : "Herramientas en un Solo Lugar"}\`}`
);

fs.writeFileSync(file, code, "utf8");
console.log("Successfully refined index.tsx!");
