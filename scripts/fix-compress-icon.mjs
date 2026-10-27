import fs from 'fs';

const filePath = 'src/components/site/RichToolIcon.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace CompressDocIcon paths stroke and rect fill with currentColor
const target = `export const CompressDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* 4 corner arrows pointing inwards to a compact center */}
    <path d="M7 15H15V7M7 15L15 7" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 15H25V7M33 15L25 7" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 25H15V33M7 25L15 33" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 25H25V33M33 25L25 33" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Center compact core */}
    <rect x="17.5" y="17.5" width="5" height="5" rx="1.5" fill="#FFFFFF" />
  </svg>
);`;

const replacement = `export const CompressDocIcon: FC<IconProps> = ({ className = "size-8", ...props }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} {...props}>
    {/* 4 corner arrows pointing inwards to a compact center */}
    <path d="M7 15H15V7M7 15L15 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 15H25V7M33 15L25 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 25H15V33M7 25L15 33" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 25H25V33M33 25L25 33" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Center compact core */}
    <rect x="17.5" y="17.5" width="5" height="5" rx="1.5" fill="currentColor" />
  </svg>
);`;

if (code.includes('M7 15H15V7M7 15L15 7" stroke="#FFFFFF"')) {
  code = code.replace(target, replacement);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: CompressDocIcon updated to currentColor');
} else {
  console.log('WARNING: target pattern not found in', filePath);
}
