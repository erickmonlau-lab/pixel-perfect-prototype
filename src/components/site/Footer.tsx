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
      className="size-[7px] rounded-full bg-[#EC3C2D] shrink-0 opacity-75 group-hover:opacity-100 transition-opacity mt-[1px]"
      aria-hidden="true"
    />
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
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
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
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#f1eef3",
          backgroundImage:
            "radial-gradient(ellipse 72% 125% at -8% 42%, rgba(241,59,50,0.32) 0%, rgba(244,114,182,0.2) 36%, transparent 76%), radial-gradient(ellipse 68% 115% at 43% 5%, rgba(59,130,246,0.24) 0%, rgba(139,92,246,0.22) 38%, transparent 78%), radial-gradient(ellipse 68% 122% at 106% 52%, rgba(139,92,246,0.31) 0%, rgba(59,130,246,0.19) 40%, rgba(244,114,182,0.15) 58%, transparent 82%), radial-gradient(ellipse 48% 82% at 14% 104%, rgba(255,145,77,0.24) 0%, transparent 78%)",
        }}
      >
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-10">
          <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 xl:grid-cols-[minmax(220px,1.25fr)_minmax(140px,0.9fr)_minmax(140px,0.9fr)_minmax(155px,0.9fr)_minmax(165px,1fr)] xl:gap-x-6 xl:gap-y-0">
            {/* ── COL 1: MARCA ── */}
            <div className="col-span-2 space-y-5 xl:col-span-1">
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
                  className="h-11 w-auto object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-heading text-[25px] sm:text-[27px] font-black tracking-tight leading-none">
                  <span className="text-[#592316]">{BRAND_WORDMARK.bread}</span>
                  <span className="text-[#EC3C2D]">{BRAND_WORDMARK.pdf}</span>
                </span>
              </Link>

              <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[#46434a] max-w-[280px] font-medium">
                {copy.description}
              </p>

              <div>
                <LanguageSwitcher />
              </div>
            </div>

            {/* COL 2: HERRAMIENTAS */}
            <div>
              <h4 className="mb-5 text-[17px] font-bold uppercase tracking-[0.09em] text-[#17171C] leading-tight">
                {copy.colTools}
              </h4>
              <ul className="space-y-3">
                {FEATURED_TOOLS.map((item) => {
                  const toolDef = tools.find((t) => t.canonicalSlug === item.slug);
                  const name = toolDef?.name ?? item.name;
                  return (
                    <li key={item.slug}>
                      <Link
                        to={DETAIL_ROUTE}
                        params={toolParams(locale, item.slug)}
                        className="group inline-flex items-start gap-2 text-[15px] font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                      >
                        <Dot />
                        <span>{name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-1">
                  <Link
                    to={HOME_ROUTE}
                    params={homeParams(locale)}
                    hash="catalogo"
                    onClick={() =>
                      trackToolCatalogViewAllClicked({ source: "footer", language: locale })
                    }
                    className="group inline-flex items-center gap-1.5 text-[14px] font-black text-[#EC3C2D] hover:underline underline-offset-2"
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

            {/* COL 3: INFORMACIÓN */}
            <div>
              <h4 className="mb-5 text-[17px] font-bold uppercase tracking-[0.09em] text-[#17171C] leading-tight">
                {copy.colInfo}
              </h4>
              <ul className="space-y-3 text-[15px] leading-relaxed">
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={aboutParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.about}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={guidesHubParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <BookOpen className="size-3.5 shrink-0 text-[#EC3C2D] mt-[2px]" />
                    <span>{copy.guides}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={HOME_ROUTE}
                    params={homeParams(locale)}
                    hash="catalogo"
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.bottomTools}</span>
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${copy.contactEmail}`}
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <MessageSquare className="size-3.5 shrink-0 text-[#EC3C2D] mt-[2px]" />
                    <span>{copy.support}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* COL 4: LEGAL */}
            <div>
              <h4 className="mb-5 text-[17px] font-bold uppercase tracking-[0.09em] text-[#17171C] leading-tight">
                {copy.colLegal}
              </h4>
              <ul className="space-y-3 text-[15px] leading-relaxed">
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={privacyParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.privacyFull}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={cookiesParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.cookies}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={SECTION_ROUTE}
                    params={termsParams(locale)}
                    className="group inline-flex items-start gap-2 font-semibold text-[#30313A] transition-colors hover:text-[#EC3C2D] leading-relaxed"
                  >
                    <Dot />
                    <span>{copy.legalTerms}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── MASCOTA — a la derecha de Legal en escritorio, independiente en móvil ── */}
            <div className="col-span-2 flex justify-center xl:col-span-1 xl:items-end xl:justify-center xl:pb-2">
              <BreadPDFFooterMascot size="lg" />
            </div>
          </div>
        </div>
        {/* /container */}
      </div>
      {/* /fondo difuminado */}

      {/* ── BARRA INFERIOR LEGAL ── */}
      <div className="border-t border-[#0F0F12]/20 bg-[#e6e2e9]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-2.5 px-6 sm:px-10 lg:px-16 py-4 text-[13px] font-semibold text-[#45434b] sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.copyright(year)}</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to={SECTION_ROUTE}
              params={aboutParams(locale)}
              className="transition-colors hover:text-[#EC3C2D] hover:underline underline-offset-2"
            >
              {copy.about}
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              className="transition-colors hover:text-[#EC3C2D] hover:underline underline-offset-2"
            >
              {copy.bottomPrivacy}
            </Link>
            <Link
              to={HOME_ROUTE}
              params={homeParams(locale)}
              hash="catalogo"
              className="transition-colors hover:text-[#EC3C2D] hover:underline underline-offset-2"
            >
              {copy.bottomTools}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
