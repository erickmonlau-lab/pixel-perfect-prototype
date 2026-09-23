import * as React from "react";
import { cn } from "@/lib/utils";

export interface PremiumCrownIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Official Canonical Crown Icon for BreadPDF Premium.
 *
 * Design:
 * - Minimalist, clean, geometric & solid.
 * - Same visual weight and high recognition as BreadPDF's action iconography.
 * - Uses current color (currentColor) so it naturally renders:
 *     • Red/Coral (#EC3C2D) on light/white surfaces
 *     • White (#FFFFFF) on red/dark surfaces
 */
export function PremiumCrownIcon({
  className = "size-4",
  ...props
}: PremiumCrownIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 inline-block", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.5 19.5C2.5 18.9477 2.94772 18.5 3.5 18.5H20.5C21.0523 18.5 21.5 18.9477 21.5 19.5C21.5 20.0523 21.0523 20.5 20.5 20.5H3.5C2.94772 20.5 2.5 20.0523 2.5 19.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24 6.35C3.58 6.01 4.14 6.08 4.38 6.5L7.82 12.44L11.08 4.62C11.27 4.16 11.83 4.02 12.21 4.34C12.33 4.44 12.42 4.57 12.47 4.72L15.93 12.48L19.59 6.54C19.84 6.13 20.39 6.06 20.73 6.39C20.9 6.56 20.99 6.79 20.97 7.03L19.78 16.5H4.22L3.03 7.03C2.99 6.78 3.07 6.52 3.24 6.35Z"
      />
    </svg>
  );
}
