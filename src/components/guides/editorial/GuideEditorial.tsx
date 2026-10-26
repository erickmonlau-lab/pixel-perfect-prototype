import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { GuideDefinition, GuideFaqItem } from "@/lib/guides/registry";
import { BRAND_ASSETS } from "@/lib/brand";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SECTION_ROUTE, guidesHubParams } from "@/lib/i18n/routing";

/* -------------------------------------------------------------------------- */
/* 1. GUIDE HERO                                                              */
/* -------------------------------------------------------------------------- */

export type GuideCategory = "educacion" | "empresas" | "ecommerce" | "tecnica";

export const CATEGORY_ACCENTS: Record<
  GuideCategory,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconText: string;
  }
> = {
  educacion: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
  ecommerce: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
  empresas: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
  tecnica: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
};

/* -------------------------------------------------------------------------- */
/* 1. GUIDE HERO                                                              */
/* -------------------------------------------------------------------------- */

export interface GuideHeroProps {
  locale: Locale;
  guide: GuideDefinition;
  badgeLabel: string;
  badgeIcon?: React.ReactNode;
  subtitle: string;
  notice?: {
    title: string;
    description: string;
    variant?: "brand" | "category" | "navy" | "coral";
  };
}

export function GuideHero({
  locale,
  guide,
  badgeLabel,
  badgeIcon,
  subtitle,
  notice,
}: GuideHeroProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const catAccent =
    CATEGORY_ACCENTS[guide.category as GuideCategory] ||
    CATEGORY_ACCENTS.educacion;

  const guidesLabel = isCa ? "Guies" : isEn ? "Guides" : "Guías";
  const guideTitle = guide.title[locale] || guide.title.es;

  return (
    <header className="border-b-2 border-[#0F0F12] pb-10 sm:pb-12">
      {/* Breadcrumb contextual para volver a Inicio / Guías */}
      <Breadcrumb
        items={[
          {
            label: guidesLabel,
            to: SECTION_ROUTE,
            params: guidesHubParams(locale),
          },
          {
            label: guideTitle,
          },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold mt-4">
        <span
          className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1.5 text-xs font-black tracking-wider text-white shadow-[2px_2px_0_#0F0F12] uppercase"
        >
          {badgeIcon && <span className="text-[#EC3C2D]">{badgeIcon}</span>}
          {badgeLabel}
        </span>
        <span className="text-slate-400 font-bold">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-700 font-bold text-[14px]">
          <Clock className="size-4 text-slate-600" />
          {guide.readingTimeMinutes}{" "}
          {isCa ? "min de lectura" : isEn ? "min read" : "min de lectura"}
        </span>
        <span className="text-slate-400 font-bold">•</span>
        <span className="text-slate-700 font-bold text-[14px]">
          {isCa
            ? "Actualitzat: Setembre 2026"
            : isEn
            ? "Updated: September 2026"
            : "Actualizado: Septiembre 2026"}
        </span>
      </div>

      <h1 className="text-display mt-6 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-black tracking-[-0.035em] text-[#0F0F12] leading-[1.08] max-w-5xl">
        {guide.title[locale] || guide.title.es}
      </h1>

      <p className="mt-5 text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-medium max-w-4xl">
        {subtitle}
      </p>

      {notice && (
        <div className="mt-8 rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12]">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5 size-12 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] flex items-center justify-center text-white shadow-[2px_2px_0_#0F0F12]">
              <ShieldCheck className="size-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <strong className="block font-black text-[20px] sm:text-[22px] tracking-tight leading-snug text-[#0F0F12]">
                {notice.title}
              </strong>
              <p className="mt-2.5 leading-relaxed text-[16px] sm:text-[17px] font-normal text-slate-700">
                {notice.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. GUIDE INFOGRAPHIC                                                       */
/* -------------------------------------------------------------------------- */

export interface GuideInfographicProps {
  src: string;
  alt: string;
  caption?: string;
  borderless?: boolean;
}

export function GuideInfographic({ src, alt, caption, borderless = false }: GuideInfographicProps) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12]">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={1200}
          height={480}
          className="w-full h-auto object-contain block bg-white"
          loading="eager"
          onError={() => setHasError(true)}
        />
      ) : (
        /* Diagrama metodológico de decisión interactivo SVG / Neo-brutalista */
        <div className="p-8 sm:p-10 bg-[#EDEDF0] border-b-2 border-[#0F0F12]">
          <div className="mx-auto max-w-2xl text-center mb-7">
            <span className="inline-block px-3.5 py-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#0F0F12]">
              DIAGRAMA METODOLÓGICO DE DECISIÓN
            </span>
            <h4 className="mt-3 text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
              Resolución de límites de subida en campus virtual
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] text-white flex items-center justify-center font-black text-sm shadow-[1px_1px_0_#0F0F12]">1</span>
                <h5 className="font-black text-[18px] text-[#0F0F12]">Entrega de un solo archivo</h5>
              </div>
              <p className="text-[15.5px] text-slate-700 leading-relaxed font-normal">
                Si la tarea solo autoriza 1 adjunto, aplica <strong>Comprimir PDF</strong> preservando la memoria unificada del trabajo y la nitidez de tipografías.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white flex items-center justify-center font-black text-sm shadow-[1px_1px_0_#0F0F12]">2</span>
                <h5 className="font-black text-[18px] text-[#0F0F12]">Se admiten múltiples adjuntos</h5>
              </div>
              <p className="text-[15.5px] text-slate-700 leading-relaxed font-normal">
                Si la plataforma acepta varios documentos, aplica <strong>Dividir PDF por tamaño</strong> generando tomos numerados de 5 a 10 MB.
              </p>
            </div>
          </div>
        </div>
      )}
      {caption && (
        <figcaption className="bg-[#EDEDF0] px-5 py-3.5 text-center text-[14px] text-slate-800 border-t-2 border-[#0F0F12] font-bold leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. GUIDE CALLOUT (SOLID SURFACES)                                          */
/* -------------------------------------------------------------------------- */

export interface GuideCalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: "brand" | "category" | "navy" | "white";
  icon?: React.ReactNode;
  className?: string;
}

export function GuideCallout({
  title,
  children,
  variant = "white",
  icon,
  className = "",
}: GuideCalloutProps) {
  const styles = {
    brand: "bg-[#EC3C2D] text-white border-none shadow-sm",
    category: "bg-[#059669] text-white border-none shadow-sm",
    navy: "bg-[#0F172A] text-white border-none shadow-sm",
    white: "bg-white text-slate-700 border border-slate-200 shadow-sm",
  }[variant];

  const titleStyles = {
    brand: "text-white",
    category: "text-white",
    navy: "text-white",
    white: "text-[#0F172A]",
  }[variant];

  return (
    <aside className={`rounded-2xl p-5 sm:p-6 text-[14.5px] ${styles} ${className}`}>
      {title && (
        <div className={`flex items-center gap-2.5 font-bold text-[15.5px] mb-2 ${titleStyles}`}>
          {icon || <Info className="size-5 shrink-0" />}
          <span>{title}</span>
        </div>
      )}
      <div className="leading-relaxed text-[14.5px]">{children}</div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. GUIDE STEP (ORDERED SYSTEM STEP - UNIFIED SINGLE NUMBERING)              */
/* -------------------------------------------------------------------------- */

export interface GuideStepProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  badge?: string;
}

export function GuideStep({
  stepNumber,
  title,
  children,
  action,
}: GuideStepProps) {
  const formattedNumber = String(stepNumber).padStart(2, "0");

  return (
    <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] my-6">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex size-10 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-[16px] font-black text-white shrink-0 shadow-[2px_2px_0_#0F0F12]">
          {formattedNumber}
        </span>
        <h3 className="text-[21px] sm:text-[24px] font-black text-[#0F0F12] tracking-tight">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-[16.5px] sm:text-[17.5px] leading-relaxed text-slate-800 pl-0 sm:pl-14 font-normal">
        {children}
      </div>
      {action && <div className="mt-5 pt-1 pl-0 sm:pl-14">{action}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. GUIDE CTA CARD (OFFICIAL RED SOLID CTA)                                 */
/* -------------------------------------------------------------------------- */

export interface GuideCTAProps {
  to: string;
  eyebrow?: string;
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
  variant?: "solid-red" | "solid-card";
}

export function GuideCTA({
  to,
  eyebrow,
  title,
  description,
  buttonText,
  icon,
}: GuideCTAProps) {
  return (
    <div className="my-10 rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white p-8 sm:p-9 shadow-[4px_4px_0_#0F0F12]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          {eyebrow && (
            <span className="inline-block text-[12px] font-black uppercase tracking-wider text-[#0F0F12] bg-white border-2 border-[#0F0F12] px-3 py-1 rounded-lg mb-3 shadow-[2px_2px_0_#0F0F12]">
              {eyebrow}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            {title}
          </h3>
          <p className="mt-2 text-[16px] sm:text-[17px] leading-relaxed text-white/95 font-medium">
            {description}
          </p>
        </div>
        <Link
          to={to}
          className="shrink-0 inline-flex items-center gap-2.5 rounded-xl border-2 border-[#0F0F12] bg-white text-[#0F0F12] hover:bg-[#EDEDF0] min-h-[50px] px-7 py-3.5 text-[16px] font-black shadow-[4px_4px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12]"
        >
          {icon}
          <span>{buttonText}</span>
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5.5 GUIDE MASCOT (TRANSPARENT REUSABLE CHARACTER)                          */
/* -------------------------------------------------------------------------- */

export type MascotVariant = "run" | "think" | "sad" | "celebrate";

export interface GuideMascotProps {
  variant: MascotVariant;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
  priority?: boolean;
}

export function GuideMascot({
  variant,
  size = "md",
  className = "",
  alt = "Mascota oficial BreadPDF",
  priority = false,
}: GuideMascotProps) {
  const imgSrc = BRAND_ASSETS.mascots[variant];
  const sizeClasses = {
    sm: "h-20 w-20 sm:h-24 sm:w-24",
    md: "h-28 w-28 sm:h-36 sm:w-36",
    lg: "h-36 w-36 sm:h-44 sm:w-44",
    xl: "h-44 w-44 sm:h-52 sm:w-52",
  }[size];

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={240}
      height={240}
      className={`object-contain select-none pointer-events-none ${sizeClasses} ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* 6. GUIDE MASCOT CALLOUT (CONTEXTUAL CHARACTER INTEGRATION)                 */
/* -------------------------------------------------------------------------- */

export interface GuideMascotCalloutProps {
  variant: MascotVariant;
  title: string;
  description: string;
  children?: React.ReactNode;
  alt?: string;
  badge?: string;
  background?: "red" | "navy" | "white" | "coral";
}

export function GuideMascotCallout({
  variant,
  title,
  description,
  children,
  alt = "Mascota oficial de BreadPDF",
  badge,
  background = "red",
}: GuideMascotCalloutProps) {
  const imgSrc = BRAND_ASSETS.mascots[variant];
  const isRed = background === "red" || background === "coral";
  const bgClasses = isRed
    ? "bg-[#EC3C2D] text-white"
    : background === "navy"
    ? "bg-[#0F0F12] text-white"
    : "bg-white text-[#0F0F12]";

  return (
    <div className={`my-10 rounded-2xl border-2 border-[#0F0F12] ${bgClasses} p-7 sm:p-9 shadow-[4px_4px_0_#0F0F12]`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        <div className="shrink-0 flex items-center justify-center size-24 sm:size-28 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] shadow-[2px_2px_0_#0F0F12] p-2">
          <img
            src={imgSrc}
            alt={alt}
            width={100}
            height={100}
            className="size-20 sm:size-24 object-contain select-none pointer-events-none drop-shadow-xs"
            loading="lazy"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          {badge && (
            <span className={`inline-block text-[12px] font-black uppercase tracking-wider border-2 border-[#0F0F12] px-3 py-1 rounded-lg mb-3 shadow-[2px_2px_0_#0F0F12] ${
              isRed || background === "navy" ? "bg-white text-[#0F0F12]" : "bg-[#0F0F12] text-white"
            }`}>
              {badge}
            </span>
          )}
          <h4 className="text-[22px] sm:text-[25px] font-black tracking-tight leading-snug">
            {title}
          </h4>
          <p className={`mt-2.5 text-[16px] sm:text-[17px] leading-relaxed font-normal ${
            isRed ? "text-white/95" : background === "navy" ? "text-slate-300" : "text-slate-700"
          }`}>
            {description}
          </p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* 7. GUIDE FAQ ACCORDION                                                     */
/* -------------------------------------------------------------------------- */

export interface GuideFAQProps {
  title: string;
  faqs: GuideFaqItem[];
}

export function GuideFAQ({ title, faqs }: GuideFAQProps) {
  return (
    <section className="mt-16 border-t-2 border-[#0F0F12] pt-12" aria-labelledby="faq-section-title">
      <h2
        id="faq-section-title"
        className="text-[26px] sm:text-[32px] font-black text-[#0F0F12] tracking-tight flex items-center gap-3"
      >
        <span className="size-9 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white flex items-center justify-center shadow-[2px_2px_0_#0F0F12] shrink-0">
          <HelpCircle className="size-5 text-white" />
        </span>
        <span>{title}</span>
      </h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12] transition-all"
          >
            <summary className="flex cursor-pointer items-center justify-between text-[17px] sm:text-[18px] font-black text-[#0F0F12] select-none list-none [&::-webkit-details-marker]:hidden">
              <span className="pr-4 leading-snug">{faq.q}</span>
              <span className="shrink-0 rounded-lg border-2 border-[#0F0F12] p-1.5 bg-[#EDEDF0] text-[#0F0F12] group-open:rotate-180 transition-transform shadow-[1px_1px_0_#0F0F12]">
                <ArrowRight className="size-4 rotate-90" />
              </span>
            </summary>
            <div className="mt-4 border-t-2 border-[#0F0F12]/10 pt-4 text-[16px] sm:text-[16.5px] leading-relaxed text-slate-700 font-normal">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. GUIDE FOOTER SOURCES                                                    */
/* -------------------------------------------------------------------------- */

export interface GuideFooterSourcesProps {
  title: string;
  children: React.ReactNode;
}

export function GuideFooterSources({ title, children }: GuideFooterSourcesProps) {
  return (
    <footer className="mt-14 rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12]">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0_#0F0F12]">
          <BookOpen className="size-5 text-white" />
        </div>
        <h4 className="font-black text-[#0F0F12] text-[19px] sm:text-[21px] tracking-tight">
          {title}
        </h4>
      </div>
      <div className="text-slate-700 leading-relaxed text-[15.5px] sm:text-[16.5px] space-y-3 pl-0 sm:pl-13 font-normal">
        {children}
      </div>
    </footer>
  );
}
