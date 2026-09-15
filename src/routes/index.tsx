import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Lock, Layers } from "lucide-react";
import { ToolSearch } from "@/components/site/ToolSearch";
import { ToolCard } from "@/components/site/ToolCard";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/lib/tools/registry";

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

function Home() {
  const popular = ["comprimir-pdf", "unir-pdf", "dividir-pdf", "pdf-a-jpg", "jpg-a-pdf", "rotar-pdf"]
    .map((slug) => TOOLS.find((tool) => tool.slug === slug))
    .filter((tool): tool is (typeof TOOLS)[number] => Boolean(tool));

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-eyebrow">Herramientas de documentos</p>
            <h1 className="text-display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Todas tus herramientas PDF. En un solo lugar.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Comprime, convierte, une, divide y edita tus PDF online. Rápido, sencillo y sin
              complicaciones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/herramientas">
                  Ver herramientas
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/herramientas/$slug" params={{ slug: "comprimir-pdf" }}>
                  Comprimir PDF
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 max-w-2xl">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              ¿Qué quieres hacer con tu PDF?
            </h2>
            <ToolSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl">Herramientas más usadas</h2>
            <p className="mt-2 text-muted-foreground">
              Empieza por la tarea; no hay pasos intermedios.
            </p>
          </div>
          <Link
            to="/herramientas"
            className="transition-standard text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Ver las {TOOLS.length} herramientas →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl sm:text-3xl">Explora por categoría</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Object.values(CATEGORIES).map((category) => (
            <Link
              key={category.slug}
              to="/categoria/$slug"
              params={{ slug: category.slug }}
              className="transition-standard surface-card p-6 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-raised"
            >
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                {toolsByCategory(category.slug).length} herramientas →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
