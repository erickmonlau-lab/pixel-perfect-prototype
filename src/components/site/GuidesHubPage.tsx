import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Clock,
  ArrowRight,
  GraduationCap,
  Building2,
  ShoppingCart,
  Wrench,
  Sparkles,
} from "lucide-react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useLocale } from "@/lib/i18n/context";
import { GUIDES, type GuideDefinition } from "@/lib/guides/registry";
import { guidePath, DETAIL_ROUTE } from "@/lib/i18n/routing";
import { SEGMENTS } from "@/lib/i18n/config";

const CATEGORY_CONFIG = {
  educacion: {
    icon: GraduationCap,
    label: {
      es: "Educación & Universidad",
      ca: "Educació & Universitat",
      en: "Education & University",
    },
    badgeBg: "bg-emerald-600 text-white",
    borderColor: "border-emerald-200 hover:border-emerald-400",
  },
  empresas: {
    icon: Building2,
    label: {
      es: "Empresas & Administración",
      ca: "Empreses & Administració",
      en: "Business & Administration",
    },
    badgeBg: "bg-purple-600 text-white",
    borderColor: "border-purple-200 hover:border-purple-400",
  },
  ecommerce: {
    icon: ShoppingCart,
    label: {
      es: "Ecommerce & Web",
      ca: "Ecommerce & Web",
      en: "Ecommerce & Web",
    },
    badgeBg: "bg-blue-600 text-white",
    borderColor: "border-blue-200 hover:border-blue-400",
  },
  tecnica: {
    icon: Wrench,
    label: {
      es: "Técnica & Formatos",
      ca: "Tècnica & Formats",
      en: "Technical & Formats",
    },
    badgeBg: "bg-sky-600 text-white",
    borderColor: "border-sky-200 hover:border-sky-400",
  },
} as const;

