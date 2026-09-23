-- ============================================================================
-- Corrección del Trigger para Supabase Auth (Permisos y Search Path)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS 
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url, preferred_locale, newsletter_subscribed)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'preferred_locale', 'es'),
        COALESCE((NEW.raw_user_meta_data->>'newsletter_subscribed')::boolean, false)
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        updated_at = NOW();
    RETURN NEW;
END;
;

-- Permisos explícitos para que el motor interno de Supabase Auth pueda ejecutarlo
GRANT USAGE ON SCHEMA public TO supabase_auth_admin, service_role, postgres;
GRANT ALL ON TABLE public.profiles TO supabase_auth_admin, service_role, postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin, service_role, postgres;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
