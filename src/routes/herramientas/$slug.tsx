import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { ToolCard } from "@/components/site/ToolCard";
import { ToolIcon } from "@/components/site/ToolIcon";
import { CATEGORIES, getTool, relatedTools } from "@/lib/tools/registry";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";

export const Route = createFileRoute("/herramientas/$slug")({
  loader: ({ params }) => {
    if (!getTool(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) return {};
    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: `${tool.name} · ARVIO`,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                description: tool.seoDescription,
                offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
              },
              {
                "@type": "FAQPage",
                mainEntity: tool.faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { slug } = Route.useLoaderData();
  const tool = getTool(slug)!;
  const category = CATEGORIES[tool.category];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link to="/categoria/$slug" params={{ slug: category.slug }} className="hover:text-foreground">
          {category.name}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <header className="mt-6 flex items-start gap-4">
        <span
          className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${FAMILY_ACCENTS[tool.category].iconBg} ${FAMILY_ACCENTS[tool.category].icon}`}
        >
          <ToolIcon name={tool.icon} className="size-6" />
        </span>
        <div>
          <h1 className="text-display text-3xl sm:text-4xl">{tool.h1}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {tool.tagline}
          </p>
        </div>
      </header>

      <div className="mt-8">
        <ToolWorkspace tool={tool} />
      </div>

      <section className="mt-14" aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-2xl">
          Cómo funciona
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {tool.howItWorks.map((step, index) => (
            <li key={step} className="surface-card p-5">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-navy text-xs font-semibold text-navy-foreground">
                {index + 1}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="faq">
        <h2 id="faq" className="text-2xl">
          Preguntas frecuentes
        </h2>
        <dl className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {tool.faq.map((item) => (
            <div key={item.q} className="p-5">
              <dt className="text-base font-semibold">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="relacionadas">
        <h2 id="relacionadas" className="text-2xl">
          Herramientas relacionadas
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {relatedTools(tool).map((related) => (
            <ToolCard key={related.slug} tool={related} />
          ))}
        </div>
      </section>
    </div>
  );
}
