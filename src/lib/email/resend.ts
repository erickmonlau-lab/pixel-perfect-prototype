/**
 * Resend SMTP & Transactional Email Service for BreadPDF.
 *
 * Domain: breadpdf.com
 * Sender: no-reply@breadpdf.com (or support@breadpdf.com)
 *
 * DNS Requirements for Production:
 * - SPF: v=spf1 include:amazonses.com ~all (or resend spf)
 * - DKIM: resend._domainkey.breadpdf.com (provided in Resend dashboard)
 * - DMARC: v=DMARC1; p=quarantine; rua=mailto:dmarc@breadpdf.com; pct=100
 *
 * Can also be configured directly in Supabase Dashboard -> Settings -> Auth -> SMTP:
 * Host: smtp.resend.com
 * Port: 465 (or 587)
 * User: resend
 * Pass: <RESEND_API_KEY>
 * Sender email: no-reply@breadpdf.com
 * Sender name: BreadPDF
 */

import { SITE_URL } from '@/lib/brand';

export interface ResendEmailPayload {
  to: string | string[];
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailDeliveryResult {
  success: boolean;
  id?: string;
  message: string;
  isSimulated: boolean;
}

export const RESEND_CONFIG = {
  apiKey:
    (typeof process !== 'undefined' ? process.env?.["RESEND_API_KEY"] : undefined) ||
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env['VITE_RESEND_API_KEY'] : undefined) ||
    '',
  defaultFrom: 'BreadPDF <no-reply@breadpdf.com>',
  supportEmail: 'support@breadpdf.com',
  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.startsWith('re_'));
  },
};

/**
 * Send an email using Resend REST API (compatible with Edge/Cloudflare Workers/Node).
 */
export async function sendTransactionalEmail(payload: ResendEmailPayload): Promise<EmailDeliveryResult> {
  const from = payload.from || RESEND_CONFIG.defaultFrom;

  const isProduction =
    (typeof process !== 'undefined' && process.env?.["NODE_ENV"] === 'production') ||
    (typeof import.meta !== 'undefined' && import.meta.env?.PROD);

  // En producción, si falta la clave de Resend, se debe arrojar un error explícito y controlado
  if (!RESEND_CONFIG.isConfigured()) {
    if (isProduction) {
      return {
        success: false,
        message: 'Error de configuración en producción: RESEND_API_KEY no está configurada o es inválida.',
        isSimulated: false,
      };
    }

    // Fallback exclusivo para entornos de desarrollo y tests locales
    console.info('[BreadPDF Resend Email] (Simulación en Desarrollo/Test)', {
      from,
      to: payload.to,
      subject: payload.subject,
    });
    return {
      success: true,
      id: `sim_resend_${Date.now()}`,
      message: 'Email simulado correctamente (modo desarrollo/test activo).',
      isSimulated: true,
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      return {
        success: true,
        id: data.id,
        message: 'Email delivered via Resend.',
        isSimulated: false,
      };
    }

    return {
      success: false,
      message: `Resend error (${res.status}): ${data.message || JSON.stringify(data)}`,
      isSimulated: false,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Network failure sending email: ${err?.message || String(err)}`,
      isSimulated: false,
    };
  }
}

/**
 * Generate branded HTML template for Password Recovery email.
 */
export function getPasswordResetEmailHtml(options: { resetUrl: string; name?: string; locale?: string }): string {
  const { resetUrl, name = 'Usuario', locale = 'es' } = options;
  const isEn = locale === 'en';
  const isCa = locale === 'ca';

  const title = isEn ? 'Reset your BreadPDF password' : isCa ? 'Restableix la contrasenya de BreadPDF' : 'Restablece tu contraseña de BreadPDF';
  const greeting = isEn ? `Hello ${name},` : isCa ? `Hola ${name},` : `Hola ${name},`;
  const body = isEn
    ? 'We received a request to reset your password. Click the button below to choose a new one. If you did not request this, you can safely ignore this email.'
    : isCa
      ? 'Hem rebut una sol·licitud per restablir la contrasenya del teu compte. Fes clic al botó inferior per triar-ne una de nova.'
      : 'Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón inferior para elegir una nueva.';
  const cta = isEn ? 'Reset Password' : isCa ? 'Restablir contrasenya' : 'Restablecer contraseña';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; color: #0F172A;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 24px; font-weight: 900; color: #592316; letter-spacing: -0.5px;">Bread<span style="color: #EC3C2D;">PDF</span></span>
      </div>
      <div style="background: #ffffff; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h2 style="font-size: 20px; font-weight: 800; margin-top: 0; color: #0F172A;">${title}</h2>
        <p style="font-size: 15px; color: #475569; line-height: 1.6;">${greeting}</p>
        <p style="font-size: 15px; color: #475569; line-height: 1.6;">${body}</p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="${resetUrl}" style="background: #EC3C2D; color: #ffffff; text-decoration: none; padding: 13px 28px; font-size: 15px; font-weight: 700; border-radius: 10px; display: inline-block;">${cta}</a>
        </div>
        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 0;">${resetUrl}</p>
      </div>
      <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #94A3B8;">
        © ${new Date().getFullYear()} BreadPDF · Todos los derechos reservados.
      </div>
    </div>
  `;
}
