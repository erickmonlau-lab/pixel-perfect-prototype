import type { FC, SVGProps } from "react";

/**
 * Rich, vivid, and instantly recognizable filetype & feature icons for BreadPDF's mega menu & tools.
 * High-definition SVG icons representing industry standards:
 * - Word doc (.docx): Office Blue sheet with distinct white 'W'
 * - Excel sheet (.xlsx): Office Forest Green sheet with distinct white 'X'
 * - PowerPoint (.pptx): Warm Orange/Red sheet with distinct white 'P'
 * - JPG / Foto: Amber photo card with sun & mountains
 * - PDF / PDF a X: Red PDF sheet with authentic Acrobat document swirl / signature badge
 * - WebP: Teal/Cyan photographic globe & modern image matrix with clear, readable typography
 * - PDF/A: Archival standard badge with ISO golden star / seal
 * - OCR scanner, Markdown, Unir, Dividir, Comprimir, etc.
 */

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

// --- 1. MODERN MICROSOFT WORD 365 ICON ---
// --- 1. MODERN MICROSOFT WORD 365 ICON ---
export const WordFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Base document sheet */}
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#185ABD" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#2B7CD3" opacity="0.6" />
    {/* Bold prominent W */}
    <text
      x="20"
      y="26"
      fill="#FFFFFF"
      fontSize="17"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
    >
      W
    </text>
  </svg>
);

// --- 2. MODERN MICROSOFT EXCEL 365 ICON ---
export const ExcelFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Base spreadsheet sheet */}
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#107C41" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#16A34A" opacity="0.6" />
    {/* Bold prominent X */}
    <text
      x="20"
      y="26"
      fill="#FFFFFF"
      fontSize="17"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
    >
      X
    </text>
  </svg>
);

// --- 3. MODERN MICROSOFT POWERPOINT 365 ICON ---
export const PowerPointFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Base presentation sheet */}
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#C43E1C" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#EA580C" opacity="0.6" />
    {/* Bold prominent P */}
    <text
      x="20"
      y="26"
      fill="#FFFFFF"
      fontSize="17"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
    >
      P
    </text>
  </svg>
);

// --- 4. JPG / IMAGEN ICON: Pure bold photo frame with sun and mountain peaks ---
export const JpgFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Outer photo border */}
    <rect x="6" y="7" width="28" height="26" rx="4" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
    {/* Clean circular sun */}
    <circle cx="14" cy="15" r="3.2" fill="#FFFFFF" />
    {/* Prominent mountain peaks */}
    <path d="M7.5 28.5L16 19.5L22 25.5L25 22L32.5 28.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- 5. PDF ICON: Authentic Red Document with Bold Centered 'PDF' & Corner Fold Shadow (User Reference) ---
export const PdfFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Bottom gray page stack line */}
    <rect x="7" y="34" width="26" height="2.5" rx="1" fill="#9CA3AF" />

    {/* Vibrant Red document sheet */}
    <path
      d="M7 4H24L33 13V33.5H7V4Z"
      fill="#FF0000"
    />

    {/* Fold shadow underneath the flap */}
    <path
      d="M24 13V15.5L33 13H24Z"
      fill="#B91C1C"
    />

    {/* Folded paper corner (light coral/rose) */}
    <path
      d="M24 4L33 13H24V4Z"
      fill="#FCA5A5"
    />

    {/* Large Bold White 'PDF' text */}
    <text
      x="20"
      y="25.5"
      fill="#FFFFFF"
      fontSize="13.5"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
      letterSpacing="0.2px"
    >
      PDF
    </text>
  </svg>
);

// --- 6. PDF/A ARCHIVAL ICON: Deep Slate & Archival Stamp ---
export const PdfAFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#0F172A" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#334155" />
    <circle cx="20" cy="18" r="5" fill="#F59E0B" />
    <path d="M18 18L19.5 19.5L22.5 16.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="25" width="22" height="8" rx="2" fill="#0284C7" />
    <text
      x="20"
      y="31.2"
      fill="#FFFFFF"
      fontSize="7.5"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
      letterSpacing="0.4px"
    >
      PDF/A
    </text>
  </svg>
);

