import {
  Combine,
  FileOutput,
  FileType2,
  Lock,
  Minimize2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Combine,
  FileOutput,
  FileType2,
  Lock,
  Minimize2,
  Sparkles,
};

import { getRichToolIcon } from "./RichToolIcon";

export function ToolIcon({
  name,
  className,
  canonicalSlug,
}: {
  name: string;
  className?: string;
  canonicalSlug?: string;
}) {
  if (canonicalSlug) {
    const RichIcon = getRichToolIcon(canonicalSlug);
    if (RichIcon) {
      return <RichIcon className={className} aria-hidden />;
    }
  }
  const Icon = ICONS[name] ?? FileOutput;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
