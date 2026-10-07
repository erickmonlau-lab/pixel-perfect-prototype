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
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-8 sm:pt-10">
      <Breadcrumb
        items={[
          {
            label: isCa ? "Guies" : isEn ? "Guides" : "Guías",
          },
        ]}
      />

      {/* Header Banner */}
      <section className="animate-rise rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
        <div className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-[#EC3C2D]">
          <BookOpen className="size-4" />
          <span>{hubEyebrow}</span>
        </div>
        <h1 className="text-display mt-3 max-w-4xl text-[2.2rem] font-black tracking-tight text-[#0F172A] sm:text-5xl">
          {hubTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-[18px] leading-relaxed text-slate-600 font-normal">
          {hubDesc}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[13.5px] text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1 font-semibold text-slate-700">
            <Sparkles className="size-3.5 text-[#EC3C2D]" />
            {GUIDES.length} {isCa ? "manuals exhaustius" : isEn ? "in-depth guides" : "manuales exhaustivos"}
          </span>
          <span>•</span>
          <span>
            {isCa
              ? "Revisió editorial: Setembre 2026"
              : isEn
              ? "Editorial review: September 2026"
              : "Revisión editorial: Septiembre 2026"}
          </span>
          <span>•</span>
          <span>
            {isCa
              ? "ISO 32000 & W3C Standards"
              : isEn
              ? "ISO 32000 & W3C Standards"
              : "Estándares ISO 32000 y W3C"}
          </span>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="mt-12 space-y-6" aria-label="Llista de guies">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, idx) => {
            const catCfg =
              CATEGORY_CONFIG[guide.category as keyof typeof CATEGORY_CONFIG] ||
              CATEGORY_CONFIG.educacion;
            const CatIcon = catCfg.icon;
            const title = guide.title[locale] || guide.title.es;
            const desc = guide.seoDescription[locale] || guide.seoDescription.es;
            const targetPath = guidePath(locale, guide.canonicalSlug);

            return (
              <article
                key={guide.canonicalSlug}
                style={{ animationDelay: `${idx * 40}ms` }}
                className={`animate-rise flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${catCfg.borderColor}`}
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11.5px] font-black uppercase tracking-wider ${catCfg.badgeBg}`}
                    >
                      <CatIcon className="size-3 text-white" />
                      <span>{catCfg.label[locale] || catCfg.label.es}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-slate-500">
                      <Clock className="size-3.5 text-slate-400" />
                      {readingTimeText(guide.readingTimeMinutes)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-4 text-[19px] font-bold leading-snug text-[#0F172A] line-clamp-2">
                    <Link
                      to={targetPath as any}
                      className="hover:text-[#EC3C2D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3C2D]/30 rounded-md"
                    >
                      {title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 line-clamp-3 font-normal">
                    {desc}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[12px] text-slate-400 font-medium">
                    {guide.author.name}
                  </span>
                  <Link
                    to={targetPath as any}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#EC3C2D] hover:text-[#D93426] transition-colors group"
                  >
                    <span>{readGuideText}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
