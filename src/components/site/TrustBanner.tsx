import { useLocale } from "@/lib/i18n/context";

function LocalPrivacyIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9.5 11.5l2 2 3.5-3.5" />
    </svg>
  );
}

function FastExecutionIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function AllInOneIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function TrustBanner() {
  const { locale } = useLocale();

  const copy = {
    es: {
      eyebrow: "DISEÑADO PARA SER SIMPLE",
      title: "Tus documentos, bajo tu control",
      subtitle: "Privacidad garantizada, velocidad inmediata y una experiencia directa sin fricciones.",
      items: [
        {
          Icon: LocalPrivacyIcon,
          bg: "bg-[#06B6D4]", // Cian / Azul cielo
          tag: "PRIVACIDAD 100%",
          hoverShadow: "hover:shadow-[6px_6px_0_#06B6D4]",
          tint: "hover:bg-cyan-50/50",
          title: "Privacidad local",
          desc: "Tus archivos se procesan en tu propio dispositivo siempre que la tecnología lo permite. Sin intermediarios ni almacenamiento en servidores externos.",
        },
        {
          Icon: FastExecutionIcon,
          bg: "bg-[#F59E0B]", // Amarillo mostaza cálido
          tag: "ZERO WAIT TIME",
          hoverShadow: "hover:shadow-[6px_6px_0_#F59E0B]",
          tint: "hover:bg-amber-50/50",
          title: "Sin esperas innecesarias",
          desc: "Empieza a trabajar con tus documentos al instante desde el navegador, sin colas de conversión remotas ni registros obligatorios.",
        },
        {
          Icon: AllInOneIcon,
          bg: "bg-[#EC4899]", // Rosa / Magenta vivo
          tag: "SUITE COMPLETA",
          hoverShadow: "hover:shadow-[6px_6px_0_#EC4899]",
          tint: "hover:bg-pink-50/50",
          title: "Todo en un solo lugar",
          desc: "Un conjunto completo y unificado de utilidades para comprimir, organizar, convertir, editar y proteger tus archivos PDF.",
        },
      ],
    },
    ca: {
      eyebrow: "DISSENYAT PER SER SIMPLE",
      title: "Els teus documents, sota el teu control",
      subtitle: "Privadesa garantida, velocitat immediata i una experiència directa sense friccions.",
      items: [
        {
          Icon: LocalPrivacyIcon,
          bg: "bg-[#06B6D4]",
          tag: "PRIVADESA 100%",
          hoverShadow: "hover:shadow-[6px_6px_0_#06B6D4]",
          tint: "hover:bg-cyan-50/50",
          title: "Privadesa local",
          desc: "Els teus fitxers es processen al teu propi dispositiu quan la tecnologia ho permet. Sense intermediaris ni servidors externs.",
        },
        {
          Icon: FastExecutionIcon,
          bg: "bg-[#F59E0B]",
          tag: "ZERO WAIT TIME",
          hoverShadow: "hover:shadow-[6px_6px_0_#F59E0B]",
          tint: "hover:bg-amber-50/50",
          title: "Sense esperes innecessàries",
          desc: "Comença a treballar a l'instant des del navegador, sense cues de conversió remotes ni registres obligatoris.",
        },
        {
          Icon: AllInOneIcon,
          bg: "bg-[#EC4899]",
          tag: "SUITE COMPLETA",
          hoverShadow: "hover:shadow-[6px_6px_0_#EC4899]",
          tint: "hover:bg-pink-50/50",
          title: "Tot en un sol lloc",
          desc: "Un conjunt complet i unificat d'utilitats per comprimir, organitzar, convertir, editar i protegir els teus PDF.",
        },
      ],
    },
    en: {
      eyebrow: "DESIGNED TO BE SIMPLE",
      title: "Your documents, under your control",
      subtitle: "Guaranteed privacy, instant speed, and a direct friction-free experience.",
      items: [
        {
          Icon: LocalPrivacyIcon,
          bg: "bg-[#06B6D4]",
          tag: "100% PRIVACY",
          hoverShadow: "hover:shadow-[6px_6px_0_#06B6D4]",
          tint: "hover:bg-cyan-50/50",
          title: "Local privacy",
          desc: "Files are processed directly on your own device whenever technically supported. Never stored or retained on remote servers.",
        },
        {
          Icon: FastExecutionIcon,
          bg: "bg-[#F59E0B]",
          tag: "ZERO WAIT TIME",
          hoverShadow: "hover:shadow-[6px_6px_0_#F59E0B]",
          tint: "hover:bg-amber-50/50",
          title: "No unnecessary waiting",
          desc: "Start processing documents instantly straight inside your browser, with zero remote queues and no sign-up barriers.",
        },
        {
          Icon: AllInOneIcon,
          bg: "bg-[#EC4899]",
          tag: "COMPLETE SUITE",
          hoverShadow: "hover:shadow-[6px_6px_0_#EC4899]",
          tint: "hover:bg-pink-50/50",
          title: "Everything in one place",
          desc: "A cohesive, complete suite of focused utilities to compress, organize, convert, edit, and secure your PDF documents.",
        },
      ],
    },
  };

  const current = copy[locale as "es" | "ca" | "en"] ?? copy.es;

  return (
    <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        {/* Encabezado Neo-Brutalista con tipografía Display contundente */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#EC3C2D]">
            <span className="size-2 rounded-full bg-white shrink-0" />
            {current.eyebrow}
          </span>
          <h2 className="mt-5 text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-black tracking-[-0.035em] leading-[1.05] text-[#0F0F12]">
            {current.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[17px] sm:text-[19px] leading-relaxed text-[#334155] font-semibold">
            {current.subtitle}
          </p>
        </div>

        {/* 3 Tarjetas con colores distintivos por tarjeta (Cian, Ámbar, Rosa), bordes negros 2px y sombras duras */}
        <div className="mt-14 sm:mt-18 grid gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {current.items.map((item, idx) => {
            const Icon = item.Icon;

            return (
              <div
                key={idx}
                className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] bg-white p-8 sm:p-9 shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-1.5 ${item.hoverShadow} ${item.tint}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Icon container with distinct solid color and micro-rotation */}
                  <span
                    className={`inline-flex size-[56px] sm:size-[60px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${item.bg} text-white shadow-[3px_3px_0_#0F0F12] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon className="size-7 stroke-[2.4]" />
                  </span>
                  <span className={`inline-block rounded-md border border-[#0F0F12] ${item.bg} text-white text-[10.5px] font-black tracking-wider uppercase px-2.5 py-0.5 shadow-[1.5px_1.5px_0_#0F0F12]`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-[21px] sm:text-[23px] font-black tracking-tight leading-snug text-[#0F0F12]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15.5px] sm:text-[16.5px] leading-relaxed font-medium text-[#475569]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
