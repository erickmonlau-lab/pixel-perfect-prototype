import { Link } from "@tanstack/react-router";
import { MessageSquare, BookOpen, ArrowRight } from "lucide-react";
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
    bannerSub: "Comprime, une, divide, convierte o firma documentos al instante y 100% en tu navegador.",
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
    bannerSub: "Comprimeix, uneix, divideix, converteix o signa documents a l'instant i 100% al teu navegador.",
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
    bannerSub: "Compress, merge, split, convert, or sign documents instantly and 100% inside your browser.",
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

export function Footer() {
  const { locale, tools } = useLocale();
  const copy = FOOTER_COPY[locale as keyof typeof FOOTER_COPY] ?? FOOTER_COPY.es;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-[#0F0F12] bg-[#F1F1F4] text-[#0F0F12]">
      {/* ── BANNER ACCIÓN SUPERIOR ── */}
      <div className="border-b-2 border-[#0F0F12] bg-white py-8 sm:py-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
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
            onClick={() => trackToolCatalogViewAllClicked({ source: "footer_banner", language: locale })}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] text-white px-7 py-3.5 text-[16px] font-black shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer shrink-0"
          >
            <span>{copy.bannerCta}</span>
            <ArrowRight className="size-5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* ── CUERPO PRINCIPAL DEL FOOTER ── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-12 sm:pt-16 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* COL 1: MARCA + DESCRIPCIÓN + IDIOMAS (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to={HOME_ROUTE}
              params={homeParams(locale)}
              className="inline-flex items-center gap-3.5 group select-none"
            >
              <img
                src={BRAND_ASSETS.iconWebp}
                alt="BreadPDF"
                width={56}
                height={54}
                className="h-12 sm:h-13 w-auto object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span className="font-heading text-[26px] sm:text-[30px] font-black tracking-tight leading-none">
                <span className="text-[#592316]">{BRAND_WORDMARK.bread}</span>
                <span className="text-[#EC3C2D]">{BRAND_WORDMARK.pdf}</span>
              </span>
            </Link>

            <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-slate-700 max-w-[340px] font-medium">
              {copy.description}
            </p>

            {/* Selector de idioma con borde neo-brutalista */}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* COL 2: HERRAMIENTAS (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="mb-5 text-[17px] sm:text-[18px] font-black uppercase tracking-wider text-[#0F0F12] leading-tight">
              {copy.colTools}
            </h4>
            <ul className="space-y-3.5">
              {FEATURED_TOOLS.map((item) => {
                const toolDef = tools.find((t) => t.canonicalSlug === item.slug);
                const name = toolDef?.name ?? item.name;
                return (
                  <li key={item.slug}>
                    <Link
                      to={DETAIL_ROUTE}
                      params={toolParams(locale, item.slug)}
                      className="group inline-flex items-center gap-2 text-[15px] sm:text-[15.5px] font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                    >
                      <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      <span>{name}</span>
                    </Link>
                  </li>
                );
              })}
              {/* Enlace al catálogo central con conteo dinámico real de herramientas */}
              <li className="pt-2">
                <Link
                  to={HOME_ROUTE}
                  params={homeParams(locale)}
                  hash="catalogo"
                  onClick={() => trackToolCatalogViewAllClicked({ source: "footer", language: locale })}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-black text-[#EC3C2D] hover:underline"
                >
                  <span>
                    {locale === "ca"
                      ? `Totes les ${tools.length} eines →`
                      : locale === "en"
                      ? `View all ${tools.length} tools →`
                      : `Ver las ${tools.length} herramientas →`}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: INFORMACIÓN (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 text-[17px] sm:text-[18px] font-black uppercase tracking-wider text-[#0F0F12] leading-tight">
              {copy.colInfo}
            </h4>
            <ul className="space-y-3.5 text-[15px] sm:text-[15.5px]">
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={aboutParams(locale)}
                  className="group inline-flex items-center gap-2 font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                >
                  <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-80" aria-hidden="true" />
                  <span>{copy.about}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={guidesHubParams(locale)}
                  className="group inline-flex items-center gap-2 font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                >
                  <BookOpen className="size-4 shrink-0 text-[#EC3C2D]" />
                  <span>{copy.guides}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={HOME_ROUTE}
                  params={homeParams(locale)}
                  hash="catalogo"
                  className="group inline-flex items-center gap-2 font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                >
                  <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-80" aria-hidden="true" />
                  <span>{copy.bottomTools}</span>
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${copy.contactEmail}`}
                  className="group inline-flex items-center gap-2 font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                >
                  <MessageSquare className="size-4 shrink-0 text-[#EC3C2D]" />
                  <span>{copy.support}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COL 4: LEGAL + MASCOTA (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-6">
            <div>
              <h4 className="mb-5 text-[17px] sm:text-[18px] font-black uppercase tracking-wider text-[#0F0F12] leading-tight">
                {copy.colLegal}
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={privacyParams(locale)}
                    className="group inline-flex items-center gap-2 text-[15px] sm:text-[15.5px] font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                  >
                    <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-80" aria-hidden="true" />
                    <span>{copy.privacyFull}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={cookiesParams(locale)}
                    className="group inline-flex items-center gap-2 text-[15px] sm:text-[15.5px] font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                  >
                    <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-80" aria-hidden="true" />
                    <span>{copy.cookies}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={termsParams(locale)}
                    className="group inline-flex items-center gap-2 text-[15px] sm:text-[15.5px] font-bold text-slate-800 transition-colors hover:text-[#EC3C2D]"
                  >
                    <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-80" aria-hidden="true" />
                    <span>{copy.legalTerms}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tarjeta Mascota BreadPDF */}
            <div className="pt-2">
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex items-center gap-3">
                <BreadPDFFooterMascot />
                <div className="text-[13px] font-bold text-slate-700 leading-snug">
                  <span className="text-[#0F0F12] font-black block">BreadPDF</span>
                  100% privado en memoria local
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BARRA INFERIOR LEGAL ────────────────────────────────────── */}
      <div className="border-t-2 border-[#0F0F12] bg-[#E8E8EC]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-3 px-6 sm:px-10 lg:px-12 py-4 text-[13.5px] font-semibold text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.copyright(year)}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to={SECTION_ROUTE}
              params={aboutParams(locale)}
              className="transition-colors hover:text-[#EC3C2D]"
            >
              {copy.about}
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              className="transition-colors hover:text-[#EC3C2D]"
            >
              {copy.bottomPrivacy}
            </Link>
            <Link
              to={HOME_ROUTE}
              params={homeParams(locale)}
              hash="catalogo"
              className="transition-colors hover:text-[#EC3C2D]"
            >
              {copy.bottomTools}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
