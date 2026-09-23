import { type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/brand";

/**
 * URLs de redireccion centralizadas para Supabase Auth.
 * 
 * En produccion resuelven estrictamente a:
 * - https://breadpdf.com/es
 * - https://breadpdf.com/ca
 * - https://breadpdf.com/en
 * - https://breadpdf.com/es/login?mode=updatePassword
 * - https://breadpdf.com/ca/login?mode=updatePassword
 * - https://breadpdf.com/en/login?mode=updatePassword
 */

export function getBaseSiteUrl(): string {
  if (typeof window === "undefined") {
    return SITE_URL;
  }
  const origin = window.location.origin.replace(/\/$/, "");
  if (!origin.includes("localhost") && !origin.includes("127.0.0.1")) {
    return SITE_URL;
  }
  return origin;
}

export function getEmailConfirmRedirectUrl(locale: string = "es"): string {
  return `${getBaseSiteUrl()}/${locale}`;
}

export function getPasswordResetRedirectUrl(locale: string = "es"): string {
  return `${getBaseSiteUrl()}/${locale}/login?mode=updatePassword`;
}

