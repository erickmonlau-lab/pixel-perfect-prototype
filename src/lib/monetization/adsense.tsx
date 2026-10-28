/**
 * Google AdSense Infrastructure for BreadPDF.
 *
 * DESIGN PRINCIPLES:
 * 1. Zero intrusion on ToolWorkspace: Ads must NEVER overlap, shift, or block file upload dropzones,
 *    processing progress bars, or primary execution CTA buttons.
 * 2. Anti-Accidental Clicks: Strict separation (minimum 40px safe buffer) between ad placements
 *    and action buttons (such as "Descargar", "Comprimir", "Unir", etc.).
 * 3. Premium Bypass: When user is subscribed or has 'no_ads' entitlement, ALL ad slots are hidden.
 * 4. Responsive & CLS-safe: Ad slots reserve exact min-height to prevent Cumulative Layout Shift.
 * 5. SSR-SAFE: The <ins> tag renders on the server so Google's crawler sees it without JS.
 *    Premium suppression is handled client-side after hydration via a visibility hook.
 *
 * ACTIVATION:
 *   Set in Vercel > Settings > Environment Variables (Production only):
 *     VITE_ADSENSE_ENABLED    = true
 *     VITE_ADSENSE_CLIENT_ID  = ca-pub-7477829897419785
 */

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { GOOGLE_ADSENSE_CLIENT_ID } from '@/lib/brand';

export interface AdSenseConfig {
  clientId: string;
  /** True when VITE_ADSENSE_ENABLED=true is set in Vercel env vars */
  isEnabled: boolean;
}

export const ADSENSE_CONFIG: AdSenseConfig = {
  clientId:
    (typeof import.meta !== 'undefined' && import.meta.env?.['VITE_ADSENSE_CLIENT_ID']) ||
    GOOGLE_ADSENSE_CLIENT_ID,
  isEnabled:
    (typeof import.meta !== 'undefined' && import.meta.env?.['VITE_ADSENSE_ENABLED'] === 'true') ||
    false,
};

export type AdSlotType =
  | 'header_leaderboard'
  | 'footer_banner'
  | 'in_article'
  | 'catalog_sidebar';

export interface AdPlacementProps {
  slotType: AdSlotType;
  /** Real data-ad-slot ID from AdSense dashboard (10-digit number). */
  slotId?: string;
  className?: string;
}

const SLOT_DIMENSIONS: Record<AdSlotType, { minHeight: string; label: string }> = {
  header_leaderboard: { minHeight: '90px', label: 'Anuncio Superior' },
  footer_banner: { minHeight: '90px', label: 'Anuncio Inferior' },
  in_article: { minHeight: '250px', label: 'Anuncio Editorial' },
  catalog_sidebar: { minHeight: '600px', label: 'Anuncio Lateral Catálogo' },
};

/**
 * AdSlot component.
 *
 * When ADSENSE_CONFIG.isEnabled is true, renders an <ins class="adsbygoogle"> tag
 * that is visible to Google's crawler (SSR-rendered). After hydration, it is hidden
 * if the user has an active Premium subscription.
 *
 * When isEnabled is false (local dev / staging), renders nothing.
 */
/**
 * Carga adsbygoogle.js una única vez y solo cuando hay un hueco de anuncio
 * realmente en juego.
 *
 * Motivo (medido con PageSpeed Insights y trazas de Chrome ralentizadas 4x):
 * el script de Google arrastra ~370 KB de JS de terceros (adsbygoogle.js,
 * show_ads_impl_fy2021.js y el mensaje de consentimiento de fundingchoices),
 * con tareas de 90-160 ms que se sumaban al Total Blocking Time de la portada,
 * donde no hay ningún anuncio. Pedirlo desde el propio AdSlot evita esa carga
 * en las páginas sin anuncios y la retrasa hasta que el hueco se acerca al
 * viewport (lazy loading estándar de anuncios de pie de página).
 */
let adsensePromise: Promise<void> | null = null;

export function ensureAdSense(): Promise<void> {
  if (!ADSENSE_CONFIG.isEnabled || typeof document === 'undefined') {
    return Promise.resolve();
  }
  if (adsensePromise) return adsensePromise;

  adsensePromise = new Promise<void>((resolve) => {
    const selector =
      'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]';
    if (document.querySelector(selector)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.clientId}`;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return adsensePromise;
}

/** Encola el relleno de un bloque <ins class="adsbygoogle"> ya insertado en el DOM. */
export function requestAdSlot(): void {
  if (!ADSENSE_CONFIG.isEnabled || typeof window === 'undefined') return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  } catch {
    // Silently ignore — el script de Google reintenta al cargar.
  }
}

export function AdSlot({ slotType, slotId, className = '' }: AdPlacementProps) {
  // SSR-safe: start with null (unknown), resolve to isPremium after hydration.
  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!ADSENSE_CONFIG.isEnabled) return;
    const node = containerRef.current;

    const activate = () => {
      void ensureAdSense().then(requestAdSlot);
    };

    // Sin IntersectionObserver (navegadores antiguos) se comporta como antes.
    if (!node || typeof IntersectionObserver === 'undefined') {
      activate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          activate();
        }
      },
      // 600px de margen: el anuncio está listo antes de que el usuario llegue.
      { rootMargin: '600px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Not enabled — render nothing (dev/staging)
  if (!ADSENSE_CONFIG.isEnabled) {
    return null;
  }

  // After hydration, if user is Premium → suppress all ads
  const isPremium = hydrated && Boolean(user?.isPremium);
  if (isPremium) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`mx-auto w-full max-w-5xl my-8 overflow-hidden rounded-xl bg-slate-50/40 p-2 text-center ${className}`}
      style={{ minHeight: SLOT_DIMENSIONS[slotType].minHeight }}
      role="region"
      aria-label={SLOT_DIMENSIONS[slotType].label}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CONFIG.clientId}
        data-ad-slot={slotId ?? ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * useAdSenseInit — calls (adsbygoogle = window.adsbygoogle || []).push({})
 * for each mounted AdSlot. Must be called once per <ins> element after mount.
 * The adsbygoogle.js script itself is already loaded globally in __root.tsx.
 */
export function useAdSenseInit() {
  useEffect(() => {
    if (!ADSENSE_CONFIG.isEnabled) return;
    void ensureAdSense().then(requestAdSlot);
  }, []);
}
