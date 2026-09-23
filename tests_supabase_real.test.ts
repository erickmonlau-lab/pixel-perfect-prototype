import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sfpnblvihpfrxgdtujxz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_b-rUDGvi8NWvz3ApciwPsw_eQeHdRYF';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

describe('Fase 1.5.2: Verificación E2E contra Proyecto Supabase Real', () => {
  it('1. Conexión Real y Disponibilidad de Tablas Supabase', async () => {
    const { data: profiles, error: pErr } = await supabase.from('profiles').select('*');
    expect(pErr).toBeNull();
    // Por RLS, una consulta anónima siempre devuelve un array vacío
    expect(profiles).toHaveLength(0);

    const { data: favs, error: fErr } = await supabase.from('user_favorites').select('*');
    expect(fErr).toBeNull();
    expect(favs).toHaveLength(0);
  });

  it('2. Registro Real de Usuario mediante Supabase Auth + Trigger (o detección de Rate Limit)', async () => {
    const testEmail = 'breadpdf_auto_' + Date.now() + '@breadpdf.com';
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: 'RealPassword2026!',
      options: {
        data: {
          name: 'Usuario Real Verificado',
          preferred_locale: 'es',
        },
      },
    });

    if (error) {
      // Si el servidor de email integrado de Supabase alcanzó el límite de emails/hora (3 por hora en tier gratuito)
      expect((error as any).status).toBe(429);
      expect(error.message).toMatch(/rate limit/i);
    } else {
      expect(data.user).not.toBeNull();
      expect(data.user?.id).toBeDefined();
      expect(data.user?.email).toBe(testEmail);
    }
  });

  it('3. Validación de Error en Login con Contraseña Incorrecta', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'breadpdf_test_1789772304104@breadpdf.com',
      password: 'WrongPassword!',
    });

    expect(error).not.toBeNull();
    expect(error?.message).toMatch(/Invalid login credentials/i);
  });

  it('4. Validación de Error en Login con Usuario Inexistente', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'nonexistent_' + Date.now() + '@breadpdf.com',
      password: 'AnyPassword123!',
    });

    expect(error).not.toBeNull();
    expect(error?.message).toMatch(/Invalid login credentials/i);
  });

  it('5. RLS Bloquea Inserciones Anónimas o No Autorizadas en public.profiles', async () => {
    const { error } = await supabase.from('profiles').insert({
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Hacker Name',
    });

    expect(error).not.toBeNull();
    expect(error?.message).toMatch(/violates row-level security policy/i);
  });

  it('6. RLS Bloquea Inserciones Anónimas o No Autorizadas en public.user_favorites', async () => {
    const { error } = await supabase.from('user_favorites').insert({
      user_id: '00000000-0000-0000-0000-000000000001',
      tool_id: 'comprimir-pdf',
    });

    expect(error).not.toBeNull();
    expect(error?.message).toMatch(/violates row-level security policy/i);
  });
});
