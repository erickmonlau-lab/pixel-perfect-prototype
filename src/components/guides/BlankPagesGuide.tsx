import { Link } from "@tanstack/react-router";
import {
  FileSearch,
  RotateCw,
  Trash2,
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

export function BlankPagesGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="mx-auto max-w-[860px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<FileSearch className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Digitalització & Neteja Documental"
            : isEn
            ? "Digitization & Document Cleaning"
            : "Digitalización & Limpieza Documental"
        }
        subtitle={
          isCa
            ? "En digitalitzar documents amb alimentador automàtic (ADF) a doble cara, apareixen pàgines buides quan les fulles originals només estaven impreses per l'anvers. Eliminar aquests reversos alleugereix el document, facilita la lectura i accelera l'OCR."
            : isEn
            ? "Scanning physical records with an ADF feeder in duplex mode causes blank pages whenever original sheets are single-sided. Purging unprinted reverses declutters files and speeds up downstream OCR."
            : "Al digitalizar documentos con alimentador automático (ADF) a doble cara, aparecen páginas vacías cuando las hojas originales solo estaban impresas por una cara. Eliminar estos reversos aligera el documento y acelera el OCR."
        }
        notice={{
          variant: "brand",
          title:
            isCa
              ? "Principi tècnic: detecció per anàlisi de píxels, no semàntica"
              : isEn
              ? "Core Principle: Pixel Luminance Analysis, Not Semantic Understanding"
              : "Principio técnico: detección por análisis de píxeles, no semántica",
          description:
            isCa
              ? "BreadPDF avalua la densitat de píxels gairebé blancs mitjançant un llindar percentual configurable (97%). La revisió humana és indispensable: cap programari sap si una fulla en blanc actuava com a separador intencionat o conté un segell tènue."
              : isEn
              ? "BreadPDF evaluates near-white pixel density against an adjustable threshold (97%). Visual auditing remains mandatory: software cannot discern if a leaf was an intentional chapter separator or holds a faint notary stamp."
              : "BreadPDF evalúa la densidad de píxeles casi blancos mediante un umbral configurable (97%). La revisión humana es indispensable: ningún software sabe si una hoja en blanco actuaba como separador intencionado o contiene un sello tenue.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/eliminar-paginas-en-blanco-pdf-escaneado.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "Eliminar páginas en blanco de PDF escaneado"}
        caption={
          isCa
            ? "Diagrama metodològic: escaneig dúplex amb ADF, detecció per llindar de píxels i obtenció del PDF net."
            : isEn
            ? "Methodological diagram: duplex ADF scanning, pixel threshold evaluation, and clean PDF compilation."
            : "Diagrama metodológico: escaneo dúplex con ADF, detección por umbral de píxeles y obtención del PDF limpio."
        }
      />

      {/* Mascota Celebrando (Limpieza exitosa del documento) */}
      <GuideMascotCallout
        variant="celebrate"
        background="red"
        badge={isCa ? "Neteja de Document" : isEn ? "Document Cleanup" : "Limpieza de Documento"}
        title={
          isCa
            ? "Document net de pàgines buides en segons"
            : isEn
            ? "Pristine, blank-free documents compiled in seconds"
            : "Documento limpio de páginas vacías en segundos"
        }
        description={
          isCa
            ? "Purga automàticament els reversos buits generats per escàners professionals sense pujar documents a servidors externs."
            : isEn
            ? "Automatically purge vacant reverse sheets created by duplex scanners directly in your browser without cloud uploads."
            : "Purga automáticamente los reversos vacíos generados por escáneres profesionales sin subir tus documentos a servidores externos."
        }
      />

      {/* Main Content Body */}
      <div className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section: Metodología */}
        <section aria-labelledby="methodology">
          <h2 id="methodology" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa ? "Com funciona el motor de detecció de BreadPDF" : isEn ? "How the BreadPDF Detection Engine Works" : "Cómo funciona el motor de detección de BreadPDF"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "BreadPDF analitza el vector de dades RGBA de cada pàgina comprovant si els píxels superen el llindar de blanc (240). Si la proporció de píxels blancs iguala o supera el llindar establert, la pàgina s'afegeix a la llista d'extirpació."
              : isEn
              ? "BreadPDF inspects RGBA pixel buffers to evaluate whether pixel color values surpass the white threshold (240). If the quotient matches your sensitivity target, the page is flagged for exclusion."
              : "BreadPDF analiza el vector de datos RGBA de cada página comprobando si los píxeles superan el umbral de blanco (240). Si la proporción de píxeles blancos supera el porcentaje fijado, la página se excluye."}
          </p>
        </section>

        {/* Section: Paso a paso con CTA */}
        <section aria-labelledby="step-by-step" className="mt-10">
          <h2 id="step-by-step" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa ? "Com netejar el document pas a pas" : isEn ? "Step-by-Step Document Cleaning Workflow" : "Cómo limpiar el documento paso a paso"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              title={isCa ? "Carga el fitxer escanejat" : isEn ? "Upload Your Scanned Document" : "Carga el archivo escaneado"}
            >
              <p>
                {isCa
                  ? "Arrossega el document al navegador. Comprova a la vista prèvia el nombre inicial de pàgines."
                  : isEn
                  ? "Drag and drop the document into the web workspace to inspect the initial page count."
                  : "Arrastra el documento al navegador. Comprueba en la vista previa el número inicial de páginas."}
              </p>
            </GuideStep>

            {/* Central Red CTA: Eliminar páginas en blanco */}
            <GuideCTA
              to={toolPath(locale, "eliminar-paginas-en-blanco")}
              eyebrow={isCa ? "Eina Principal BreadPDF" : isEn ? "Primary Tool" : "Herramienta Principal BreadPDF"}
              title={isCa ? "Eliminar pàgines en blanc a BreadPDF" : isEn ? "Remove Blank Pages on BreadPDF" : "Eliminar páginas en blanco en BreadPDF"}
              description={
                isCa
                  ? "Detecta i purga automàticament els reversos buits del teu PDF escanejat amb sensibilitat ajustable (per defecte 97%)."
                  : isEn
                  ? "Automatically detect and purge unprinted reverse scans from your PDF with customizable sensitivity (default 97%)."
                  : "Detecta y purga automáticamente los reversos vacíos de tu PDF escaneado con sensibilidad ajustable (por defecto 97%)."
              }
              buttonText={isCa ? "Obrir eina ara" : isEn ? "Open tool now" : "Abrir herramienta ahora"}
              icon={<FileSearch className="size-4" />}
              variant="solid-red"
            />

            <GuideStep
              stepNumber={2}
              title={isCa ? "Elimina pàgines amb contingut manualment" : isEn ? "Remove Pages with Content Manually" : "Elimina páginas con contenido manualmente"}
              action={
                <Link
                  to={toolPath(locale, "eliminar-paginas-pdf")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#EC3C2D] hover:underline"
                >
                  <Trash2 className="size-4" />
                  <span>{isCa ? "Eliminar pàgines de PDF" : isEn ? "Delete PDF Pages" : "Eliminar páginas de PDF"}</span>
                </Link>
              }
            >
              <p>
                {isCa
                  ? "Si vols suprimir fulls que tenen text (portades antigues, esborranys o duplicats), utilitza la selecció manual de pàgines."
                  : isEn
                  ? "If you need to excise leaves that contain text (old drafts, duplicate covers), use manual page deletion."
                  : "Si quieres suprimir hojas que tienen texto (portadas viejas, borradores o duplicados), utiliza la selección manual de páginas."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section: FAQ Accordion */}
        <GuideFAQ
          title={isCa ? "Preguntes freqüents sobre la neteja de pàgines en blanc" : isEn ? "Frequently Asked Questions" : "Preguntas frecuentes sobre la limpieza de páginas en blanco"}
          faqs={faqs}
        />

        {/* Sources */}
        <GuideFooterSources
          title={isCa ? "Fonts tècniques i documentació de referència" : isEn ? "Technical Documentation & Reference Sources" : "Fuentes técnicas y documentación de referencia"}
        >
          <ul className="space-y-1.5 list-none pl-0">
            <li><strong>TWAIN Working Group:</strong> Specification on Automatic Blank Page Detection & Threshold Sensitivity in Document Scanners.</li>
            <li><strong>Ricoh / Fujitsu Document Imaging:</strong> PaperStream IP Technical Guide — Blank Page Detection Thresholding.</li>
          </ul>
        </GuideFooterSources>
      </div>
    </article>
  );
}
