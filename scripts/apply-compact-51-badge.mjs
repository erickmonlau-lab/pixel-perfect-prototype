import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace top eyebrow with the compact 51 HERRAMIENTAS PDF badge
const oldEyebrowRegex = /{\/\* RÓTULO EDITORIAL LIMPIO SOBRE EL TITULAR[\s\S]*?<\/div>\s*<\/div>/;

const newInsignia = `{/* INSIGNIA COMPACTA: [51] HERRAMIENTAS PDF */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] hover:shadow-[4px_4px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer"
                title="Explorar el catálogo completo"
              >
                {/* Acento rojo sólido con el número verificado del catálogo */}
                <span className="flex items-center justify-center h-6 sm:h-6.5 px-2 rounded-md bg-[#EC3C2D] text-white text-xs sm:text-[13.5px] font-black border border-black/20 tabular-nums">
                  {totalToolsCount}
                </span>

                {/* Texto principal protagonista en negro y negrita de 15-16px */}
                <span className="text-sm sm:text-[15.5px] font-black uppercase tracking-wider text-[#0F0F12]">
                  {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
                </span>

                <span className="text-xs font-black text-[#EC3C2D] group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                  →
                </span>
              </a>
            </div>`;

if (oldEyebrowRegex.test(code)) {
  code = code.replace(oldEyebrowRegex, newInsignia);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Updated index.tsx with compact [51] HERRAMIENTAS PDF badge');
} else {
  console.log('WARNING: oldEyebrowRegex not found in index.tsx');
}