// --- 7. WEBP ICON: Bold document sheet with clear WEBP stamp ---
export const WebpFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#0284C7" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#38BDF8" opacity="0.6" />
    <circle cx="16" cy="17" r="2.5" fill="#FFFFFF" />
    <path d="M12 25L17 19L22 25H12Z" fill="#FFFFFF" />
    <path d="M19 25L23 20L28 25H19Z" fill="#FFFFFF" opacity="0.8" />
    <text
      x="20"
      y="32.5"
      fill="#FFFFFF"
      fontSize="7.5"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
      letterSpacing="0.4px"
    >
      WEBP
    </text>
  </svg>
);

// --- 8. MARKDOWN ICON: Document sheet with bold MD download/code symbol ---
export const MarkdownFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#0F172A" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#334155" />
    <text
      x="20"
      y="26"
      fill="#FFFFFF"
      fontSize="13"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
    >
      MD
    </text>
  </svg>
);

// --- 8b. SVG VECTOR ICON ---
export const SvgFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="4" width="26" height="32" rx="4" fill="#F59E0B" />
    <path d="M22 4L33 15H24C22.9 15 22 14.1 22 13V4Z" fill="#B45309" opacity="0.4" />
    <text
      x="20"
      y="26"
      fill="#FFFFFF"
      fontSize="12"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      textAnchor="middle"
    >
      SVG
    </text>
  </svg>
);

// --- 9. EXTRAER TEXTO / OCR SCANNER ICON ---
export const OcrFileIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <path d="M9 14V9H14M26 9H31V14M9 26V31H14M26 31H31V26" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 16H26M14 20H24M14 24H21" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

// --- 10. UNIR PDF: Universal combine symbol — two overlapping pages merging together ---
export const MergeDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Clean overlapping documents merging together */}
    <rect x="7" y="6" width="17" height="23" rx="3" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
    <rect x="16" y="11" width="17" height="23" rx="3" fill="#FFFFFF" />
    {/* Prominent merge plus */}
    <path d="M24.5 17.5V27.5M19.5 22.5H29.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// --- 11. DIVIDIR PDF: Pure prominent action scissors ---
export const SplitDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Cutting guide dashed line */}
    <line x1="20" y1="5" x2="20" y2="35" stroke="#FFFFFF" strokeWidth="2.2" strokeDasharray="3 3" opacity="0.5" />
    {/* Universal scissors action */}
    <circle cx="11" cy="13" r="4.2" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
    <circle cx="11" cy="27" r="4.2" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
    <path d="M14.5 16L31 29" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M14.5 24L31 11" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="21" cy="20" r="1.8" fill="#FFFFFF" />
  </svg>
);

// --- 12. COMPRIMIR PDF: Universal inward compression arrows (pure action, no confusing inner document X) ---
export const CompressDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* 4 corner arrows pointing inwards to a compact center */}
    <path d="M7 15H15V7M7 15L15 7" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 15H25V7M33 15L25 7" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 25H15V33M7 25L15 33" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 25H25V33M33 25L25 33" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Center compact core */}
    <rect x="17.5" y="17.5" width="5" height="5" rx="1.5" fill="#FFFFFF" />
  </svg>
);

// --- 13. ROTAR PDF: Pure bold circular clockwise rotation arrow ---
export const RotateDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Clear 270 degree circular arc */}
    <path
      d="M31 19C31 26.18 25.18 32 18 32C10.82 32 5 26.18 5 19C5 11.82 10.82 6 18 6C23 6 27.3 8.8 29.5 13"
      stroke="#FFFFFF"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
    {/* Prominent sharp arrowhead pointing clockwise */}
    <path
      d="M23 13.5H31.5V5"
      stroke="#FFFFFF"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Subtle central axis point */}
    <circle cx="18" cy="19" r="2.2" fill="#FFFFFF" />
  </svg>
);

