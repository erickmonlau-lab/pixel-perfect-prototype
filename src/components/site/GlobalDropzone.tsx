import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { UploadCloud, ArrowRight, FileText, CheckCircle2, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";

interface SuggestedAction {
  slug: string;
  name: string;
  desc: string;
  iconBg: string;
}

export function GlobalDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const { locale } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setIsDragging(false);

      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        setDroppedFile(file);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const closeDialog = () => setDroppedFile(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const isPdf = droppedFile?.type === "application/pdf" || droppedFile?.name.toLowerCase().endsWith(".pdf");

  const pdfActions: SuggestedAction[] = [
    {
      slug: "comprimir-pdf",
      name: locale === "ca" ? "Comprimir PDF" : locale === "en" ? "Compress PDF" : "Comprimir PDF",
      desc: locale === "ca" ? "Redueix el pes fins a un 80%" : locale === "en" ? "Reduce file size up to 80%" : "Reduce el peso hasta un 80%",
      iconBg: "bg-[#EF4444]",
    },
    {
      slug: "unir-pdf",
      name: locale === "ca" ? "Unir amb altres" : locale === "en" ? "Merge with others" : "Unir con otros",
      desc: locale === "ca" ? "Combina múltiples arxius" : locale === "en" ? "Combine multiple documents" : "Combina múltiples archivos",
      iconBg: "bg-[#EF4444]",
    },
    {
      slug: "dividir-pdf",
      name: locale === "ca" ? "Dividir pàgines" : locale === "en" ? "Split pages" : "Dividir páginas",
      desc: locale === "ca" ? "Extreu o separa pàgines" : locale === "en" ? "Extract or split pages" : "Extrae o separa páginas",
      iconBg: "bg-[#EF4444]",
    },
    {
      slug: "pdf-a-word",
      name: locale === "ca" ? "Convertir a Word" : locale === "en" ? "Convert to Word" : "Convertir a Word",
      desc: locale === "ca" ? "Document .docx editable" : locale === "en" ? "Editable .docx file" : "Documento .docx editable",
      iconBg: "bg-[#2563EB]",
    },
    {
      slug: "pdf-a-jpg",
      name: locale === "ca" ? "Convertir a JPG" : locale === "en" ? "Convert to JPG" : "Convertir a JPG",
      desc: locale === "ca" ? "Extreu pàgines com a imatges" : locale === "en" ? "Save pages as high-res images" : "Extrae páginas como imágenes",
      iconBg: "bg-[#8B5CF6]",
    },
    {
      slug: "proteger-pdf",
      name: locale === "ca" ? "Protegir amb contrasenya" : locale === "en" ? "Protect with Password" : "Proteger con contraseña",
      desc: locale === "ca" ? "Xifrat segur local AES-256" : locale === "en" ? "Secure local AES-256 cipher" : "Cifrado seguro local AES-256",
      iconBg: "bg-[#F59E0B]",
    },
  ];

  return (
    <>
      {/* 1. OVERLAY DE ARRASTRE A PANTALLA COMPLETA */}
      {isDragging && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0F12]/80 backdrop-blur-md p-6 animate-in fade-in duration-150">
          <div className="flex flex-col items-center justify-center max-w-lg w-full p-10 rounded-3xl border-4 border-dashed border-[#FACC15] bg-[#FFFDF9] shadow-[10px_10px_0_#0F0F12] text-center transform scale-105 transition-transform">
            <span className="flex size-20 items-center justify-center rounded-2xl border-3 border-[#0F0F12] bg-[#FEF08A] shadow-[4px_4px_0_#0F0F12] mb-5 animate-bounce">
              <UploadCloud className="size-10 text-[#0F0F12] stroke-[2.6]" />
            </span>
            <h2 className="text-3xl font-black text-[#0F0F12] tracking-tight uppercase">
              {locale === "ca" ? "Deixa anar l'arxiu aquí!" : locale === "en" ? "Drop your file here!" : "¡Suelta tu archivo aquí!"}
            </h2>
            <p className="mt-2 text-base font-bold text-slate-700">
              {locale === "ca" ? "Processat 100% al teu navegador sense pujades a servidors." : locale === "en" ? "Processed 100% locally in your browser with zero server uploads." : "Procesado 100% en tu navegador sin subidas a servidores."}
            </p>
          </div>
        </div>
      )}

      {/* 2. MODAL DE ACCIONES SUGERIDAS INTELIGENTES */}
      {droppedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl border-3 border-[#0F0F12] bg-[#FFFDF9] p-6 sm:p-8 shadow-[8px_8px_0_#0F0F12] animate-in zoom-in-95 duration-200">
            {/* Botón cerrar */}
            <button
              onClick={closeDialog}
              className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-white text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] transition-colors cursor-pointer"
            >
              <X className="size-5 stroke-[2.8]" />
            </button>

            {/* Ficha del archivo detectado */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[3px_3px_0_#0F0F12] mb-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[2px_2px_0_#0F0F12]">
                <FileText className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-base font-black text-[#0F0F12]">
                  {droppedFile.name}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 mt-0.5">
                  <span>{formatSize(droppedFile.size)}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" />
                    {locale === "ca" ? "Detectat" : locale === "en" ? "Ready" : "Detectado"}
                  </span>
                </span>
              </div>
            </div>

            {/* Pregunta / Título */}
            <h3 className="text-xl sm:text-2xl font-black text-[#0F0F12] tracking-tight uppercase mb-4">
              {locale === "ca" ? "¿Què vols fer amb aquest arxiu?" : locale === "en" ? "What do you want to do with this file?" : "¿Qué deseas hacer con este archivo?"}
            </h3>

            {/* Grid de acciones rápidas sugeridas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {pdfActions.map((action) => (
                <button
                  key={action.slug}
                  onClick={() => {
                    closeDialog();
                    void navigate({ to: DETAIL_ROUTE, params: toolParams(locale, action.slug) });
                  }}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border-2 border-[#0F0F12] bg-white shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12] transition-all text-left cursor-pointer"
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#0F0F12] ${action.iconBg} text-white shadow-[1px_1px_0_#0F0F12]`}>
                    <ArrowRight className="size-4 stroke-[2.8]" />
                  </span>
                  <div>
                    <span className="block text-sm font-black text-[#0F0F12] group-hover:text-black">
                      {action.name}
                    </span>
                    <span className="block text-xs font-medium text-slate-600 line-clamp-1 mt-0.5">
                      {action.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
