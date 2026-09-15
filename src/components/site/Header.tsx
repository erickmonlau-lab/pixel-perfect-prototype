import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS } from "@/lib/tools/families";
import { localizedRoadmapByCategory } from "@/lib/tools/localize";
import { MAIN_CATEGORIES } from "@/lib/tools/registry";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  catalogParams,
  categoryParams,
  homeParams,
  privacyParams,
  toolParams,
} from "@/lib/i18n/routing";
import { Logo } from "./Logo";
import { ToolIcon } from "./ToolIcon";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { locale, t, categories, tools } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const mainCategories = categories.filter((item) => MAIN_CATEGORIES.includes(item.category));

  return (
    <header
      className="sticky top-0 z-40 border-b border-border/80 bg-surface/90 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMegaOpen(false);
      }}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-7 px-5">
        <Link
          to={HOME_ROUTE}
          params={homeParams(locale)}
          className="transition-standard shrink-0 hover:opacity-80"
          aria-label={`ARVIO · ${t.nav.home}`}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.nav.categories}>
          <Link
            to={SECTION_ROUTE}
            params={catalogParams(locale)}
            className="transition-standard rounded-lg px-3.5 py-2.5 text-[15px] font-semibold text-foreground/85 hover:bg-primary-soft hover:text-primary-dark"
            activeProps={{ className: "bg-primary-soft text-primary-dark" }}
          >
            {t.nav.tools}
          </Link>
          {mainCategories.map((category) => {
            const accent = FAMILY_ACCENTS[category.category];
            return (
              <Link
                key={category.category}
                to={DETAIL_ROUTE}
                params={categoryParams(locale, category.category)}
                className="transition-standard inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[15px] font-medium text-foreground/80 hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden />
                {category.name}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMegaOpen((value) => !value)}
            aria-expanded={megaOpen}
            className="transition-standard inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[15px] font-medium text-foreground/80 hover:bg-secondary hover:text-foreground"
          >
            {t.nav.more}
            <ChevronDown
              className={`transition-standard size-4 ${megaOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </nav>

        <div className="ml-auto hidden items-center gap-2.5 lg:flex">
          <Link
            to={SECTION_ROUTE}
            params={privacyParams(locale)}
            className="transition-standard rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted-foreground hover:text-foreground"
          >
            {t.nav.privacy}
          </Link>
          <LanguageSwitcher />
          <Button asChild size="lg">
            <Link to={DETAIL_ROUTE} params={toolParams(locale, "comprimir-pdf")}>
              {t.nav.cta}
            </Link>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="transition-standard inline-flex size-11 items-center justify-center rounded-xl border border-border text-foreground"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {megaOpen && (
        <div
          className="animate-rise hidden border-t border-border bg-surface shadow-overlay lg:block"
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="mx-auto max-w-[1400px] px-5 py-8">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
              {t.nav.megaTitle}
            </p>
            <div className="mt-5 grid gap-7 xl:grid-cols-3 2xl:grid-cols-6">
              {categories.map((category) => {
                const accent = FAMILY_ACCENTS[category.category];
                const list = tools.filter((tool) => tool.category === category.category);
                const soon = localizedRoadmapByCategory(locale, category.category);
                return (
                  <div key={category.category}>
                    <Link
                      to={DETAIL_ROUTE}
                      params={categoryParams(locale, category.category)}
                      onClick={() => setMegaOpen(false)}
                      className={`inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] ${accent.text}`}
                    >
                      <span
                        className={`inline-flex size-7 items-center justify-center rounded-lg ${accent.iconBg}`}
                      >
                        <ToolIcon name={FAMILY_ICONS[category.category]} className="size-4" />
                      </span>
                      {category.name}
                    </Link>
                    <ul className="mt-3 space-y-1">
                      {list.map((tool) => (
                        <li key={tool.slug}>
                          <Link
                            to={DETAIL_ROUTE}
                            params={toolParams(locale, tool.canonicalSlug)}
                            onClick={() => setMegaOpen(false)}
                            className="transition-standard flex items-start gap-2.5 rounded-lg p-2 hover:bg-secondary"
                          >
                            <span className={`mt-0.5 ${accent.icon}`}>
                              <ToolIcon name={tool.icon} className="size-[18px]" />
                            </span>
                            <span>
                              <span className="block text-[14px] font-semibold leading-tight">
                                {tool.name}
                              </span>
                              <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
                                {tool.status === "pending" ? t.status.pending : tool.tagline}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                      {soon.slice(0, 3).map((tool) => (
                        <li
                          key={tool.name}
                          className="flex items-center gap-2.5 p-2 text-[14px] text-muted-foreground/80"
                        >
                          <ToolIcon name={tool.icon} className="size-[18px] opacity-60" />
                          {tool.name}
                          <span className="ml-auto text-[11px] font-semibold uppercase tracking-wide">
                            {t.status.soon}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <Link
              to={SECTION_ROUTE}
              params={catalogParams(locale)}
              onClick={() => setMegaOpen(false)}
              className="transition-standard mt-6 inline-block text-[15px] font-semibold text-primary hover:text-primary-dark"
            >
              {t.nav.megaFooter} →
            </Link>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="animate-rise border-t border-border bg-surface px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1.5" aria-label={t.nav.menu}>
            <Link
              to={SECTION_ROUTE}
              params={catalogParams(locale)}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl bg-primary-soft px-4 py-3.5 text-[16px] font-semibold text-primary-dark"
            >
              {t.nav.allTools}
            </Link>
            {categories.map((category) => {
              const accent = FAMILY_ACCENTS[category.category];
              return (
                <Link
                  key={category.category}
                  to={DETAIL_ROUTE}
                  params={categoryParams(locale, category.category)}
                  onClick={() => setMobileOpen(false)}
                  className="transition-standard inline-flex items-center gap-3 rounded-xl px-4 py-3.5 text-[16px] font-medium hover:bg-secondary"
                >
                  <span
                    className={`inline-flex size-9 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon}`}
                  >
                    <ToolIcon name={FAMILY_ICONS[category.category]} className="size-[18px]" />
                  </span>
                  {category.name}
                </Link>
              );
            })}
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3.5 text-[16px] font-medium text-muted-foreground"
            >
              {t.nav.privacy}
            </Link>
          </nav>
          <div className="mt-5 border-t border-border pt-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
              {t.nav.language}
            </p>
            <div className="mt-3">
              <LanguageSwitcher variant="inline" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
