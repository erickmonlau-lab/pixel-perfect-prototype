import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  User,
  Star,
  Settings,
  Bell,
  Shield,
  LogOut,
  BookOpen,
} from "lucide-react";
import { PremiumCrownIcon } from "./PremiumCrownIcon";
import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS } from "@/lib/tools/families";
import { MAIN_CATEGORIES } from "@/lib/tools/registry";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  catalogParams,
  categoryParams,
  homeParams,
  parsePath,
  privacyParams,
  premiumParams,
  loginParams,
  registerParams,
  accountParams,
  toolParams,
  guidesHubParams,
  aboutParams,
} from "@/lib/i18n/routing";
import { useAuth } from "@/lib/auth/auth-context";
import { Logo } from "./Logo";
import { ToolIcon } from "./ToolIcon";
import { getRichToolIcon } from "./RichToolIcon";
import { getToolColorTheme } from "@/lib/tools/color-system";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  trackToolCatalogCategoryClicked,
  trackToolCatalogViewAllClicked,
} from "@/lib/analytics/gtm";
import type { ToolCategory } from "@/lib/tools/types";

export function Header() {
  const { locale, t, categories, tools } = useLocale();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ToolCategory | "more" | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<ToolCategory | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ordenar las categorías dinámicamente de mayor a menor número de herramientas
  // Si empatan a herramientas (ej. Seguridad 5 vs PDF Intelligence 5), desempatar con 'seguridad' primero
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const countA = tools.filter((t) => t.category === a.category).length;
      const countB = tools.filter((t) => t.category === b.category).length;
      const diff = countB - countA;
      if (diff !== 0) return diff;
      if (a.category === "seguridad") return -1;
      if (b.category === "seguridad") return 1;
      return 0;
    });
  }, [categories, tools]);

  // Las 3 primeras categorías más populosas (Convertir 13, Organizar 7, Optimizar 6) se muestran siempre en desktop
  // Las categorías secundarias (Seguridad 5, PDF Intelligence 5, Editar 4) entran en "Más herramientas"
  // manteniendo el header perfectamente holgado y sin compresión ni cortes desde 1024px hasta 2560px+
  const mainCategories = useMemo(() => sortedCategories.slice(0, 3), [sortedCategories]);
  const moreCategories = useMemo(() => sortedCategories.slice(3), [sortedCategories]);

  // Detect the category of the current page from the URL — used for active nav state
  const currentPageCategory = useMemo<ToolCategory | null>(() => {
    const { page } = parsePath(pathname);
    if (page.kind === "category") return page.category;
    if (page.kind === "tool") {
      return tools.find((tool) => tool.canonicalSlug === page.canonicalSlug)?.category ?? null;
    }
    return null;
  }, [pathname, tools]);

  // Dismiss dropdowns when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
        setUserMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdowns on route changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (cat: ToolCategory | "more") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(cat);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b-2 border-[#0F0F12] bg-[#FFFFFF]"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setActiveDropdown(null);
          setMobileOpen(false);
        }
      }}
    >
      <div className="site-header mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ============================================================
            ZONA IZQUIERDA: LOGO BREADPDF
            ============================================================ */}
        <div className="flex shrink-0 items-center">
          <Link
            to={HOME_ROUTE}
            params={homeParams(locale)}
            className="transition-standard shrink-0 hover:opacity-90"
            aria-label={`BreadPDF · ${t.nav.home}`}
          >
            <Logo />
          </Link>
        </div>

        {/* ============================================================
            ZONA CENTRAL: CATEGORÍAS + MÁS HERRAMIENTAS
            ============================================================ */}
        <nav
          ref={navRef}
          className="hidden items-center gap-1.5 xl:gap-2.5 lg:flex ml-6 xl:ml-8"
          aria-label={t.nav.categories}
        >
          {/* 4 CATEGORÍAS PRINCIPALES CON MEGA MENÚ */}
          {mainCategories.map((category) => {
            const accent = FAMILY_ACCENTS[category.category];
            const catTools = tools.filter((tool) => tool.category === category.category);
            const isOpen = activeDropdown === category.category;
            // Page-active: this category belongs to the current page's URL
            const isPageActive = currentPageCategory === category.category;
            // "Interacting" = menu is open (takes priority over page-active visually)
            // "Location" = page belongs here but no menu is open

            // Agrupación semántica contextual según las herramientas reales
            let columns: { title: string; items: typeof catTools }[] = [];
            let panelWidth = "w-[340px]"; // Ancho compacto por defecto para 1 columna (optimizar, organizar, editar)
            let gridCols = "grid-cols-1";

            if (category.category === "convertir") {
              // Orden lógico estipulado para "Convertir a PDF" (8 herramientas)
              const toPdfOrder = [
                "jpg-a-pdf",
                "png-a-pdf",
                "webp-a-pdf",
                "word-a-pdf",
                "excel-a-pdf",
                "powerpoint-a-pdf",
                "markdown-a-pdf",
                "svg-a-pdf",
              ];
              const toPdf = toPdfOrder
                .map((slug) => catTools.find((t) => t.canonicalSlug === slug))
                .filter(Boolean) as typeof catTools;

              // Orden lógico estipulado para "Convertir desde PDF" (9 herramientas)
              const fromPdfOrder = [
                "pdf-a-jpg",
                "pdf-a-png",
                "pdf-a-webp",
                "pdf-a-word",
                "pdf-a-excel",
                "pdf-a-pptx",
                "pdf-a-markdown",
                "extraer-texto-pdf",
                "pdf-a-pdfa",
              ];
              const fromPdf = fromPdfOrder
                .map((slug) => catTools.find((t) => t.canonicalSlug === slug))
                .filter(Boolean) as typeof catTools;

              columns = [
                {
                  title:
                    locale === "ca"
                      ? "Convertir a PDF"
                      : locale === "en"
                        ? "Convert to PDF"
                        : "Convertir a PDF",
                  items: toPdf,
                },
                {
                  title:
                    locale === "ca"
                      ? "Convertir des de PDF"
                      : locale === "en"
                        ? "Convert from PDF"
                        : "Convertir desde PDF",
                  items: fromPdf,
                },
              ];
              panelWidth = "w-[760px]";
              gridCols = "grid-cols-2 gap-x-10";
            } else {
              // Optimizar (6), Organizar (7), Editar (4) -> Un único grupo natural y vertical
              columns = [
                {
                  title: category.name,
                  items: catTools,
                },
              ];
              panelWidth = "w-[340px]";
              gridCols = "grid-cols-1";
            }

            // ─── BUTTON CLASSES — three exclusive states ───────────────────────
            // Priority: open > page-active > normal
            let buttonClass: string;
            let chevronClass: string;

            if (isOpen || isPageActive) {
              // State: ACTIVE OR MENU OPEN — full solid category color, white text, white chevron, matching border
              buttonClass = `${accent.iconBg} text-white border border-transparent shadow-sm`;
              chevronClass = `text-white ${isOpen ? "rotate-180" : ""}`;
            } else {
              // State: NORMAL — transparent background, dark text, dark chevron
              buttonClass =
                "bg-transparent text-[#1E293B] border border-transparent hover:bg-[#F1F5F9] hover:text-[#0F172A]";
              chevronClass = "text-[#0F172A]";
            }

            return (
              <div
                key={category.category}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.category)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isOpen ? null : category.category)}
                  aria-expanded={isOpen}
                  aria-current={isPageActive && !activeDropdown ? "page" : undefined}
                  aria-label={`Categoría ${category.name}`}
                  className={`site-nav-btn group inline-flex items-center gap-2 cursor-pointer select-none uppercase whitespace-nowrap transition-all duration-150 ${buttonClass}`}
                >
                  <span>{category.name}</span>

                  {/* Chevron: gira cuando el menú está abierto */}
                  <ChevronDown
                    className={`size-5 shrink-0 stroke-[3] transition-transform duration-200 ${chevronClass}`}
                    aria-hidden
                  />
                </button>

                {/* MEGA MENÚ DE CATEGORÍA — Always in DOM for SSR discovery, hidden when inactive */}
                <div
                  className={`${isOpen ? "animate-fade" : "hidden"} absolute left-0 top-full z-50 pt-2.5 ${panelWidth} max-w-[calc(100vw-2rem)] font-sans`}
                  onMouseEnter={() => handleMouseEnter(category.category)}
                  onMouseLeave={handleMouseLeave}
                  role="region"
                  aria-label={`Herramientas de ${category.name}`}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                    <div className={`grid ${gridCols} gap-y-6`}>
                      {columns.map((col, colIdx) => (
                        <div key={colIdx} className="space-y-4">
                          <h3 className="flex items-center gap-3 text-[15px] font-black uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
                            <span
                              className={`inline-flex size-7 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon} shadow-xs`}
                            >
                              <ToolIcon name={FAMILY_ICONS[category.category]} className="size-4" />
                            </span>
                            <span>{col.title}</span>
                          </h3>

                          <ul className="space-y-1.5">
                            {col.items.map((tool) => {
                              const RichIcon = getRichToolIcon(tool.canonicalSlug);
                              return (
                                <li key={tool.slug}>
                                  <Link
                                    to={DETAIL_ROUTE}
                                    params={toolParams(locale, tool.canonicalSlug)}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-all hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                  >
                                    {/* Icono de herramienta visual y nítido */}
                                    <span
                                      className={`inline-flex size-8 sm:size-8.5 shrink-0 items-center justify-center rounded-lg border border-[#0F0F12] ${getToolColorTheme(tool.canonicalSlug, category.category).bg} ${getToolColorTheme(tool.canonicalSlug, category.category).text} transition-transform duration-150 group-hover:scale-110 group-hover:rotate-6 shadow-[1.5px_1.5px_0_#0F0F12]`}
                                    >
                                      <ToolIcon
                                        name={tool.icon}
                                        canonicalSlug={tool.canonicalSlug}
                                        className="size-5 sm:size-5.5"
                                      />
                                    </span>

                                    <span className="truncate text-[15px] font-semibold text-slate-800 group-hover:text-primary transition-colors flex items-center">
                                      {tool.name}
                                      {tool.canonicalSlug === "pdf-a-pdfa" && (
                                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/80">
                                          PDF/A
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* MÁS HERRAMIENTAS: CATEGORÍAS SECUNDARIAS ORDENADAS (SEGURIDAD, PDF INTELLIGENCE, EDITAR) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("more")}
            onMouseLeave={handleMouseLeave}
          >
            {(() => {
              const isMoreOpen = activeDropdown === "more";
              const isMorePageActive =
                currentPageCategory !== null &&
                moreCategories.some((c) => c.category === currentPageCategory);

              let moreButtonClass: string;
              let moreChevronClass: string;

              if (isMoreOpen || isMorePageActive) {
                // Estado ACTIVO/ABIERTO: Sólido NEUTRO OSCURO (slate-900 / navy) con texto y chevron blancos
                // Totalmente diferenciado de las categorías de color y coherente con el filtro neutro "Todas"
                moreButtonClass = "bg-[#0F172A] text-white border border-[#0F172A] shadow-sm";
                moreChevronClass = `text-white ${isMoreOpen ? "rotate-180" : ""}`;
              } else {
                // Estado NORMAL: fondo transparente, texto oscuro, chevron oscuro
                moreButtonClass =
                  "bg-transparent text-[#1E293B] border border-transparent hover:bg-[#F1F5F9] hover:text-[#0F172A]";
                moreChevronClass = "text-[#0F172A]";
              }

              return (
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isMoreOpen ? null : "more")}
                  aria-expanded={isMoreOpen}
                  aria-current={isMorePageActive && !activeDropdown ? "page" : undefined}
                  aria-label={t.nav.more}
                  className={`site-nav-btn group inline-flex items-center gap-2 cursor-pointer select-none uppercase whitespace-nowrap transition-all duration-150 ${moreButtonClass}`}
                >
                  <span>{t.nav.more}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 stroke-[3] transition-transform duration-200 ${moreChevronClass}`}
                    aria-hidden
                  />
                </button>
              );
            })()}

            {/* DESPLEGABLE MÁS HERRAMIENTAS — Always in DOM for SSR discovery, hidden when inactive */}
            <div
              className={`${activeDropdown === "more" ? "animate-fade" : "hidden"} absolute left-0 top-full z-50 pt-2.5 w-[840px] max-w-[calc(100vw-2rem)] font-sans`}
              onMouseEnter={() => handleMouseEnter("more")}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Más herramientas: Seguridad, PDF Intelligence y Editar"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                <div className="grid grid-cols-3 gap-x-8">
                  {moreCategories.map((cat) => {
                    const accent = FAMILY_ACCENTS[cat.category];
                    const catTools = tools.filter((tool) => tool.category === cat.category);

                    return (
                      <div key={cat.category} className="space-y-4">
                        {/* TÍTULO DE GRUPO: Con enlace a la categoría, icono y nombre en mayúsculas */}
                        <h3 className="pb-3 border-b border-slate-100">
                          <Link
                            to={DETAIL_ROUTE}
                            params={categoryParams(locale, cat.category)}
                            onClick={() => {
                              trackToolCatalogCategoryClicked({
                                category: cat.category,
                                source: "header_more",
                                language: locale,
                              });
                              setActiveDropdown(null);
                            }}
                            className="inline-flex items-center gap-2.5 text-[14.5px] font-black uppercase tracking-wider text-slate-800 hover:text-primary transition-colors"
                          >
                            <span
                              className={`inline-flex size-7 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon} shadow-xs`}
                            >
                              <ToolIcon name={FAMILY_ICONS[cat.category]} className="size-4" />
                            </span>
                            <span>{cat.name}</span>
                          </Link>
                        </h3>

                        {/* LISTA DE HERRAMIENTAS: [ICONO] + NOMBRE */}
                        <ul className="space-y-1.5">
                          {catTools.map((tool) => {
                            const RichIcon = getRichToolIcon(tool.canonicalSlug);
                            return (
                              <li key={tool.slug}>
                                <Link
                                  to={DETAIL_ROUTE}
                                  params={toolParams(locale, tool.canonicalSlug)}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-all hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                >
                                  <span
                                    className={`inline-flex size-7.5 sm:size-8 shrink-0 items-center justify-center rounded-lg border border-[#0F0F12] ${getToolColorTheme(tool.canonicalSlug, cat.category).bg} ${getToolColorTheme(tool.canonicalSlug, cat.category).text} transition-transform duration-150 group-hover:scale-110 group-hover:rotate-6 shadow-[1.5px_1.5px_0_#0F0F12]`}
                                  >
                                    <ToolIcon
                                      name={tool.icon}
                                      canonicalSlug={tool.canonicalSlug}
                                      className="size-4.5 sm:size-5"
                                    />
                                  </span>
                                  <span className="truncate text-[14.5px] font-semibold text-slate-800 group-hover:text-primary transition-colors">
                                    {tool.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* PIE DEL DESPLEGABLE: ENLACES A CATÁLOGO Y A GUÍAS */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 -mx-6 -mb-6 px-6 py-3.5 rounded-b-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-2 rounded-full bg-[#059669]" />
                      <span className="text-[13px] font-semibold text-slate-600">
                        {tools.length}{" "}
                        {locale === "ca"
                          ? "eines operatives al navegador"
                          : locale === "en"
                            ? "browser-native PDF tools"
                            : "herramientas disponibles en navegador"}
                      </span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <Link
                      to={SECTION_ROUTE}
                      params={guidesHubParams(locale)}
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-700 hover:text-[#EC3C2D] transition-colors"
                    >
                      <BookOpen className="size-3.5 text-[#EC3C2D]" />
                      <span>
                        {locale === "ca"
                          ? "Guies & Tutorials"
                          : locale === "en"
                            ? "Guides & Tutorials"
                            : "Guías & Tutoriales"}
                      </span>
                    </Link>
                  </div>
                  <Link
                    to={SECTION_ROUTE}
                    params={catalogParams(locale)}
                    onClick={() => {
                      trackToolCatalogViewAllClicked({
                        source: "header_more_footer",
                        language: locale,
                      });
                      setActiveDropdown(null);
                    }}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#EC3C2D] hover:text-[#D93426] transition-colors group"
                  >
                    <span>{t.nav.megaFooter ?? "Ver todas las herramientas"}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* ESPACIO FLEXIBLE: Absorbe todo el espacio sobrante empujando los controles al extremo derecho */}
        <div className="flex-1 min-w-6 hidden lg:block" aria-hidden="true" />

        {/* ============================================================
            ZONA DERECHA (ALINEADA AL EXTREMO DERECHO):
            [ Guías & Tutoriales ]  [ Sobre BreadPDF ]  |  [ ES CA EN ]
            ============================================================ */}
        <div className="hidden shrink-0 items-center gap-4 xl:gap-5 lg:flex">
          <Link
            to={SECTION_ROUTE}
            params={guidesHubParams(locale)}
            className="inline-flex items-center gap-1.5 text-[15px] font-bold text-slate-700 hover:text-[#EC3C2D] transition-colors"
          >
            <BookOpen className="size-4 text-[#EC3C2D]" />
            <span>
              {locale === "ca"
                ? "Guies"
                : locale === "en"
                  ? "Guides"
                  : "Guías"}
            </span>
          </Link>

          <Link
            to={SECTION_ROUTE}
            params={aboutParams(locale)}
            className="inline-flex items-center gap-1.5 text-[15px] font-bold text-slate-700 hover:text-[#EC3C2D] transition-colors"
          >
            <span>
              {locale === "ca"
                ? "Sobre BreadPDF"
                : locale === "en"
                  ? "About"
                  : "Sobre BreadPDF"}
            </span>
          </Link>

          {/* Separador vertical sutil */}
          <div className="h-5 w-px bg-[#E2E8F0] shrink-0" aria-hidden="true" />

          {/* Selector de idioma compacto en cápsula [ ES CA EN ] */}
          <LanguageSwitcher />
        </div>

        {/* ============================================================
            MÓVIL: IDIOMA + HAMBURGUESA
            ============================================================ */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="transition-standard inline-flex size-11 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#0F172A] hover:bg-[#F5F7FA]"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE ACCORDION DRAWER */}
      {mobileOpen && (
        <div className="animate-rise border-t border-[#E5E7EB] bg-white px-4 py-4 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-1.5" aria-label={t.nav.menu}>
            {/* Quick Catalog Link */}
            <Link
              to={SECTION_ROUTE}
              params={catalogParams(locale)}
              onClick={() => {
                trackToolCatalogViewAllClicked({ source: "mobile_menu", language: locale });
                setMobileOpen(false);
              }}
              className="rounded-xl bg-[#FEECEB] px-4 py-3 text-[15px] font-bold text-[#EC3C2D] flex items-center justify-between border border-[#FDCAC7]/60"
            >
              <span className="flex items-center gap-2">
                <span>{t.nav.allTools}</span>
              </span>
              <span className="font-mono text-[12px] bg-[#EC3C2D]/10 text-[#EC3C2D] px-2 py-0.5 rounded-md font-bold">
                {tools.length}{" "}
                {locale === "ca" ? "eines" : locale === "en" ? "tools" : "herramientas"}
              </span>
            </Link>

            {/* Expandable Categories ordenadas por número de herramientas */}
            {sortedCategories.map((category) => {
              const accent = FAMILY_ACCENTS[category.category];
              const isExpanded = mobileExpandedCat === category.category;
              const catTools = tools.filter((tool) => tool.category === category.category);

              return (
                <div
                  key={category.category}
                  className="rounded-xl border border-[#E5E7EB] bg-slate-50/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3">
                    <Link
                      to={DETAIL_ROUTE}
                      params={categoryParams(locale, category.category)}
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center gap-3 text-[15px] font-bold text-[#0F172A]"
                    >
                      <span
                        className={`inline-flex size-7 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon}`}
                      >
                        <ToolIcon name={FAMILY_ICONS[category.category]} className="size-3.5" />
                      </span>
                      {category.name}
                    </Link>

                    <button
                      type="button"
                      onClick={() => setMobileExpandedCat(isExpanded ? null : category.category)}
                      className="p-2 text-[#64748B] hover:text-[#0F172A]"
                      aria-label={`Expandir ${category.name}`}
                    >
                      <ChevronDown
                        className={`size-4 stroke-[2.2] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-[#E5E7EB] bg-white px-3 py-2 space-y-1">
                      {catTools.map((tool) => (
                        <Link
                          key={tool.slug}
                          to={DETAIL_ROUTE}
                          params={toolParams(locale, tool.canonicalSlug)}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-2.5 px-2.5 text-[14.5px] font-medium text-[#1E293B] hover:bg-[#F5F7FA] rounded-xl transition-colors"
                        >
                          <span
                            className={`inline-flex size-7 shrink-0 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon}`}
                          >
                            <ToolIcon
                              name={tool.icon}
                              canonicalSlug={tool.canonicalSlug}
                              className="size-4"
                            />
                          </span>
                          <span className="flex-1 truncate">{tool.name}</span>
                          <ArrowRight className="size-3.5 text-[#94A3B8]" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sobre BreadPDF en Móvil */}
            <Link
              to={SECTION_ROUTE}
              params={aboutParams(locale)}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-[14.5px] font-semibold text-slate-800 hover:bg-[#F5F7FA] hover:text-[#EC3C2D] transition-colors"
            >
              <span>
                {locale === "ca"
                  ? "Sobre BreadPDF"
                  : locale === "en"
                    ? "About BreadPDF"
                    : "Sobre BreadPDF"}
              </span>
            </Link>

            {/* Guías & Tutoriales Link */}
            <Link
              to={SECTION_ROUTE}
              params={guidesHubParams(locale)}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-[14.5px] font-semibold text-slate-800 hover:bg-[#F5F7FA] hover:text-[#EC3C2D] transition-colors"
            >
              <BookOpen className="size-4 text-[#EC3C2D]" />
              <span>
                {locale === "ca"
                  ? "Guies & Tutorials"
                  : locale === "en"
                    ? "Guides & Tutorials"
                    : "Guías & Tutoriales"}
              </span>
            </Link>

            {/* Privacy Link */}
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-[14.5px] font-normal text-[#64748B] hover:bg-[#F5F7FA] hover:text-[#0F172A]"
            >
              {t.nav.privacy}
            </Link>

            {/* Mobile CTA */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="w-full font-bold bg-primary hover:bg-primary-dark text-white"
              >
                <Link
                  to={DETAIL_ROUTE}
                  params={toolParams(locale, "comprimir-pdf")}
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav.cta}
                </Link>
              </Button>
            </div>
          </nav>

          {/* Language selector footer in mobile */}
          <div className="mt-5 border-t border-[#E5E7EB] pt-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2">
              {t.nav.language}
            </p>
            <LanguageSwitcher variant="inline" />
          </div>
        </div>
      )}
    </header>
  );
}
