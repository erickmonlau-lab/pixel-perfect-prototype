import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { localizedPopular, searchLocalizedTools } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";
import { getToolColorTheme } from "@/lib/tools/color-system";
import type { ToolCategory } from "@/lib/tools/types";

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

  // Rotating placeholder cues
  const rotatingPlaceholders = useMemo(() => {
    return {
      es: [
        "Comprimir un PDF...",
        "Unir dos o más archivos...",
        "Pasar PDF a Word...",
        "Proteger con contraseña...",
        "Dividir o extraer páginas...",
      ],
      ca: [
        "Comprimir un PDF...",
        "Unir dos o més arxius...",
        "Passar PDF a Word...",
        "Protegir amb contrasenya...",
        "Dividir o extreure pàgines...",
      ],
      en: [
        "Compress a PDF...",
        "Merge multiple files...",
        "Convert PDF to Word...",
        "Protect with password...",
        "Split or extract pages...",
      ],
    }[locale as "es" | "ca" | "en"] ?? [
      "Comprimir un PDF...",
      "Unir dos o más archivos...",
      "Pasar PDF a Word...",
      "Proteger con contraseña...",
    ];
  }, [locale]);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Search across all real tools
  const results = useMemo(() => searchLocalizedTools(locale, query).slice(0, 8), [locale, query]);

  useEffect(() => {
    if (focused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingPlaceholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [focused, rotatingPlaceholders.length]);

  const suggestions = useMemo(() => localizedPopular(locale).slice(0, 5), [locale]);
  const open = focused && query.trim().length > 0;
  const large = size === "lg";

  /** Scroll active item into view inside dropdown */
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

  /** Real Ctrl + K (and Cmd + K fallback) shortcut */
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
      {/* Search Input Bar Neo-Brutalist */}
      <div
        className={`transition-all duration-150 flex items-center gap-3 sm:gap-4 border-2 border-[#0F0F12] bg-white text-[#0F0F12] ${
          open
            ? "rounded-t-2xl rounded-b-none border-b-2 border-b-[#0F0F12] shadow-[6px_6px_0_#0F0F12]"
            : "rounded-2xl shadow-[5px_5px_0_#0F0F12] focus-within:shadow-[6px_6px_0_#EC3C2D] focus-within:-translate-y-0.5"
        } ${large ? "h-[64px] sm:h-[70px] pl-3.5 pr-3 sm:pl-4 sm:pr-4" : "h-13 sm:h-14 px-3 sm:px-4"}`}
      >
        {/* Lupa roja corporativa en bloque neo-brutalist */}
        <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[2px_2px_0_#0F0F12] select-none">
          <Search className="size-5 sm:size-5.5 text-white stroke-[2.8]" aria-hidden="true" />
        </span>

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
          type="text"
          role="combobox"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="tool-search-results"
          placeholder={focused ? t.search.placeholder : (rotatingPlaceholders[placeholderIndex] || "¿Qué quieres hacer con tu PDF?")}
          aria-label={t.search.placeholder}
          className={`w-full bg-transparent outline-none text-[#0F0F12] placeholder:text-slate-400 font-bold ${
            large ? "text-[17px] sm:text-[19px]" : "text-[15px] sm:text-[16px]"
          }`}
        />

        {/* Clear input button (solo un único botón X estilizado) */}
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] hover:bg-[#FEF08A] active:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Real-time Results Dropdown Neo-Brutalist */}
      {open && (
        <div
          id="tool-search-results"
          className="absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-2xl border-2 border-t-0 border-[#0F0F12] bg-white shadow-[6px_8px_0_#0F0F12]"
        >
          <ul
            ref={listRef}
            className="max-h-[360px] sm:max-h-[400px] overflow-y-auto divide-y-2 divide-[#EDEDF0]"
            role="listbox"
            aria-label={t.search.results}
          >
            {results.length === 0 ? (
              <li className="px-6 py-8 text-center" role="presentation">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] mb-3">
                  <Search className="size-5 stroke-[2.5]" />
                </div>
                <p className="text-[16px] font-black text-[#0F0F12]">
                  {(t.search as { emptyTitle?: string }).emptyTitle ?? "No encontramos ninguna herramienta para esa búsqueda."}
                </p>
                <p className="mt-1 text-[13.5px] font-medium text-slate-500 max-w-[380px] mx-auto">
                  {(t.search as { emptySuggestion?: string }).emptySuggestion ?? "Prueba con términos como comprimir, unir, convertir, firmar u OCR."}
                </p>
              </li>
            ) : (
              results.map((tool, index) => {
                const isSelected = index === active;
                const theme = getToolColorTheme(tool.canonicalSlug, tool.category);
                const categoryLabel = CATEGORY_NAMES[tool.category]?.[locale as "es" | "ca" | "en"] ?? tool.category;

                return (
                  <li key={tool.slug} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => go(tool.canonicalSlug)}
                      className={`group flex w-full items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#FEF9C3]"
                          : "bg-white hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {/* Tool Icon con caja neo-brutalist y color distintivo */}
                      <span
                        className={`flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-transform ${
                          isSelected ? "scale-105" : ""
                        } ${theme.bg} ${theme.text}`}
                      >
                        <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-5 sm:size-6" />
                      </span>

                      {/* Tool Name, Category Badge & Tagline */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[15px] sm:text-[16px] font-black tracking-tight ${isSelected ? "text-[#EC3C2D]" : "text-[#0F0F12]"}`}>
                            {tool.name}
                          </span>
                          <span className="inline-flex items-center rounded-md border border-[#0F0F12] bg-white px-1.5 py-0.2 text-[10.5px] font-black uppercase tracking-wider text-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                            {categoryLabel}
                          </span>
                        </div>
                        <p className="truncate text-[12.5px] sm:text-[13px] font-medium text-slate-600 mt-0.5">
                          {tool.tagline}
                        </p>
                      </div>

                      {/* Action indicator */}
                      <div className="hidden sm:flex items-center shrink-0">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-2 py-0.8 text-[11px] font-black text-white shadow-[1.5px_1.5px_0_#0F0F12]">
                            <span>Abrir</span>
                            <CornerDownLeft className="size-3 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span className="flex size-7 items-center justify-center rounded-md border border-slate-300 text-slate-400 group-hover:text-[#0F0F12] group-hover:border-[#0F0F12] transition-colors">
                            <ArrowRight className="size-3.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {/* Neo-brutalist Dropdown Footer */}
          {results.length > 0 && (
            <div className="hidden sm:flex items-center justify-between border-t-2 border-[#0F0F12] bg-[#EDEDF0] px-4 sm:px-5 py-2 text-[11.5px] font-bold text-[#0F0F12]">
              <span>
                {results.length} {results.length === 1 ? "herramienta encontrada" : "herramientas encontradas"}
              </span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-[#0F0F12] bg-white px-1 py-0.2 text-[9.5px] font-black shadow-[1px_1px_0_#0F0F12]">↑</kbd>
                  <kbd className="rounded border border-[#0F0F12] bg-white px-1 py-0.2 text-[9.5px] font-black shadow-[1px_1px_0_#0F0F12]">↓</kbd>
                  <span>navegar</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-[#0F0F12] bg-white px-1 py-0.2 text-[9.5px] font-black shadow-[1px_1px_0_#0F0F12]">↵</kbd>
                  <span>abrir</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-[#0F0F12] bg-white px-1 py-0.2 text-[9.5px] font-black shadow-[1px_1px_0_#0F0F12]">Esc</kbd>
                  <span>cerrar</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          POPULAR TOOLS BLOCK: 5 BOTONES DIRECTOS CENTRADOS
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 w-full mx-auto select-none">
        {suggestions.map((tool) => {
          const theme = getToolColorTheme(tool.canonicalSlug, tool.category);

          return (
            <Link
              key={tool.slug}
              to={DETAIL_ROUTE}
              params={toolParams(locale, tool.canonicalSlug)}
              className="group/pill inline-flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border-2 border-[#0F0F12] bg-white text-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_#0F0F12] hover:bg-[#FEF08A] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12]"
            >
              {/* Icono auténtico de la herramienta con su color corporativo del catálogo */}
              <span
                className={`flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-lg border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12] group-hover/pill:scale-105 transition-transform ${theme.bg} ${theme.text}`}
              >
                <ToolIcon
                  name={tool.icon}
                  canonicalSlug={tool.canonicalSlug}
                  className="size-4"
                />
              </span>
              <span className="text-[14.5px] sm:text-[15.5px] font-black tracking-tight text-[#0F0F12] group-hover/pill:text-[#EC3C2D] transition-colors">
                {tool.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
