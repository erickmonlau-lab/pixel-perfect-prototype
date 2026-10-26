import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Command, ArrowRight, CornerDownLeft, Sparkles, Clock } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { searchLocalizedTools, localizedPopular } from "@/lib/tools/localize";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";
import { getRichToolIcon } from "./RichToolIcon";
import { getToolColorTheme } from "@/lib/tools/color-system";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { locale, t } = useLocale();
  const navigate = useNavigate();

  // Search results
  const results = searchLocalizedTools(locale, query).slice(0, 10);
  const popular = localizedPopular(locale).slice(0, 6);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActive(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const goToTool = (slug: string) => {
    setIsOpen(false);
    void navigate({ to: DETAIL_ROUTE, params: toolParams(locale, slug) });
  };

  if (!isOpen) return null;

  const currentList = query.trim() ? results : popular;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0F0F12]/75 backdrop-blur-md animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl border-3 border-[#0F0F12] bg-[#FFFDF9] shadow-[10px_10px_0_#0F0F12] overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search header bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-[#0F0F12] bg-white">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[2px_2px_0_#0F0F12]">
            <Search className="size-5 stroke-[2.8]" />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (currentList.length > 0) setActive((i) => (i + 1) % currentList.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (currentList.length > 0) setActive((i) => (i - 1 + currentList.length) % currentList.length);
              } else if (e.key === "Enter" && currentList[active]) {
                e.preventDefault();
                goToTool(currentList[active].canonicalSlug);
              }
            }}
            placeholder={locale === "ca" ? "Cerca entre les 51 eines PDF..." : locale === "en" ? "Search 51 PDF tools..." : "Busca entre las 51 herramientas PDF..."}
            className="w-full bg-transparent outline-none text-[#0F0F12] placeholder:text-slate-400 text-lg font-bold"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="flex size-8 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] hover:bg-[#FEF08A] transition-colors cursor-pointer"
          >
            <X className="size-4 stroke-[2.8]" />
          </button>
        </div>

        {/* Section title */}
        <div className="px-5 py-2.5 bg-[#FEF08A] border-b-2 border-[#0F0F12] flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#0F0F12]">
          <span>{query.trim() ? "Resultados de búsqueda" : "Herramientas Populares"}</span>
          <span className="text-[11px] font-bold">51 herramientas locales</span>
        </div>

        {/* Results List */}
        <ul ref={listRef} className="max-h-[360px] overflow-y-auto divide-y divide-slate-200/80 p-2">
          {currentList.map((tool, idx) => {
            const isSelected = idx === active;
            const colorTheme = getToolColorTheme(tool.canonicalSlug, tool.category);

            return (
              <li key={tool.canonicalSlug}>
                <button
                  type="button"
                  onClick={() => goToTool(tool.canonicalSlug)}
                  onMouseEnter={() => setActive(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? "border-[#0F0F12] bg-[#FEF08A] shadow-[3px_3px_0_#0F0F12] -translate-y-0.5"
                      : "border-transparent hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${colorTheme.bg} text-white shadow-[2px_2px_0_#0F0F12]`}>
                      <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-6 text-white" />
                    </span>
                    <div className="min-w-0">
                      <span className="block truncate text-base font-black text-[#0F0F12]">
                        {tool.name}
                      </span>
                      <span className="block truncate text-xs font-medium text-slate-600">
                        {tool.tagline}
                      </span>
                    </div>
                  </div>

                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${isSelected ? "bg-[#0F0F12] text-white" : "bg-white text-[#0F0F12]"} shadow-[2px_2px_0_#0F0F12] transition-colors ml-3`}>
                    <ArrowRight className="size-4 stroke-[2.8]" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Keyboard navigation footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t-2 border-[#0F0F12] bg-[#EDEDF0] text-xs font-bold text-slate-700 select-none">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-[#0F0F12] bg-white text-[10px] font-black">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-[#0F0F12] bg-white text-[10px] font-black">↓</kbd>
              <span>Navegar</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded border border-[#0F0F12] bg-white text-[10px] font-black">↵</kbd>
              <span>Abrir</span>
            </span>
          </div>
          <span className="text-slate-500 font-semibold">BreadPDF Fast Engine</span>
        </div>
      </div>
    </div>
  );
}
