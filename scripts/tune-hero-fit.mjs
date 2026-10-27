import fs from "fs";

const file = "src/routes/$lang/index.tsx";
let code = fs.readFileSync(file, "utf8");

// 1. Line 1 headline: ensure whitespace nowrap for "TODAS TUS HERRAMIENTAS PDF."
// In the reference image:
// Line 1: "TODAS TUS HERRAMIENTAS [PDF.]"
// Line 2: "EN UN SOLO LUGAR." (with red underline)
code = code.replace(
  '<h1 className="text-display mx-auto max-w-5xl text-3xl sm:text-5xl md:text-[58px] lg:text-[66px] xl:text-[72px] font-black leading-[1.05] tracking-[-0.03em] text-[#0F0F12] uppercase [text-wrap:balance]">',
  '<h1 className="text-display mx-auto max-w-6xl text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black leading-[1.08] tracking-[-0.03em] text-[#0F0F12] uppercase">'
);

// 2. Reduce vertical padding of hero section and search spacing so everything fits within 900px fold
code = code.replace(
  'className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-6 sm:py-8 md:py-10 overflow-hidden"',
  'className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-4 sm:py-6 md:py-8 overflow-hidden"'
);

code = code.replace(
  'min-h-[460px] lg:min-h-[500px]',
  'min-h-[420px] lg:min-h-[460px]'
);

code = code.replace(
  'className="mx-auto mt-3.5 mb-6 max-w-2xl text-base sm:text-lg lg:text-xl font-medium text-slate-800 leading-relaxed"',
  'className="mx-auto mt-2.5 mb-4 max-w-2xl text-sm sm:text-base lg:text-lg font-medium text-slate-800 leading-normal"'
);

fs.writeFileSync(file, code, "utf8");
console.log("Updated headline and heights!");
