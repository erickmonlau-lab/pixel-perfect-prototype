import { Link } from "@tanstack/react-router";
import { ShieldAlert, FileX2, ShieldOff, Building2, CheckCircle2 } from "lucide-react";
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

export function PrivacySanitizeGuide({ locale, guide }: GuideArticleProps) {
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
            ? "Empreses & Privacitat Documental"
            : isEn
              ? "Business & Document Privacy"
              : "Empresas & Privacidad Documental"
        }
        subtitle={
          isCa
            ? "Compartir contractes, nòmines o informes en format PDF comporta riscos greus si no s'audita el contingut visible i les estructures ocultes de l'arxiu. Aquesta guia detalla com censurar elements gràfics, depurar metadades i sanejar accions automàtiques."
            : isEn
              ? "Sharing contracts, payroll records, or reports in PDF format poses significant privacy risks without inspecting both visible content and hidden file structures. Learn how to redact visuals, strip metadata, and sanitize automated scripts."
              : "Compartir contratos, nóminas o informes en formato PDF entraña riesgos graves si no se audita el contenido visible y las estructuras ocultas del archivo. Esta guía detalla cómo censurar elementos gráficos, depurar metadatos y sanear acciones automáticas."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Avís informatiu: Aquesta guia no constitueix assessorament jurídic"
            : isEn
              ? "Informational Notice: This guide does not constitute formal legal counsel"
              : "Aviso informativo: Esta guía no constituye asesoramiento jurídico personalizado",
          description: isCa
            ? "Censurar elements visibles o esborrar metadades són mesures tècniques preventives. Cap eina informàtica 'anonimitza automàticament' ni garanteix per si sola el compliment de l'RGPD. El compliment legal exigeix anàlisi de context sota la responsabilitat del responsable o encarregat."
            : isEn
              ? "Redacting elements or clearing metadata are practical safeguards. No software tool can 'automatically anonymize' or independently guarantee GDPR compliance. Compliance requires contextual governance under the data controller."
              : "Censurar elementos visibles o borrar metadatos son medidas técnicas preventivas. Ninguna herramienta informática 'anonimiza automáticamente' ni garantiza por sí sola el cumplimiento del RGPD. El cumplimiento legal exige análisis de contexto bajo la responsabilidad del encargado.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/ocultar-datos-personales-pdf.svg"
        alt={
          guide.image?.alt[locale] ||
          guide.image?.alt.es ||
          "Protocolo de revisión de datos personales en PDF"
        }
        caption={
          isCa
            ? "Protocol d'auditoria en tres capes de BreadPDF: censura de capa visual, purga de metadades d'autoria i sanejament d'elements dinàmics."
            : isEn
              ? "BreadPDF three-layer audit protocol: visual content redaction, authorship metadata purge, and automated dynamic elements sanitization."
              : "Protocolo de auditoría en tres capas de BreadPDF: censura de capa visual, purga de metadatos de autoría y saneamiento de elementos dinámicos."
        }
      />

      {/* Mascota Pensando (Análisis de privacidad / Datos sensibles / Rigor) */}
      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa ? "Auditoria de Privacitat" : isEn ? "Privacy Audit" : "Auditoría de Privacidad"
        }
        title={
          isCa
            ? "Censura permanent i purga estructural 100% en memòria local"
            : isEn
              ? "Permanent redaction and structural purge running 100% client-side"
              : "Censura permanente y purga estructural 100% en memoria local"
        }
        description={
          isCa
            ? "Les teves dades personals, NIFs o salaris mai no es transmeten a internet. La sobreescriptura vectorial de caràcters s'executa al navegador, impedint la recuperació del text original."
            : isEn
              ? "Your confidential files, tax numbers, and payroll data never cross the internet. Vector coordinate overwriting runs inside your local browser memory."
              : "Tus datos personales, DNIs o salarios nunca se transmiten por la red. La sobreescritura vectorial de caracteres se ejecuta en el navegador, impidiendo la recuperación del texto original."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Qué deberías revisar */}
        <section aria-labelledby="what-to-inspect">
          <h2 id="what-to-inspect" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Què hauries de revisar abans de compartir un PDF"
              : isEn
                ? "What You Should Inspect Before Sharing a PDF"
                : "Qué deberías revisar antes de compartir un PDF"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "D'acord amb l'article 4.1 de l'RGPD, es considera dada personal qualsevol informació sobre una persona física identificada o identificable. Revisa punts crítics com ara:"
              : isEn
                ? "Under Article 4(1) of the GDPR, personal data encompasses any information relating to an identified or identifiable natural person. Inspect critical elements:"
                : "Conforme al artículo 4.1 del RGPD, se considera dato personal toda información sobre una persona física identificada o identificable. Revisa puntos críticos como:"}
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-3.5 text-[14px]">
            <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-slate-800">
              <CheckCircle2 className="size-4 text-[#C9302C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">
                  {isCa
                    ? "Identificadors oficials:"
                    : isEn
                      ? "Government IDs:"
                      : "Identificadores oficiales:"}
                </strong>{" "}
                <span>DNI, NIE, passaport o número de Seguretat Social.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-slate-800">
              <CheckCircle2 className="size-4 text-[#C9302C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">
                  {isCa
                    ? "Dades de contacte:"
                    : isEn
                      ? "Direct contact data:"
                      : "Datos de contacto directo:"}
                </strong>{" "}
                <span>Correus electrònics personals, telèfons fixos i mòbils.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-slate-800">
              <CheckCircle2 className="size-4 text-[#C9302C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">
                  {isCa
                    ? "Informació financera:"
                    : isEn
                      ? "Financial data:"
                      : "Información financiera y laboral:"}
                </strong>{" "}
                <span>Codis de compte bancari (IBAN), salaris bruts o retencions.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-slate-800">
              <CheckCircle2 className="size-4 text-[#C9302C] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">
                  {isCa
                    ? "Signatures manuscrites:"
                    : isEn
                      ? "Biometric signatures:"
                      : "Firmas biométricas y rúbricas:"}
                </strong>{" "}
                <span>Traços manuscrits escanejats o segells gràfics personals.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Procedimiento de 4 pasos */}
        <section className="mt-10" aria-labelledby="four-step-procedure">
          <h2 id="four-step-procedure" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Procediment de neteja en 4 passos"
              : isEn
                ? "Step-by-Step 4-Stage Sanitization Workflow"
                : "Procedimiento de limpieza en 4 pasos"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              title={
                isCa
                  ? "Pas 1: Identifica la informació que ha d'ocultar-se"
                  : isEn
                    ? "Step 1: Identify Information That Must Be Hidden"
                    : "Paso 1: Identifica la información que debe ocultarse"
              }
            >
              <p>
                {isCa
                  ? "Anota en una llista els termes concrets (cognoms, dígits de document d'identitat o telèfons) que no han de ser visibles."
                  : isEn
                    ? "Prepare an inventory of specific values (surnames, national ID numbers, personal emails) that must not appear in the draft."
                    : "Anota en una lista los términos concretos (apellidos, dígitos de DNI/NIE o teléfonos) que no deben ser visibles."}
              </p>
            </GuideStep>

            {/* Red CTA: Censurar PDF */}
            <GuideCTA
              to={toolPath(locale, "censurar-pdf")}
              eyebrow={
                isCa
                  ? "Censura Visual Permanent"
                  : isEn
                    ? "Permanent Redaction"
                    : "Censura Visual Permanente"
              }
              title={
                isCa
                  ? "Censurar PDF a BreadPDF"
                  : isEn
                    ? "Redact PDF with BreadPDF"
                    : "Censurar PDF en BreadPDF"
              }
              description={
                isCa
                  ? "Traça blocs sòlids opacs permanents sobre cada coincidència. A diferència de pintar a sobre, BreadPDF extirpa els caràcters subjacents."
                  : isEn
                    ? "Render solid opaque masking blocks over every match. BreadPDF permanently excises underlying vector character streams."
                    : "Traza bloques sólidos opacos permanentes sobre cada coincidencia. BreadPDF extirpa los caracteres subyacentes sin dejar rastro."
              }
              buttonText={
                isCa ? "Censurar PDF ara" : isEn ? "Redact PDF now" : "Censurar PDF ahora"
              }
              icon={<ShieldAlert className="size-4" />}
              variant="solid-red"
            />

            {/* Red CTA: Eliminar metadatos */}
            <GuideCTA
              to={toolPath(locale, "eliminar-metadatos-pdf")}
              eyebrow={
                isCa
                  ? "Purga d'Estructures Ocultes"
                  : isEn
                    ? "Metadata Purge"
                    : "Purga de Estructuras Ocultas"
              }
              title={
                isCa
                  ? "Eliminar metadades de PDF"
                  : isEn
                    ? "Remove PDF Metadata"
                    : "Eliminar metadatos de PDF"
              }
              description={
                isCa
                  ? "Purga els camps d'autoria (Author, Creator, Producer) i elimina els paquets de metadades XML/XMP incrustats."
                  : isEn
                    ? "Clear standard authoring fields and strip embedded XML/XMP metadata streams completely."
                    : "Purga los campos de autoría (Author, Creator, Producer) y elimina los paquetes de metadatos XML/XMP embebidos."
              }
              buttonText={
                isCa
                  ? "Eliminar metadades ara"
                  : isEn
                    ? "Remove metadata now"
                    : "Eliminar metadatos ahora"
              }
              icon={<FileX2 className="size-4" />}
              variant="solid-card"
            />

            {/* Step 4: Sanear PDF */}
            <GuideStep
              stepNumber={4}
              title={
                isCa
                  ? "Pas 4: Saneja determinats elements tècnics"
                  : isEn
                    ? "Step 4: Sanitize Specific Technical Elements"
                    : "Paso 4: Sanea determinados elementos técnicos"
              }
              action={
                <Link
                  to={toolPath(locale, "sanear-pdf")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9302C] hover:underline"
                >
                  <ShieldOff className="size-4" />
                  {isCa
                    ? "Sanear PDF a BreadPDF"
                    : isEn
                      ? "Sanitize PDF with BreadPDF"
                      : "Sanear PDF en BreadPDF"}
                </Link>
              }
            >
              <p>
                {isCa
                  ? "Elimina rutines de JavaScript embebut o accions automàtiques d'obertura (/OpenAction) per neutralitzar riscos."
                  : isEn
                    ? "Neutralize embedded JavaScript routines and launch triggers (/OpenAction) from the document catalog."
                    : "Elimina rutinas de JavaScript embebido o acciones automáticas de apertura (/OpenAction) para neutralizar riesgos."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section 3: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre privacitat en PDF"
              : isEn
                ? "Frequently Asked Questions about PDF Privacy"
                : "Preguntas frecuentes sobre privacidad en PDF"
          }
          faqs={faqs}
        />

        {/* Technical & Regulatory Sources */}
        <GuideFooterSources
          title={
            isCa
              ? "Fonts regulatòries i solucions corporatives"
              : isEn
                ? "Regulatory Frameworks & Corporate Workflows"
                : "Fuentes regulatorias y soluciones para empresas"
          }
        >
          <p>
            {isCa
              ? "Totes les definicions i criteris es basen en el Reglament (UE) 2016/679 (RGPD), les directrius de l'AEPD sobre anonimització i les directrius tècniques de l'EDPB."
              : isEn
                ? "Definitions and compliance boundaries reflect Regulation (EU) 2016/679 (GDPR), Spanish AEPD anonymization guidance, and EDPB technical guidelines."
                : "Todas las definiciones y criterios técnicos se fundamentan en el Reglamento (UE) 2016/679 (RGPD), las orientaciones de la AEPD sobre procesos de anonimización y las directrices técnicas del EDPB."}
          </p>
        </GuideFooterSources>
      </div>
    </article>
  );
}
