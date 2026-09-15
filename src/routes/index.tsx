import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Lock, Layers } from "lucide-react";
import { ToolSearch } from "@/components/site/ToolSearch";
import { ToolCard } from "@/components/site/ToolCard";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TOOLS } from "@/lib/tools/registry";
import { FAMILY_ACCENTS, POPULAR_SLUGS, ROADMAP_TOOLS, roadmapByCategory } from "@/lib/tools/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARVIO · Todas tus herramientas PDF en un solo lugar" },
      {
        name: "description",
        content:
          "Comprime, une, divide, gira y convierte tus PDF en segundos. Herramientas gratuitas que procesan los archivos en tu navegador, sin registro.",
      },
      { property: "og:title", content: "ARVIO · Todas tus herramientas PDF en un solo lugar" },
      {
        property: "og:description",
        content:
          "Comprime, une, divide, gira y convierte tus PDF en segundos, directamente en tu navegador.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const HIGHLIGHTS = [
  {
    icon: Gauge,
    title: "Resultados en segundos",
    body: "Sin colas ni esperas: el procesamiento arranca en cuanto sueltas el archivo.",
  },
  {
    icon: Lock,
    title: "Tus archivos no se suben",
    body: "Las herramientas de esta primera fase trabajan íntegramente en tu dispositivo.",
  },
  {
    icon: Layers,
    title: "Una herramienta, una tarea",
    body: "Cada página resuelve una intención concreta, con las opciones justas.",
  },
];

const GRID = "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

function Home() {
  const popular = POPULAR_SLUGS.map((slug) => TOOLS.find((tool) => tool.slug === slug)).filter(
    (tool): tool is (typeof TOOLS)[number] => Boolean(tool),
  );
  const live = TOOLS.filter((tool) => tool.status === "live").length;

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-rise">
              <p className="text-eyebrow">Plataforma documental</p>
              <h1 className="text-display mt-3 text-4xl sm:text-5xl">
                Todas tus herramientas PDF. En un solo lugar.
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                Comprime, convierte, une, divide y edita tus PDF online. Rápido, sencillo y sin
                complicaciones.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/herramientas">
                    Ver las {TOOLS.length} herramientas
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/herramientas/$slug" params={{ slug: "comprimir-pdf" }}>
                    Comprimir PDF
                  </Link>
                </Button>
              </div>
              <div className="mt-8 max-w-xl">
                <ToolSearch size="lg" />
              </div>
            </div>

            <div className="animate-rise grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {popular.slice(0, 6).map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl">Herramientas más usadas</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {live} herramientas listas para usar y {ROADMAP_TOOLS.length} más en el roadmap.
            </p>
          </div>
          <Link
            to="/herramientas"
            className="transition-standard text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Ver el catálogo completo →
          </Link>
        </div>
        <div className={`mt-6 ${GRID}`}>
          {popular.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-3.5 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12">
        <h2 className="text-2xl">Explora por categoría</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Object.values(CATEGORIES).map((category) => {
            const accent = FAMILY_ACCENTS[category.slug];
            const count =
              TOOLS.filter((tool) => tool.category === category.slug).length +
              roadmapByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                to="/categoria/$slug"
                params={{ slug: category.slug }}
                className="transition-standard surface-card flex flex-col p-4 hover:-translate-y-0.5 hover:shadow-raised"
              >
                <span
                  className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${accent.text}`}
                >
                  <span className={`size-1.5 rounded-full ${accent.dot}`} aria-hidden />
                  {category.name}
                </span>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <p className="mt-3 text-[12px] font-semibold text-primary">{count} herramientas →</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
