import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  BookOpen,
  ExternalLink,
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
    iconText: "text-[#C9302C]",
  },
  ecommerce: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#C9302C]",
  },
  empresas: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#C9302C]",
  },
  tecnica: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#C9302C]",
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
  badgeVariant?: "brand" | "category";
  subtitle: string;
  visual?: React.ReactNode;
  notice?: {
    eyebrow?: string;
    title: string;
    description: string;
    variant?: "brand" | "category" | "navy" | "coral";
    icon?: React.ReactNode;
  };
}

export function GuideHero({
  locale,
  guide,
  badgeLabel,
  badgeIcon,
  badgeVariant = "category",
  subtitle,
  visual,
  notice,
}: GuideHeroProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const catAccent = CATEGORY_ACCENTS[guide.category as GuideCategory] || CATEGORY_ACCENTS.educacion;
  const badgeColors =
    badgeVariant === "brand"
      ? "bg-[#C9302C] border-[#0F0F12] text-white"
      : `${catAccent.badgeBg} ${catAccent.badgeBorder} ${catAccent.badgeText}`;

  const guidesLabel = isCa ? "Guies" : isEn ? "Guides" : "Guías";
  const guideTitle = guide.title[locale] || guide.title.es;

  const heroCopy = (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold">
        <span
          className={`guide-hero__badge inline-flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-[2px_2px_0_#0F0F12] ${badgeColors}`}
          data-category={guide.category}
          data-variant={badgeVariant}
        >
          {badgeIcon && (
            <span
              className={`guide-hero__badge-icon ${
                badgeVariant === "brand" ? "text-white" : catAccent.iconText
              }`}
            >
              {badgeIcon}
            </span>
          )}
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
            ? `Actualitzat: ${Number.isNaN(Date.parse(guide.modifiedDate)) ? guide.modifiedDate : new Intl.DateTimeFormat("ca-ES", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(guide.modifiedDate))}`
            : isEn
              ? `Updated: ${Number.isNaN(Date.parse(guide.modifiedDate)) ? guide.modifiedDate : new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(guide.modifiedDate))}`
              : `Actualizado: ${Number.isNaN(Date.parse(guide.modifiedDate)) ? guide.modifiedDate : new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(guide.modifiedDate))}`}
        </span>
      </div>

      <h1 className="text-display mt-6 font-black tracking-[-0.035em] text-[#0F0F12]">
        {guide.title[locale] || guide.title.es}
      </h1>

      <p className="mt-5 max-w-[780px] text-[18px] font-medium leading-relaxed text-slate-800 sm:text-[20px]">
        {subtitle}
      </p>

      {notice && (
        <aside
          className={`guide-hero-notice mt-7 max-w-[860px] ${
            notice.eyebrow || notice.icon ? "guide-hero-notice--featured" : ""
          }`}
          data-variant={notice.variant ?? "brand"}
        >
          {notice.eyebrow && <span className="guide-hero-notice__eyebrow">{notice.eyebrow}</span>}
          <div className="guide-hero-notice__heading">
            {notice.icon && (
              <span className="guide-hero-notice__icon" aria-hidden="true">
                {notice.icon}
              </span>
            )}
            {notice.eyebrow || notice.icon ? (
              <h2 className="guide-hero-notice__title">{notice.title}</h2>
            ) : (
              <strong className="guide-hero-notice__title">{notice.title}</strong>
            )}
          </div>
          <p className="guide-hero-notice__description">{notice.description}</p>
        </aside>
      )}
    </>
  );

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
      {visual ? (
        <div className="guide-hero__visual-layout">
          <div className="min-w-0">{heroCopy}</div>
          <div className="guide-hero__visual">{visual}</div>
        </div>
      ) : (
        heroCopy
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
    <figure
      className={`guide-infographic my-8 overflow-hidden bg-white ${
        borderless ? "" : "border-y border-slate-200"
      }`}
    >
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
                <span className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#C9302C] text-white flex items-center justify-center font-black text-sm shadow-[1px_1px_0_#0F0F12]">
                  1
                </span>
                <h5 className="font-black text-[18px] text-[#0F0F12]">
                  Entrega de un solo archivo
                </h5>
              </div>
              <p className="text-[15.5px] text-slate-700 leading-relaxed font-normal">
                Si la tarea solo autoriza 1 adjunto, aplica <strong>Comprimir PDF</strong>{" "}
                preservando la memoria unificada del trabajo y la nitidez de tipografías.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white flex items-center justify-center font-black text-sm shadow-[1px_1px_0_#0F0F12]">
                  2
                </span>
                <h5 className="font-black text-[18px] text-[#0F0F12]">
                  Se admiten múltiples adjuntos
                </h5>
              </div>
              <p className="text-[15.5px] text-slate-700 leading-relaxed font-normal">
                Si la plataforma acepta varios documentos, aplica{" "}
                <strong>Dividir PDF por tamaño</strong> generando tomos numerados de 5 a 10 MB.
              </p>
            </div>
          </div>
        </div>
      )}
      {caption && (
        <figcaption className="border-t border-[#171717] bg-white px-5 py-3 text-center text-[13px] font-semibold leading-relaxed text-slate-700 sm:text-[14px]">
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
    brand: "border-[#171717] bg-white text-slate-700 shadow-[3px_3px_0_#171717]",
    category: "border-[#171717] bg-white text-slate-700",
    navy: "border-[#171717] bg-white text-slate-700",
    white: "border-[#171717] bg-white text-slate-700",
  }[variant];

  const titleStyles = {
    brand: "text-[#171717]",
    category: "text-[#171717]",
    navy: "text-[#171717]",
    white: "text-[#171717]",
  }[variant];

  return (
    <aside
      className={`guide-callout my-7 rounded-xl border-2 px-5 py-4 text-[15px] ${styles} ${className}`}
      data-variant={variant}
    >
      {title && (
        <div className={`mb-2 flex items-center gap-2.5 font-black text-[16px] ${titleStyles}`}>
          {icon || <Info className="size-5 shrink-0 text-[#C9302C]" />}
          <span>{title}</span>
        </div>
      )}
      <div className="leading-relaxed">{children}</div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. GUIDE STEP (ORDERED SYSTEM STEP — COMPACT LEFT-BORDER VARIANT)          */
/* -------------------------------------------------------------------------- */

export interface GuideStepProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  badge?: string;
}

export function GuideStep({ stepNumber, title, children, action }: GuideStepProps) {
  const formattedNumber = String(stepNumber).padStart(2, "0");

  return (
    <div className="my-5 flex gap-4 items-start">
      <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#171717] bg-[#C9302C] text-[13px] font-black text-white shrink-0 mt-0.5 shadow-[2px_2px_0_#171717]">
        {formattedNumber}
      </span>
      <div className="flex-1 min-w-0 border-l-2 border-[#171717] pl-4 pb-1">
        <h3 className="text-[18px] sm:text-[20px] font-black text-[#0F0F12] tracking-tight leading-snug">
          {title}
        </h3>
        <div className="mt-2 text-[15.5px] sm:text-[16.5px] leading-relaxed text-slate-700 font-normal">
          {children}
        </div>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. GUIDE CTA STRIP (COMPACT INLINE CTA — FIXES PROP MISMATCH)              */
/* -------------------------------------------------------------------------- */

export interface GuideCTAProps {
  /** Primary navigation target */
  to?: string;
  /** Alias for `to` accepted from older guide call sites */
  toolHref?: string;
  eyebrow?: string;
  title?: string;
  /** Primary description */
  description?: string;
  /** Alias for `description` accepted from older guide call sites */
  helperText?: string;
  buttonText: string;
  icon?: React.ReactNode;
  variant?: "solid-red" | "solid-card";
  className?: string;
}

export function GuideCTA({
  to,
  toolHref,
  eyebrow,
  title,
  description,
  helperText,
  buttonText,
  icon,
  className = "",
}: GuideCTAProps) {
  const href = to ?? toolHref ?? "/";
  const desc = description ?? helperText;

  return (
    <div className={`guide-cta my-8 ${className}`}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          {eyebrow && (
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#C9302C] mb-1">
              {eyebrow}
            </span>
          )}
          {title && (
            <p className="text-[17px] sm:text-[18px] font-black text-[#0F0F12] leading-snug">
              {title}
            </p>
          )}
          {desc && (
            <p className="mt-1 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600 font-medium">
              {desc}
            </p>
          )}
        </div>
        <Link
          to={href}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#C9302C] text-white hover:bg-[#D93426] min-h-[44px] px-5 py-2.5 text-[14.5px] font-black shadow-[3px_3px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] whitespace-nowrap"
        >
          {icon}
          <span>{buttonText}</span>
          <ArrowRight className="size-4" />
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
  compact?: boolean;
  showMascot?: boolean;
}

export function GuideMascotCallout({
  variant,
  title,
  description,
  children,
  alt = "Mascota oficial de BreadPDF",
  badge,
  background = "red",
  compact = false,
  showMascot = true,
}: GuideMascotCalloutProps) {
  const imgSrc = BRAND_ASSETS.mascots[variant];

  return (
    <aside
      className={`guide-mascot-callout my-8 rounded-xl border-2 border-[#171717] bg-white text-[#171717] shadow-[3px_3px_0_#171717] ${
        compact ? "guide-mascot-callout--editorial" : ""
      }`}
      data-background={background}
    >
      <div
        className={
          compact
            ? "flex items-start gap-3 sm:gap-4"
            : "flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6"
        }
      >
        {showMascot && (
          <div className="flex shrink-0 items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={100}
              height={100}
              className={`select-none object-contain pointer-events-none ${
                compact ? "size-11 sm:size-14" : "size-20 sm:size-24"
              }`}
              loading="lazy"
            />
          </div>
        )}
        <div className={`min-w-0 flex-1 ${compact ? "text-left" : "text-center sm:text-left"}`}>
          {badge && (
            <span
              className={`mb-1.5 inline-block text-[11px] font-black uppercase tracking-[0.12em] text-[#C9302C] ${
                compact ? "guide-mascot-callout__badge" : ""
              }`}
            >
              {badge}
            </span>
          )}
          <p
            className={`font-black leading-snug tracking-tight ${
              compact
                ? "guide-mascot-callout__title text-[19px] sm:text-[22px]"
                : "text-[19px] sm:text-[21px]"
            }`}
          >
            {title}
          </p>
          <p
            className={`mt-1.5 text-[15px] font-normal leading-relaxed text-slate-700 sm:text-[16px] ${
              compact ? "guide-mascot-callout__description" : ""
            }`}
          >
            {description}
          </p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </aside>
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
  const faqId = React.useId();
  const [openFaqs, setOpenFaqs] = React.useState<Set<number>>(() => new Set());

  return (
    <section
      className="guide-faq mt-14 border-t border-slate-200 pt-8"
      aria-labelledby="faq-section-title"
    >
      <h2
        id="faq-section-title"
        className="flex items-center gap-2.5 text-[26px] font-black tracking-tight text-[#0F0F12] sm:text-[32px]"
      >
        <HelpCircle className="size-6 shrink-0 text-[#C9302C]" />
        <span>{title}</span>
      </h2>
      <div className="guide-faq__list mt-6 overflow-hidden border-2 border-[#171717] bg-white">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group px-4 transition-colors sm:px-5"
            onToggle={(event) => {
              const isOpen = event.currentTarget.open;
              setOpenFaqs((current) => {
                const next = new Set(current);
                if (isOpen) next.add(idx);
                else next.delete(idx);
                return next;
              });
            }}
          >
            <summary
              aria-controls={`${faqId}-answer-${idx}`}
              aria-expanded={openFaqs.has(idx)}
              className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-bold text-[#0F0F12] select-none sm:text-[17px] [&::-webkit-details-marker]:hidden"
            >
              <span className="leading-snug">{faq.q}</span>
              <span
                className="guide-faq__toggle shrink-0 rounded-full border-2 border-[#171717] p-1.5 text-white transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                <ChevronDown className="size-4" />
              </span>
            </summary>
            <div
              id={`${faqId}-answer-${idx}`}
              className="max-w-[780px] pb-5 text-[15px] font-normal leading-relaxed text-slate-700 sm:text-[16px]"
            >
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
  children?: React.ReactNode;
  sources?: GuideFooterSource[];
  description?: string;
}

export interface GuideFooterSource {
  organization: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}

export function GuideFooterSources({
  title,
  children,
  sources,
  description,
}: GuideFooterSourcesProps) {
  const headingId = React.useId();

  if (sources) {
    return (
      <section className="guide-footer-sources" aria-labelledby={headingId}>
        <div className="guide-footer-sources__heading">
          <span className="guide-footer-sources__icon" aria-hidden="true">
            <BookOpen className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 id={headingId} className="guide-footer-sources__title">
              {title}
            </h2>
            {description && <p className="guide-footer-sources__description">{description}</p>}
          </div>
        </div>
        <ul className="guide-footer-sources__list">
          {sources.map((source) => (
            <li
              className="guide-footer-sources__item"
              key={`${source.organization}-${source.title}`}
            >
              {source.href ? (
                <a
                  className="guide-footer-sources__link"
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="guide-footer-sources__copy">
                    <span className="guide-footer-sources__organization">
                      {source.organization}
                    </span>
                    <span className="guide-footer-sources__source-title">{source.title}</span>
                    {source.hrefLabel && (
                      <span className="guide-footer-sources__url">({source.hrefLabel}).</span>
                    )}
                  </span>
                  <ExternalLink
                    className="guide-footer-sources__external-icon"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <div className="guide-footer-sources__copy">
                  <span className="guide-footer-sources__organization">{source.organization}</span>
                  <span className="guide-footer-sources__source-title">{source.title}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <footer className="mt-14 border-t border-slate-200 py-6 sm:py-8">
      <div className="mb-3 flex items-center gap-2.5">
        <BookOpen className="size-5 shrink-0 text-[#C9302C]" />
        <h3 className="font-black text-[#0F0F12] text-[19px] sm:text-[21px] tracking-tight">
          {title}
        </h3>
      </div>
      <div className="space-y-2 text-[14.5px] font-normal leading-relaxed text-slate-700 sm:text-[15.5px]">
        {children}
      </div>
    </footer>
  );
}
import "./guide-editorial.css";
