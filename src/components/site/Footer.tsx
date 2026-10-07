import { Link } from "@tanstack/react-router";
import { Mail, MessageSquare, ShieldCheck, BookOpen } from "lucide-react";
import { PremiumCrownIcon } from "./PremiumCrownIcon";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  homeParams,
  catalogParams,
  privacyParams,
  cookiesParams,
  termsParams,
  premiumParams,
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

/** Textos del footer localizados con rutas 100% reales auditadas */
const FOOTER_COPY = {
  es: {
    description:
      "Herramientas PDF online para comprimir, unir, dividir, convertir y editar documentos. Directamente en tu navegador.",
    colTools: "HERRAMIENTAS",
    colInfo: "INFORMACIÓN",
    colLegal: "LEGAL",
    viewAllTools: "Ver las 50 herramientas →",
    toolsCatalogHash: "#catalogo",
    about: "BreadPDF",
    premium: "BreadPDF Premium",
    privacy: "Privacidad",
    support: "Soporte",
    supportDesc: OFFICIAL_CONTACT_EMAIL,
    contactEmail: OFFICIAL_CONTACT_EMAIL,
    guides: "Guías & Tutoriales",
    privacyFull: "Política de privacidad",
    cookies: "Política de cookies",
    legalTerms: "Términos del servicio",
    copyright: (year: number) => `© ${year} BreadPDF. Todos los derechos reservados.`,
    bottomTools: "Herramientas",
    bottomPrivacy: "Privacidad",
  },
  ca: {
    description:
      "Eines PDF en línia per comprimir, unir, dividir, convertir i editar documents. Directament al teu navegador.",
    colTools: "EINES",
    colInfo: "INFORMACIÓ",
    colLegal: "LEGAL",
    viewAllTools: "Totes les 50 eines →",
    toolsCatalogHash: "#catalogo",
    about: "BreadPDF",
    premium: "BreadPDF Premium",
    privacy: "Privadesa",
    support: "Suport",
    supportDesc: OFFICIAL_CONTACT_EMAIL,
    contactEmail: OFFICIAL_CONTACT_EMAIL,
    guides: "Guies & Tutorials",
    privacyFull: "Política de privadesa",
    cookies: "Política de cookies",
    legalTerms: "Termes del servei",
    copyright: (year: number) => `© ${year} BreadPDF. Tots els drets reservats.`,
    bottomTools: "Eines",
    bottomPrivacy: "Privadesa",
  },
  en: {
    description:
      "Online PDF tools to compress, merge, split, convert and edit documents. Directly inside your browser.",
    colTools: "TOOLS",
    colInfo: "INFORMATION",
    colLegal: "LEGAL",
    viewAllTools: "View all 50 tools →",
    toolsCatalogHash: "#catalogo",
    about: "BreadPDF",
    premium: "BreadPDF Premium",
    privacy: "Privacy",
    support: "Support",
    supportDesc: OFFICIAL_CONTACT_EMAIL,
    contactEmail: OFFICIAL_CONTACT_EMAIL,
    guides: "Guides & Tutorials",
    privacyFull: "Privacy Policy",
    cookies: "Cookie Policy",
    legalTerms: "Terms of Service",
    copyright: (year: number) => `© ${year} BreadPDF. All rights reserved.`,
    bottomTools: "Tools",
    bottomPrivacy: "Privacy",
  },
} as const;

