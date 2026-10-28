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

import React, { useEffect, useState } from 'react';
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
export function AdSlot({ slotType, slotId, className = '' }: AdPlacementProps) {
  // SSR-safe: start with null (unknown), resolve to isPremium after hydration.
  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Not enabled → render nothing (dev/staging)
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
    if (!ADSENSE_CONFIG.isEnabled || typeof window === 'undefined') return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // Silently ignore — happens if adsbygoogle.js hasn't loaded yet (handled by async script)
    }
  }, []);
}
