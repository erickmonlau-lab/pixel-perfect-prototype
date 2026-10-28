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
  // Paso 01 (Sube): Rojo corporativo BreadPDF (#EC3C2D)
  // Paso 02 (Ajusta): Azul corporativo (#2563EB)
  // Paso 03 (Descarga): Morado corporativo (#8B5CF6)
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
        
        {/* Cabecera de la sección: Jerarquía rotunda con etiqueta roja y textos claros (42–48px) */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center rounded-lg border-2 border-[#0F0F12] bg-[#D93426] px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#0F0F12]">
            {c.eyebrow}
          </span>
          
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0F0F12] tracking-tight leading-[1.08] uppercase">
            {c.title}
          </h2>
          
          <p className="mt-3.5 text-[17px] sm:text-[18px] font-medium text-[#0F0F12] leading-[1.5] max-w-2xl mx-auto">
            {c.sub}
          </p>
        </div>

        {/* 3 Tarjetas de Pasos: Superficies blancas sólidas con iconos 48-56px, números 48px peso 800, títulos 22-25px, desc 16-18px */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {c.steps.map((step, idx) => {
            const Icon = step.icon;
            const theme = STEP_THEMES[idx] ?? STEP_THEMES[0];

            return (
              <div
                key={step.num}
                className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] ${theme.topBorder} bg-[#FFFFFF] p-8 sm:p-9 shadow-[5px_5px_0_#0F0F12] hover:-translate-y-1 ${theme.hoverShadow} transition-all`}
              >
                {/* Parte Superior: Bloque de icono cuadrado sólido de 52px + Número contundente de 48px */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`flex size-[52px] sm:size-[56px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.iconBg} shadow-[3px_3px_0_#0F0F12] group-hover:scale-105 transition-transform`}>
                    <Icon className="size-7 stroke-[2.5]" />
                  </span>
                  <span className={`text-[44px] sm:text-[50px] font-black ${theme.numColor} tracking-tighter select-none tabular-nums leading-none`}>
                    {step.num}
                  </span>
                </div>

                {/* Contenido: Título H3 23-25px y Descripción legible 16.5-17.5px */}
                <h3 className="text-[23px] sm:text-[25px] font-black text-[#0F0F12] tracking-tight mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[16px] sm:text-[17px] font-medium text-[#0F0F12] leading-[1.5]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
