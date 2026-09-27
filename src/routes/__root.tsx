import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { DEFAULT_LOCALE, HTML_LANG } from "@/lib/i18n/config";
import { parsePath } from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { OFFICIAL_CONTACT_EMAIL, SITE_URL } from "@/lib/brand";

function NotFoundComponent() {
  const t = UI[DEFAULT_LOCALE];
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-6xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.notFound.title}</h2>
        <p className="mt-2 text-[15px] text-muted-foreground">{t.notFound.body}</p>
        <div className="mt-6">
          <a
            href="/es/herramientas"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {t.notFound.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const t = UI[DEFAULT_LOCALE];
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t.error.title}</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">{t.error.body}</p>
        {import.meta.env.DEV && error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-left text-xs font-mono text-red-800 max-h-48 overflow-auto">
            <p className="font-bold">{error.name}: {error.message}</p>
            {error.stack && <pre className="mt-1 text-[10px] whitespace-pre-wrap">{error.stack}</pre>}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {t.error.retry}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-5 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t.error.home}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "BreadPDF",
          url: SITE_URL,
          logo: `${SITE_URL}/brand/breadpdf-logo.png`,
          email: OFFICIAL_CONTACT_EMAIL,
          contactPoint: {
            "@type": "ContactPoint",
            email: OFFICIAL_CONTACT_EMAIL,
            contactType: "customer support",
            availableLanguage: ["es", "ca", "en"],
          },
          description:
            "Plataforma de herramientas PDF online. Comprime, une, divide, convierte y edita documentos PDF directamente en el navegador.",
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "BreadPDF",
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: ["es", "ca", "en"],
        },
      ],
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "BreadPDF" },
        { name: "theme-color", content: "#592316" },
        { name: "google-adsense-account", content: "ca-pub-7477829897419785" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/plus-jakarta-sans-latin-700.woff2",
          crossOrigin: "anonymous",
        },
        { rel: "icon", href: "/favicon.ico?v=3", sizes: "48x48 32x32 16x16" },
        { rel: "icon", href: "/favicon.svg?v=3", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
        { rel: "icon", href: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=3", sizes: "180x180" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationSchema),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { locale } = parsePath(pathname);

  return (
    <html lang={HTML_LANG[locale]}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
