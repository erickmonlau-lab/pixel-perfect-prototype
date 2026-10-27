import fs from 'node:fs';

const filePath = 'src/components/site/ToolSearch.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update POPULAR_TOOL_STYLES to use compact padding: px-3 py-1.5 text-xs font-semibold whitespace-nowrap
const oldStyles = `const POPULAR_TOOL_STYLES: Record<ToolCategory, { pill: string }> = {
  optimizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  organizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  convertir: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  editar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  seguridad: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  inteligencia: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
};`;

const newStyles = `const POPULAR_TOOL_STYLES: Record<ToolCategory, { pill: string }> = {
  optimizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  organizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  convertir: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  editar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  seguridad: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
  inteligencia: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0F0F12]" },
};`;

// 2. Replace the Popular Tools block with a clean full-width flex-wrap container
const oldPopularBlock = `      {/* ============================================================
          POPULAR TOOLS BLOCK (continuation of search, 10-14px spacing)
          ============================================================ */}
      <div className="mt-3 flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-2.5 overflow-x-auto scrollbar-none py-1">
        {/* "Populares:" label */}
        <span className="shrink-0 text-[14px] font-semibold tracking-[-0.01em] text-[#0F172A]">
          {t.search.popular}:
        </span>

        {/* Fast Tool Pills: Single row on desktop & tablet, smooth natural wrap on mobile */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2">
          {suggestions.map((tool) => {
            const style = POPULAR_TOOL_STYLES[tool.category] ?? POPULAR_TOOL_STYLES.optimizar;

            return (
              <Link
                key={tool.slug}
                to={DETAIL_ROUTE}
                params={toolParams(locale, tool.canonicalSlug)}
                className={\`inline-flex shrink-0 h-[36px] items-center rounded-[11px] px-3.5 text-[13.5px] font-semibold transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 \${style.pill}\`}
              >
                <span className="whitespace-nowrap tracking-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>`;

const newPopularBlock = `      {/* ============================================================
          POPULAR TOOLS BLOCK (Full width, flex-wrap centered, zero overflow)
          ============================================================ */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 w-full">
        {/* "Populares:" label */}
        <span className="shrink-0 text-[13px] font-black tracking-wider uppercase text-[#0F0F12] mr-1">
          {t.search.popular}:
        </span>

        {/* Fast Tool Pills: px-3 py-1.5 text-xs font-semibold whitespace-nowrap */}
        {suggestions.map((tool) => {
          const style = POPULAR_TOOL_STYLES[tool.category] ?? POPULAR_TOOL_STYLES.optimizar;

          return (
            <Link
              key={tool.slug}
              to={DETAIL_ROUTE}
              params={toolParams(locale, tool.canonicalSlug)}
              className={\`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer \${style.pill}\`}
            >
              <span>{tool.name}</span>
            </Link>
          );
        })}
      </div>`;

const normalize = (s) => s.replace(/\\r\\n/g, '\\n');
content = normalize(content);

if (content.includes(normalize(oldStyles))) {
  content = content.replace(normalize(oldStyles), normalize(newStyles));
  console.log('Replaced POPULAR_TOOL_STYLES');
} else {
  console.warn('POPULAR_TOOL_STYLES not found');
}

if (content.includes(normalize(oldPopularBlock))) {
  content = content.replace(normalize(oldPopularBlock), normalize(newPopularBlock));
  console.log('Replaced Popular Tools Block');
} else {
  console.warn('Popular Tools Block not found');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated ToolSearch.tsx!');
