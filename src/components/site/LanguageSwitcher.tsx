import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Check, Globe } from "lucide-react";
import { useState } from "react";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_SHORT,
  rememberLocale,
  type Locale,
} from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/context";

export function LanguageSwitcher({ variant = "menu" }: { variant?: "menu" | "inline" }) {
  const { locale, t } = useLocale();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  const change = (target: Locale) => {
    rememberLocale(target);
    setOpen(false);
    void navigate({ href: translatePath(pathname, target) });
  };

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.nav.languageAria}>
        {LOCALES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => change(item)}
            aria-current={item === locale}
            className={`transition-standard rounded-full border px-4 py-2 text-[14px] font-semibold ${
              item === locale
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground/80 hover:border-primary/40"
            }`}
          >
            {LOCALE_LABEL[item]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        onBlur={() => window.setTimeout(() => setOpen(false), 140)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.nav.languageAria}
        className="transition-standard inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-3.5 text-[15px] font-semibold text-foreground/85 hover:border-primary/40 hover:text-primary-dark"
      >
        <Globe className="size-[18px]" aria-hidden />
        {LOCALE_SHORT[locale]}
      </button>

      {open && (
        <div
          className="animate-fade absolute right-0 top-full z-40 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-popover shadow-overlay"
          role="menu"
        >
          {LOCALES.map((item) => (
            <button
              key={item}
              type="button"
              role="menuitem"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => change(item)}
              className={`transition-standard flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium hover:bg-primary-soft ${
                item === locale ? "text-primary-dark" : "text-foreground/85"
              }`}
            >
              {LOCALE_LABEL[item]}
              {item === locale && <Check className="size-4" aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