// --- 14. PROTEGER PDF: Bold white padlock ---
export const ProtectDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <path d="M13 17V12C13 8.1 16.1 5 20 5C23.9 5 27 8.1 27 12V17" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    <rect x="9" y="16" width="22" height="18" rx="4" fill="#FFFFFF" />
    <circle cx="20" cy="24" r="2.4" fill="currentColor" />
    <path d="M20 26.4V30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

// --- 15. DESBLOQUEAR PDF: Bold white unlocked padlock ---
export const UnlockDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <path d="M13 12C13 8.1 16.1 5 20 5C23.9 5 27 8.1 27 12" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    <rect x="9" y="16" width="22" height="18" rx="4" fill="#FFFFFF" />
    <circle cx="20" cy="24" r="2.4" fill="currentColor" />
    <path d="M20 26.4V30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

// --- 16. REPARAR PDF: Bold white document with prominent wrench ---
export const RepairDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="5" width="26" height="30" rx="4" stroke="#FFFFFF" strokeWidth="2.6" fill="none" />
    <path
      d="M16 16C16 14 17.5 12.5 19.5 12.5C20.3 12.5 21 12.8 21.6 13.2L19.4 15.4L21.2 17.2L23.4 15C23.8 15.6 24.1 16.3 24.1 17.1C24.1 19.1 22.6 20.6 20.6 20.6L16.5 24.7L14 22.2L18.1 18.1C16.8 17.5 16 16.8 16 16Z"
      fill="#FFFFFF"
      transform="scale(1.1) translate(-2, -2)"
    />
  </svg>
);

// --- 17. EXTRAER PÁGINAS: Document + large outward white arrow ---
export const ExtractPagesIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Base document */}
    <rect x="7" y="11" width="18" height="23" rx="3" stroke="#FFFFFF" strokeWidth="2.6" fill="none" />
    {/* Extracted page */}
    <rect x="15" y="6" width="18" height="23" rx="3" stroke="#FFFFFF" strokeWidth="2.8" fill="#FFFFFF" fillOpacity="0.3" />
    {/* Large bold outward arrow */}
    <path d="M24 23V11M17 17L24 10L31 17" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- 18. ELIMINAR PÁGINAS: Document + large prominent white X ---
export const DeletePagesIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Document page */}
    <rect x="7" y="5" width="26" height="30" rx="4" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
    {/* Large, unmistakable bold white X across the document */}
    <path d="M13 12L27 28M27 12L13 28" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
  </svg>
);

// --- 19. NUMERAR PÁGINAS: Clean bold hash action symbol for page numbering ---
export const NumberPagesIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Universal Hash / Page numbering glyph */}
    <line x1="16" y1="7" x2="12" y2="33" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
    <line x1="28" y1="7" x2="24" y2="33" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
    <line x1="7" y1="15" x2="33" y2="15" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
    <line x1="6" y1="25" x2="32" y2="25" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
  </svg>
);

// --- 20. RECORTAR PDF: Clean bold crop framing marks ---
export const CropDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <path d="M13 8V27H32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M27 32V13H8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- 21. MARCA DE AGUA: Bold water droplet stamp ---
export const WatermarkDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="8" y="6" width="24" height="28" rx="4" stroke="#FFFFFF" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.15" />
    <path d="M20 13C20 13 15 18 15 21C15 23.8 17.2 26 20 26C22.8 26 25 23.8 25 21C25 18 20 13 20 13Z" fill="#FFFFFF" />
  </svg>
);

// --- 22. FIRMAR PDF: Clean bold fountain pen & signature line ---
export const SignDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Pen nib */}
    <path d="M25 7L32 14L19 27L12 28L13 21L25 7Z" fill="#FFFFFF" />
    <circle cx="15.5" cy="24.5" r="1.2" fill="#7C3AED" />
    {/* Signature line below */}
    <path
      d="M8 32C13 30 15 33 18 31C21 29 23 31 27 30C29 29.5 31 31 33 30"
      stroke="#FFFFFF"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
  </svg>
);

