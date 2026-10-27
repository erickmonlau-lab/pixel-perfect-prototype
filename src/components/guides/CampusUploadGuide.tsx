import { Link } from "@tanstack/react-router";
import {
  FileDown,
  Scissors,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
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

export function CampusUploadGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="mx-auto max-w-[860px] px-4 py-10 sm:px-8 sm:py-16">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<GraduationCap className="size-4 text-emerald-700" />}
        badgeLabel={
          isCa
            ? "Educació & Campus Virtuals"
            : isEn
            ? "Education & Virtual Campuses"
            : "Educación & Campus Virtuales"
        }
        subtitle={
          isCa
            ? "Si el teu campus virtual rebutja un document PDF perquè supera el límit màxim permès per a la tasca, tens dues solucions contrastades: optimitzar el pes del fitxer o dividir-lo en fragments ordenats si la plataforma autoritza múltiples adjunts."
            : isEn
            ? "If your virtual campus rejects an assignment PDF because it exceeds the maximum upload threshold, you have two proven solutions: optimize the document's file size or split it into numbered parts if the assignment settings accept multiple files."
            : "Si tu campus virtual rechaza un documento PDF porque supera el límite máximo permitido para la tarea, tienes dos soluciones contrastadas: optimizar el peso del archivo o dividirlo en partes ordenadas si la plataforma autoriza múltiples adjuntos."
        }
        notice={{
          variant: "brand",
          title:
            isCa
              ? "Diagnòstic ràpid abans de començar"
              : isEn
              ? "Quick diagnostic before starting"
              : "Diagnóstico rápido antes de empezar",
          description:
            isCa
              ? "1. Entrega d'un sol fitxer: aplica compressió equilibrada per no trencar la unitat formal de la memòria. 2. S'admeten diversos adjunts: divideix el PDF per mida d'objectiu en MB."
              : isEn
              ? "1. Single-file submission: apply balanced compression to preserve unified document structure. 2. Multi-file submission allowed: split the PDF using an exact target MB limit."
              : "1. Entrega de un solo archivo: aplica compresión equilibrada para no romper la unidad formal del trabajo. 2. Se admiten varios adjuntos: divide el PDF por tamaño de objetivo en MB.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/reducir-pdf-limite-subida-campus-virtual.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "Reducir PDF para campus virtual"}
        caption={
          isCa
            ? "Diagrama metodològic: diagnòstic d'excés de mida i resolució abans del lliurament al campus."
            : isEn
            ? "Methodological diagram: file size diagnosis and resolution before virtual campus submission."
            : "Diagrama metodológico: diagnóstico de exceso de tamaño y resolución antes de la entrega en campus."
        }
      />

      {/* Mascota Corriendo (Velocidad / Urgencia de entrega en campus) */}
      <GuideMascotCallout
        variant="run"
        background="red"
        badge={isCa ? "Lliurament contrarellotge" : isEn ? "Deadline Sprint" : "Entrega a contrarreloj"}
        title={
          isCa
            ? "No deixis que un límit de 10 MB bloquegi la teva entrega"
            : isEn
            ? "Never let a 10 MB upload ceiling halt your submission deadline"
            : "No dejes que un límite de 10 MB bloquee tu entrega a tiempo"
        }
        description={
          isCa
            ? "Comprimeix el teu document al vol en segons directament al teu navegador, sense cues de servidors i mantenint les teves gràfiques completament nítides."
            : isEn
            ? "Compress your assignment client-side in seconds with zero upload latency, no queue delays, and perfectly readable typography."
            : "Comprime tu documento al vuelo en segundos directamente en tu navegador, sin colas de servidores externos y manteniendo tus gráficas y textos nítidos."
        }
      />

      {/* Main Content Body */}
      <div className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Why does this happen */}
        <section aria-labelledby="why-upload-fails">
          <h2 id="why-upload-fails" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "¿Per què el campus virtual rebutja el meu document?" : isEn ? "Why does the virtual campus reject my file?" : "¿Por qué el campus virtual rechaza mi documento?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Quan un campus virtual (com Moodle, Sakai o plataformes pròpies universitàries) mostra l'avís de fitxer massa gran, no es tracta d'una fallada de connexió: el document ha superat la quota de memòria permesa per a aquesta activitat concreta."
              : isEn
              ? "When a virtual campus (such as Moodle, Sakai, or proprietary university portals) displays an upload error, it is not a connection failure: the document simply exceeds the memory ceiling configured for that specific assignment."
              : "Cuando un campus virtual (como Moodle, Sakai o plataformas propias universitarias) muestra un aviso de archivo demasiado grande, no se trata de un fallo de conexión: el documento ha superado la cuota de memoria permitida para esa actividad concreta."}
          </p>

          <div className="mt-4 space-y-2.5 text-[15.5px]">
            <p className="font-semibold text-slate-800">
              {isCa ? "Les causes tècniques més habituals són:" : isEn ? "The most common technical causes include:" : "Las causas técnicas más habituales son:"}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>{isCa ? "Imatges incrustades sense optimitzar:" : isEn ? "Unoptimized embedded photos:" : "Imágenes incrustadas sin optimizar:"}</strong>{" "}
                {isCa
                  ? "Fotografies preses amb mòbils moderns incrustades en un document Word poden pesar entre 5 i 12 MB cadascuna si no s'han reescalat."
                  : isEn
                  ? "Smartphone photos directly inserted into Word documents often weigh 5–12 MB each before compilation."
                  : "Fotografías tomadas con móviles modernos incrustadas en un documento Word pueden pesar entre 5 y 12 MB cada una si no se han reescalado."}
              </li>
              <li>
                <strong>{isCa ? "Escanejos a resolució excessiva:" : isEn ? "High-DPI scanner output:" : "Escaneos a resolución excesiva:"}</strong>{" "}
                {isCa
                  ? "Un escàner configurat a 600 DPI en color genera pàgines que pesen fins a vint vegades més que un escaneig òptim a 150-200 DPI per a lectura digital."
                  : isEn
                  ? "Scanners operating at 600 DPI full color create pages up to twenty times heavier than a standard 150–200 DPI screen document."
                  : "Un escáner configurado a 600 DPI en color genera páginas que pesan hasta veinte veces más que un escaneo óptimo a 150-200 DPI para lectura digital."}
              </li>
              <li>
                <strong>{isCa ? "Configuració restrictiva de la tasca:" : isEn ? "Course upload restrictions:" : "Configuración restrictiva de la tarea:"}</strong>{" "}
                {isCa
                  ? "L'administrador del campus o el professor ha limitat l'espai per evitar saturar la capacitat del servidor educatiu."
                  : isEn
                  ? "Instructors or campus sysadmins deliberately set low thresholds to prevent server storage bloat."
                  : "El administrador del campus o el profesor ha limitado el espacio para evitar saturar la capacidad del servidor educativo."}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: How to check actual limit */}
        <section className="mt-10" aria-labelledby="check-limit">
          <h2 id="check-limit" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Primer pas: Comprova quin és el límit real que t'aplica" : isEn ? "Step 1: Check your assignment's actual limit" : "Primer paso: Comprueba cuál es el límite real que te aplica"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "És fonamental distingir entre el límit del teu campus i el pes real del teu arxiu. No existeix un valor universal a Moodle; cada assignatura pot tenir una quota diferent."
              : isEn
              ? "It is essential to distinguish between your campus threshold and your file's current size. Moodle does not enforce one universal limit across all universities; each course assignment can vary."
              : "Es fundamental distinguir entre el límite de tu campus y el peso real de tu archivo. No existe un valor universal en Moodle; cada asignatura puede tener una cuota diferente."}
          </p>

          <ol className="mt-4 list-decimal pl-5 space-y-2 text-[15.5px] text-slate-600">
            <li>
              <strong>{isCa ? "Obre la tasca d'entrega:" : isEn ? "Open the assignment submission portal:" : "Abre la tarea de entrega:"}</strong>{" "}
              {isCa ? "Entra a la pàgina de lliurament del teu campus virtual." : isEn ? "Navigate to your specific course submission page." : "Entra a la página de entrega de tu campus virtual."}
            </li>
            <li>
              <strong>{isCa ? "Localitza el text del formulari:" : isEn ? "Look at the upload box label:" : "Localiza el texto del formulario:"}</strong>{" "}
              {isCa
                ? "Just damunt del requadre per arrossegar el fitxer, Moodle indica de manera explícita: 'Mida màxima per a fitxers nous: X MB' i 'Nombre màxim d'arxius: Y'."
                : isEn
                ? "Directly adjacent to the dropzone, Moodle explicitly notes: 'Maximum file size for new files: X MB' and 'Maximum attachments: Y'."
                : "Justo encima del recuadro para arrastrar el archivo, Moodle indica de forma explícita: 'Tamaño máximo para archivos nuevos: X MB' y 'Número máximo de archivos: Y'."}
            </li>
            <li>
              <strong>{isCa ? "Verifica el pes del teu PDF:" : isEn ? "Verify your PDF's local size:" : "Verifica el peso de tu PDF:"}</strong>{" "}
              {isCa
                ? "Al teu ordinador, fes clic dret sobre el document i prem 'Propietats' (Windows) o 'Obtenir informació' (Mac) per saber exactament quants megabytes has de rebaixar."
                : isEn
                ? "On your computer, right-click the file and choose 'Properties' (Windows) or 'Get Info' (macOS) to see the exact gap in megabytes."
                : "En tu ordenador, haz clic derecho sobre el documento y pulsa 'Propiedades' (Windows) o 'Obtener información' (Mac) para saber exactamente cuántos megabytes necesitas rebajar."}
            </li>
          </ol>
        </section>

        {/* Section 3: Option 1 - Compress PDF */}
        <section className="mt-10" aria-labelledby="option-compress">
          <h2 id="option-compress" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Opció 1: Comprimir el PDF (Opció recomanada)" : isEn ? "Option 1: Compress the PDF (Recommended)" : "Opción 1: Comprimir el PDF (Opción recomendada)"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Comprimir és la millor solució quan el treball s'ha d'entregar en un únic fitxer o quan el professor avalua el format continu del document (índex, bibliografia i numeració)."
              : isEn
              ? "Compressing is the ideal solution when assignments must be turned in as a single unified file or when graders evaluate formatting continuity."
              : "Comprimir es la mejor solución cuando el trabajo debe entregarse en un único archivo o cuando el docente evalúa el formato continuo del documento (índice, bibliografía y numeración)."}
          </p>

          <GuideCTA
            to={toolPath(locale, "comprimir-pdf")}
            eyebrow={isCa ? "Opció Recomanada" : isEn ? "Recommended Option" : "Opción Recomendada"}
            title={isCa ? "Comprimir PDF a BreadPDF" : isEn ? "Compress PDF on BreadPDF" : "Comprimir PDF en BreadPDF"}
            description={
              isCa
                ? "Rebaixa el pes del teu document al navegador amb l'ajust predefinit 'Objectiu ≤ 5 MB (Moodle)'. Els teus apunts i treballs mai no surten del teu dispositiu."
                : isEn
                ? "Reduce document weight locally in your browser using the 'Target ≤ 5 MB (Moodle)' preset. Your academic files never leave your computer."
                : "Rebaja el peso de tu documento en tu navegador con el ajuste predefinido 'Objetivo ≤ 5 MB (Moodle)'. Tus apuntes y trabajos nunca salen de tu ordenador."
            }
            buttonText={isCa ? "Comprimir amb ajust Moodle" : isEn ? "Compress with Moodle preset" : "Comprimir con ajuste Moodle"}
            icon={<FileDown className="size-4" />}
            variant="solid-red"
          />
        </section>

        {/* Section 4: Option 2 - Split PDF by Size */}
        <section className="mt-10" aria-labelledby="option-split">
          <h2 id="option-split" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa ? "Opció 2: Dividir el PDF en diverses parts per mida en MB" : isEn ? "Option 2: Split the PDF into Parts by MB Limit" : "Opción 2: Dividir el PDF en varias partes por tamaño en MB"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Si el teu treball té centenars de pàgines, conté gràfics vectorials complexos o la compressió visual faria il·legibles taules microscòpiques, la divisió per mida és l'alternativa adient."
              : isEn
              ? "If your academic paper spans hundreds of pages, embeds complex architectural schematics, or excessive compression renders charts unreadable, splitting by file size is the proper approach."
              : "Si tu trabajo tiene cientos de páginas, contiene gráficos vectoriales complejos o la compresión visual haría ilegibles tablas microscópicas, la división por tamaño es la alternativa idónea."}
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-[14.5px] text-slate-700 shadow-sm flex items-start gap-3">
            <div>
              <strong className="text-[#0F172A]">{isCa ? "Condició prèvia:" : isEn ? "Pre-condition:" : "Condición previa:"}</strong>{" "}
              {isCa
                ? "Aquesta opció només és viable si la tasca del campus virtual té configurat el camp 'Nombre màxim d'arxius' en 2 o més. Si el professor només admet un únic fitxer, no podran pujar-se múltiples parts."
                : isEn
                ? "This approach is only valid if your virtual campus assignment allows 2 or more files. If your teacher restricts submissions to exactly 1 file, multiple chunks cannot be uploaded."
                : "Esta opción solo es viable si la tarea del campus virtual tiene configurado el campo 'Número máximo de archivos' en 2 o más. Si el profesor solo admite un único archivo, no podrán subirse múltiples partes."}
            </div>
          </div>

          <GuideCTA
            to={toolPath(locale, "dividir-pdf-por-tamano")}
            eyebrow={isCa ? "Divisió en MB" : isEn ? "Smart MB Chunking" : "División en MB"}
            title={isCa ? "Dividir PDF per mida a BreadPDF" : isEn ? "Split PDF by Size on BreadPDF" : "Dividir PDF por tamaño en BreadPDF"}
            description={
              isCa
                ? "Indica el límit exacte del teu campus (per exemple, 5 MB o 10 MB). L'eina agruparà pàgines completes generant fitxers numerats preparats per pujar."
                : isEn
                ? "Set your campus ceiling (e.g. 5 MB or 10 MB). The engine groups complete pages into numbered segments ready for turn-in."
                : "Indica el límite exacto de tu campus (por ejemplo, 5 MB o 10 MB). La herramienta agrupará páginas completas generando archivos numerados listos para subir."
            }
            buttonText={isCa ? "Dividir per mida ara" : isEn ? "Split by size now" : "Dividir por tamaño ahora"}
            icon={<Scissors className="size-4" />}
            variant="solid-card"
          />
        </section>

        {/* Section 5: What if only 1 file is allowed */}
        <section className="mt-10" aria-labelledby="single-file-workflow">
          <h2 id="single-file-workflow" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "¿Què faig si el professor exigeix un sol arxiu?" : isEn ? "What if the instructor strictly requires a single file?" : "¿Qué hago si el profesor exige un solo archivo?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Si la plataforma bloqueja l'entrega de múltiples adjunts, segueix aquest flux pas a pas per reduir al màxim el document sense haver de suprimir contingut essencial:"
              : isEn
              ? "If the submission portal limits uploads to a single attachment, follow this sequential triage workflow to shrink your PDF without deleting essential work:"
              : "Si la plataforma bloquea la entrega de múltiples adjuntos, sigue este flujo paso a paso para reducir al máximo el documento sin tener que suprimir contenido esencial:"}
          </p>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              title={isCa ? "Elimina pàgines completament en blanc generades per escàners" : isEn ? "Strip blank pages generated by duplex scanning" : "Elimina páginas completamente en blanco generadas por escáneres"}
              action={
                <Link to={toolPath(locale, "eliminar-paginas-en-blanco")} className="font-semibold text-[#EC3C2D] underline">
                  {isCa ? "Eliminar pàgines en blanc" : isEn ? "Remove Blank Pages" : "Eliminar páginas en blanco"}
                </Link>
              }
            >
              {isCa
                ? "En documents escanejats a doble cara, sovint queden fulls buits que afegeixen dades d'imatge inútils."
                : isEn
                ? "Duplex scanning often produces trailing empty sheets that add useless megabytes."
                : "En documentos escaneados a doble cara, a menudo quedan hojas vacías que añaden datos de imagen inútiles."}
            </GuideStep>

            <GuideStep
              stepNumber={2}
              title={isCa ? "Elimina annexos descartables o portades redundants" : isEn ? "Delete disposable draft sections or appendices" : "Elimina anexos descartables o portadas redundantes"}
              action={
                <Link to={toolPath(locale, "eliminar-paginas-pdf")} className="font-semibold text-[#EC3C2D] underline">
                  {isCa ? "Eliminar pàgines de PDF" : isEn ? "Delete PDF Pages" : "Eliminar páginas de PDF"}
                </Link>
              }
            >
              {isCa
                ? "Si l'entrega només demana la memòria principal, extreu els annexos prescindibles."
                : isEn
                ? "If the submission rubric only grades the core thesis body, extract unnecessary appendices."
                : "Si la entrega solo pide la memoria principal, extrae los anexos prescindibles."}
            </GuideStep>

            <GuideStep
              stepNumber={3}
              title={isCa ? "Aplica el mode de compressió equilibrat o màxim" : isEn ? "Re-apply balanced or strong compression" : "Aplica el modo de compresión equilibrado o máximo"}
              action={
                <Link to={toolPath(locale, "comprimir-pdf")} className="font-semibold text-[#EC3C2D] underline">
                  {isCa ? "Comprimir PDF" : isEn ? "Compress PDF" : "Comprimir PDF"}
                </Link>
              }
            >
              {isCa
                ? "Després de retirar pàgines sobrants, passa el document resultant per Comprimir PDF per assolir el llindar estipulat pel campus."
                : isEn
                ? "After pruning pages, run the resulting document through Compress PDF to fit the campus ceiling."
                : "Tras retirar páginas sobrantes, pasa el documento resultante por Comprimir PDF para alcanzar el umbral estipulado por el campus."}
            </GuideStep>
          </div>
        </section>

        {/* Section 6: Summary Table of Common Cases */}
        <section className="mt-10" aria-labelledby="cases-table">
          <h2 id="cases-table" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Resum de casos habituals d'entrega acadèmica" : isEn ? "Summary of common academic submission scenarios" : "Resumen de casos habituales de entrega académica"}
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-[14.5px]">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="px-5 py-3.5">{isCa ? "Situació / Problema" : isEn ? "Scenario / Problem" : "Situación / Problema"}</th>
                  <th className="px-5 py-3.5">{isCa ? "Solució recomanada a BreadPDF" : isEn ? "Recommended BreadPDF Solution" : "Solución recomendada en BreadPDF"}</th>
                  <th className="px-5 py-3.5">{isCa ? "Acció clau" : isEn ? "Key Action" : "Acción clave"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa ? "PDF pesa entre 15 i 30 MB (límit de 10 MB)" : isEn ? "PDF is 15–30 MB (Campus limit is 10 MB)" : "PDF pesa entre 15 y 30 MB (límite de 10 MB)"}
                  </td>
                  <td className="px-5 py-3">
                    <Link to={toolPath(locale, "comprimir-pdf")} className="font-semibold text-[#EC3C2D] hover:underline">
                      {isCa ? "Comprimir PDF" : isEn ? "Compress PDF" : "Comprimir PDF"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa ? "Compressió equilibrada de fotografies" : isEn ? "Balanced downscaling of photo DPI" : "Compresión equilibrada de fotografías"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa ? "Tesi o memòria amb centenars de pàgines" : isEn ? "Comprehensive thesis with 200+ pages" : "Tesis o memoria con cientos de páginas"}
                  </td>
                  <td className="px-5 py-3">
                    <Link to={toolPath(locale, "dividir-pdf-por-tamano")} className="font-semibold text-[#EC3C2D] hover:underline">
                      {isCa ? "Dividir PDF per mida" : isEn ? "Split PDF by Size" : "Dividir PDF por tamaño"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa ? "Generar parts de màxim 5 o 10 MB" : isEn ? "Create numbered sub-10 MB volumes" : "Generar partes de máximo 5 o 10 MB"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa ? "Pàgines sobrants o esborranys al final" : isEn ? "Unnecessary appendices or draft notes" : "Páginas sobrantes o borradores al final"}
                  </td>
                  <td className="px-5 py-3">
                    <Link to={toolPath(locale, "eliminar-paginas-pdf")} className="font-semibold text-[#EC3C2D] hover:underline">
                      {isCa ? "Eliminar pàgines" : isEn ? "Delete Pages" : "Eliminar páginas"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa ? "Selecció visual i descart de fulls" : isEn ? "Visually select and prune extra sheets" : "Selección visual y descarte de hojas"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa ? "Escaneig automàtic amb fulls buits" : isEn ? "Duplex scan with alternating white sheets" : "Escaneo automático con hojas vacías"}
                  </td>
                  <td className="px-5 py-3">
                    <Link to={toolPath(locale, "eliminar-paginas-en-blanco")} className="font-semibold text-[#EC3C2D] hover:underline">
                      {isCa ? "Eliminar pàgines en blanc" : isEn ? "Remove Blank Pages" : "Eliminar páginas en blanco"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa ? "Detecció automàtica de píxels blancs" : isEn ? "Automated white-pixel ratio scanner" : "Detección automática de píxeles blancos"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: FAQ Accordion */}
        <GuideFAQ
          title={isCa ? "Preguntes freqüents sobre límits de pujada a campus virtuals" : isEn ? "Frequently Asked Questions about Campus Upload Limits" : "Preguntas frecuentes sobre límites de subida en campus virtuales"}
          faqs={faqs}
        />

        {/* Technical Sources & Documentation References */}
        <GuideFooterSources
          title={isCa ? "Fonts oficials i documentació tècnica de referència" : isEn ? "Official Sources & Technical Documentation" : "Fuentes oficiales y documentación técnica de referencia"}
        >
          <ul className="space-y-2 list-none pl-0">
            <li className="flex items-center gap-1.5">
              <ExternalLink className="size-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>Moodle Community Documentation:</strong>{" "}
                <em>File upload size settings & Assignment activity limits</em> (
                <a
                  href="https://docs.moodle.org/en/File_upload_size"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC3C2D] underline hover:opacity-80"
                >
                  docs.moodle.org/en/File_upload_size
                </a>
                ).
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <ExternalLink className="size-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>Google for Education Support:</strong>{" "}
                <em>Assignment submissions and Google Drive storage integration</em> (
                <a
                  href="https://support.google.com/edu/classroom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC3C2D] underline hover:opacity-80"
                >
                  support.google.com/edu/classroom
                </a>
                ).
              </span>
            </li>
          </ul>
        </GuideFooterSources>
      </div>
    </article>
  );
}
