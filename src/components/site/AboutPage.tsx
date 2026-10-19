import { Link } from "@tanstack/react-router";
import { ShieldCheck, Cpu, HardDrive, Mail, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useLocale } from "@/lib/i18n/context";
import { SECTION_ROUTE, privacyParams, cookiesParams, termsParams } from "@/lib/i18n/routing";
import { OFFICIAL_CONTACT_EMAIL } from "@/lib/brand";

export function AboutPage() {
  const { locale, t } = useLocale();
  const copy = t.about;

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Breadcrumb items={[{ label: copy.eyebrow }]} />

      <header className="mt-4">
        <p className="text-eyebrow">{copy.eyebrow}</p>
        <h1 className="text-display mt-2 text-3xl sm:text-5xl font-black text-[#0F172A] leading-tight">
          {copy.title}
        </h1>
        <p className="mt-4 text-[17.5px] sm:text-[19px] leading-relaxed text-slate-700 font-normal">
          {copy.missionBody}
        </p>
      </header>

      {/* Bloque Arquitectura Técnica Real */}
      <section className="mt-12 rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-xs">
            <Cpu className="size-6" />
          </span>
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#2563EB]">
              {locale === "ca" ? "Tecnologia de Processament" : locale === "en" ? "Processing Technology" : "Tecnología de Procesamiento"}
            </span>
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#0F172A]">
              {copy.architectureTitle}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-700 font-normal">
          {copy.architectureBody}
        </p>

        {/* Pilares técnicos */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {copy.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5 transition-colors hover:border-slate-200"
            >
              <h3 className="flex items-center gap-2 text-[16.5px] font-bold text-[#0F172A]">
                <CheckCircle2 className="size-4.5 text-[#059669] shrink-0" />
                <span>{pillar.title}</span>
              </h3>
              <p className="mt-2 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ventajas y Limitaciones Técnicas Reales (Transparencia Total) */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-emerald-200 bg-[#F0FDF4] p-6 shadow-xs">
          <h2 className="text-[18px] font-bold text-[#0F172A] flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-[#059669]" />
            <span>
              {locale === "ca" ? "Garanties de privadesa" : locale === "en" ? "Privacy Guarantees" : "Garantías de privacidad"}
            </span>
          </h2>
          <ul className="mt-3.5 space-y-2.5 text-[14.5px] sm:text-[15px] text-slate-700 leading-relaxed list-disc pl-5">
            <li>
              {locale === "ca"
                ? "El contingut dels teus PDFs mai no viatja per la xarxa a servidors centrals."
                : locale === "en"
                ? "Document contents never traverse the network to remote backend servers."
                : "El contenido de tus PDFs nunca viaja por la red hacia servidores centrales."}
            </li>
            <li>
              {locale === "ca"
                ? "Resistència nativa contra filtracions externes de bases de dades documentals."
                : locale === "en"
                ? "Native zero-risk immunity against remote document database leaks."
                : "Inmunidad nativa frente a filtraciones de bases de datos remotas."}
            </li>
            <li>
              {locale === "ca"
                ? "Execució en memòria volàtil que s'elimina en tancar la pestanya."
                : locale === "en"
                ? "All volatile buffers are reclaimed instantly upon tab termination."
                : "Ejecución en memoria volátil descartada al cerrar la pestaña."}
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-amber-200 bg-[#FFFBEB] p-6 shadow-xs">
          <h2 className="text-[18px] font-bold text-[#0F172A] flex items-center gap-2.5">
            <AlertTriangle className="size-5 text-[#D97706]" />
            <span>
              {locale === "ca" ? "Límits de l'entorn navegador" : locale === "en" ? "Browser Environment Limits" : "Límites del entorno navegador"}
            </span>
          </h2>
          <ul className="mt-3.5 space-y-2.5 text-[14.5px] sm:text-[15px] text-slate-700 leading-relaxed list-disc pl-5">
            <li>
              {locale === "ca"
                ? "La capacitat de memòria RAM disponible al dispositiu limita fitxers gegants (>150-200 MB)."
                : locale === "en"
                ? "Local device RAM governs the throughput on massive files (>150-200 MB)."
                : "La memoria RAM disponible en tu dispositivo condiciona archivos masivos (>150-200 MB)."}
            </li>
            <li>
              {locale === "ca"
                ? "L'OCR en WebAssembly consumeix cicles de CPU del dispositiu local."
                : locale === "en"
                ? "WebAssembly OCR allocates local client CPU cycles rather than server clusters."
                : "El reconocimiento OCR mediante WebAssembly utiliza la CPU de tu propio equipo."}
            </li>
            <li>
              {locale === "ca"
                ? "En mòbils d'entrada, processos de desenes de pàgines simultànies poden trigar més segons."
                : locale === "en"
                ? "Processing dozens of dense pages on entry-level mobile devices takes more seconds."
                : "En móviles de gama de entrada, lotes de decenas de páginas densas pueden requerir más tiempo."}
            </li>
          </ul>
        </div>
      </section>

      {/* Titularidad, Operación y Contacto Directo */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
        <h2 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
          <Mail className="size-6 text-[#EC3C2D]" />
          <span>{copy.contactTitle}</span>
        </h2>
        <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-700 font-normal">
          {copy.contactBody}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 pt-5 border-t border-slate-100">
          <a
            href={`mailto:${OFFICIAL_CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] px-5 py-2.5 text-[14.5px] font-bold text-white shadow-xs transition-colors hover:bg-[#D93426]"
          >
            <Mail className="size-4" />
            <span>{OFFICIAL_CONTACT_EMAIL}</span>
          </a>

          <div className="flex items-center gap-3 text-[14.5px] font-semibold text-slate-600">
            <Link to={SECTION_ROUTE} params={privacyParams(locale)} className="hover:text-[#EC3C2D] transition-colors">
              {t.nav.privacy}
            </Link>
            <span>•</span>
            <Link to={SECTION_ROUTE} params={cookiesParams(locale)} className="hover:text-[#EC3C2D] transition-colors">
              {t.nav.cookies || "Cookies"}
            </Link>
            <span>•</span>
            <Link to={SECTION_ROUTE} params={termsParams(locale)} className="hover:text-[#EC3C2D] transition-colors">
              {t.nav.terms || "Términos"}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
