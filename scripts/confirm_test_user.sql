-- Desactivar confirmación manual de email para pruebas de desarrollo si se desea
-- O confirmar el usuario de prueba creado:
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'breadpdf_test_1789772304104@breadpdf.com';
