export type MonetizationEvent =
  | { type: 'premium_view'; source?: string; locale?: string }
  | { type: 'upgrade_click'; feature?: string; source?: string; locale?: string }
  | { type: 'checkout_started'; plan: string; interval?: string }
  | { type: 'checkout_completed'; plan: string }
  | { type: 'feature_locked'; feature: string; source?: string }
  | { type: 'feature_unlocked'; feature: string; source?: string };

export function trackMonetizationEvent(event: MonetizationEvent): void {
  if (typeof window !== 'undefined' && (window as unknown as { __DEV__?: boolean }).__DEV__) {
    console.debug('[Monetization Analytics]', event);
  }
}
