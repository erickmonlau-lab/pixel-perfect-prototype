import fs from 'node:fs';

const filePath = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `aria-label="Guía editorial para rellenar y firmar formularios PDF"`;
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  const start = content.lastIndexOf('<aside', idx);
  const end = content.indexOf('</aside>', idx) + '</aside>'.length;
  const original = content.slice(start, end);

  const updated = `<aside
          aria-label="Guía editorial para rellenar y firmar formularios PDF"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0F9FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0284C7] text-white shadow-[2px_2px_0_#0F0F12]">
                <ClipboardEdit className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0F2FE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#0369A1] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Administrativa" : locale === "en" ? "Administrative Guide" : "Guía Administrativa"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com omplir i signar un formulari PDF des del navegador"
                    : locale === "en"
                      ? "How to Fill and Sign a PDF Form from Your Browser"
                      : "Cómo rellenar y firmar un formulario PDF desde el navegador"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Completa camps AcroForm estructurats, estampa signatures visuals i distingeix rúbriques gràfiques de certificats digitals."
                    : locale === "en"
                      ? "Fill interactive AcroForm inputs, stamp visual signatures, and understand the difference between visual marks and digital certificates."
                      : "Completa campos AcroForm estructurados, estampa firmas visuales y distingue rúbricas gráficas de certificados digitales."}
                </p>
              </div>
            </div>
            <Link
              to={\`/\${locale}/\${SEGMENTS[locale].guides}/\${guideSlugFor(locale, "rellenar-y-firmar-formulario-pdf")}\` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>`;

  content = content.replace(original, updated);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully replaced fill guide callout!');
} else {
  console.warn('Target string not found');
}
