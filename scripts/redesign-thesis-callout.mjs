import fs from 'node:fs';

const filePath = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `aria-label="Guía académica destacada de unificación de TFG/TFM"`;
const idx = content.indexOf(targetStr);

if (idx !== -1) {
  const start = content.lastIndexOf('<aside', idx);
  const end = content.indexOf('</aside>', idx) + '</aside>'.length;
  const original = content.slice(start, end);

  // Redesigned with:
  // 1. Neo-brutalist styling: border-2 border-[#0F0F12], bg-[#FEECEB], shadow-[6px_6px_0_#0F0F12]
  // 2. IMAGE ON THE LEFT (flex-col md:flex-row, with mascot first)
  // 3. TEXT & ACTIONS ON THE RIGHT
  // 4. Mascot with micro-animation animate-neo-wiggle
  // 5. Neo-brutalist badge and button with hard shadow
  const updated = `<aside
          aria-label="Guía académica destacada de unificación de TFG/TFM"
          className="my-10 sm:my-12 overflow-hidden rounded-3xl border-2 border-[#0F0F12] bg-[#FEECEB] p-6 sm:p-8 md:p-10 shadow-[6px_6px_0_#0F0F12] hover:shadow-[8px_8px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            {/* Left: Mascot Thinking (Transparent, large illustration on the LEFT) */}
            <div className="shrink-0 flex items-center justify-center pointer-events-none select-none order-2 md:order-1">
              <GuideMascot
                variant="think"
                size="lg"
                alt="Mascota BreadPDF estudiando la unificación de tesis"
                className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 drop-shadow-md animate-neo-wiggle"
              />
            </div>

            {/* Right: Metadata, Title, Description, and Solid Red CTA */}
            <div className="flex-1 text-center md:text-left order-1 md:order-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#059669] px-3.5 py-1 text-[12px] font-black tracking-wide text-white shadow-[2px_2px_0_#0F0F12]">
                  <GraduationCap className="size-3.5 text-white shrink-0" />
                  <span>{locale === "ca" ? "GUIA TFG / TFM" : locale === "en" ? "THESIS GUIDE" : "GUÍA TFG / TFM"}</span>
                </span>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-white px-2.5 py-0.5 text-[12px] font-bold text-slate-800 shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Contingut recomanat" : locale === "en" ? "Recommended guide" : "Contenido recomendado"}
                </span>
              </div>

              <h3 className="text-[20px] sm:text-[23px] md:text-[25px] font-black text-[#0F0F12] tracking-tight leading-snug">
                {locale === "ca"
                  ? "Com unificar memòria, annexos i portada en un PDF per a TFG o TFM"
                  : locale === "en"
                    ? "How to Merge Thesis Cover, Appendices, and Body into a Single PDF"
                    : "Cómo unificar memoria, anexos y portada en un PDF para TFG o TFM"}
              </h3>

              <p className="mt-3 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-slate-800 font-semibold max-w-2xl">
                {locale === "ca"
                  ? "Passos recomanats per compilar el document oficial, revisar la foliació i complir amb les normes de dipòsit del teu campus."
                  : locale === "en"
                    ? "Recommended steps to compile the formal manuscript, inspect continuous page numbers, and satisfy deposit guidelines."
                    : "Pasos recomendados para compilar el documento oficial, revisar la foliación y cumplir con las normas de depósito."}
              </p>

              <div className="mt-6 flex justify-center md:justify-start">
                <Link
                  to={guidePath(locale, "unificar-memoria-anexos-portada-tfg-tfm")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-7 py-3.5 text-[16px] font-black text-white shadow-[4px_4px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
                >
                  <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
                  <span aria-hidden className="text-lg leading-none font-bold">→</span>
                </Link>
              </div>
            </div>
          </div>
        </aside>`;

  content = content.replace(original, updated);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Thesis callout to neo-brutalist with image on left!');
} else {
  console.warn('Target string not found');
}
