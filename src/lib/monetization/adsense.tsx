/**
 * Google AdSense Infrastructure for BreadPDF (Prepared / Inactive by default).
 * 
 * DESIGN PRINCIPLES:
 * 1. Zero intrusion on ToolWorkspace: Ads must NEVER overlap, shift, or block file upload dropzones,
 *    processing progress bars, or primary execution CTA buttons.
 * 2. Anti-Accidental Clicks: Strict separation (minimum 40px safe buffer) between ad placements
 *    and action buttons (such as "Descargar", "Comprimir", "Unir", etc.).
 * 3. Premium Bypass: When user is subscribed or has 'no_ads' entitlement, ALL ad slots return null
 *    and no external Google AdSense scripts are loaded into the DOM.
 * 4. Responsive & CLS-safe: Ad slots reserve exact min-height to prevent Cumulative Layout Shift.
 * 5. Inactive by default: Requires VITE_ADSENSE_CLIENT_ID and VITE_ADSENSE_ENABLED="true" to render real ads.
 */

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { GOOGLE_ADSENSE_CLIENT_ID } from '@/lib/brand';

export interface AdSenseConfig {
  clientId: string;
  isEnabled: boolean;
  testMode: boolean;
}

export const ADSENSE_CONFIG: AdSenseConfig = {
  clientId:
    (typeof import.meta !== 'undefined' && import.meta.env?.["VITE_ADSENSE_CLIENT_ID"]) ||
    GOOGLE_ADSENSE_CLIENT_ID,
  isEnabled:
    (typeof import.meta !== 'undefined' && import.meta.env?.["VITE_ADSENSE_ENABLED"] === 'true') ||
    false,
  testMode:
    (typeof import.meta !== 'undefined' && import.meta.env?.["VITE_ADSENSE_TEST_MODE"] === 'true') ||
    true,
};

export type AdSlotType =
  | 'header_leaderboard'
  | 'footer_banner'
  | 'in_article'
  | 'catalog_sidebar';

export interface AdPlacementProps {
  slotType: AdSlotType;
  slotId?: string;
  className?: string;
}

const SLOT_DIMENSIONS: Record<AdSlotType, { minHeight: string; label: string }> = {
  header_leaderboard: { minHeight: '90px', label: 'Anuncio Superior (No intrusivo)' },
  footer_banner: { minHeight: '90px', label: 'Anuncio Inferior' },
  in_article: { minHeight: '250px', label: 'Anuncio Editorial' },
  catalog_sidebar: { minHeight: '600px', label: 'Anuncio Lateral Catálogo' },
};

/**
 * AdSlot component:
 * - Automatically respects Premium status (no ads).
 * - Displays a clean, muted placeholder in development/test mode without calling Google servers.
 * - Enforces CLS safety margins.
 */
export function AdSlot({ slotType, slotId, className = '' }: AdPlacementProps) {
  const { user } = useAuth();
  const isPremium = Boolean(user?.isPremium);

  // If user has active Premium, don't show any ads
  if (isPremium) {
    return null;
  }

  // If AdSense is not globally enabled in production, render safe inert container or null
  if (!ADSENSE_CONFIG.isEnabled) {
    // In dev / test mode, we can show a subtle placeholder for visual layout testing
    if (ADSENSE_CONFIG.testMode && import.meta.env?.DEV) {
      return (
        <div
          data-testid={`ad-placeholder-${slotType}`}
          aria-hidden="true"
          className={`mx-auto w-full max-w-5xl my-6 flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center transition-all ${className}`}
          style={{ minHeight: SLOT_DIMENSIONS[slotType].minHeight }}
        >
          <div className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-slate-400">
            <span className="uppercase tracking-wider font-bold">Espacio de Publicidad (Test Mode)</span>
            <span>{SLOT_DIMENSIONS[slotType].label} · Protegido contra clics accidentales</span>
          </div>
        </div>
      );
    }
    return null;
  }

  // Real production Google AdSense component
  return (
    <div
      className={`mx-auto w-full max-w-5xl my-8 overflow-hidden rounded-xl bg-slate-50/40 p-2 text-center ${className}`}
      style={{ minHeight: SLOT_DIMENSIONS[slotType].minHeight }}
    >
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CONFIG.clientId}
        data-ad-slot={slotId || '0000000000'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Hook to inject the Google AdSense script only once when enabled and not premium.
 */
export function useAdSenseScript() {
  const { user } = useAuth();
  const isPremium = Boolean(user?.isPremium);

  useEffect(() => {
    if (!ADSENSE_CONFIG.isEnabled || isPremium || typeof window === 'undefined') {
      return;
    }

    const scriptId = 'google-adsense-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.clientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      // Keep script cached once loaded
    };
  }, [isPremium]);
}
