import fs from 'node:fs';

const file = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings to LF before searching
const normalized = content.replace(/\r\n/g, '\n');

const searchPart = `                {/* Tarjetas de Casos de Uso y Limitaciones — Fondos 100% sólidos según especificación */}
                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                  {/* Tarjeta Casos de uso recomendados: Borde azul / Fondo azul claro sólido #EAF2FF */}
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-7 shadow-[4px_4px_0_#0F0F12] flex flex-col justify-start">
                    <h3 className="text-[20px] sm:text-[21px] font-extrabold text-[#1E3A8A] flex items-center gap-3">
                      <span className="size-2.5 rounded-full bg-[#2563EB] inline-block shrink-0" />
                      {locale === "ca" ? "Casos d'ús recomanats" : locale === "en" ? "Recommended use cases" : "Casos de uso recomendados"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-[16px] sm:text-[17px] text-[#1E293B] font-medium leading-relaxed list-disc pl-6">
                      {bestFor.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tarjeta Limitaciones técnicas: Borde rojo / Fondo rojo claro sólido #FFF0EE */}
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white p-7 shadow-[4px_4px_0_#EC3C2D] flex flex-col justify-start [&_h3]:text-white [&_ul]:text-slate-200">
                    <h3 className="text-[20px] sm:text-[21px] font-extrabold text-[#1E3A8A] flex items-center gap-3">
                      <span className="size-2.5 rounded-full bg-[#EC3C2D] inline-block shrink-0" />
                      {locale === "ca" ? "Limitacions tècniques a considerar" : locale === "en" ? "Technical constraints & trade-offs" : "Limitaciones técnicas a considerar"}
                    </h3>
                    <ul className="mt-4 space-y-3 text-[16px] sm:text-[17px] text-[#1E293B] font-medium leading-relaxed list-disc pl-6">
                      {limitations.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo práctico destacado: Fondo azul claro sólido #F0F5FF con borde nítido */}
                <div className="mt-6 rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white p-6 sm:p-7 text-[16.5px] sm:text-[17.5px] flex items-start gap-4 shadow-[4px_4px_0_#0F0F12] [&_p]:text-white [&_p]:font-bold">
                  <span className="inline-flex items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-1 text-[13px] font-black uppercase text-white shrink-0 tracking-wide shadow-[2px_2px_0_#0F0F12]">
                    {locale === "ca" ? "Consell" : locale === "en" ? "Pro Tip" : "Consejo"}
                  </span>
                  <p className="m-0 leading-relaxed text-slate-700">
                    {proTip}
                  </p>
                </div>`;

const replacePart = `                {/* 2 Tarjetas Luminosas: Casos de Uso (Verde suave) vs Aspectos a considerar (Ámbar suave) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-slate-100">
                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#ECFDF5] p-7 shadow-[4px_4px_0_#10B981] flex flex-col justify-start">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-black text-[16px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        ✓
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F172A]">
                        {locale === "ca" ? "Casos d'ús recomanats" : locale === "en" ? "Recommended use cases" : "Casos de uso recomendados"}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3.5 text-[16px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                      {bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#10B981] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#FFFBEB] p-7 shadow-[4px_4px_0_#F59E0B] flex flex-col justify-start">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-[#F59E0B] text-[#0F0F12] flex items-center justify-center font-black text-[16px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        !
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F172A]">
                        {locale === "ca" ? "Aspectes a tenir en compte" : locale === "en" ? "Technical constraints & trade-offs" : "Aspectos a tener en cuenta"}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3.5 text-[16px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                      {limitations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo Pro con Mascota ilustrada */}
                <div className="mt-8 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="flex items-center gap-3 shrink-0">
                    <img
                      src={BRAND_ASSETS.mascots.think}
                      alt="BreadPDF Pro Tip"
                      width={56}
                      height={56}
                      className="size-14 object-contain animate-neo-wiggle shrink-0 drop-shadow-xs"
                    />
                    <span className="inline-flex items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1 text-[13px] font-black uppercase text-white shrink-0 tracking-wide shadow-[2px_2px_0_#0F0F12]">
                      {locale === "ca" ? "Consell Pro" : locale === "en" ? "Pro Tip" : "Consejo Pro"}
                    </span>
                  </div>
                  <p className="m-0 leading-relaxed text-slate-900 font-bold text-[16px] sm:text-[17.5px]">
                    {proTip}
                  </p>
                </div>`;

if (!normalized.includes(searchPart)) {
  console.error('searchPart still not found');
  process.exit(1);
}

const updated = normalized.replace(searchPart, replacePart);
fs.writeFileSync(file, updated, 'utf8');
console.log('Successfully updated technical block with green/amber cards and mascot pro-tip!');
