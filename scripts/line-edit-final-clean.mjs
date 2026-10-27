import fs from "fs";

const file = "src/routes/$lang/index.tsx";
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

// Line 127 to 137: Zona 1
// We replace Zona 1 div with the new layout including Mascot + Brand text block
const zona1Idx = lines.findIndex(l => l.includes("ZONA 1 (LATERAL IZQUIERDO)"));
const zona2Idx = lines.findIndex(l => l.includes("ZONA 2 (CENTRO)"));

console.log("zona1Idx:", zona1Idx, "zona2Idx:", zona2Idx);

const newZona1Lines = [
  '          {/* ============================================================',
  '              ZONA 1 (LATERAL IZQUIERDO): MASCOTA + FRASE DE MARCA ANIMADA',
  '              Posición exterior izquierda, escala prominente y microanimación conectada',
  '              ============================================================ */}',
  '          <div className="hidden xl:flex flex-col items-center absolute left-[-0.5%] 2xl:left-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">',
  '            <div className="relative transition-transform hover:scale-105 duration-300">',
  '              <img',
  '                src="/brand/hero-mascot-perfect.png"',
  '                alt="Mascota BreadPDF"',
  '                width={280}',
  '                height={290}',
  '                className="w-58 h-auto 2xl:w-68 drop-shadow-[5px_5px_0_#0F0F12] object-contain"',
  '                loading="eager"',
  '                fetchPriority="high"',
  '              />',
  '            </div>',
  '',
  '            {/* Micro-bloque de marca junto a la mascota (Sin marquesina de ancho completo) */}',
  '            <div className="mt-2 flex flex-col items-center bg-white px-3.5 py-1.5 rounded-xl border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] text-center">',
  '              <div className="flex items-center gap-1.5 text-[11.5px] 2xl:text-xs font-black uppercase tracking-wider text-[#0F0F12]">',
  '                <span className="text-[#EC3C2D]">MÁS RÁPIDO</span>',
  '                <span>·</span>',
  '                <span className="text-[#EC3C2D]">MÁS FÁCIL</span>',
  '              </div>',
  '              <div className="text-[11px] 2xl:text-[11.5px] font-black uppercase tracking-widest text-[#0F0F12] mt-0.5">',
  '                EN TU NAVEGADOR',
  '              </div>',
  '            </div>',
  '          </div>',
  ''
];

// In the original file:
// zona1Idx is 123 (0-indexed)
// lines[123] to lines[138] are replaced
lines.splice(zona1Idx - 1, (zona2Idx - 1) - (zona1Idx - 1), ...newZona1Lines);

// Now update right tools position
const toolsIdx = lines.findIndex(l => l.includes('alt="Herramientas PDF principales"'));
console.log("toolsIdx:", toolsIdx);
// Find the div wrapping this img
for (let i = toolsIdx - 1; i >= toolsIdx - 5; i--) {
  if (lines[i].includes('<div className="hidden xl:block absolute')) {
    lines[i] = '          <div className="hidden xl:block absolute right-[-0.5%] 2xl:right-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300">';
    break;
  }
}

// Now remove <ConfidenceMarquee /> line
const marqueeIdx = lines.findIndex(l => l.includes('<ConfidenceMarquee />'));
console.log("marqueeIdx:", marqueeIdx);
if (marqueeIdx !== -1) {
  // also check if preceding comment is about ticker
  if (lines[marqueeIdx - 1]?.includes('Micro-ticker animado')) {
    lines.splice(marqueeIdx - 1, 2);
  } else {
    lines.splice(marqueeIdx, 1);
  }
}

// Now replace <aside aria-label="Beneficios principales" ...> with white solid neo-brutalist version
const asideStart = lines.findIndex(l => l.includes('<aside aria-label="Beneficios principales"'));
const asideEnd = lines.findIndex((l, i) => i > asideStart && l.includes('</aside>'));
console.log("asideStart:", asideStart, "asideEnd:", asideEnd);

