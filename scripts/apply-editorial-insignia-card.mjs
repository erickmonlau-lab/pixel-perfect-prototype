import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

const oldInsigniaRegex = /{\/\* INSIGNIA GRÁFICA DE MARCA EN BLANCO SÓLIDO[\s\S]*?<\/a>\s*<\/div>/;

const newInsignia = `{/* TARJETA EDITORIAL DE MARCA (2 NIVELES, ESTRUCTURA COMPACTA, ESQUINAS 14PX) */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-stretch rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[4px_4px_0_#0F0F12] hover:shadow-[5px_5px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden text-left"
                title="Explorar el catálogo completo de 51 herramientas"
              >
                {/* LADO IZQUIERDO: BLOQUE ROJO SÓLIDO RECTANGULAR CON NÚMERO GRANDE Y PESADO */}
                <div className="flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#EC3C2D] text-white border-r-2 border-[#0F0F12] shrink-0">
                  <span className="text-xl sm:text-2xl font-black tracking-tight tabular-nums">
                    {totalToolsCount}
                  </span>
                </div>

                {/* LADO DERECHO: DOS NIVELES CLAROS (TÍTULO + BENEFICIO) */}
                <div className="flex flex-col justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white min-w-0">
                  {/* Nivel 1: Título en negro, negrita y claramente legible */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12] leading-tight">
                      {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
                    </span>
                    <span className="text-xs font-black text-[#EC3C2D] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      →
                    </span>
                  </div>

                  {/* Nivel 2: Subtítulo con alto contraste y 14px legible */}
                  <div className="text-[12px] sm:text-[13.5px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-[#0F0F12] transition-colors leading-tight mt-0.5">
                    {locale === "ca" ? "GRATIS EN EL TEU NAVEGADOR" : locale === "en" ? "FREE IN YOUR BROWSER" : "GRATIS EN TU NAVEGADOR"}
                  </div>
                </div>
              </a>
            </div>`;

if (oldInsigniaRegex.test(code)) {
  code = code.replace(oldInsigniaRegex, newInsignia);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Updated insignia to compact 2-level editorial brand card');
} else {
  console.log('WARNING: oldInsigniaRegex not found in index.tsx');
}
