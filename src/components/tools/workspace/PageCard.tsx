import React, { useState } from "react";
import { RotateCw, Trash2, GripVertical, Check } from "lucide-react";
import { PdfThumbnail } from "./PdfThumbnail";
import { OverlayPreview } from "./OverlayPreview";
import type { PageItem, PageWorkspaceDocument } from "./types";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
} from "./overlayTypes";

type PageCardProps = {
  page: PageItem;
  document: PageWorkspaceDocument;
  displayIndex: number;
  totalPages: number;
  isSelected: boolean;
  watermarkConfig?: WatermarkConfig | null;
  pageNumberConfig?: PageNumberConfig | null;
  signatureConfig?: SignatureConfig | null;
  textOverlayConfig?: TextOverlayConfig | null;
  onToggleSelect: (pageId: string, isMulti: boolean) => void;
  onRotate: (pageId: string) => void;
  onRemove: (pageId: string) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
};

export function PageCard({
  page,
  document,
  displayIndex,
  totalPages,
  isSelected,
  watermarkConfig,
  pageNumberConfig,
  signatureConfig,
  textOverlayConfig,
  onToggleSelect,
  onRotate,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}: PageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, displayIndex)}
      onDragOver={(e) => onDragOver(e, displayIndex)}
      onDrop={(e) => onDrop(e, displayIndex)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => onToggleSelect(page.id, e.shiftKey || e.metaKey || e.ctrlKey)}
      className={`group relative flex flex-col items-center rounded-xl border bg-white p-3 transition-all duration-150 cursor-pointer select-none ${
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      {/* Top action bar: Selection badge + Grip */}
      <div className="flex w-full items-center justify-between gap-1 mb-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(page.id, true);
          }}
          title={isSelected ? "Desmarcar página" : "Seleccionar página"}
          className={`flex size-5.5 items-center justify-center rounded-md border text-[11px] font-bold transition-all cursor-pointer ${
            isSelected
              ? "border-primary bg-primary text-white scale-105"
              : "border-slate-200 bg-slate-50 text-slate-500 hover:border-primary/50 hover:bg-slate-100 group-hover:border-slate-300"
          }`}
        >
          {isSelected ? <Check className="size-3.5" /> : displayIndex + 1}
        </button>

        {/* Hover quick tools */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            title="Girar 90°"
            onClick={(e) => {
              e.stopPropagation();
              onRotate(page.id);
            }}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <RotateCw className="size-3.5" />
          </button>
          <button
            type="button"
            title="Eliminar página"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(page.id);
            }}
            className="rounded-md p-1 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="size-3.5" />
          </button>
          <span title="Arrastrar para ordenar" className="cursor-grab text-slate-300 hover:text-slate-500">
            <GripVertical className="size-3.5" />
          </span>
        </div>
      </div>

      {/* Canvas preview with Real-Time Overlay */}
      <div className="relative w-full aspect-[1/1.38] rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
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
      <div className="mt-2 flex w-full items-center justify-between text-[11.5px] text-slate-400">
        <span className="truncate max-w-[120px]" title={document.fileName}>
          {document.fileName}
        </span>
        <span>pág. {page.sourcePageIndex + 1}</span>
      </div>
    </div>
  );
}
