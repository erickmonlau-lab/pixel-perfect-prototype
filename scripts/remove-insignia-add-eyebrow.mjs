import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the entire top insignia block with the clean editorial label:
// «GRATIS · DIRECTAMENTE EN TU NAVEGADOR»
const oldInsigniaRegex = /{\/\* TARJETA EDITORIAL DE MARCA[\s\S]*?<\/a>\s*<\/div>/;

const newEditorialEyebrow = `{/* RÓTULO EDITORIAL LIMPIO SOBRE EL TITULAR: MENOS REDUNDANCIA, H1 PROTAGONISTA */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
                <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#0F0F12]">
                  {locale === "ca" 
                    ? "GRATIS · DIRECTAMENT AL TEU NAVEGADOR" 
                    : locale === "en" 
                    ? "FREE · DIRECTLY IN YOUR BROWSER" 
                    : "GRATIS · DIRECTAMENTE EN TU NAVEGADOR"}
                </span>
              </div>
            </div>`;

if (oldInsigniaRegex.test(code)) {
  code = code.replace(oldInsigniaRegex, newEditorialEyebrow);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Removed 51 tools badge, replaced with clean editorial eyebrow label');
} else {
  console.log('WARNING: oldInsigniaRegex not found in index.tsx');
}
