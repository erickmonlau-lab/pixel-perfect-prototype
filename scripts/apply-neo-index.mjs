import fs from 'node:fs';

const file = 'src/routes/$lang/index.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace Hero section styling
content = content.replace(
  /<section className="hero-canvas relative z-20 border-b border-\[#E5E7EB\] pt-8 pb-8 sm:pt-10 sm:pb-9 lg:pt-11 lg:pb-10">/,
  '<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">'
);

// Replace H1 typography
content = content.replace(
  /<h1 className="text-display mx-auto max-w-\[860px\] text-\[2\.65rem\] font-black leading-\[1\.06\] tracking-\[-0\.035em\] text-\[#0F172A\] sm:text-\[3\.25rem\] lg:text-\[3\.75rem\]">/,
  '<h1 className="text-display mx-auto max-w-[980px] text-[3.2rem] font-black leading-[0.98] tracking-[-0.04em] text-[#0F0F12] sm:text-[4.2rem] lg:text-[5.2rem] uppercase">'
);

// Replace subtitle styling
content = content.replace(
  /<p className="mx-auto mt-3\.5 max-w-\[640px\] text-\[17px\] leading-relaxed text-\[#475569\] sm:text-\[19px\] font-medium">/,
  '<p className="mx-auto mt-5 max-w-[680px] text-[18px] leading-relaxed text-[#1E293B] sm:text-[21px] font-bold">'
);

// Replace Catalog section container
content = content.replace(
  /<section\s+className="border-b border-\[#E5E7EB\] bg-\[#F8FAFC\] pt-7 pb-14 sm:pt-9 sm:pb-16"\s+id="catalogo"\s*>/,
  '<section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-10 pb-16 sm:pt-12 sm:pb-20" id="catalogo">'
);

// Replace Editorial Section styling
content = content.replace(
  /<section className="border-t border-\[#F1F5F9\] bg-white py-10 sm:py-14">/,
  '<section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-14 sm:py-20">'
);

content = content.replace(
  /<span className="inline-flex items-center gap-1\.5 rounded-full border border-\[#B91C1C\] bg-\[#B91C1C\] px-3\.5 py-1 text-\[12px\] sm:text-\[12\.5px\] font-bold tracking-widest text-white uppercase shadow-2xs">/,
  '<span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-4 py-1.5 text-[12px] sm:text-[13px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#EC3C2D]">'
);

// Replace Editorial Cards in Home
content = content.replace(
  /className=\{`group relative flex flex-col justify-start rounded-2xl border border-slate-200\/90 bg-white p-6 sm:p-6\.5 shadow-\[0_1px_4px_rgba\(15,23,42,0\.03\)\] transition-all duration-300 hover:-translate-y-1 hover:shadow-\[0_12px_24px_rgba\(15,23,42,0\.06\)\] \$\{accent\.border\}`\}/,
  'className="group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12]"'
);

// Replace Editorial Icon container
content = content.replace(
  /className=\{`inline-flex size-\[44px\] sm:size-\[48px\] shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 \$\{accent\.bg\} \$\{accent\.shadowGlow\}`\}/,
  'className="inline-flex size-[48px] sm:size-[52px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white shadow-[3px_3px_0_#EC3C2D] transition-transform duration-120 group-hover:bg-[#EC3C2D]"'
);

// Replace Guides Section styling
content = content.replace(
  /<section className="border-t border-\[#E2E8F0\] bg-\[#F8FAFC\] py-14 sm:py-20" aria-labelledby="home-guides-title">/,
  '<section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-14 sm:py-20" aria-labelledby="home-guides-title">'
);

// Replace Guide cards
content = content.replace(
  /className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"/,
  'className="group relative flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] hover:bg-white"'
);

// Replace All Guides button
content = content.replace(
  /className="group inline-flex items-center gap-2 self-start md:self-auto rounded-xl border border-slate-200 bg-white px-5 py-2\.5 text-sm font-bold text-slate-800 transition-all hover:border-\[#EC3C2D\] hover:bg-\[#EC3C2D\] hover:text-white shadow-xs"/,
  'className="group inline-flex items-center gap-2 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] px-6 py-3 text-sm font-black text-white transition-all shadow-[4px_4px_0_#EC3C2D] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#EC3C2D]"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated index.tsx to Neo-Brutalist design');
