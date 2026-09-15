import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy unscoped Spanish privacy URL. */
export const Route = createFileRoute("/privacidad")({
  beforeLoad: () => {
    throw redirect({ href: "/es/privacidad", statusCode: 301 });
  },
});
