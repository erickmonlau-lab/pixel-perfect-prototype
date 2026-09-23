import React from "react";
import { RotateCw, Trash2, CheckSquare, Square, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const allSelected = selectedCount > 0 && selectedCount === totalCount;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={allSelected ? onClearSelection : onSelectAll}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 hover:text-primary transition-colors cursor-pointer"
        >
          {allSelected ? <CheckSquare className="size-4 text-primary" /> : <Square className="size-4 text-slate-400" />}
          <span>
            {selectedCount > 0 ? `${selectedCount} seleccionada(s)` : `Todas (${totalCount})`}
          </span>
        </button>

        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClearSelection}
            className="text-[12px] font-medium text-slate-400 hover:text-slate-600 underline cursor-pointer ml-1"
          >
            Desmarcar
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
          title="Deshacer"
          className="h-8 px-2 text-slate-600"
        >
          <Undo2 className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canRedo}
          onClick={onRedo}
          title="Rehacer"
          className="h-8 px-2 text-slate-600"
        >
          <Redo2 className="size-3.5" />
        </Button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Rotate controls */}
        {selectedCount > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRotateSelected}
            className="h-8 text-[12.5px] font-medium gap-1.5 text-slate-700"
          >
            <RotateCw className="size-3.5" />
            <span>Girar ({selectedCount})</span>
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRotateAll}
            className="h-8 text-[12.5px] font-medium gap-1.5 text-slate-700"
          >
            <RotateCw className="size-3.5" />
            <span>Girar todas</span>
          </Button>
        )}

        {/* Remove controls */}
        {selectedCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemoveSelected}
            className="h-8 text-[12.5px] font-medium gap-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
          >
            <Trash2 className="size-3.5" />
            <span>Eliminar ({selectedCount})</span>
          </Button>
        )}
      </div>
    </div>
  );
}
