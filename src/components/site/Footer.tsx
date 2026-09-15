import { Link } from "@tanstack/react-router";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/lib/tools/registry";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-9">
        <div className="grid gap-7 md:grid-cols-[1.1fr_repeat(4,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-navy-foreground/65">
              Herramientas para trabajar con documentos PDF, procesadas en tu propio dispositivo
              siempre que es técnicamente posible.
            </p>
          </div>

          {Object.values(CATEGORIES)
            .filter((category) => toolsByCategory(category.slug).length > 0)
            .map((category) => (
              <div key={category.slug}>
                <h2 className="text-[13px] font-semibold text-navy-foreground">
                  <Link to="/categoria/$slug" params={{ slug: category.slug }}>
                    {category.name}
                  </Link>
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {toolsByCategory(category.slug).map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        to="/herramientas/$slug"
                        params={{ slug: tool.slug }}
                        className="transition-standard text-[13px] text-navy-foreground/65 hover:text-navy-foreground"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-navy-foreground/10 pt-5 text-[13px] text-navy-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ARVIO · {TOOLS.length} herramientas y creciendo
          </p>
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
