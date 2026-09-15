import { Link } from "@tanstack/react-router";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/lib/tools/registry";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
              Herramientas para trabajar con documentos PDF. Rápidas, claras y procesadas en tu
              propio dispositivo siempre que es técnicamente posible.
            </p>
          </div>

          {Object.values(CATEGORIES).map((category) => (
            <div key={category.slug}>
              <h2 className="text-sm font-semibold text-navy-foreground">{category.name}</h2>
              <ul className="mt-3 space-y-2">
                {toolsByCategory(category.slug).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      to="/herramientas/$slug"
                      params={{ slug: tool.slug }}
                      className="transition-standard text-sm text-navy-foreground/70 hover:text-navy-foreground"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy-foreground/10 pt-6 text-sm text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ARVIO · {TOOLS.length} herramientas y creciendo</p>
          <div className="flex gap-5">
            <Link to="/herramientas" className="hover:text-navy-foreground">
              Herramientas
            </Link>
            <Link to="/privacidad" className="hover:text-navy-foreground">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
