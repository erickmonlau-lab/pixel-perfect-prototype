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
      title: "TUS DOCUMENTOS, BAJO TU CONTROL",
      subtitle: "Privacidad verificable, velocidad directa y una experiencia clara sin fricciones.",
      items: [
        {
          Icon: LocalPrivacyIcon,
          title: "Procesamiento en tu navegador",
          desc: "Tus archivos se procesan en la memoria local de tu dispositivo mediante librerías del cliente. Sin subidas obligatorias a la nube ni registros.",
          colorBg: "bg-[#06B6D4]", // Turquesa / Cian corporativo
          topBorder: "border-t-[6px] border-t-[#06B6D4]",
          hoverShadow: "hover:shadow-[7px_7px_0_#06B6D4]",
        },
        {
          Icon: FastExecutionIcon,
          title: "Velocidad inmediata",
          desc: "Ejecuta conversiones, compresiones y recortes al momento. Cero colas de servidor y descarga directa sin pasos intermedios innecesarios.",
          colorBg: "bg-[#EC3C2D]", // Rojo de marca BreadPDF
          topBorder: "border-t-[6px] border-t-[#EC3C2D]",
          hoverShadow: "hover:shadow-[7px_7px_0_#EC3C2D]",
        },
        {
          Icon: AllInOneIcon,
          title: "Todo en un solo lugar",
          desc: "51 herramientas PDF organizadas por categorías con el mismo diseño claro: comprimir, unir, dividir, firmar, editar y convertir.",
          colorBg: "bg-[#8B5CF6]", // Morado corporativo
          topBorder: "border-t-[6px] border-t-[#8B5CF6]",
          hoverShadow: "hover:shadow-[7px_7px_0_#8B5CF6]",
        },
      ],
    },
    ca: {
      eyebrow: "DISSENYAT PER SER SIMPLE",
      title: "ELS TEUS DOCUMENTS, SOTA EL TEU CONTROL",
      subtitle: "Privadesa verificable, velocitat directa i una experiència clara sense friccions.",
      items: [
        {
          Icon: LocalPrivacyIcon,
          title: "Processament al teu navegador",
          desc: "Els teus fitxers es processen a la memòria local del dispositiu mitjançant llibreries de client. Sense càrregues al núvol ni registres.",
          colorBg: "bg-[#06B6D4]",
          topBorder: "border-t-[6px] border-t-[#06B6D4]",
          hoverShadow: "hover:shadow-[7px_7px_0_#06B6D4]",
        },
        {
          Icon: FastExecutionIcon,
          title: "Velocitat immediata",
          desc: "Executa conversions, compressions i talls a l'instant. Zero cues de servidor i descàrrega directa sense passos intermedis.",
          colorBg: "bg-[#EC3C2D]",
          topBorder: "border-t-[6px] border-t-[#EC3C2D]",
          hoverShadow: "hover:shadow-[7px_7px_0_#EC3C2D]",
        },
        {
          Icon: AllInOneIcon,
          title: "Tot en un sol lloc",
          desc: "51 eines PDF organitzades per categories amb el mateix disseny clar: comprimir, unir, dividir, signar, editar i convertir.",
          colorBg: "bg-[#8B5CF6]",
          topBorder: "border-t-[6px] border-t-[#8B5CF6]",
          hoverShadow: "hover:shadow-[7px_7px_0_#8B5CF6]",
        },
      ],
    },
    en: {
      eyebrow: "DESIGNED TO BE SIMPLE",
      title: "YOUR DOCUMENTS, UNDER YOUR CONTROL",
      subtitle: "Verifiable privacy, instant speed, and a direct friction-free experience.",
      items: [
        {
          Icon: LocalPrivacyIcon,
          title: "In-browser processing",
          desc: "Your files are processed in local device memory using client-side libraries. No mandatory cloud uploads or sign-up walls.",
          colorBg: "bg-[#06B6D4]",
          topBorder: "border-t-[6px] border-t-[#06B6D4]",
          hoverShadow: "hover:shadow-[7px_7px_0_#06B6D4]",
        },
        {
          Icon: FastExecutionIcon,
          title: "Immediate execution",
          desc: "Compress, convert, and split instantly. Zero server queues and immediate downloads without unnecessary intermediate steps.",
          colorBg: "bg-[#EC3C2D]",
          topBorder: "border-t-[6px] border-t-[#EC3C2D]",
          hoverShadow: "hover:shadow-[7px_7px_0_#EC3C2D]",
        },
        {
          Icon: AllInOneIcon,
          title: "Everything in one place",
          desc: "51 PDF tools organized by categories sharing the same clean design: compress, merge, split, sign, edit, and convert.",
          colorBg: "bg-[#8B5CF6]",
          topBorder: "border-t-[6px] border-t-[#8B5CF6]",
          hoverShadow: "hover:shadow-[7px_7px_0_#8B5CF6]",
        },
      ],
    },
  };

  const current = copy[locale as "es" | "ca" | "en"] ?? copy.es;

  return (
    <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera coordinada con la identidad visual: Titular 44–52px */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center rounded-lg border-2 border-[#0F0F12] bg-[#D93426] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
            {current.eyebrow}
          </span>
          
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.03em] leading-[1.08] text-[#0F0F12] uppercase">
            {current.title}
          </h2>
          
          <p className="mx-auto mt-3.5 max-w-[680px] text-[17px] sm:text-[18px] leading-[1.5] text-[#0F0F12] font-medium">
            {current.subtitle}
          </p>
        </div>

        {/* 3 Bloques visuales con paleta del catálogo: Las 3 tarjetas en blanco sólido con iconos de 52px y padding de 28-32px */}
        <div className="grid gap-6 lg:gap-8 max-w-6xl mx-auto md:grid-cols-3">
          {current.items.map((item, idx) => {
            const Icon = item.Icon;

            return (
              <div
                key={idx}
                className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] ${
                  item.topBorder
                } bg-[#FFFFFF] p-7 sm:p-8 shadow-[5px_5px_0_#0F0F12] transition-all hover:-translate-y-1 ${
                  item.hoverShadow
                }`}
              >
                <div className="flex items-center justify-start gap-4 mb-6">
                  <span
                    className={`inline-flex size-[52px] sm:size-[56px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${
                      item.colorBg
                    } text-white shadow-[3px_3px_0_#0F0F12] transition-transform group-hover:scale-105`}
                  >
                    <Icon className="size-7 stroke-[2.4]" />
                  </span>
                </div>

                <h3 className="text-[23px] sm:text-[25px] font-black tracking-tight leading-snug text-[#0F0F12]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[16px] sm:text-[17px] leading-[1.5] font-medium text-[#0F0F12]">
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
