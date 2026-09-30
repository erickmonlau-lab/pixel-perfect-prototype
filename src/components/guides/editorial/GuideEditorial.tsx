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
    badgeBg: "bg-[#059669]",
    badgeText: "text-white",
    badgeBorder: "border-[#059669]",
    iconText: "text-white",
  },
  ecommerce: {
    badgeBg: "bg-[#2563EB]",
    badgeText: "text-white",
    badgeBorder: "border-[#2563EB]",
    iconText: "text-white",
  },
  empresas: {
    badgeBg: "bg-[#7C3AED]",
    badgeText: "text-white",
    badgeBorder: "border-[#7C3AED]",
    iconText: "text-white",
  },
  tecnica: {
    badgeBg: "bg-[#0284C7]",
    badgeText: "text-white",
    badgeBorder: "border-[#0284C7]",
    iconText: "text-white",
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
    <header className="border-b border-slate-200 pb-8 sm:pb-10">
      {/* Breadcrumb contextual para volver a Inicio / Guías */}
      <Breadcrumb
        items={[
          {
            label: guidesLabel,
          },
          {
            label: guideTitle,
          },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[13px] font-black shadow-xs ${catAccent.badgeBg} ${catAccent.badgeText}`}
        >
          {badgeIcon && <span className={catAccent.iconText}>{badgeIcon}</span>}
          {badgeLabel}
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold text-[14px]">
          <Clock className="size-4 text-slate-500" />
          {guide.readingTimeMinutes}{" "}
          {isCa ? "min de lectura" : isEn ? "min read" : "min de lectura"}
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600 font-semibold text-[14px]">
          {isCa
            ? "Actualitzat: Setembre 2026"
            : isEn
            ? "Updated: September 2026"
            : "Actualizado: Septiembre 2026"}
        </span>
      </div>

      <h1 className="text-display mt-5 text-[2.25rem] sm:text-[3.25rem] font-black tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
        {guide.title[locale] || guide.title.es}
      </h1>

      <p className="mt-4 text-[17px] sm:text-[18.5px] leading-relaxed text-slate-700 font-normal">
        {subtitle}
      </p>

      {notice && (
        <div
          className={`mt-6 rounded-2xl p-6 sm:p-7 shadow-sm border ${
            notice.variant === "coral"
              ? "bg-[#FEECEB] border-[#FDCAC7] text-[#0F172A]"
              : notice.variant === "brand"
              ? "bg-[#EC3C2D] border-transparent text-white"
              : notice.variant === "category"
              ? "bg-[#059669] border-transparent text-white"
              : "bg-[#0F172A] border-transparent text-white"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5 size-12 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#FDCAC7]/40">
              <ShieldCheck className="size-6 text-[#EC3C2D]" />
            </div>
            <div>
              <strong
                className={`block font-black text-[18px] sm:text-[20px] tracking-tight leading-snug ${
                  notice.variant === "coral" ? "text-[#0F172A]" : "text-white"
                }`}
              >
                {notice.title}
              </strong>
              <p
                className={`mt-2 leading-relaxed text-[15.5px] sm:text-[16px] font-medium ${
                  notice.variant === "coral" ? "text-slate-800" : "text-white"
                }`}
              >
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
  return (
    <figure className={`my-8 overflow-hidden ${borderless ? "bg-transparent shadow-none" : "rounded-2xl bg-white shadow-sm"}`}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={480}
        className="w-full h-auto object-contain block"
        loading="eager"
      />
      {caption && (
        <figcaption className="bg-slate-50 px-5 py-3 text-center text-[14px] text-slate-600 border-t border-slate-100 font-medium leading-relaxed">
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex items-center gap-3.5 mb-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#0F172A] text-[15px] font-black text-white shrink-0 shadow-xs">
          {formattedNumber}
        </span>
        <h3 className="text-[19px] sm:text-[21px] font-black text-[#0F172A] tracking-tight">
          {title}
        </h3>
      </div>
      <div className="mt-2 text-[15.5px] sm:text-[16px] leading-relaxed text-slate-700 pl-0 sm:pl-12">
        {children}
      </div>
      {action && <div className="mt-4 pt-1 pl-0 sm:pl-12">{action}</div>}
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
  variant = "solid-red",
}: GuideCTAProps) {
  if (variant === "solid-red") {
    return (
      <div className="my-8 rounded-2xl bg-[#EC3C2D] text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            {eyebrow && (
              <span className="inline-block text-[12px] font-black uppercase tracking-wider text-[#EC3C2D] bg-white px-2.5 py-0.5 rounded-md mb-2 shadow-xs">
                {eyebrow}
              </span>
            )}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/95">
              {description}
            </p>
          </div>
          <Link
            to={to}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-[#EC3C2D] hover:bg-slate-50 px-6 py-3.5 text-[15.5px] font-black shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            {icon}
            <span>{buttonText}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="max-w-xl">
          {eyebrow && (
            <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-[#EC3C2D] bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100 mb-2">
              {eyebrow}
            </span>
          )}
          <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
            {title}
          </h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
        <Link
          to={to}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] hover:bg-[#D43426] text-white px-5 py-3 text-[15px] font-bold shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
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

  if (background === "coral") {
    return (
      <div className="my-8 rounded-2xl bg-[#FEECEB] border border-[#FDCAC7] text-[#0F172A] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={140}
              height={140}
              className="h-28 w-28 sm:h-32 sm:w-32 object-contain select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            {badge && (
              <span className="inline-block text-[12px] font-black uppercase tracking-wider text-white bg-[#EC3C2D] px-3 py-1 rounded-full mb-2.5 shadow-xs">
                {badge}
              </span>
            )}
            <h4 className="text-[20px] sm:text-[22px] font-black text-[#0F172A] tracking-tight">
              {title}
            </h4>
            <p className="mt-2 text-[15.5px] sm:text-[16px] leading-relaxed text-slate-800 font-medium">
              {description}
            </p>
            {children && <div className="mt-3.5">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (background === "red") {
    return (
      <div className="my-8 rounded-2xl bg-[#EC3C2D] text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={128}
              height={128}
              className="h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            {badge && (
              <span className="inline-block text-[11.5px] font-black uppercase tracking-wider text-[#EC3C2D] bg-white px-2.5 py-0.5 rounded-full mb-2 shadow-xs">
                {badge}
              </span>
            )}
            <h4 className="text-[18px] sm:text-[20px] font-black text-white tracking-tight">
              {title}
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/95">
              {description}
            </p>
            {children && <div className="mt-3">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (background === "navy") {
    return (
      <div className="my-8 rounded-2xl bg-[#0F172A] text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={128}
              height={128}
              className="h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            {badge && (
              <span className="inline-block text-[11.5px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-0.5 rounded-full mb-2">
                {badge}
              </span>
            )}
            <h4 className="text-[18px] sm:text-[20px] font-black text-white tracking-tight">
              {title}
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">
              {description}
            </p>
            {children && <div className="mt-3">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="shrink-0 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={alt}
            width={128}
            height={128}
            className="h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none drop-shadow-sm"
            loading="lazy"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          {badge && (
            <span className="inline-block text-[11.5px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full mb-2">
              {badge}
            </span>
          )}
          <h4 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
            {title}
          </h4>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
            {description}
          </p>
          {children && <div className="mt-3">{children}</div>}
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
    <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="faq-section-title">
      <h2
        id="faq-section-title"
        className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5"
      >
        <HelpCircle className="size-6 text-[#EC3C2D]" />
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-slate-300"
          >
            <summary className="flex cursor-pointer items-center justify-between text-[16px] font-bold text-slate-900 select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3C2D]/40 rounded-lg">
              <span className="pr-4">{faq.q}</span>
              <span className="shrink-0 rounded-full p-1 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 group-open:rotate-180">
                <ArrowRight className="size-4 rotate-90" />
              </span>
            </summary>
            <div className="mt-3.5 border-t border-slate-100 pt-3.5 text-[15px] leading-relaxed text-slate-600">
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
    <footer className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-9 rounded-full bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-xs">
          <BookOpen className="size-4.5 text-white" />
        </div>
        <h4 className="font-black text-[#0F172A] text-[17px] sm:text-[18px] tracking-tight">
          {title}
        </h4>
      </div>
      <div className="text-slate-700 leading-relaxed text-[15px] sm:text-[15.5px] space-y-2.5 pl-0 sm:pl-12">
        {children}
      </div>
    </footer>
  );
}
