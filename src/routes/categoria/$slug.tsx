import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ToolCard } from "@/components/site/ToolCard";
import { RoadmapCard } from "@/components/site/RoadmapCard";
import { CATEGORIES, toolsByCategory, TOOLS } from "@/lib/tools/registry";
import { FAMILY_ACCENTS, roadmapByCategory } from "@/lib/tools/catalog";
import type { ToolCategory } from "@/lib/tools/types";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES[params.slug as ToolCategory];
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Categoría";
    const description = loaderData?.category.description ?? "Herramientas PDF de ARVIO.";
    return {
      meta: [
        { title: `${name} PDF · herramientas de ARVIO` },
        { name: "description", content: `${description} Herramientas gratuitas de ARVIO.` },
        { property: "og:title", content: `${name} PDF · herramientas de ARVIO` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

const GRID = "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const tools = toolsByCategory(category.slug);
  const soon = roadmapByCategory(category.slug);
  const accent = FAMILY_ACCENTS[category.slug];
  const others = Object.values(CATEGORIES).filter((item) => item.slug !== category.slug);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-9">
      <section className="animate-rise rounded-2xl border border-border bg-surface px-6 py-7 shadow-subtle sm:px-9">
        <span
          className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${accent.text}`}
        >
          <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden />
          {category.name}
        </span>
        <h1 className="text-display mt-2 max-w-3xl text-3xl sm:text-4xl">{category.name} PDF</h1>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </section>

      <div className={`mt-7 ${GRID}`}>
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
        {soon.map((tool, index) => (
          <RoadmapCard key={tool.name} tool={tool} index={tools.length + index} />
        ))}
      </div>

      <section className="mt-10 border-t border-border/70 pt-7" aria-labelledby="otras-categorias">
        <h2 id="otras-categorias" className="text-lg">
          Otras categorías
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((item) => {
            const itemAccent = FAMILY_ACCENTS[item.slug];
            const count =
              TOOLS.filter((tool) => tool.category === item.slug).length +
              roadmapByCategory(item.slug).length;
            return (
              <Link
                key={item.slug}
                to="/categoria/$slug"
                params={{ slug: item.slug }}
                className="transition-standard group surface-card p-4 hover:-translate-y-0.5 hover:shadow-raised"
              >
                <span
                  className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${itemAccent.text}`}
                >
                  <span className={`size-1.5 rounded-full ${itemAccent.dot}`} aria-hidden />
                  {item.name}
                </span>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {count} herramientas
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
