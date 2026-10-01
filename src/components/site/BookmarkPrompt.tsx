import React, { useState, useEffect } from "react";
import { Bookmark, Star, X, Check, Globe } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

interface BookmarkPromptProps {
  variant?: "header" | "floating" | "banner";
  className?: string;
}

export function BookmarkPrompt({ variant = "header", className = "" }: BookmarkPromptProps) {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [dismissed, setDismissed] = useState(true); // default true to prevent SSR hydration flash

  useEffect(() => {
    // Detect OS
    if (typeof navigator !== "undefined") {
      const mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
      setIsMac(mac);
    }

    // Check localStorage for dismissal or saved status
    try {
      const isDismissed = localStorage.getItem("breadpdf_bookmark_dismissed") === "true";
      const isSaved = localStorage.getItem("breadpdf_is_bookmarked") === "true";
      setDismissed(isDismissed);
      setIsBookmarkedState(isSaved);
    } catch {
      // Ignore private mode storage errors
    }
  }, []);

  const shortcutKey = isMac ? "⌘ + D" : "Ctrl + D";

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleMarkAsDone = () => {
    setIsBookmarkedState(true);
    try {
      localStorage.setItem("breadpdf_is_bookmarked", "true");
      localStorage.setItem("breadpdf_bookmark_dismissed", "true");
    } catch {
      // Ignore
    }
    setIsOpen(false);
  };

  const handleDismissBanner = () => {
    setDismissed(true);
    try {
      localStorage.setItem("breadpdf_bookmark_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  // Translations
  const tStrings = {
    es: {
      btnTitle: "Añadir a la barra de marcadores",
      btnLabel: "Guardar en favoritos",
      modalTitle: "Añadir BreadPDF a tus Marcadores",
      modalSubtitle: "Ten siempre a mano tus herramientas PDF sin registros ni esperas.",
      step1Title: "1. Pulsa el atajo de teclado en tu navegador:",
      step1Desc: `Presiona ${shortcutKey} a la vez en esta pestaña.`,
      step2Title: "2. Selecciona la 'Barra de marcadores'",
      step2Desc: "Elige guardarlo en la barra principal para tener acceso directo en 1 clic.",
      step3Title: "O arrastra este botón:",
      dragHint: "Arrastra este botón directamente a la barra superior de tu navegador (Chrome, Edge, Firefox, Safari):",
      dragButtonText: "⭐ BreadPDF — Herramientas PDF",
      doneBtn: "¡Ya lo he añadido!",
      close: "Cerrar",
      bannerPrompt: "¿Usas PDF a menudo? Guarda BreadPDF en tu barra de marcadores para tenerlo siempre a mano.",
      bannerAction: "Cómo guardar (Ctrl+D)",
      added: "Guardado en favoritos",
    },
    ca: {
      btnTitle: "Afegir a la barra d'adreces d'interès",
      btnLabel: "Guardar a favorits",
      modalTitle: "Afegeix BreadPDF a les teves Adreces d'Interès",
      modalSubtitle: "Tingues sempre a mà les teves eines PDF sense registres ni esperes.",
      step1Title: "1. Prem la drecera de teclat al teu navegador:",
      step1Desc: `Prem ${shortcutKey} alhora en aquesta pestanya.`,
      step2Title: "2. Selecciona la 'Barra d'adreces d'interès'",
      step2Desc: "Tria desar-lo a la barra principal per tenir accés directe en 1 clic.",
      step3Title: "O arrossega aquest botó:",
      dragHint: "Arrossega aquest botó directament a la barra superior del teu navegador (Chrome, Edge, Firefox, Safari):",
      dragButtonText: "⭐ BreadPDF — Eines PDF",
      doneBtn: "Ja ho he afegit!",
      close: "Tancar",
      bannerPrompt: "Fas servir PDF sovint? Guarda BreadPDF a la teva barra de preferits per tenir-lo sempre a mà.",
      bannerAction: "Com guardar (Ctrl+D)",
      added: "Guardat a favorits",
    },
    en: {
      btnTitle: "Add to bookmarks bar",
      btnLabel: "Bookmark BreadPDF",
      modalTitle: "Add BreadPDF to your Bookmarks Bar",
      modalSubtitle: "Keep all 50 privacy-first PDF tools handy right inside your browser.",
      step1Title: "1. Press the keyboard shortcut in your browser:",
      step1Desc: `Press ${shortcutKey} simultaneously on this tab.`,
      step2Title: "2. Select 'Bookmarks Bar'",
      step2Desc: "Save it to your top favorites bar for instant 1-click access anytime.",
      step3Title: "Or drag this button:",
      dragHint: "Drag this link directly up to your browser's bookmarks bar (Chrome, Edge, Firefox, Safari):",
      dragButtonText: "⭐ BreadPDF — Free PDF Tools",
      doneBtn: "Added to Bookmarks!",
      close: "Close",
      bannerPrompt: "Work with PDFs often? Add BreadPDF to your Chrome bookmarks bar for quick 1-click access.",
      bannerAction: "How to save (Ctrl+D)",
      added: "Bookmarked",
    },
  }[locale] ?? {
    btnTitle: "Añadir a la barra de marcadores",
    btnLabel: "Guardar en favoritos",
    modalTitle: "Añadir BreadPDF a tus Marcadores",
    modalSubtitle: "Ten siempre a mano tus herramientas PDF sin registros ni esperas.",
    step1Title: "1. Pulsa el atajo de teclado en tu navegador:",
    step1Desc: `Presiona ${shortcutKey} a la vez en esta pestaña.`,
    step2Title: "2. Selecciona la 'Barra de marcadores'",
    step2Desc: "Elige guardarlo en la barra principal para tener acceso directo en 1 clic.",
    step3Title: "O arrastra este botón:",
    dragHint: "Arrastra este botón directamente a la barra superior de tu navegador (Chrome, Edge, Firefox, Safari):",
    dragButtonText: "⭐ BreadPDF — Herramientas PDF",
    doneBtn: "¡Ya lo he añadido!",
    close: "Cerrar",
    bannerPrompt: "¿Usas PDF a menudo? Guarda BreadPDF en tu barra de marcadores para tenerlo siempre a mano.",
    bannerAction: "Cómo guardar (Ctrl+D)",
    added: "Guardado en favoritos",
  };

  return (
    <>
      {/* ── VARIANT 1: HEADER BUTTON ── */}
      {variant === "header" && (
        <button
          type="button"
          onClick={handleOpenModal}
          title={`${tStrings.btnTitle} (${shortcutKey})`}
          aria-label={tStrings.btnTitle}
          className={`site-bookmark-btn inline-flex items-center gap-1.5 rounded-xl border border-amber-200/90 bg-amber-50/80 px-2.5 py-1.5 text-[12.5px] font-bold text-amber-900 transition-all duration-150 hover:bg-amber-100 hover:border-amber-300 shadow-2xs hover:shadow-xs cursor-pointer select-none ${className}`}
        >
          <Star className={`size-3.5 ${isBookmarkedState ? "fill-amber-500 text-amber-500" : "fill-amber-400/40 text-amber-600"}`} />
          <span className="hidden xl:inline">{isBookmarkedState ? tStrings.added : tStrings.btnLabel}</span>
          <kbd className="hidden 2xl:inline-block rounded-sm bg-white/90 border border-amber-200 px-1 py-0.2 text-[10px] font-mono text-amber-800">
            {shortcutKey}
          </kbd>
        </button>
      )}

      {/* ── VARIANT 2: FLOATING TOOLBAR OR POST-PROCESSING PROMPT ── */}
      {variant === "floating" && (
        <div
          className={`rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
              <Bookmark className="size-5 fill-white text-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0F172A] leading-snug">
                {tStrings.bannerPrompt}
              </p>
              <p className="text-[12.5px] text-slate-500 mt-0.5">
                Pulsa <strong className="font-semibold text-slate-800 font-mono">{shortcutKey}</strong> en Chrome para guardarlo en 1 segundo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white px-3.5 py-2 text-[13px] font-bold shadow-xs transition-all cursor-pointer"
          >
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{tStrings.bannerAction}</span>
          </button>
        </div>
      )}

      {/* ── INFORMATIVE MODAL WITH DIRECT CHROME VISUAL INSTRUCTIONS ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bookmark-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl text-left select-none animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label={tStrings.close}
            >
              <X className="size-5" />
            </button>

            {/* Cabecera */}
            <div className="flex items-center gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                <Star className="size-6 fill-white text-white" />
              </div>
              <div>
                <h3 id="bookmark-modal-title" className="text-[18px] sm:text-[20px] font-black text-[#0F172A] tracking-tight">
                  {tStrings.modalTitle}
                </h3>
                <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                  {tStrings.modalSubtitle}
                </p>
              </div>
            </div>

            {/* Pasos explicativos claros y visuales */}
            <div className="mt-5 space-y-3.5">
              {/* Opción A: Atajo de teclado */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] font-bold text-amber-950">
                    {tStrings.step1Title}
                  </span>
                  <kbd className="inline-flex items-center rounded-lg border border-amber-300/80 bg-white px-3 py-1 font-mono text-[14px] font-black text-amber-900 shadow-xs">
                    {shortcutKey}
                  </kbd>
                </div>
                <p className="mt-1.5 text-[12.5px] text-amber-900/80">
                  {tStrings.step1Desc}
                </p>
                <div className="mt-3 flex items-start gap-2 pt-2 border-t border-amber-200/60 text-[12px] text-slate-600">
                  <span className="font-bold text-amber-800">💡 Tip:</span>
                  <span>{tStrings.step2Desc}</span>
                </div>
              </div>

              {/* Opción B: Bookmarklet drag & drop directo a la barra de Chrome */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-[13px] font-bold text-slate-800">
                  {tStrings.step3Title}
                </p>
                <p className="mt-1 text-[12px] text-slate-600">
                  {tStrings.dragHint}
                </p>

                <div className="mt-2.5 flex items-center justify-center">
                  <a
                    href="https://breadpdf.com"
                    onClick={(e) => e.preventDefault()}
                    title="Arrastra este enlace a tu barra de favoritos"
                    className="inline-flex items-center gap-2 rounded-xl border border-dashed border-amber-500 bg-white px-4 py-2.5 text-[13.5px] font-bold text-amber-900 shadow-xs hover:border-amber-600 hover:bg-amber-50/50 cursor-grab active:cursor-grabbing transition-all"
                  >
                    <span>{tStrings.dragButtonText}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Acciones inferiores */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <span className="text-[12px] text-slate-500">
                Compatible con Google Chrome, Edge, Brave, Firefox y Safari.
              </span>
              <button
                type="button"
                onClick={handleMarkAsDone}
                className="inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] hover:bg-[#D93426] text-white px-4 py-2.5 text-[13.5px] font-bold shadow-sm transition-all cursor-pointer"
              >
                <Check className="size-4 stroke-[3]" />
                <span>{tStrings.doneBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
