/**
 * Sitemap generator for BreadPDF.
 *
 * Importable from the server worker (src/server.ts) — no React/DOM deps.
 *
 * Includes:
 *  - Homepage × 3 locales
 *  - Institutional/legal pages × 3 locales
 *  - Live tool pages × 3 locales
 *  - Guides hub × 3 locales
 *
 * Excludes:
 *  - Pending/draft tools (no crawlable content)
 *  - Redirecting catalog/category routes and transacting pages
 *  - Any URL with parameters or duplicate paths
 *
 * Domain: VITE_SITE_URL env var (defaults to https://breadpdf.com)
 */

import { LOCALES, SEGMENTS, type Locale } from "./i18n/config";
import { TOOLS } from "./tools/registry";
import { toolSlugFor } from "./tools/localize";
import { GUIDES, guideSlugFor } from "./guides/registry";
import { SITE_URL } from "./brand";

interface UrlEntry {
  loc: string;
  priority: string;
  changefreq: string;
  alternates: { lang: string; href: string }[];
}

function buildToolPath(locale: Locale, canonicalSlug: string): string {
  return `/${locale}/${SEGMENTS[locale].tools}/${toolSlugFor(locale, canonicalSlug)}`;
}

function buildGuidePath(locale: Locale, canonicalSlug: string): string {
  return `/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, canonicalSlug)}`;
}

export function generateSitemap(): string {
  const entries: UrlEntry[] = [];

  for (const locale of LOCALES) {
    // 1. Homepage
    entries.push({
      loc: `${SITE_URL}/${locale}`,
      priority: "1.0",
      changefreq: "weekly",
      alternates: [
        ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}/${l}` })),
        { lang: "x-default", href: `${SITE_URL}/es` },
      ],
    });

    // 2. Institutional & Legal pages (About, Privacy, Cookies, Terms)
    entries.push({
      loc: `${SITE_URL}/${locale}/${SEGMENTS[locale].about}`,
      priority: "0.7",
      changefreq: "monthly",
      alternates: [
        ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}/${l}/${SEGMENTS[l].about}` })),
        { lang: "x-default", href: `${SITE_URL}/es/${SEGMENTS.es.about}` },
      ],
    });
    entries.push({
      loc: `${SITE_URL}/${locale}/${SEGMENTS[locale].privacy}`,
      priority: "0.4",
      changefreq: "monthly",
      alternates: [
        ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}/${l}/${SEGMENTS[l].privacy}` })),
        { lang: "x-default", href: `${SITE_URL}/es/${SEGMENTS.es.privacy}` },
      ],
    });
    entries.push({
      loc: `${SITE_URL}/${locale}/${SEGMENTS[locale].cookies}`,
      priority: "0.4",
      changefreq: "monthly",
      alternates: [
        ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}/${l}/${SEGMENTS[l].cookies}` })),
        { lang: "x-default", href: `${SITE_URL}/es/${SEGMENTS.es.cookies}` },
      ],
    });
    entries.push({
      loc: `${SITE_URL}/${locale}/${SEGMENTS[locale].terms}`,
      priority: "0.4",
      changefreq: "monthly",
      alternates: [
        ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}/${l}/${SEGMENTS[l].terms}` })),
        { lang: "x-default", href: `${SITE_URL}/es/${SEGMENTS.es.terms}` },
      ],
    });

    // 2.1 Guides hub — indexable landing page, distinct from the redirecting catalog route.
    entries.push({
      loc: `${SITE_URL}/${locale}/${SEGMENTS[locale].guides}`,
      priority: "0.7",
      changefreq: "weekly",
      alternates: [
        ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}/${l}/${SEGMENTS[l].guides}` })),
        { lang: "x-default", href: `${SITE_URL}/es/${SEGMENTS.es.guides}` },
      ],
    });

    // 3. Live tool pages (51 herramientas)
    for (const tool of TOOLS.filter((t) => t.status === "live")) {
      entries.push({
        loc: `${SITE_URL}${buildToolPath(locale, tool.slug)}`,
        priority: "0.8",
        changefreq: "monthly",
        alternates: [
          ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}${buildToolPath(l, tool.slug)}` })),
          { lang: "x-default", href: `${SITE_URL}${buildToolPath("es", tool.slug)}` },
        ],
      });
    }

    // 5. Guides (10 guías editoriales)
    for (const guide of GUIDES) {
      entries.push({
        loc: `${SITE_URL}${buildGuidePath(locale, guide.canonicalSlug)}`,
        priority: "0.8",
        changefreq: "monthly",
        alternates: [
          ...LOCALES.map((l) => ({ lang: l, href: `${SITE_URL}${buildGuidePath(l, guide.canonicalSlug)}` })),
          { lang: "x-default", href: `${SITE_URL}${buildGuidePath("es", guide.canonicalSlug)}` },
        ],
      });
    }
  }

  const urlElements = entries
    .map((e) => {
      const altLinks = e.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`,
        )
        .join("\n");
      return `  <url>\n    <loc>${e.loc}</loc>\n${altLinks}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    urlElements,
    `</urlset>`,
  ].join("\n");
}
