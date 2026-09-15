import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { searchTools } from "@/lib/tools/registry";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { ToolIcon } from "./ToolIcon";

const SUGGESTIONS = ["Comprimir PDF", "Unir PDF", "Dividir PDF", "PDF a JPG", "PDF a Word"];

export function ToolSearch({ size = "md" }: { size?: "md" | "lg" }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => searchTools(query).slice(0, 7), [query]);
  const open = focused && query.trim().length > 0;
  const large = size === "lg";

  const go = (slug: string) => {
    setFocused(false);
    setQuery("");
    void navigate({ to: "/herramientas/$slug", params: { slug } });
  };

  return (
    <div className="relative">
      <div
        className={`transition-standard flex items-center gap-3 rounded-2xl border border-border bg-surface shadow-subtle focus-within:border-primary/50 focus-within:shadow-focus ${
          large ? "px-5 py-4" : "px-4 py-3"
        }`}
      >
        <Search
          className={`shrink-0 text-primary ${large ? "size-6" : "size-5"}`}
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
              go(results[active].slug);
            } else if (event.key === "Escape") {
              setFocused(false);
            }
          }}
          type="search"
          placeholder="¿Qué quieres hacer con tu PDF?"
          aria-label="¿Qué quieres hacer con tu PDF?"
          className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${
            large ? "text-lg" : "text-base"
          }`}
        />
      </div>

      {open && (
        <ul
          className="animate-fade absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-overlay"
          role="listbox"
        >
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              Todavía no tenemos esa herramienta. Prueba con «comprimir», «unir» o «convertir».
            </li>
          )}
          {results.map((tool, index) => {
            const accent = FAMILY_ACCENTS[tool.category];
            return (
              <li key={tool.slug} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(tool.slug)}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left ${
                    index === active ? "bg-primary-soft" : "bg-transparent"
                  }`}
                >
                  <span
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon}`}
                  >
                    <ToolIcon name={tool.icon} className="size-4" />
                  </span>
                  <span className="text-sm font-semibold">{tool.name}</span>
                  <span className="ml-auto truncate pl-3 text-xs text-muted-foreground">
                    {tool.status === "pending" ? "En construcción" : tool.tagline}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Populares
        </span>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setQuery(suggestion);
              setFocused(true);
              inputRef.current?.focus();
            }}
            className="transition-standard rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground/80 shadow-subtle hover:-translate-y-px hover:border-primary/40 hover:text-primary-dark"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
