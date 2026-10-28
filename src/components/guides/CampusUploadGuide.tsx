import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  FileDown,
  FileCog,
  FileSearch,
  FileText,
  Files,
  GraduationCap,
  Image as ImageIcon,
  ScanLine,
  Scissors,
  Settings2,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { type GuideDefinition } from "@/lib/guides/registry";
import { toolPath } from "@/lib/i18n/routing";
import {
  GuideHero,
  GuideCTA,
  GuideMascot,
  GuideFAQ,
  GuideFooterSources,
} from "@/components/guides/editorial/GuideEditorial";
import "./CampusUploadGuide.css";

interface GuideArticleProps {
  locale: Locale;
  guide: GuideDefinition;
}

function CampusHeroVisual({ locale }: { locale: Locale }) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const labels = isCa
    ? {
        alt: "Il·lustració d'un PDF que es lliura a un campus virtual, amb l'avís de revisar el límit de pujada i les opcions de compressió o divisió.",
        campus: "Campus virtual",
        document: "Document PDF",
        warning: "Revisa el límit de pujada",
        detail: "La mida màxima depèn de cada tasca",
        compress: "Comprimeix el PDF",
        split: "Divideix el PDF",
      }
    : isEn
      ? {
          alt: "Illustration of a PDF submission to a virtual campus, with a prompt to check the upload limit and options to compress or split the file.",
          campus: "Virtual campus",
          document: "PDF document",
          warning: "Check the upload limit",
          detail: "Maximum size varies by assignment",
          compress: "Compress PDF",
          split: "Split PDF",
        }
      : {
          alt: "Ilustración de un PDF que se entrega en un campus virtual, con el aviso de revisar el límite de subida y las opciones de compresión o división.",
          campus: "Campus virtual",
          document: "Documento PDF",
          warning: "Revisa el límite de subida",
          detail: "El tamaño máximo depende de cada tarea",
          compress: "Comprimir PDF",
          split: "Dividir PDF",
        };

  return (
    <div className="campus-hero-visual" role="img" aria-label={labels.alt}>
      <div className="campus-hero-visual__context" aria-hidden="true">
        <span className="campus-hero-visual__campus-icon">
          <GraduationCap className="size-6" />
        </span>
        <strong className="campus-hero-visual__context-copy">{labels.campus}</strong>
        <GuideMascot
          variant="think"
          size="sm"
          alt=""
          priority
          className="campus-hero-visual__mascot"
        />
      </div>

      <div className="campus-hero-visual__document" aria-hidden="true">
        <FileText className="campus-hero-visual__file-icon size-6" />
        <span className="campus-hero-visual__document-name">{labels.document}</span>
        <span className="campus-hero-visual__pdf-tag">PDF</span>
      </div>

      <div className="campus-hero-visual__warning" aria-hidden="true">
        <AlertTriangle className="size-4 shrink-0" />
        <span>
          <strong>{labels.warning}</strong>
          <small>{labels.detail}</small>
        </span>
      </div>

      <div className="campus-hero-visual__solutions" aria-hidden="true">
        <div className="campus-hero-visual__solution">
          <FileDown className="size-5" />
          <strong>{labels.compress}</strong>
        </div>
        <div className="campus-hero-visual__solution">
          <Scissors className="size-5" />
          <strong>{labels.split}</strong>
        </div>
      </div>
    </div>
  );
}

