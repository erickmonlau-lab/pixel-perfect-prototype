import { Link } from "@tanstack/react-router";
import {
  FileText,
  Merge,
  Hash,
  GraduationCap,
  CheckCircle2,
  FileDown,
  Printer,
  FileSpreadsheet,
} from "lucide-react";
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

export function ThesisMergeGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="mx-auto max-w-[800px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Header Editorial con GuideHero */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<GraduationCap className="size-4" />}
        badgeLabel={
          isCa
            ? "TFG / TFM & Treballs Acadèmics"
            : isEn
            ? "Bachelor & Master Theses"
            : "TFG / TFM & Trabajos Académicos"
        }
        subtitle={
          isCa
            ? "Un Treball de Final de Grau (TFG) o Màster (TFM) acostuma a desenvolupar-se en múltiples arxius independents: la portada oficial del centre, la memòria d'investigació, les enquestes, els certificats i els annexos tècnics. Quan la facultat exigeix el dipòsit d'un únic document PDF, cal acoblar les parts de forma ordenada i verificar-ne la foliació abans del lliurament telemàtic."
            : isEn
            ? "A Bachelor's or Master's thesis is typically drafted across several independent files: institutional title page, research body, surveyed data, certificates, and technical appendices. When faculty guidelines mandate submission of a single unified PDF, assembling the parts in proper sequence and auditing page numbering is essential before final deposit."
            : "Un Trabajo de Fin de Grado (TFG) o Máster (TFM) acostumbra a desarrollarse en múltiples archivos independientes: la portada oficial del centro, la memoria de investigación, las encuestas, los certificados y los anexos técnicos. Cuando la facultad exige el depósito de un único documento PDF, es necesario ensamblar las partes de forma ordenada y verificar su foliación antes de la entrega telemática."
        }
        notice={{
          variant: "coral",
          title: isCa
            ? "Regla fonamental: consulta sempre la normativa de la teva facultat"
            : isEn
            ? "Fundamental Principle: Always check your university or department guidelines"
            : "Regla fundamental: consulta siempre la normativa de tu facultad",
          description: isCa
            ? "No hi ha requisits universals aplicables a totes les universitats. L'ordre dels annexos, el model de portada institucional, els límits de megabytes i la nomenclatura del fitxer depenen de cada centre i convocatòria. Utilitza aquest flux com a guia metodològica contrastada adaptant-la a les teves instruccions oficials."
            : isEn
            ? "No single universal standard applies to all universities. Appendix placement, institutional cover templates, file size thresholds, and file naming conventions vary by department. Use this proven workflow as an engineering reference adapted to your formal guidelines."
            : "No existen requisitos universales aplicables a todas las universidades. El orden de los anexos, el modelo de portada institucional, los límites de megabytes y la nomenclatura del archivo dependen de cada centro y convocatoria. Utiliza este flujo como guía metodológica contrastada adaptándola a tus instrucciones oficiales.",
        }}
      />

      {/* Infografía Editorial Simplificada y Directa (Composición horizontal abierta, sin caja exterior) */}
      <GuideInfographic
        src="/unificar-tfg-tfm-pdf.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "Unificar TFG TFM PDF"}
        borderless={true}
      />

      {/* Mascota Celebrando (Éxito académico / Bloque sólido coral suave BreadPDF) */}
      <GuideMascotCallout
        variant="celebrate"
        background="coral"
        badge={isCa ? "Entrega acadèmica amb èxit" : isEn ? "Successful Thesis Submission" : "Entrega académica con éxito"}
        title={
          isCa
            ? "Tot el teu treball de mesos en un únic document impecable"
            : isEn
            ? "Your complete thesis manuscript consolidated into one pristine PDF"
            : "Todo tu trabajo de meses en un único documento impecable"
        }
        description={
          isCa
            ? "Des de la portada oficial fins a l'últim annex de gràfics: unifica el document preservant les fonts vectorials, la paginació uniforme i complint el límit de pes del teu campus."
            : isEn
            ? "From the official institutional cover to your technical data appendices: compile your research preserving crisp vector typography, continuous numbering, and virtual campus size quotas."
            : "Desde la portada oficial hasta el último anexo de gráficas: unifica el documento preservando fuentes vectoriales nítidas, paginación correlativa y cumpliendo el límite de peso de tu campus."
        }
      />

      {/* Main Content Body */}
      <div className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Pre-merge Checklist */}
        <section aria-labelledby="pre-merge-audit">
          <h2 id="pre-merge-audit" className="text-3xl sm:text-[36px] font-black text-[#0F172A] tracking-tight leading-tight">
            {isCa ? "Abans d'unir res: llista de comprovació prèvia" : isEn ? "Before Merging: Pre-Assembly Submission Checklist" : "Antes de unir nada: lista de comprobación previa"}
          </h2>
          <p className="mt-3 text-[17px] sm:text-[18px] text-slate-700 leading-relaxed">
            {isCa
              ? "Abans d'acoblar els documents, revisa la guia docent de l'assignatura per respondre amb certesa a aquests set paràmetres:"
              : isEn
              ? "Before combining documents, review your thesis handbook to clarify these seven critical parameters:"
              : "Antes de acoplar los documentos, revisa la guía docente de la asignatura para responder con certeza a estos siete parámetros:"}
          </p>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 text-slate-700 list-none pl-0">
            <li className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px] mb-1">
                  {isCa ? "Modelo de portada" : isEn ? "Official cover page" : "Modelo de portada"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0">
                  {isCa ? "¿La universitat proporciona una plantilla formal obligatòria per a la portada?" : isEn ? "Does the faculty provide a mandatory institutional title page template?" : "¿La universidad proporciona una plantilla formal obligatoria para la portada?"}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px] mb-1">
                  {isCa ? "Nombre de fitxers" : isEn ? "Allowed file count" : "Número de archivos"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0">
                  {isCa ? "¿Exigeixen lliurar 1 sol PDF o autoritzen annexos en carpetes ZIP a part?" : isEn ? "Is it strictly 1 single PDF or are datasets allowed as separate ZIP archives?" : "¿Exigen entregar 1 solo PDF o autorizan anexos en carpetas ZIP aparte?"}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px] mb-1">
                  {isCa ? "Límit de megabytes" : isEn ? "Size quota" : "Límite de megabytes"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0">
                  {isCa ? "¿Quin és el pes màxim admès al campus virtual o seu (ex. 15, 25 o 50&nbsp;MB)?" : isEn ? "What is the upload ceiling on the thesis deposit portal (e.g. 15, 25, or 50&nbsp;MB)?" : "¿Cuál es el peso máximo admitido en el campus virtual o sede (ej. 15, 25 o 50&nbsp;MB)?"}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px] mb-1">
                  {isCa ? "Nomenclatura oficial" : isEn ? "File naming syntax" : "Nomenclatura oficial"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0">
                  {isCa ? "¿Cal incloure DNI, cognoms o codi de grau en el títol del fitxer?" : isEn ? "Are student ID, surname, or academic degree codes required in the filename?" : "¿Se debe incluir DNI, apellidos o código de titulación en el nombre del archivo?"}
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Section 2: Step-by-Step Assembly */}
        <section className="mt-12" aria-labelledby="step-assembly">
          <h2 id="step-assembly" className="text-3xl sm:text-[36px] font-black text-[#0F172A] tracking-tight leading-tight">
            {isCa ? "Seqüència d'assemblatge pas a pas" : isEn ? "Step-by-Step Thesis Assembly Sequence" : "Secuencia de ensamblaje paso a paso"}
          </h2>

          <div className="mt-6 space-y-5">
            {/* Step 1 */}
            <GuideStep
              stepNumber={1}
              title={isCa ? "Converteix la memòria de Word a PDF" : isEn ? "Convert the Main Body from Word to PDF" : "Convierte la memoria de Word a PDF"}
              action={
                <Link
                  to={toolPath(locale, "word-a-pdf")}
                  className="inline-flex items-center gap-1.5 text-[15px] font-black text-[#EC3C2D] hover:underline"
                >
                  <FileText className="size-4.5" />
                  {isCa ? "Convertir Word a PDF a BreadPDF →" : isEn ? "Convert Word to PDF on BreadPDF →" : "Convertir Word a PDF en BreadPDF →"}
                </Link>
              }
            >
              {isCa
                ? "La memòria redactada en Microsoft Word (.docx) o LibreOffice s'ha de compilar prèviament a PDF. Assegura't d'actualitzar l'índex de continguts automàtic a Word abans de generar el PDF per evitar que les pàgines de l'índex quedin desfasades."
                : isEn
                ? "Your research manuscript written in Microsoft Word (.docx) or LibreOffice must be compiled to PDF. Make sure to update the automated table of contents in Word first to guarantee that heading page references remain accurate."
                : "La memoria redactada en Microsoft Word (.docx) o LibreOffice debe compilarse previamente a PDF. Asegúrate de actualizar el índice de contenidos automático en Word antes de generar el PDF para evitar que las páginas del índice queden desfasadas."}
            </GuideStep>

            {/* Step 2 */}
            <GuideStep
              stepNumber={2}
              title={isCa ? "Unifica certificats, imatges i escanejos a PDF" : isEn ? "Standardize Scans and Image Appendices to PDF" : "Unifica certificados, imágenes y escaneos a PDF"}
              action={
                <Link
                  to={toolPath(locale, "jpg-a-pdf")}
                  className="inline-flex items-center gap-1.5 text-[15px] font-black text-[#EC3C2D] hover:underline"
                >
                  <FileSpreadsheet className="size-4.5" />
                  {isCa ? "Convertir JPG a PDF a BreadPDF →" : isEn ? "Convert JPG to PDF on BreadPDF →" : "Convertir JPG a PDF en BreadPDF →"}
                </Link>
              }
            >
              {isCa
                ? "És habitual incorporar certificats signats de pràctiques, consentiments informats o enquestes digitalitzades en format JPG o PNG. Passa aquests fitxers a fulls PDF estàndard perquè s'adaptin a la mateixa mida de pàgina que la resta del treball."
                : isEn
                ? "Theses frequently include signed internship evaluations, ethics approvals, survey sheets, or charts captured in JPG or PNG format. Convert these raster assets into standard PDF pages to ensure uniform page scaling."
                : "Es habitual incorporar certificados firmados de prácticas, consentimientos informados o encuestas digitalizadas en formato JPG o PNG. Pasa estos archivos a hojas PDF estándar para que se adapten al mismo tamaño de página que el resto del trabajo."}
            </GuideStep>

            {/* Step 3: Central Solid Red CTA */}
            <GuideCTA
              to={toolPath(locale, "unir-pdf")}
              eyebrow={isCa ? "Eina Principal" : isEn ? "Primary Tool" : "Herramienta Principal"}
              title={isCa ? "Unir arxius PDF en un sol document" : isEn ? "Merge PDF Files into One Document" : "Unir archivos PDF en un solo documento"}
              description={
                isCa
                  ? "Arrossega la portada, la memòria i els annexos per ordenar-los visualment. El processament és 100% al navegador de forma privada."
                  : isEn
                  ? "Drag your cover, main text, and technical appendices into place. Processing runs 100% client-side with complete privacy."
                  : "Arrastra la portada, la memoria y los anexos para ordenarlos visualmente. El procesamiento es 100% en el navegador de forma privada."
              }
              buttonText={isCa ? "Unir arxius PDF ara" : isEn ? "Merge PDF files now" : "Unir archivos PDF ahora"}
              icon={<Merge className="size-5" />}
              variant="solid-red"
            />

            {/* Order Example Callout */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-[15px] sm:text-[15.5px] text-slate-700 shadow-sm">
              <strong className="block text-[#0F172A] font-black text-[16px] sm:text-[17px] mb-2">
                {isCa ? "Exemple d'estructura estàndard (consulta sempre el teu centre):" : isEn ? "Typical structure reference (verify your faculty guide):" : "Ejemplo de estructura estándar (consulta siempre tu centro):"}
              </strong>
              <span className="text-slate-700 leading-relaxed block font-medium">
                {isCa
                  ? "1. Portada oficial → 2. Resum / Abstract → 3. Índex de continguts → 4. Memòria principal → 5. Bibliografia → 6. Annexos"
                  : isEn
                  ? "1. Institutional cover → 2. Abstract → 3. Table of contents → 4. Main manuscript → 5. References → 6. Appendices"
                  : "1. Portada oficial → 2. Resumen / Abstract → 3. Índice de contenidos → 4. Memoria principal → 5. Bibliografía → 6. Anexos"}
              </span>
            </div>

            {/* Step 4 */}
            <GuideStep
              stepNumber={3}
              title={isCa ? "Revisa o afegeix la numeració de pàgines" : isEn ? "Verify or Stamp Continuous Page Numbers" : "Revisa o añade la numeración de páginas"}
              action={
                <Link
                  to={toolPath(locale, "numerar-paginas")}
                  className="inline-flex items-center gap-1.5 text-[15px] font-black text-[#EC3C2D] hover:underline"
                >
                  <Hash className="size-4.5" />
                  {isCa ? "Numerar pàgines de PDF a BreadPDF →" : isEn ? "Number PDF Pages on BreadPDF →" : "Numerar páginas de PDF en BreadPDF →"}
                </Link>
              }
            >
              {isCa
                ? "Quan s'uneixen annexos escanejats o documents de tercers al final d'un treball, aquestes pàgines sovint perden la continuïtat del peu de pàgina. Si la teva facultat demana foliació contínua al llarg de tot l'arxiu, pots aplicar una numeració correlativa."
                : isEn
                ? "When third-party appendix sheets or scanned documents are appended to a manuscript, they often lack matching footer numbers. If your department requires continuous pagination across the entire document, stamp sequential numbers on the final PDF."
                : "Cuando se unen anexos escaneados o documentos de terceros al final de un trabajo, esas páginas a menudo pierden la continuidad del pie de página. Si tu facultad solicita foliación continua a lo largo de todo el archivo, puedes estampar una numeración correlativa."}
            </GuideStep>
          </div>
        </section>

        {/* Section 3: Final Inspection Checklist */}
        <section className="mt-12" aria-labelledby="final-inspection">
          <h2 id="final-inspection" className="text-3xl sm:text-[36px] font-black text-[#0F172A] tracking-tight leading-tight">
            {isCa ? "Llista de revisió visual abans del dipòsit final" : isEn ? "Final Pre-Deposit Visual Audit Checklist" : "Lista de revisión visual antes del depósito final"}
          </h2>
          <p className="mt-3 text-[17px] sm:text-[18px] text-slate-700 leading-relaxed">
            {isCa
              ? "Obre el document resultant a pantalla completa en un visor de PDF i verifica cadascun d'aquests punts:"
              : isEn
              ? "Open the generated master file full-screen in an independent PDF viewer to verify every item:"
              : "Abre el documento resultante a pantalla completa en un visor de PDF y verifica cada uno de estos puntos:"}
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm text-slate-700 space-y-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px]">
                  {isCa ? "Portada institucional" : isEn ? "Title page" : "Portada institucional"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0 mt-0.5">
                  {isCa ? "Conté les dades de curs, grau/màster, tutor i autor sense errors tipogràfics." : isEn ? "Accurately lists author, supervisor, degree title, and current academic term." : "Contiene los datos de curso, grado/máster, tutor y autor sin errores tipográficos."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px]">
                  {isCa ? "Índex i foliación correlativa" : isEn ? "Table of contents" : "Índice y foliación correlativa"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0 mt-0.5">
                  {isCa ? "El número de pàgina assignat a cada capítol a l'índex coincideix exactament amb el PDF." : isEn ? "Numbered chapter entries in the TOC match the exact layout pages." : "El número de página asignado a cada capítulo en el índice coincide exactamente con el PDF."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px]">
                  {isCa ? "Annexos complets i ordenats" : isEn ? "All appendices present" : "Anexos completos y ordenados"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0 mt-0.5">
                  {isCa ? "Tots els annexos citats al text apareixen en l'ordre correlatiu adequat." : isEn ? "Every appendix referenced in the text appears in sequential order." : "Todos los anexos citados en el texto aparecen en el orden correlativo adecuado."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 border-t border-slate-100 pt-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-black text-[13px] mt-0.5 shadow-xs">✓</span>
              <div className="flex-1">
                <strong className="block text-[#0F172A] font-bold text-[16px]">
                  {isCa ? "Pes del fitxer verificat" : isEn ? "Total file size" : "Peso del archivo verificado"}
                </strong>
                <p className="text-[14.5px] leading-relaxed text-slate-600 m-0 mt-0.5">
                  {isCa ? "El fitxer es troba per sota del llindar en megabytes estipulat per la plataforma de dipòsit." : isEn ? "Total megabytes stay comfortably below the portal submission ceiling." : "El archivo se encuentra por debajo del umbral en megabytes estipulado por la plataforma de depósito."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Troubleshooting */}
        <section className="mt-12" aria-labelledby="troubleshooting">
          <h2 id="troubleshooting" className="text-3xl sm:text-[36px] font-black text-[#0F172A] tracking-tight leading-tight">
            {isCa ? "¿Què fer si el PDF pesa massa o cal imprimir-lo?" : isEn ? "Troubleshooting: Oversized Files and Print Preparation" : "¿Qué hacer si el PDF pesa demasiado o hay que imprimirlo?"}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 text-[15px] sm:text-[15.5px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#0F172A] font-black text-[17px] sm:text-[18px]">
                <FileDown className="size-5.5 text-[#EC3C2D]" />
                {isCa ? "El PDF supera la quota del campus" : isEn ? "File exceeds campus MB limit" : "El PDF supera la cuota del campus"}
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600 font-normal">
                {isCa
                  ? "Els gràfics o fotos d'annexos poden disparar el pes per sobre dels 25 o 50 MB permesos. Utilitza "
                  : isEn
                  ? "Embedded survey scans or high-res photos often cause the compiled PDF to exceed upload ceilings. Use "
                  : "Las gráficas o fotos de anexos pueden disparar el peso por encima de los 25 o 50 MB permitidos. Utiliza "}
                <Link to={toolPath(locale, "comprimir-pdf")} className="font-bold text-[#EC3C2D] underline">
                  {isCa ? "Comprimir PDF" : isEn ? "Compress PDF" : "Comprimir PDF"}
                </Link>{" "}
                {isCa
                  ? "en mode Equilibrat per reduir l'arxiu preservant la lectura de les taules."
                  : isEn
                  ? "in Balanced mode to reduce file size while maintaining chart readability."
                  : "en modo Equilibrado para reducir el archivo preservando la lectura de las tablas."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#0F172A] font-black text-[17px] sm:text-[18px]">
                <Printer className="size-5.5 text-[#0F172A]" />
                {isCa ? "Preparació per enquadernar en paper" : isEn ? "Print and binding preparation" : "Preparación para encuadernar en papel"}
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600 font-normal">
                {isCa
                  ? "Si el teu tribunal requereix l'entrega d'exemplars físics, cal distingir la versió digital del document d'impremta (pàgines en blanc estratègiques per a inici de capítols i marges d'enquadernació). Consulta "
                  : isEn
                  ? "If your committee demands bound hard copies, differentiate between digital turn-in and print masters (gutter margins and recto chapter starts). See "
                  : "Si tu tribunal requiere la entrega de ejemplares físicos, conviene distinguir la versión digital del documento de imprenta (páginas en blanco estratégicas para inicio de capítulos y márgenes de encuadernación). Consulta "}
                <Link to={toolPath(locale, "optimizar-pdf-para-impresion")} className="font-bold text-[#0F172A] underline">
                  {isCa ? "Optimitzar PDF per a impressió" : isEn ? "Optimize PDF for Print" : "Optimizar PDF para impresión"}
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Common Pitfalls */}
        <section className="mt-12" aria-labelledby="pitfalls">
          <h2 id="pitfalls" className="text-3xl sm:text-[36px] font-black text-[#0F172A] tracking-tight leading-tight">
            {isCa ? "Errors freqüents que cal evitar en un TFG o TFM" : isEn ? "Common Mistakes to Avoid in Academic Submissions" : "Errores frecuentes que conviene evitar en un TFG o TFM"}
          </h2>
          <div className="mt-5 space-y-4 text-[15px] sm:text-[15.5px]">
            <div className="rounded-2xl border border-[#FDCAC7] bg-[#FEECEB] p-6 shadow-sm">
              <strong className="text-[#0F172A] block font-black text-[17px] sm:text-[18px]">{isCa ? "1. Unir documents des d'esborranys vells:" : isEn ? "1. Compiling from outdated drafts:" : "1. Unir documentos desde borradores viejos:"}</strong>
              <span className="text-slate-800 text-[15.5px] sm:text-[16px] mt-1.5 block leading-relaxed font-medium">{isCa ? "Assegura't que el Word convertit conté les darreres correccions del teu tutor." : isEn ? "Double-check that the compiled body contains all supervisor corrections." : "Asegúrate de que el Word convertido contiene las últimas correcciones de tu tutor."}</span>
            </div>
            <div className="rounded-2xl border border-[#FDCAC7] bg-[#FEECEB] p-6 shadow-sm">
              <strong className="text-[#0F172A] block font-black text-[17px] sm:text-[18px]">{isCa ? "2. Numerar abans de fixar l'ordre definitiu:" : isEn ? "2. Numbering pages before finalizing sequence:" : "2. Numerar antes de fijar el orden definitivo:"}</strong>
              <span className="text-slate-800 text-[15.5px] sm:text-[16px] mt-1.5 block leading-relaxed font-medium">{isCa ? "Aplica la numeració sempre com a darrer pas, un cop tot el contingut està unit." : isEn ? "Always apply pagination as the final step after all annexes are placed." : "Aplica la numeración siempre como último paso, una vez todo el contenido está unido."}</span>
            </div>
            <div className="rounded-2xl border border-[#FDCAC7] bg-[#FEECEB] p-6 shadow-sm">
              <strong className="text-[#0F172A] block font-black text-[17px] sm:text-[18px]">{isCa ? "3. Oblidar comprovar el nom de l'arxiu:" : isEn ? "3. Neglecting filename syntax:" : "3. Olvidar comprobar el nombre del archivo:"}</strong>
              <span className="text-slate-800 text-[15.5px] sm:text-[16px] mt-1.5 block leading-relaxed font-medium">{isCa ? "Si el dipòsit demana Cognom_Nom_TFG.pdf, no pugis arxius anomenats 'versio_final_definitiva_2.pdf'." : isEn ? "If your portal specifies Surname_Name_Thesis.pdf, avoid names like 'final_draft_v2.pdf'." : "Si el depósito pide Apellido_Nombre_TFG.pdf, no subas archivos llamados 'version_final_definitiva_2.pdf'."}</span>
            </div>
          </div>
        </section>

        {/* Section 6: FAQ Accordion */}
        <GuideFAQ
          title={isCa ? "Preguntes freqüents sobre unificació de TFG i TFM" : isEn ? "Frequently Asked Questions about Thesis Assembly" : "Preguntas frecuentes sobre unificación de TFG y TFM"}
          faqs={faqs}
        />

        {/* Institutional Sources and Compliance Reference */}
        <GuideFooterSources
          title={isCa ? "Comprova sempre la normativa oficial de la teva universitat" : isEn ? "Always Verify with Your University Thesis Repository" : "Comprueba siempre la normativa oficial de tu universidad"}
        >
          <p>
            {isCa
              ? "Aquesta guia està dissenyada sobre els procediments recomanats per repositoris acadèmics institucionals i biblioteques universitàries (com les normatives de dipòsit de la Universitat de Barcelona, Universitat Autònoma de Barcelona, Universidad Complutense de Madrid o Universitat Politècnica de València). Atès que cada facultat pot establir plantilles pròpies o requisits singulars de confidencialitat, preval sempre el reglament aprovat per la teva comissió de grau o màster."
              : isEn
              ? "This guide is structured around the digital deposit guidelines of public university repositories and academic libraries (such as repository handbooks from the University of Barcelona, Complutense University of Madrid, and European academic consortia). Because specific schools enforce proprietary title page templates or disclosure agreements, your department's formal rubric always takes precedence."
              : "Esta guía está diseñada sobre los procedimientos recomendados por repositorios académicos institucionales y bibliotecas universitarias (como las normativas de depósito de la Universidad Complutense de Madrid, Universidad de Barcelona, Universitat Autònoma de Barcelona o Universitat Politècnica de València). Dado que cada facultad puede establecer plantillas propias o requisitos singulares de confidencialidad, prevalece siempre el reglamento aprobado por tu comisión de grado o máster."}
          </p>
        </GuideFooterSources>
      </div>
    </article>
  );
}
