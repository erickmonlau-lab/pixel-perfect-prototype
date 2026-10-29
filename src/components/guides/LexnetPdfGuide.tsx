import { Link } from "@tanstack/react-router";
import { Scale, FileText, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink, Scissors, Minimize2, ScanText, Layers } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { type GuideDefinition } from "@/lib/guides/registry";
import { toolPath } from "@/lib/i18n/routing";
import {
  GuideHero,
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

export function LexnetPdfGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<Scale className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Justícia Digital & LexNET (Espanya)"
            : isEn
              ? "Digital Justice & LexNET (Spain)"
              : "Justicia Digital & LexNET (España)"
        }
        subtitle={
          isCa
            ? "Presentar escrits i documents a la plataforma judicial LexNET requereix complir requisits tècnics estrictes de format, text cercable (OCR), límits de mida i signatura electrònica. Aquesta guia detalla el flux operatiu per evitar rebutjos a la seu judicial electrònica."
            : isEn
              ? "Submitting court pleadings and evidence into the Spanish judicial LexNET system demands strict compliance with technical file format specifications, text searchability (OCR), size ceilings, and digital signature rules. Avoid filing rejections with this verified workflow."
              : "Presentar escritos y documentos en la plataforma judicial LexNET requiere cumplir requisitos técnicos estrictos de formato, texto buscable (OCR), límites de peso y firma electrónica. Esta guía detalla el flujo operativo para evitar rechazos en la sede judicial electrónica."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Regla d'or tècnica: Els ajustos de format s'han de fer SEMPRE abans de signar"
            : isEn
              ? "Golden Technical Rule: All PDF adjustments must be executed PRIOR to digital signing"
              : "Regla de oro técnica: Los ajustes de formato deben realizarse SIEMPRE antes de firmar",
          description: isCa
            ? "Si modifiques, comprimeixes, divideixes o aplanes un PDF després d'haver-lo signat amb el teu certificat digital o AutoFirma, la signatura criptogràfica quedarà invalidada i LexNET rebutjarà l'enviament."
            : isEn
              ? "Modifying, compressing, splitting, or flattening a PDF after it has been cryptographically signed via your digital certificate or AutoFirma breaks the signature hash and triggers rejection in LexNET."
              : "Si modificas, comprimes, divides o aplanas un PDF después de haberlo firmado con tu certificado digital o AutoFirma, la firma criptográfica quedará invalidada y LexNET rechazará la presentación.",
        }}
      />

      {/* Mascota Info Callout */}
      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa
            ? "Preparació Processal Segura"
            : isEn
              ? "Procedural Filing Prep"
              : "Preparación Procesal Segura"
        }
        title={
          isCa
            ? "Prepara els teus documents judicials al navegador sense pujar-los a servidors"
            : isEn
              ? "Prepare judicial dockets locally in your browser with zero server uploads"
              : "Prepara tus documentos judiciales en el navegador sin subirlos a servidores"
        }
        description={
          isCa
            ? "A BreadPDF el processament d'escrits confidencials, demandes o documents d'identitat s'executa estrictament a la memòria del teu equip mitjançant WebAssembly. Cap dada processal viatja a servidors de tercers."
            : isEn
              ? "At BreadPDF, sensitive client records, court pleadings, and confidential discovery materials process strictly inside client memory via WebAssembly without uploading files to remote servers."
              : "En BreadPDF el procesamiento de escritos procesales, demandas o documentos confidenciales se ejecuta estrictamente en la memoria de tu equipo mediante WebAssembly. Ningún dato judicial viaja a servidores externos."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Marco normativo oficial */}
        <section aria-labelledby="lexnet-legal-framework">
          <h2 id="lexnet-legal-framework" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Marc normatiu aplicable a LexNET: Reial Decret 1065/2015"
              : isEn
                ? "Regulatory Framework for LexNET: Royal Decree 1065/2015"
                : "Marco normativo aplicable a LexNET: Real Decreto 1065/2015"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "La presentació telemàtica d'escrits i documents davant l'Administració de Justícia a Espanya està regulada per la Llei 18/2011, la Llei 1/2000 d'Enjudiciament Civil (LEC) i, especialment, pel Reial Decret 1065/2015, de 27 de novembre. Aquest marc estableix distincions tècniques essencials entre l'escrit principal i els documents que l'acompanyen:"
              : isEn
                ? "Electronic court submissions across the Spanish judicial administration are governed by Law 18/2011, the Civil Procedure Act (LEC), and specifically Royal Decree 1065/2015. This regulatory framework establishes precise technical distinctions between the primary pleading and accompanying documentary evidence:"
                : "La presentación telemática de escritos y documentos ante la Administración de Justicia en España está regulada por la Ley 18/2011, la Ley 1/2000 de Enjuiciamiento Civil (LEC) y, de forma específica, por el Real Decreto 1065/2015, de 27 de noviembre. Este marco impone distinciones técnicas esenciales entre el escrito principal y los documentos adjuntos:"}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">DOCUMENT PRINCIPAL</span>
              <h3 className="text-[17px] font-bold text-slate-900 mt-1">Escrit o Demanda</h3>
              <ul className="mt-2 text-[14px] text-slate-600 space-y-1.5 list-disc pl-4">
                <li>
                  {isCa
                    ? "Ha de ser un document PDF generat electrònicament (no un escaneig d'un paper imprès)."
                    : isEn
                      ? "Must be a native PDF generated electronically directly from word processors (not a flat scan of printed paper)."
                      : "Debe ser un documento PDF generado electrónicamente de forma directa (no un escaneo de un papel impreso)."}
                </li>
                <li>
                  {isCa
                    ? "El text ha de ser plenament seleccionable i indexable (capa de text activa per cercar)."
                    : isEn
                      ? "Text must be fully selectable and indexable for automated court processing."
                      : "El texto debe ser plenamente seleccionable e indexable (capa de texto activa para búsquedas)."}
                </li>
                <li>
                  {isCa
                    ? "Ha d'anar signat electrònicament amb certificat reconegut del professional (Advocat o Procurador)."
                    : isEn
                      ? "Must be digitally signed using a qualified certificate by the legal representative."
                      : "Debe ir firmado electrónicamente con certificado cualificado del letrado o procurador."}
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">DOCUMENTS ADJUNTS</span>
              <h3 className="text-[17px] font-bold text-slate-900 mt-1">Proves, Poder i Annexos</h3>
              <ul className="mt-2 text-[14px] text-slate-600 space-y-1.5 list-disc pl-4">
                <li>
                  {isCa
                    ? "S'admeten PDF procedents d'escàner, però han d'incorporar resolució adequada (200-300 ppp) i OCR per ser cercables."
                    : isEn
                      ? "Scanned exhibits are accepted but must maintain adequate resolution (200-300 dpi) and OCR text layers."
                      : "Se admiten PDF procedentes de escáner, pero deben incorporar resolución adecuada (200-300 ppp) y OCR."}
                </li>
                <li>
                  {isCa
                    ? "Cada document o grup probatori s'ha de presentar numerat i ordenat correlativament."
                    : isEn
                      ? "Each documentary exhibit must be numbered and named correlatively as cited in the main pleading."
                      : "Cada documento o ramo probatorio debe presentarse numerado y ordenado correlativamente según se cite en el escrito."}
                </li>
                <li>
                  {isCa
                    ? "Si el volum supera el límit del missatge, cal utilitzar el mecanisme d'enviaments vinculats o excessos de cabuda."
                    : isEn
                      ? "If total size exceeds message capacity, submissions must be split across linked supplementary filings."
                      : "Si el volumen supera el límite del mensaje, deben dividirse en envíos complementarios o excesos de cabida."}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Requisitos técnicos verificables */}
        <section className="mt-10" aria-labelledby="technical-specs">
          <h2 id="technical-specs" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Requisits tècnics: PDF/A, límits de mida i resolució"
              : isEn
                ? "Technical Specifications: PDF/A, Size Ceilings & Image Resolutions"
                : "Requisitos técnicos: PDF/A, límites de tamaño y resolución"}
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-[#C9302C]" />
                {isCa ? "És obligatori el format PDF/A?" : isEn ? "Is PDF/A-1b Strictly Mandatory?" : "¿Es obligatorio el formato PDF/A?"}
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600">
                {isCa
                  ? "Les guies del Ministeri de Justícia recomanen el format PDF/A (preservació a llarg termini) per garantir que el document no contingui scripts ni dependències externes. No obstant això, a la pràctica de la majoria d'òrgans judicials, un document PDF estàndard (versió 1.4 a 1.7) és admès sempre que no tingui contrasenyes, estigui correctament signat i contingui text cercable."
                  : isEn
                    ? "Guidelines from the Ministry of Justice recommend the PDF/A standard to guarantee long-term archival stability and eliminate dynamic scripts. However, standard PDF files (v1.4 to v1.7) are routinely accepted across courts provided they carry no password locks, hold searchable text, and are properly signed."
                    : "Las guías técnicas del Ministerio de Justicia recomiendan el formato PDF/A (preservación a largo plazo) para garantizar que el archivo no contenga código ejecutable ni dependencias externas. No obstante, en la práctica procesal diaria, un PDF estándar (versión 1.4 a 1.7) es perfectamente admisible siempre que no tenga contraseñas de apertura, esté debidamente firmado y contenga texto seleccionable."}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-[#C9302C]" />
                {isCa ? "Límits de mida de missatge a LexNET" : isEn ? "Message Size Limits in LexNET" : "Límites de tamaño por mensaje en LexNET"}
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600">
                {isCa
                  ? "El límit tècnic estàndard per missatge a la plataforma LexNET és de 15 MB (ampliat fins a 30 MB en determinats portals o col·legis d'advocats i seus autonòmiques com Justícia de Catalunya o País Basc). Si el teu expedient o prova documental supera aquest llindar, el sistema bloquejarà l'enviament. La solució consisteix a comprimir els fitxers sense perdre resolució de text o dividir els annexos en parts."
                  : isEn
                    ? "The standard technical limit per submission envelope in LexNET is 15 MB (extended up to 30 MB in specific autonomic justice systems such as Catalonia or the Basque Country). If your total package exceeds this threshold, the portal rejects delivery. Legal teams must compress oversized attachments or partition evidence into numbered batches."
                    : "El límite técnico habitual por mensaje en la plataforma LexNET es de 15 MB (ampliado hasta 30 MB en determinados puntos de acceso autonómicos e integraciones colegiales). Si el conjunto de tu demanda y anexos supera este tope, la plataforma rechaza el envío. La solución procesal consiste en optimizar el peso de los documentos o fraccionarlos en envíos complementarios debidamente identificados."}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-[#C9302C]" />
                {isCa ? "Aplanat de formularis i camps interactius" : isEn ? "Form Flattening & Visual Layers" : "Aplanado de formularios y campos interactivos"}
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600">
                {isCa
                  ? "Si el teu document o formulari conté camps emplenables (AcroForms), alguns visors dels jutjats poden mostrar-los buits o generar incompatibilitats en processar la signatura. Aplanar el PDF converteix els camps en text gràfic permanent integrat a la pàgina. Això s'ha de fer abans de procedir a la signatura electrònica amb el certificat."
                  : isEn
                    ? "Interactive AcroForm fields may render blank or cause parsing errors across legacy court workstation viewers. Flattening the PDF merges form entries permanently into the static visual layer of the page. This step must always precede cryptographic certificate signing."
                    : "Si tu documento contiene campos interactivos rellenados (AcroForms), los visores judiciales de tramitación procesal pueden mostrar los campos en blanco o generar errores de visualización. Aplanar el PDF convierte el texto de los campos en parte estática del folio, evitando pérdidas de información. Este paso debe ejecutarse siempre antes de firmar electrónicamente."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Flujo de preparación paso a paso */}
        <section className="mt-10" aria-labelledby="step-by-step-prep">
          <h2 id="step-by-step-prep" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Guia pas a pas per preparar el teu PDF abans de presentar-lo"
              : isEn
                ? "Step-by-Step Document Preparation Workflow for Court Portals"
                : "Guía paso a paso para preparar tu PDF antes de presentarlo"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              badge={isCa ? "Pas 1: Verificació d'indexació" : isEn ? "Step 1: OCR & Searchability" : "Paso 1: Verificación de indexación"}
              title={
                isCa
                  ? "Comprovar que el PDF té text cercable (OCR)"
                  : isEn
                    ? "Verify Document Has Searchable Text (Apply OCR)"
                    : "Comprobar que el PDF contiene texto buscable (Aplicar OCR)"
              }
              action={
                <Link
                  to={toolPath(locale, "ocr-pdf")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9302C] hover:underline"
                >
                  <ScanText className="size-4" />
                  {isCa ? "Aplicar OCR a BreadPDF" : isEn ? "Run OCR with BreadPDF" : "Aplicar OCR en BreadPDF"}
                </Link>
              }
            >
              <p>
                {isCa
                  ? "Obre el teu PDF i prova de seleccionar text amb el ratolí o fer Ctrl+F. Si és un document escanejat on no pots marcar paraules, aplica l'eina d'OCR de BreadPDF per crear la capa de text que exigeix la justícia electrònica."
                  : isEn
                    ? "Open the file and try selecting words or pressing Ctrl+F. If the document is an image scan where text cannot be selected, run BreadPDF OCR to inject the searchable text layer required by court portals."
                    : "Abre el PDF e intenta seleccionar texto con el ratón o pulsar Ctrl+F. Si es un documento escaneado donde no puedes marcar palabras, aplica la herramienta OCR de BreadPDF para generar la capa de texto indexable exigida por LexNET."}
              </p>
            </GuideStep>

            <GuideStep
              stepNumber={2}
              badge={isCa ? "Pas 2: Optimització de pes" : isEn ? "Step 2: File Size Optimization" : "Paso 2: Optimización de peso"}
              title={
                isCa
                  ? "Comprimir sense perdre llegibilitat sota el límit de mida"
                  : isEn
                    ? "Compress Document Under Size Limits While Preserving Clarity"
                    : "Comprimir sin perder legibilidad bajo el límite de peso"
              }
              action={
                <Link
                  to={toolPath(locale, "comprimir-pdf")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9302C] hover:underline"
                >
                  <Minimize2 className="size-4" />
                  {isCa ? "Comprimir PDF a BreadPDF" : isEn ? "Compress PDF with BreadPDF" : "Comprimir PDF en BreadPDF"}
                </Link>
              }
            >
              <p>
                {isCa
                  ? "Si l'escrit o els annexos superen els 15 MB o 30 MB, utilitza la compressió de BreadPDF. Mantén sempre una qualitat visual nítida en signatures, segells o números de compte escanejats per no perjudicar la seva força probatòria."
                  : isEn
                    ? "If attachments exceed 15 MB or 30 MB, compress them locally with BreadPDF. Always inspect the output to ensure signatures, stamps, and small text remain razor-sharp for judicial evaluation."
                    : "Si el archivo supera los 15 MB o 30 MB, optimiza su peso con la herramienta de compresión de BreadPDF. Verifica siempre que las firmas manuscritas escaneadas, sellos o números de cuenta se lean nítidamente."}
              </p>
            </GuideStep>

            <GuideCTA
              to={toolPath(locale, "comprimir-pdf")}
              eyebrow={isCa ? "Eina Recomanada" : isEn ? "Recommended Tool" : "Herramienta Recomendada"}
              title={
                isCa
                  ? "Reduir mida de documents per a LexNET"
                  : isEn
                    ? "Reduce Document Size for Court Submissions"
                    : "Reducir tamaño de documentos para LexNET"
              }
              description={
                isCa
                  ? "Ajusta el pes del teu document al límit admès per la seu judicial sense comprometre la nitidesa del text ni enviar expedients a servidors."
                  : isEn
                    ? "Tune file sizes to meet justice portal limits without compromising typographic clarity or uploading sensitive dockets to the cloud."
                    : "Ajusta el peso de tus escritos y anexos al límite admitido por la sede judicial sin comprometer la nitidez del texto ni enviar expedientes a la nube."
              }
              buttonText={
                isCa ? "Comprimir PDF ara" : isEn ? "Compress PDF now" : "Comprimir PDF ahora"
              }
              icon={<Minimize2 className="size-4" />}
              variant="solid-red"
            />

            <GuideStep
              stepNumber={3}
              badge={isCa ? "Pas 3: Aplanat i conversió" : isEn ? "Step 3: Flattening & Formatting" : "Paso 3: Aplanado y formato"}
              title={
                isCa
                  ? "Aplanar formularis o convertir a PDF/A"
                  : isEn
                    ? "Flatten Forms or Standardize to PDF/A"
                    : "Aplanar formularios o estandarizar a PDF/A"
              }
              action={
                <div className="flex gap-4">
                  <Link
                    to={toolPath(locale, "aplanar-pdf")}
                    className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#C9302C] hover:underline"
                  >
                    <Layers className="size-3.5" />
                    {isCa ? "Aplanar camps" : isEn ? "Flatten form" : "Aplanar campos"}
                  </Link>
                  <Link
                    to={toolPath(locale, "pdf-a-pdfa")}
                    className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#C9302C] hover:underline"
                  >
                    <ShieldCheck className="size-3.5" />
                    {isCa ? "Convertir a PDF/A" : isEn ? "Convert to PDF/A" : "Convertir a PDF/A"}
                  </Link>
                </div>
              }
            >
              <p>
                {isCa
                  ? "Si el teu expedient conté formularis emplenats amb dades de parts o sol·licituds, aplana'ls per fixar el text. Si el jutjat demana expressament format PDF/A, realitza la conversió com a pas previ a la signatura."
                  : isEn
                    ? "If pleadings incorporate filled form fields, flatten them into static pages. If court rules specifically request PDF/A compliance, convert the file before applying your digital signature."
                    : "Si el escrito incluye campos de formulario interactivo con datos procesales, aplánalos para fijar el contenido. Si el órgano judicial solicita expresamente PDF/A, convierte el documento antes de firmarlo."}
              </p>
            </GuideStep>

            <GuideStep
              stepNumber={4}
              badge={isCa ? "Pas 4: Signatura final" : isEn ? "Step 4: Final Cryptographic Sign-Off" : "Paso 4: Firma digital cualificada"}
              title={
                isCa
                  ? "Signar electrònicament amb certificat (AutoFirma / LexNET)"
                  : isEn
                    ? "Sign Digitally via Qualified Certificate (AutoFirma / LexNET Gateway)"
                    : "Firmar electrónicamente con certificado oficial (AutoFirma / LexNET)"
              }
            >
              <p>
                {isCa
                  ? "Un cop el PDF està revisat, comprimit i aplanat, tanca el document i signa'l amb el teu certificat qualificat mitjançant AutoFirma o la pròpia interfície de LexNET. No tornis a obrir-lo per modificar-ne cap pàgina."
                  : isEn
                    ? "Once the PDF is audited, compressed, and flattened, sign it using your qualified PKI certificate through AutoFirma or the LexNET portal interface. Never edit the file afterwards."
                    : "Una vez que el PDF está verificado, con texto indexable, dentro del límite de tamaño y con formularios aplanados, firma el archivo mediante tu certificado profesional cualificado (FNMT, ACA, etc.) con AutoFirma o directamente en el buzón de LexNET. Nunca modifiques el documento con posterioridad."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section 4: Preguntas frecuentes */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre documents per a LexNET i seus judicials"
              : isEn
                ? "Frequently Asked Questions about LexNET & Spanish Court Filings"
                : "Preguntas frecuentes sobre documentos para LexNET y sedes judiciales"
          }
          faqs={faqs}
        />

        {/* Sources & Privacy */}
        <GuideFooterSources
          title={
            isCa
              ? "Fonts oficials del Ministeri de Justícia i normativa vigent"
              : isEn
                ? "Official Sources from Ministry of Justice & Applicable Law"
                : "Fuentes oficiales del Ministerio de Justicia y normativa vigente"
          }
        >
          <div className="space-y-2 text-[14px]">
            <p>
              <a
                href="https://www.boe.es/eli/es/rd/2015/11/27/1065/con"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#C9302C] hover:underline"
              >
                <ExternalLink className="size-3.5" />
                Reial Decret 1065/2015, de 27 de novembre (BOE consolidat)
              </a>
              : Comunicacions telemàtiques a l'Administració de Justícia i sistema LexNET.
            </p>
            <p className="text-slate-500 text-[13px]">
              {isCa
                ? "Avís legal: Aquesta informació té caràcter tècnic i divulgatiu sobre la preparació de documents digitals i no constitueix assessorament jurídic o processal individualitzat."
                : isEn
                  ? "Disclaimer: This guide provides technical best practices for digital document preparation and does not constitute formal procedural or legal advice."
                  : "Aviso legal: Esta guía proporciona orientación técnica sobre la preparación de archivos digitales y no constituye asesoramiento procesal ni jurídico individualizado."}
            </p>
          </div>
        </GuideFooterSources>
      </div>
    </article>
  );
}
