import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the upper insignia block
const oldInsigniaRegex = /{\/\* INSIGNIA DE MARCA POTENTE:[\s\S]*?<\/a>\s*<\/div>/;

const newInsignia = `{/* INSIGNIA GRÁFICA DE MARCA NEO-BRUTALISTA CON 3 ZONAS CLARAS */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-stretch rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[4px_4px_0_#0F0F12] hover:shadow-[5px_5px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                title="Explorar el catálogo completo de 51 herramientas"
              >
                {/* ZONA 1: NÚMERO PROTAGONISTA EN BLOQUE ROJO SÓLIDO (#EC3C2D) */}
                <div className="flex items-center justify-center px-3.5 sm:px-4 py-2 bg-[#EC3C2D] text-white border-r-2 border-[#0F0F12]">
                  <span className="text-base sm:text-lg font-black tracking-tight tabular-nums">
                    {totalToolsCount}
                  </span>
                </div>

                {/* ZONA 2: IDENTIDAD DEL PRODUCTO (HERRAMIENTAS PDF + MINI MASCOTA) */}
                <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-white border-r-2 border-[#0F0F12]">
                  <img
                    src={BRAND_ASSETS.mascotPng}
                    alt="BreadPDF"
                    width={22}
                    height={22}
                    className="size-5 object-contain"
                  />
                  <span className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#0F0F12]">
                    {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
                  </span>
                </div>

                {/* ZONA 3: BENEFICIO CLARO Y LEGIBLE (GRATIS · EN TU NAVEGADOR) */}
                <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-[#F8FAFC]">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-600 group-hover:text-[#0F0F12] transition-colors">
                    {locale === "ca" ? "GRATIS · AL TEU NAVEGADOR" : locale === "en" ? "FREE · IN YOUR BROWSER" : "GRATIS · EN TU NAVEGADOR"}
                  </span>
                  <span className="text-xs font-black text-[#EC3C2D] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    →
                  </span>
                </div>
              </a>
            </div>`;

if (oldInsigniaRegex.test(code)) {
  code = code.replace(oldInsigniaRegex, newInsignia);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Insignia replaced with 3-zone neo-brutalist brand card');
} else {
  console.log('WARNING: oldInsigniaRegex not found in index.tsx');
}
