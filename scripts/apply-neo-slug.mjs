import fs from 'node:fs';

const file = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Tool Page Hero H1
content = content.replace(
  /className="text-display max-w-4xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-\[2\.75rem\] leading-tight"/,
  'className="text-display max-w-4xl text-3xl font-black tracking-tight text-[#0F0F12] sm:text-5xl lg:text-6xl leading-[0.98] uppercase"'
);

// 2. How it works steps cards
content = content.replace(
  /className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-start"/g,
  'className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-8 shadow-[4px_4px_0_#0F0F12] flex flex-col justify-start transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12]"'
);

content = content.replace(
  /className=\{`flex size-10 items-center justify-center rounded-full text-white text-\[16px\] font-black shadow-xs \$\{accent\.iconBg\}`\}/g,
  'className="flex size-11 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white text-[17px] font-black shadow-[2px_2px_0_#0F0F12]"'
);

// 3. Technical editorial block container
content = content.replace(
  /className="rounded-3xl border-2 border-slate-200 bg-white p-8 sm:p-12 shadow-\[0_4px_24px_rgba\(15,23,42,0\.06\)\]"/,
  'className="rounded-3xl border-2 border-[#0F0F12] bg-white p-8 sm:p-12 shadow-[6px_6px_0_#0F0F12]"'
);

// Eyebrow badge
content = content.replace(
  /className="flex items-center gap-2\.5 text-\[14px\] sm:text-\[15px\] font-black uppercase tracking-wide text-\[#EC3C2D\]"/,
  'className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-3.5 py-1 text-[13px] sm:text-[14px] font-black uppercase tracking-wide text-white shadow-[2px_2px_0_#0F0F12]"'
);

// Casos de uso card: Solid White Card with 2px Black border and 4px shadow
content = content.replace(
  /className="rounded-2xl border-2 border-\[#93C5FD\] bg-\[#DBEAFE\] p-7 shadow-sm flex flex-col justify-start"/,
  'className="rounded-2xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-7 shadow-[4px_4px_0_#0F0F12] flex flex-col justify-start"'
);

// Limitaciones card: Solid Black Card with 2px Black border and 4px shadow
content = content.replace(
  /className="rounded-2xl border-2 border-\[#FCA5A5\] bg-\[#FEE2E2\] p-7 shadow-sm flex flex-col justify-start"/,
  'className="rounded-2xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white p-7 shadow-[4px_4px_0_#EC3C2D] flex flex-col justify-start [&_h3]:text-white [&_ul]:text-slate-200"'
);

// Pro Tip banner: Solid Red Card with 2px Black border and 4px shadow
content = content.replace(
  /className="mt-6 rounded-2xl border-2 border-\[#BFDBFE\] bg-\[#EFF6FF\] p-6 sm:p-7 text-\[16\.5px\] sm:text-\[17\.5px\] text-\[#0F172A\] flex items-start gap-4 shadow-sm"/,
  'className="mt-6 rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white p-6 sm:p-7 text-[16.5px] sm:text-[17.5px] flex items-start gap-4 shadow-[4px_4px_0_#0F0F12] [&_p]:text-white [&_p]:font-bold"'
);

content = content.replace(
  /className="inline-flex items-center justify-center rounded-lg bg-\[#EC3C2D\] px-2\.5 py-1 text-\[13px\] font-black uppercase text-white shrink-0 tracking-wide"/,
  'className="inline-flex items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-1 text-[13px] font-black uppercase text-white shrink-0 tracking-wide shadow-[2px_2px_0_#0F0F12]"'
);

// Explore category button
content = content.replace(
  /className=\{`group inline-flex items-center gap-2 rounded-xl \$\{accent\.iconBg\} hover:opacity-90 text-white px-5 py-2\.5 text-\[15px\] sm:text-\[15\.5px\] font-bold transition-all shadow-xs hover:shadow-md cursor-pointer`\}/,
  'className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] hover:bg-[#EC3C2D] text-white px-6 py-3 text-[15px] sm:text-[16px] font-black transition-all shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated $slug.tsx to Neo-Brutalist design');