export function CampusUploadGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article campus-guide mx-auto w-full max-w-[1040px] px-4 py-10 sm:px-8 sm:py-16 lg:px-8">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeVariant="brand"
        badgeIcon={<GraduationCap className="size-4" />}
        visual={<CampusHeroVisual locale={locale} />}
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
      />

      <section className="campus-diagnostic" aria-labelledby="campus-diagnostic-title">
        <div className="campus-section-heading">
          <span className="campus-section-eyebrow">
            {isCa ? "ABANS DE COMENÇAR" : isEn ? "BEFORE YOU START" : "ANTES DE EMPEZAR"}
          </span>
          <h2 id="campus-diagnostic-title" className="campus-section__title">
            {isCa
              ? "Diagnòstic ràpid abans de començar"
              : isEn
                ? "Quick diagnostic before you start"
                : "Diagnóstico rápido antes de empezar"}
          </h2>
        </div>
        <div className="campus-diagnostic__grid">
          <article className="campus-diagnostic__choice campus-diagnostic__choice--recommended">
            <span className="campus-diagnostic__icon" aria-hidden="true">
              <FileText className="size-6" />
            </span>
            <div className="campus-diagnostic__copy">
              <span className="campus-diagnostic__option">
                {isCa ? "OPCIÓ A" : isEn ? "OPTION A" : "OPCIÓN A"}
              </span>
              <h3>
                {isCa
                  ? "Un únic fitxer obligatori"
                  : isEn
                    ? "One file is required"
                    : "Un único archivo obligatorio"}
              </h3>
              <p>
                {isCa
                  ? "Comprimeix el PDF per reduir-ne la mida i conservar la unitat del treball."
                  : isEn
                    ? "Compress the PDF to reduce its size while keeping the assignment together."
                    : "Comprime el PDF para reducir su tamaño y conservar la unidad del trabajo."}
              </p>
            </div>
          </article>
          <article className="campus-diagnostic__choice">
            <span className="campus-diagnostic__icon" aria-hidden="true">
              <Files className="size-6" />
            </span>
            <div className="campus-diagnostic__copy">
              <span className="campus-diagnostic__option">
                {isCa ? "OPCIÓ B" : isEn ? "OPTION B" : "OPCIÓN B"}
              </span>
              <h3>
                {isCa
                  ? "S'admeten diversos fitxers"
                  : isEn
                    ? "Multiple files are allowed"
                    : "Se permiten varios archivos"}
              </h3>
              <p>
                {isCa
                  ? "Divideix el PDF per mida si la configuració de la tasca permet diversos adjunts."
                  : isEn
                    ? "Split the PDF by size if the assignment settings allow multiple attachments."
                    : "Divide el PDF por tamaño si la configuración de la tarea permite varios adjuntos."}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="guide-prose campus-guide__prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Why does this happen */}
        <section className="campus-causes" aria-labelledby="why-upload-fails">
          <h2 id="why-upload-fails" className="campus-section__title">
            {isCa
              ? "¿Per què el campus virtual rebutja el meu document?"
              : isEn
                ? "Why does the virtual campus reject my file?"
                : "¿Por qué el campus virtual rechaza mi documento?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Quan un campus virtual (com Moodle, Sakai o plataformes pròpies universitàries) mostra l'avís de fitxer massa gran, no es tracta d'una fallada de connexió: el document ha superat la quota de memòria permesa per a aquesta activitat concreta."
              : isEn
                ? "When a virtual campus (such as Moodle, Sakai, or proprietary university portals) displays an upload error, it is not a connection failure: the document simply exceeds the memory ceiling configured for that specific assignment."
                : "Cuando un campus virtual (como Moodle, Sakai o plataformas propias universitarias) muestra un aviso de archivo demasiado grande, no se trata de un fallo de conexión: el documento ha superado la cuota de memoria permitida para esa actividad concreta."}
          </p>

          <div className="campus-causes__intro">
            <p>
              {isCa
                ? "Les causes tècniques més habituals són:"
                : isEn
                  ? "The most common technical causes include:"
                  : "Las causas técnicas más habituales son:"}
            </p>
            <div className="campus-causes__grid">
              <article className="campus-cause">
                <span className="campus-cause__icon" aria-hidden="true">
                  <ImageIcon className="size-5" />
                </span>
                <h3>
                  {isCa
                    ? "Imatges incrustades sense optimitzar"
                    : isEn
                      ? "Unoptimized embedded photos"
                      : "Imágenes incrustadas sin optimizar"}
                </h3>
                <p>
                  {isCa
                    ? "Fotografies preses amb mòbils moderns incrustades en un document Word poden pesar entre 5 i 12 MB cadascuna si no s'han reescalat."
                    : isEn
                      ? "Smartphone photos directly inserted into Word documents often weigh 5–12 MB each before compilation."
                      : "Fotografías tomadas con móviles modernos incrustadas en un documento Word pueden pesar entre 5 y 12 MB cada una si no se han reescalado."}
                </p>
              </article>
              <article className="campus-cause">
                <span className="campus-cause__icon" aria-hidden="true">
                  <ScanLine className="size-5" />
                </span>
                <h3>
                  {isCa
                    ? "Escanejos a resolució excessiva"
                    : isEn
                      ? "High-DPI scanner output"
                      : "Escaneos a resolución excesiva"}
                </h3>
                <p>
                  {isCa
                    ? "Un escàner configurat a 600 DPI en color genera pàgines que pesen fins a vint vegades més que un escaneig òptim a 150-200 DPI per a lectura digital."
                    : isEn
                      ? "Scanners operating at 600 DPI full color create pages up to twenty times heavier than a standard 150–200 DPI screen document."
                      : "Un escáner configurado a 600 DPI en color genera páginas que pesan hasta veinte veces más que un escaneo óptimo a 150-200 DPI para lectura digital."}
                </p>
              </article>
              <article className="campus-cause">
                <span className="campus-cause__icon" aria-hidden="true">
                  <Settings2 className="size-5" />
                </span>
                <h3>
                  {isCa
                    ? "Configuració restrictiva de la tasca"
                    : isEn
                      ? "Course upload restrictions"
                      : "Configuración restrictiva de la tarea"}
                </h3>
                <p>
                  {isCa
                    ? "L'administrador del campus o el professor ha limitat l'espai per evitar saturar la capacitat del servidor educatiu."
                    : isEn
                      ? "Instructors or campus sysadmins deliberately set low thresholds to prevent server storage bloat."
                      : "El administrador del campus o el profesor ha limitado el espacio para evitar saturar la capacidad del servidor educativo."}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="campus-workflow-section" aria-labelledby="single-file-workflow">
          <div className="campus-section-heading">
            <span className="campus-section-eyebrow">
              {isCa ? "FLUX DE LLIURAMENT" : isEn ? "SUBMISSION WORKFLOW" : "FLUJO DE ENTREGA"}
            </span>
            <h2 id="single-file-workflow" className="campus-section__title">
              {isCa
                ? "Què faig si el professor exigeix un sol fitxer?"
                : isEn
                  ? "What if the instructor requires a single file?"
                  : "¿Qué hago si el profesor exige un solo archivo?"}
            </h2>
          </div>
          <p>
            {isCa
              ? "Abans d'actuar, distingeix entre el límit del campus i el pes real del PDF. Moodle no aplica una mida universal: cada assignatura pot establir una quota i un nombre d'adjunts diferents."
              : isEn
                ? "Before choosing a fix, distinguish the campus limit from your PDF's actual size. Moodle has no universal upload limit: each assignment can set a different size and attachment count."
                : "Antes de actuar, distingue entre el límite del campus y el peso real del PDF. Moodle no aplica un tamaño universal: cada asignatura puede establecer una cuota y un número de adjuntos distintos."}
          </p>

          <ol className="campus-workflow__steps">
            <li className="campus-workflow__step">
              <span className="campus-workflow__number" aria-hidden="true">
                01
              </span>
              <div className="campus-workflow__copy">
                <h3>
                  {isCa
                    ? "Comprova el límit i les restriccions de la tasca"
                    : isEn
                      ? "Check the task limit and restrictions"
                      : "Comprueba el límite y las restricciones de la tarea"}
                </h3>
                <p>
                  {isCa
                    ? "Obre la pàgina de lliurament del campus. Al costat del requadre de pujada, localitza 'Mida màxima per a fitxers nous: X MB' i 'Nombre màxim d'arxius: Y'."
                    : isEn
                      ? "Open the campus assignment page. Next to the upload box, look for 'Maximum file size for new files: X MB' and 'Maximum attachments: Y'."
                      : "Abre la página de entrega del campus. Junto al recuadro de subida, localiza 'Tamaño máximo para archivos nuevos: X MB' y 'Número máximo de archivos: Y'."}
                </p>
              </div>
            </li>
            <li className="campus-workflow__step">
              <span className="campus-workflow__number" aria-hidden="true">
                02
              </span>
              <div className="campus-workflow__copy">
                <h3>
                  {isCa
                    ? "Verifica el pes actual del PDF"
                    : isEn
                      ? "Check the PDF's current file size"
                      : "Verifica el peso actual del PDF"}
                </h3>
                <p>
                  {isCa
                    ? "Al teu ordinador, fes clic dret sobre el document i prem 'Propietats' (Windows) o 'Obtenir informació' (Mac) per saber exactament quants megabytes has de rebaixar."
                    : isEn
                      ? "On your computer, right-click the file and choose 'Properties' (Windows) or 'Get Info' (macOS) to see the exact gap in megabytes."
                      : "En tu ordenador, haz clic derecho sobre el documento y pulsa 'Propiedades' (Windows) o 'Obtener información' (Mac) para saber exactamente cuántos megabytes necesitas rebajar."}
                </p>
              </div>
            </li>
            <li className="campus-workflow__step">
              <span className="campus-workflow__number" aria-hidden="true">
                03
              </span>
              <div className="campus-workflow__copy">
                <h3>
                  {isCa
                    ? "Retira les pàgines que no cal lliurar"
                    : isEn
                      ? "Remove pages that do not need to be submitted"
                      : "Retira las páginas que no necesitas entregar"}
                </h3>
                <p>
                  {isCa
                    ? "En documents escanejats a doble cara, els fulls en blanc afegeixen dades d'imatge inútils. Si la tasca només demana la memòria principal, també pots retirar annexos prescindibles."
                    : isEn
                      ? "Duplex scans can contain blank sheets that add useless image data. If the assignment only requires the main document, you can also remove unnecessary appendices."
                      : "En documentos escaneados a doble cara, las páginas en blanco añaden datos de imagen inútiles. Si la tarea solo pide la memoria principal, también puedes retirar anexos prescindibles."}
                </p>
                <div className="campus-workflow__actions">
                  <Link to={toolPath(locale, "eliminar-paginas-en-blanco")}>
                    {isCa
                      ? "Eliminar pàgines en blanc"
                      : isEn
                        ? "Remove blank pages"
                        : "Eliminar páginas en blanco"}
                  </Link>
                  <Link to={toolPath(locale, "eliminar-paginas-pdf")}>
                    {isCa
                      ? "Eliminar pàgines de PDF"
                      : isEn
                        ? "Delete PDF pages"
                        : "Eliminar páginas de PDF"}
                  </Link>
                </div>
              </div>
            </li>
            <li className="campus-workflow__step">
              <span className="campus-workflow__number" aria-hidden="true">
                04
              </span>
              <div className="campus-workflow__copy">
                <h3>
                  {isCa
                    ? "Aplica la solució que permet el campus"
                    : isEn
                      ? "Choose the solution allowed by the campus"
                      : "Aplica la solución que permite el campus"}
                </h3>
                <p>
                  {isCa
                    ? "Si només s'admet un fitxer, aplica una compressió equilibrada o màxima després de retirar les pàgines sobrants. Si s'admeten diversos adjunts, divideix el PDF segons la mida configurada."
                    : isEn
                      ? "If only one file is allowed, use balanced or strong compression after removing unnecessary pages. If multiple attachments are allowed, split the PDF to match the configured size."
                      : "Si solo se admite un archivo, aplica una compresión equilibrada o máxima después de retirar las páginas sobrantes. Si se permiten varios adjuntos, divide el PDF según el tamaño configurado."}
                </p>
                <div className="campus-workflow__actions">
                  <Link to={toolPath(locale, "comprimir-pdf")}>
                    {isCa ? "Comprimir PDF" : isEn ? "Compress PDF" : "Comprimir PDF"}
                  </Link>
                  <Link to={toolPath(locale, "dividir-pdf-por-tamano")}>
                    {isCa
                      ? "Dividir PDF per mida"
                      : isEn
                        ? "Split PDF by size"
                        : "Dividir PDF por tamaño"}
                  </Link>
                </div>
              </div>
            </li>
          </ol>
        </section>

        <section
          className="campus-option-section"
          id="option-compress"
          aria-labelledby="option-compress-title"
        >
          <div className="campus-option campus-option--recommended">
            <div className="campus-option__heading">
              <span className="campus-option__icon" aria-hidden="true">
                <FileDown className="size-7" />
              </span>
              <div>
                <span className="campus-option__badge">
                  {isCa ? "Opció recomanada" : isEn ? "Recommended option" : "Opción recomendada"}
                </span>
                <h2 id="option-compress-title" className="campus-section__title">
                  {isCa ? "Comprimir PDF" : isEn ? "Compress PDF" : "Comprimir PDF"}
                </h2>
              </div>
            </div>
            <p className="campus-option__description">
              {isCa
                ? "És la millor solució quan el treball s'ha de lliurar en un únic fitxer o quan el professor avalua el format continu del document (índex, bibliografia i numeració)."
                : isEn
                  ? "Compressing is the ideal solution when an assignment must be submitted as one file or when the instructor evaluates the document's continuous formatting."
                  : "Es la mejor solución cuando el trabajo debe entregarse en un único archivo o cuando el docente evalúa el formato continuo del documento (índice, bibliografía y numeración)."}
            </p>
            <GuideCTA
              to={toolPath(locale, "comprimir-pdf")}
              title={
                isCa
                  ? "Comprimir PDF a BreadPDF"
                  : isEn
                    ? "Compress PDF on BreadPDF"
                    : "Comprimir PDF en BreadPDF"
              }
              description={
                isCa
                  ? "Redueix el pes localment al navegador amb l'ajust predefinit 'Objectiu ≤ 5 MB (Moodle)'. El fitxer no surt del dispositiu: el processament és directe, sense cues de servidor, i conserva la llegibilitat del contingut."
                  : isEn
                    ? "Reduce file size locally in your browser with the 'Target ≤ 5 MB (Moodle)' preset. The document stays on your device; processing is direct, with no server queue, and keeps text and graphics readable."
                    : "Reduce el peso localmente en tu navegador con el ajuste predefinido 'Objetivo ≤ 5 MB (Moodle)'. El archivo no sale de tu dispositivo: el procesamiento es directo, sin colas de servidores externos, y conserva la legibilidad del contenido."
              }
              buttonText={
                isCa
                  ? "Comprimir amb ajust Moodle"
                  : isEn
                    ? "Compress with Moodle preset"
                    : "Comprimir con ajuste Moodle"
              }
              icon={<FileDown className="size-5" />}
              variant="solid-red"
              className="campus-guide__cta campus-guide__cta--recommended"
            />
          </div>
        </section>

        {/* Section 4: Option 2 - Split PDF by Size */}
        <section
          className="campus-option-section"
          id="option-split"
          aria-labelledby="option-split-title"
        >
          <div className="campus-option campus-option--split">
            <div className="campus-option__heading">
              <span className="campus-option__icon" aria-hidden="true">
                <Scissors className="size-7" />
              </span>
              <div>
                <span className="campus-option__badge campus-option__badge--secondary">
                  {isCa ? "Divisió per mida" : isEn ? "SPLIT BY SIZE" : "DIVISIÓN POR TAMAÑO"}
                </span>
                <h2 id="option-split-title" className="campus-section__title">
                  {isCa
                    ? "Dividir PDF per mida en MB"
                    : isEn
                      ? "Split PDF by size in MB"
                      : "Dividir PDF por tamaño en MB"}
                </h2>
              </div>
            </div>
            <p className="campus-option__description">
              {isCa
                ? "Si el treball té centenars de pàgines, gràfics vectorials complexos o una compressió excessiva faria il·legibles les taules, dividir-lo per mida és una alternativa adient."
                : isEn
                  ? "If your paper spans hundreds of pages, contains complex vector graphics, or compression would make charts unreadable, splitting by size can be an appropriate alternative."
                  : "Si tu trabajo tiene cientos de páginas, gráficos vectoriales complejos o una compresión excesiva haría ilegibles las tablas, dividirlo por tamaño es una alternativa adecuada."}
            </p>
            <div className="campus-prerequisite">
              <AlertTriangle className="campus-prerequisite__icon size-5" aria-hidden="true" />
              <div>
                <h3>{isCa ? "Condició prèvia" : isEn ? "Pre-condition" : "Condición previa"}</h3>
                <p>
                  {isCa
                    ? "Aquesta opció només és viable si la tasca permet dos fitxers o més. Si el professor només n'admet un, cal comprimir el PDF en lloc de pujar parts separades."
                    : isEn
                      ? "This option only works if the assignment allows two or more files. If the instructor only accepts one, compress the PDF instead of submitting separate parts."
                      : "Esta opción solo es viable si la tarea permite dos archivos o más. Si el profesor solo admite uno, hay que comprimir el PDF en lugar de subir partes separadas."}
                </p>
              </div>
            </div>
            <GuideCTA
              to={toolPath(locale, "dividir-pdf-por-tamano")}
              title={
                isCa
                  ? "Dividir PDF per mida a BreadPDF"
                  : isEn
                    ? "Split PDF by size on BreadPDF"
                    : "Dividir PDF por tamaño en BreadPDF"
              }
              description={
                isCa
                  ? "Indica el límit exacte del campus, per exemple 5 MB o 10 MB. L'eina agrupa pàgines completes en fitxers numerats preparats per pujar."
                  : isEn
                    ? "Enter the campus limit, such as 5 MB or 10 MB. The tool groups complete pages into numbered files ready to upload."
                    : "Indica el límite exacto del campus, por ejemplo 5 MB o 10 MB. La herramienta agrupa páginas completas en archivos numerados listos para subir."
              }
              buttonText={
                isCa
                  ? "Dividir per mida ara"
                  : isEn
                    ? "Split by size now"
                    : "Dividir por tamaño ahora"
              }
              icon={<Scissors className="size-5" />}
              variant="solid-card"
              className="campus-guide__cta campus-guide__cta--split"
            />
          </div>
        </section>

        <section className="campus-decision" aria-labelledby="campus-decision-title">
          <div className="campus-decision__heading">
            <span className="campus-decision__eyebrow">
              {isCa ? "DIAGRAMA DE DECISIÓ" : isEn ? "DECISION GUIDE" : "DIAGRAMA DE DECISIÓN"}
            </span>
            <h2 id="campus-decision-title" className="campus-section__title">
              {isCa
                ? "Per què el campus rebutja el PDF?"
                : isEn
                  ? "Why does my campus reject the PDF?"
                  : "¿Por qué mi campus rechaza el PDF?"}
            </h2>
          </div>
          <div className="campus-decision__flow">
            <article className="campus-decision__node">
              <span className="campus-decision__node-icon" aria-hidden="true">
                <ClipboardCheck className="size-6" />
              </span>
              <h3>
                {isCa ? "Revisa la tasca" : isEn ? "Check the assignment" : "Revisa la tarea"}
              </h3>
              <p>
                {isCa
                  ? "Comprova el límit de mida i el nombre d'adjunts configurats."
                  : isEn
                    ? "Check the configured file-size limit and allowed attachment count."
                    : "Comprueba el límite de tamaño y el número de archivos permitidos."}
              </p>
            </article>
            <ArrowRight className="campus-decision__arrow" aria-hidden="true" />
            <article className="campus-decision__node">
              <span className="campus-decision__node-icon" aria-hidden="true">
                <FileCog className="size-6" />
              </span>
              <h3>{isCa ? "Ajusta el PDF" : isEn ? "Adjust the PDF" : "Ajusta el PDF"}</h3>
              <p>
                {isCa
                  ? "Comprime si només s'admet un fitxer; divideix per mida si se'n permeten diversos."
                  : isEn
                    ? "Compress if only one file is accepted; split by size if multiple files are allowed."
                    : "Comprime si solo se admite un archivo; divide por tamaño si se permiten varios."}
              </p>
            </article>
            <ArrowRight className="campus-decision__arrow" aria-hidden="true" />
            <article className="campus-decision__node">
              <span className="campus-decision__node-icon" aria-hidden="true">
                <FileSearch className="size-6" />
              </span>
              <h3>
                {isCa ? "Revisa el contingut" : isEn ? "Review the content" : "Revisa el contenido"}
              </h3>
              <p>
                {isCa
                  ? "Si les imatges o els escanejos pesen massa, revisa'n la resolució i l'optimització."
                  : isEn
                    ? "If photos or scans make the file too large, review their resolution and optimization."
                    : "Si las imágenes o los escaneos pesan demasiado, revisa su resolución y optimización."}
              </p>
            </article>
          </div>
        </section>

        {/* Section 6: Summary Table of Common Cases */}
        <section className="mt-10" aria-labelledby="cases-table">
          <h2 id="cases-table" className="campus-section__title">
            {isCa
              ? "Resum de casos habituals d'entrega acadèmica"
              : isEn
                ? "Summary of common academic submission scenarios"
                : "Resumen de casos habituales de entrega académica"}
          </h2>
          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="px-5 py-3.5">
                    {isCa
                      ? "Situació / Problema"
                      : isEn
                        ? "Scenario / Problem"
                        : "Situación / Problema"}
                  </th>
                  <th className="px-5 py-3.5">
                    {isCa
                      ? "Solució recomanada a BreadPDF"
                      : isEn
                        ? "Recommended BreadPDF Solution"
                        : "Solución recomendada en BreadPDF"}
                  </th>
                  <th className="px-5 py-3.5">
                    {isCa ? "Acció clau" : isEn ? "Key Action" : "Acción clave"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa
                      ? "PDF pesa entre 15 i 30 MB (límit de 10 MB)"
                      : isEn
                        ? "PDF is 15–30 MB (Campus limit is 10 MB)"
                        : "PDF pesa entre 15 y 30 MB (límite de 10 MB)"}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={toolPath(locale, "comprimir-pdf")}
                      className="font-semibold text-[#C9302C] hover:underline"
                    >
                      {isCa ? "Comprimir PDF" : isEn ? "Compress PDF" : "Comprimir PDF"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa
                      ? "Compressió equilibrada de fotografies"
                      : isEn
                        ? "Balanced downscaling of photo DPI"
                        : "Compresión equilibrada de fotografías"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa
                      ? "Tesi o memòria amb centenars de pàgines"
                      : isEn
                        ? "Comprehensive thesis with 200+ pages"
                        : "Tesis o memoria con cientos de páginas"}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={toolPath(locale, "dividir-pdf-por-tamano")}
                      className="font-semibold text-[#C9302C] hover:underline"
                    >
                      {isCa
                        ? "Dividir PDF per mida"
                        : isEn
                          ? "Split PDF by Size"
                          : "Dividir PDF por tamaño"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa
                      ? "Generar parts de màxim 5 o 10 MB"
                      : isEn
                        ? "Create numbered sub-10 MB volumes"
                        : "Generar partes de máximo 5 o 10 MB"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa
                      ? "Pàgines sobrants o esborranys al final"
                      : isEn
                        ? "Unnecessary appendices or draft notes"
                        : "Páginas sobrantes o borradores al final"}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={toolPath(locale, "eliminar-paginas-pdf")}
                      className="font-semibold text-[#C9302C] hover:underline"
                    >
                      {isCa ? "Eliminar pàgines" : isEn ? "Delete Pages" : "Eliminar páginas"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa
                      ? "Selecció visual i descart de fulls"
                      : isEn
                        ? "Visually select and prune extra sheets"
                        : "Selección visual y descarte de hojas"}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {isCa
                      ? "Escaneig automàtic amb fulls buits"
                      : isEn
                        ? "Duplex scan with alternating white sheets"
                        : "Escaneo automático con hojas vacías"}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={toolPath(locale, "eliminar-paginas-en-blanco")}
                      className="font-semibold text-[#C9302C] hover:underline"
                    >
                      {isCa
                        ? "Eliminar pàgines en blanc"
                        : isEn
                          ? "Remove Blank Pages"
                          : "Eliminar páginas en blanco"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[14px]">
                    {isCa
                      ? "Detecció automàtica de píxels blancs"
                      : isEn
                        ? "Automated white-pixel ratio scanner"
                        : "Detección automática de píxeles blancos"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre límits de pujada a campus virtuals"
              : isEn
                ? "Frequently Asked Questions about Campus Upload Limits"
                : "Preguntas frecuentes sobre límites de subida en campus virtuales"
          }
          faqs={faqs}
        />

        {/* Technical Sources & Documentation References */}
        <GuideFooterSources
          title={
            isCa
              ? "Fonts oficials i documentació tècnica de referència"
              : isEn
                ? "Official Sources & Technical Documentation"
                : "Fuentes oficiales y documentación técnica de referencia"
          }
          sources={[
            {
              organization: "Moodle Community Documentation",
              title: "File upload size settings & Assignment activity limits",
              href: "https://docs.moodle.org/en/File_upload_size",
              hrefLabel: "docs.moodle.org/en/File_upload_size",
            },
            {
              organization: "Google for Education Support",
              title: "Assignment submissions and Google Drive storage integration",
              href: "https://support.google.com/edu/classroom",
              hrefLabel: "support.google.com/edu/classroom",
            },
          ]}
        />
      </div>
    </article>
  );
}
