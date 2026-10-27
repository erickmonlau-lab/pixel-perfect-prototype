import { Link } from "@tanstack/react-router";
import { MessageSquare, BookOpen, ArrowRight, Wrench, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  homeParams,
  privacyParams,
  cookiesParams,
  termsParams,
  aboutParams,
  toolParams,
  guidesHubParams,
} from "@/lib/i18n/routing";
import { trackToolCatalogViewAllClicked } from "@/lib/analytics/gtm";
import { BRAND_WORDMARK, BRAND_ASSETS, OFFICIAL_CONTACT_EMAIL } from "@/lib/brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BreadPDFFooterMascot } from "./BreadPDFFooterMascot";

/** Herramientas principales para la columna HERRAMIENTAS */
const FEATURED_TOOLS = [
  { slug: "comprimir-pdf", name: "Comprimir PDF" },
  { slug: "unir-pdf", name: "Unir PDF" },
  { slug: "dividir-pdf", name: "Dividir PDF" },
  { slug: "pdf-a-jpg", name: "PDF a JPG" },
  { slug: "jpg-a-pdf", name: "JPG a PDF" },
  { slug: "rotar-pdf", name: "Rotar PDF" },
] as const;

/** Textos del footer localizados */
const FOOTER_COPY = {
  es: {
    bannerTitle: "¿Qué necesitas hacer con tu PDF?",
    bannerSub:
      "Comprime, une, divide, convierte o firma documentos al instante y 100% en tu navegador.",
    bannerCta: "Ver todas las herramientas",
    description:
      "Herramientas PDF online para comprimir, unir, dividir, convertir y editar documentos. Directamente en tu navegador sin enviar datos a servidores externos.",
    colTools: "HERRAMIENTAS",
    colInfo: "INFORMACIÓN",
    colLegal: "LEGAL",
    about: "Sobre BreadPDF",
    privacy: "Privacidad",
    support: "Soporte",
    supportDesc: OFFICIAL_CONTACT_EMAIL,
    contactEmail: OFFICIAL_CONTACT_EMAIL,
    guides: "Guías & Tutoriales",
    privacyFull: "Política de privacidad",
    cookies: "Política de cookies",
    legalTerms: "Términos del servicio",
    copyright: (year: number) => `© ${year} BreadPDF. Todos los derechos reservados.`,
    bottomTools: "Catálogo",
    bottomPrivacy: "Privacidad",
  },
  ca: {
    bannerTitle: "Què necessites fer amb el teu PDF?",
    bannerSub:
      "Comprimeix, uneix, divideix, converteix o signa documents a l'instant i 100% al teu navegador.",
    bannerCta: "Veure totes les eines",
    description:
      "Eines PDF en línia per comprimir, unir, dividir, convertir i editar documents. Directament al teu navegador sense enviar dades a servidors externs.",
    colTools: "EINES",
    colInfo: "INFORMACIÓ",
    colLegal: "LEGAL",
    about: "Sobre BreadPDF",
    privacy: "Privadesa",
    support: "Suport",
    supportDesc: OFFICIAL_CONTACT_EMAIL,
    contactEmail: OFFICIAL_CONTACT_EMAIL,
    guides: "Guies & Tutorials",
    privacyFull: "Política de privadesa",
    cookies: "Política de cookies",
    legalTerms: "Termes del servei",
    copyright: (year: number) => `© ${year} BreadPDF. Tots els drets reservats.`,
    bottomTools: "Catàleg",
    bottomPrivacy: "Privadesa",
  },
  en: {
    bannerTitle: "What do you need to do with your PDF?",
    bannerSub:
      "Compress, merge, split, convert, or sign documents instantly and 100% inside your browser.",
    bannerCta: "View all tools",
    description:
      "Online PDF tools to compress, merge, split, convert and edit documents. Directly inside your browser without uploading files to remote servers.",
    colTools: "TOOLS",
    colInfo: "INFORMATION",
    colLegal: "LEGAL",
    about: "About BreadPDF",
    privacy: "Privacy",
    support: "Support",
    supportDesc: OFFICIAL_CONTACT_EMAIL,
    contactEmail: OFFICIAL_CONTACT_EMAIL,
    guides: "Guides & Tutorials",
    privacyFull: "Privacy Policy",
    cookies: "Cookie Policy",
    legalTerms: "Terms of Service",
    copyright: (year: number) => `© ${year} BreadPDF. All rights reserved.`,
    bottomTools: "Catalog",
    bottomPrivacy: "Privacy",
  },
} as const;

