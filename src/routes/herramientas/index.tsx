import { createFileRoute } from "@tanstack/react-router";
import { ToolCard } from "@/components/site/ToolCard";
import { ToolSearch } from "@/components/site/ToolSearch";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/lib/tools/registry";

export const Route = createFileRoute("/herramientas/")({
  head: () => ({
    meta: [
      { title: "Herramientas PDF gratuitas | ARVIO" },
      {
        name: "description",
        content:
          "Todas las herramientas PDF de ARVIO: comprimir, unir, dividir, rotar, extraer y eliminar páginas, PDF a JPG, JPG a PDF y extracción de texto.",
      },
      { property: "og:title", content: "Herramientas PDF gratuitas | ARVIO" },
      {
        property: "og:description",
        content: "Comprimir, unir, dividir, rotar y convertir PDF desde el navegador.",
      },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-eyebrow">Catálogo</p>
      <h1 className="text-display mt-3 text-3xl sm:text-4xl">Herramientas de ARVIO</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {TOOLS.filter((tool) => tool.status === "live").length} herramientas funcionando hoy y más en
        camino. Cada una resuelve una tarea concreta en el menor número de pasos posible.
      </p>

      <div className="mt-8 max-w-xl">
        <ToolSearch />
      </div>

      {Object.values(CATEGORIES).map((category) => (
        <section key={category.slug} className="mt-14" aria-labelledby={`cat-${category.slug}`}>
          <h2 id={`cat-${category.slug}`} className="text-xl sm:text-2xl">
            {category.name}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{category.description}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolsByCategory(category.slug).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
