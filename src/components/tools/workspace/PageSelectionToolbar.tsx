import React from "react";
import { RotateCw, Trash2, CheckSquare, Square, Undo2, Redo2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

type ToolbarProps = {
  selectedCount: number;
  totalCount: number;
  onRotateSelected: () => void;
  onRotateAll: () => void;
  onRemoveSelected: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  showRotationControls?: boolean;
};

export function PageSelectionToolbar({
  selectedCount,
  totalCount,
  onRotateSelected,
  onRotateAll,
  onRemoveSelected,
  onSelectAll,
  onClearSelection,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  showRotationControls = true,
}: ToolbarProps) {
  const { t } = useLocale();
  const allSelected = selectedCount > 0 && selectedCount === totalCount;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-3 py-2 text-[#0F0F12] shadow-[3px_3px_0_#0F0F12]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={allSelected ? onClearSelection : onSelectAll}
          className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] px-2.5 py-1.5 text-[12.5px] font-bold transition-colors cursor-pointer ${allSelected ? "bg-[#0F0F12] text-white" : "bg-white text-[#0F0F12] hover:bg-[#FFF1EF]"}`}
        >
          {allSelected ? <CheckSquare className="size-4 text-white" /> : <Square className="size-4 text-[#0F0F12]" />}
          <span>
            {selectedCount > 0 ? t.workspace.selectedPages(selectedCount) : t.workspace.allPages(totalCount)}
          </span>
        </button>

        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClearSelection}
            className="ml-1 cursor-pointer text-[12px] font-semibold text-[#0F0F12] underline hover:text-[#EC3C2D]"
          >
            {t.workspace.clearSelection}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Undo / Redo */}
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          title={t.workspace.undo}
          className="h-8 rounded-lg border-2 border-[#0F0F12] bg-white px-2 text-[#0F0F12] hover:bg-[#F1F2F4] disabled:opacity-40"
        >
          <Undo2 className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={onRedo}
          title={t.workspace.redo}
          className="h-8 rounded-lg border-2 border-[#0F0F12] bg-white px-2 text-[#0F0F12] hover:bg-[#F1F2F4] disabled:opacity-40"
        >
          <Redo2 className="size-3.5" />
        </button>

        <div className="mx-1 h-5 w-px bg-[#0F0F12]/20" />

        {/* Rotate controls */}
        {showRotationControls && (selectedCount > 0 ? (
          <button
            type="button"
            onClick={onRotateSelected}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-3 text-[12px] font-black text-white shadow-[2px_2px_0_#0F0F12] hover:bg-[#D93426]"
          >
            <RotateCw className="size-3.5" />
            <span>{t.workspace.rotateSelected(selectedCount)}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onRotateAll}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-3 text-[12px] font-black text-white shadow-[2px_2px_0_#0F0F12] hover:bg-[#D93426]"
          >
            <RotateCw className="size-3.5" />
            <span>{t.workspace.rotateAll}</span>
          </button>
        ))}

        {/* Remove controls */}
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onRemoveSelected}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#FEF08A] px-3 text-[12px] font-bold text-[#0F0F12] hover:bg-[#FDE047]"
          >
            <Trash2 className="size-3.5" />
            <span>{t.workspace.deleteSelected(selectedCount)}</span>
          </button>
        )}
      </div>
    </div>
  );
}
