import { Link } from "@tanstack/react-router";
import {
  Signature,
  Building2,
  AlertTriangle,
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

export function FillAndSignGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="mx-auto max-w-[960px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<Building2 className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Tràmits & Gestió Administrativa"
            : isEn
            ? "Admin & Civic Workflows"
            : "Trámites & Gestión Administrativa"
        }
        subtitle={
          isCa
            ? "Molts formularis administratius en PDF contenen camps interactius que permeten escriure i marcar caselles abans d'incorporar una rúbrica o signatura. Aquesta guia explica com completar camps compatibles al navegador i com distingir una signatura visual d'una signatura electrònica qualificada."
            : isEn
            ? "Many administrative and corporate PDF forms embed interactive fields enabling you to type text, check boxes, and select dropdown options prior to affixing an ink signature. Learn how to complete fillable AcroForms and clearly differentiate visual marks from PKI certificates."
            : "Muchos formularios administrativos en PDF contienen campos interactivos que permiten escribir y marcar casillas antes de incorporar una rúbrica o firma gráfica. Esta guía detalla cómo completar campos compatibles en el navegador y cómo distinguir una firma visual de una firma electrónica cualificada."
        }
        notice={{
          variant: "brand",
          title:
            isCa
              ? "Distinció fonamental: Una signatura visual no és una signatura digital qualificada"
              : isEn
              ? "Crucial Distinction: A visual mark is not a qualified digital certificate signature"
              : "Distinción fundamental: Una firma visual no es una firma digital con certificado",
          description:
            isCa
              ? "BreadPDF permet estampar signatures visuals manuscrites o segells gràfics a la pàgina. No és una plataforma de signatura criptogràfica PKI / X.509 ni substitueix sistemes oficials com AutoFirma o Cl@ve. Si el tràmit s'adreça a una seu electrònica, consulta els requisits de l'organisme destinatari."
              : isEn
              ? "BreadPDF allows drawing or uploading visual handwritten signatures and graphic stamps. It is not a qualified PKI / X.509 cryptographic platform, nor does it replace government signing gateways like AutoFirma. Check requirements of receiving agencies."
              : "BreadPDF permite estampar firmas visuales manuscritas o sellos gráficos sobre la página. No es una plataforma de firma criptográfica PKI / X.509 ni sustituye a herramientas como AutoFirma o Cl@ve. Si tu trámite se dirige a una sede electrónica, consulta los requisitos del organismo.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/rellenar-y-firmar-formulario-pdf.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "Rellenar campos AcroForm y estampación de firma visual en PDF"}
        caption={
          isCa
            ? "Flux operatiu: completat de camps estructurats AcroForm al navegador i contrast entre signatura gràfica i certificat electrònic."
            : isEn
            ? "Workflow: completing native AcroForm inputs in browser memory alongside a clear contrast between visual ink marks and digital cryptographic certificates."
            : "Flujo operativo: completado de campos estructurados AcroForm en el navegador y contraste entre firma gráfica y certificado electrónico."
        }
      />

      {/* Mascota Celebrando (Trámite finalizado / Documento firmado con éxito) */}
      <GuideMascotCallout
        variant="celebrate"
        background="red"
        badge={isCa ? "Tràmit Completat" : isEn ? "Form Completed" : "Trámite Completado"}
        title={
          isCa
            ? "Formularis omplerts i signats directament al teu navegador"
            : isEn
            ? "Forms filled and stamped directly in your local browser"
            : "Formularios cumplimentados y firmados en tu propio navegador"
        }
        description={
          isCa
            ? "Completa dades, estampa la teva rúbrica neta i aplana el document per protegir les respostes sense haver d'imprimir en paper ni escanejar de nou."
            : isEn
            ? "Fill text fields, affix your clean drawn signature, and flatten the document to protect answers without printing on paper or rescanning."
            : "Completa datos, estampa tu rúbrica limpia y aplana el documento para proteger las respuestas sin necesidad de imprimir en papel ni escanear de nuevo."
        }
      />

      {/* Main Content Body */}
      <div className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Diagnóstico de formulario */}
        <section aria-labelledby="form-diagnostic">
          <h2 id="form-diagnostic" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa
              ? "Com saber si el teu formulari és realment editable?"
              : isEn
              ? "How to Tell If Your PDF Form Is Truly Interactive"
              : "¿Es un formulario PDF realmente rellenable?"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "A simple vista, molts documents mostren requadres de casella i línies de punts per escriure, però no tots contenen camps interactius:"
              : isEn
              ? "At first glance, many documents display border boxes or dotted lines, yet not all contain interactive fields:"
              : "A simple vista, muchos documentos muestran casillas y líneas de puntos para escribir, pero no todos contienen campos interactivos:"}
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-[14.5px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="font-bold text-[#0F172A] text-[15.5px]">
                {isCa ? "Formulari natiu (AcroForm)" : isEn ? "Interactive AcroForm" : "Formulario nativo (AcroForm)"}
              </div>
              <p className="mt-2 text-[14px] text-slate-600">
                {isCa
                  ? "Els camps estan digitalment definits: en fer clic sobre el requadre apareix el cursor per escriure o la marca de comprovació."
                  : isEn
                  ? "Form controls are digitally programmed: clicking the box triggers an active cursor or selection checkmark."
                  : "Los campos están definidos digitalmente: al hacer clic sobre el recuadro aparece el cursor para escribir o la marca de verificación."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="font-bold text-[#0F172A] text-[15.5px]">
                {isCa ? "PDF aplanat o imatge escanejada" : isEn ? "Flattened or Scanned PDF" : "PDF aplanado o escaneado"}
              </div>
              <p className="mt-2 text-[14px] text-slate-600">
                {isCa
                  ? "És una foto estàtica de la pàgina. No conté controls actius; per escriure-hi cal afegir capes de text sobreposades mitjançant l'editor de PDF."
                  : isEn
                  ? "A static flat bitmap image. It holds no native inputs; adding text requires superimposing free-floating text boxes with a PDF editor."
                  : "Es una fotografía estática de la página. No contiene controles activos; para rellenarlo es preciso superponer capas de texto con el editor."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Pasos operativos */}
        <section className="mt-10" aria-labelledby="form-steps">
          <h2 id="form-steps" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa ? "Procediment pas a pas per omplir i signar" : isEn ? "Step-by-Step Filling and Signing Workflow" : "Procedimiento paso a paso para rellenar y firmar"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              title={isCa ? "Completa els camps interactius" : isEn ? "Fill In Interactive Form Fields" : "Completa los campos interactivos"}
            >
              <p>
                {isCa
                  ? "Introdueix la informació requerida als controls habilitats: text simple, caselles de verificació (checkbox) o desplegables."
                  : isEn
                  ? "Input your information across enabled controls: single-line text, checkboxes, or dropdown selectors."
                  : "Introduce la información requerida en los controles habilitados: texto simple, casillas de verificación (checkbox) o desplegables."}
              </p>
            </GuideStep>

            {/* Central Tool CTA: Firmar PDF */}
            <GuideCTA
              to={toolPath(locale, "firmar-pdf")}
              eyebrow={isCa ? "Eina Principal" : isEn ? "Primary Signature Tool" : "Herramienta Principal"}
              title={isCa ? "Firmar PDF a BreadPDF" : isEn ? "Sign PDF with BreadPDF" : "Firmar PDF en BreadPDF"}
              description={
                isCa
                  ? "Dibuixa la teva signatura manuscrita directament a la pantalla o puja una imatge de la teva rúbrica neta per estampar-la al document."
                  : isEn
                  ? "Draw your visual signature directly on the canvas or upload an ink image of your handwritten mark to affix to the document."
                  : "Dibuja tu firma manuscrita directamente en la pantalla o sube una imagen de tu rúbrica limpia para estamparla sobre el documento."
              }
              buttonText={isCa ? "Firmar PDF ara" : isEn ? "Sign PDF now" : "Firmar PDF ahora"}
              icon={<Signature className="size-4" />}
              variant="solid-red"
            />

            <GuideStep
              stepNumber={2}
              title={isCa ? "Aplana el document per fixar les respostes" : isEn ? "Flatten PDF to Seal Entries Permanently" : "Aplana el PDF para fijar las respuestas"}
              action={
                <Link
                  to={toolPath(locale, "aplanar-pdf")}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#EC3C2D] hover:underline"
                >
                  <span>{isCa ? "Aplanar PDF a BreadPDF" : isEn ? "Flatten PDF with BreadPDF" : "Aplanar PDF en BreadPDF"}</span>
                </Link>
              }
            >
              <p>
                {isCa
                  ? "L'eina 'Aplanar PDF' fusiona els camps interactius i les signatures en el dibuix estàtic de la pàgina, evitant que una altra persona alteri fàcilment els valors."
                  : isEn
                  ? "The 'Flatten PDF' utility merges active form data and visual stamps directly into the permanent page canvas, preventing casual modifications."
                  : "La herramienta 'Aplanar PDF' consolida las respuestas y rúbricas en el dibujo estático de la página, impidiendo que otra persona modifique casualmente los valores."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section 3: Errores comunes */}
        <section className="mt-10" aria-labelledby="mistakes-to-avoid">
          <h2 id="mistakes-to-avoid" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Errors freqüents que has d'evitar" : isEn ? "Frequent Errors to Avoid" : "Errores frecuentes al rellenar y firmar formularios"}
          </h2>

          <div className="mt-4 space-y-3 text-[14px]">
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/70 p-4 text-red-950">
              <AlertTriangle className="size-4.5 text-[#EC3C2D] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">{isCa ? "Signar visualment quan s'exigeix certificat:" : isEn ? "Using a visual mark when digital certificate is mandatory:" : "Firmar visualmente cuando el trámite exige certificado digital:"}</strong>{" "}
                <span>{isCa ? "Enviar un formulari amb una rúbrica gràfica a un registre telemàtic que requereix signatura X.509 provocarà el rebuig administratiu de la sol·licitud." : isEn ? "Submitting a graphic stamp to an official electronic registry requiring qualified X.509 certificates results in immediate formal rejection." : "Enviar un formulario con una rúbrica gráfica a un registro telemático que exige firma electrónica cualificada motivará el rechazo formal de la solicitud."}</span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/70 p-4 text-red-950">
              <AlertTriangle className="size-4.5 text-[#EC3C2D] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">{isCa ? "Aplanar abans d'haver completat tots els camps:" : isEn ? "Flattening before finishing all inputs:" : "Aplanar el PDF antes de haber completado todos los campos:"}</strong>{" "}
                <span>{isCa ? "Un cop aplanat el document, els camps deixen de ser editables i caldria començar de nou si detectes una errada." : isEn ? "Once flattened, active inputs become fixed canvas pixels and cannot be edited without restarting." : "Una vez aplanado el documento, los campos dejan de ser interactivos y tendrías que empezar de nuevo si detectas una errata."}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ Accordion */}
        <GuideFAQ
          title={isCa ? "Preguntes freqüents sobre formularis PDF" : isEn ? "Frequently Asked Questions about PDF Forms" : "Preguntas frecuentes sobre formularios PDF"}
          faqs={faqs}
        />

        {/* Technical Sources */}
        <GuideFooterSources
          title={isCa ? "Marc normatiu i solucions corporatives" : isEn ? "Regulatory Framework & Corporate Solutions" : "Marco normativo y soluciones para empresas"}
        >
          <p>
            {isCa
              ? "Descobreix els fluxos de gestió documental de BreadPDF per a contractes, nòmines, formularis i tràmits administratius amb processament 100% local al teu navegador."
              : isEn
              ? "Explore BreadPDF document workflows for contracts, payrolls, and administrative forms executing 100% client-side in browser memory."
              : "Descubre los flujos de gestión documental de BreadPDF para contratos, nóminas, formularios y trámites administrativos con procesamiento 100% local en tu navegador."}
          </p>
        </GuideFooterSources>
      </div>
    </article>
  );
}
