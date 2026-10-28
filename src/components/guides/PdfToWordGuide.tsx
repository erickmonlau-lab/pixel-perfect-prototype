import { Link } from "@tanstack/react-router";
import { AlertTriangle, FileType2, ScanText, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { type GuideDefinition } from "@/lib/guides/registry";
import { toolPath } from "@/lib/i18n/routing";
import {
  GuideHero,
  GuideInfographic,
  GuideStep,
  GuideCTA,
  GuideMascotCallout,
  GuideFAQ,
  GuideFooterSources,
} from "@/components/guides/editorial/GuideEditorial";

interface GuideArticleProps {
  locale: Locale;
  guide: GuideDefinition;
}

export function PdfToWordGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<FileType2 className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Conversió & Edició de Documents"
            : isEn
              ? "Conversion & Document Editing"
              : "Conversión & Edición de Documentos"
        }
        subtitle={
          isCa
            ? "Convertir un PDF a Word no consisteix a copiar l'aparença del document, sinó a recuperar el text per poder tornar-lo a editar. Aquesta guia explica què extreu el conversor de BreadPDF, com es conserva l'ordre de lectura i en quins casos necessites un pas previ abans de convertir."
            : isEn
              ? "Converting a PDF to Word is not about copying the document's appearance, but recovering its text so you can edit it again. This guide explains what the BreadPDF converter extracts, how reading order is preserved, and when you need an earlier step before converting."
              : "Convertir un PDF a Word no consiste en copiar el aspecto del documento, sino en recuperar el texto para poder volver a editarlo. Esta guía explica qué extrae el conversor de BreadPDF, cómo se conserva el orden de lectura y en qué casos necesitas un paso previo antes de convertir."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Principi clau: text editable ≠ maquetació reproduïda"
            : isEn
              ? "Core Principle: Editable Text ≠ Reproduced Layout"
              : "Principio clave: texto editable ≠ maquetación reproducida",
          description: isCa
            ? "El resultat és un .docx net amb el text de cada pàgina, no un clon visual del PDF. Si necessites conservar imatges, columnes o tipografies exactes, aquest flux no és el adequat i convé revisar les alternatives de l'apartat final."
            : isEn
              ? "The output is a clean .docx containing each page's text, not a visual clone of the PDF. If you need to preserve images, columns, or exact typefaces, this workflow is not the right fit — review the alternatives at the end."
              : "El resultado es un .docx limpio con el texto de cada página, no un clon visual del PDF. Si necesitas conservar imágenes, columnas o tipografías exactas, este flujo no es el adecuado y conviene revisar las alternativas del apartado final.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/convertir-pdf-a-word-editable.svg"
        alt={
          guide.image?.alt[locale] ||
          guide.image?.alt.es ||
          "Conversión de PDF a Word editable"
        }
        caption={
          isCa
            ? "Flux real del conversor: capa de text → agrupació per línies → marcadors de pàgina → .docx editable."
            : isEn
              ? "Actual converter flow: text layer → line grouping → page markers → editable .docx."
              : "Flujo real del conversor: capa de texto → agrupación por líneas → marcadores de página → .docx editable."
        }
      />

      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa ? "Motor d'extracció local" : isEn ? "Local extraction engine" : "Motor de extracción local"
        }
        title={
          isCa
            ? "El text surt del PDF, no d'un servei al núvol"
            : isEn
              ? "The text comes from the PDF, not from a cloud service"
              : "El texto sale del PDF, no de un servicio en la nube"
        }
        description={
          isCa
            ? "BreadPDF llegeix la capa de text del document al teu navegador, agrupa les paraules per línies i les ordena dalt a baix. El fitxer no s'envia a cap servidor per convertir-lo."
            : isEn
              ? "BreadPDF reads the document's text layer in your browser, groups words into visual lines, and orders them top to bottom. The file is never sent to a server for conversion."
              : "BreadPDF lee la capa de texto del documento en tu navegador, agrupa las palabras por líneas y las ordena de arriba abajo. El archivo no se envía a ningún servidor para convertirlo."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: what is preserved */}
        <section aria-labelledby="what-is-preserved">
          <h2 id="what-is-preserved" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "Què conserva i què no conserva el conversor"
              : isEn
                ? "What the Converter Keeps and What It Does Not"
                : "Qué conserva y qué no conserva el conversor"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Abans de convertir, convé saber exactament què obtindràs. Aquesta taula descriu el comportament real de l'eina, no una promesa de fidelitat absoluta:"
              : isEn
                ? "Before converting, it helps to know exactly what you will get. The table describes the tool's actual behaviour, not a promise of perfect fidelity:"
                : "Antes de convertir conviene saber exactamente qué vas a obtener. Esta tabla describe el comportamiento real de la herramienta, no una promesa de fidelidad absoluta:"}
          </p>

          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead className="bg-slate-50 text-[#0F172A] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">
                    {isCa ? "Element del PDF" : isEn ? "PDF element" : "Elemento del PDF"}
                  </th>
                  <th className="p-3.5">
                    {isCa ? "Al .docx" : isEn ? "In the .docx" : "En el .docx"}
                  </th>
                  <th className="p-3.5">
                    {isCa ? "Què passa exactament" : isEn ? "What actually happens" : "Qué ocurre exactamente"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">
                    {isCa ? "Text seleccionable" : isEn ? "Selectable text" : "Texto seleccionable"}
                  </td>
                  <td className="p-3.5 font-medium text-emerald-900 bg-emerald-50/50">
                    {isCa ? "Sí" : isEn ? "Yes" : "Sí"}
                  </td>
                  <td className="p-3.5">
                    {isCa
                      ? "Cada línia visual es converteix en un paràgraf editable."
                      : isEn
                        ? "Each visual line becomes an editable paragraph."
                        : "Cada línea visual se convierte en un párrafo editable."}
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">
                    {isCa ? "Imatges i logotips" : isEn ? "Images and logos" : "Imágenes y logotipos"}
                  </td>
                  <td className="p-3.5 font-medium text-red-900 bg-red-50/60">
                    {isCa ? "No" : isEn ? "No" : "No"}
                  </td>
                  <td className="p-3.5">
                    {isCa
                      ? "No s'extreuen: cal tornar a inserir-les manualment a Word."
                      : isEn
                        ? "They are not extracted; insert them again manually in Word."
                        : "No se extraen: hay que volver a insertarlas manualmente en Word."}
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">
                    {isCa ? "Tipografies, mides i colors" : isEn ? "Fonts, sizes, colors" : "Tipografías, tamaños y colores"}
                  </td>
                  <td className="p-3.5 font-medium text-red-900 bg-red-50/60">
                    {isCa ? "No" : isEn ? "No" : "No"}
                  </td>
                  <td className="p-3.5">
                    {isCa
                      ? "Tot el text surt amb un estil base uniforme de 12 punts."
                      : isEn
                        ? "All text comes out in a uniform 12-point base style."
                        : "Todo el texto sale con un estilo base uniforme de 12 puntos."}
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">
                    {isCa ? "Taules" : isEn ? "Tables" : "Tablas"}
                  </td>
                  <td className="p-3.5 font-medium text-amber-900 bg-amber-50/60">
                    {isCa ? "Parcial" : isEn ? "Partial" : "Parcial"}
                  </td>
                  <td className="p-3.5">
                    {isCa
                      ? "El contingut arriba com a text; les cel·les no es reconstrueixen."
                      : isEn
                        ? "Content arrives as text; cells are not rebuilt."
                        : "El contenido llega como texto; las celdas no se reconstruyen."}
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">
                    {isCa ? "Columnes" : isEn ? "Columns" : "Columnas"}
                  </td>
                  <td className="p-3.5 font-medium text-amber-900 bg-amber-50/60">
                    {isCa ? "Parcial" : isEn ? "Partial" : "Parcial"}
                  </td>
                  <td className="p-3.5">
                    {isCa
                      ? "Les línies s'ordenen per altura; en dissenys a dues columnes poden intercalar-se."
                      : isEn
                        ? "Lines are ordered by vertical position; two-column layouts may interleave."
                        : "Las líneas se ordenan por altura; en diseños a dos columnas pueden intercalarse."}
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">
                    {isCa ? "Salt de pàgina" : isEn ? "Page breaks" : "Salto de página"}
                  </td>
                  <td className="p-3.5 font-medium text-amber-900 bg-amber-50/60">
                    {isCa ? "Marcador" : isEn ? "Marker" : "Marcador"}
                  </td>
                  <td className="p-3.5">
                    {isCa
                      ? "S'insereix '--- Página N ---' com a paràgraf, no com a salt real."
                      : isEn
                        ? "'--- Página N ---' is inserted as a paragraph, not a real page break."
                        : "Se inserta '--- Página N ---' como párrafo, no como salto real."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: steps */}
        <section className="mt-10" aria-labelledby="how-to-convert">
          <h2 id="how-to-convert" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "Com convertir el PDF a Word en tres passos"
              : isEn
                ? "How to Convert the PDF to Word in Three Steps"
                : "Cómo convertir el PDF a Word en tres pasos"}
          </h2>

          <GuideStep
            stepNumber={1}
            title={isCa ? "Selecciona el PDF digital" : isEn ? "Select the digital PDF" : "Selecciona el PDF digital"}
          >
            {isCa
              ? "Arrossega el fitxer o tria'l des del dispositiu. L'eina treballa amb un PDF que contingui text digital. Si el document és un escaneig, primer l'hauràs de passar per OCR."
              : isEn
                ? "Drag the file in or pick it from your device. The tool needs a PDF that contains digital text. If the document is a scan, run it through OCR first."
                : "Arrastra el archivo o elígelo desde tu dispositivo. La herramienta necesita un PDF que contenga texto digital. Si el documento es un escaneo, primero tendrás que pasarlo por OCR."}
          </GuideStep>

          <GuideStep
            stepNumber={2}
            title={
              isCa ? "Converteix i observa l'avanç per pàgina" : isEn ? "Convert and watch page progress" : "Convierte y observa el avance por página"
            }
          >
            {isCa
              ? "El motor llegeix cada pàgina, agrupa les paraules en línies i les ordena. El procés és local: no hi ha cua de servidor ni espera de pujada. En documents llargs, l'avanç indica per quina pàgina va."
              : isEn
                ? "The engine reads each page, groups words into lines, and orders them. Processing is local: no server queue and no upload wait. On long documents, the progress indicator shows the current page."
                : "El motor lee cada página, agrupa las palabras en líneas y las ordena. El proceso es local: no hay cola de servidor ni espera de subida. En documentos largos, el avance indica por qué página va."}
          </GuideStep>

          <GuideStep
            stepNumber={3}
            title={isCa ? "Descarrega el .docx i revisa'l" : isEn ? "Download the .docx and review it" : "Descarga el .docx y revísalo"}
          >
            {isCa
              ? "Descarrega el fitxer i obre'l a Word, LibreOffice o Google Docs. Abans de reutilitzar-lo, revisa l'ordre de lectura, elimina els marcadors de pàgina si no els necessites i torna a col·locar imatges i taules."
              : isEn
                ? "Download the file and open it in Word, LibreOffice, or Google Docs. Before reusing it, check reading order, delete the page markers if you do not need them, and reinsert images and tables."
                : "Descarga el archivo y ábrelo en Word, LibreOffice o Google Docs. Antes de reutilizarlo, revisa el orden de lectura, elimina los marcadores de página si no los necesitas y vuelve a colocar imágenes y tablas."}
          </GuideStep>
        </section>

        {/* Section 3: CTA */}
        <GuideCTA
          to={toolPath(locale, "pdf-a-word")}
          eyebrow={
            isCa ? "Eina principal BreadPDF" : isEn ? "Primary BreadPDF tool" : "Herramienta principal BreadPDF"
          }
          title={
            isCa ? "Convertir el teu PDF a Word editable" : isEn ? "Convert your PDF to editable Word" : "Convertir tu PDF a Word editable"
          }
          description={
            isCa
              ? "Extreu el text per línies, separa les pàgines amb marcadors i genera un .docx compatible amb Word, LibreOffice i Google Docs."
              : isEn
                ? "Extract text line by line, separate pages with markers, and generate a .docx compatible with Word, LibreOffice, and Google Docs."
                : "Extrae el texto por líneas, separa las páginas con marcadores y genera un .docx compatible con Word, LibreOffice y Google Docs."
          }
          buttonText={isCa ? "Convertir a Word ara" : isEn ? "Convert to Word now" : "Convertir a Word ahora"}
          icon={<FileType2 className="size-4" />}
          variant="solid-red"
        />

        {/* Section 4: previous steps */}
        <section className="mt-10" aria-labelledby="previous-steps">
          <h2 id="previous-steps" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "Quan necessites un pas previ"
              : isEn
                ? "When You Need an Earlier Step"
                : "Cuándo necesitas un paso previo"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "El conversor no pot inventar text que el PDF no conté ni reconstruir estructures que no existeixen com a tals. Aquests tres casos requereixen una eina diferent abans o en lloc de la conversió:"
              : isEn
                ? "The converter cannot invent text the PDF does not contain or rebuild structures that do not exist as such. These three cases need a different tool before or instead of conversion:"
                : "El conversor no puede inventar texto que el PDF no contiene ni reconstruir estructuras que no existen como tales. Estos tres casos requieren una herramienta distinta antes o en lugar de la conversión:"}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3 text-[14.5px]">
            <Link
              to={toolPath(locale, "ocr-pdf")}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-[#C9302C]"
            >
              <ScanText className="size-5 text-[#C9302C]" aria-hidden="true" />
              <strong className="mt-2 block font-bold text-[#0F172A]">
                {isCa
                  ? "PDF escanejat o foto"
                  : isEn
                    ? "Scanned PDF or photo"
                    : "PDF escaneado o foto"}
              </strong>
              <span className="mt-1 block text-slate-600">
                {isCa
                  ? "Aplica OCR per generar una capa de text i converteix després el resultat."
                  : isEn
                    ? "Run OCR to create a text layer, then convert the result."
                    : "Aplica OCR para generar una capa de texto y convierte después el resultado."}
              </span>
              <span className="mt-2 inline-block font-bold text-[#C9302C] group-hover:underline">
                {isCa ? "Obrir OCR" : isEn ? "Open OCR" : "Abrir OCR"} →
              </span>
            </Link>

            <Link
              to={toolPath(locale, "pdf-a-excel")}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-[#C9302C]"
            >
              <FileType2 className="size-5 text-[#C9302C]" aria-hidden="true" />
              <strong className="mt-2 block font-bold text-[#0F172A]">
                {isCa ? "Taules i fulls de càlcul" : isEn ? "Tables and spreadsheets" : "Tablas y hojas de cálculo"}
              </strong>
              <span className="mt-1 block text-slate-600">
                {isCa
                  ? "Si l'objectiu és operar amb dades, converteix a Excel en lloc de Word."
                  : isEn
                    ? "If the goal is working with data, convert to Excel instead of Word."
                    : "Si el objetivo es operar con datos, convierte a Excel en lugar de Word."}
              </span>
              <span className="mt-2 inline-block font-bold text-[#C9302C] group-hover:underline">
                {isCa ? "Obrir PDF a Excel" : isEn ? "Open PDF to Excel" : "Abrir PDF a Excel"} →
              </span>
            </Link>

            <Link
              to={toolPath(locale, "desbloquear-pdf")}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-[#C9302C]"
            >
              <ShieldCheck className="size-5 text-[#C9302C]" aria-hidden="true" />
              <strong className="mt-2 block font-bold text-[#0F172A]">
                {isCa ? "PDF protegit amb contrasenya" : isEn ? "Password-protected PDF" : "PDF protegido con contraseña"}
              </strong>
              <span className="mt-1 block text-slate-600">
                {isCa
                  ? "Desbloqueja'l amb la contrasenya que tinguis dret a utilitzar i converteix-lo després."
                  : isEn
                    ? "Unlock it with a password you are entitled to use, then convert it."
                    : "Desbloquéalo con la contraseña que tengas derecho a usar y conviértelo después."}
              </span>
              <span className="mt-2 inline-block font-bold text-[#C9302C] group-hover:underline">
                {isCa ? "Obrir Desbloquejar PDF" : isEn ? "Open Unlock PDF" : "Abrir Desbloquear PDF"} →
              </span>
            </Link>
          </div>
        </section>

        {/* Section 5: review checklist */}
        <section className="mt-10" aria-labelledby="review-checklist">
          <h2 id="review-checklist" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "Revisió del .docx abans de tornar-lo a enviar"
              : isEn
                ? "Reviewing the .docx Before Sending It On"
                : "Revisión del .docx antes de volver a enviarlo"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "La conversió és el primer pas, no l'últim. Aquesta llista evita els errors més habituals quan es reutilitza un document convertit:"
              : isEn
                ? "Conversion is the first step, not the last. This checklist prevents the most common mistakes when reusing a converted document:"
                : "La conversión es el primer paso, no el último. Esta lista evita los errores más habituales al reutilizar un documento convertido:"}
          </p>

          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#C9302C]" aria-hidden="true" />
              <span>
                {isCa
                  ? "Comprova l'ordre de lectura en pàgines amb columnes, taules o peus de pàgina repetits."
                  : isEn
                    ? "Check reading order on pages with columns, tables, or repeated footers."
                    : "Comprueba el orden de lectura en páginas con columnas, tablas o pies de página repetidos."}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#C9302C]" aria-hidden="true" />
              <span>
                {isCa
                  ? "Cerca '--- Página' i elimina els marcadors si el document final no els necessita."
                  : isEn
                    ? "Search for '--- Página' and delete the markers if the final document does not need them."
                    : "Busca '--- Página' y elimina los marcadores si el documento final no los necesita."}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#C9302C]" aria-hidden="true" />
              <span>
                {isCa
                  ? "Reaplica títols, negretes i llistes amb estils reals de Word per mantenir una jerarquia coherent."
                  : isEn
                    ? "Reapply headings, bold text, and lists using real Word styles to keep a coherent hierarchy."
                    : "Reaplica títulos, negritas y listas con estilos reales de Word para mantener una jerarquía coherente."}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#C9302C]" aria-hidden="true" />
              <span>
                {isCa
                  ? "Torna a inserir imatges, gràfics i taules, i comprova que les referències del text continuen apuntant al lloc correcte."
                  : isEn
                    ? "Reinsert images, charts, and tables, then confirm that in-text references still point to the right place."
                    : "Vuelve a insertar imágenes, gráficos y tablas, y comprueba que las referencias del texto siguen apuntando al lugar correcto."}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#C9302C]" aria-hidden="true" />
              <span>
                {isCa
                  ? "Exporta de nou a PDF si el destinatari només accepta PDF i revisa que el text segueixi sent seleccionable."
                  : isEn
                    ? "Export back to PDF if the recipient only accepts PDF, and confirm the text is still selectable."
                    : "Exporta de nuevo a PDF si el destinatario solo acepta PDF y revisa que el texto siga siendo seleccionable."}
              </span>
            </li>
          </ul>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-amber-950">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p className="text-[14.5px] leading-relaxed">
              {isCa
                ? "No facis servir aquest flux per reconstruir factures, contractes o documents amb valor legal si necessites conservar exactament el format original. En aquests casos, el PDF original signat o el PDF/A són la referència, no el .docx convertit."
                : isEn
                  ? "Do not use this workflow to rebuild invoices, contracts, or legally relevant documents when the original formatting must be preserved exactly. In those cases the signed original PDF or PDF/A is the reference, not the converted .docx."
                  : "No uses este flujo para reconstruir facturas, contratos o documentos con valor legal si necesitas conservar exactamente el formato original. En esos casos, el PDF original firmado o el PDF/A son la referencia, no el .docx convertido."}
            </p>
          </div>
        </section>

        {/* Section 6: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre convertir PDF a Word"
              : isEn
                ? "Frequently Asked Questions About PDF to Word Conversion"
                : "Preguntas frecuentes sobre convertir PDF a Word"
          }
          faqs={faqs}
        />

        {/* Sources */}
        <GuideFooterSources
          title={
            isCa
              ? "Referències tècniques consultades"
              : isEn
                ? "Technical References Consulted"
                : "Referencias técnicas consultadas"
          }
          sources={[
            {
              organization: "ISO 32000-1:2008",
              title: isCa
                ? "Document management — Portable Document Format (PDF 1.7): estructura de la capa de text i operadors de contingut."
                : isEn
                  ? "Document management — Portable Document Format (PDF 1.7): text layer structure and content operators."
                  : "Document management — Portable Document Format (PDF 1.7): estructura de la capa de texto y operadores de contenido.",
            },
            {
              organization: "ECMA-376 / ISO 29500",
              title: isCa
                ? "Office Open XML: especificació del format .docx i dels seus paràgrafs i estils."
                : isEn
                  ? "Office Open XML: specification of the .docx format, its paragraphs, and styles."
                  : "Office Open XML: especificación del formato .docx y de sus párrafos y estilos.",
            },
            {
              organization: "Mozilla PDF.js",
              title: isCa
                ? "Documentació de getTextContent(): extracció d'elements de text i coordenades de cada fragment."
                : isEn
                  ? "getTextContent() documentation: extraction of text items and per-fragment coordinates."
                  : "Documentación de getTextContent(): extracción de elementos de texto y coordenadas de cada fragmento.",
            },
          ]}
        />
      </div>
    </article>
  );
}
