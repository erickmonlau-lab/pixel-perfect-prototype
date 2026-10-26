import { useLocale } from "@/lib/i18n/context";

export function ConfidenceMarquee() {
  const { locale } = useLocale();

  const messages = {
    es: [
      "⚡ 100% Gratis sin suscripción",
      "🔒 Archivos nunca salen de tu navegador",
      "🥖 Panadería artesanal de documentos",
      "🚀 Procesamiento instantáneo en RAM (WASM)",
      "✨ Sin marcas de agua ni límites diarios",
      "📂 51 Herramientas PDF profesionales",
      "🛡️ Privacidad absoluta según RGPD",
    ],
    ca: [
      "⚡ 100% Gratuït sense subscripció",
      "🔒 Els arxius mai surten del teu navegador",
      "🥖 Forn artesanal de documents",
      "🚀 Processament instantani a la RAM (WASM)",
      "✨ Sense marques d'aigua ni límits diaris",
      "📂 51 Eines PDF professionals",
      "🛡️ Privadesa absoluta segons RGPD",
    ],
    en: [
      "⚡ 100% Free with no subscription",
      "🔒 Files never leave your browser",
      "🥖 Handcrafted document bakery",
      "🚀 Instant RAM execution via WASM",
      "✨ No watermarks or daily limits",
      "📂 51 Professional PDF tools",
      "🛡️ Full privacy & zero telemetry",
    ],
  };

  const list = messages[locale] || messages.es;
  const repeated = [...list, ...list];

  return (
    <div className="relative z-20 w-full overflow-hidden border-b-2 border-[#0F0F12] bg-[#FEF08A] py-3.5 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-8">
        {repeated.map((msg, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-[#0F0F12] whitespace-nowrap">
              {msg}
            </span>
            <span className="size-2 rounded-full bg-[#E8372C] border border-[#0F0F12]" />
          </div>
        ))}
      </div>
    </div>
  );
}
