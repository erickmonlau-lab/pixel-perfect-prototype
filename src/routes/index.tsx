import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

/** Root sends visitors to the default language; the locale layout refines it client-side. */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: `/${DEFAULT_LOCALE}`, statusCode: 301 });
  },
});
