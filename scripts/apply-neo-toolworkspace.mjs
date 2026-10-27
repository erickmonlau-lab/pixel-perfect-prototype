import fs from 'node:fs';

const file = 'src/components/tools/ToolWorkspace.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace workspace outer wrapper
content = content.replace(
  /className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"/,
  'className="overflow-hidden rounded-3xl border-2 border-[#0F0F12] bg-white shadow-[6px_6px_0_#0F0F12]"'
);

// Replace dropzone container
content = content.replace(
  /className=\{`transition-all duration-200 m-3 sm:m-4 rounded-2xl border px-5 py-8 sm:py-10 text-center cursor-pointer shadow-xs \$\{[\s\S]*?\}`\}/,
  `className={\`transition-all duration-120 m-4 sm:m-6 rounded-2xl border-2 border-[#0F0F12] px-6 py-10 sm:py-14 text-center cursor-pointer \${
    dragging
      ? "bg-[#FEECEB] scale-[1.005] shadow-[6px_6px_0_#EC3C2D]"
      : "bg-[#EDEDF0] shadow-[4px_4px_0_#0F0F12] hover:bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12]"
  }\`}`
);

// Replace upload icon
content = content.replace(
  /className="mx-auto flex size-16 sm:size-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-\[#EC3C2D\] text-white shadow-md transition-transform hover:scale-105"/,
  'className="mx-auto flex size-16 sm:size-20 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[4px_4px_0_#0F0F12] transition-transform hover:scale-105"'
);

// Replace Select button in Dropzone
content = content.replace(
  /className="h-13 sm:h-14 px-9 sm:px-11 text-\[16\.5px\] sm:text-\[17\.5px\] font-black rounded-xl sm:rounded-2xl bg-\[#EC3C2D\] text-white shadow-\[0_6px_20px_rgba\(236,60,45,0\.30\)\] hover:bg-\[#D93426\] hover:shadow-\[0_8px_25px_rgba\(236,60,45,0\.40\)\] transition-all hover:-translate-y-0\.5 active:translate-y-0 cursor-pointer"/,
  'className="h-14 sm:h-16 px-10 sm:px-12 text-[17px] sm:text-[19px] font-black rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[4px_4px_0_#0F0F12] hover:bg-[#D43426] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"'
);

// Replace privacy badge in Dropzone
content = content.replace(
  /className="inline-flex items-center gap-2\.5 rounded-full border border-slate-200 bg-white px-4 py-1\.5 text-\[13\.5px\] sm:text-\[14\.5px\] font-bold text-\[#0F172A\] shadow-xs"/,
  'className="inline-flex items-center gap-2.5 rounded-lg border-2 border-[#0F0F12] bg-white px-4 py-1.5 text-[13.5px] sm:text-[14.5px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]"'
);

// Replace settings toggle button
content = content.replace(
  /className="inline-flex items-center gap-2 rounded-xl bg-\[#2563EB\] hover:bg-\[#1D4ED8\] px-4\.5 py-2\.5 text-\[14px\] sm:text-\[14\.5px\] font-bold text-white transition-all cursor-pointer shadow-xs hover:shadow-md"/,
  'className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] px-5 py-2.5 text-[14px] sm:text-[15px] font-black text-white shadow-[3px_3px_0_#EC3C2D] transition-all cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px]"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated ToolWorkspace.tsx to Neo-Brutalist design');
