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
 * Clean, compact, accessible and fully localized.
 */
export function Breadcrumb({ items, className = "", showHomeIcon = true }: BreadcrumbProps) {
  const { locale, t } = useLocale();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-[13px] sm:text-[13.5px] font-medium text-slate-500 mb-4 sm:mb-6 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 leading-none">
        {/* Link to Home */}
        <li className="inline-flex items-center">
          <Link
            to={HOME_ROUTE}
            params={homeParams(locale)}
            className="group inline-flex items-center gap-1 text-slate-500 hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3C2D]/30 rounded-md py-0.5 px-1 -mx-1"
            aria-label={`${t.nav.home} · BreadPDF`}
          >
            {showHomeIcon && (
              <Home className="size-3.5 text-slate-400 group-hover:text-[#EC3C2D] transition-colors shrink-0" />
            )}
            <span className="font-semibold text-slate-600 group-hover:text-[#0F172A] transition-colors">
              {t.nav.home}
            </span>
          </Link>
        </li>

        {/* Separator and items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <li className="inline-flex items-center text-slate-300 mx-0.5 select-none" aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li className="inline-flex items-center">
                {isLast || !item.to ? (
                  <span
                    className="font-bold text-[#0F172A] truncate max-w-[240px] sm:max-w-md"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.to as any}
                    params={item.params as any}
                    search={item.search as any}
                    className="text-slate-500 hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3C2D]/30 rounded-md py-0.5 px-1 -mx-1 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
