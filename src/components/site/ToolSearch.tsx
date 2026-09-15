import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { searchTools } from "@/lib/tools/registry";
import { ToolIcon } from "./ToolIcon";

const SUGGESTIONS = ["Comprimir PDF", "Unir PDF", "PDF a JPG", "Dividir PDF", "Rotar PDF"];

export function ToolSearch() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => searchTools(query).slice(0, 6), [query]);
  const open = focused && query.trim().length > 0;

  const go = (slug: string) => {
    setFocused(false);
    setQuery("");
    void navigate({ to: "/herramientas/$slug", params: { slug } });
  };

  return (
    <div className="relative">
      <div className="transition-standard flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-subtle focus-within:border-primary/50 focus-within:shadow-focus">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
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
          placeholder="Buscar una herramienta..."
          aria-label="¿Qué quieres hacer con tu PDF?"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
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
          {results.map((tool, index) => (
            <li key={tool.slug} role="option" aria-selected={index === active}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(tool.slug)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left ${
                  index === active ? "bg-primary-soft" : "bg-transparent"
                }`}
              >
                <ToolIcon name={tool.icon} className="size-4 text-primary" />
                <span className="text-sm font-medium">{tool.name}</span>
                <span className="ml-auto truncate text-xs text-muted-foreground">
                  {tool.status === "pending" ? "En construcción" : tool.tagline}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Populares:</span>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setQuery(suggestion);
              setFocused(true);
              inputRef.current?.focus();
            }}
            className="transition-standard rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary-dark"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
