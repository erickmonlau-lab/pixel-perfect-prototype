import { useLocale } from "@/lib/i18n/context";

// Custom SaaS clean icons (lineal, moderno, reconocible, sin sparkles/IA)
function LocalPrivacyIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Escudo con documento / check interno */}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9.5 11.5l2 2 3.5-3.5" />
    </svg>
  );
}

function FastExecutionIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Rayo de acción inmediata con vector limpio */}
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function AllInOneIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Documentos organizados y apilados en un solo lugar */}
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
          solidBg: "bg-[#0284C7]", // Azul de seguridad
          shadowGlow: "shadow-[0_8px_20px_rgba(2,132,199,0.22)]",
          title: "Privacidad local",
          desc: "Tus archivos se procesan en tu propio dispositivo siempre que la tecnología lo permite. Sin intermediarios ni almacenamiento en servidores externos.",
        },
        {
          Icon: FastExecutionIcon,
          solidBg: "bg-[#2563EB]", // Azul primario
          shadowGlow: "shadow-[0_8px_20px_rgba(37,99,235,0.22)]",
          title: "Sin esperas innecesarias",
          desc: "Empieza a trabajar con tus documentos al instante desde el navegador, sin colas de conversión remotas ni registros obligatorios.",
        },
        {
          Icon: AllInOneIcon,
          solidBg: "bg-[#7C3AED]", // Morado organización
          shadowGlow: "shadow-[0_8px_20px_rgba(124,58,237,0.22)]",
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
          solidBg: "bg-[#0284C7]",
          shadowGlow: "shadow-[0_8px_20px_rgba(2,132,199,0.22)]",
          title: "Privadesa local",
          desc: "Els teus fitxers es processen al teu propi dispositiu quan la tecnologia ho permet. Sense intermediaris ni servidors externs.",
        },
        {
          Icon: FastExecutionIcon,
          solidBg: "bg-[#2563EB]",
          shadowGlow: "shadow-[0_8px_20px_rgba(37,99,235,0.22)]",
          title: "Sense esperes innecessàries",
          desc: "Comença a treballar a l'instant des del navegador, sense cues de conversió remotes ni registres obligatoris.",
        },
        {
          Icon: AllInOneIcon,
          solidBg: "bg-[#7C3AED]",
          shadowGlow: "shadow-[0_8px_20px_rgba(124,58,237,0.22)]",
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
          solidBg: "bg-[#0284C7]",
          shadowGlow: "shadow-[0_8px_20px_rgba(2,132,199,0.22)]",
          title: "Local privacy",
          desc: "Files are processed directly on your own device whenever technically supported. Never stored or retained on remote servers.",
        },
        {
          Icon: FastExecutionIcon,
          solidBg: "bg-[#2563EB]",
          shadowGlow: "shadow-[0_8px_20px_rgba(37,99,235,0.22)]",
          title: "No unnecessary waiting",
          desc: "Start processing documents instantly straight inside your browser, with zero remote queues and no sign-up barriers.",
        },
        {
          Icon: AllInOneIcon,
          solidBg: "bg-[#7C3AED]",
          shadowGlow: "shadow-[0_8px_20px_rgba(124,58,237,0.22)]",
          title: "Everything in one place",
          desc: "A cohesive, complete suite of focused utilities to compress, organize, convert, edit, and secure your PDF documents.",
        },
      ],
    },
  };

  const current = copy[locale as "es" | "ca" | "en"] ?? copy.es;

  return (
    <section className="cv-trust border-b border-[#E5E7EB] bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        {/* Encabezado con mayor jerarquía y presencia visual */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B91C1C] bg-[#B91C1C] px-4 py-1.5 text-[12.5px] sm:text-[13.5px] font-bold tracking-widest text-white uppercase shadow-xs">
            <span className="size-2 rounded-full bg-white shrink-0" />
            {current.eyebrow}
          </span>
          <h2 className="mt-5 text-[2.4rem] sm:text-[2.85rem] lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.08] text-[#0F172A]">
            {current.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[17px] sm:text-[18.5px] leading-relaxed text-[#475569]">
            {current.subtitle}
          </p>
        </div>

        {/* 3 Tarjetas de beneficios — Escala aumentada, padding generoso, iconos 52px con glifo SaaS limpio */}
        <div className="mt-16 sm:mt-20 grid gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {current.items.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-start rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-9 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
              >
                {/* Icono SÓLIDO 52px con glifo nítido blanco */}
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex size-[52px] sm:size-[56px] shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-105 ${item.solidBg} ${item.shadowGlow}`}
                  >
                    <Icon className="size-7 stroke-[2.2]" />
                  </span>
                  <h3 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-[#0F172A] leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-[15.5px] sm:text-[16px] leading-relaxed text-[#64748B]">
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
