import React, { useRef } from "react";
import { Plus } from "lucide-react";
import { PageCard } from "./PageCard";
import { PageSelectionToolbar } from "./PageSelectionToolbar";
import type { PageItem, PageWorkspaceDocument, WorkspaceAction } from "./types";
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
            className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 min-h-[160px] text-slate-500 hover:border-primary hover:bg-[#FEECEB]/40 hover:text-primary transition-all duration-150 cursor-pointer"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-white border border-slate-200 shadow-2xs group-hover:border-primary group-hover:scale-105 transition-all text-slate-600 group-hover:text-primary">
              <Plus className="size-5" />
            </div>
            <span className="mt-2.5 text-[12.5px] font-bold text-center leading-tight">
              Añadir más PDFs
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