export function Footer() {
  const { locale, tools } = useLocale();
  const copy = FOOTER_COPY[locale as keyof typeof FOOTER_COPY] ?? FOOTER_COPY.es;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#070D18] text-white">
      {/* ── CUERPO PRINCIPAL DEL FOOTER ── */}
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-14 sm:pt-20 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-8 items-start">
          
          {/* COL 1: MARCA + DESCRIPCIÓN + IDIOMAS DISCRETOS (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
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
                className="h-13 sm:h-14 w-auto object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span className="font-heading text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-none">
                <span className="text-white">{BRAND_WORDMARK.bread}</span>
                <span className="text-[#EC3C2D] ml-0.5">{BRAND_WORDMARK.pdf}</span>
              </span>
            </Link>

            <p className="text-[15px] sm:text-[15.5px] leading-[1.65] text-slate-300 max-w-[280px]">
              {copy.description}
            </p>

            {/* Selector de idioma discreto en una sola línea de texto */}
            <div className="pt-2">
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>

          {/* COL 2: HERRAMIENTAS (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-[18px] sm:text-[19px] font-extrabold uppercase tracking-[0.04em] text-white leading-tight">
              {copy.colTools}
            </h3>
            <ul className="space-y-4">
              {FEATURED_TOOLS.map((item) => {
                const toolDef = tools.find((t) => t.canonicalSlug === item.slug);
                const name = toolDef?.name ?? item.name;
                return (
                  <li key={item.slug}>
                    <Link
                      to={DETAIL_ROUTE}
                      params={toolParams(locale, item.slug)}
                      className="group inline-flex items-center gap-2.5 text-[15px] sm:text-[15.5px] font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                    >
                      <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      <span>{name}</span>
                    </Link>
                  </li>
                );
              })}
              {/* Enlace al catálogo central con conteo dinámico real de herramientas */}
              <li className="pt-1.5">
                <Link
                  to={SECTION_ROUTE}
                  params={catalogParams(locale)}
                  onClick={() => trackToolCatalogViewAllClicked({ source: "footer", language: locale })}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-bold text-[#EC3C2D] transition-colors hover:text-[#FF5A4D]"
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

          {/* COL 3: INFORMACIÓN (lg:col-span-2 xl:col-span-3) */}
          <div className="lg:col-span-2 xl:col-span-3">
            <h3 className="mb-6 text-[18px] sm:text-[19px] font-extrabold uppercase tracking-[0.04em] text-white leading-tight">
              {copy.colInfo}
            </h3>
            <ul className="space-y-4 text-[15px] sm:text-[15.5px] text-slate-300">
              {/* BreadPDF */}
              <li>
                <Link
                  to={HOME_ROUTE}
                  params={homeParams(locale)}
                  className="group inline-flex items-center gap-2.5 font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <span>{copy.about}</span>
                </Link>
              </li>

              {/* BreadPDF Premium en Rojo */}
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={premiumParams(locale)}
                  className="group inline-flex items-center gap-2 font-bold text-[#EC3C2D] transition-colors hover:text-[#FF5A4D]"
                >
                  <PremiumCrownIcon className="size-4 shrink-0 text-[#EC3C2D]" />
                  <span>{copy.premium}</span>
                </Link>
              </li>

              {/* Privacidad independiente */}
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={privacyParams(locale)}
                  className="group inline-flex items-center gap-2.5 font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <ShieldCheck className="size-4 shrink-0 text-[#EC3C2D]" />
                  <span>{copy.privacy}</span>
                </Link>
              </li>

              {/* Soporte independiente */}
              <li>
                <a
                  href={`mailto:${copy.contactEmail}`}
                  className="group inline-flex items-center gap-2.5 font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <MessageSquare className="size-4 shrink-0 text-[#EC3C2D]" />
                  <span>{copy.support} ({copy.supportDesc})</span>
                </a>
              </li>

              {/* Guías documentales */}
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={guidesHubParams(locale)}
                  className="group inline-flex items-center gap-2.5 font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <BookOpen className="size-4 shrink-0 text-[#EC3C2D]" />
                  <span>{copy.guides}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: LEGAL (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-[18px] sm:text-[19px] font-extrabold uppercase tracking-[0.04em] text-white leading-tight">
              {copy.colLegal}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={privacyParams(locale)}
                  className="group inline-flex items-center gap-2.5 text-[15px] sm:text-[15.5px] font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <span>{copy.privacyFull}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={cookiesParams(locale)}
                  className="group inline-flex items-center gap-2.5 text-[15px] sm:text-[15.5px] font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <span>{copy.cookies}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={SECTION_ROUTE}
                  params={termsParams(locale)}
                  className="group inline-flex items-center gap-2.5 text-[15px] sm:text-[15.5px] font-medium text-slate-300 transition-colors hover:text-[#EC3C2D]"
                >
                  <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <span>{copy.legalTerms}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 5: PERSONAJE (lg:col-span-3 xl:col-span-2, CON ESPACIADO HOLGADO pl-8 xl:pl-12) */}
          <div className="lg:col-span-3 xl:col-span-2 flex items-center justify-center lg:justify-end pl-0 lg:pl-8 xl:pl-12">
            <BreadPDFFooterMascot />
          </div>

        </div>
      </div>

      {/* ── BARRA INFERIOR LEGAL ────────────────────────────────────── */}
      <div className="border-t border-[#1E293B] bg-[#040812]">
        <div className="w-full max-w-[1560px] mx-auto flex flex-col gap-4 px-6 sm:px-10 lg:px-12 py-5 text-[14px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.copyright(year)}</p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Link
              to={SECTION_ROUTE}
              params={premiumParams(locale)}
              className="font-bold text-[#EC3C2D] transition-colors hover:text-[#FF5A4D]"
            >
              Premium
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              className="transition-colors hover:text-white"
            >
              {copy.bottomPrivacy}
            </Link>
            <Link
              to={HOME_ROUTE}
              params={homeParams(locale)}
              hash="catalogo"
              className="transition-colors hover:text-white"
            >
              {copy.bottomTools}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
