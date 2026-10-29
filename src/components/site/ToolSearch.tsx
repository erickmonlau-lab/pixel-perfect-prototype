import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
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
  const results = useMemo(() => searchLocalizedTools(locale, query).slice(0, 10), [locale, query]);

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
    <div ref={containerRef} className="relative z-50 w-full">
      {/* Search Input Bar - Neo-brutalist limpio y oficial de BreadPDF */}
      <div
        className={`transition-all duration-150 flex items-center gap-3.5 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12] ${
          open
            ? "border-[#0F0F12] ring-3 ring-[#EC3C2D]/15"
            : "hover:shadow-[5px_5px_0_#0F0F12] focus-within:shadow-[5px_5px_0_#EC3C2D] focus-within:ring-3 focus-within:ring-[#EC3C2D]/15"
        } ${large ? "h-[58px] sm:h-[64px] px-4 sm:px-5" : "h-13 px-4"}`}
      >
        {/* Lupa en rojo corporativo oficial #EC3C2D con borde negro sutil */}
        <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-[#EC3C2D] text-white border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] select-none">
          <Search className="size-5 text-white stroke-[2.8]" aria-hidden="true" />
        </span>

        {/* Campo de búsqueda tipografía clara con type="text" para eliminar cancel button nativo de WebKit */}
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
            large ? "text-[16.5px] sm:text-[18px]" : "text-[15px] sm:text-[16px]"
          }`}
        />

        {/* Botón único de limpiar búsqueda: Coherente con BreadPDF (caja blanca borde negro 2px) */}
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] hover:bg-[#FEF08A] transition-all cursor-pointer shadow-[1px_1px_0_#0F0F12] active:translate-y-0.5"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-3.5 sm:size-4 stroke-[2.8]" />
          </button>
        )}
      </div>

      {/* Menú flotante de resultados en tiempo real — Contenido más compacto (max 3 items visibles y scroll suave con remate negro) */}
      {open && (
        <div
          id="tool-search-results"
          className="absolute inset-x-0 top-full mt-2 z-60 overflow-hidden rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[5px_6px_0_#0F0F12]"
        >
          <ul
            ref={listRef}
            className="max-h-[228px] overflow-y-auto divide-y-2 divide-[#0F0F12]/10 custom-search-scroll"
            role="listbox"
            aria-label={t.search.results}
          >
            {results.length === 0 ? (
              <li className="px-6 py-6 text-center" role="presentation">
                <div className="mx-auto flex size-11 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EDEDF0] text-slate-500 mb-2.5 shadow-[2px_2px_0_#0F0F12]">
                  <Search className="size-5 stroke-[2.4]" />
                </div>
                <p className="text-[15px] font-black text-[#0F0F12]">
                  {(t.search as { emptyTitle?: string }).emptyTitle ?? "No encontramos ninguna herramienta para esa búsqueda."}
                </p>
                <p className="mt-1 text-[12.5px] font-medium text-slate-500 max-w-[380px] mx-auto">
                  {(t.search as { emptySuggestion?: string }).emptySuggestion ?? "Prueba con términos como comprimir, unir, convertir, firmar u OCR."}
                </p>
              </li>
            ) : (
              results.map((tool, index) => {
                const accent = FAMILY_ACCENTS[tool.category];
                const isSelected = index === active;
                const categoryLabel = CATEGORY_NAMES[tool.category]?.[locale as "es" | "ca" | "en"] ?? tool.category;

                return (
                  <li key={tool.slug} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => go(tool.canonicalSlug)}
                      className={`group flex w-full items-center gap-3.5 px-4 sm:px-5 py-2.5 text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#FFF5F2]"
                          : "bg-white hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {/* Icono de la herramienta según el lenguaje corporativo del catálogo */}
                      <span
                        className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-transform ${
                          isSelected ? "scale-105" : ""
                        } ${accent.iconBg} ${accent.icon}`}
                      >
                        <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-5.5 text-white" />
                      </span>

                      {/* Título de herramienta, etiqueta de categoría y descripción */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[15px] font-black tracking-tight ${isSelected ? "text-[#EC3C2D]" : "text-[#0F0F12]"}`}>
                            {tool.name}
                          </span>
                          <span className="inline-flex items-center rounded-md border border-[#0F0F12] bg-[#FAF8F5] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                            {categoryLabel}
                          </span>
                        </div>
                        <p className="truncate text-[12.5px] font-medium text-slate-600 mt-0.5">
                          {tool.tagline}
                        </p>
                      </div>

                      {/* Flechas / Botón de acción con acabado nítido y visible en negro */}
                      <div className="hidden sm:flex items-center shrink-0">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-2.5 py-1 text-[11px] font-black text-white shadow-[2px_2px_0_#0F0F12]">
                            <span>Abrir</span>
                            <CornerDownLeft className="size-3 stroke-[2.8]" />
                          </span>
                        ) : (
                          <span className="flex size-7 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-white text-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12] group-hover:bg-[#0F0F12] group-hover:text-white transition-all">
                            <ArrowRight className="size-3.5 stroke-[2.8]" />
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {/* Acabado inferior en negro sólido / franja neo-brutalist de remate con scroll count */}
          {results.length > 0 && (
            <div className="flex items-center justify-between border-t-2 border-[#0F0F12] bg-[#0F0F12] px-4 sm:px-5 py-2 text-[11px] font-black text-white">
              <span className="text-white/90">
                {results.length} {results.length === 1 ? "herramienta" : "herramientas"} · <span className="text-[#EC3C2D]">desplaza para ver más</span>
              </span>
              <div className="hidden sm:flex items-center gap-3 text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">↑</kbd>
                  <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">↓</kbd>
                  <span>navegar</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">↵</kbd>
                  <span>abrir</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">Esc</kbd>
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
              className="group/pill inline-flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border-2 border-[#0F0F12] bg-white text-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_#0F0F12] hover:bg-[#F8FAFC] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12]"
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
