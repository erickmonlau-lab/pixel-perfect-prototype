import { Link } from "@tanstack/react-router";
import {
  ScanText,
  RotateCw,
  Trash2,
  FileX2,
  AlertTriangle,
  GraduationCap,
  Search,
  FileText,
  Layers,
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

export function OcrSearchableGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<GraduationCap className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Investigació & Arxius Digitals"
            : isEn
              ? "Research & Digital Archives"
              : "Investigación & Archivos Digitales"
        }
        subtitle={
          isCa
            ? "Si un PDF escanejat conté les pàgines com a imatges, és molt probable que no puguis seleccionar ni cercar el seu text amb Ctrl+F. La tecnologia OCR analitza les formes dels caràcters per incrustar una capa invisible que permet localitzar termes clau, copiar cites i indexar documents."
            : isEn
              ? "If a scanned PDF stores pages as flattened images, highlighting text or searching with Ctrl+F is impossible. OCR technology analyzes glyph forms to embed an invisible vector text layer for keyword lookups and citations."
              : "Si un PDF escaneado contiene las páginas como imágenes, es muy probable que no puedas seleccionar ni buscar su texto con Ctrl+F. La tecnología OCR analiza las formas de los caracteres para incrustar una capa invisible que permite buscar términos clave, copiar citas e indexar documentos."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Regla factual: L'OCR és un procés probabilístic que depèn de la font física"
            : isEn
              ? "Fundamental Factual Rule: OCR is a probabilistic process dictated by source quality"
              : "Regla factual: El OCR es un proceso probabilístico que depende del documento físico",
          description: isCa
            ? "Cap motor d'OCR reconeix qualsevol document amb un 100% de precisió ni reconstrueix màgicament pàgines deteriorades. La nitidesa depèn de la resolució, contrast fons-lletra, inclinació i cal·ligrafia. La verificació ocular de xifres i noms és indispensable."
            : isEn
              ? "No OCR system delivers 100% precision across damaged or low-contrast materials. Accuracy depends on scanning DPI, contrast, tilt, and typography. Ocular verification of critical figures remains mandatory."
              : "Ningún motor de OCR reconoce cualquier documento con un 100% de precisión ni reconstruye páginas deterioradas. La nitidez depende de resolución, contraste, inclinación y caligrafía. La verificación ocular de cifras y nombres es indispensable.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/hacer-buscable-pdf-escaneado-ocr.svg"
        alt={
          guide.image?.alt[locale] ||
          guide.image?.alt.es ||
          "Diagrama de funcionamiento del OCR en PDF"
        }
        caption={
          isCa
            ? "Mecanisme d'OCR en PDF: la imatge escanejada original es conserva intacta i s'hi afegeix una capa tipogràfica invisible superposada que habilita la selecció i la cerca amb Ctrl+F."
            : isEn
              ? "PDF OCR architecture: the original scanned bitmap is preserved underneath, while an invisible vector text layer is superimposed to enable text selection and Ctrl+F querying."
              : "Mecanismo de OCR en PDF: la imagen escaneada original se conserva intacta y se añade una capa tipográfica invisible superpuesta que habilita la selección y la búsqueda con Ctrl+F."
        }
      />

      {/* Mascota Pensando (Análisis / Inteligencia / OCR / Documentos complejos) */}
      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa
            ? "Intel·ligència de Document"
            : isEn
              ? "Document Intelligence"
              : "Inteligencia Documental"
        }
        title={
          isCa
            ? "Reconeixement òptic precís executat directament al teu navegador"
            : isEn
              ? "Precise optical character recognition processed client-side"
              : "Reconocimiento óptico preciso ejecutado directamente en tu navegador"
        }
        description={
          isCa
            ? "El motor de visió artificial processa cada caràcter en local mitjançant WebAssembly. El teu document no puja a cap servidor extern i manté la teva informació confidencial."
            : isEn
              ? "Our client-side vision engine processes glyphs locally using WebAssembly. Your documents never transit to third-party cloud servers, preserving total confidentiality."
              : "El motor de visión artificial procesa cada carácter en local mediante WebAssembly. Tu documento no sube a ningún servidor externo y mantiene tu información confidencial."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Cómo saber si necesita OCR */}
        <section aria-labelledby="how-to-check-ocr">
          <h2 id="how-to-check-ocr" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Com saber si el teu PDF necessita OCR?"
              : isEn
                ? "How to Tell If Your PDF Needs OCR"
                : "¿Cómo saber si tu PDF necesita OCR?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Un document pot llegir-se amb absoluta claredat a la pantalla i, tanmateix, ser completament 'cec' per als motors de cerca o gestors bibliogràfics. Fes aquestes 3 proves ràpides:"
              : isEn
                ? "A document can appear completely legible on your screen while remaining invisible to search engines or reference managers. Run these 3 quick diagnostics:"
                : "Un documento puede leerse con absoluta claridad en pantalla y, sin embargo, ser completamente 'ciego' para los motores de búsqueda o gestores bibliográficos. Haz estas 3 comprobaciones rápidas:"}
          </p>

          <div className="mt-5 grid sm:grid-cols-3 gap-3.5 text-[14px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Search className="size-4 text-[#C9302C]" />
                <span>1. Prova amb Ctrl + F</span>
              </div>
              <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
                {isCa
                  ? "Escriu una paraula que vegis clarament a la pàgina. Si el cercador indica '0 resultats', el document no té capa de text digital."
                  : isEn
                    ? "Type a word clearly visible on the page. If the search returns '0 results', the file lacks an embedded digital text layer."
                    : "Escribe una palabra que veas claramente en la página. Si el buscador indica '0 resultados', el documento no tiene capa de texto digital."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <FileText className="size-4 text-[#C9302C]" />
                <span>2. Selecció amb cursor</span>
              </div>
              <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
                {isCa
                  ? "Fes clic i arrossega sobre una línia. Si no pots ressaltar caràcters individuals i s'arrossega una capsa blava sobre tota la imatge, és un mapa de bits."
                  : isEn
                    ? "Click and drag across a sentence. If you cannot highlight characters and instead drag an image outline, the page is a bitmap."
                    : "Haz clic y arrastra sobre una línea. Si no puedes marcar caracteres individuales y se arrastra un recuadro sobre toda la imagen, es un mapa de bits."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Layers className="size-4 text-[#C9302C]" />
                <span>3. Copiar al porta-retalls</span>
              </div>
              <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
                {isCa
                  ? "Prem Ctrl+C i enganxa-ho en un bloc de notes. Si no s'enganxa cap text o surten símbols incomprensibles, requereix OCR."
                  : isEn
                    ? "Press Ctrl+C and paste into Notepad. If nothing pastes or unreadable gibberish appears, OCR processing is required."
                    : "Pulsa Ctrl+C y pega en un bloc de notas. Si no se pega ningún texto o aparecen símbolos incomprensibles, requiere OCR."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Qué hace realmente el OCR */}
        <section className="mt-10" aria-labelledby="how-ocr-works">
          <h2 id="how-ocr-works" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Què fa realment l'OCR?"
              : isEn
                ? "What Does OCR Actually Do?"
                : "¿Qué hace realmente el OCR?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "El reconeixement òptic no substitueix màgicament el teu document per un arxiu nou ni redibuixa les lletres. Funciona en una seqüència estructurada de visió artificial i anàlisi de glifs:"
              : isEn
                ? "Optical recognition does not magically redraw the page or reconstruct your document from scratch. It follows a structured computer vision sequence:"
                : "El reconocimiento óptico no sustituye mágicamente tu documento por un archivo nuevo ni redibuja las letras. Funciona mediante una secuencia estructurada de visión artificial:"}
          </p>

          <div className="mt-5 grid sm:grid-cols-4 gap-3 text-center text-[13.5px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-xs font-mono font-bold text-slate-400">PAS 1</span>
              <h4 className="font-bold text-slate-900 mt-1">Imatge escanejada</h4>
              <p className="text-slate-500 text-xs mt-1">
                Matriu de píxels en escala de grisos o color.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#C9302C]">PAS 2</span>
              <h4 className="font-bold text-slate-900 mt-1">Anàlisi de glifs</h4>
              <p className="text-slate-500 text-xs mt-1">
                Detecció de formes, línies i separació de paraules.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-xs font-mono font-bold text-slate-700">PAS 3</span>
              <h4 className="font-bold text-slate-900 mt-1">Capa invisible</h4>
              <p className="text-slate-500 text-xs mt-1">
                Generació de caràcters transparents sobre coordenades exactes.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
              <span className="text-xs font-mono font-bold text-emerald-700">PAS 4</span>
              <h4 className="font-bold text-emerald-950 mt-1">Document cercable</h4>
              <p className="text-emerald-900/80 text-xs mt-1">
                Ctrl+F actiu, selecció tipogràfica i còpia.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Protocolo de 3 pasos */}
        <section className="mt-10" aria-labelledby="step-by-step-ocr">
          <h2 id="step-by-step-ocr" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Com fer el teu PDF cercable pas a pas"
              : isEn
                ? "Step-by-Step Guide to Making a PDF Searchable"
                : "Cómo hacer tu PDF buscable paso a paso"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              title={
                isCa
                  ? "Pas 1: Prepara i orienta el document"
                  : isEn
                    ? "Step 1: Clean and Prepare Document Pages"
                    : "Paso 1: Prepara y orienta el documento"
              }
            >
              <p>
                {isCa
                  ? "Els motors d'OCR analitzen el text en horitzontal d'esquerra a dreta. Si una pàgina està girada 90° o 180°, l'algoritme no podrà reconèixer els caràcters. A més, eliminar pàgines en blanc redueix el temps de procés:"
                  : isEn
                    ? "OCR algorithms parse text horizontally. If a page was scanned sideways (rotated 90° or 180°), glyph detection will fail. Eliminating blank separator sheets beforehand accelerates processing:"
                    : "Los algoritmos de OCR analizan el texto horizontalmente. Si una página está escaneada en vertical invertido o girada 90°, el motor no podrá reconocer los caracteres. Además, eliminar páginas en blanco agiliza el procesamiento:"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <Link
                  to={toolPath(locale, "rotar-pdf")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <RotateCw className="size-3.5" />
                  <span>
                    {isCa
                      ? "Rotar pàgines girades"
                      : isEn
                        ? "Rotate sideways pages"
                        : "Rotar páginas giradas"}
                  </span>
                </Link>
                <Link
                  to={toolPath(locale, "eliminar-paginas-en-blanco")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <FileX2 className="size-3.5" />
                  <span>
                    {isCa
                      ? "Eliminar pàgines en blanc"
                      : isEn
                        ? "Remove blank pages"
                        : "Eliminar páginas en blanco"}
                  </span>
                </Link>
                <Link
                  to={toolPath(locale, "eliminar-paginas-pdf")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Trash2 className="size-3.5" />
                  <span>
                    {isCa
                      ? "Descartar fulls sobrants"
                      : isEn
                        ? "Delete extra pages"
                        : "Descartar hojas sobrantes"}
                  </span>
                </Link>
              </div>
            </GuideStep>

            {/* Central Tool CTA */}
            <GuideCTA
              to={toolPath(locale, "ocr-pdf")}
              eyebrow={
                isCa ? "Eina Principal" : isEn ? "Primary OCR Tool" : "Herramienta Principal"
              }
              title={
                isCa
                  ? "Hacer OCR al PDF a BreadPDF"
                  : isEn
                    ? "Run PDF OCR with BreadPDF"
                    : "Hacer OCR al PDF en BreadPDF"
              }
              description={
                isCa
                  ? "Selecciona l'idioma principal del text per activar el diccionari morfològic i descarrega un PDF cercable amb text indexable."
                  : isEn
                    ? "Select the primary source language to activate morphological dictionaries and export a clean searchable PDF."
                    : "Selecciona el idioma principal del documento para activar el diccionario morfológico y descarga un PDF con capa de texto buscable."
              }
              buttonText={
                isCa ? "Hacer OCR al PDF ara" : isEn ? "Run PDF OCR now" : "Hacer OCR al PDF ahora"
              }
              icon={<ScanText className="size-4" />}
              variant="solid-red"
            />

            <GuideStep
              stepNumber={3}
              title={
                isCa
                  ? "Pas 3: Comprova que l'OCR funciona"
                  : isEn
                    ? "Step 3: Audit Recognized Output with Quality Checklist"
                    : "Paso 3: Comprueba que el OCR funciona"
              }
            >
              <div className="space-y-2 text-[13.5px] text-slate-700 mt-2">
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="font-bold text-[#C9302C]">✓</span>
                  <span>
                    {isCa
                      ? "Ctrl+F troba paraules clau a diferents pàgines del document"
                      : isEn
                        ? "Ctrl+F resolves targeted terms across diverse page ranges"
                        : "Ctrl+F encuentra palabras clave en diferentes páginas del documento"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="font-bold text-[#C9302C]">✓</span>
                  <span>
                    {isCa
                      ? "El text es pot seleccionar netament amb el ratolí línia per línia"
                      : isEn
                        ? "Text highlights cleanly line-by-line using your cursor"
                        : "El texto puede seleccionarse nítidamente línea por línea con el ratón"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="font-bold text-[#C9302C]">✓</span>
                  <span>
                    {isCa
                      ? "El text copiat i enganxat conserva els caràcters accentuats i la lletra 'ç' o 'ñ'"
                      : isEn
                        ? "Pasted text preserves accented letters and specific diacritics"
                        : "El texto copiado y pegado conserva tildes, acentos y la letra 'ñ'"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <span className="font-bold text-[#C9302C]">✓</span>
                  <span>
                    {isCa
                      ? "La imatge de fons no ha sofert distorsió i manté la resolució d'origen"
                      : isEn
                        ? "Background image displays no visual tearing or compression loss"
                        : "La imagen escaneada de fondo se mantiene legible sin distorsión"}
                  </span>
                </div>
              </div>
            </GuideStep>
          </div>
        </section>

        {/* Section 4: Limitaciones conocidas */}
        <section className="mt-10" aria-labelledby="ocr-limits">
          <h2 id="ocr-limits" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Limitacions conegudes: Taules i escriptura manuscrita"
              : isEn
                ? "Technical Limitations: Tabular Data & Cursive Handwriting"
                : "¿Qué pasa con tablas y escritura manuscrita?"}
          </h2>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-[15px] flex items-center gap-2">
                <FileSpreadsheet className="size-4.5 text-slate-700" />
                {isCa
                  ? "Taules i dades numèriques"
                  : isEn
                    ? "Tables & Financial Grids"
                    : "Tablas y datos estructurados"}
              </h3>
              <p className="mt-2 text-[13.5px] text-slate-600 leading-relaxed">
                {isCa
                  ? "L'OCR reconeix caràcters, però no reconstrueix la relació entre files i columnes. Si necessites editar xifres en un full de càlcul, aplica OCR primer i passa el document per PDF a Excel."
                  : isEn
                    ? "OCR identifies glyphs but does not infer mathematical relationships between cells. To edit numbers, run OCR first and then pass the document to PDF to Excel."
                    : "El OCR reconoce caracteres, pero no reconstruye la relación entre filas y columnas. Si necesitas editar cifras en una hoja de cálculo, aplica OCR primero y pasa el documento por PDF a Excel."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-[15px] flex items-center gap-2">
                <AlertTriangle className="size-4.5 text-amber-600" />
                {isCa
                  ? "Escriptura a mà (Manuscrita)"
                  : isEn
                    ? "Cursive & Handwritten Text"
                    : "Escritura manuscrita (a mano)"}
              </h3>
              <p className="mt-2 text-[13.5px] text-slate-600 leading-relaxed">
                {isCa
                  ? "Els sistemes estàndard d'OCR estan calibrats per a caràcters d'impremta o fonts digitals. La cal·ligrafia lliure o firmes manuscrites presenten taxes d'error significatives."
                  : isEn
                    ? "Standard OCR models are trained on typeset fonts and printed typography. Freehand handwriting, cursive letters, and signatures exhibit high discrepancy rates."
                    : "Los motores estándar de OCR están entrenados para tipografía de imprenta o fuentes digitales. La caligrafía manual o firmas manuscritas suelen presentar discrepancias muy altas."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Casos prácticos */}
        <section className="mt-10" aria-labelledby="practical-cases">
          <h2 id="practical-cases" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Casos pràctics i fluxos recomanats"
              : isEn
                ? "Practical Scenarios & Workflows"
                : "Casos prácticos y flujos recomendados"}
          </h2>

          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">
                    {isCa ? "Tipus de document" : isEn ? "Document Type" : "Caso práctico"}
                  </th>
                  <th className="py-3 px-4">
                    {isCa ? "Flux recomanat" : isEn ? "Recommended Sequence" : "Flujo recomendado"}
                  </th>
                  <th className="py-3 px-4">
                    {isCa
                      ? "Objectiu principal"
                      : isEn
                        ? "Primary Objective"
                        : "Objetivo principal"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    Llibre o article d'arxiu escanejat
                  </td>
                  <td className="py-3.5 px-4 text-[#C9302C] font-semibold">
                    Rotar PDF → OCR de PDF
                  </td>
                  <td className="py-3.5 px-4">
                    Cerca amb Ctrl+F i citació bibliogràfica indexable.
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    Apunts de classe impresos
                  </td>
                  <td className="py-3.5 px-4 text-[#C9302C] font-semibold">
                    OCR de PDF → Extraer texto (.txt)
                  </td>
                  <td className="py-3.5 px-4">Copiar resums a Word o processadors d'apunts.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    Factura o balanç en paper escanejat
                  </td>
                  <td className="py-3.5 px-4 text-[#C9302C] font-semibold">
                    OCR de PDF → PDF a Excel
                  </td>
                  <td className="py-3.5 px-4">Estructurar columnes i auditar xifres amb sumes.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    Expedient jurídic o administratiu
                  </td>
                  <td className="py-3.5 px-4 text-[#C9302C] font-semibold">
                    OCR de PDF + Comprovació ocular
                  </td>
                  <td className="py-3.5 px-4">Localitzar antecedents i números de procediment.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents"
              : isEn
                ? "Frequently Asked Questions"
                : "Preguntas frecuentes sobre OCR en PDF"
          }
          faqs={faqs}
        />

        {/* Footer Sources */}
        <GuideFooterSources
          title={
            isCa
              ? "Privacitat en el processament d'OCR i fonts tècniques"
              : isEn
                ? "Client-Side Processing Privacy & Technical References"
                : "Privacidad en el procesamiento de OCR y fuentes técnicas"
          }
        >
          <p>
            {isCa
              ? "En la investigació acadèmica, arxius jurídics o expedients administratius, els documents escanejats solen contenir dades protegides. A BreadPDF, el motor d'OCR s'executa mitjançant WebAssembly directament a la memòria del teu navegador sense transmetre fitxers a servidors externs."
              : isEn
                ? "In academic archival research and legal filings, scanned records house sensitive identifiers. In BreadPDF, the OCR engine compiles via WebAssembly to execute entirely within client browser memory without remote cloud transmissions."
                : "En la investigación académica, archivos jurídicos o expedientes administrativos, los documentos escaneados suelen albergar datos protegidos. En BreadPDF, el motor de OCR se ejecuta mediante WebAssembly directamente en la memoria de tu navegador web sin transmitir archivos a servidores externos."}
          </p>
        </GuideFooterSources>
      </div>
    </article>
  );
}