/** Pequeño punto rojo decorativo reutilizable */
function Dot() {
  return (
    <span
      className="mt-[6px] size-[7px] shrink-0 rounded-full border border-[#0F0F12] bg-white"
      aria-hidden="true"
    />
  );
}

const COLUMN_HEADING_CLASS =
  "mb-3 inline-flex w-fit max-w-full items-center gap-1 rounded-full border-2 border-[#0F0F12] bg-white px-1.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.04em] text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] sm:mb-5 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[14px] sm:shadow-[3px_3px_0_#0F0F12] xl:px-3.5 xl:text-[16px]";

function ColumnHeadingIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#EC3C2D] text-white sm:size-5">
      {children}
    </span>
  );
}

export function Footer() {
  const { locale, tools } = useLocale();
  const copy = FOOTER_COPY[locale as keyof typeof FOOTER_COPY] ?? FOOTER_COPY.es;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-[#0F0F12] text-[#0F0F12] overflow-hidden">
      {/* ── BANNER ACCIÓN SUPERIOR ── */}
      <div className="border-b-2 border-[#0F0F12] bg-white py-8 sm:py-10">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-16 2xl:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-[24px] sm:text-[28px] font-black text-[#0F0F12] tracking-tight leading-tight">
              {copy.bannerTitle}
            </h3>
            <p className="mt-2 text-[15px] sm:text-[16px] text-slate-700 font-medium">
              {copy.bannerSub}
            </p>
          </div>
          <Link
            to={HOME_ROUTE}
            params={homeParams(locale)}
            hash="catalogo"
            onClick={() =>
              trackToolCatalogViewAllClicked({ source: "footer_banner", language: locale })
            }
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] text-white px-7 py-3.5 text-[16px] font-black shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer shrink-0"
          >
            <span>{copy.bannerCta}</span>
            <ArrowRight className="size-5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* CUERPO PRINCIPAL — fondo con iluminación ambiental difuminada   */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#F13B32]">
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-10 pt-12 sm:px-10 sm:pt-12 lg:px-16 xl:px-16 xl:pb-9 xl:pt-14 2xl:px-24">
          <div className="grid grid-cols-2 items-start gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-10 xl:grid-cols-[minmax(220px,1.25fr)_minmax(290px,1.1fr)_minmax(170px,0.95fr)_minmax(180px,1.05fr)_minmax(175px,0.8fr)] xl:gap-x-6 xl:gap-y-4">
            {/* ── COL 1: MARCA ── */}
            <div className="col-span-2 row-span-1 space-y-4 sm:space-y-5 xl:col-span-1 xl:row-span-2">
              <Link
                to={HOME_ROUTE}
                params={homeParams(locale)}
                className="inline-flex items-center gap-3 group select-none"
              >
                <img
                  src={BRAND_ASSETS.iconWebp}
                  alt="BreadPDF"
                  width={52}
                  height={50}
                  className="h-11 w-auto object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105 xl:h-[52px]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-heading text-[25px] font-black leading-none tracking-tight sm:text-[27px] xl:text-[30px]">
                  <span className="text-white">{BRAND_WORDMARK.bread}</span>
                  <span className="text-white">{BRAND_WORDMARK.pdf}</span>
                </span>
              </Link>

              <p className="max-w-[320px] text-[14.5px] font-medium leading-relaxed text-white sm:text-[15px]">
                {copy.description}
              </p>

              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
            </div>

            {/* COL 2: HERRAMIENTAS */}
            <div className="min-w-0 xl:col-start-2 xl:row-start-1">
              <h4 className={COLUMN_HEADING_CLASS}>
                <ColumnHeadingIcon>
                  <Wrench className="size-3" strokeWidth={2.5} />
                </ColumnHeadingIcon>
                {copy.colTools}
              </h4>
              <ul className="space-y-3 xl:space-y-3.5">
                {FEATURED_TOOLS.map((item) => {
                  const toolDef = tools.find((t) => t.canonicalSlug === item.slug);
                  const name = toolDef?.name ?? item.name;
                  return (
                    <li key={item.slug}>
                      <Link
                        to={DETAIL_ROUTE}
                        params={toolParams(locale, item.slug)}
                        className="group inline-flex items-start gap-2 text-[13px] font-semibold leading-snug text-white transition-colors hover:text-[#0F0F12] sm:text-[15px] sm:leading-relaxed"
                      >
                        <Dot />
                        <span>{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* COL 3: INFORMACIÓN */}
            <div className="min-w-0 xl:col-start-3 xl:row-span-2 xl:row-start-1">
              <h4 className={COLUMN_HEADING_CLASS}>
                <ColumnHeadingIcon>
                  <BookOpen className="size-3" strokeWidth={2.5} />
                </ColumnHeadingIcon>
                {copy.colInfo}
              </h4>
              <ul className="space-y-2 text-[13px] leading-snug sm:space-y-3 sm:text-[15px] sm:leading-relaxed">
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={aboutParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.about}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={guidesHubParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <BookOpen className="mt-[2px] size-3.5 shrink-0 text-white" />
                    <span className="min-w-0">{copy.guides}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={HOME_ROUTE}
                    params={homeParams(locale)}
                    hash="catalogo"
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.bottomTools}</span>
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${copy.contactEmail}`}
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <MessageSquare className="mt-[2px] size-3.5 shrink-0 text-white" />
                    <span>{copy.support}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* COL 4: LEGAL */}
            <div className="col-span-2 min-w-0 xl:col-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1">
              <h4 className={COLUMN_HEADING_CLASS}>
                <ColumnHeadingIcon>
                  <ShieldCheck className="size-3" strokeWidth={2.5} />
                </ColumnHeadingIcon>
                {copy.colLegal}
              </h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[13px] leading-snug sm:text-[15px] sm:leading-relaxed xl:block xl:space-y-3">
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={privacyParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.privacyFull}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={cookiesParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.cookies}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={termsParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-white transition-colors hover:text-[#0F0F12] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.legalTerms}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA de catálogo centrado en la navegación móvil y bajo Herramientas en escritorio */}
            <Link
              to={HOME_ROUTE}
              params={homeParams(locale)}
              hash="catalogo"
              onClick={() => trackToolCatalogViewAllClicked({ source: "footer", language: locale })}
              className="col-span-2 mx-auto mt-3 inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border-2 border-[#0F0F12] bg-white px-3 py-2 text-[12px] font-bold text-[#171717] shadow-[3px_3px_0_#0F0F12] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0F0F12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-4 sm:text-[14px] xl:col-span-1 xl:col-start-2 xl:row-start-2 xl:mt-5 xl:px-5 xl:py-2.5 xl:text-[15px]"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F13B32] text-[13px] font-black text-white xl:size-8">
                {tools.length}
              </span>
              <span>{copy.bannerCta}</span>
              <ArrowRight className="size-4 shrink-0 stroke-[2.5]" />
            </Link>

            {/* ── MASCOTA — a la derecha de Legal en escritorio, independiente en móvil ── */}
            <div className="col-span-2 flex justify-end pt-1 xl:col-span-1 xl:col-start-5 xl:row-span-2 xl:row-start-1 xl:items-center xl:justify-center xl:pt-0">
              <BreadPDFFooterMascot size="lg" />
            </div>
          </div>
        </div>
        {/* /container */}
      </div>
      {/* /fondo difuminado */}

      {/* ── BARRA INFERIOR LEGAL ── */}
      <div className="border-t border-white/25 bg-[#D92F28] text-white">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-1 px-6 py-3 text-center text-[12px] font-semibold sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-10 sm:py-3 sm:text-left sm:text-[13px] lg:px-16 xl:px-16 2xl:px-24">
          <p>{copy.copyright(year)}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-5">
            <Link
              to={SECTION_ROUTE}
              params={aboutParams(locale)}
              className="px-2 py-1 transition-colors hover:text-white/80 hover:underline underline-offset-2 sm:px-0 sm:py-0"
            >
              {copy.about}
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              className="px-2 py-1 transition-colors hover:text-white/80 hover:underline underline-offset-2 sm:px-0 sm:py-0"
            >
              {copy.bottomPrivacy}
            </Link>
            <Link
              to={HOME_ROUTE}
              params={homeParams(locale)}
              hash="catalogo"
              className="px-2 py-1 transition-colors hover:text-white/80 hover:underline underline-offset-2 sm:px-0 sm:py-0"
            >
              {copy.bottomTools}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
