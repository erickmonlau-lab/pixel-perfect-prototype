# AdSense y consentimiento — revisión técnica

**Estado:** publicidad desactivada por defecto en el ejemplo; CMP no encontrada en el código revisado. Este documento es técnico, no asesoramiento jurídico.

**Revisión:** 28-10-2026. `public/ads.txt` está presente y su publisher ID coincide con la configuración central de BreadPDF; no se pudo comprobar su respuesta HTTP en producción. La guía oficial de Google consultada mantiene el requisito de CMP certificada e integrada con TCF para anuncios personalizados en EEE/Reino Unido/Suiza.

## Hallazgos

1. `src/routes/__root.tsx` cargaba `adsbygoogle.js` en todas las páginas desde un ID de marca fijo. Esto contradecía `.env.example`, donde AdSense estaba marcado como no activar, y el flag de los componentes de slots.
2. El script ahora solo se añade cuando `VITE_ADSENSE_ENABLED === "true"`. `.env.example` declara el flag `false` y `src/lib/ads/config.ts` ya no describe anuncios no personalizados como sustitutos de un CMP.
3. No se encontró interfaz/código de una plataforma CMP ni una señal de consentimiento. El texto de cookies en ES/CA/EN menciona un futuro panel que permitiría aceptar, configurar/rechazar publicidad y cambiar la decisión. Esa capacidad no existe en el código revisado.
4. GTM también se carga desde el root tras interacción/demora y el evento `page_view` se envía en el cliente sin comprobar consentimiento. La condición de carga de AdSense no cambia este comportamiento. Requiere una decisión aparte para analítica y una integración de consentimiento antes de activar etiquetas no esenciales.
5. `VITE_ADSENSE_NPA=true` no prueba que se haya obtenido consentimiento ni que una implementación cumpla requisitos. No usar este valor como excepción o garantía.

## Antes de activar anuncios

- Seleccionar una CMP adecuada para las regiones y modos de anuncios previstos, y validar requisitos actuales directamente con Google.
- Cargar anuncios y etiquetas de analítica solo después de la señal de consentimiento aplicable, con opción accesible de volver a preferencias y retirar/modificar la decisión.
- Alinear política de cookies, controles visibles, categorías de almacenamiento y comportamiento técnico en ES/CA/EN. Revisar la red antes/después de aceptar y rechazar.
- Validar inventario, slots, `ads.txt`, informes de política y anuncios no personalizados/personalizados con la configuración real de la cuenta.
- Mantener `VITE_ADSENSE_ENABLED=false` hasta completar lo anterior.

Google describe los requisitos CMP para anuncios servidos a usuarios del EEE/Reino Unido/Suiza aquí: [Google AdSense — CMP y consentimiento](https://support.google.com/adsense/answer/13554116?hl=en). Verificar la página oficial de nuevo antes de implementar porque los requisitos pueden cambiar.
