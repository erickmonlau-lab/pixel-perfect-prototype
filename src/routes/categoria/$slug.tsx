import { createFileRoute, notFound } from "@tanstack/react-router";
import { ToolCard } from "@/components/site/ToolCard";
import { CATEGORIES, toolsByCategory } from "@/lib/tools/registry";
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
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const tools = toolsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-eyebrow">Categoría</p>
      <h1 className="text-display mt-3 text-3xl sm:text-4xl">{category.name} PDF</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {category.description}
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
