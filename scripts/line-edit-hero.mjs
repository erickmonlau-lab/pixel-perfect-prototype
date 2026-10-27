import fs from "fs";

const file = "src/routes/$lang/index.tsx";
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

// Line 117 (0-indexed 116): hero section tag
lines[116] = '      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-6 sm:py-8 md:py-10 overflow-hidden">';

// Line 120 (0-indexed 119): canvas container
lines[119] = '        <div className="relative w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 z-20 flex flex-col items-center justify-center min-h-[460px] lg:min-h-[500px]">';

// Zona 1 is lines 122 to 156 (0-indexed 121 to 155, 35 lines)
// Replacing lines 121 to 155 with running mascot:
const newZona1Lines = [
  '          {/* ============================================================',
  '              ZONA 1 (LATERAL IZQUIERDO): MASCOTA DINÁMICA OFICIAL DE LA REFERENCIA',
  '              Mascota pan corriendo con documento PDF rojo y líneas de movimiento',
  '              ============================================================ */}',
  '          <div className="hidden xl:block absolute left-[1%] 2xl:left-[3%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300">',
  '            <img',
  '              src="/brand/hero-mascot-perfect.png"',
  '              alt="Mascota BreadPDF"',
  '              width={260}',
  '              height={270}',
  '              className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"',
  '              loading="eager"',
  '              fetchPriority="high"',
  '            />',
  '          </div>',
  ''
];
lines.splice(121, 35, ...newZona1Lines);

// Now re-locate Insignia:
// Original Insignia was lines 164 to 178 (15 lines).
// With Zona 1 change (35 lines replaced by 16 lines, difference is -19 lines):
// 164 - 19 = 145 (0-indexed 144)
const insStart = lines.findIndex(l => l.includes('class' + 'Name="inline-flex items-center justify-center mb-6'));
console.log('insStart found at:', insStart);

const newInsigniaLines = [
  '            <div className="inline-flex items-center justify-center mb-4 select-none max-w-full">',
  '              <a',
  '                href="#catalogo"',
  '                className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] hover:shadow-[4px_4px_0_#0F0F12] hover:bg-[#FDE047] text-[#0F0F12] transition-all cursor-pointer"',
  '                title="Ver las 51 herramientas en el catálogo"',
  '              >',
  '                <img src={BRAND_ASSETS.iconWebp} alt="" className="size-5 object-contain" aria-hidden="true" />',
  '                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wide">',
  '                  {locale === "ca" ? "51 Eines PDF · 100% Gratuït · Al teu Navegador" : locale === "en" ? "51 PDF Tools · 100% Free · In your Browser" : "51 Herramientas PDF · 100% Gratis · En tu Navegador"}',
  '                </span>',
  '              </a>',
  '            </div>'
];
lines.splice(insStart, 15, ...newInsigniaLines);

// Now re-locate H1:
const h1Start = lines.findIndex(l => l.includes('<h1 class' + 'Name="text-display'));
const h1End = lines.findIndex((l, i) => i >= h1Start && l.includes('</h1>'));
console.log('h1Start & h1End found at:', h1Start, h1End);

const newH1Lines = [
  '            <h1 className="text-display mx-auto max-w-5xl text-3xl sm:text-5xl md:text-[58px] lg:text-[66px] xl:text-[72px] font-black leading-[1.05] tracking-[-0.03em] text-[#0F0F12] uppercase [text-wrap:balance]">',
  '              <span className="inline-flex items-center justify-center flex-wrap gap-x-3 gap-y-1">',
  '                <span>{heroCopy.line1}</span>',
  '                <span className="inline-block transform -rotate-2 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#0F0F12] bg-[#EC3C2D] text-white px-3 sm:px-4 py-0.5 shadow-[3px_3px_0_#0F0F12] select-none text-[0.88em]">',
  '                  PDF.',
  '                </span>',
  '              </span>',
  '              <span className="relative inline-block mt-1 sm:mt-1.5 pb-2.5 sm:pb-3">',
  '                <span className="relative z-10">{heroCopy.line2}</span>',
  '                <span className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-[#EC3C2D] rounded-full" />',
  '              </span>',
  '            </h1>'
];
lines.splice(h1Start, h1End - h1Start + 1, ...newH1Lines);

// Subtitle spacing:
const subIdx = lines.findIndex(l => l.includes('mt-5 mb-8 max-w-2xl'));
if (subIdx !== -1) {
  lines[subIdx] = lines[subIdx].replace('mt-5 mb-8 max-w-2xl', 'mt-3.5 mb-6 max-w-2xl');
}

// Re-locate Zona 3:
const zona3Idx = lines.findIndex(l => l.includes('ZONA 3 (LATERAL DERECHO)'));
const zona3CommentStart = lines.findLastIndex((l, i) => i <= zona3Idx && l.includes('{/* ===================='));
const respIdx = lines.findIndex(l => l.includes('Adaptación responsive (< xl)'));
// The container ends before responsive comment
const zona3ContainerEnd = lines.findLastIndex((l, i) => i < respIdx && l.trim() === '</div>');
console.log('zona3CommentStart, zona3ContainerEnd:', zona3CommentStart, zona3ContainerEnd);

const newZona3Lines = [
  '          {/* ============================================================',
  '              ZONA 3 (LATERAL DERECHO): 4 TARJETAS INCLINADAS DE LA REFERENCIA',
  '              Comprimir, Unir, Convertir, Dividir con sombras duras e iconos exactos',
  '              ============================================================ */}',
  '          <div className="hidden xl:block absolute right-[1%] 2xl:right-[3%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300">',
  '            <img',
  '              src="/brand/hero-tools-perfect.png"',
  '              alt="Herramientas PDF principales"',
  '              width={250}',
  '              height={290}',
  '              className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"',
  '              loading="eager"',
  '            />',
  '          </div>'
];
// Note: we replace the whole Zona 3 block up to the inner grid div closure (just before the closing div of canvas container)
lines.splice(zona3CommentStart, zona3ContainerEnd - zona3CommentStart, ...newZona3Lines);

// Update catalog section padding
const catIdx = lines.findIndex(l => l.includes('id="catalogo"'));
if (catIdx !== -1) {
  lines[catIdx] = lines[catIdx].replace('pt-6 pb-16 sm:pt-8 sm:pb-20', 'pt-4 pb-12 sm:pt-6 sm:pb-16');
}

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Successfully completed index.tsx refinement!');
