import {
  Combine,
  Droplets,
  FileOutput,
  FileType2,
  Hash,
  Lock,
  Minimize2,
  PenTool,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Combine,
  Droplets,
  FileOutput,
  FileType2,
  Hash,
  Lock,
  Minimize2,
  PenTool,
  Sparkles,
  Type,
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
      return <RichIcon className={className || ""} aria-hidden />;
    }
  }
  const Icon = ICONS[name] ?? FileOutput;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
