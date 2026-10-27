import fs from "fs";

const file = "src/routes/$lang/index.tsx";
let code = fs.readFileSync(file, "utf8");

// 1. Move mascot further left
// Current: absolute left-[1%] 2xl:left-[3%]
// New: absolute left-0 xl:left-[-1.5%] 2xl:left-[0.5%]
code = code.replace(
  'className="hidden xl:block absolute left-[1%] 2xl:left-[3%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300"',
  'className="hidden xl:block absolute left-0 xl:left-[-1%] 2xl:left-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300"'
);

// Scale mascot width slightly
code = code.replace(
  'className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"',
  'className="w-56 h-auto 2xl:w-68 drop-shadow-[5px_5px_0_#0F0F12] object-contain"'
);

// 2. Move tools cluster further right
// Current: absolute right-[1%] 2xl:right-[3%]
// New: absolute right-0 xl:right-[-1%] 2xl:right-[0.5%]
code = code.replace(
  'className="hidden xl:block absolute right-[1%] 2xl:right-[3%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300"',
  'className="hidden xl:block absolute right-0 xl:right-[-1%] 2xl:right-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300"'
);

code = code.replace(
  'className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"\n              loading="eager"\n            />',
  'className="w-56 h-auto 2xl:w-68 drop-shadow-[5px_5px_0_#0F0F12] object-contain"\n              loading="eager"\n            />'
);

// 3. Redesign Insignia:
// Replace yellow capsule with high-contrast Solid Black (#0F0F12) surface, crisp white text, brand red badge:
const oldInsigniaRegex = /{\/\* INSIGNIA SUPERIOR:[\s\S]*?<\/a>\s*<\/div>/;

const newInsignia = `{/* INSIGNIA SUPERIOR: ELEGANTE, PROFESIONAL Y SÓLIDA EN NEGRO (#0F0F12) */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#0F0F12] border-2 border-[#0F0F12] text-white shadow-[3.5px_3.5px_0_#EC3C2D] hover:shadow-[5px_5px_0_#EC3C2D] transition-all cursor-pointer"
                title="Explorar el catálogo completo"
              >
                {/* Badge rojo con el número real */}
                <span className="flex items-center justify-center h-6 sm:h-6.5 px-2 rounded-lg bg-[#EC3C2D] text-white text-xs sm:text-[13px] font-black border border-white/20 tabular-nums">
                  {totalToolsCount}
                </span>

                <span className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-white">
                  {locale === "ca" ? "Eines PDF" : locale === "en" ? "PDF Tools" : "Herramientas PDF"}
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-white/30" aria-hidden="true" />

                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                  {locale === "ca" ? "Gratis · Al teu Navegador" : locale === "en" ? "Free · In your Browser" : "Gratis · En tu Navegador"}
                </span>

                <span className="text-xs font-bold text-[#EC3C2D] group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                  →
                </span>
              </a>
            </div>`;

code = code.replace(oldInsigniaRegex, newInsignia);

// 4. Mount ConfidenceMarquee (AnimatedBrandTicker) right after Hero section
// Check if ConfidenceMarquee is placed right after </section>
if (!code.includes('<ConfidenceMarquee />')) {
  code = code.replace(
    '</section>\n\n      {/* ============================================================',
    '</section>\n\n      {/* Micro-ticker animado de marca: MÁS RÁPIDO · MÁS FÁCIL · EN TU NAVEGADOR */}\n      <ConfidenceMarquee />\n\n      {/* ============================================================'
  );
}

fs.writeFileSync(file, code, "utf8");
console.log("Successfully refined hero in index.tsx!");
