import fs from 'node:fs';
import path from 'node:path';

// 3. UPDATE ToolCatalogCard.tsx
const cardPath = path.resolve('src/components/site/ToolCatalogCard.tsx');
let cardContent = fs.readFileSync(cardPath, 'utf8');

// Ensure ArrowUpRight is imported
if (!cardContent.includes('ArrowUpRight')) {
  cardContent = cardContent.replace(
    'import { Star } from "lucide-react";',
    'import { Star, ArrowUpRight } from "lucide-react";'
  );
}

// Update titleSize and descSize
cardContent = cardContent.replace(
  `  const titleSize = compact
    ? "text-[18px] sm:text-[19px] font-black"
    : "text-[20px] sm:text-[22px] font-black";`,
  `  const titleSize = compact
    ? "text-[19px] sm:text-[20px] font-black"
    : "text-[21px] sm:text-[23px] font-black";`
);

cardContent = cardContent.replace(
  `  const descSize = compact
    ? "text-[13.5px] sm:text-[14px] leading-normal"
    : "text-[14.5px] sm:text-[15px] leading-snug";`,
  `  const descSize = compact
    ? "text-[14px] sm:text-[14.5px] leading-normal"
    : "text-[15px] sm:text-[15.5px] leading-relaxed";`
);

// Add top colored accent stripe inside the card + corner hover arrow button
const oldCardOpening = `<div
      style={{ animationDelay: \`\${Math.min(index, 29) * 12}ms\` }}
      className={\`group relative flex h-full \${cardMinH} flex-col justify-start rounded-2xl border-2 border-[#0F0F12] \${cardPad} transition-all duration-150 select-none \${
        isPending
          ? "border-dashed bg-white/70 opacity-75 shadow-none"
          : \`bg-white shadow-[4px_4px_0_#0F0F12] \${colorTheme.shadowHover} \${colorTheme.tintBg} hover:-translate-y-1.5 active:translate-y-0 active:shadow-[2px_2px_0_#0F0F12]\`
      }\`}
    >`;

const newCardOpening = `<div
      style={{ animationDelay: \`\${Math.min(index, 29) * 12}ms\` }}
      className={\`group relative flex h-full \${cardMinH} flex-col justify-start rounded-2xl border-2 border-[#0F0F12] \${cardPad} pt-7 transition-all duration-150 select-none overflow-hidden \${
        isPending
          ? "border-dashed bg-white/70 opacity-75 shadow-none"
          : \`bg-white shadow-[4px_4px_0_#0F0F12] \${colorTheme.shadowHover} \${colorTheme.tintBg} hover:-translate-y-1.5 active:translate-y-0 active:shadow-[2px_2px_0_#0F0F12]\`
      }\`}
    >
      {/* 1. Franja superior vibrante con el color de la herramienta */}
      {!isPending && (
        <div className={\`absolute top-0 inset-x-0 h-2 \${colorTheme.bg} border-b-2 border-[#0F0F12]\`} />
      )}`;

if (cardContent.includes(oldCardOpening)) {
  cardContent = cardContent.replace(oldCardOpening, newCardOpening);
  console.log("Added top colored stripe to ToolCatalogCard!");
}

// Add corner arrow button in bottom-right
const oldBottomTagline = `<p className={\`mt-1.5 \${descSize} text-[#334155] font-medium line-clamp-3\`}>{tool.tagline}</p>
        </div>
      </div>
    </div>`;

const newBottomTagline = `<p className={\`mt-1.5 \${descSize} text-slate-600 font-medium line-clamp-3 pr-8\`}>{tool.tagline}</p>
        </div>
      </div>

      {/* 2. Botón circular con flecha diagonal ↗ interactivo en la esquina inferior derecha */}
      {!isPending && (
        <div className="absolute bottom-4 right-4 flex items-center justify-center">
          <span className={\`flex size-8 items-center justify-center rounded-full border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-all duration-150 group-hover:\${colorTheme.bg} group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5\`}>
            <ArrowUpRight className="size-4 stroke-[2.8]" />
          </span>
        </div>
      )}
    </div>`;

if (cardContent.includes(oldBottomTagline)) {
  cardContent = cardContent.replace(oldBottomTagline, newBottomTagline);
  console.log("Added bottom-right arrow button to ToolCatalogCard!");
}

fs.writeFileSync(cardPath, cardContent, 'utf8');
console.log("Updated ToolCatalogCard.tsx successfully!");
