import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { localizedPopular, searchLocalizedTools } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";
import { getRichToolIcon } from "./RichToolIcon";
import type { ToolCategory } from "@/lib/tools/types";

/** Category styling with solid backgrounds, crisp white text and smooth interactive hover */
const POPULAR_TOOL_STYLES: Record<ToolCategory, { pill: string }> = {
  optimizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  organizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  convertir: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  editar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  seguridad: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  inteligencia: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
};

const CATEGORY_NAMES: Record<ToolCategory, { es: string; ca: string; en: string }> = {
  optimizar: { es: "Optimizar", ca: "Optimitzar", en: "Optimize" },
  organizar: { es: "Organizar", ca: "Organitzar", en: "Organize" },
  convertir: { es: "Convertir", ca: "Convertir", en: "Convert" },
  editar: { es: "Editar", ca: "Editar", en: "Edit" },
  seguridad: { es: "Seguridad", ca: "Seguretat", en: "Security" },
  inteligencia: { es: "PDF Intelligence", ca: "Intel·ligència", en: "Intelligence" },
};

export function ToolSearch({ size = "md" }: { size?: "md" | "lg" }) {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search across all 50 real tools
  const results = useMemo(() => searchLocalizedTools(locale, query).slice(0, 10), [locale, query]);
  const suggestions = useMemo(() => localizedPopular(locale).slice(0, 5), [locale]);
  const open = focused && query.trim().length > 0;
  const large = size === "lg";

  /** Scroll active item into view inside the dropdown list */
  useEffect(() => {
    if (!open || !listRef.current) return;
    const activeItem = listRef.current.children[active] as HTMLElement | undefined;
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [active, open]);

  /** Close on click outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  /** Real Ctrl + K (and Cmd + K fallback) shortcut that focuses the search input */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        setFocused(true);
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
    <div ref={containerRef} className="relative z-40 w-full">
      {/* Search Input Bar */}
      <div
        className={`transition-all duration-200 flex items-center gap-3.5 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12] focus-within:ring-2 focus-within:ring-[#EF4444] focus-within:shadow-[5px_5px_0_#0F0F12] focus-within:-translate-y-0.5 ${open ? "rounded-b-none" : ""} ${large ? "h-[58px] px-5 sm:h-[62px] sm:px-6" : "h-12 px-4"}`}
      >
        <Search
          className={`shrink-0 text-brand-pdf ${large ? "size-6 sm:size-7" : "size-5"}`}
          strokeWidth={2.4}
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setFocused(false);
              inputRef.current?.blur();
              return;
            }
            if (!open) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              if (results.length > 0) {
                setActive((i) => (i + 1) % results.length);
              }
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (results.length > 0) {
                setActive((i) => (i - 1 + results.length) % results.length);
              }
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              go(results[active].canonicalSlug);
            }
          }}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="tool-search-results"
          placeholder={t.search.placeholder}
          aria-label={t.search.placeholder}
          className={`w-full bg-transparent outline-none text-[#0F172A] placeholder:text-[#94A3B8] font-medium ${
            large ? "text-[17px] sm:text-[18px]" : "text-[15px] sm:text-[16px]"
          }`}
        />

        {/* Clear input button */}
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Real-time Results Dropdown */}
      {open && (
        <div
          id="tool-search-results"
          className="animate-in fade-in-0 zoom-in-95 duration-150 absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-2xl border border-t-0 border-[#D1D5DB] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
        >
          <ul
            ref={listRef}
            className="max-h-[min(420px,calc(100vh-280px))] overflow-y-auto overscroll-contain divide-y divide-slate-100 scrollbar-thin"
            style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
            role="listbox"
            aria-label={t.search.results}
          >
            {results.length === 0 ? (
              <li className="px-6 py-8 text-center" role="presentation">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                  <Search className="size-5" />
                </div>
                <p className="text-[15.5px] font-bold text-[#0F172A]">
                  {(t.search as { emptyTitle?: string }).emptyTitle ?? "No encontramos ninguna herramienta para esa búsqueda."}
                </p>
                <p className="mt-1.5 text-[13.5px] text-[#64748B] max-w-[380px] mx-auto">
                  {(t.search as { emptySuggestion?: string }).emptySuggestion ?? "Prueba con términos como comprimir, unir, convertir, firmar u OCR."}
                </p>
              </li>
            ) : (
              results.map((tool, index) => {
                const accent = FAMILY_ACCENTS[tool.category];
                const RichIcon = getRichToolIcon(tool.slug) || getRichToolIcon(tool.canonicalSlug);
                const isSelected = index === active;
                const categoryLabel = CATEGORY_NAMES[tool.category]?.[locale as "es" | "ca" | "en"] ?? tool.category;

                return (
                  <li key={tool.slug} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => go(tool.canonicalSlug)}
                      className={`flex w-full items-center gap-3.5 px-5 py-3.5 text-left transition-colors ${
                        isSelected
                          ? "bg-[#FFF5F4] text-[#0F172A]"
                          : "bg-white text-[#0F172A] hover:bg-slate-50"
                      }`}
                    >
                      {/* Tool Icon */}
                      <span
                        className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 ${
                          isSelected ? "scale-105 shadow-xs" : ""
                        } ${accent.iconBg} ${accent.icon}`}
                      >
                        <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-7" />
                      </span>

                      {/* Tool Name & Tagline */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[15.5px] font-bold tracking-tight ${isSelected ? "text-brand-pdf" : "text-[#0F172A]"}`}>
                            {tool.name}
                          </span>
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                            isSelected
                              ? "bg-brand-pdf/10 text-brand-pdf"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {categoryLabel}
                          </span>
                        </div>
                        <p className="truncate text-[13px] text-[#64748B] mt-0.5">
                          {tool.tagline}
                        </p>
                      </div>

                      {/* Action indicator / Press Enter */}
                      <div className="hidden sm:flex items-center text-slate-400 shrink-0">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 rounded border border-brand-pdf/30 bg-white px-2 py-1 text-[11px] font-bold text-brand-pdf shadow-xs">
                            <span>Abrir</span>
                            <CornerDownLeft className="size-3" />
                          </span>
                        ) : (
                          <ArrowRight className="size-4 opacity-40" />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {/* Quick Keyboard Footer hint inside dropdown */}
          {results.length > 0 && (
            <div className="hidden sm:flex items-center justify-between border-t border-slate-100 bg-[#F8FAFC] px-5 py-2 text-[12px] text-slate-500 font-medium">
              <span className="text-slate-600">
                {results.length} {results.length === 1 ? "herramienta encontrada" : "herramientas encontradas"}
              </span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-bold">↑</kbd>
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-bold">↓</kbd>
                  <span>para navegar</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-bold">↵</kbd>
                  <span>para abrir</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-bold">Esc</kbd>
                  <span>para cerrar</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          POPULAR TOOLS BLOCK (Full width, flex-wrap centered, zero overflow)
          ============================================================ */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 w-full">
        {/* "Populares:" label */}
        <span className="shrink-0 text-[13px] font-black tracking-wider uppercase text-[#0F0F12] mr-1">
          {t.search.popular}:
        </span>

        {/* Fast Tool Pills: px-3 py-1.5 text-xs font-semibold whitespace-nowrap */}
        {suggestions.map((tool) => {
          const style = POPULAR_TOOL_STYLES[tool.category] ?? POPULAR_TOOL_STYLES.optimizar;

          return (
            <Link
              key={tool.slug}
              to={DETAIL_ROUTE}
              params={toolParams(locale, tool.canonicalSlug)}
              className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${style.pill}`}
            >
              <span>{tool.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
