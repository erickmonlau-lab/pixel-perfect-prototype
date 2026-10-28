# AdSense y consentimiento — estado técnico verificado

**Revisado:** 28-10-2026. Este informe separa la evidencia pública y de repositorio de los datos privados que solo puede confirmar la cuenta de AdSense.

## Estado

| Área | Resultado | Evidencia y límite |
|---|---|---|
| Cuenta/aprobación | **No verificada** | No hay sesión ni acceso conectado a AdSense. No se afirma que el sitio esté aprobado o pendiente. |
| Código público | **Script presente** | El HTML público de `/es` incluye `adsbygoogle.js` con el publisher `ca-pub-7477829897419785`. Esto acredita el código, no aprobación ni anuncios servidos. |
| Unidades estáticas | **No encontradas en HTML SSR** | No aparecen `<ins class="adsbygoogle">` en el HTML inicial revisado. La configuración de Auto ads y unidades dinámicas de la cuenta no se puede deducir de esto. |
| `ads.txt` | **Publicado y coincidente** | `https://breadpdf.com/ads.txt` responde 200 y declara `google.com, pub-7477829897419785, DIRECT, f08c47fec0942fa0`, coincidente con el código del sitio. La recepción de ese registro por AdSense sigue sin verificarse en la cuenta. |
| CMP/TCF | **Carga detectada; certificación/configuración no verificadas** | Lighthouse en producción observó solicitudes a `fundingchoicesmessages.google.com`, consistente con Google Funding Choices cargándose en cliente. Esto no acredita certificación TCF, consentimiento válido, configuración publicada ni el estado de los mensajes en la cuenta. El repositorio no integra una CMP propia. |
| Anuncios servidos | **No verificado** | No se pudo revisar la cuenta, la respuesta de los slots o los informes de política. No se confunde carga del script con anuncios publicados. |
| Configuración local | **Flag de ejemplo apagado** | `.env.example` fija `VITE_ADSENSE_ENABLED=false`; `src/routes/__root.tsx` incluye el script cuando el build recibe `true`. El script visto en producción demuestra que el entorno publicado no coincide con el ejemplo local o que la configuración se inyecta de otro modo. |

## Hallazgos y seguridad de la integración

- La cuenta y su política de Auto ads deben revisarse por un usuario autorizado. No cambiar el publisher ID ni inventar unidades.
- El 28-10-2026, el HTML público de `/es` respondió 200 con exactamente un `adsbygoogle.js` oficial y sin temporizador propio de espera; la bandera del build activo también aparece habilitada. La cabecera es asíncrona. Es evidencia de integración técnica y carga temprana, no de aprobación ni de anuncios servidos.
- La guía de Google exige una CMP certificada por Google integrada con TCF para servir anuncios personalizados a usuarios del EEE, Reino Unido y Suiza. Google Privacy & Messaging es una opción que se configura desde AdSense. Consulte [Consent requirements for serving ads in the EEA, the UK, and Switzerland](https://support.google.com/adsense/answer/13554116?hl=en) y [crear un mensaje de normativa europea](https://support.google.com/adsense/answer/10960768?hl=en-GB).
- `VITE_ADSENSE_NPA=true` no es señal de consentimiento ni sustituye a una CMP. No usarlo para eludir la señal TCF.
- El texto de cookies en ES/CA/EN menciona controles de consentimiento que no aparecen en la implementación local revisada. Hay que contrastarlo con la CMP que esté configurada en AdSense y alinear el texto con el comportamiento real.
- GTM se carga después de interacción o demora; el repositorio envía `page_view` desde el cliente sin comprobar una señal de consentimiento. Los tags reales del contenedor no están disponibles, por lo que su comportamiento requiere revisión desde Tag Manager.
- No se encontró uso de componentes `AdSlot` en las rutas revisadas; los espacios y densidad de anuncios reales deben comprobarse en el panel y en los dispositivos objetivo.

## Pasos manuales pendientes en la cuenta

1. En AdSense, confirmar estado de aprobación del sitio `breadpdf.com`, advertencias del Centro de políticas, estado de `ads.txt` y si Auto ads está habilitado.
2. En **Privacidad y mensajes**, publicar el mensaje europeo para ES/CA/EN y comprobar que la CMP está certificada e integrada con IAB TCF. Probar aceptar, rechazar y retirar/editar la decisión.
3. Confirmar si la cuenta sirve anuncios personalizados, no personalizados o Auto ads, junto con las unidades activas y sus ubicaciones.
4. Compartir una captura/exportación de estos estados o facilitar una conexión de solo lectura antes de declarar la integración aprobada.

## Decisión técnica

No se añade una CMP de terceros ni se modifica el entorno de producción sin la configuración de cuenta que genera la CMP. Tampoco se apaga permanentemente la monetización: el código contempla activación por entorno, `ads.txt` está publicado y el script ya aparece en producción. El cambio que falta es vincular la publicación de anuncios a la configuración real de consentimiento y validar la experiencia con la CMP activa; con la evidencia disponible no es seguro afirmar que ese paso esté completo.
