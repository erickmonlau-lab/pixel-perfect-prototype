import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MAIN_CATEGORIES } from "@/lib/tools/registry";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const NAV = MAIN_CATEGORIES.map((slug) => CATEGORIES[slug]);
const ALL = Object.values(CATEGORIES);

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5">
        <Link to="/" className="transition-standard shrink-0 hover:opacity-80" aria-label="ARVIO, inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Categorías de herramientas">
          <Link
            to="/herramientas"
            className="transition-standard rounded-md px-3 py-2 text-sm font-semibold text-foreground/85 hover:bg-primary-soft hover:text-primary-dark"
            activeProps={{ className: "bg-primary-soft text-primary-dark" }}
          >
            Herramientas
          </Link>
          {NAV.map((category) => {
            const accent = FAMILY_ACCENTS[category.slug];
            return (
              <Link
                key={category.slug}
                to="/categoria/$slug"
                params={{ slug: category.slug }}
                className="transition-standard group inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                <span className={`size-1.5 rounded-full ${accent.dot}`} aria-hidden />
                {category.name}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link
            to="/privacidad"
            className="transition-standard rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Privacidad
          </Link>
          <Button asChild size="sm">
            <Link to="/herramientas/$slug" params={{ slug: "comprimir-pdf" }}>
              Comprimir un PDF
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="transition-standard ml-auto inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-fade border-t border-border bg-surface px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Menú principal">
            <Link
              to="/herramientas"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-semibold"
            >
              Todas las herramientas
            </Link>
            {ALL.map((category) => {
              const accent = FAMILY_ACCENTS[category.slug];
              return (
                <Link
                  key={category.slug}
                  to="/categoria/$slug"
                  params={{ slug: category.slug }}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium"
                >
                  <span className={`size-1.5 rounded-full ${accent.dot}`} aria-hidden />
                  {category.name}
                </Link>
              );
            })}
            <Link
              to="/privacidad"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
            >
              Privacidad
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
