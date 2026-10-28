import React from "react";
import { RotateCw, Trash2, CheckSquare, Square, Undo2, Redo2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

type ToolbarProps = {
  accentColor: string;
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
  accentColor,
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
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] px-2.5 py-2 text-white shadow-[2px_2px_0_#0F0F12]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={allSelected ? onClearSelection : onSelectAll}
          style={allSelected ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
          className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border-2 border-white px-3 py-1.5 text-[13px] font-bold transition-colors cursor-pointer ${allSelected ? "text-white" : "bg-white text-[#0F0F12] hover:bg-slate-100"}`}
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
            className="ml-1 cursor-pointer text-[13px] font-semibold text-white underline underline-offset-2 hover:text-slate-200"
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
          className="h-8 rounded-lg border-2 border-white/30 bg-[#24242C] px-2 text-white hover:bg-[#3A3A44] disabled:opacity-40"
        >
          <Undo2 className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={onRedo}
          title={t.workspace.redo}
          className="h-8 rounded-lg border-2 border-white/30 bg-[#24242C] px-2 text-white hover:bg-[#3A3A44] disabled:opacity-40"
        >
          <Redo2 className="size-3.5" />
        </button>

        <div className="mx-1 h-5 w-px bg-white/25" />

        {/* Rotate controls */}
        {showRotationControls && (selectedCount > 0 ? (
          <button
            type="button"
            onClick={onRotateSelected}
            style={{ backgroundColor: accentColor, borderColor: "white" }}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border-2 px-3 text-[13px] font-black text-white shadow-[2px_2px_0_#0F0F12] hover:brightness-110"
          >
            <RotateCw className="size-3.5" />
            <span>{t.workspace.rotateSelected(selectedCount)}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onRotateAll}
            style={{ backgroundColor: accentColor, borderColor: "white" }}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border-2 px-3 text-[13px] font-black text-white shadow-[2px_2px_0_#0F0F12] hover:brightness-110"
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
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border-2 border-white bg-white px-3 text-[13px] font-bold text-[#0F0F12] hover:bg-slate-100"
          >
            <Trash2 className="size-3.5" />
            <span>{t.workspace.deleteSelected(selectedCount)}</span>
          </button>
        )}
      </div>
    </div>
  );
}
