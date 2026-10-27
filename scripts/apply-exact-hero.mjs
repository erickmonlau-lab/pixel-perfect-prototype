import fs from "fs";

const target = "src/routes/$lang/index.tsx";
let content = fs.readFileSync(target, "utf8");

// 1. Update hero section padding and min-height
content = content.replace(
  'className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-12 md:py-16 lg:py-20 overflow-hidden"',
  'className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-6 sm:py-8 md:py-10 overflow-hidden"'
);

content = content.replace(
  'min-h-[520px] lg:min-h-[580px]',
  'min-h-[460px] lg:min-h-[500px]'
);

// 2. Replace Zona 1 (Left Mascot) with the exact reference running mascot holding red PDF
const oldZona1Marker = "ZONA 1 (LATERAL IZQUIERDO)";
const oldZona2Marker = "ZONA 2 (CENTRO)";
const idx1 = content.indexOf(oldZona1Marker);
const idx2 = content.indexOf(oldZona2Marker);

if (idx1 !== -1 && idx2 !== -1) {
  const start = content.lastIndexOf("{/*", idx1);
  const end = content.lastIndexOf("{/*", idx2);
  
  const newZona1 = `{/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): MASCOTA DINÁMICA OFICIAL DE LA REFERENCIA
              Mascota pan corriendo con documento PDF rojo y líneas de movimiento
              ============================================================ */}
          <div className="hidden xl:block absolute left-[1%] 2xl:left-[3%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300">
            <img
              src="/brand/hero-mascot-perfect.png"
              alt="Mascota BreadPDF"
              width={260}
              height={270}
              className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          `;
  content = content.slice(0, start) + newZona1 + content.slice(end);
}

// 3. Replace Insignia Superior with the yellow capsule from reference:
// ✨ 51 Herramientas PDF · 100% Gratis · En tu Navegador
content = content.replace(
  /<div className="inline-flex items-center justify-center mb-6 select-none max-w-full">[\s\S]*?<\/div>\s*<\/div>/,
  `<div className="inline-flex items-center justify-center mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] hover:shadow-[4px_4px_0_#0F0F12] hover:bg-[#FDE047] text-[#0F0F12] transition-all cursor-pointer"
                title="Ver las 51 herramientas en el catálogo"
              >
                <img src={BRAND_ASSETS.iconWebp} alt="" className="size-5 object-contain" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wide">
                  {locale === "ca" ? "51 Eines PDF · 100% Gratuït · Al teu Navegador" : locale === "en" ? "51 PDF Tools · 100% Free · In your Browser" : "51 Herramientas PDF · 100% Gratis · En tu Navegador"}
                </span>
              </a>
            </div>`
);

// 4. Update H1 Display to ensure TODAS TUS HERRAMIENTAS and [PDF.] are on line 1, and EN UN SOLO LUGAR. with underline on line 2
const oldH1Regex = /<h1 className="text-display mx-auto max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-\[72px\] xl:text-\[80px\] font-black leading-\[1\.04\] tracking-\[-0\.035em\] text-\[#0F0F12\] uppercase \[text-wrap:balance\]>[\s\S]*?<\/h1>/;

const newH1 = `<h1 className="text-display mx-auto max-w-5xl text-3xl sm:text-5xl md:text-[58px] lg:text-[66px] xl:text-[72px] font-black leading-[1.05] tracking-[-0.03em] text-[#0F0F12] uppercase [text-wrap:balance]">
              <span className="inline-flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
                <span>{heroCopy.line1}</span>
                <span className="inline-block transform -rotate-2 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#0F0F12] bg-[#EC3C2D] text-white px-3 sm:px-4 py-0.5 shadow-[3px_3px_0_#0F0F12] select-none text-[0.88em]">
                  PDF.
                </span>
              </span>
              <span className="relative inline-block mt-1 sm:mt-1.5 pb-2.5 sm:pb-3">
                <span className="relative z-10">{heroCopy.line2}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-[#EC3C2D] rounded-full" />
              </span>
            </h1>`;

content = content.replace(oldH1Regex, newH1);

// 5. Update subtitle spacing
content = content.replace(
  'className="mx-auto mt-5 mb-8 max-w-2xl text-base sm:text-lg lg:text-xl font-medium text-slate-800 leading-relaxed"',
  'className="mx-auto mt-3.5 mb-6 max-w-2xl text-base sm:text-lg lg:text-xl font-medium text-slate-800 leading-relaxed"'
);

// 6. Replace Zona 3 (Right side) with the 4 tilted tool cards graphic matching reference
const oldZona3Marker = "ZONA 3 (LATERAL DERECHO)";
const responsiveMarker = "Adaptación responsive (< xl)";
const idx3 = content.indexOf(oldZona3Marker);
const idxResp = content.indexOf(responsiveMarker);

if (idx3 !== -1 && idxResp !== -1) {
  const start = content.lastIndexOf("{/*", idx3);
  const end = content.lastIndexOf("{/*", idxResp);
  
  const newZona3 = `{/* ============================================================
              ZONA 3 (LATERAL DERECHO): 4 TARJETAS INCLINADAS DE LA REFERENCIA
              Comprimir, Unir, Convertir, Dividir con sombras duras e iconos exactos
              ============================================================ */}
          <div className="hidden xl:block absolute right-[1%] 2xl:right-[3%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300">
            <img
              src="/brand/hero-tools-perfect.png"
              alt="Herramientas PDF principales"
              width={250}
              height={290}
              className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
              loading="eager"
            />
          </div>

        </div>

        `;
  content = content.slice(0, start) + newZona3 + content.slice(end);
}

// 7. Update catalog padding to make first row visible on 1440x900
content = content.replace(
  '<section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-6 pb-16 sm:pt-8 sm:pb-20" id="catalogo">',
  '<section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-4 pb-12 sm:pt-6 sm:pb-16" id="catalogo">'
);

fs.writeFileSync(target, content, "utf8");
console.log("Successfully updated", target);
