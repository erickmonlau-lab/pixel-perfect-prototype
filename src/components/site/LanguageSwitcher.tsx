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

  /* ── Menu / Header — compact clean neo-brutalist capsule [ ES  CA  EN ] ────────────────────── */
  return (
    <div
      className="inline-flex items-center rounded-xl border-2 border-[#0F0F12] bg-white p-1 shadow-[2px_2px_0_#0F0F12] min-w-[108px] h-[36px]"
      role="group"
      aria-label={t.nav.languageAria}
    >
      {/* Locale switch links — Real Links for SEO & accessibility with animated sliding pill effect */}
      <div className="flex items-center gap-0.5 h-full">
        {LOCALES.map((item) => {
          const isActive = item === locale;
          return (
            <Link
              key={item}
              to={translatePath(pathname, item)}
              onClick={() => rememberLocale(item)}
              aria-current={isActive ? "true" : undefined}
              title={LOCALE_LABEL[item]}
              className={`site-lang-btn flex items-center justify-center min-w-[30px] px-2.5 h-full text-xs font-black tracking-wider uppercase rounded-lg transition-all duration-150 select-none ${
                isActive
                  ? "bg-[#D92D24] text-white shadow-[1px_1px_0_#0F0F12]"
                  : "text-[#0F0F12] hover:bg-[#FEECEB] hover:text-[#C92E25]"
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
