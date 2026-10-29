import { Link } from "@tanstack/react-router";
import { ShieldCheck, Cpu, Mail, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useLocale } from "@/lib/i18n/context";
import { SECTION_ROUTE, privacyParams, cookiesParams, termsParams } from "@/lib/i18n/routing";
import { OFFICIAL_CONTACT_EMAIL, BRAND_ASSETS } from "@/lib/brand";

export function AboutPage() {
  const { locale, t } = useLocale();
  const copy = t.about;

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: copy.eyebrow }]} />

      {/* Hero Header Neo-Brutalist */}
      <header className="mt-4 rounded-3xl border-2 border-[#0F0F12] bg-[#FAF8F5] p-6 sm:p-10 shadow-[6px_6px_0_#0F0F12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            {/* Insignia / Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
              <Sparkles className="size-3.5 text-[#EC3C2D]" />
              <span>{copy.eyebrow}</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-black text-[#0F0F12] uppercase tracking-tight leading-[1.08]">
              {copy.title}
            </h1>

            <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-[#0F0F12] font-semibold">
              {copy.missionBody}
            </p>
          </div>

          {/* Mascota / Brand emblem en el hero */}
          <div className="hidden lg:flex shrink-0 items-center justify-center p-2">
            <picture>
              <source srcSet="/brand/hero-mascot-perfect.webp" type="image/webp" />
              <img
                src="/brand/hero-mascot-perfect.png"
                alt="Mascota BreadPDF"
                width={160}
                height={160}
                className="w-36 h-auto drop-shadow-[4px_4px_0_#0F0F12] object-contain rotate-2 hover:rotate-0 transition-transform"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </header>

      {/* Bloque Arquitectura Técnica Real Neo-Brutalist */}
      <section className="mt-10 rounded-3xl border-2 border-[#0F0F12] bg-white p-6 sm:p-10 shadow-[6px_6px_0_#0F0F12]">
        <div className="flex items-center gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[3px_3px_0_#0F0F12]">
            <Cpu className="size-6 text-white stroke-[2.5]" />
          </span>
          <div>
            <span className="inline-block rounded-md border border-[#0F0F12] bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#1D4ED8] shadow-[1px_1px_0_#0F0F12]">
              {locale === "ca" ? "Tecnologia de Processament" : locale === "en" ? "Processing Technology" : "Tecnología de Procesamiento"}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
              {copy.architectureTitle}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-[15.5px] sm:text-[17px] leading-relaxed text-slate-700 font-medium">
          {copy.architectureBody}
        </p>

        {/* 4 Pilares técnicos en cuadrícula con bordes negros 2px y sombras duras */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {copy.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl border-2 border-[#0F0F12] bg-[#FAF8F5] p-5 shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_#0F0F12] transition-all"
            >
              <h3 className="flex items-center gap-2.5 text-[16px] sm:text-[17px] font-black text-[#0F0F12]">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-[#0F0F12] bg-[#059669] text-white shadow-[1px_1px_0_#0F0F12]">
                  <CheckCircle2 className="size-4 stroke-[2.8]" />
                </span>
                <span>{pillar.title}</span>
              </h3>
              <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-slate-700 font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ventajas y Limitaciones Técnicas Reales (Neo-Brutalist Callouts) */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        {/* Garantías de privacidad: Fondo esmeralda suave con contorno negro 2px */}
        <div className="rounded-3xl border-2 border-[#0F0F12] bg-[#ECFDF5] p-6 sm:p-8 shadow-[5px_5px_0_#0F0F12]">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#059669] text-white shadow-[2px_2px_0_#0F0F12]">
              <ShieldCheck className="size-5 text-white stroke-[2.6]" />
            </span>
            <h2 className="text-[19px] sm:text-[21px] font-black text-[#0F0F12] tracking-tight">
              {locale === "ca" ? "Garanties de privadesa" : locale === "en" ? "Privacy Guarantees" : "Garantías de privacidad"}
            </h2>
          </div>

          <ul className="mt-5 space-y-3 text-[14.5px] sm:text-[15px] text-[#0F0F12] font-semibold">
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-[#0F0F12] bg-[#059669] text-white text-[10px] font-black">✓</span>
              <span>
                {locale === "ca"
                  ? "El contingut dels teus PDFs mai no viatja per la xarxa a servidors centrals."
                  : locale === "en"
                  ? "Document contents never traverse the network to remote backend servers."
                  : "El contenido de tus PDFs nunca viaja por la red hacia servidores centrales."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-[#0F0F12] bg-[#059669] text-white text-[10px] font-black">✓</span>
              <span>
                {locale === "ca"
                  ? "Resistència nativa contra filtracions externes de bases de dades documentals."
                  : locale === "en"
                  ? "Native zero-risk immunity against remote document database leaks."
                  : "Inmunidad nativa frente a filtraciones de bases de datos remotas."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-[#0F0F12] bg-[#059669] text-white text-[10px] font-black">✓</span>
              <span>
                {locale === "ca"
                  ? "Execució en memòria volàtil que s'elimina en tancar la pestanya."
                  : locale === "en"
                  ? "All volatile buffers are reclaimed instantly upon tab termination."
                  : "Ejecución en memoria volátil descartada al cerrar la pestaña."}
              </span>
            </li>
          </ul>
        </div>

        {/* Límites del entorno navegador: Fondo ámbar suave con contorno negro 2px */}
        <div className="rounded-3xl border-2 border-[#0F0F12] bg-[#FFFBEB] p-6 sm:p-8 shadow-[5px_5px_0_#0F0F12]">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#D97706] text-white shadow-[2px_2px_0_#0F0F12]">
              <AlertTriangle className="size-5 text-white stroke-[2.6]" />
            </span>
            <h2 className="text-[19px] sm:text-[21px] font-black text-[#0F0F12] tracking-tight">
              {locale === "ca" ? "Límits de l'entorn navegador" : locale === "en" ? "Browser Environment Limits" : "Límites del entorno navegador"}
            </h2>
          </div>

          <ul className="mt-5 space-y-3 text-[14.5px] sm:text-[15px] text-[#0F0F12] font-semibold">
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-[#0F0F12] bg-[#D97706] text-white text-[10px] font-black">!</span>
              <span>
                {locale === "ca"
                  ? "La capacitat de memòria RAM disponible al dispositiu limita fitxers gegants (>150-200 MB)."
                  : locale === "en"
                  ? "Local device RAM governs the throughput on massive files (>150-200 MB)."
                  : "La memoria RAM disponible en tu dispositivo condiciona archivos masivos (>150-200 MB)."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-[#0F0F12] bg-[#D97706] text-white text-[10px] font-black">!</span>
              <span>
                {locale === "ca"
                  ? "L'OCR en WebAssembly consumeix cicles de CPU del dispositiu local."
                  : locale === "en"
                  ? "WebAssembly OCR allocates local client CPU cycles rather than server clusters."
                  : "El reconocimiento OCR mediante WebAssembly utiliza la CPU de tu propio equipo."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-[#0F0F12] bg-[#D97706] text-white text-[10px] font-black">!</span>
              <span>
                {locale === "ca"
                  ? "En mòbils d'entrada, processos de desenes de pàgines simultànies poden trigar més segons."
                  : locale === "en"
                  ? "Processing dozens of dense pages on entry-level mobile devices takes more seconds."
                  : "En móviles de gama de entrada, lotes de decenas de páginas densas pueden requerir más tiempo."}
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Titularidad, Operación y Contacto Directo */}
      <section className="mt-10 rounded-3xl border-2 border-[#0F0F12] bg-white p-6 sm:p-10 shadow-[6px_6px_0_#0F0F12]">
        <div className="flex items-center gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[3px_3px_0_#0F0F12]">
            <Mail className="size-6 text-white stroke-[2.5]" />
          </span>
          <div>
            <span className="inline-block rounded-md border border-[#0F0F12] bg-[#FFF5F2] px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#EC3C2D] shadow-[1px_1px_0_#0F0F12]">
              {locale === "ca" ? "Suport i Contacte" : locale === "en" ? "Support & Contact" : "Soporte y Contacto"}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
              {copy.contactTitle}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-[15.5px] sm:text-[17px] leading-relaxed text-slate-700 font-medium">
          {copy.contactBody}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t-2 border-[#0F0F12]/10">
          <a
            href={`mailto:${OFFICIAL_CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_#0F0F12] transition-all cursor-pointer"
          >
            <Mail className="size-4.5 stroke-[2.8]" />
            <span>{OFFICIAL_CONTACT_EMAIL}</span>
          </a>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[14px] font-bold text-[#0F0F12]">
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              className="px-3 py-1.5 rounded-lg border-1.5 border-[#0F0F12] bg-[#FAF8F5] hover:bg-white hover:text-[#EC3C2D] shadow-[1.5px_1.5px_0_#0F0F12] transition-all"
            >
              {t.nav.privacy}
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={cookiesParams(locale)}
              className="px-3 py-1.5 rounded-lg border-1.5 border-[#0F0F12] bg-[#FAF8F5] hover:bg-white hover:text-[#EC3C2D] shadow-[1.5px_1.5px_0_#0F0F12] transition-all"
            >
              {(t.nav as Record<string, string>)["cookies"] || "Cookies"}
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={termsParams(locale)}
              className="px-3 py-1.5 rounded-lg border-1.5 border-[#0F0F12] bg-[#FAF8F5] hover:bg-white hover:text-[#EC3C2D] shadow-[1.5px_1.5px_0_#0F0F12] transition-all"
            >
              {(t.nav as Record<string, string>)["terms"] || "Términos"}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
