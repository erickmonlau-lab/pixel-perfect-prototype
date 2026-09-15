import { Link } from "@tanstack/react-router";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  SECTION_ROUTE,
  catalogParams,
  categoryParams,
  privacyParams,
  toolParams,
} from "@/lib/i18n/routing";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { TOOLS } from "@/lib/tools/registry";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { locale, t, categories, tools } = useLocale();

  return (
    <footer className="mt-16 border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-11">
        <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-[1.1fr_repeat(4,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-3.5 max-w-xs text-[14px] leading-relaxed text-navy-foreground/70">
              {t.brandTagline}
            </p>
            <div className="mt-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-navy-foreground/55">
                {t.footer.language}
              </p>
              <div className="mt-2.5 flex gap-4 text-[14px]">
                <LanguageSwitcher variant="inline" />
              </div>
            </div>
          </div>

          {categories
            .filter((category) => tools.some((tool) => tool.category === category.category))
            .map((category) => {
              const accent = FAMILY_ACCENTS[category.category];
              return (
                <div key={category.category}>
                  <h2 className="text-[14px] font-semibold text-navy-foreground">
                    <Link
                      to={DETAIL_ROUTE}
                      params={categoryParams(locale, category.category)}
                      className="inline-flex items-center gap-2"
                    >
                      <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden />
                      {category.name}
                    </Link>
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {tools
                      .filter((tool) => tool.category === category.category)
                      .map((tool) => (
                        <li key={tool.slug}>
                          <Link
                            to={DETAIL_ROUTE}
                            params={toolParams(locale, tool.canonicalSlug)}
                            className="transition-standard text-[14px] text-navy-foreground/70 hover:text-navy-foreground"
                          >
                            {tool.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-navy-foreground/10 pt-6 text-[14px] text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights(new Date().getFullYear(), TOOLS.length)}</p>
          <div className="flex gap-6">
            <Link
              to={SECTION_ROUTE}
              params={catalogParams(locale)}
              className="hover:text-navy-foreground"
            >
              {t.nav.tools}
            </Link>
            <Link
              to={SECTION_ROUTE}
              params={privacyParams(locale)}
              className="hover:text-navy-foreground"
            >
              {t.nav.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
