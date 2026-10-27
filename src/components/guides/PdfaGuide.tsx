import { Link } from "@tanstack/react-router";
import { Archive, AlertTriangle, FileCheck2 } from "lucide-react";
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

export function PdfaGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<Archive className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Arxiu, Administració & Normativa"
            : isEn
              ? "Archiving, Compliance & Standards"
              : "Archivo, Administración & Normativa"
        }
        subtitle={
          isCa
            ? "PDF/A és una família d'especificacions tècniques estandarditzades per l'ISO dissenyada per assegurar la preservació i reproductibilitat exacta de documents a llarg termini. No és un format comprimit: és un conjunt de restriccions estrictes perquè un expedient segueixi sent llegible dècades després."
            : isEn
              ? "PDF/A is an ISO-standardized family of technical specifications engineered for long-term preservation and exact visual reproduction. It is not compression: it is a set of strict constraints ensuring institutional records remain readable decades into the future."
              : "PDF/A es una familia de especificaciones técnicas estandarizadas por ISO diseñada para asegurar la preservación y reproducibilidad exacta de documentos a largo plazo. No es un formato comprimido: es un conjunto de restricciones estrictas para que un expediente siga siendo legible décadas después."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Principi clau: Conversió tècnica ≠ Certificació formal"
            : isEn
              ? "Core Principle: Technical Conversion ≠ Formal Certification"
              : "Principio clave: Conversión técnica ≠ Certificación formal",
          description: isCa
            ? "BreadPDF estandarditza el document inserint metadades XMP ISO (ISO 19005-1) i neutralitzant fluxos dinàmics. Cap eina web pot garantir que qualsevol organisme accepti el fitxer: comprova sempre el perfil exacte i validador que demana el destinatari."
            : isEn
              ? "BreadPDF standardizes documents injecting ISO XMP metadata (ISO 19005-1) and neutralizing dynamic streams. No web tool guarantees universal agency acceptance: always verify the required variant profile with receiving authorities."
              : "BreadPDF estandariza el documento inyectando metadatos XMP ISO (ISO 19005-1) y neutralizando flujos dinámicos. Ninguna herramienta web garantiza que cualquier organismo acepte el archivo: comprueba siempre el perfil exacto y validador exigido.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/que-es-pdfa-cuando-convertir.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "Qué es PDF/A y cuándo convertir"}
        caption={
          isCa
            ? "Diagrama metodològic: distinció entre requisits normatius, conversió tècnica i validació formal."
            : isEn
              ? "Methodological diagram: distinguishing regulatory requirements, technical conversion, and institutional validation."
              : "Diagrama metodológico: distinción entre requisitos normativos, conversión técnica y validación formal."
        }
      />

      {/* Mascota Pensando (Normativa ISO / Preservación histórica / Rigor técnico) */}
      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa
            ? "Estàndards ISO & Arxiu"
            : isEn
              ? "ISO Standards & Archiving"
              : "Estándares ISO & Archivo"
        }
        title={
          isCa
            ? "Preservació digital exacta conforme a la norma ISO 19005"
            : isEn
              ? "Digital preservation conforming precisely to ISO 19005"
              : "Preservación digital exacta conforme a la norma ISO 19005"
        }
        description={
          isCa
            ? "La conversió estandarditza el document injectant metadades d'arxiu històric i neutralitzant enllaços o scripts dinàmics per garantir la seva reproductibilitat inalterable."
            : isEn
              ? "Conversion standardizes records by injecting historical archival metadata and neutralizing external scripts to guarantee uncorrupted future rendering."
              : "La conversión estandariza el documento inyectando metadatos de archivo histórico y neutralizando scripts dinámicos para garantizar su reproducibilidad inalterable."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: PDF vs PDF/A */}
        <section aria-labelledby="pdf-vs-pdfa">
          <h2 id="pdf-vs-pdfa" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "¿Quina diferència hi ha entre un PDF convencional i un PDF/A?"
              : isEn
                ? "What Is the Difference Between a Standard PDF and PDF/A?"
                : "¿Qué diferencia hay entre un PDF convencional y un PDF/A?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Un document PDF estàndard està optimitzat per a la comoditat del dia a dia: pot enllaçar recursos externs, incorporar camps de formulari interactius amb JavaScript o dependre de fonts instal·lades al teu ordinador. PDF/A exigeix que tot el necessari estigui autocontingut a l'arxiu:"
              : isEn
                ? "A standard PDF is engineered for everyday versatility: external links, dynamic JavaScript forms, or system fonts. PDF/A strictly demands self-containment:"
                : "Un documento PDF estándar está optimizado para la comodidad del día a día: enlaces externos, formularios con JavaScript o fuentes del sistema. PDF/A exige que todo esté estrictamente autocontenido en el archivo:"}
          </p>

          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead className="bg-slate-50 text-[#0F172A] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">
                    {isCa ? "Característica" : isEn ? "Feature" : "Característica"}
                  </th>
                  <th className="p-3.5">
                    {isCa ? "PDF Estàndard" : isEn ? "Standard PDF" : "PDF Estándar"}
                  </th>
                  <th className="p-3.5">
                    {isCa
                      ? "PDF/A (Arxiu ISO)"
                      : isEn
                        ? "PDF/A (ISO Archive)"
                        : "PDF/A (Archivo ISO)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Fonts tipogràfiques</td>
                  <td className="p-3.5">Poden no estar incrustades (dependents del sistema)</td>
                  <td className="p-3.5 font-medium text-emerald-900 bg-emerald-50/50">
                    Incrustació 100% obligatòria de tots els glifs
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Espais de color</td>
                  <td className="p-3.5">Dispositiu dependent sense calibrar</td>
                  <td className="p-3.5 font-medium text-emerald-900 bg-emerald-50/50">
                    Definició de color estandarditzada independent
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Contingut dinàmic</td>
                  <td className="p-3.5">Permès (àudio, vídeo, JavaScript interactiu)</td>
                  <td className="p-3.5 font-medium text-emerald-900 bg-emerald-50/50">
                    Completament prohibit (només representació estàtica)
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Xifrat amb clau</td>
                  <td className="p-3.5">Permès mitjançant contrasenya d'usuari</td>
                  <td className="p-3.5 font-medium text-emerald-900 bg-emerald-50/50">
                    Prohibit (impedeix la preservació a llarg termini)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Cuándo es obligatorio */}
        <section className="mt-10" aria-labelledby="when-mandatory">
          <h2 id="when-mandatory" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "¿Quan és obligatori utilitzar PDF/A?"
              : isEn
                ? "When Is PDF/A Mandatory?"
                : "¿Cuándo es obligatorio utilizar PDF/A?"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-[14.5px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <strong className="text-[#0F172A] font-bold block">
                {isCa
                  ? "• Seus electròniques de l'Administració:"
                  : isEn
                    ? "• Public Administration Portals:"
                    : "• Sedes electrónicas de la Administración:"}
              </strong>
              <span className="text-slate-600 mt-1 block">
                Licitacions, tràmits oficials i dipòsits de memòries que apliquen l'Esquema Nacional
                d'Interoperabilitat.
              </span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <strong className="text-[#0F172A] font-bold block">
                {isCa
                  ? "• Procediments judicials i tribunals:"
                  : isEn
                    ? "• Court Systems and Registries:"
                    : "• Procedimientos judiciales y tribunales:"}
              </strong>
              <span className="text-slate-600 mt-1 block">
                Sistemes com LexNET o seus judicials que exigeixen formats estables per incorporar
                als autos.
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Central Red CTA */}
        <GuideCTA
          to={toolPath(locale, "pdf-a-pdfa")}
          eyebrow={
            isCa
              ? "Eina Principal BreadPDF"
              : isEn
                ? "Primary Tool"
                : "Herramienta Principal BreadPDF"
          }
          title={
            isCa
              ? "Convertir PDF a PDF/A a BreadPDF"
              : isEn
                ? "Convert PDF to PDF/A on BreadPDF"
                : "Convertir PDF a PDF/A en BreadPDF"
          }
          description={
            isCa
              ? "Injecta metadades ISO XMP (ISO 19005-1), neutralitza dependències externes i preserva l'estructura documental directament al navegador."
              : isEn
                ? "Inject ISO XMP metadata (ISO 19005-1), neutralize dynamic streams, and condition document syntax locally in your browser."
                : "Inyecta metadatos ISO XMP (ISO 19005-1), neutraliza dependencias externas y preserva la estructura documental directamente en tu navegador."
          }
          buttonText={
            isCa
              ? "Convertir a PDF/A ara"
              : isEn
                ? "Convert to PDF/A now"
                : "Convertir a PDF/A ahora"
          }
          icon={<FileCheck2 className="size-4" />}
          variant="solid-red"
        />

        {/* Section 4: Errores comunes */}
        <section className="mt-10" aria-labelledby="pitfalls">
          <h2 id="pitfalls" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Errors freqüents que cal evitar amb PDF/A"
              : isEn
                ? "Common Mistakes with PDF/A"
                : "Errores frecuentes que conviene evitar con PDF/A"}
          </h2>
          <div className="mt-4 space-y-3 text-[14.5px]">
            <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4 text-red-950">
              <strong className="block font-semibold">
                {isCa
                  ? "1. Assumir que qualsevol PDF/A és vàlid per a qualsevol organisme:"
                  : isEn
                    ? "1. Assuming any PDF/A variant works everywhere:"
                    : "1. Asumir que cualquier PDF/A es válido para cualquier organismo:"}
              </strong>
              <span className="text-slate-600 mt-1 block">
                {isCa
                  ? "Un jutjat pot exigir PDF/A-1b mentre que un repositori pot demanar PDF/A-2u. Revisa la variant concreta."
                  : isEn
                    ? "A court may require PDF/A-1b while a repository asks for PDF/A-2u. Always check requirements."
                    : "Un juzgado puede exigir PDF/A-1b mientras que un repositorio puede pedir PDF/A-2u. Revisa la variante concreta."}
              </span>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-amber-950">
              <strong className="block font-semibold">
                {isCa
                  ? "2. Confondre PDF/A amb signatura digital qualificada:"
                  : isEn
                    ? "2. Confusing PDF/A with a digital certificate signature:"
                    : "2. Confundir PDF/A con firma digital cualificada:"}
              </strong>
              <span className="text-slate-600 mt-1 block">
                {isCa
                  ? "PDF/A és un format de fitxer; la signatura amb certificat és un procediment criptogràfic d'autoria."
                  : isEn
                    ? "PDF/A is a file format; a certificate signature (PKI) validates legal identity. They are distinct."
                    : "PDF/A es un formato de archivo; la firma con certificado es un procedimiento criptográfico de autoría."}
              </span>
            </div>
          </div>
        </section>

        {/* Section 5: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre PDF/A"
              : isEn
                ? "Frequently Asked Questions About PDF/A"
                : "Preguntas frecuentes sobre PDF/A"
          }
          faqs={faqs}
        />

        {/* Sources */}
        <GuideFooterSources
          title={
            isCa
              ? "Fonts tècniques i normatives consultades"
              : isEn
                ? "Primary Standards & Technical References"
                : "Fuentes técnicas y normativas consultadas"
          }
          sources={[
            {
              organization: "ISO 19005-1 / ISO 19005-2",
              title: "Electronic document file format for long-term preservation (PDF/A).",
            },
            {
              organization: "PDF Association",
              title: "PDF/A Competence Center Technical Notes and Implementation Guides.",
            },
            {
              organization: "Esquema Nacional de Interoperabilidad (ENI)",
              title: "Guía de aplicación de la Norma Técnica de Documento Electrónico.",
            },
          ]}
        />
      </div>
    </article>
  );
}
