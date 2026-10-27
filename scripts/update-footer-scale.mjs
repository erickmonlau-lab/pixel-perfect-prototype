import fs from 'node:fs';

const file = 'src/components/site/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

// Increase column header fonts to text-[19px] sm:text-[20px] font-black
content = content.replace(
  /className="mb-6 text-\[18px\] sm:text-\[19px\] font-extrabold uppercase tracking-\[0\.04em\] text-white leading-tight"/g,
  'className="mb-6 text-[19px] sm:text-[21px] font-black uppercase tracking-wider text-white leading-tight"'
);

// Increase links font to text-[16px] sm:text-[16.5px] font-semibold text-slate-200
content = content.replace(
  /className="group inline-flex items-center gap-2\.5 text-\[15px\] sm:text-\[15\.5px\] font-medium text-slate-300 transition-colors hover:text-\[#EC3C2D\]"/g,
  'className="group inline-flex items-center gap-2.5 text-[16px] sm:text-[16.5px] font-semibold text-slate-200 transition-colors hover:text-[#EC3C2D]"'
);

content = content.replace(
  /className="group inline-flex items-center gap-2\.5 font-medium text-slate-300 transition-colors hover:text-\[#EC3C2D\]"/g,
  'className="group inline-flex items-center gap-2.5 font-semibold text-[16px] sm:text-[16.5px] text-slate-200 transition-colors hover:text-[#EC3C2D]"'
);

content = content.replace(
  /className="group inline-flex items-center gap-1\.5 text-\[15px\] font-bold text-\[#EC3C2D\] transition-colors hover:text-\[#FF5A4D\]"/g,
  'className="group inline-flex items-center gap-1.5 text-[16px] font-black text-[#EC3C2D] transition-colors hover:text-white"'
);

// Increase description text
content = content.replace(
  /className="text-\[15px\] sm:text-\[15\.5px\] leading-\[1\.65\] text-slate-300 max-w-\[280px\]"/g,
  'className="text-[16px] sm:text-[16.5px] leading-relaxed text-slate-300 max-w-[280px] font-medium"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated typography scale in Footer.tsx');
