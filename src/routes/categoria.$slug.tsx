import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy unscoped Spanish category URL. */
export const Route = createFileRoute("/categoria/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/es/categoria/${params.slug}`, statusCode: 301 });
  },
});
