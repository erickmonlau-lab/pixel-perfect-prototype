import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy unscoped Spanish URL. */
export const Route = createFileRoute("/herramientas/")({
  beforeLoad: () => {
    throw redirect({ href: "/es/herramientas", statusCode: 301 });
  },
});