export function GuidesHubPage() {
  const { locale } = useLocale();

  const isCa = locale === "ca";
  const isEn = locale === "en";

  const hubTitle = isCa
    ? "Guies & Tutorials de BreadPDF"
    : isEn
    ? "BreadPDF Guides & Tutorials"
    : "Guías & Tutoriales de BreadPDF";

  const hubEyebrow = isCa
    ? "Centre Editorial Documental"
    : isEn
    ? "Document Editorial Hub"
    : "Centro Editorial Documental";

  const hubDesc = isCa
    ? "Manuals pràctics basats en la normativa tècnica vigent per optimitzar, signar, unificar i preparar documents PDF amb estàndards professionals i privadesa total."
    : isEn
    ? "Step-by-step practical manuals based on current industry standards to optimize, sign, merge, and convert PDF documents with complete privacy."
    : "Manuales prácticos basados en la normativa técnica vigente para optimizar, firmar, unificar y preparar documentos PDF con estándares profesionales y privacidad total.";

  const readingTimeText = (mins: number) =>
    isCa ? `${mins} min de lectura` : isEn ? `${mins} min read` : `${mins} min de lectura`;

  const readGuideText = isCa ? "Llegir guia" : isEn ? "Read guide" : "Leer guía";

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pb-24 pt-8 sm:pt-12">
      <Breadcrumb
        items={[
          {
            label: isCa ? "Guies" : isEn ? "Guides" : "Guías",
          },
        ]}
      />

      {/* Header Banner Editorial Contundente */}
      <section className="mt-6 rounded-3xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-8 sm:p-12 lg:p-16 shadow-[6px_6px_0_#0F0F12]">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-[#0F0F12] border-2 border-[#0F0F12] px-3.5 py-1.5 rounded-lg shadow-[2px_2px_0_#0F0F12] w-fit">
          <BookOpen className="size-4 text-[#EC3C2D]" />
          <span>{hubEyebrow}</span>
        </div>
        <h1 className="text-display mt-5 max-w-5xl text-[2.6rem] sm:text-[3.5rem] lg:text-[4.2rem] font-black tracking-[-0.035em] text-[#0F0F12] leading-[1.05]">
          {hubTitle}
        </h1>
        <p className="mt-4 max-w-4xl text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-medium">
          {hubDesc}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-[13.5px] text-slate-700 font-bold">
          <span className="inline-flex items-center gap-2 bg-white border-2 border-[#0F0F12] rounded-xl px-4 py-2 shadow-[2px_2px_0_#0F0F12]">
            <Sparkles className="size-4 text-[#EC3C2D]" />
            <span>{GUIDES.length} {isCa ? "manuals exhaustius" : isEn ? "in-depth guides" : "manuales exhaustivos"}</span>
          </span>
          <span className="text-slate-400">•</span>
          <span>
            {isCa
              ? "Revisió editorial: Setembre 2026"
              : isEn
              ? "Editorial review: September 2026"
              : "Revisión editorial: Septiembre 2026"}
          </span>
          <span className="text-slate-400">•</span>
          <span>
            {isCa
              ? "ISO 32000 & W3C Standards"
              : isEn
              ? "ISO 32000 & W3C Standards"
              : "Estándares ISO 32000 y W3C"}
          </span>
        </div>
      </section>

      {/* Guides Grid 3 columnas amplias en escritorio */}
      <section className="mt-14 space-y-8" aria-label="Llista de guies">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, idx) => {
            const isBlackCard = idx % 3 === 1; // Alternancia elegante de tarjetas
            const title = guide.title[locale] || guide.title.es;
            const desc = guide.seoDescription[locale] || guide.seoDescription.es;
            const targetPath = guidePath(locale, guide.canonicalSlug);

            return (
              <article
                key={guide.canonicalSlug}
                className={`flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] ${
                  isBlackCard ? "bg-[#0F0F12] text-white" : "bg-white text-[#0F0F12]"
                }`}
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span
                      className={`inline-block rounded-lg border-2 border-[#0F0F12] px-3.5 py-1 text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-[2px_2px_0_#0F0F12] ${
                        isBlackCard ? "bg-white text-[#0F0F12]" : "bg-[#0F0F12] text-white"
                      }`}
                    >
                      {guide.category}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold shrink-0 ${
                      isBlackCard ? "text-slate-300" : "text-slate-600"
                    }`}>
                      <Clock className="size-3.5" />
                      {readingTimeText(guide.readingTimeMinutes)}
                    </span>
                  </div>

                  {/* Title: 24-28px con peso fuerte */}
                  <h2 className={`text-[22px] sm:text-[25px] font-black leading-snug tracking-tight transition-colors ${
                    isBlackCard ? "text-white group-hover:text-[#EC3C2D]" : "text-[#0F0F12] hover:text-[#EC3C2D]"
                  }`}>
                    <Link
                      to={targetPath as any}
                      className="focus-visible:outline-none"
                    >
                      {title}
                    </Link>
                  </h2>

                  {/* Description: 16-17px */}
                  <p className={`mt-4 text-[16px] sm:text-[17px] leading-relaxed font-normal ${
                    isBlackCard ? "text-slate-300" : "text-slate-700"
                  }`}>
                    {desc}
                  </p>
                </div>

                {/* Footer Link con autor y botón rojo */}
                <div className={`mt-8 pt-5 border-t-2 flex items-center justify-between gap-3 ${
                  isBlackCard ? "border-white/15" : "border-[#0F0F12]/10"
                }`}>
                  <span className={`text-[13px] font-bold leading-tight max-w-[150px] ${
                    isBlackCard ? "text-slate-400" : "text-slate-700"
                  }`}>
                    {guide.author.name}
                  </span>
                  <Link
                    to={targetPath as any}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] text-white px-5 py-2.5 text-[15px] font-black shadow-[3px_3px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] shrink-0"
                  >
                    <span>{readGuideText}</span>
                    <ArrowRight className="size-4.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
