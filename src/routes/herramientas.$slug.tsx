import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy unscoped Spanish tool URL. */
export const Route = createFileRoute("/herramientas/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/es/herramientas/${params.slug}`, statusCode: 301 });
  },
});
