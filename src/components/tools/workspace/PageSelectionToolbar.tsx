import React from "react";
import { RotateCw, Trash2, CheckSquare, Square, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}: ToolbarProps) {
  const { t } = useLocale();
  const allSelected = selectedCount > 0 && selectedCount === totalCount;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-2 text-white shadow-[3px_3px_0_#EC3C2D]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={allSelected ? onClearSelection : onSelectAll}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[12.5px] font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          {allSelected ? <CheckSquare className="size-4 text-[#FEF08A]" /> : <Square className="size-4 text-white/60" />}
          <span>
            {selectedCount > 0 ? t.workspace.selectedPages(selectedCount) : t.workspace.allPages(totalCount)}
          </span>
        </button>

        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClearSelection}
            className="ml-1 cursor-pointer text-[12px] font-semibold text-white/70 underline hover:text-white"
          >
            {t.workspace.clearSelection}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Undo / Redo */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canUndo}
          onClick={onUndo}
          title={t.workspace.undo}
          className="h-8 border-white/20 bg-white/10 px-2 text-white hover:bg-white/20 hover:text-white"
        >
          <Undo2 className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canRedo}
          onClick={onRedo}
          title={t.workspace.redo}
          className="h-8 border-white/20 bg-white/10 px-2 text-white hover:bg-white/20 hover:text-white"
        >
          <Redo2 className="size-3.5" />
        </Button>

        <div className="mx-1 h-5 w-px bg-white/20" />

        {/* Rotate controls */}
        {selectedCount > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRotateSelected}
            className="h-8 gap-1.5 border-2 border-white bg-[#EC3C2D] px-3 text-[12px] font-black text-white shadow-[2px_2px_0_#fff] hover:bg-[#D93426]"
          >
            <RotateCw className="size-3.5" />
            <span>{t.workspace.rotateSelected(selectedCount)}</span>
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRotateAll}
            className="h-8 gap-1.5 border-2 border-white bg-[#EC3C2D] px-3 text-[12px] font-black text-white shadow-[2px_2px_0_#fff] hover:bg-[#D93426]"
          >
            <RotateCw className="size-3.5" />
            <span>{t.workspace.rotateAll}</span>
          </Button>
        )}

        {/* Remove controls */}
        {selectedCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemoveSelected}
            className="h-8 gap-1.5 border-white/20 bg-white/10 px-3 text-[12px] font-bold text-white hover:bg-white/20 hover:text-white"
          >
            <Trash2 className="size-3.5" />
            <span>{t.workspace.deleteSelected(selectedCount)}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
