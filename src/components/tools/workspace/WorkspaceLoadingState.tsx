import { Loader2 } from "lucide-react";

type WorkspaceLoadingStateProps = {
  title: string;
  accentColor?: string;
  detail?: string;
  compact?: boolean;
};

export function WorkspaceLoadingState({
  title,
  accentColor = "#EC3C2D",
  detail,
  compact = false,
}: WorkspaceLoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex w-full items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[3px_3px_0_#0F0F12] ${compact ? "p-2" : "p-3 sm:p-4"}`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] text-white shadow-[2px_2px_0_#0F0F12] ${compact ? "size-8" : "size-10"}`}
        style={{ backgroundColor: accentColor }}
      >
        <Loader2 className={`${compact ? "size-4" : "size-5"} animate-spin`} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className={`block text-[#0F0F12] ${compact ? "text-xs" : "text-sm sm:text-base"} font-black leading-snug`}>
          {title}
        </span>
        {detail && !compact && <span className="mt-0.5 block text-sm font-medium text-[#334155]">{detail}</span>}
      </span>
    </div>
  );
}
