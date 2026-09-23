/**
 * BreadPDF — Ad Configuration
 *
 * All ad IDs are read from environment variables — NEVER hardcoded.
 *
 * To enable ads:
 *   1. Copy .env.example to .env.local
 *   2. Fill in your real AdSense IDs obtained from your Google AdSense account
 *   3. Restart the dev server
 *
 * Without these variables set, AdSlot shows a visible placeholder in dev mode
 * and renders nothing in production (safe default).
 */

export const ADS_CONFIG = {
  /**
   * Your AdSense publisher ID.
   * Format: ca-pub-XXXXXXXXXXXXXXXX
   * Found in: AdSense Dashboard → Account → Account information
   */
  clientId: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",

  /**
   * Whether to request non-personalized ads (NPA).
   * Default: true — safe for GDPR/Spain without a CMP.
   * Set to false only once a certified CMP (IAB TCF 2.x) is integrated.
   */
  nonPersonalizedAds: import.meta.env.VITE_ADSENSE_NPA !== "false",

  /**
   * Ad slot IDs per placement.
   * Each slot ID is obtained from AdSense → Ads → By ad unit.
   */
  slots: {
    /**
     * Shown on tool pages after a successful tool run (phase === "done").
     * Position: below the download area, before related tools.
     */
    toolResult: import.meta.env.VITE_AD_SLOT_TOOL_RESULT ?? "",

    /**
     * Shown on tool pages in the content area.
     * Position: between "Cómo funciona" and the FAQ section.
     */
    toolContent: import.meta.env.VITE_AD_SLOT_TOOL_CONTENT ?? "",

    /**
     * Shown on category pages.
     * Position: between the tool grid and the "Popular tools" section.
     * Currently disabled by default — enable in CategoryPage when ready.
     */
    category: import.meta.env.VITE_AD_SLOT_CATEGORY ?? "",

    /**
     * Reserved for the homepage footer area.
     * Not active in Phase 1 — left here for future experimentation.
     */
    homepage: import.meta.env.VITE_AD_SLOT_HOMEPAGE ?? "",
  },
} as const;

export type AdSlotVariant = keyof typeof ADS_CONFIG.slots;

import { shouldShowAds } from "@/lib/monetization/entitlements";

/** True when the minimum required config (clientId + specific slot) is present. */
export function isSlotConfigured(variant: AdSlotVariant): boolean {
  return Boolean(ADS_CONFIG.clientId && ADS_CONFIG.slots[variant]);
}

/** Determines whether an ad slot should render based on user plan entitlement and slot configuration. */
export function shouldShowAdSlot(variant: AdSlotVariant): boolean {
  if (!shouldShowAds()) return false;
  return isSlotConfigured(variant);
}
