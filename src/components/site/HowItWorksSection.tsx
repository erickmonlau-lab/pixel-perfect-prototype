import { useLocale } from "@/lib/i18n/context";
import { Upload, SlidersHorizontal, Download } from "lucide-react";

export function HowItWorksSection() {
  const { locale } = useLocale();

  const copy = {
    es: {
      eyebrow: "ASÍ DE FÁCIL",
      title: "¿CÓMO FUNCIONA BREADPDF?",
      sub: "Sin esperas en cola de servidor, sin instalar aplicaciones pesadas y sin marcas de agua.",
      steps: [
        {
          num: "01",
          title: "Sube tu archivo",
          desc: "Arrastra tu documento o selecciónalo desde tu dispositivo. Se carga al instante en la memoria de tu navegador.",
          icon: Upload,
        },
        {
          num: "02",
          title: "Ajusta y procesa",
          desc: "Elige la compresión, las páginas o los parámetros requeridos. Las operaciones se resuelven en segundos sin esperas.",
          icon: SlidersHorizontal,
        },
        {
          num: "03",
          title: "Descarga al momento",
          desc: "Guarda tu PDF optimizado de forma inmediata. Tus archivos permanecen protegidos y bajo tu control total.",
          icon: Download,
        },
      ],
    },
    ca: {
      eyebrow: "AIXÍ DE FÀCIL",
      title: "¿COM FUNCIONA BREADPDF?",
      sub: "Sense cues de servidor, sense instal·lar programari pesant i sense marques d'aigua.",
      steps: [
        {
          num: "01",
          title: "Puja el teu fitxer",
          desc: "Arrossega el teu document o selecciona'l des del teu dispositiu. Es carrega a l'instant a la memòria del navegador.",
          icon: Upload,
        },
        {
          num: "02",
          title: "Ajusta i processa",
          desc: "Tria el nivell de compressió, pàgines o paràmetres necessaris. Les operacions es completen en segons.",
          icon: SlidersHorizontal,
        },
        {
          num: "03",
          title: "Descarrega a l'instant",
          desc: "Desa el teu PDF optimitzat immediatament. Els teus fitxers es mantenen protegits i sota el teu control.",
          icon: Download,
        },
      ],
    },
    en: {
      eyebrow: "AS SIMPLE AS THAT",
      title: "HOW DOES BREADPDF WORK?",
      sub: "No server queues, no bloated software installs, and zero watermarks.",
      steps: [
        {
          num: "01",
          title: "Upload your file",
          desc: "Drag and drop your document or pick it from your device. It loads right away into local browser memory.",
          icon: Upload,
        },
        {
          num: "02",
          title: "Configure & process",
          desc: "Choose compression options, page ranges or desired parameters. Everything runs swiftly in seconds.",
          icon: SlidersHorizontal,
        },
        {
          num: "03",
          title: "Download instantly",
          desc: "Save your clean, optimized PDF immediately. Your documents remain strictly protected and under your control.",
          icon: Download,
        },
      ],
    },
  };

  const c = copy[locale as "es" | "ca" | "en"] ?? copy.es;

  // Sistema de color coordinado con las herramientas de BreadPDF:
  // Paso 01 (Sube): Rojo corporativo BreadPDF (#EC3C2D / #EF4444)
  // Paso 02 (Ajusta): Azul corporativo / Word / Documentos (#2563EB)
  // Paso 03 (Descarga): Morado vibrante / Herramientas de extracción (#8B5CF6 / #7C3AED)
  const STEP_THEMES = [
    {
      topBorder: "border-t-[6px] border-t-[#EC3C2D]",
      iconBg: "bg-[#EC3C2D] text-white",
      numColor: "text-[#EC3C2D]",
      hoverShadow: "hover:shadow-[7px_7px_0_#EC3C2D]",
    },
    {
      topBorder: "border-t-[6px] border-t-[#2563EB]",
      iconBg: "bg-[#2563EB] text-white",
      numColor: "text-[#2563EB]",
      hoverShadow: "hover:shadow-[7px_7px_0_#2563EB]",
    },
    {
      topBorder: "border-t-[6px] border-t-[#8B5CF6]",
      iconBg: "bg-[#8B5CF6] text-white",
      numColor: "text-[#8B5CF6]",
      hoverShadow: "hover:shadow-[7px_7px_0_#8B5CF6]",
    },
  ];

  return (
    <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#F1F1F4] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la sección: Jerarquía rotunda con etiqueta roja y textos claros */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#0F0F12]">
            {c.eyebrow}
          </span>
          
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0F0F12] tracking-tight leading-[1.08] uppercase">
            {c.title}
          </h2>
          
          <p className="mt-3.5 text-[17px] sm:text-[18px] font-medium text-[#0F0F12] leading-[1.5] max-w-2xl mx-auto">
            {c.sub}
          </p>
        </div>

        {/* 3 Tarjetas de Pasos: Superficies blancas sólidas con franja superior e iconos en colores del catálogo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {c.steps.map((step, idx) => {
            const Icon = step.icon;
            const theme = STEP_THEMES[idx] ?? STEP_THEMES[0];

            return (
              <div
                key={step.num}
                className={`group relative flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] ${theme.topBorder} bg-[#FFFFFF] p-7 sm:p-8 shadow-[5px_5px_0_#0F0F12] hover:-translate-y-1 ${theme.hoverShadow} transition-all`}
              >
                <div>
                  {/* Parte Superior: Bloque de icono cuadrado sólido de 48px + Número contundente de 46px */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.iconBg} shadow-[2.5px_2.5px_0_#0F0F12] group-hover:scale-105 transition-transform`}>
                      <Icon className="size-6 stroke-[2.5]" />
                    </span>
                    <span className={`text-4xl sm:text-[46px] font-black ${theme.numColor} tracking-tighter select-none tabular-nums`}>
                      {step.num}
                    </span>
                  </div>

                  {/* Contenido: Título H3 22-24px y Descripción legible 16-17px */}
                  <h3 className="text-[22px] sm:text-[23px] font-black text-[#0F0F12] tracking-tight mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[16px] sm:text-[16.5px] font-medium text-[#0F0F12] leading-[1.5]">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
