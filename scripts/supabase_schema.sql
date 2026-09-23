-- ============================================================================
-- BREADPDF - ESQUEMA DE PERSISTENCIA REAL PARA PRODUCCIÓN (SUPABASE / POSTGRESQL)
-- Versión: 2.0 (Endurecida para Producción con RLS Estricto y Search Path Seguro)
-- ============================================================================

-- 1. Tabla de Perfiles Públicos vinculada 1:1 con auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar_url TEXT NULL,
    preferred_locale TEXT NOT NULL DEFAULT 'es',
    newsletter_subscribed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabla de Herramientas Favoritas por Usuario
CREATE TABLE IF NOT EXISTS public.user_favorites (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, tool_id)
);

-- 3. Índices de rendimiento
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON public.profiles(updated_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - POLICIES ESTRICTAS
-- Garantiza aislamiento multi-inquilino absoluto mediante auth.uid()
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Limpieza preventiva de policies si se re-ejecuta el script
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;

DROP POLICY IF EXISTS "favorites_select_own" ON public.user_favorites;
DROP POLICY IF EXISTS "favorites_insert_own" ON public.user_favorites;
DROP POLICY IF EXISTS "favorites_delete_own" ON public.user_favorites;

-- Policies para public.profiles
-- Lectura: Cualquier usuario autenticado puede leer únicamente su propio perfil
CREATE POLICY "profiles_select_own"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Inserción: Solo el propio usuario puede insertar su perfil
CREATE POLICY "profiles_insert_own"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Actualización: Solo el propio usuario puede actualizar su perfil
CREATE POLICY "profiles_update_own"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Eliminación: Solo el propio usuario puede eliminar su perfil
CREATE POLICY "profiles_delete_own"
    ON public.profiles
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id);

-- Policies para public.user_favorites
-- Lectura: Solo el propio usuario puede consultar sus herramientas favoritas
CREATE POLICY "favorites_select_own"
    ON public.user_favorites
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Inserción: Solo el propio usuario puede añadir favoritos a su cuenta
CREATE POLICY "favorites_insert_own"
    ON public.user_favorites
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Eliminación: Solo el propio usuario puede desmarcar sus favoritos
CREATE POLICY "favorites_delete_own"
    ON public.user_favorites
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- ============================================================================
-- TRIGGER AUTOMÁTICO: Creación de Profile tras Registro en auth.users
-- Implementación endurecida:
--  - SECURITY DEFINER
--  - SET search_path = '' (Previene ataques de path hijacking)
--  - Tipos y tablas cualificados explícitamente (public.profiles, pg_catalog)
--  - Revocación de permisos públicos de ejecución (No expuesta en Data API)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS 
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url, preferred_locale, newsletter_subscribed)
    VALUES (
        NEW.id,
        pg_catalog.coalesce(NEW.raw_user_meta_data->>'name', pg_catalog.split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        pg_catalog.coalesce(NEW.raw_user_meta_data->>'preferred_locale', 'es'),
        pg_catalog.coalesce((NEW.raw_user_meta_data->>'newsletter_subscribed')::boolean, false)
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        updated_at = pg_catalog.now();
    RETURN NEW;
END;
;

-- Blindaje de privilegios de ejecución de la función de trigger
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
