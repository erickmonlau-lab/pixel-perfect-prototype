import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLocale } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { lang } = Route.useParams();
  if (!isLocale(lang)) return null;

  return (
    <LocaleProvider locale={lang}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
