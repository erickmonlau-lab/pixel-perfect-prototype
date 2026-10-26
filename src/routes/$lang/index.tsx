import { createFileRoute } from '@tanstack/react-router'
import {
  CompressDocIcon,
  WordFileIcon,
  RotateDocIcon,
  OcrFileIcon,
  MergeDocIcon,
  JpgFileIcon,
  ProtectDocIcon,
  ExcelFileIcon,
  SplitDocIcon,
  SignDocIcon,
  ExtractPagesIcon,
  RepairDocIcon,
} from "@/components/site/RichToolIcon";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const t = UI[locale];
    return {
      meta: [
        { title: t.meta.homeTitle },
        { name: "description", content: t.meta.homeDescription },
        { property: "og:title", content: t.meta.homeTitle },
        { property: "og:description", content: t.meta.homeDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternateLinks(locale, { kind: "home" }),
    };
  },
  component: Home,
});

function Home() {
  const { locale, t } = useLocale();

  const heroCopy = {
    es: {
      line1: "TODAS TUS HERRAMIENTAS",
      line2: "EN UN SOLO LUGAR.",
      instantBadge: "Procesado instantáneo en tu navegador",
      progressComplete: "100% Completado",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% AHORRO",
      privateTitle: "100% Privado",
      privateSubtitle: "Cero subida a servidores remotos",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
    ca: {
      line1: "TOTES LES TEVES EINES",
      line2: "EN UN SOL LLOC.",
      instantBadge: "Processat instantani al teu navegador",
      progressComplete: "100% Completat",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% ESTALVI",
      privateTitle: "100% Privat",
      privateSubtitle: "Sense transmissió a servidors",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
    en: {
      line1: "EVERY SINGLE TOOL FOR",
      line2: "IN ONE SINGLE PLACE.",
      instantBadge: "Instant processing in your browser",
      progressComplete: "100% Complete",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% SAVED",
      privateTitle: "100% Private",
      privateSubtitle: "Zero remote server uploads",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
  }[locale as "es" | "ca" | "en"] ?? {
    line1: "TODAS TUS HERRAMIENTAS",
    line2: "EN UN SOLO LUGAR.",
    instantBadge: "Procesado instantáneo en tu navegador",
    progressComplete: "100% Completado",
    reductionSaved: "24.5 MB",
    reductionCurrent: "3.2 MB",
    reductionBadge: "-80% AHORRO",
    privateTitle: "100% Privado",
    privateSubtitle: "Cero subida a servidores remotos",
    convertFrom: "PDF",
    convertTo: "DOCX / XLSX",
  };

  return (
    <>
      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (GYMVITY style)
          Wide canvas max-w-[1440px], 3-column layout, display headline clamp, alternating cards
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          
          {/* Header con tipografía display contundente y botón rectangular rojo neobrutalista */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                <BookOpen className="size-4 text-[#EC3C2D]" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES AND TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-[2.8rem] sm:text-[3.6rem] lg:text-[4.2rem] font-black text-[#0F0F12] leading-[1.05] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-4 text-[18px] sm:text-[20px] text-slate-800 max-w-3xl font-medium leading-relaxed">
                {locale === "ca"
                  ? "Manuals pràctics basats en estàndards tècnics per optimitzar, unificar i preparar documents oficials amb privadesa total."
                  : locale === "en"
                  ? "Practical in-depth manuals based on ISO standards to compress, merge, and protect sensitive documents locally."
                  : "Manuales prácticos basados en estándares técnicos para optimizar, unificar y preparar documentos oficiales con total privacidad."}
              </p>
            </div>

            {/* Botón rectangular neobrutalista rojo con sombra sólida negra perfecta shadow-[4px_4px_0_#0F0F12] */}
            <Link
              to={SECTION_ROUTE}
              params={guidesHubParams(locale)}
              className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-8 py-4 text-[16px] font-black text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 6 tarjetas: ancho generoso 3 columnas en escritorio, alternando blanco y negro */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide, idx) => {
              const isBlackCard = idx % 3 === 1; // Alternancia elegante
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              return (
                <article
                  key={guide.canonicalSlug}
                  className={`group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#0F0F12] p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] ${
                    isBlackCard ? "bg-[#0F0F12] text-white" : "bg-white text-[#0F0F12]"
                  }`}
                >
                  <div>
                    {/* Fila superior: Badge de categoría y tiempo de lectura */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className={`inline-block rounded-lg border-2 border-[#0F0F12] px-3.5 py-1 text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-[2px_2px_0_#0F0F12] ${
                        isBlackCard ? "bg-white text-[#0F0F12]" : "bg-[#0F0F12] text-white"
                      }`}>
                        {guide.category}
                      </span>
                      <span className={`flex items-center gap-1.5 font-bold text-xs shrink-0 ${
                        isBlackCard ? "text-slate-300" : "text-slate-600"
                      }`}>
                        <Clock className="size-3.5" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía: 23-26px con contraste explícito */}
                    <h3 className={`text-[22px] sm:text-[25px] font-black leading-snug tracking-tight transition-colors ${
                      isBlackCard ? "text-white group-hover:text-[#EC3C2D]" : "text-[#0F0F12] group-hover:text-[#EC3C2D]"
                    }`}>
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción con texto nítido de 16px/17px */}
                    <p className={`mt-3.5 text-[16px] sm:text-[17px] leading-relaxed font-normal ${
                      isBlackCard ? "text-slate-300" : "text-slate-700"
                    }`}>
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta con autor y botón rojo uniforme */}
                  <div className={`mt-8 pt-5 border-t-2 flex items-center justify-between gap-3 ${
                    isBlackCard ? "border-white/15" : "border-[#0F0F12]/10"
                  }`}>
                    <span className={`text-[13px] font-bold leading-tight max-w-[150px] ${
                      isBlackCard ? "text-slate-400" : "text-slate-700"
                    }`}>
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="group/btn inline-flex items-center gap-2 text-[15px] font-black text-white bg-[#EC3C2D] hover:bg-[#D93426] border-2 border-[#0F0F12] rounded-xl px-5 py-2.5 min-h-[46px] shadow-[3px_3px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] shrink-0"
                    >
                      <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