// --- 23. CENSURAR PDF: Document with bold redaction bars ---
export const RedactDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="8" y="6" width="24" height="28" rx="4" stroke="#FFFFFF" strokeWidth="2.4" fill="#FFFFFF" fillOpacity="0.15" />
    <line x1="13" y1="12" x2="27" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Bold redaction block */}
    <rect x="12" y="16" width="16" height="5" rx="1.5" fill="#FFFFFF" />
    <rect x="12" y="24" width="11" height="5" rx="1.5" fill="#FFFFFF" />
  </svg>
);

// --- 24. COMPARAR PDF: Split-Screen Comparison Sheets ---
export const CompareDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Left doc */}
    <rect x="7" y="9" width="11" height="22" rx="2.5" stroke="#FFFFFF" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.25" />
    <line x1="10" y1="14" x2="15" y2="14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="10" y1="18" x2="15" y2="18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    {/* Right doc */}
    <rect x="22" y="9" width="11" height="22" rx="2.5" stroke="#FFFFFF" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.25" />
    <line x1="25" y1="14" x2="30" y2="14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="25" y1="18" x2="30" y2="18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    {/* Center comparison arrows */}
    <path d="M17.5 17L19.5 15M21.5 17L19.5 19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// --- 25. RESUMIR PDF: Document with bold AI sparkle summary ---
export const SummarizeDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="8" width="20" height="24" rx="3.5" stroke="#FFFFFF" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.15" />
    <line x1="11" y1="14" x2="21" y2="14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="19" x2="19" y2="19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="24" x2="17" y2="24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Prominent sparkle */}
    <path d="M29 9L30.5 14L35.5 15.5L30.5 17L29 22L27.5 17L22.5 15.5L27.5 14L29 9Z" fill="#FFFFFF" />
  </svg>
);

// --- 26. EXTRAER DATOS: Data table schema grid ---
export const ExtractDataDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="8" width="26" height="24" rx="4" stroke="#FFFFFF" strokeWidth="2.4" fill="#FFFFFF" fillOpacity="0.15" />
    <line x1="7" y1="15" x2="33" y2="15" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="7" y1="23" x2="33" y2="23" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="20" y1="15" x2="20" y2="32" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
);

// --- 27. GENERAR QR: Bold high-contrast QR Matrix ---
export const QrCodeDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <rect x="7" y="7" width="10" height="10" rx="2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
    <rect x="10" y="10" width="4" height="4" rx="0.5" fill="#FFFFFF" />
    <rect x="23" y="7" width="10" height="10" rx="2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
    <rect x="26" y="10" width="4" height="4" rx="0.5" fill="#FFFFFF" />
    <rect x="7" y="23" width="10" height="10" rx="2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
    <rect x="10" y="26" width="4" height="4" rx="0.5" fill="#FFFFFF" />
    <rect x="23" y="23" width="4" height="4" fill="#FFFFFF" />
    <rect x="29" y="29" width="4" height="4" fill="#FFFFFF" />
    <rect x="23" y="29" width="3" height="3" fill="#FFFFFF" />
  </svg>
);

/**
 * Maps any tool slug to its distinct, high-clarity colorful icon.
 * If a custom rich icon exists, it returns it; otherwise returns null for generic fallback.
 */
