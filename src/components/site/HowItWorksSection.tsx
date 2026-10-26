import { useLocale } from "@/lib/i18n/context";
import { Upload, SlidersHorizontal, Download, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const { locale } = useLocale();

  const copy = {
    es: {
      eyebrow: "SIMPLE, DIRECTO Y POTENTE",
      title: "¿Cómo funciona BreadPDF?",
      sub: "Sin esperas en cola de servidor, sin instalar aplicaciones pesadas y sin marcas de agua.",
      steps: [
        {
          num: "01",
          title: "Sube tu archivo",
          desc: "Arrastra tu documento o selecciónalo. Se abre al instante en la memoria de tu dispositivo.",
          icon: Upload,
          tag: "ENTRADA",
          color: "bg-[#EF4444]",
        },
        {
          num: "02",
          title: "Ajusta y procesa",
          desc: "Elige la compresión, las páginas a unir o el formato destino. El motor WASM lo procesa en milisegundos.",
          icon: SlidersHorizontal,
          tag: "HORNEADO",
          color: "bg-[#F59E0B]",
        },
        {
          num: "03",
          title: "Descarga al momento",
          desc: "Obtén tu PDF limpio y optimizado. Nada se guarda en la nube: privacidad técnica absoluta.",
          icon: Download,
          tag: "LISTO",
          color: "bg-[#10B981]",
        },
      ],
    },
    ca: {
      eyebrow: "SIMPLE, DIRECTE I POTENT",
      title: "¿Com funciona BreadPDF?",
      sub: "Sense cues de servidor, sense instal·lar programari pesant i sense marques d'aigua.",
      steps: [
        {
          num: "01",
          title: "Puja el teu fitxer",
          desc: "Arrossega el teu document o tria'l. S'obre a l'instant a la memòria del teu dispositiu.",
          icon: Upload,
          tag: "ENTRADA",
          color: "bg-[#EF4444]",
        },
        {
          num: "02",
          title: "Ajusta i processa",
          desc: "Tria la compressió, les pàgines a unir o el format. El motor WASM ho resol en mil·lisegons.",
          icon: SlidersHorizontal,
          tag: "ENFORNAT",
          color: "bg-[#F59E0B]",
        },
        {
          num: "03",
          title: "Descarrega a l'instant",
          desc: "Obtén el teu PDF optimitzat. Res es guarda al núvol: privadesa tècnica garantida.",
          icon: Download,
          tag: "LLEST",
          color: "bg-[#10B981]",
        },
      ],
    },
    en: {
      eyebrow: "SIMPLE, DIRECT & POWERFUL",
      title: "How does BreadPDF work?",
      sub: "No server queues, no bloated software installs, and zero watermarks.",
      steps: [
        {
          num: "01",
          title: "Drop your file",
          desc: "Drag your document or pick it. It opens immediately in local client memory.",
          icon: Upload,
          tag: "INPUT",
          color: "bg-[#EF4444]",
        },
        {
          num: "02",
          title: "Configure & bake",
          desc: "Select compression, merge sequence, or target format. The WASM engine finishes in milliseconds.",
          icon: SlidersHorizontal,
          tag: "BAKE",
          color: "bg-[#F59E0B]",
        },
        {
          num: "03",
          title: "Instant download",
          desc: "Save your clean, optimized PDF right away. Zero telemetry, 100% private.",
          icon: Download,
          tag: "READY",
          color: "bg-[#10B981]",
        },
      ],
    },
  };

  const c = copy[locale] || copy.es;

  return (
    <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#FFFDF9] py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#FEF08A] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
            <Sparkles className="size-3.5 text-[#E8372C]" />
            <span>{c.eyebrow}</span>
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F0F12] tracking-tight uppercase">
            {c.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg font-medium text-slate-700 max-w-2xl mx-auto">
            {c.sub}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {c.steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative flex flex-col justify-between rounded-3xl border-3 border-[#0F0F12] bg-white p-8 sm:p-10 shadow-[6px_6px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[8px_8px_0_#0F0F12] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className={`flex size-14 items-center justify-center rounded-2xl border-2 border-[#0F0F12] ${step.color} text-white shadow-[3px_3px_0_#0F0F12] group-hover:scale-110 transition-transform`}>
                      <Icon className="size-7 stroke-[2.6]" />
                    </span>
                    <span className="inline-flex items-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-1 text-xs font-black text-white shadow-[2px_2px_0_#0F0F12]">
                      {step.tag}
                    </span>
                  </div>

                  <span className="block text-4xl sm:text-5xl font-black text-slate-200 group-hover:text-[#E8372C] transition-colors mb-2">
                    {step.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F0F12] tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
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