const newAsideLines = [
  '      <aside aria-label="Beneficios principales" className="relative z-20 border-b-2 border-[#0F0F12] bg-white text-[#0F0F12] py-4 px-4 sm:px-6">',
  '        <div className="mx-auto max-w-[1520px] flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-center sm:text-left">',
  '          ',
  '          {/* Beneficio 1: Gratuito */}',
  '          <div className="flex items-center gap-3">',
  '            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0F0F12] text-[#EC3C2D] shadow-[2.5px_2.5px_0_#0F0F12]">',
  '              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">',
  '                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />',
  '              </svg>',
  '            </span>',
  '            <div>',
  '              <p className="text-[16px] sm:text-[17px] font-black uppercase tracking-wide text-[#0F0F12] leading-tight">',
  '                {locale === "ca" ? "100% Gratuït" : locale === "en" ? "100% Free" : "100% Gratuito"}',
  '              </p>',
  '              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium mt-0.5">',
  '                {locale === "ca" ? "Sense quotes ocultes ni subscripció" : locale === "en" ? "No hidden fees or subscriptions" : "Sin suscripción ni pagos obligatorios"}',
  '              </p>',
  '            </div>',
  '          </div>',
  '',
  '          {/* Separador vertical escritorio */}',
  '          <span className="hidden lg:block w-px h-9 bg-[#0F0F12]/15" />',
  '',
  '          {/* Beneficio 2: Local en RAM */}',
  '          <div className="flex items-center gap-3">',
  '            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0F0F12] text-[#EC3C2D] shadow-[2.5px_2.5px_0_#0F0F12]">',
  '              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">',
  '                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />',
  '                <path d="M9.5 11.5l2 2 3.5-3.5" />',
  '              </svg>',
  '            </span>',
  '            <div>',
  '              <p className="text-[16px] sm:text-[17px] font-black uppercase tracking-wide text-[#0F0F12] leading-tight">',
  '                {locale === "ca" ? "Processament Local" : locale === "en" ? "Local Processing" : "Procesamiento Local"}',
  '              </p>',
  '              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium mt-0.5">',
  '                {locale === "ca" ? "Execució al navegador per a màxima privadesa" : locale === "en" ? "In-browser execution for real privacy" : "En tu navegador para máxima privacidad"}',
  '              </p>',
  '            </div>',
  '          </div>',
  '',
  '          {/* Separador vertical escritorio */}',
  '          <span className="hidden lg:block w-px h-9 bg-[#0F0F12]/15" />',
  '',
  '          {/* Beneficio 3: Catálogo Completo */}',
  '          <div className="flex items-center gap-3">',
  '            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0F0F12] text-[#EC3C2D] shadow-[2.5px_2.5px_0_#0F0F12]">',
  '              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">',
  '                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />',
  '                <polyline points="14 2 14 8 20 8" />',
  '                <line x1="16" y1="13" x2="8" y2="13" />',
  '                <line x1="16" y1="17" x2="8" y2="17" />',
  '                <polyline points="10 9 9 9 8 9" />',
  '              </svg>',
  '            </span>',
  '            <div>',
  '              <p className="text-[16px] sm:text-[17px] font-black uppercase tracking-wide text-[#0F0F12] leading-tight">',
  '                {`${totalToolsCount} ${locale === "ca" ? "Eines PDF" : locale === "en" ? "PDF Tools" : "Herramientas PDF"}`}',
  '              </p>',
  '              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium mt-0.5">',
  '                {locale === "ca" ? "Comprimeix, uneix, converteix i edita" : locale === "en" ? "Compress, merge, convert and edit" : "Comprime, une, convierte y edita"}',
  '              </p>',
  '            </div>',
  '          </div>',
  '',
  '        </div>',
  '      </aside>'
];

lines.splice(asideStart, (asideEnd - asideStart + 1), ...newAsideLines);

fs.writeFileSync(file, lines.join("\n"), "utf8");
console.log("Successfully line-edited index.tsx!");