export function getRichToolIcon(canonicalSlug: string): FC<IconProps> | null {
  switch (canonicalSlug) {
    // Word conversions
    case "word-a-pdf":
    case "pdf-a-word":
      return WordFileIcon;

    // Excel conversions
    case "excel-a-pdf":
    case "pdf-a-excel":
      return ExcelFileIcon;

    // PowerPoint conversions
    case "powerpoint-a-pdf":
    case "pdf-a-powerpoint":
      return PowerPointFileIcon;

    // Image / JPG / PNG
    case "jpg-a-pdf":
    case "pdf-a-jpg":
    case "png-a-pdf":
    case "pdf-a-png":
      return JpgFileIcon;

    // WebP
    case "webp-a-pdf":
    case "webp-to-pdf":
    case "pdf-a-webp":
      return WebpFileIcon;

    // Markdown
    case "markdown-a-pdf":
    case "markdown-to-pdf":
    case "pdf-a-markdown":
      return MarkdownFileIcon;

    // SVG
    case "svg-a-pdf":
    case "svg-to-pdf":
      return SvgFileIcon;

    // PDF/A Archival
    case "pdf-a-pdfa":
      return PdfAFileIcon;

    // OCR & Extracción de texto
    case "ocr-pdf":
    case "extraer-texto-pdf":
      return OcrFileIcon;

    // Organization
    case "unir-pdf":
      return MergeDocIcon;
    case "dividir-pdf":
      return SplitDocIcon;
    case "rotar-pdf":
    case "reordenar-paginas-pdf":
    case "reordenar-pagines-pdf":
    case "reorder-pdf-pages":
      return RotateDocIcon;
    case "insertar-paginas-pdf":
    case "inserir-pagines-pdf":
    case "insert-pages-pdf":
      return MergeDocIcon;

    // Optimization
    case "comprimir-pdf":
      return CompressDocIcon;
    case "reparar-pdf":
      return RepairDocIcon;
    case "aplanar-pdf":
    case "flatten-pdf":
    case "eliminar-metadatos-pdf":
    case "eliminar-metadades-pdf":
    case "remove-pdf-metadata":
    case "redimensionar-pdf":
    case "resize-pdf":
    case "optimizar-pdf-para-impresion":
    case "optimitzar-pdf-per-impressio":
    case "optimize-pdf-for-print":
      return CompressDocIcon;

    // Editing
    case "eliminar-paginas-pdf":
    case "eliminar-paginas":
      return DeletePagesIcon;
    case "extraer-paginas-pdf":
    case "extraer-paginas":
      return ExtractPagesIcon;
    case "recortar-pdf":
      return CropDocIcon;
    case "numerar-paginas-pdf":
    case "numerar-paginas":
      return NumberPagesIcon;
    case "editar-metadatos-pdf":
    case "editar-metadades-pdf":
    case "edit-pdf-metadata":
      return RepairDocIcon;
    case "anadir-texto-pdf":
    case "afegir-text-pdf":
    case "add-text-to-pdf":
      return NumberPagesIcon;

    // Security
    case "proteger-pdf":
      return ProtectDocIcon;
    case "desbloquear-pdf":
      return UnlockDocIcon;
    case "redactar-pdf":
    case "censurar-pdf":
      return RedactDocIcon;
    case "marca-de-agua":
      return WatermarkDocIcon;
    case "firmar-pdf":
      return SignDocIcon;

    // AI & Smart Tools
    case "resumir-pdf":
      return SummarizeDocIcon;
    case "extraer-datos-pdf":
    case "extraer-datos":
      return ExtractDataDocIcon;
    case "generar-qr-pdf":
    case "qr-pdf":
      return QrCodeDocIcon;
    case "comparar-pdf":
      return CompareDocIcon;

    // New tools (44→50)
    case "extraer-imagenes-pdf":
    case "extract-images-pdf":
    case "extreure-imatges-pdf":
      return ExtractPagesIcon;
    case "dividir-pdf-por-tamano":
    case "dividir-pdf-per-mida":
    case "split-pdf-by-size":
      return SplitDocIcon;
    case "eliminar-paginas-en-blanco":
    case "eliminar-pagines-en-blanc":
    case "remove-blank-pages":
      return DeletePagesIcon;
    case "imagen-a-webp":
    case "imatge-a-webp":
    case "image-to-webp":
      return CompressDocIcon;
    case "sanear-pdf":
    case "clean-pdf":
      return ProtectDocIcon;
    case "rellenar-formulario-pdf":
    case "emplenar-formulari-pdf":
    case "fill-pdf-form":
      return NumberPagesIcon;
    case "mejorar-imagenes":
    case "millorar-imatges":
    case "enhance-image":
      return RepairDocIcon;

    default:
      return null;
  }
}
