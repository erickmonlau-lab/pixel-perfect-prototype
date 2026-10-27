import fs from 'fs';

const filePath = 'src/components/site/RichToolIcon.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Update MergeDocIcon
const oldMerge = `export const MergeDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Clean overlapping documents merging together */}
    <rect x="7" y="6" width="17" height="23" rx="3" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
    <rect x="16" y="11" width="17" height="23" rx="3" fill="#FFFFFF" />
    {/* Prominent merge plus */}
    <path d="M24.5 17.5V27.5M19.5 22.5H29.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);`;

const newMerge = `export const MergeDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Clean overlapping documents merging together */}
    <rect x="7" y="6" width="17" height="23" rx="3" stroke="currentColor" strokeWidth="2.8" fill="none" />
    <rect x="16" y="11" width="17" height="23" rx="3" fill="currentColor" />
    {/* Prominent merge plus */}
    <path d="M24.5 17.5V27.5M19.5 22.5H29.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);`;

// Update SplitDocIcon
const oldSplit = `export const SplitDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
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
);`;

const newSplit = `export const SplitDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* Cutting guide dashed line */}
    <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="2.2" strokeDasharray="3 3" opacity="0.5" />
    {/* Universal scissors action */}
    <circle cx="11" cy="13" r="4.2" stroke="currentColor" strokeWidth="2.8" fill="none" />
    <circle cx="11" cy="27" r="4.2" stroke="currentColor" strokeWidth="2.8" fill="none" />
    <path d="M14.5 16L31 29" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M14.5 24L31 11" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="21" cy="20" r="1.8" fill="currentColor" />
  </svg>
);`;

let updated = 0;
if (code.includes(oldMerge)) {
  code = code.replace(oldMerge, newMerge);
  updated++;
}
if (code.includes(oldSplit)) {
  code = code.replace(oldSplit, newSplit);
  updated++;
}

if (updated > 0) {
  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`SUCCESS: Updated ${updated} icons to currentColor in RichToolIcon.tsx`);
} else {
  console.log('WARNING: No matches found for icon update');
}
