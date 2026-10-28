# Internacionalización técnica SEO

## Estado en código

- Locales públicas configuradas: `es`, `ca`, `en`; español es el locale por defecto.
- Segmentos principales localizados: `/es/herramientas`, `/ca/eines`, `/en/tools`; guías `/es/guias`, `/ca/guies`, `/en/guides`.
- Las 51 herramientas cuentan con slugs en cada idioma en los mapas de slugs/traducciones. Los 11 artículos de guía tienen slugs y título/SEO copy localizados.
- `alternateLinks()` genera canonical propio, tres alternates y `x-default` en las páginas que lo invocan. El sitemap añade pares XHTML recíprocos en las 204 URLs declaradas.
- La raíz `/` redirige a `/es` con 301. Los catálogos y páginas de categoría usan la home con una categoría seleccionada; por ello sus rutas de catálogo/categoría no se declaran como páginas en el sitemap. El hub de guías sí es una página independiente y ahora se incluye.
- Las páginas de login, registro, recuperar contraseña, cuenta y premium se marcan `noindex, nofollow`; no se publican en sitemap.

## Riesgos y tareas

1. **Validación de respuesta real:** inspeccionar por idioma una home, hub de guías, herramienta, guía, privacidad y una URL de categoría/catalog redirect. Confirmar status final, canonical, `html lang`, hreflang recíproco y que los redirects no sean soft 404.
2. **Calidad de traducción:** las traducciones existen en código, pero no se ha realizado revisión lingüística humana en esta auditoría. Medir campos vacíos/truncados y revisar manualmente nombres, title, description, FAQ y contenido visible por idioma.
3. **Contenido no equivalente:** mantener alternates solo cuando el destino exista y represente la misma entidad. El generador de sitemap usa la misma herramienta/guía en las tres locales; comprobar las rutas en producción.
4. **Metadatos:** el inventario recoge titles/descriptions de herramientas y guías; home y páginas estáticas figuran como metadata localizada porque el contenido procede de diccionarios. Revisar longitudes y duplicados tras obtener HTML SSR.
5. **Sitemap:** 204 URL declaradas, 4 alternates por entrada (`es`, `ca`, `en`, `x-default`) y sin `lastmod`. Confirmar que todas respondan 200 y sean canónicas antes de enviar cambios en Search Console.

No se debe decidir el idioma por IP ni forzar redirecciones del usuario que pisa una URL localizada; la preferencia explícita debe seguir teniendo prioridad sobre detección automática.
