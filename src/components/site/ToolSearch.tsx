import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { localizedPopular, searchLocalizedTools } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";

export function ToolSearch({ size = "md" }: { size?: "md" | "lg" }) {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => searchLocalizedTools(locale, query).slice(0, 7), [locale, query]);
  const suggestions = useMemo(() => localizedPopular(locale).slice(0, 5), [locale]);
  const open = focused && query.trim().length > 0;
  const large = size === "lg";

  /** Real ⌘K / Ctrl+K shortcut so the visible hint is never decorative. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (canonicalSlug: string) => {
    setFocused(false);
    setQuery("");
    void navigate({ to: DETAIL_ROUTE, params: toolParams(locale, canonicalSlug) });
  };

  return (
    <div className="relative">
      <div
        className={`transition-standard flex items-center gap-4 rounded-2xl border border-border bg-surface shadow-subtle focus-within:border-primary/60 focus-within:shadow-focus ${
          large ? "h-[72px] px-6" : "h-16 px-5"
        }`}
      >
        <Search
          className={`shrink-0 text-primary ${large ? "size-7" : "size-6"}`}
          strokeWidth={2}
          aria-hidden
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          onKeyDown={(event) => {
            if (!open) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((i) => (i + 1) % results.length);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((i) => (i - 1 + results.length) % results.length);
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              go(results[active].canonicalSlug);
            } else if (event.key === "Escape") {
              setFocused(false);
            }
          }}
          type="search"
          placeholder={t.search.placeholder}
          aria-label={t.search.placeholder}
          className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${
            large ? "text-[18px]" : "text-[16px]"
          }`}
        />
        <kbd className="hidden shrink-0 items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-[12px] font-semibold text-muted-foreground sm:inline-flex">
          ⌘ K
        </kbd>
      </div>

      {open && (
        <ul
          className="animate-fade absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-overlay"
          role="listbox"
          aria-label={t.search.results}
        >
          {results.length === 0 && (
            <li className="px-5 py-4 text-[15px] text-muted-foreground">{t.search.empty}</li>
          )}
          {results.map((tool, index) => {
            const accent = FAMILY_ACCENTS[tool.category];
            return (
              <li key={tool.slug} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(tool.canonicalSlug)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left ${
                    index === active ? "bg-primary-soft" : "bg-transparent"
                  }`}
                >
                  <span
                    className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ${accent.iconBg} ${accent.icon}`}
                  >
                    <ToolIcon name={tool.icon} className="size-5" />
                  </span>
                  <span className="text-[15px] font-semibold">{tool.name}</span>
                  <span className="ml-auto hidden truncate pl-4 text-[13px] text-muted-foreground sm:block">
                    {tool.status === "pending" ? t.status.pending : tool.tagline}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold text-muted-foreground">
          {t.search.popular}
        </span>
        {suggestions.map((tool) => (
          <button
            key={tool.slug}
            type="button"
            onClick={() => {
              setQuery(tool.name);
              setFocused(true);
              inputRef.current?.focus();
            }}
            className="transition-standard rounded-lg border border-border/70 bg-surface px-3 py-1.5 text-[14px] font-semibold text-foreground/85 hover:border-primary/40 hover:text-primary-dark"
          >
            {tool.name}
          </button>
        ))}
      </div>
    </div>
  );
}
