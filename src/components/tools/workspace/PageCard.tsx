import React from "react";
import { RotateCw, Trash2, GripVertical, Check } from "lucide-react";
import { PdfThumbnail } from "./PdfThumbnail";
import { OverlayPreview } from "./OverlayPreview";
import { useLocale } from "@/lib/i18n/context";
import type { PageItem, PageWorkspaceDocument } from "./types";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
} from "./overlayTypes";

type PageCardProps = {
  accentColor: string;
  page: PageItem;
  document: PageWorkspaceDocument;
  displayIndex: number;
  totalPages: number;
  isSelected: boolean;
  watermarkConfig?: WatermarkConfig | null | undefined;
  pageNumberConfig?: PageNumberConfig | null | undefined;
  signatureConfig?: SignatureConfig | null | undefined;
  textOverlayConfig?: TextOverlayConfig | null | undefined;
  showRotationControl?: boolean;
  onToggleSelect: (pageId: string, isMulti: boolean) => void;
  onRotate: (pageId: string) => void;
  onRemove: (pageId: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
};

export function PageCard({
  accentColor,
  page,
  document,
  displayIndex,
  totalPages,
  isSelected,
  watermarkConfig,
  pageNumberConfig,
  signatureConfig,
  textOverlayConfig,
  showRotationControl = true,
  onToggleSelect,
  onRotate,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}: PageCardProps) {
  const { t } = useLocale();

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, displayIndex)}
      onDragOver={(e) => onDragOver(e, displayIndex)}
      onDrop={(e) => onDrop(e, displayIndex)}
      onClick={() => onToggleSelect(page.id, true)}
      className={`animate-page-detected group relative flex flex-col items-center rounded-xl border-2 bg-white p-2 transition-all duration-200 cursor-pointer select-none ${
        isSelected
          ? "border-[#0F0F12] shadow-[3px_3px_0_var(--page-accent)] -translate-y-0.5"
          : "border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]"
      }`}
      style={{
        animationDelay: `${Math.min(displayIndex * 55, 385)}ms`,
        ...(isSelected ? { boxShadow: `3px 3px 0 ${accentColor}` } : {}),
      }}
    >
      {/* Top action bar: Selection badge + Grip */}
      <div className="mb-1.5 flex w-full items-center justify-between gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(page.id, true);
          }}
          title={isSelected ? t.workspace.deselectPage : t.workspace.selectPage}
          style={isSelected ? { backgroundColor: accentColor, borderColor: "#0F0F12" } : undefined}
          className={`flex size-7 items-center justify-center rounded-lg border-2 border-[#0F0F12] text-[11px] font-black transition-all cursor-pointer ${
            isSelected
              ? "text-white scale-105 shadow-[1px_1px_0_#0F0F12]"
              : "bg-white text-[#0F0F12]"
          }`}
        >
          {isSelected ? <Check className="size-3.5" /> : displayIndex + 1}
        </button>

        {/* Hover quick tools */}
        <div className="flex items-center gap-0.5">
          {showRotationControl && <button
            type="button"
            title={t.workspace.rotatePage}
            onClick={(e) => {
              e.stopPropagation();
              onRotate(page.id);
            }}
            className="rounded-lg border-2 border-[#0F0F12] bg-white p-1 text-[#0F0F12] shadow-[1px_1px_0_#0F0F12] hover:bg-slate-100 transition-colors"
          >
            <RotateCw className="size-3.5" />
          </button>}
          <button
            type="button"
            title={t.workspace.deletePage}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(page.id);
            }}
            className="rounded-lg border-2 border-[#0F0F12] bg-white p-1 text-[#0F0F12] shadow-[1px_1px_0_#0F0F12] hover:bg-[#FEE2E2] transition-colors"
          >
            <Trash2 className="size-3.5" />
          </button>
          <span title={t.workspace.reorderPage} className="cursor-grab rounded-lg border-2 border-[#0F0F12] bg-white p-1 text-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
            <GripVertical className="size-3.5" />
          </span>
        </div>
      </div>

      {/* Canvas preview with Real-Time Overlay */}
      <div className="relative w-full aspect-[1/1.38] rounded-lg overflow-hidden border-2 border-[#0F0F12] bg-slate-100 flex items-center justify-center">
        <PdfThumbnail
          arrayBuffer={document.arrayBuffer}
          pageIndex={page.sourcePageIndex}
          rotation={page.rotation}
          className="w-full h-full"
        />

        {/* Live Watermark & Page Numbering & Signature & Text Overlay */}
        <OverlayPreview
          watermarkConfig={watermarkConfig}
          pageNumberConfig={pageNumberConfig}
          signatureConfig={signatureConfig}
          textOverlayConfig={textOverlayConfig}
          pageIndex={displayIndex}
          totalPages={totalPages}
          isSelected={isSelected}
        />
      </div>

      {/* Bottom metadata */}
      <div className="mt-2 flex w-full flex-col items-start gap-1 text-[#0F0F12]">
        <span className="w-full break-all text-[12px] font-bold leading-snug" title={document.fileName}>
          {document.fileName}
        </span>
        <span className="shrink-0 rounded-md border border-[#0F0F12] bg-[#0F0F12] px-1.5 py-0.5 text-[11px] font-bold text-white">{t.workspace.pageLabel} {page.sourcePageIndex + 1}</span>
      </div>
    </div>
  );
}
