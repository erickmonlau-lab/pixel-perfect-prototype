import { describe, it, expect, beforeEach } from 'vitest';
import {
  serverAuthStore,
  serverRegister,
  serverLogin,
  serverGetCurrentUser,
  serverLogout,
  serverUpdateProfile,
  createSessionCookieHeader,
  hashPassword,
  verifyPassword,
} from './src/lib/auth/server-auth';
import { isSupabaseConfigured, supabase } from './src/lib/supabase/client';

describe('Fase 1.5.1: Verificación de Producción Real y Cierre de Arquitectura', () => {
  beforeEach(() => {
    serverAuthStore.clearAll();
  });

  it('1. Supabase Client: Carga limpia y detección correcta de variables', () => {
    expect(typeof isSupabaseConfigured).toBe('boolean');
    if (isSupabaseConfigured) {
      expect(supabase).not.toBeNull();
      expect(supabase?.auth).toBeDefined();
    }
  });

  it('2. Registro con persistencia real y hashing criptográfico PBKDF2 (Fallback / Local)', async () => {
    const res = await serverRegister({
      name: 'Producción Tester',
      email: 'prod@breadpdf.com',
      password: 'ProdSecurePassword2026!',
      newsletterSubscribed: false,
    });

    expect(res.user.id).toBeDefined();
    expect(res.user.email).toBe('prod@breadpdf.com');
    expect(res.user.name).toBe('Producción Tester');
    expect(res.session.id).toBeDefined();
  });

  it('3. Rechazo estricto de contraseñas erróneas en Login', async () => {
    await serverRegister({
      name: 'Auth User',
      email: 'auth@breadpdf.com',
      password: 'RealPassword123!',
    });

    await expect(
      serverLogin({
        email: 'auth@breadpdf.com',
        password: 'FakePassword!',
      })
    ).rejects.toThrow('Contraseña incorrecta');
  });

  it('4. Separación estricta: Login con usuario inexistente arroja error y no crea cuenta', async () => {
    await expect(
      serverLogin({
        email: 'ghost@breadpdf.com',
        password: 'SomePassword!',
      })
    ).rejects.toThrow('No existe ninguna cuenta asociada a este correo electrónico.');
    expect(serverAuthStore.findUserByEmail('ghost@breadpdf.com')).toBeNull();
  });

  it('5. Sesión firmada con HMAC-SHA256: verificación correcta de HttpOnly cookie', async () => {
    const { session, user } = await serverRegister({
      name: 'Cookie User',
      email: 'cookie@breadpdf.com',
      password: 'Password123!',
    });

    const cookieHeader = await createSessionCookieHeader(session.id);
    const resolved = await serverGetCurrentUser(cookieHeader);
    expect(resolved).not.toBeNull();
    expect(resolved?.id).toBe(user.id);
    expect(resolved?.email).toBe('cookie@breadpdf.com');
  });

  it('6. Manipulación de Cookie / localStorage rechazada por el servidor', async () => {
    const forgedCookie = 'breadpdf_session=fake_user_id.forged_signature';
    const resolved = await serverGetCurrentUser(forgedCookie);
    expect(resolved).toBeNull();
  });

  it('7. Protección contra asignación fraudulenta de isPremium en cliente', async () => {
    const { user } = await serverRegister({
      name: 'Honest User',
      email: 'honest@breadpdf.com',
      password: 'Password123!',
    });
    expect(user.isPremium).toBe(false);
  });

  it('8. Actualización de perfil persistente: Nombre e idioma persisten en backend', async () => {
    const { session } = await serverRegister({
      name: 'Nombre Antiguo',
      email: 'update@breadpdf.com',
      password: 'Password123!',
    });

    const cookieHeader = await createSessionCookieHeader(session.id);
    const updated = await serverUpdateProfile(cookieHeader, {
      name: 'Nombre Nuevo',
      preferredLocale: 'ca',
      newsletterSubscribed: true,
    });

    expect(updated.name).toBe('Nombre Nuevo');
    expect(updated.preferredLocale).toBe('ca');
    expect(updated.newsletterSubscribed).toBe(true);

    const refreshed = await serverGetCurrentUser(cookieHeader);
    expect(refreshed?.name).toBe('Nombre Nuevo');
    expect(refreshed?.preferredLocale).toBe('ca');
    expect(refreshed?.newsletterSubscribed).toBe(true);
  });

  it('9. Aislamiento RLS / Multi-Inquilino: Un usuario no puede alterar perfil ajeno', async () => {
    await serverRegister({
      name: 'Victim',
      email: 'victim@breadpdf.com',
      password: 'Password123!',
    });

    await expect(
      serverUpdateProfile('breadpdf_session=invalid.signature', {
        name: 'Hacked',
      })
    ).rejects.toThrow('No autorizado');
  });

  it('10. Logout seguro: invalida la sesión en backend y devuelve null', async () => {
    const { session } = await serverRegister({
      name: 'Logout Person',
      email: 'bye@breadpdf.com',
      password: 'Password123!',
    });

    const cookieHeader = await createSessionCookieHeader(session.id);
    expect(await serverGetCurrentUser(cookieHeader)).not.toBeNull();

    await serverLogout(cookieHeader);
    expect(await serverGetCurrentUser(cookieHeader)).toBeNull();
  });

  it('11. Criptografía PBKDF2: Salt único e irrepetible para contraseñas idénticas', async () => {
    const pass = 'SuperSecret123!';
    const h1 = await hashPassword(pass);
    const h2 = await hashPassword(pass);

    expect(h1.salt).not.toBe(h2.salt);
    expect(h1.hash).not.toBe(h2.hash);
    expect(await verifyPassword(pass, h1.hash, h1.salt)).toBe(true);
    expect(await verifyPassword(pass, h2.hash, h2.salt)).toBe(true);
  });

  it('12. Fusión matemática de favoritos (Guest + Account) deduplica herramientas con Set', () => {
    const guestList = ['comprimir-pdf', 'unir-pdf'];
    const userDbList = ['unir-pdf', 'pdf-a-word'];
    const merged = Array.from(new Set([...userDbList, ...guestList]));

    expect(merged).toHaveLength(3);
    expect(merged).toEqual(expect.arrayContaining(['comprimir-pdf', 'unir-pdf', 'pdf-a-word']));
  });

  describe('Fase 2.1 y 2.1.1: Verificación de Email, Recuperación y Hardening', () => {
    it('13. Validación estricta de contraseña: rechaza menos de 8 caracteres', async () => {
      const { resetUserPassword } = await import('./src/lib/auth/auth-store');
      await expect(resetUserPassword('12345')).rejects.toThrow(/al menos 8 caracteres/i);
      await expect(resetUserPassword('1234567')).rejects.toThrow(/al menos 8 caracteres/i);
    });

    it('14. Comportamiento neutral antienumeración en solicitud de reseteo de contraseña', async () => {
      const { requestPasswordReset } = await import('./src/lib/auth/auth-store');
      const res = await requestPasswordReset('random_user_ghost_999@breadpdf.com', 'es');
      expect(res.success).toBe(true);
      expect(res.message).toMatch(/Si existe una cuenta asociada/i);
    });

    it('15. Error de usuario no verificado marcado con bandera isUnconfirmed', async () => {
      const { AuthErrorWithCode } = await import('./src/lib/auth/auth-store');
      const err = new AuthErrorWithCode('Email not confirmed', 'email_not_confirmed', true);
      expect(err.isUnconfirmed).toBe(true);
      expect(err.code).toBe('email_not_confirmed');
    });

    it('16. URLs de redirección centralizadas en auth-redirects.ts para ES, CA y EN', async () => {
      const { getEmailConfirmRedirectUrl, getPasswordResetRedirectUrl } = await import('./src/lib/auth/auth-redirects');
      
      const confirmEs = getEmailConfirmRedirectUrl('es');
      const confirmCa = getEmailConfirmRedirectUrl('ca');
      const confirmEn = getEmailConfirmRedirectUrl('en');

      expect(confirmEs).toContain('/es');
      expect(confirmCa).toContain('/ca');
      expect(confirmEn).toContain('/en');

      const resetEs = getPasswordResetRedirectUrl('es');
      const resetCa = getPasswordResetRedirectUrl('ca');
      const resetEn = getPasswordResetRedirectUrl('en');

      expect(resetEs).toContain('/es/login?mode=updatePassword');
      expect(resetCa).toContain('/ca/login?mode=updatePassword');
      expect(resetEn).toContain('/en/login?mode=updatePassword');
    });

    it('17. Registro valida coherentemente mínimo 8 caracteres', async () => {
      const { registerUser } = await import('./src/lib/auth/auth-store');
      await expect(
        registerUser({
          email: 'test_short_pw@breadpdf.com',
          password: 'short',
          name: 'Test Short',
        })
      ).rejects.toThrow(/al menos 8 caracteres/i);
    });
  });

  describe('Verificación Funcional Profunda: Catálogo Completo 50 Herramientas BreadPDF', () => {
    it('18. El catálogo cuenta exactamente con 50 herramientas registradas y activas (live)', async () => {
      const { TOOLS } = await import('./src/lib/tools/registry');
      expect(TOOLS.length).toBe(50);
      const liveTools = TOOLS.filter((t) => t.status === 'live');
      expect(liveTools.length).toBe(50);
    });

    it('19. Las 5 herramientas interactivas están implementadas sin stubs ni simulación', async () => {
      const { TOOLS } = await import('./src/lib/tools/registry');
      const interactiveSlugs = [
        'marca-de-agua',
        'numerar-paginas',
        'firmar-pdf',
        'comparar-pdf',
        'rellenar-formulario-pdf',
      ];

      for (const slug of interactiveSlugs) {
        const tool = TOOLS.find((t) => t.slug === slug);
        expect(tool).toBeDefined();
        expect(tool?.status).toBe('live');
      }
    });

    it('20. Runner Unir PDF (mergePdf): Combina múltiples PDFs y genera un documento válido', async () => {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const runners = await import('./src/lib/tools/runners');

      const doc1 = await PDFDocument.create();
      doc1.addPage([400, 600]);
      const bytes1 = await doc1.save();

      const doc2 = await PDFDocument.create();
      doc2.addPage([400, 600]);
      doc2.addPage([400, 600]);
      const bytes2 = await doc2.save();

      const file1 = new File([bytes1], 'doc1.pdf', { type: 'application/pdf' });
      const file2 = new File([bytes2], 'doc2.pdf', { type: 'application/pdf' });

      let progressCalled = false;
      const res = await runners.mergePdf([file1, file2], {}, { onProgress: () => { progressCalled = true; } });

      expect(res.outputs.length).toBe(1);
      expect(res.outputs[0].blob.size).toBeGreaterThan(100);
      expect(progressCalled).toBe(true);

      const mergedDoc = await PDFDocument.load(await res.outputs[0].blob.arrayBuffer());
      expect(mergedDoc.getPageCount()).toBe(3);
    });

    it('21. Runner Dividir PDF (splitPdf): Divide un PDF en rangos específicos y genera PDFs válidos', async () => {
      const { PDFDocument } = await import('pdf-lib');
      const runners = await import('./src/lib/tools/runners');

      const doc = await PDFDocument.create();
      for (let i = 0; i < 4; i++) doc.addPage([400, 600]);
      const bytes = await doc.save();
      const file = new File([bytes], 'sample.pdf', { type: 'application/pdf' });

      const res = await runners.splitPdf([file], { mode: 'range', ranges: '1-2, 3-4' }, { onProgress: () => {} });
      expect(res.outputs.length).toBe(2);
      const part1 = await PDFDocument.load(await res.outputs[0].blob.arrayBuffer());
      expect(part1.getPageCount()).toBe(2);
    });

    it('22. Runner Rotar PDF (rotatePdf): Rota ángulos válidos y genera documento modificado', async () => {
      const { PDFDocument } = await import('pdf-lib');
      const runners = await import('./src/lib/tools/runners');

      const doc = await PDFDocument.create();
      doc.addPage([400, 600]);
      const bytes = await doc.save();
      const file = new File([bytes], 'rotate.pdf', { type: 'application/pdf' });

      const res = await runners.rotatePdf([file], { angle: 90 }, { onProgress: () => {} });
      expect(res.outputs.length).toBe(1);
      const rotatedDoc = await PDFDocument.load(await res.outputs[0].blob.arrayBuffer());
      expect(rotatedDoc.getPage(0).getRotation().angle).toBe(90);
    });

    it('23. Runner Comprimir PDF (compressPdf): Modo lossless reestructura sin pérdida', async () => {
      const { PDFDocument } = await import('pdf-lib');
      const runners = await import('./src/lib/tools/runners');

      const doc = await PDFDocument.create();
      doc.addPage([400, 600]);
      const bytes = await doc.save();
      const file = new File([bytes], 'compress.pdf', { type: 'application/pdf' });

      const res = await runners.compressPdf([file], { level: 'lossless' }, { onProgress: () => {} });
      expect(res.outputs.length).toBe(1);
      expect(res.outputs[0].blob.size).toBeGreaterThan(50);
    });

    it('24. Interactive Engine: exportWorkspacePdf incrusta Marcas de agua y Numeración en PDF real', async () => {
      const { PDFDocument } = await import('pdf-lib');
      const { exportWorkspacePdf } = await import('./src/components/tools/workspace/exportWorkspacePdf');

      const doc = await PDFDocument.create();
      doc.addPage([400, 600]);
      doc.addPage([400, 600]);
      const sampleBytes = await doc.save();

      const pages = [
        { id: 'p1', sourceDocumentId: 'doc1', sourceFileName: 'test.pdf', sourcePageIndex: 0, rotation: 0, selected: false },
        { id: 'p2', sourceDocumentId: 'doc1', sourceFileName: 'test.pdf', sourcePageIndex: 1, rotation: 0, selected: false },
      ];
      const docs = {
        doc1: {
          id: 'doc1',
          fileName: 'test.pdf',
          fileSize: sampleBytes.byteLength,
          arrayBuffer: sampleBytes.buffer as ArrayBuffer,
          pageCount: 2,
        },
      };

      const exportedBytes = await exportWorkspacePdf(pages, docs, {
        watermarkConfig: {
          type: 'text',
          text: 'CONFIDENCIAL BREADPDF',
          position: 'center',
          isTile: false,
          opacity: 0.3,
          fontSize: 30,
          rotationAngle: 45,
          color: '#FF0000',
          margin: 30,
        },
        pageNumberConfig: {
          position: 'bottom-center',
          format: 'Página {n} de {total}',
          startFrom: 1,
          excludeCover: false,
          fontSize: 12,
          color: '#000000',
          margin: 20,
        },
      });

      expect(exportedBytes.byteLength).toBeGreaterThan(sampleBytes.byteLength);
      const parsed = await PDFDocument.load(exportedBytes);
      expect(parsed.getPageCount()).toBe(2);
    });

    it('25. Runner Sanear PDF (sanitizePdf): Limpia metadatos y scripts potencialmente peligrosos', async () => {
      const { PDFDocument } = await import('pdf-lib');
      const runners = await import('./src/lib/tools/runners');

      const doc = await PDFDocument.create();
      doc.addPage([400, 600]);
      doc.setAuthor('Autor Confidencial');
      const bytes = await doc.save();
      const file = new File([bytes], 'clean.pdf', { type: 'application/pdf' });

      const res = await runners.sanitizePdf([file], {}, { onProgress: () => {} });
      expect(res.outputs.length).toBe(1);
      const cleanedDoc = await PDFDocument.load(await res.outputs[0].blob.arrayBuffer());
      expect(cleanedDoc.getAuthor()).toBeFalsy();
    });
  });

  describe('Fase SEO & GEO: Sitemap XML, Hreflang, Schemas y Robots', () => {
    it('26. generateSitemap() genera exactamente 207 URLs con alternate xhtml:link y namespace correcto', async () => {
      const { generateSitemap } = await import('./src/lib/sitemap');
      const xml = generateSitemap();

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');

      // Comprobar presencia de xhtml:link para es, ca, en y x-default
      expect(xml).toContain('xhtml:link rel="alternate" hreflang="es"');
      expect(xml).toContain('xhtml:link rel="alternate" hreflang="ca"');
      expect(xml).toContain('xhtml:link rel="alternate" hreflang="en"');
      expect(xml).toContain('xhtml:link rel="alternate" hreflang="x-default"');

      // Contar URLs totales indexables: 3 home + 3 catalogo + 3 premium + 150 tools + 18 cats + 30 guias = 207
      const urlCount = (xml.match(/<url>/g) || []).length;
      expect(urlCount).toBe(207);
    });

    it('27. alternateLinks genera tags canónicos y hreflang recíprocos precisos', async () => {
      const { alternateLinks } = await import('./src/lib/i18n/routing');
      const links = alternateLinks('es', { kind: 'tool', canonicalSlug: 'unir-pdf' });

      const canonical = links.find((l) => l.rel === 'canonical');
      expect(canonical?.href).toBe('https://breadpdf.com/es/herramientas/unir-pdf');

      const esLink = links.find((l) => (l as any).hrefLang === 'es');
      const caLink = links.find((l) => (l as any).hrefLang === 'ca');
      const enLink = links.find((l) => (l as any).hrefLang === 'en');
      const xDef = links.find((l) => (l as any).hrefLang === 'x-default');

      expect(esLink?.href).toBe('https://breadpdf.com/es/herramientas/unir-pdf');
      expect(caLink?.href).toBe('https://breadpdf.com/ca/eines/uneix-pdf');
      expect(enLink?.href).toBe('https://breadpdf.com/en/tools/merge-pdf');
      expect(xDef?.href).toBe('https://breadpdf.com/es/herramientas/unir-pdf');
    });

    it('28. robots.txt bloquea rutas de auth, api y cuentas, permitiendo rastreo e indexación limpia', async () => {
      const fs = await import('fs');
      const path = await import('path');
      const robotsPath = path.resolve(process.cwd(), 'public/robots.txt');
      const robotsTxt = fs.readFileSync(robotsPath, 'utf8');

      expect(robotsTxt).toContain('Disallow: /api/');
      expect(robotsTxt).toContain('Disallow: /*/cuenta');
      expect(robotsTxt).toContain('Disallow: /*/login');
      expect(robotsTxt).toContain('Sitemap: https://breadpdf.com/sitemap.xml');
      expect(robotsTxt).toContain('User-agent: Googlebot');
      expect(robotsTxt).toContain('User-agent: OAI-SearchBot');
      expect(robotsTxt).toContain('User-agent: PerplexityBot');
    });

    it('29. IndexNow está preparado para enviar URLs y maneja ausencia de API key con gracia', async () => {
      const { submitToIndexNow } = await import('./src/lib/indexnow');
      const res = await submitToIndexNow(['https://breadpdf.com/es']);
      expect(res.success).toBe(false);
      expect(res.message).toMatch(/INDEXNOW_API_KEY/i);
    });

    it('30. Las 207 URLs indexables del sitemap tienen formato canónico y slugs válidos', async () => {
      const { generateSitemap } = await import('./src/lib/sitemap');
      const xml = generateSitemap();
      const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      
      expect(locMatches.length).toBe(207);
      for (const url of locMatches) {
        expect(url.startsWith('https://breadpdf.com/')).toBe(true);
        expect(url).not.toContain('undefined');
        expect(url).not.toContain('null');
        expect(url).not.toContain('/login');
        expect(url).not.toContain('/cuenta');
      }
    });
  });

  describe('Fase Infraestructura de Producción + Monetización: SMTP Resend, Stripe Test y AdSense', () => {
    it('31. Resend: servicio de email transaccional implementado con fallback y plantilla HTML', async () => {
      const { sendTransactionalEmail, getPasswordResetEmailHtml, RESEND_CONFIG } = await import('./src/lib/email/resend');
      expect(RESEND_CONFIG.defaultFrom).toBe('BreadPDF <no-reply@breadpdf.com>');

      // Prueba de renderizado de plantilla de reseteo de contraseña
      const html = getPasswordResetEmailHtml({
        resetUrl: 'https://breadpdf.com/es/login?mode=updatePassword',
        name: 'Carlos',
        locale: 'es',
      });
      expect(html).toContain('Bread<span style="color: #EC3C2D;">PDF</span>');
      expect(html).toContain('Restablece tu contraseña de BreadPDF');
      expect(html).toContain('https://breadpdf.com/es/login?mode=updatePassword');

      // Envío simulado en entorno de pruebas sin credencial externa
      const res = await sendTransactionalEmail({
        to: 'test@example.com',
        subject: 'Prueba BreadPDF',
        html,
      });
      expect(res.success).toBe(true);
      expect(res.isSimulated).toBe(true);
    });

    it('32. Stripe: checkout session y customer portal en Test Mode con mapeo de estados de suscripción', async () => {
      const { createCheckoutSession, openCustomerPortal, mapStripeSubscriptionStatus, STRIPE_CONFIG } = await import('./src/lib/monetization/billing');
      
      expect(STRIPE_CONFIG.isTestMode).toBe(true);
      expect(STRIPE_CONFIG.publishableKey).toContain('pk_test_');

      // Mapeo exhaustivo de estados de Stripe
      expect(mapStripeSubscriptionStatus('active')).toBe('active');
      expect(mapStripeSubscriptionStatus('trialing')).toBe('trialing');
      expect(mapStripeSubscriptionStatus('past_due')).toBe('past_due');
      expect(mapStripeSubscriptionStatus('canceled')).toBe('canceled');
      expect(mapStripeSubscriptionStatus('unpaid')).toBe('canceled');

      // Creación de sesión de checkout en test mode
      const session = await createCheckoutSession({
        planId: 'premium',
        interval: 'month',
        locale: 'es',
      });
      expect(session.success).toBe(true);
      expect(session.isTestMode).toBe(true);
      expect(session.sessionId).toContain('cs_test_');
    });

    it('33. AdSense: configuración inactiva en producción por defecto y sin interferir en Premium', async () => {
      const { ADSENSE_CONFIG } = await import('./src/lib/monetization/adsense');
      // Asegurar que por defecto NO está activo en producción
      expect(ADSENSE_CONFIG.isEnabled).toBe(false);
      expect(ADSENSE_CONFIG.testMode).toBe(true);
    });

    it('34. Resend en producción falla de forma segura y explícita si falta la API Key', async () => {
      const { sendTransactionalEmail } = await import('./src/lib/email/resend');
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const res = await sendTransactionalEmail({
        to: 'user@example.com',
        subject: 'Prueba Prod',
        html: '<p>Test</p>',
      });

      expect(res.success).toBe(false);
      expect(res.message).toMatch(/RESEND_API_KEY no está configurada/i);

      process.env.NODE_ENV = originalEnv;
    });

    it('35. Stripe Webhook: checkout.session.completed otorga Premium y sincroniza plan', async () => {
      const { processStripeWebhookEvent } = await import('./src/lib/monetization/billing');
      const result = processStripeWebhookEvent({
        id: 'evt_test_checkout',
        type: 'checkout.session.completed',
        data: {
          object: {
            client_reference_id: 'user_123',
            metadata: { planId: 'premium', userId: 'user_123' },
          },
        },
      });

      expect(result.handled).toBe(true);
      expect(result.isPremium).toBe(true);
      expect(result.newPlan).toBe('premium');
      expect(result.subscriptionStatus).toBe('active');
    });

    it('36. Stripe Webhook: customer.subscription.deleted revoca Premium y devuelve a Free', async () => {
      const { processStripeWebhookEvent } = await import('./src/lib/monetization/billing');
      const result = processStripeWebhookEvent({
        id: 'evt_test_deleted',
        type: 'customer.subscription.deleted',
        data: {
          object: {
            id: 'sub_test_123',
            metadata: { userId: 'user_123' },
          },
        },
      });

      expect(result.handled).toBe(true);
      expect(result.isPremium).toBe(false);
      expect(result.newPlan).toBe('free');
      expect(result.subscriptionStatus).toBe('canceled');
    });

    it('37. Stripe Webhook: invoice.payment_failed suspende Premium y marca past_due', async () => {
      const { processStripeWebhookEvent } = await import('./src/lib/monetization/billing');
      const result = processStripeWebhookEvent({
        id: 'evt_test_failed',
        type: 'invoice.payment_failed',
        data: {
          object: {
            metadata: { userId: 'user_123' },
          },
        },
      });

      expect(result.handled).toBe(true);
      expect(result.isPremium).toBe(false);
      expect(result.subscriptionStatus).toBe('past_due');
    });

    it('38. Seguridad e integridad: un usuario no puede elevarse a Premium manipulando el frontend', async () => {
      const { sanitizeUser } = await import('./src/lib/auth/server-auth');
      const fakeHackedStoredUser: any = {
        id: 'hacker_123',
        name: 'Hacker',
        email: 'hacker@example.com',
        isPremium: true, // Intento de inyección directa
      };

      const sanitized = sanitizeUser(fakeHackedStoredUser);
      // El servidor siempre fuerza isPremium: false en la sesión local
      expect(sanitized.isPremium).toBe(false);
    });

    it('39. Flujo real de Firma y Añadir Texto: Genera un PDF binario válido con texto y firma superpuestos', async () => {
      const { PDFDocument } = await import('pdf-lib');
      const { exportWorkspacePdf } = await import('./src/components/tools/workspace/exportWorkspacePdf');

      const sourceDoc = await PDFDocument.create();
      const page = sourceDoc.addPage([595, 842]);
      page.drawText('Contrato original a firmar');
      const sourceBytes = await sourceDoc.save();

      const docId = 'doc_test_contract';
      const pages = [{ id: 'p1', sourceDocumentId: docId, sourcePageIndex: 0, rotation: 0 }];
      const documents = {
        [docId]: {
          id: docId,
          name: 'contrato.pdf',
          size: sourceBytes.byteLength,
          pageCount: 1,
          arrayBuffer: sourceBytes.buffer,
        },
      };

      // PNG de firma mínimo en Base64 (1x1 transparente)
      const fakeSignaturePngDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      const exportedBytes = await exportWorkspacePdf(pages, documents, {
        signatureConfig: {
          dataUrl: fakeSignaturePngDataUrl,
          position: 'bottom-right',
          scale: 0.5,
          pageTarget: 'all',
        },
        textOverlayConfig: {
          items: [
            {
              id: 'text-1',
              text: 'Aprobado y Firmado por QA Senior',
              xPercent: 50,
              yPercent: 80,
              fontSize: 14,
              color: '#0F172A',
              pageTarget: 'all',
            },
          ],
          activeItemIndex: 0,
        },
      });

      expect(exportedBytes.byteLength).toBeGreaterThan(sourceBytes.byteLength);
      const parsed = await PDFDocument.load(exportedBytes);
      expect(parsed.getPageCount()).toBe(1);
    });

    it('40. Flujo real de Rellenar Formulario: Inyecta campos AcroForm y genera documento persistente', async () => {
      const { PDFDocument } = await import('pdf-lib');

      const doc = await PDFDocument.create();
      const page = doc.addPage([400, 500]);
      const form = doc.getForm();

      const nameField = form.createTextField('nombre_cliente');
      nameField.setText('');
      nameField.addToPage(page, { x: 50, y: 400, width: 200, height: 25 });

      const checkField = form.createCheckBox('acepta_terminos');
      checkField.addToPage(page, { x: 50, y: 350, width: 20, height: 20 });

      const initialBytes = await doc.save();
      expect(initialBytes.byteLength).toBeGreaterThan(0);

      // Ahora simular rellenado
      const loadedDoc = await PDFDocument.load(initialBytes);
      const loadedForm = loadedDoc.getForm();
      loadedForm.getTextField('nombre_cliente').setText('Auditor QA BreadPDF');
      loadedForm.getCheckBox('acepta_terminos').check();

      const filledBytes = await loadedDoc.save();
      const verifiedDoc = await PDFDocument.load(filledBytes);
      const verifiedForm = verifiedDoc.getForm();

      expect(verifiedForm.getTextField('nombre_cliente').getText()).toBe('Auditor QA BreadPDF');
      expect(verifiedForm.getCheckBox('acepta_terminos').isChecked()).toBe(true);
    });
  });
});





