import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { GuidesHubPage } from "@/components/site/GuidesHubPage";
import { ToolSearch } from "@/components/site/ToolSearch";
import { PremiumPage } from "@/components/premium/PremiumPage";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { AccountDashboard } from "@/components/account/AccountDashboard";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DEFAULT_LOCALE, isLocale, sectionKind } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { alternateLinks } from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { liveCount, soonCount } from "@/lib/tools/localize";

/** `/$lang/$section` resolves to either catalogue, privacy, premium, auth or account page. */
export const Route = createFileRoute("/$lang/$section/")({
  loader: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
    const kind = sectionKind(params.lang, params.section);
    if (!kind) throw notFound();
    return { kind };
  },
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const t = UI[locale];
    const kind = sectionKind(locale, params.section);

    if (kind === "login" || kind === "register" || kind === "forgotPassword") {
      const titles = {
        es: kind === "register" ? "Crear cuenta · BreadPDF" : kind === "forgotPassword" ? "Recuperar contraseña · BreadPDF" : "Iniciar sesión · BreadPDF",
        ca: kind === "register" ? "Crear compte · BreadPDF" : kind === "forgotPassword" ? "Recuperar contrasenya · BreadPDF" : "Iniciar sessió · BreadPDF",
        en: kind === "register" ? "Create Account · BreadPDF" : kind === "forgotPassword" ? "Reset Password · BreadPDF" : "Log In · BreadPDF",
      };
      const title = titles[locale] || titles.es;
      return {
        meta: [
          { title },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }

    if (kind === "account") {
      const titles = {
        es: "Mi cuenta · BreadPDF",
        ca: "El meu compte · BreadPDF",
        en: "My Account · BreadPDF",
      };
      const title = titles[locale] || titles.es;
      return {
        meta: [
          { title },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }

    if (kind === "premium") {
      const titles = {
        es: "BreadPDF Premium · Más velocidad y funciones avanzadas sin anuncios",
        ca: "BreadPDF Premium · Més velocitat i funcions avançades sense anuncis",
        en: "BreadPDF Premium · Higher speed and advanced tools ad-free",
      };
      const descs = {
        es: "Trabaja más rápido con una suite PDF profesional: sin publicidad, procesamiento por lotes, IA avanzada y máxima privacidad.",
        ca: "Treballa més ràpid amb una suite PDF professional: sense publicitat, processament per lots, IA avançada i màxima privadesa.",
        en: "Work faster with a professional PDF suite: ad-free, batch multi-processing, advanced AI and total local privacy.",
      };
      const title = titles[locale] || titles.es;
      const description = descs[locale] || descs.es;
      return {
        meta: [
          { title },
          { name: "description", content: description },
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "premium" }),
      };
    }
    if (kind === "cookies") {
      return {
        meta: [
          { title: t.cookies.seoTitle },
          { name: "description", content: t.cookies.seoDescription },
          { property: "og:title", content: t.cookies.seoTitle },
          { property: "og:description", content: t.cookies.seoDescription },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "cookies" }),
      };
    }
    if (kind === "terms") {
      return {
        meta: [
          { title: t.terms.seoTitle },
          { name: "description", content: t.terms.seoDescription },
          { property: "og:title", content: t.terms.seoTitle },
          { property: "og:description", content: t.terms.seoDescription },
          { property: "og:type", content: "article" },
        ],
        links: alternateLinks(locale, { kind: "terms" }),
      };
    }
    if (kind === "privacy") {
      return {
        meta: [
          { title: t.privacy.seoTitle },
          { name: "description", content: t.privacy.seoDescription },
          { property: "og:title", content: t.privacy.seoTitle },
          { property: "og:description", content: t.privacy.seoDescription },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "privacy" }),
      };
    }
    if (kind === "guides") {
      const titles = {
        es: "Guías & Tutoriales de Edición y Optimización PDF | BreadPDF",
        ca: "Guies & Tutorials d'Edició i Optimització PDF | BreadPDF",
        en: "PDF Editing & Optimization Guides & Tutorials | BreadPDF",
      };
      const descs = {
        es: "Manuales exhaustivos y mejores prácticas para comprimir, unir, organizar, convertir y proteger documentos PDF con total privacidad.",
        ca: "Manuals exhaustius i millors pràctiques per comprimir, unir, organitzar, convertir i protegir documents PDF amb privadesa total.",
        en: "In-depth guides and best practices to compress, merge, organize, convert, and protect PDF documents with complete local privacy.",
      };
      const title = titles[locale] || titles.es;
      const description = descs[locale] || descs.es;
      return {
        meta: [
          { title },
          { name: "description", content: description },
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "guidesHub" }),
      };
    }
    return {
      meta: [
        { title: t.meta.catalogTitle },
        { name: "description", content: t.meta.catalogDescription },
        { property: "og:title", content: t.meta.catalogTitle },
        { property: "og:description", content: t.meta.catalogDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternateLinks(locale, { kind: "catalog" }),
    };
  },
  component: SectionPage,
});

function SectionPage() {
  const { kind } = Route.useLoaderData();
  if (kind === "login") return <AuthSplitLayout initialMode="login" />;
  if (kind === "register") return <AuthSplitLayout initialMode="register" />;
  if (kind === "forgotPassword") return <AuthSplitLayout initialMode="forgotPassword" />;
  if (kind === "account") return <AccountDashboard />;
  if (kind === "premium") return <PremiumPage />;
  if (kind === "cookies") return <CookiesPage />;
  if (kind === "terms") return <TermsPage />;
  if (kind === "guides") return <GuidesHubPage />;
  return kind === "privacy" ? <PrivacyPage /> : <CatalogPage />;
}

function CatalogPage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-8 sm:pt-10">
      <Breadcrumb items={[{ label: t.nav.tools }]} />

      <section className="animate-rise rounded-3xl border border-border bg-surface px-6 py-10 shadow-subtle sm:px-12 sm:py-12">
        <p className="text-eyebrow">{t.catalog.eyebrow}</p>
        <h1 className="text-display mt-3 max-w-3xl text-[2.4rem] sm:text-5xl">{t.catalog.h1}</h1>
        <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-muted-foreground">
          {t.catalog.sub} {t.catalog.intro(liveCount(), soonCount())}
        </p>
        <div className="mt-8 max-w-2xl">
          <ToolSearch size="lg" />
        </div>
      </section>

      <div className="mt-10">
        <CatalogBrowser />
      </div>
    </div>
  );
}

function PrivacyPage() {
  const { t } = useLocale();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumb items={[{ label: t.nav.privacy }]} />

      <p className="text-eyebrow">{t.privacy.eyebrow}</p>
      <h1 className="text-display mt-3 text-4xl sm:text-[2.9rem]">{t.privacy.title}</h1>
      {t.privacy.body.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {t.privacy.sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}
    </article>
  );
}

function CookiesPage() {
  const { t } = useLocale();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumb items={[{ label: t.cookies.title }]} />

      <p className="text-eyebrow">{t.cookies.eyebrow}</p>
      <h1 className="text-display mt-3 text-4xl sm:text-[2.9rem]">{t.cookies.title}</h1>
      {t.cookies.body.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {t.cookies.sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}
    </article>
  );
}

function TermsPage() {
  const { t } = useLocale();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumb items={[{ label: t.terms.title }]} />

      <p className="text-eyebrow">{t.terms.eyebrow}</p>
      <h1 className="text-display mt-3 text-4xl sm:text-[2.9rem]">{t.terms.title}</h1>
      {t.terms.body.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {t.terms.sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
