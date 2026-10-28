import React, { useRef } from "react";
import { Plus } from "lucide-react";
import { PageCard } from "./PageCard";
import { PageSelectionToolbar } from "./PageSelectionToolbar";
import type { PageItem, PageWorkspaceDocument, WorkspaceAction } from "./types";
import { useLocale } from "@/lib/i18n/context";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
} from "./overlayTypes";

type PageGridProps = {
  documents: Record<string, PageWorkspaceDocument>;
  pages: PageItem[];
  selectedPageIds: string[];
  watermarkConfig?: WatermarkConfig | null;
  pageNumberConfig?: PageNumberConfig | null;
  signatureConfig?: SignatureConfig | null;
  textOverlayConfig?: TextOverlayConfig | null;
  onDispatch: (action: WorkspaceAction) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onAddFiles?: (() => void) | undefined;
};

export function PageGrid({
  documents,
  pages,
  selectedPageIds,
  watermarkConfig,
  pageNumberConfig,
  signatureConfig,
  textOverlayConfig,
  onDispatch,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onAddFiles,
}: PageGridProps) {
  const { t } = useLocale();
  const draggedIndex = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    draggedIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex.current === null || draggedIndex.current === targetIndex) return;
    onDispatch({
      type: "MOVE_PAGE",
      sourceIndex: draggedIndex.current,
      targetIndex,
    });
    draggedIndex.current = null;
  };

  const handleToggleSelect = (pageId: string, isMulti: boolean) => {
    onDispatch({ type: "TOGGLE_SELECT", pageId, isMulti });
  };

  const handleRotate = (pageId: string) => {
    onDispatch({ type: "ROTATE_PAGES", pageIds: [pageId], degrees: 90 });
  };

  const handleRemove = (pageId: string) => {
    onDispatch({ type: "REMOVE_PAGES", pageIds: [pageId] });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageSelectionToolbar
        selectedCount={selectedPageIds.length}
        totalCount={pages.length}
        onRotateSelected={() => onDispatch({ type: "ROTATE_PAGES", pageIds: selectedPageIds, degrees: 90 })}
        onRotateAll={() => onDispatch({ type: "ROTATE_ALL", degrees: 90 })}
        onRemoveSelected={() => onDispatch({ type: "REMOVE_PAGES", pageIds: selectedPageIds })}
        onSelectAll={() => onDispatch({ type: "SELECT_ALL" })}
        onClearSelection={() => onDispatch({ type: "CLEAR_SELECTION" })}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={onUndo}
        onRedo={onRedo}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,164px),164px))] gap-3 sm:gap-4">
        {pages.map((page, index) => {
          const doc = documents[page.sourceDocumentId];
          if (!doc) return null;
          const isSelected = selectedPageIds.includes(page.id);

          return (
            <PageCard
              key={page.id}
              page={page}
              document={doc}
              displayIndex={index}
              totalPages={pages.length}
              isSelected={isSelected}
              watermarkConfig={watermarkConfig}
              pageNumberConfig={pageNumberConfig}
              signatureConfig={signatureConfig}
              textOverlayConfig={textOverlayConfig}
              onToggleSelect={handleToggleSelect}
              onRotate={handleRotate}
              onRemove={handleRemove}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          );
        })}

        {onAddFiles && (
          <button
            type="button"
            onClick={onAddFiles}
            className="animate-file-enter group flex min-h-[190px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0F0F12] bg-[#FFF1EF] p-4 text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:-translate-y-1 hover:bg-[#FFE1DC] hover:shadow-[3px_3px_0_#0F0F12] transition-all duration-200 cursor-pointer"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[2px_2px_0_#0F0F12] group-hover:rotate-90 group-hover:scale-105 transition-all">
              <Plus className="size-5" />
            </div>
            <span className="mt-2.5 text-[12.5px] font-bold text-center leading-tight">
              {t.workspace.addMorePdfs}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
