import { createFileRoute, notFound, Outlet, useRouterState } from "@tanstack/react-router";
import { isLocale } from "@/lib/i18n/config";
import { use } from "react";
import { loadLocaleText, localeTextPending } from "@/lib/tools/localize";
import { LocaleProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/lib/auth/auth-context";
import { parsePath } from "@/lib/i18n/routing";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/$lang")({
  beforeLoad: async ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
    await loadLocaleText(params.lang);
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { lang } = Route.useParams();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (!isLocale(lang)) return null;
  // Client hydration does not rerun beforeLoad: wait for this locale's copy so markup matches SSR.
  const loading = localeTextPending(lang);
  if (loading) use(loading);

  const { page } = parsePath(pathname);
  const isAuthPage = page.kind === "login" || page.kind === "register" || page.kind === "forgotPassword";

  return (
    <LocaleProvider locale={lang}>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
          <Header />
          <main className="flex-1 flex flex-col">
            <Outlet />
          </main>
          {!isAuthPage && <Footer />}
        </div>
      </AuthProvider>
    </LocaleProvider>
  );
}
