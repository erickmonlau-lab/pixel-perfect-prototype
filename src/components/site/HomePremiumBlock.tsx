import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLocale } from "@/lib/i18n/context";
import { SECTION_ROUTE, premiumParams } from "@/lib/i18n/routing";
import { BRAND_ASSETS } from "@/lib/brand";
import { PremiumCrownIcon } from "./PremiumCrownIcon";

// ============================================================
// CUSTOM SEMANTIC SAAS ICONS (Solid, semantic, distinct product identity)
// ============================================================

/** Ad-free: Clean document with clear cancellation of ads */
function AdFreeIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="4" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </svg>
  );
}

/** Local Privacy: High-security shield with check */
function SecurePrivacyIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9.5 11.5 2 2 3.5-3.5" />
    </svg>
  );
}

/** Batch Processing: Stapped documents with process arrows */
function BatchOperationsIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="12" height="14" x="2" y="2" rx="2.5" />
      <path d="M6 18h12a2.5 2.5 0 0 0 2.5-2.5V6" />
      <path d="M10 22h10a2.5 2.5 0 0 0 2.5-2.5V10" />
    </svg>
  );
}

/** Priority Speed: Document with instant velocity bolt */
function PrioritySpeedIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function HomePremiumBlock() {
  const { locale } = useLocale();

  const copy = {
    es: {
      eyebrow: "BREADPDF PREMIUM",
      titleLine1: "Trabaja con BreadPDF",
      titleLine2: "a otro nivel",
      subtitle:
        "Una experiencia profesional concebida para usuarios y despachos que necesitan agilidad, cero distracciones y máxima privacidad documental.",
      cta: "Descubrir Premium",
      features: [
        {
          title: "Experiencia 100% sin anuncios",
          desc: "Entorno limpio, despejado y sin banners de publicidad para concentrarte en tus documentos.",
          isComingSoon: false,
          Icon: AdFreeIcon,
          // CARD 1: ROJO SÓLIDO BREADPDF ACCESIBLE (#B91C1C)
          theme: {
            bg: "bg-[#B91C1C]",
            border: "border-[#B91C1C]",
            textTitle: "text-white",
            textDesc: "text-[#FEF2F2]",
            iconCircle: "bg-white text-[#B91C1C]",
            shadow: "shadow-[0_8px_24px_rgba(185,28,28,0.28)]",
          },
        },
        {
          title: "Privacidad local y segura",
          desc: "Tus documentos se procesan en tu propio navegador siempre que es técnicamente viable. Sin intermediarios.",
          isComingSoon: false,
          Icon: SecurePrivacyIcon,
          // CARD 2: NAVY SÓLIDO (#0F172A)
          theme: {
            bg: "bg-[#0F172A]",
            border: "border-[#0F172A]",
            textTitle: "text-white",
            textDesc: "text-slate-200",
            iconCircle: "bg-white text-[#0F172A]",
            shadow: "shadow-[0_8px_24px_rgba(15,23,42,0.22)]",
          },
        },
        {
          title: "Procesamiento por lotes",
          desc: "Aplica conversiones, compresiones y firmas sobre múltiples archivos PDF a la vez.",
          isComingSoon: true,
          statusLabel: "Próximamente",
          Icon: BatchOperationsIcon,
          // CARD 3: CREMA / BEIGE SÓLIDO (#FDF2E7)
          theme: {
            bg: "bg-[#FDF2E7]",
            border: "border-[#FAD9BC]",
            textTitle: "text-[#4A1D13]",
            textDesc: "text-[#6E3524]",
            iconCircle: "bg-[#592316] text-white",
            shadow: "shadow-[0_8px_24px_rgba(89,35,22,0.08)]",
            badgeBg: "bg-[#592316] text-white",
          },
        },
        {
          title: "Rendimiento prioritario",
          desc: "Procesamiento optimizado y respuesta inmediata para documentos voluminosos o de alta resolución.",
          isComingSoon: false,
          Icon: PrioritySpeedIcon,
          // CARD 4: CORAL CÁLIDO SÓLIDO (#FFE4E0)
          theme: {
            bg: "bg-[#FFE4E0]",
            border: "border-[#FFC8C0]",
            textTitle: "text-[#7F1D1D]",
            textDesc: "text-[#991B1B]",
            iconCircle: "bg-[#EC3C2D] text-white",
            shadow: "shadow-[0_8px_24px_rgba(236,60,45,0.12)]",
          },
        },
      ],
    },
    ca: {
      eyebrow: "BREADPDF PREMIUM",
      titleLine1: "Treballa amb BreadPDF",
      titleLine2: "a un altre nivell",
      subtitle:
        "Una experiència professional concebuda per a usuaris i equips que necessiten agilitat, zero distraccions i màxima privadesa documental.",
      cta: "Descobrir Premium",
      features: [
        {
          title: "Experiència 100% sense anuncis",
          desc: "Entorn net, àgil i sense publicitat per concentrar-te en la teva feina diària.",
          isComingSoon: false,
          Icon: AdFreeIcon,
          theme: {
            bg: "bg-[#B91C1C]",
            border: "border-[#B91C1C]",
            textTitle: "text-white",
            textDesc: "text-[#FEF2F2]",
            iconCircle: "bg-white text-[#B91C1C]",
            shadow: "shadow-[0_8px_24px_rgba(185,28,28,0.28)]",
          },
        },
        {
          title: "Privadesa local i segura",
          desc: "Els teus documents es processen al teu navegador sempre que és tècnicament viable.",
          isComingSoon: false,
          Icon: SecurePrivacyIcon,
          theme: {
            bg: "bg-[#0F172A]",
            border: "border-[#0F172A]",
            textTitle: "text-white",
            textDesc: "text-slate-200",
            iconCircle: "bg-white text-[#0F172A]",
            shadow: "shadow-[0_8px_24px_rgba(15,23,42,0.22)]",
          },
        },
        {
          title: "Processament per lots",
          desc: "Aplica conversions, compressions i signatures sobre diversos fitxers alhora.",
          isComingSoon: true,
          statusLabel: "Properament",
          Icon: BatchOperationsIcon,
          theme: {
            bg: "bg-[#FDF2E7]",
            border: "border-[#FAD9BC]",
            textTitle: "text-[#4A1D13]",
            textDesc: "text-[#6E3524]",
            iconCircle: "bg-[#592316] text-white",
            shadow: "shadow-[0_8px_24px_rgba(89,35,22,0.08)]",
            badgeBg: "bg-[#592316] text-white",
          },
        },
        {
          title: "Rendiment prioritari",
          desc: "Processament optimitzat i resposta immediata per a documents de gran volum.",
          isComingSoon: false,
          Icon: PrioritySpeedIcon,
          theme: {
            bg: "bg-[#FFE4E0]",
            border: "border-[#FFC8C0]",
            textTitle: "text-[#7F1D1D]",
            textDesc: "text-[#991B1B]",
            iconCircle: "bg-[#EC3C2D] text-white",
            shadow: "shadow-[0_8px_24px_rgba(236,60,45,0.12)]",
          },
        },
      ],
    },
    en: {
      eyebrow: "BREADPDF PREMIUM",
      titleLine1: "Take BreadPDF",
      titleLine2: "to the next level",
      subtitle:
        "A dedicated professional suite for individuals and teams needing speed, uninterrupted workflows, and strict document privacy.",
      cta: "Explore Premium",
      features: [
        {
          title: "100% Ad-free experience",
          desc: "A clean, distraction-free environment with zero ads so you can focus entirely on your work.",
          isComingSoon: false,
          Icon: AdFreeIcon,
          theme: {
            bg: "bg-[#B91C1C]",
            border: "border-[#B91C1C]",
            textTitle: "text-white",
            textDesc: "text-[#FEF2F2]",
            iconCircle: "bg-white text-[#B91C1C]",
            shadow: "shadow-[0_8px_24px_rgba(185,28,28,0.28)]",
          },
        },
        {
          title: "Local & secure privacy",
          desc: "Documents are processed right inside your browser whenever technically supported. No leaks.",
          isComingSoon: false,
          Icon: SecurePrivacyIcon,
          theme: {
            bg: "bg-[#0F172A]",
            border: "border-[#0F172A]",
            textTitle: "text-white",
            textDesc: "text-slate-200",
            iconCircle: "bg-white text-[#0F172A]",
            shadow: "shadow-[0_8px_24px_rgba(15,23,42,0.22)]",
          },
        },
        {
          title: "Multi-file batch operations",
          desc: "Execute transformations, compression, and tasks across multiple files concurrently.",
          isComingSoon: true,
          statusLabel: "Coming soon",
          Icon: BatchOperationsIcon,
          theme: {
            bg: "bg-[#FDF2E7]",
            border: "border-[#FAD9BC]",
            textTitle: "text-[#4A1D13]",
            textDesc: "text-[#6E3524]",
            iconCircle: "bg-[#592316] text-white",
            shadow: "shadow-[0_8px_24px_rgba(89,35,22,0.08)]",
            badgeBg: "bg-[#592316] text-white",
          },
        },
        {
          title: "High-priority performance",
          desc: "Accelerated execution and instant responsiveness for large or complex PDF files.",
          isComingSoon: false,
          Icon: PrioritySpeedIcon,
          theme: {
            bg: "bg-[#FFE4E0]",
            border: "border-[#FFC8C0]",
            textTitle: "text-[#7F1D1D]",
            textDesc: "text-[#991B1B]",
            iconCircle: "bg-[#EC3C2D] text-white",
            shadow: "shadow-[0_8px_24px_rgba(236,60,45,0.12)]",
          },
        },
      ],
    },
  };

  const current = copy[locale as "es" | "ca" | "en"] ?? copy.es;

  return (
    <section className="cv-premium relative overflow-hidden border-t border-b border-[#E2E8F0] bg-linear-to-b from-[#FFFDFD] via-[#FAFBFD] to-[#F1F5F9]/60 py-20 sm:py-28">
      {/* Delicate BreadPDF Brand Ambient Aura */}
      <div
        className="pointer-events-none absolute -left-32 top-10 size-[520px] rounded-full bg-[#EC3C2D]/4 blur-[160px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 size-[520px] rounded-full bg-[#DE834C]/4 blur-[160px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        {/* Main Card Container with Depth, High SaaS Presence & Generous Padding */}
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-16 shadow-[0_12px_40px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)]">
          {/* Subtle warm glow inside top-right corner */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#EC3C2D]/6 blur-[100px]"
            aria-hidden
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* ============================================================
                LEFT COLUMN: BreadPDF Premium Hero + Solid CTA + Large Mascot
                ============================================================ */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Prominent BreadPDF Brand Eyebrow Badge (100% Solid) */}
              <div className="flex items-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#B91C1C] bg-[#B91C1C] px-4 py-1.5 text-[12.5px] sm:text-[13.5px] font-extrabold tracking-widest text-white uppercase shadow-sm">
                  <PremiumCrownIcon className="size-3.5 text-white" />
                  {current.eyebrow}
                </span>
              </div>

              {/* Dominant SaaS H2 Title: Line 1 in Navy, Line 2 in BreadPDF Red */}
              <h2 className="mt-5 text-[2.4rem] sm:text-[2.85rem] lg:text-[3.25rem] font-extrabold tracking-[-0.035em] leading-[1.08]">
                <span className="block text-[#0F172A]">{current.titleLine1}</span>
                <span className="block text-brand-pdf">{current.titleLine2}</span>
              </h2>

              {/* Crisp, balanced subtitle */}
              <p className="mt-4 max-w-[490px] text-[16.5px] sm:text-[17.5px] leading-[1.6] text-[#475569] text-pretty">
                {current.subtitle}
              </p>

              {/* Action Area: Large Transparent Mascot + Solid CTA (NO boxes, NO frames, NO orange borders) */}
              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-start gap-7 sm:gap-10">
                {/* 100% Solid CTA Button */}
                <div className="shrink-0">
                  <Link
                    to={SECTION_ROUTE}
                    params={premiumParams(locale)}
                    className="inline-flex h-[52px] sm:h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#C53024] px-8 text-[16px] sm:text-[16.5px] font-bold text-white shadow-[0_6px_22px_rgba(197,48,36,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B91C1C] hover:shadow-[0_10px_28px_rgba(185,28,28,0.48)] active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-brand-pdf/25"
                  >
                    <span>{current.cta}</span>
                    <ArrowRight className="size-5 stroke-[2.4]" />
                  </Link>
                </div>

                {/* Official Character — BreadPDF Running Mascot (Velocidad / Productividad Premium) */}
                <div className="relative shrink-0 flex items-center pl-1 sm:pl-3">
                  <img
                    src={BRAND_ASSETS.mascots.run}
                    alt="BreadPDF Running Mascot"
                    width={429}
                    height={422}
                    className="h-28 sm:h-36 lg:h-[185px] w-auto object-contain select-none pointer-events-none drop-shadow-md transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* ============================================================
                RIGHT COLUMN: 4 Substantial 100% OPAQUE & SOLID COLOR CARDS
                (Card 1: Red | Card 2: Navy | Card 3: Cream | Card 4: Coral)
                ============================================================ */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
              {current.features.map((feat, idx) => {
                const Icon = feat.Icon;
                const theme = feat.theme;

                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 border transition-all duration-300 hover:-translate-y-1 ${theme.bg} ${theme.border} ${theme.shadow}`}
                    style={{ opacity: 1 }}
                  >
                    <div>
                      {/* Top Row: 48-52px Solid Contrasted Circle Icon + Solid 'Próximamente' pill */}
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex size-12 sm:size-[52px] shrink-0 items-center justify-center rounded-2xl shadow-sm ${theme.iconCircle}`}
                        >
                          <Icon className="size-6 sm:size-6.5 stroke-[2.2]" />
                        </span>

                        {feat.isComingSoon && (
                          <span className={`rounded-full px-3 py-1 text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider shadow-2xs ${theme.badgeBg ?? "bg-[#0F172A] text-white"}`}>
                            {feat.statusLabel}
                          </span>
                        )}
                      </div>

                      {/* Card Title (18-20px) with custom high-contrast text color */}
                      <h3 className={`mt-5 text-[18px] sm:text-[19.5px] font-bold tracking-tight leading-snug ${theme.textTitle}`}>
                        {feat.title}
                      </h3>

                      {/* Card Description (15-16px) with custom high-contrast text color */}
                      <p className={`mt-2.5 text-[14.5px] sm:text-[15.5px] leading-relaxed ${theme.textDesc}`}>
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
