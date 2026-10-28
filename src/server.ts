import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  serverRegister,
  serverLogin,
  serverGetCurrentUser,
  serverLogout,
  serverUpdateProfile,
  serverUpdatePassword,
  createSessionCookieHeader,
  createClearSessionCookieHeader,
} from "./lib/auth/server-auth";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Every modulepreload the router emits is fetched at High priority, in the same
// bandwidth bucket as the render-critical fonts. On Slow 4G that pushes the LCP
// text font behind ~350 KB of JavaScript, so we drop the hints and let the
// module graph load after the first paint instead.
function removeModulepreloads(html: string): string {
  return html.replace(/<link\s+[^>]*rel="modulepreload"[^>]*\/?>/gi, "");
}

// The app is fully server-rendered, so the client bundle is only needed to
// hydrate. Loading it one task after the first paint keeps the pre-paint
// network and main thread free for HTML, CSS and the hero font. A timer keeps
// hydration working in background tabs, where requestAnimationFrame is paused.
function deferHydration(html: string): string {
  return html.replace(
    /<script\s+type="module"[^>]*\ssrc="(\/assets\/index-[^"]+\.js)"[^>]*><\/script>/i,
    (_match, src: string) =>
      `<script>(function(){var src=${JSON.stringify(src)},done=false;function load(){if(done)return;done=true;var s=document.createElement("script");s.type="module";s.src=src;document.head.appendChild(s);}requestAnimationFrame(function(){setTimeout(load,0);});setTimeout(load,3000);})();</script>`,
  );
}

// The SSR HTML is byte-for-byte the same for every visitor (auth lives behind
// /api/auth and is resolved on the client), so the edge can hold it briefly.
// Without s-maxage Vercel answers every request with X-Vercel-Cache: MISS and
// re-runs the function (~220 ms TTFB from Europe, more on a cold start); that
// latency is what made the PSI mobile runs swing between 63 and 93.
// stale-while-revalidate serves the cached copy while revalidating in the
// background, so a deploy is visible within a minute without hurting TTFB.
const HTML_CACHE_CONTROL = "public, max-age=0, s-maxage=60, stale-while-revalidate=300";

async function optimizeSsrResponse(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const html = await response.text();
  const optimizedHtml = deferHydration(removeModulepreloads(html));
  const headers = new Headers(response.headers);
  if (response.status === 200) headers.set("Cache-Control", HTML_CACHE_CONTROL);
  return new Response(optimizedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonResponse(data: unknown, status = 200, headersInit?: HeadersInit): Response {
  const headers = new Headers(headersInit);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const { pathname } = url;
    const isSecure = url.protocol === "https:";

    // 1. API: Servidor de Autenticación BreadPDF
    if (pathname.startsWith("/api/auth/")) {
      const cookieHeader = request.headers.get("cookie");

      // GET /api/auth/me (Consultar sesión actual del usuario mediante Cookie HttpOnly)
      if (pathname === "/api/auth/me" && request.method === "GET") {
        try {
          const user = await serverGetCurrentUser(cookieHeader);
          return jsonResponse({ user, isAuthenticated: !!user });
        } catch (err: any) {
          return jsonResponse({ user: null, isAuthenticated: false, error: err.message }, 500);
        }
      }

      // POST /api/auth/register (Registro explícito en servidor con hashing PBKDF2)
      if (pathname === "/api/auth/register" && request.method === "POST") {
        try {
          const payload = await request.json();
          const { user, session } = await serverRegister(payload);
          const cookie = await createSessionCookieHeader(session.id, isSecure);

          return jsonResponse(
            { success: true, user },
            201,
            { "Set-Cookie": cookie }
          );
        } catch (err: any) {
          return jsonResponse({ success: false, error: err.message || "Error en el registro" }, 400);
        }
      }

      // POST /api/auth/login (Validación estricta de credenciales sin auto-registro)
      if (pathname === "/api/auth/login" && request.method === "POST") {
        try {
          const payload = await request.json();
          const { user, session } = await serverLogin(payload);
          const cookie = await createSessionCookieHeader(session.id, isSecure);

          return jsonResponse(
            { success: true, user },
            200,
            { "Set-Cookie": cookie }
          );
        } catch (err: any) {
          return jsonResponse({ success: false, error: err.message || "Error al iniciar sesión" }, 401);
        }
      }

      // POST /api/auth/logout (Invalidación de sesión y limpieza de Cookie HttpOnly)
      if (pathname === "/api/auth/logout" && request.method === "POST") {
        try {
          await serverLogout(cookieHeader);
          const clearCookie = createClearSessionCookieHeader();
          return jsonResponse({ success: true }, 200, { "Set-Cookie": clearCookie });
        } catch (err: any) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // POST /api/auth/profile (Actualización persistente de perfil en servidor)
      if (pathname === "/api/auth/profile" && request.method === "POST") {
        try {
          const updates = await request.json();
          const updatedUser = await serverUpdateProfile(cookieHeader, updates);
          return jsonResponse({ success: true, user: updatedUser }, 200);
        } catch (err: any) {
          return jsonResponse({ success: false, error: err.message || "Error al actualizar perfil" }, 400);
        }
      }

      // POST /api/auth/password (Cambio directo de contraseña autenticado)
      if (pathname === "/api/auth/password" && request.method === "POST") {
        try {
          const { currentPassword, newPassword } = await request.json();
          await serverUpdatePassword(cookieHeader, currentPassword, newPassword);
          return jsonResponse({ success: true, message: "Contraseña actualizada correctamente" }, 200);
        } catch (err: any) {
          return jsonResponse({ success: false, error: err.message || "Error al actualizar contraseña" }, 400);
        }
      }

      return jsonResponse({ error: "Endpoint no encontrado" }, 404);
    }

    // 2. Sitemap directo — before TanStack's SSR handler
    if (pathname === "/sitemap.xml") {
      try {
        const { generateSitemap } = await import("./lib/sitemap");
        return new Response(generateSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      } catch (err) {
        console.error("Error generating sitemap:", err);
      }
    }

    // 3. TanStack SSR Handler
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await optimizeSsrResponse(normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
