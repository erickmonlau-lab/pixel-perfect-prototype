import React from "react";
import { Link } from "@tanstack/react-router";
import { Home, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { HOME_ROUTE, homeParams } from "@/lib/i18n/routing";

export interface BreadcrumbItem {
  label: string;
  to?: string | undefined;
  params?: Record<string, any> | undefined;
  search?: Record<string, any> | undefined;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

/**
 * Reusable contextual breadcrumb navigation for BreadPDF.
 * Neo-Brutalist, crisp, accessible and fully localized.
 */
export function Breadcrumb({ items, className = "", showHomeIcon = true }: BreadcrumbProps) {
  const { locale, t } = useLocale();

  return (
    <nav
      aria-label={locale === "ca" ? "Fil d'Ariadna" : locale === "en" ? "Breadcrumb" : "Ruta de navegación"}
      className={`mb-3 w-full min-w-0 text-[14px] font-bold text-slate-700 sm:mb-4 sm:text-[14.5px] ${className}`}
    >
      <ol className="flex w-full min-w-0 flex-wrap items-center gap-2 leading-snug">
        {/* Link to Home */}
        <li className="inline-flex shrink-0 items-center">
          <Link
            to={HOME_ROUTE}
            params={homeParams(locale)}
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-[#0F0F12] bg-white px-2.5 py-1 text-slate-800 shadow-[2px_2px_0_#0F0F12] transition-all hover:bg-[#FEF08A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F12]"
            aria-label={`${t.nav.home} · BreadPDF`}
          >
            {showHomeIcon && <Home className="size-3.5 text-[#0F0F12] shrink-0" />}
            <span className="font-black text-[#0F0F12]">{t.nav.home}</span>
          </Link>
        </li>

        {/* Separator and items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className={`flex min-w-0 items-center gap-2 ${
                isLast ? "flex-[1_1_15rem] max-w-[min(100%,24rem)]" : "shrink-0"
              }`}
            >
              <span
                className="inline-flex shrink-0 items-center select-none text-slate-400 font-black"
                aria-hidden="true"
              >
                <ChevronRight className="size-4 stroke-[3] text-[#0F0F12]" />
              </span>
              {isLast || !item.to ? (
                <span
                  className="block w-full min-w-0 whitespace-normal break-words rounded-lg border-2 border-[#0F0F12] bg-[#F4F4F6] px-2.5 py-1 font-black leading-snug text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]"
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to as any}
                  params={item.params as any}
                  search={item.search as any}
                  className="inline-flex items-center whitespace-nowrap rounded-lg border-2 border-[#0F0F12] bg-white px-2.5 py-1 font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-all hover:bg-[#FEF08A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F12]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
