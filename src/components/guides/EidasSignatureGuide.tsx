import { Link } from "@tanstack/react-router";
import { ShieldCheck, FileCheck, AlertTriangle, Scale, Lock, ExternalLink, CheckCircle2, Info } from "lucide-react";
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

export function EidasSignatureGuide({ locale, guide }: GuideArticleProps) {
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
            ? "Marc Jurídic & Normativa eIDAS"
            : isEn
              ? "Legal Framework & eIDAS Regulation"
              : "Marco Jurídico & Normativa eIDAS"
        }
        subtitle={
          isCa
            ? "El Reglament (UE) 910/2014 (eIDAS) estableix tres nivells diferents de signatura electrònica: simple, avançada i qualificada. Comprendre les seves diferències tècniques, garanties i valor probatori és clau per no confondre una rúbrica gràfica amb un certificat criptogràfic."
            : isEn
              ? "Regulation (EU) No 910/2014 (eIDAS) establishes three distinct tiers of electronic signatures: simple, advanced, and qualified. Understanding their technical safeguards, evidential weight, and legal presumptions is critical to avoid mistaking visual marks for cryptographic certificates."
              : "El Reglamento (UE) 910/2014 (eIDAS) establece tres niveles distintos de firma electrónica: simple, avanzada y cualificada. Comprender sus diferencias técnicas, garantías y valor probatorio es clave para no confundir una rúbrica gráfica con un certificado criptográfico."
        }
        notice={{
          variant: "brand",
          title: isCa
            ? "Principi legal clau: Només la signatura qualificada té l'efecte equivalent a la manuscrita"
            : isEn
              ? "Core Legal Presumption: Only Qualified Signatures carry legal equivalence to handwritten marks"
              : "Principio legal clave: Solo la firma cualificada tiene el efecto equivalente a la manuscrita",
          description: isCa
            ? "D'acord amb l'Article 25.2 de l'eIDAS, només una signatura electrònica qualificada gaudeix de l'efecte jurídic equivalent a una signatura manuscrita. Una signatura simple o avançada té plena admissibilitat en judici (Art. 25.1), però no compta amb aquesta presumpció legal automàtica."
            : isEn
              ? "Under Article 25(2) of eIDAS, only a qualified electronic signature enjoys the equivalent legal effect of a handwritten signature. Simple and advanced signatures are fully admissible in court (Article 25.1), but they lack this statutory presumption."
              : "Según el Artículo 25.2 del eIDAS, solo una firma electrónica cualificada disfruta del efecto jurídico equivalente al de una firma manuscrita. Una firma simple o avanzada tiene plena admisibilidad en juicio (Art. 25.1), pero no cuenta con dicha presunción legal automática.",
        }}
      />

      {/* Mascota Info Callout */}
      <GuideMascotCallout
        variant="think"
        background="navy"
        badge={
          isCa
            ? "Transparència Tècnica de BreadPDF"
            : isEn
              ? "BreadPDF Technical Transparency"
              : "Transparencia Técnica de BreadPDF"
        }
        title={
          isCa
            ? "BreadPDF estampa signatures visuals, no emet certificats PKI"
            : isEn
              ? "BreadPDF places visual stamps, not cryptographic PKI certificates"
              : "BreadPDF estampa firmas visuales, no emite certificados PKI"
        }
        description={
          isCa
            ? "La nostra eina 'Signar PDF' permet dibuixar o pujar una rúbrica per situar-la visualment sobre el document al teu navegador. No és un servei de confiança qualificat, no genera contenidors criptogràfics PAdES ni valida llistes de revocació (CRL/OCSP)."
            : isEn
              ? "Our 'Sign PDF' tool lets you draw or upload a graphic signature and position it visually across document pages inside your browser. It is not a qualified trust service, does not build cryptographic PAdES envelopes, and does not query revocation lists (CRL/OCSP)."
              : "Nuestra herramienta 'Firmar PDF' permite dibujar o subir una rúbrica para colocarla visualmente sobre el documento en tu navegador. No es un servicio de confianza cualificado, no genera contenedores criptográficos PAdES ni valida listas de revocación (CRL/OCSP)."
        }
      />

      {/* Main Content Body */}
      <div className="guide-prose prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Los Tres Niveles de Firma bajo eIDAS */}
        <section aria-labelledby="eidas-levels">
          <h2 id="eidas-levels" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Els tres nivells de signatura electrònica al Reglament eIDAS"
              : isEn
                ? "The Three Tiers of Electronic Signatures under Regulation (EU) 910/2014"
                : "Los tres niveles de firma electrónica en el Reglamento eIDAS"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "El Reglament (UE) 910/2014 del Parlament Europeu i del Consell regula la identificació electrònica i els serveis de confiança per a les transaccions electròniques al mercat interior. Classifica les signatures en tres categories clarament delimitades:"
              : isEn
                ? "Regulation (EU) No 910/2014 governs electronic identification and trust services across the European single market. It stratifies electronic signatures into three rigorously defined technical and legal categories:"
                : "El Reglamento (UE) 910/2014 del Parlamento Europeo y del Consejo regula la identificación electrónica y los servicios de confianza para las transacciones electrónicas en el mercado interior. Clasifica las firmas en tres categorías claramente delimitadas:"}
          </p>

          <div className="mt-6 space-y-4">
            {/* Nivel 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">Art. 3.10</span>
                <h3 className="text-[17px] font-bold text-slate-900">
                  {isCa ? "1. Signatura electrònica simple" : isEn ? "1. Simple Electronic Signature" : "1. Firma electrónica simple"}
                </h3>
              </div>
              <p className="mt-2 text-[14.5px] text-slate-600">
                {isCa
                  ? "Són dades en format electrònic annexes a altres dades electròniques o associades de manera lògica amb elles que el signant utilitza per signar. Exemples: escriure el teu nom al peu d'un correu, marcar una casella de conformitat, o estampar una imatge PNG o traç vectorial d'una rúbrica en un PDF. Té valor jurídic i és admissible en judici (Art. 25.1), però si és impugnada, qui l'aporta ha de provar la seva autoria mitjançant altres proves indiciàries (correus, adreces IP, logs)."
                  : isEn
                    ? "Defined as data in electronic form which is attached to or logically associated with other data in electronic form and which is used by the signatory to sign. Examples include typing a name at the end of an email, checking a consent box, or stamping an image or freehand stroke onto a PDF page. It cannot be denied legal effect solely for being electronic (Article 25.1), but bears no legal presumption of identity or integrity if challenged."
                    : "Datos en formato electrónico anejos a otros datos electrónicos o asociados de manera lógica con ellos que el firmante utiliza para firmar. Ejemplos: teclear tu nombre al pie de un correo, marcar una casilla de aceptación, o estampar una imagen PNG o trazo vectorial de una rúbrica sobre un PDF. Tiene valor legal y es admisible en juicio (Art. 25.1), pero si se impugna, quien la aporta debe demostrar su autoría con pruebas indiciarias adicionales (correos, IPs, registros de acceso)."}
              </p>
            </div>

            {/* Nivel 2 */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">Art. 26</span>
                <h3 className="text-[17px] font-bold text-slate-900">
                  {isCa ? "2. Signatura electrònica avançada" : isEn ? "2. Advanced Electronic Signature (AdES)" : "2. Firma electrónica avanzada"}
                </h3>
              </div>
              <p className="mt-2 text-[14.5px] text-slate-700">
                {isCa
                  ? "Ha de complir quatre requisits tècnics estrictes (Art. 26 eIDAS): a) estar vinculada al signant de manera única; b) permetre la identificació del signant; c) haver estat creada utilitzant dades de creació que el signant pot utilitzar sota el seu control exclusiu; i d) estar vinculada amb les dades signades de manera que qualsevol canvi ulterior sigui detectable (integritat criptogràfica mitjançant hash SHA-256). Exemples: firma biomètrica amb paràmetres de pressió i velocitat o signatures mitjançant claus privades no qualificades."
                  : isEn
                    ? "Must meet four cumulative requirements under Article 26 of eIDAS: (a) uniquely linked to the signatory; (b) capable of identifying the signatory; (c) created using signature creation data under the sole control of the signatory; and (d) linked to the data signed in such a way that any subsequent modification is detectable via cryptographic hashes. Common examples include biometric tablet signatures capturing speed and pressure, or asymmetric key pairs generated outside qualified devices."
                    : "Debe cumplir cuatro requisitos técnicos acumulativos (Art. 26 eIDAS): a) estar vinculada al firmante de manera única; b) permitir la identificación del firmante; c) haber sido creada utilizando datos de creación que el firmante puede utilizar bajo su control exclusivo; y d) estar vinculada con los datos firmados de modo que cualquier modificación ulterior sea detectable (integridad criptográfica mediante resumen hash SHA-256). Ejemplos: firma biométrica con captura de presión y velocidad o firmas con certificados no cualificados."}
              </p>
            </div>

            {/* Nivel 3 */}
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-900">Art. 3.12 & 28</span>
                <h3 className="text-[17px] font-bold text-slate-900">
                  {isCa ? "3. Signatura electrònica qualificada" : isEn ? "3. Qualified Electronic Signature (QES)" : "3. Firma electrónica cualificada"}
                </h3>
              </div>
              <p className="mt-2 text-[14.5px] text-slate-700">
                {isCa
                  ? "És una signatura avançada creada mitjançant un dispositiu qualificat de creació de signatures (QSCD, com ara el xip criptogràfic del DNIe, targetes de FNMT o mòduls HSM al núvol d'un prestador qualificat) i basada en un certificat qualificat de signatura electrònica emès per un prestador de serveis de confiança acreditat a la llista de confiança de la UE (TSL). Té l'efecte jurídic equivalent a una signatura manuscrita (Art. 25.2) i reconeixement mutu automàtic a tots els estats membres de la UE (Art. 25.3)."
                  : isEn
                    ? "An advanced electronic signature created by a qualified electronic signature creation device (QSCD, such as cryptographic smartcards, secure USB tokens, or certified cloud HSMs), based on a qualified certificate issued by a trust service provider on the EU Trusted List. It carries full equivalence to a handwritten signature across all EU member states (Article 25.2 and 25.3)."
                    : "Es una firma avanzada creada mediante un dispositivo cualificado de creación de firmas (QSCD, como el chip criptográfico del DNI electrónico, tarjetas FNMT o módulos HSM seguros en la nube de prestadores acreditados) y basada en un certificado cualificado expedido por un prestador de servicios de confianza incluido en la lista de confianza de la UE (TSL). Posee el efecto jurídico equivalente al de una firma manuscrita (Art. 25.2) y reconocimiento mutuo automático en todos los Estados miembros de la UE (Art. 25.3)."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Efectos jurídicos y el Artículo 25 */}
        <section className="mt-10" aria-labelledby="legal-effects">
          <h2 id="legal-effects" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Efectes jurídics i valor probatori (Articles 25 i 32)"
              : isEn
                ? "Legal Effects and Evidential Presumptions (Articles 25 & 32)"
                : "Efectos jurídicos y valor probatorio (Artículos 25 y 32)"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Un error freqüent consisteix a assumir que una signatura electrònica simple no té cap validesa o, al contrari, que qualsevol signatura en pantalla equival automàticament a signar sobre paper. El marc d'eIDAS estableix regles clares:"
              : isEn
                ? "A common misconception assumes that a simple electronic signature has zero legal standing, or conversely, that any visual mark on screen is immediately equal to ink on paper. Regulation eIDAS establishes explicit boundary rules:"
                : "Un error habitual consiste en asumir que una firma electrónica simple no tiene validez alguna o, por el contrario, que cualquier firma en pantalla equivale automáticamente a firmar sobre papel. El marco eIDAS establece reglas claras:"}
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-600" />
                {isCa ? "No discriminació (Art. 25.1)" : isEn ? "Non-Discrimination Principle (Art. 25.1)" : "Principio de no discriminación (Art. 25.1)"}
              </h3>
              <p className="mt-2 text-[14px] text-slate-600">
                {isCa
                  ? "No es poden denegar efectes jurídics ni admissibilitat com a prova en procediments judicials a una signatura electrònica pel simple fet d'estar en format electrònic o de no complir els requisits de la qualificada."
                  : isEn
                    ? "An electronic signature shall not be denied legal effect and admissibility as evidence in legal proceedings solely on the grounds that it is in an electronic form or that it does not meet the requirements for qualified electronic signatures."
                    : "No se denegarán efectos jurídicos ni admisibilidad como prueba en procedimientos judiciales a una firma electrónica por el mero hecho de ser electrónica o de no reunir los requisitos de la firma electrónica cualificada."}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                <Scale className="size-5 text-[#C9302C]" />
                {isCa ? "Equivalència manuscrita (Art. 25.2)" : isEn ? "Handwritten Equivalence (Art. 25.2)" : "Equivalencia manuscrita (Art. 25.2)"}
              </h3>
              <p className="mt-2 text-[14px] text-slate-600">
                {isCa
                  ? "Aquesta equivalència legal automàtica és exclusiva de la signatura qualificada. Si s'utilitza una signatura simple o avançada, la càrrega de provar l'autenticitat i la no alteració recau sobre la part que la defensa en judici."
                  : isEn
                    ? "Statutory equivalence to handwritten ink is reserved strictly for qualified signatures. In non-qualified signatures, the burden of proving identity and absence of tampering rests upon the party submitting the document."
                    : "Esta equivalencia legal automática es exclusiva de la firma cualificada. Si se utiliza una firma simple o avanzada, la carga de probar la autenticidad y la no alteración recae sobre la parte que la presenta en juicio si la contraparte la impugna."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Integridad criptográfica vs. Estampado Visual */}
        <section className="mt-10" aria-labelledby="integrity-vs-stamp">
          <h2 id="integrity-vs-stamp" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Com funciona tècnicament una signatura digital en PDF (PAdES)"
              : isEn
                ? "How Cryptographic PDF Signatures Work (PAdES Standard)"
                : "Cómo funciona técnicamente una firma digital en PDF (Estándar PAdES)"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "En el format PDF estàndard (ISO 32000 i estàndard ETSI EN 319 142 PAdES), una signatura digital no és una imatge enganxada al full. És una estructura de dades criptogràfica incrustada en un diccionari /ByteRange:"
              : isEn
                ? "Under PDF standards (ISO 32000 and ETSI EN 319 142 PAdES), a cryptographic digital signature is not an image pasted on the page. It is a cryptographic binary block embedded in a specialized /ByteRange dictionary:"
                : "En el estándar PDF (ISO 32000 y especificación ETSI EN 319 142 PAdES), una firma digital criptográfica no es una imagen pegada al folio. Es una estructura de datos binaria incrustada en un diccionario especializado /ByteRange:"}
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white text-[14px]">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">PAS 1</span>
                <h3 className="font-bold text-blue-400 mt-1">Hash del contingut</h3>
                <p className="text-slate-300 mt-1 text-[13px]">
                  {isCa
                    ? "Es calcula l'empremta matemàtica (SHA-256) de tots els bytes del PDF, excepte l'espai reservat per a la signatura."
                    : isEn
                      ? "A mathematical digest (SHA-256) is computed across all document bytes, excluding the designated signature placeholder."
                      : "Se calcula la huella matemática (SHA-256) de todos los bytes del documento, excepto el hueco reservado para la firma."}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">PAS 2</span>
                <h3 className="font-bold text-emerald-400 mt-1">Xifrat amb clau privada</h3>
                <p className="text-slate-300 mt-1 text-[13px]">
                  {isCa
                    ? "Aquest hash es xifra utilitzant la clau privada del certificat (RSA o ECC) allotjada al dispositiu segur o seu electrònica."
                    : isEn
                      ? "The hash digest is encrypted using the signatory's private key (RSA/ECC) held securely on a smartcard or token."
                      : "Ese hash se cifra utilizando la clave privada del certificado (RSA o ECC) custodiada en el dispositivo seguro o token."}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">PAS 3</span>
                <h3 className="font-bold text-amber-400 mt-1">Segell i certificat públic</h3>
                <p className="text-slate-300 mt-1 text-[13px]">
                  {isCa
                    ? "S'incrusta el certificat X.509 i la resposta de revocació (OCSP) o segell de temps RFC 3161 per garantir la no manipulació."
                    : isEn
                      ? "The X.509 certificate, revocation chain (OCSP/CRL), and optional RFC 3161 timestamp are appended to verify validity."
                      : "Se incrusta el certificado X.509 junto con la prueba de revocación (OCSP/CRL) y sello de tiempo RFC 3161."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-amber-950 text-[14px]">
            <p>
              <strong>{isCa ? "Avís crític sobre modificacions posteriors:" : isEn ? "Critical warning on post-signature modifications:" : "Aviso crítico sobre modificaciones posteriores:"}</strong>{" "}
              {isCa
                ? "Qualsevol modificació posterior a la signatura criptogràfica (comprimir el document, afegir pàgines, eliminar metadades o aplanar camps) altera els bytes originals del fitxer i invalidarà immediatament la signatura als visors com Adobe Acrobat o l'eina de validació Valide de l'Administració."
                : isEn
                  ? "Any modification executed after placing a cryptographic signature (such as compressing, adding/removing pages, stripping metadata, or flattening form fields) alters the underlying byte range and immediately invalidates the signature in Adobe Acrobat or official government validators."
                  : "Cualquier modificación ejecutada con posterioridad a la firma criptográfica (como comprimir el documento, insertar páginas, eliminar metadatos o aplanar campos) altera los bytes originales del archivo e invalidará de forma inmediata la firma en visores como Adobe Acrobat o la plataforma VALIDe de la Administración Pública."}
            </p>
          </div>
        </section>

        {/* Section 4: Cuándo usar BreadPDF y cuándo acudir a certificados cualificados */}
        <section className="mt-10" aria-labelledby="when-to-use">
          <h2 id="when-to-use" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa
              ? "Quan fer servir BreadPDF i quan necessites certificat digital"
              : isEn
                ? "When to Use BreadPDF vs. When a Qualified Certificate is Required"
                : "Cuándo utilizar BreadPDF y cuándo necesitas certificado digital"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              badge={isCa ? "Ús adequat de BreadPDF" : isEn ? "Appropriate for BreadPDF" : "Uso adecuado de BreadPDF"}
              title={
                isCa
                  ? "Acords interns, albarans, autoritzacions i formularis personals"
                  : isEn
                    ? "Internal approvals, delivery receipts, consents, and informal agreements"
                    : "Acuerdos comerciales privados, albaranes, autorizaciones y formularios personales"
              }
            >
              <p>
                {isCa
                  ? "Per a documents de caràcter privat on les parts reconeixen el tràmit (autoritzacions escolars, fitxes de lliurament, comprovants o aprovacions internes d'empresa), estampar la teva rúbrica gràfica de forma privada al navegador és ràpid i evita imprimir paper."
                  : isEn
                    ? "For private workflows where parties maintain existing trust (school field trip consents, equipment acknowledgments, delivery slips, internal company sign-offs), applying a visual signature in-browser is convenient, paperless, and fast."
                    : "Para documentos de ámbito privado donde existe acuerdo y confianza previa (autorizaciones escolares, partes de trabajo, recepciones de material, contratos privados entre particulares o aprobaciones internas), estampar tu rúbrica gráfica en el navegador es ágil y 100% privado."}
              </p>
            </GuideStep>

            <GuideCTA
              to={toolPath(locale, "firmar-pdf")}
              eyebrow={isCa ? "Eina Visual" : isEn ? "Visual Signature Tool" : "Herramienta Visual"}
              title={
                isCa
                  ? "Estampar rúbrica o signatura a BreadPDF"
                  : isEn
                    ? "Sign PDF Visually with BreadPDF"
                    : "Estampar rúbrica o firma visual en BreadPDF"
              }
              description={
                isCa
                  ? "Dibuixa la teva signatura a mà alçada o puja una imatge del teu traç per situar-la exactament on calgui sense pujar el document a servidors."
                  : isEn
                    ? "Draw your freehand signature or upload a transparent signature image and position it across pages locally without transmitting files to remote clouds."
                    : "Dibuja tu firma a mano alzada o sube una imagen de tu rúbrica para posicionarla de forma visual y privada sin enviar archivos a servidores."
              }
              buttonText={
                isCa ? "Signar PDF visualment ara" : isEn ? "Sign PDF visually now" : "Firmar PDF visualmente ahora"
              }
              icon={<FileCheck className="size-4" />}
              variant="solid-red"
            />

            <GuideStep
              stepNumber={2}
              badge={isCa ? "Exigència de certificat oficial" : isEn ? "Mandatory PKI Certificate" : "Exigencia de certificado oficial"}
              title={
                isCa
                  ? "Tràmits amb l'Administració Pública, seus electròniques i procediments judicials"
                  : isEn
                    ? "Public Administration portals, tax filings, legal court dockets (LexNET)"
                    : "Trámites con la Administración Pública, sedes electrónicas y procedimientos judiciales"
              }
            >
              <p>
                {isCa
                  ? "Si has de presentar un recurs a l'Agència Tributària, tramitar una demanda judicial (LexNET), signar una licitació pública o formalitzar una escriptura notarial, l'organisme exigeix obligatòriament una signatura qualificada emesa per un prestador acreditat mitjançant eines oficials com AutoFirma."
                  : isEn
                    ? "Submissions to public administrative bodies (such as tax agencies, social security portals, judicial filings like LexNET, or public tenders) strictly mandate a qualified electronic signature generated through recognized state software (such as AutoFirma in Spain)."
                    : "Si vas a presentar escritos ante la Agencia Tributaria, actuar en procedimientos judiciales (LexNET), participar en licitaciones públicas o formalizar actos notariales, la sede electrónica exige firma electrónica cualificada generada con herramientas oficiales como AutoFirma y certificado FNMT o DNIe."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section 5: FAQ Accordion */}
        <GuideFAQ
          title={
            isCa
              ? "Preguntes freqüents sobre la signatura electrònica i eIDAS"
              : isEn
                ? "Frequently Asked Questions about Electronic Signatures & eIDAS"
                : "Preguntas frecuentes sobre firma electrónica y eIDAS"
          }
          faqs={faqs}
        />

        {/* Sources & Privacy */}
        <GuideFooterSources
          title={
            isCa
              ? "Fonts jurídiques oficials i referències normatives"
              : isEn
                ? "Official Legal Sources & Regulatory References"
                : "Fuentes jurídicas oficiales y referencias normativas"
          }
        >
          <div className="space-y-2 text-[14px]">
            <p>
              <a
                href="https://eur-lex.europa.eu/eli/reg/2014/910/2024-10-18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#C9302C] hover:underline"
              >
                <ExternalLink className="size-3.5" />
                Reglament (UE) 910/2014 (eIDAS consolidat 2024) — EUR-Lex
              </a>
              : Text íntegre oficial del reglament europeu sobre identificació electrònica i serveis de confiança.
            </p>
            <p className="text-slate-500 text-[13px]">
              {isCa
                ? "Avís legal: Aquest document té finalitat exclusivament informativa i divulgativa i no constitueix assessorament jurídic individualitzat."
                : isEn
                  ? "Legal disclaimer: This guide is published for informational and educational purposes only and does not constitute formal legal counsel."
                  : "Aviso legal: Esta guía tiene fines exclusivamente informativos y técnicos y no constituye asesoramiento jurídico profesional individualizado."}
            </p>
          </div>
        </GuideFooterSources>
      </div>
    </article>
  );
}
