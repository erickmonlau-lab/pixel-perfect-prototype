import { createFileRoute } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { ToolSearch } from "@/components/site/ToolSearch";
import { TOOLS } from "@/lib/tools/registry";
import { ROADMAP_TOOLS } from "@/lib/tools/catalog";

export const Route = createFileRoute("/herramientas/")({
  head: () => ({
    meta: [
      { title: "Todas las herramientas PDF que necesitas | ARVIO" },
      {
        name: "description",
        content:
          "Catálogo completo de ARVIO: comprimir, unir, dividir, rotar, extraer y eliminar páginas, PDF a JPG, JPG a PDF y extracción de texto, con más herramientas en camino.",
      },
      { property: "og:title", content: "Todas las herramientas PDF que necesitas | ARVIO" },
      {
        property: "og:description",
        content: "Trabaja, convierte, organiza y optimiza tus documentos directamente desde ARVIO.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  const live = TOOLS.filter((tool) => tool.status === "live").length;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-9">
      <section className="animate-rise rounded-2xl border border-border bg-surface px-6 py-8 shadow-subtle sm:px-10 sm:py-10">
        <p className="text-eyebrow">Herramientas</p>
        <h1 className="text-display mt-2.5 max-w-3xl text-3xl sm:text-4xl lg:text-[2.85rem]">
          Todas las herramientas PDF que necesitas.
        </h1>
        <p className="mt-3.5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
          Trabaja, convierte, organiza y optimiza tus documentos directamente desde ARVIO.{" "}
          {live} herramientas funcionan hoy en tu propio dispositivo y {ROADMAP_TOOLS.length} más
          están en camino.
        </p>
        <div className="mt-7 max-w-2xl">
          <ToolSearch size="lg" />
        </div>
      </section>

      <div className="mt-8">
        <CatalogBrowser />
      </div>
    </div>
  );
}
