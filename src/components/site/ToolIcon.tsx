import {
  Combine,
  FileImage,
  FileOutput,
  FileType,
  FileType2,
  FileX2,
  Image,
  Minimize2,
  RotateCw,
  Scissors,
  TextSelect,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Combine,
  FileImage,
  FileOutput,
  FileType,
  FileType2,
  FileX2,
  Image,
  Minimize2,
  RotateCw,
  Scissors,
  TextSelect,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? FileOutput;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
