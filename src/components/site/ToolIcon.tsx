import {
  ArrowDownToLine,
  Combine,
  Droplets,
  FileImage,
  FileMinus2,
  FileOutput,
  FileSearch,
  FileSpreadsheet,
  FileType,
  FileType2,
  FileX2,
  Hash,
  Image,
  ImagePlus,
  Lock,
  Minimize2,
  Presentation,
  RotateCw,
  ScanText,
  Scissors,
  Signature,
  Sparkles,
  SplitSquareVertical,
  TableProperties,
  TextSelect,
  Unlock,
  Wrench,
  FileCode,
  FileCheck,
  Sheet,
  QrCode,
  ShieldAlert,
  Crop,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  ArrowDownToLine,
  Combine,
  Droplets,
  FileImage,
  FileMinus2,
  FileOutput,
  FileSearch,
  FileSpreadsheet,
  FileType,
  FileType2,
  FileX2,
  Hash,
  Image,
  ImagePlus,
  Lock,
  Minimize2,
  Presentation,
  RotateCw,
  ScanText,
  Scissors,
  Signature,
  Sparkles,
  SplitSquareVertical,
  TableProperties,
  TextSelect,
  Unlock,
  Wrench,
  FileCode,
  FileCheck,
  Sheet,
  QrCode,
  ShieldAlert,
  Crop,
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
