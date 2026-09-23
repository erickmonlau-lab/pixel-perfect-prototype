import { Link, useRouterState } from "@tanstack/react-router";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_SHORT,
  rememberLocale,
  type Locale,
} from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/context";

export function LanguageSwitcher({ variant = "menu" }: { variant?: "menu" | "inline" | "minimal" }) {
  const { locale, t } = useLocale();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  /* ── Minimal text-only variant (footer): Español · Català · English ── */
  if (variant === "minimal" || variant === "inline") {
    return (
      <div className="flex items-center gap-2 text-[13.5px] text-slate-400 font-medium" role="group" aria-label={t.nav.languageAria}>
        {LOCALES.map((item, idx) => {
          const isActive = item === locale;
          return (
            <span key={item} className="inline-flex items-center gap-2">
              <Link
                to={translatePath(pathname, item)}
                onClick={() => rememberLocale(item)}
                aria-current={isActive ? "true" : undefined}
                className={`transition-colors ${
                  isActive
                    ? "text-[#EC3C2D] font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {LOCALE_LABEL[item]}
              </Link>
              {idx < LOCALES.length - 1 && (
                <span className="text-slate-600 select-none">·</span>
              )}
            </span>
          );
        })}
      </div>
    );
  }

  /* ── Menu / Header — compact clean capsule [ ES  CA  EN ] ────────────────────── */
  return (
    <div
      className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      role="group"
      aria-label={t.nav.languageAria}
    >
      {/* Locale switch links — Real Links for SEO & accessibility */}
      <div className="flex items-center gap-0.5">
        {LOCALES.map((item) => {
          const isActive = item === locale;
          return (
            <Link
              key={item}
              to={translatePath(pathname, item)}
              onClick={() => rememberLocale(item)}
              aria-current={isActive ? "true" : undefined}
              title={LOCALE_LABEL[item]}
              className={`site-lang-btn flex items-center justify-center rounded-lg tracking-[0.04em] uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pdf/40 ${
                isActive
                  ? "bg-brand-pdf text-white shadow-xs font-black"
                  : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
              }`}
            >
              {LOCALE_SHORT[item]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
