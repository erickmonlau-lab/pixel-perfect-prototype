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
    badgeBg: "bg-emerald-700 text-white",
    accent: "bg-emerald-600",
  },
  empresas: {
    icon: Building2,
    label: {
      es: "Empresas & Administración",
      ca: "Empreses & Administració",
      en: "Business & Administration",
    },
    badgeBg: "bg-purple-700 text-white",
    accent: "bg-purple-600",
  },
  ecommerce: {
    icon: ShoppingCart,
    label: {
      es: "Ecommerce & Web",
      ca: "Ecommerce & Web",
      en: "Ecommerce & Web",
    },
    badgeBg: "bg-blue-700 text-white",
    accent: "bg-blue-600",
  },
  tecnica: {
    icon: Wrench,
    label: {
      es: "Técnica & Formatos",
      ca: "Tècnica & Formats",
      en: "Technical & Formats",
    },
    badgeBg: "bg-sky-700 text-white",
    accent: "bg-sky-600",
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
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-16 pt-6 sm:pt-8">
      <Breadcrumb
        items={[
          {
            label: isCa ? "Guies" : isEn ? "Guides" : "Guías",
          },
        ]}
      />

      {/* Header Banner Editorial Contundente */}
      <section className="mt-4 rounded-2xl border-2 border-[#0F0F12] bg-white p-5 shadow-[4px_4px_0_#0F0F12] sm:p-7 lg:p-9">
        <div className="flex w-fit items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#C9302C] px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white shadow-[2px_2px_0_#0F0F12]">
          <BookOpen className="size-4 text-white" />
          <span>{hubEyebrow}</span>
        </div>
        <h1 className="text-display mt-4 max-w-4xl text-[2rem] font-black leading-[1.08] tracking-[-0.035em] text-[#0F0F12] sm:text-[2.5rem] lg:text-[3rem]">
          {hubTitle}
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-slate-800 sm:text-base">
          {hubDesc}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold text-slate-800 sm:text-[13px]">
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-1.5 text-white shadow-[2px_2px_0_#0F0F12]">
            <Sparkles className="size-4 text-[#C9302C]" />
            <span>
              {GUIDES.length}{" "}
              {isCa ? "guies pràctiques" : isEn ? "practical guides" : "guías prácticas"}
            </span>
          </span>
          <span className="hidden text-slate-400 sm:inline">•</span>
          <span className="text-slate-700">
            {isCa
              ? "Revisió editorial: Setembre 2026"
              : isEn
                ? "Editorial review: September 2026"
                : "Revisión editorial: Septiembre 2026"}
          </span>
          <span className="hidden text-slate-400 sm:inline">•</span>
          <span className="text-slate-700">
            {isCa
              ? "ISO 32000 & W3C Standards"
              : isEn
                ? "ISO 32000 & W3C Standards"
                : "Estándares ISO 32000 y W3C"}
          </span>
        </div>
      </section>

      {/* Guides Grid 3 columnas amplias en escritorio */}
      <section
        className="mt-8"
        aria-label={isCa ? "Llista de guies" : isEn ? "Guide list" : "Lista de guías"}
      >
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => {
            const categoryConfig = CATEGORY_CONFIG[guide.category];
            const CategoryIcon = categoryConfig.icon;
            const title = guide.title[locale] || guide.title.es;
            const desc = guide.seoDescription[locale] || guide.seoDescription.es;
            const targetPath = guidePath(locale, guide.canonicalSlug);

            return (
              <article
                key={guide.canonicalSlug}
                className="group flex min-h-[270px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#0F0F12] bg-white p-5 text-[#0F0F12] shadow-[4px_4px_0_#0F0F12] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] sm:p-5"
              >
                <div>
                  <div
                    className={`-mx-5 -mt-5 mb-4 h-2 ${categoryConfig.accent}`}
                    aria-hidden="true"
                  />
                  <div className="mb-4 flex items-center justify-between gap-2.5">
                    <span
                      className={`inline-flex min-w-0 items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-[2px_2px_0_#0F0F12] sm:text-[11px] ${categoryConfig.badgeBg}`}
                    >
                      <CategoryIcon className="size-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{categoryConfig.label[locale]}</span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-700 sm:text-xs">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {readingTimeText(guide.readingTimeMinutes)}
                    </span>
                  </div>

                  <h2 className="text-[19px] font-black leading-snug tracking-tight transition-colors group-hover:text-[#C9302C] sm:text-[21px]">
                    <Link
                      to={targetPath as never}
                      className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9302C]"
                    >
                      {title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-[14px] font-normal leading-relaxed text-slate-700 sm:text-[15px]">
                    {desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t-2 border-[#0F0F12] pt-4">
                  <span className="max-w-[150px] text-xs font-bold leading-tight text-slate-800">
                    {guide.author.name}
                  </span>
                  <Link
                    to={targetPath as never}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#C9302C] px-3.5 py-2 text-[13px] font-black text-white shadow-[2px_2px_0_#0F0F12] transition-colors hover:bg-[#B3261E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] sm:text-sm"
                  >
                    <span>{readGuideText}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
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
