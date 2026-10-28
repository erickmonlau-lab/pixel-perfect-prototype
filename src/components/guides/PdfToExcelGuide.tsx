import { Link } from "@tanstack/react-router";
import { FileSpreadsheet, TableProperties, ScanText, AlertTriangle, Building2 } from "lucide-react";
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

export function PdfToExcelGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<Building2 className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Finances & Gestió Documental"
            : isEn
              ? "Finance & Document Ops"
              : "Finanzas & Gestión Documental"
        }
        subtitle={
          isCa
            ? "Un PDF pot mostrar una taula impecablement alineada i, tanmateix, no emmagatzemar cap estructura de files i columnes a nivell intern. Passar factures, extractes o balanços a Excel requereix reconstruir la quadrícula geomètrica i auditar rigorosament els valors obtinguts."
            : isEn
              ? "A PDF file may render an aligned financial table on screen while containing no native row-and-column data structure beneath. Converting invoices, statements, or balance sheets into Excel requires reconstructing geometric coordinates followed by an audit."
              : "Un PDF puede mostrar una tabla impecablemente alineada en pantalla y, sin embargo, no almacenar ninguna estructura de filas y columnas a nivel interno. Pasar facturas, extractos o balances a Excel requiere reconstruir la cuadrícula geométrica y auditar rigurosamente los valores."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Regla factual: El resultat depèn de com estigui construït el PDF"
            : isEn
              ? "Fundamental Factual Rule: Output fidelity depends entirely on PDF construction"
              : "Regla factual: El resultado depende de cómo esté construido el PDF",
          description: isCa
            ? "Cap programari pot garantir una conversió del 100% lliure d'errors en tots els documents. Si conté cel·les combinades, salts de línia o prové d'un escàner físic, la revisió humana de columnes, decimals i sumes és indispensable."
            : isEn
              ? "No software engine can guarantee 100% error-free conversion across all files. Merged cells or scanned bitmaps demand human auditing of column alignments, decimals, and totals."
              : "Ningún software puede garantizar una conversión del 100% libre de errores en todos los documentos. Si contiene celdas combinadas, saltos o procede de escáner, la revisión humana de columnas, decimales y sumas es indispensable.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/pasar-tablas-pdf-a-excel.svg"
        alt={
          guide.image?.alt[locale] ||
          guide.image?.alt.es ||
          "Conversión de tablas PDF a celdas de Excel"
        }
        caption={
          isCa
            ? "Mecanisme de conversió: transformació de corrents de text vectorial amb coordenades espacials (X, Y) a cel·les de full de càlcul estructurades (.xlsx)."
            : isEn
              ? "Conversion mechanism: translating absolute coordinate vector text streams (X, Y) into structured spreadsheet cells (.xlsx) with audited totals."
              : "Mecanismo de conversión: transformación de flujos de texto vectorial con coordenadas espaciales (X, Y) a celdas de hoja de cálculo estructuradas (.xlsx)."
        }
      />

      {/* Mascota Pensando (Análisis de datos tabulares / Números / Finanzas) */}
      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa
            ? "Anàlisi Geomètrica de Dades"
            : isEn
              ? "Geometric Data Analysis"
              : "Análisis Geométrico de Datos"
        }
        title={
          isCa
            ? "Reconstrucció espacial de cel·les directament al navegador"
            : isEn
              ? "Spatial cell reconstruction executed client-side"
              : "Reconstrucción espacial de celdas directamente en el navegador"
        }
        description={
          isCa
            ? "BreadPDF agrupa els caràcters segons les seves coordenades X/Y a la pàgina per generar el full XLSX sense que les teves dades financeres viatgin a servidors de càlcul remots."
            : isEn
              ? "BreadPDF clusters characters based on horizontal and vertical coordinates to generate clean XLSX workbooks without uploading financial sheets to remote servers."
              : "BreadPDF agrupa los caracteres según sus coordenadas X/Y en la página para generar la hoja XLSX sin que tus datos financieros viajen a servidores remotos."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Por qué no siempre se convierte bien */}
        <section aria-labelledby="why-tables-fail">
          <h2 id="why-tables-fail" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Per què una taula PDF no sempre es converteix bé a Excel?"
              : isEn
                ? "Why Do PDF Tables Fail to Convert Cleanly into Excel?"
                : "¿Por qué una tabla PDF no siempre se convierte bien a Excel?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Per comprendre els desafiaments de la conversió, cal atendre a l'arquitectura del format PDF (ISO 32000). A diferència d'un full XLSX, que emmagatzema una matriu matemàtica de cel·les (fila 4, columna C), un fitxer PDF és un llenç d'instruccions de dibuix gràfic:"
              : isEn
                ? "To understand conversion obstacles, consider the architecture of the ISO 32000 PDF standard. Unlike an XLSX workbook that organizes content into addressed cells (Row 4, Column C), a PDF is a visual rendering canvas defined by graphic drawing instructions:"
                : "Para comprender los desafíos de la conversión, es necesario atender a la arquitectura del estándar PDF (ISO 32000). A diferencia de una hoja XLSX, que almacena una matriz matemática de celdas (Fila 4, Columna C), un archivo PDF es un lienzo de instrucciones de dibujo gráfico:"}
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  {isCa ? "DISSENY GRÀFIC" : isEn ? "GRAPHIC CANVAS" : "DISEÑO GRÁFICO"}
                </span>
                <h3 className="text-[18px] font-bold text-blue-400 mt-0.5">
                  PDF Visual (Coordenades X/Y)
                </h3>
                <p className="text-[13px] text-slate-300 mt-1 max-w-xs">
                  Textos independents col·locats en punts físics del full. No hi ha cel·les ni
                  columnes natives.
                </p>
              </div>
              <div className="text-2xl font-mono text-emerald-400">≠</div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  {isCa ? "MATRIU DE DADES" : isEn ? "DATA MATRIX" : "MATRIZ DE DATOS"}
                </span>
                <h3 className="text-[18px] font-bold text-emerald-400 mt-0.5">
                  Full Excel Estructurat (.XLSX)
                </h3>
                <p className="text-[13px] text-slate-300 mt-1 max-w-xs">
                  Quadrícula relacional de cel·les amb tipus de dada (número, data, text) i fórmules
                  actives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Opciones de conversión */}
        <section className="mt-10" aria-labelledby="conversion-options">
          <h2 id="conversion-options" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Com convertir les teves taules a fulls de càlcul"
              : isEn
                ? "How to Convert Your PDF Tables into Workbooks"
                : "Cómo convertir tus tablas a hojas de cálculo"}
          </h2>

          <div className="mt-5 space-y-4">
            {/* Opción 1: PDF a Excel */}
            <GuideStep
              stepNumber={1}
              badge={
                isCa
                  ? "Opció 1 (Taules Extenses)"
                  : isEn
                    ? "Option 1 (Full Tables)"
                    : "Opción 1 (Tablas Extensas)"
              }
              title={
                isCa
                  ? "Convertir PDF a Excel (.xlsx)"
                  : isEn
                    ? "Convert PDF to Excel (.xlsx)"
                    : "Convertir PDF a Excel (.xlsx)"
              }
            >
              <p>
                {isCa
                  ? "És la via principal per a balanços de sumes i saldos, llistats de vendes o extractes amb múltiples columnes. BreadPDF agrupa fragments segons les coordenades espacials."
                  : isEn
                    ? "The primary workflow for multi-column balance sheets or transaction logs. Clusters character streams to regenerate the grid."
                    : "Es la vía principal para balances de sumas y saldos, listados o extractos con múltiples columnas. Agrupa fragmentos según sus coordenadas espaciales."}
              </p>
            </GuideStep>

            {/* Central Tool CTA: PDF a Excel */}
            <GuideCTA
              to={toolPath(locale, "pdf-a-excel")}
              eyebrow={isCa ? "Eina Principal" : isEn ? "Primary Tool" : "Herramienta Principal"}
              title={
                isCa
                  ? "Convertir PDF a Excel a BreadPDF"
                  : isEn
                    ? "Convert PDF to Excel with BreadPDF"
                    : "Convertir PDF a Excel en BreadPDF"
              }
              description={
                isCa
                  ? "Genera fulls de càlcul XLSX o arxius CSV delimitats per comes processant tot el document a la memòria local del teu navegador."
                  : isEn
                    ? "Generate native XLSX workbooks or CSV exports processing the document directly inside your local browser memory."
                    : "Genera libros de Excel XLSX estándar o archivos CSV delimitados procesando todo el documento en la memoria local de tu navegador."
              }
              buttonText={
                isCa
                  ? "Convertir PDF a Excel ara"
                  : isEn
                    ? "Convert PDF to Excel now"
                    : "Convertir PDF a Excel ahora"
              }
              icon={<FileSpreadsheet className="size-4" />}
              variant="solid-red"
            />

            {/* Opción 2: Extraer datos */}
            <GuideStep
              stepNumber={2}
              badge={
                isCa
                  ? "Opció 2 (Dades Clau)"
                  : isEn
                    ? "Option 2 (Key Values)"
                    : "Opción 2 (Datos Clave)"
              }
              title={
                isCa
                  ? "Extreure dades estructurades"
                  : isEn
                    ? "Extract Structured Key Fields"
                    : "Extraer datos estructurados"
              }
              action={
                <Link
                  to={toolPath(locale, "extraer-datos")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9302C] hover:underline"
                >
                  <TableProperties className="size-4" />
                  {isCa
                    ? "Extreure dades a BreadPDF"
                    : isEn
                      ? "Extract Data with BreadPDF"
                      : "Extraer datos en BreadPDF"}
                </Link>
              }
            >
              <p>
                {isCa
                  ? "Quan no necessites reproduir la taula completa sinó rescatar valors aïllats (totals, dates, NIFs), l'eina d'extracció analitza patrons i els exporta en JSON o CSV."
                  : isEn
                    ? "When targeting discrete fields rather than layouts (totals, dates, tax IDs), the data extractor isolates structured key-value patterns."
                    : "Cuando no necesitas la tabla completa sino rescatar valores clave (totales, fechas, NIFs), la herramienta extrae patrones semánticos hacia JSON o CSV."}
              </p>
            </GuideStep>

            {/* Opción 3: Si está escaneado */}
            <GuideStep
              stepNumber={3}
              badge={
                isCa ? "Si el PDF està escanejat" : isEn ? "If Scanned" : "Si el PDF está escaneado"
              }
              title={
                isCa
                  ? "Flux en dues etapes: OCR primer i després Excel"
                  : isEn
                    ? "Two-Stage Pipeline: OCR First, Then Excel"
                    : "Flujo en dos etapas: OCR primero y luego Excel"
              }
              action={
                <Link
                  to={toolPath(locale, "ocr-pdf")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9302C] hover:underline"
                >
                  <ScanText className="size-4" />
                  {isCa
                    ? "Aplicar OCR de PDF primer"
                    : isEn
                      ? "Apply PDF OCR First"
                      : "Aplicar OCR de PDF primero"}
                </Link>
              }
            >
              <p>
                {isCa
                  ? "Si intentes passar un PDF escanejat directament a Excel, el fitxer estarà buit. Aplica OCR primer per afegir la capa de text i converteix després a full de càlcul."
                  : isEn
                    ? "Converting flat scanned images directly produces empty sheets. Run OCR first to build text coordinates before converting to spreadsheet."
                    : "Si intentas pasar un PDF escaneado directamente a Excel, el archivo estará vacío. Aplica OCR primero para generar texto y convierte después a Excel."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section 3: Errores comunes */}
        <section className="mt-10" aria-labelledby="pitfalls">
          <h2 id="pitfalls" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Errors freqüents en convertir taules a Excel"
              : isEn
                ? "Common Mistakes in PDF Table Conversion"
                : "Errores frecuentes al convertir tablas a Excel"}
          </h2>
          <div className="mt-4 space-y-3 text-[14.5px]">
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/70 p-4 text-red-950">
              <AlertTriangle className="size-4.5 text-[#C9302C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">
                  {isCa
                    ? "No recalcular els totals amb fórmules:"
                    : isEn
                      ? "Failing to verify column sums with =SUM():"
                      : "No recalcular los totales con fórmulas:"}
                </strong>{" "}
                <span>
                  {isCa
                    ? "Ometre la comprovació aritmètica del saldo total abans d'utilitzar les dades en informes."
                    : isEn
                      ? "Omitting an arithmetic cross-check of balances before filing financial reports."
                      : "Omitir la comprobación aritmética del total general antes de presentar informes financieros."}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/70 p-4 text-red-950">
              <AlertTriangle className="size-4.5 text-[#C9302C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">
                  {isCa
                    ? "Confondre punt i coma decimal:"
                    : isEn
                      ? "Mismatched decimal dots and commas:"
                      : "Confundir punto y coma decimal:"}
                </strong>{" "}
                <span>
                  {isCa
                    ? "Si Excel interpreta '1.500' com el número mil cinc-cents en lloc d'un enter i mig, els càlculs posteriors es distorsionaran."
                    : isEn
                      ? "If Excel evaluates European decimals as thousands groupings, subsequent formulas will miscalculate."
                      : "Si Excel interpreta '1.500' como mil quinientos en lugar de uno con cincuenta, las sumas se distorsionarán por completo."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre taules PDF i Excel"
              : isEn
                ? "Frequently Asked Questions about PDF Tables & Excel"
                : "Preguntas frecuentes sobre tablas PDF y Excel"
          }
          faqs={faqs}
        />

        {/* Sources & Privacy */}
        <GuideFooterSources
          title={
            isCa
              ? "Privacitat en documents financers i fonts tècniques"
              : isEn
                ? "Financial Data Privacy & Technical Verification"
                : "Privacidad en documentos financieros y fuentes técnicas"
          }
        >
          <p>
            {isCa
              ? "A BreadPDF, les eines de conversió a Excel, extracció de dades i OCR s'executen localment a la memòria del teu navegador mitjançant WebAssembly. Els teus documents financers no es transfereixen a servidors de càlcul remots."
              : isEn
                ? "At BreadPDF, the Excel converter, data extractor, and OCR engine execute entirely in client browser memory via WebAssembly without cloud data transmissions."
                : "En BreadPDF, las herramientas de conversión a Excel, extracción de datos y OCR se ejecutan localmente en la memoria de tu propio navegador web mediante WebAssembly sin transferir archivos a servidores remotos."}
          </p>
        </GuideFooterSources>
      </div>
    </article>
  );
}
