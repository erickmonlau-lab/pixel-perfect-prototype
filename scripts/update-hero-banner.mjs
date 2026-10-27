import fs from 'node:fs';

const filePath = 'src/routes/$lang/index.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// We need Sparkles / Sparkle icon or star SVG for neo-brutalist decorative accents
const newHeroSection = `      {/* ============================================================
          SECTION — HERO: Neo-Brutalist High-Impact with Asymmetric Floating Widgets
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
        
        {/* Sutil viñeta radial exterior para enmarcar el fondo de puntos */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(15,15,18,0.06)_100%)] z-10" />

        {/* Micro-elementos decorativos neobrutalistas flotantes en los extremos exteriores */}
        <div className="hidden 2xl:block pointer-events-none select-none z-15">
          {/* Estrella / destello superior izquierdo */}
          <div className="absolute left-8 3xl:left-16 top-16 text-[#0F0F12] opacity-70 animate-neo-float-slow">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#0F0F12" className="drop-shadow-[2px_2px_0_#FEF08A]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          {/* Cruz / asterisco inferior izquierdo */}
          <div className="absolute left-14 3xl:left-24 bottom-20 text-[#EC3C2D] opacity-80 animate-neo-float-reverse">
            <div className="text-3xl font-black select-none drop-shadow-[2px_2px_0_#0F0F12]">+</div>
          </div>
          {/* Estrella / destello superior derecho */}
          <div className="absolute right-10 3xl:right-20 top-20 text-[#EC3C2D] opacity-80 animate-neo-float-reverse">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#EC3C2D" className="drop-shadow-[2px_2px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          {/* Asterisco inferior derecho */}
          <div className="absolute right-14 3xl:right-28 bottom-24 text-[#0F0F12] opacity-60 animate-neo-float-slow">
            <div className="text-4xl font-black select-none drop-shadow-[2px_2px_0_#10B981]">✱</div>
          </div>
        </div>

        {/* Contenedor relativo principal */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
          
          {/* Wrapper central con ancho fijo controlado (720px) para anclaje exacto de widgets laterales */}
          <div className="relative mx-auto max-w-[720px]">

            {/* ============================================================
                WIDGETS LATERALES DESKTOP (Anclados con position:absolute al wrapper central max-w-[720px])
                Visibles al 85%-90% sin quedar tapados por la tarjeta central
                ============================================================ */}

            {/* Widget 1 Izquierda Superior: WASM Local */}
            <div 
              style={{ left: "-14.5rem", top: "10%" }}
              className="hidden lg:block absolute z-20 w-[240px] select-none transform -rotate-4 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-default"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#10B981] transition-shadow">
                <div className="flex items-center gap-3">
                  <img
                    src={BRAND_ASSETS.mascots.celebrate}
                    alt="BreadPDF Mascot"
                    width={52}
                    height={52}
                    className="size-13 object-contain animate-neo-wiggle shrink-0"
                  />
                  <div>
                    <span className="inline-block rounded-md bg-[#10B981] text-white text-[11px] font-black uppercase px-2 py-0.5 border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                      WASM LOCAL
                    </span>
                    <span className="block text-[13.5px] font-black text-[#0F0F12] mt-1 leading-snug">
                      {heroCopy.progressComplete}
                    </span>
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="h-2.5 w-full rounded-full border border-[#0F0F12] bg-slate-100 overflow-hidden">
                    <div className="h-full w-full bg-[#10B981] rounded-full" />
                  </div>
                  <p className="mt-1.5 text-[12px] font-bold text-slate-700 leading-tight">
                    {heroCopy.instantBadge}
                  </p>
                </div>
              </div>
            </div>

            {/* Widget 2 Izquierda Inferior: Conversión PDF -> Word */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              style={{ left: "-13.5rem", bottom: "14%" }}
              className="hidden lg:block absolute z-20 w-[230px] select-none transform rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-pointer"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#2563EB] transition-shadow">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white text-[13px] font-black px-2.5 py-1 shadow-[2px_2px_0_#0F0F12]">
                    {heroCopy.convertFrom}
                  </span>
                  <ArrowRightLeft className="size-4.5 text-[#0F0F12] shrink-0 animate-pulse" />
                  <span className="rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white text-[13px] font-black px-2.5 py-1 shadow-[2px_2px_0_#0F0F12]">
                    WORD
                  </span>
                </div>
                <p className="mt-2.5 text-[12px] font-bold text-slate-800 text-center leading-tight">
                  Conversión nativa en alta fidelidad
                </p>
              </div>
            </Link>

            {/* Widget 3 Derecha Superior: Ahorro de peso -80% */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              style={{ right: "-14.5rem", top: "12%" }}
              className="hidden lg:block absolute z-20 w-[240px] select-none transform rotate-4 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-pointer"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#EF4444] transition-shadow">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-[#0F0F12] bg-[#EF4444] text-white text-[11px] font-black px-2 py-0.5 shadow-[1px_1px_0_#0F0F12]">
                    {heroCopy.reductionBadge}
                  </span>
                  <img
                    src={BRAND_ASSETS.mascots.run}
                    alt="BreadPDF Compress"
                    width={44}
                    height={44}
                    className="size-11 object-contain shrink-0"
                  />
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-slate-100 pt-2">
                  <span className="text-[13.5px] font-bold text-slate-400 line-through">
                    {heroCopy.reductionSaved}
                  </span>
                  <span className="text-[17px] font-black text-[#059669]">
                    {heroCopy.reductionCurrent}
                  </span>
                </div>
                <p className="mt-1 text-[12px] font-bold text-slate-700 leading-tight">
                  Optimización sin pérdida visible
                </p>
              </div>
            </Link>

            {/* Widget 4 Derecha Inferior: 100% Privado */}
            <div 
              style={{ right: "-13.5rem", bottom: "16%" }}
              className="hidden lg:block absolute z-20 w-[230px] select-none transform -rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-default"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-shadow text-[#0F0F12]">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-xl border-2 border-[#0F0F12] bg-white p-1.5 shadow-[2px_2px_0_#0F0F12]">
                    <ShieldCheck className="size-5 text-[#0F0F12]" />
                  </span>
                  <span className="text-[15px] font-black tracking-tight leading-none">
                    {heroCopy.privateTitle}
                  </span>
                </div>
                <p className="mt-2 text-[12px] font-bold text-[#0F0F12]/95 leading-snug">
                  {heroCopy.privateSubtitle}
                </p>
              </div>
            </div>

            {/* ============================================================
                TARJETA CENTRAL BLANCA PROTEGIDA
                Ancho generoso (max-w-[720px]), padding amplio px-8 py-10 lg:px-10 lg:py-12
                ============================================================ */}
            <div className="relative z-25 rounded-3xl border-2 border-[#0F0F12] bg-white px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-13 shadow-[6px_6px_0_#0F0F12] text-center">
              
              {/* H1 — Jerarquía potente con line-height 1.1 y margen vertical holgado en badge PDF */}
              <h1 className="text-display mx-auto max-w-[660px] text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem] font-black leading-[1.1] tracking-[-0.035em] text-[#0F0F12] uppercase">
                <span className="block">{heroCopy.line1}</span>
                <span className="inline-flex items-center justify-center flex-wrap gap-2.5 my-2 sm:my-2.5">
                  <span className="inline-block transform -rotate-1 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white px-4 py-0.5 sm:px-5 sm:py-1 shadow-[4px_4px_0_#0F0F12]">
                    PDF.
                  </span>
                  <span>{heroCopy.line2}</span>
                </span>
              </h1>

              {/* Subtítulo — Nítido, peso mediano-alto */}
              <p className="mx-auto mt-3 max-w-[600px] text-[17.5px] sm:text-[19.5px] leading-relaxed text-slate-800 font-semibold">
                {t.home.sub}
              </p>

              {/* Buscador y Populares */}
              <div className="mx-auto mt-6 max-w-[640px] text-left [&_.flex-wrap]:justify-center sm:mt-7">
                <ToolSearch size="lg" />
              </div>
            </div>

          </div>

          {/* ============================================================
              COMPORTAMIENTO RESPONSIVE (Mobile / Tablet < lg)
              En pantallas < 1024px las tarjetas laterales se muestran debajo en un grid limpio 2x2
              ============================================================ */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden max-w-[720px] mx-auto">
            {/* Mobile Card 1: WASM Local */}
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND_ASSETS.mascots.celebrate}
                  alt="BreadPDF Mascot"
                  width={46}
                  height={46}
                  className="size-11 object-contain shrink-0"
                />
                <div>
                  <span className="inline-block rounded-md bg-[#10B981] text-white text-[10.5px] font-black uppercase px-2 py-0.5 border border-[#0F0F12]">
                    WASM LOCAL
                  </span>
                  <span className="block text-[13px] font-black text-[#0F0F12] mt-0.5">
                    {heroCopy.progressComplete}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-600 block">
                    {heroCopy.instantBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Card 2: Conversión PDF -> Word */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex flex-col justify-center cursor-pointer hover:bg-slate-50"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white text-[12px] font-black px-2.5 py-1 shadow-[2px_2px_0_#0F0F12]">
                  {heroCopy.convertFrom}
                </span>
                <ArrowRightLeft className="size-4 text-[#0F0F12] shrink-0" />
                <span className="rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white text-[12px] font-black px-2.5 py-1 shadow-[2px_2px_0_#0F0F12]">
                  WORD
                </span>
              </div>
              <p className="mt-2 text-[11.5px] font-bold text-slate-700 text-center">
                Conversión nativa en alta fidelidad
              </p>
            </Link>

            {/* Mobile Card 3: Ahorro de peso -80% */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50"
            >
              <div>
                <span className="rounded-md border border-[#0F0F12] bg-[#EF4444] text-white text-[10.5px] font-black px-2 py-0.5">
                  {heroCopy.reductionBadge}
                </span>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-[12px] font-bold text-slate-400 line-through">
                    {heroCopy.reductionSaved}
                  </span>
                  <span className="text-[15px] font-black text-[#059669]">
                    {heroCopy.reductionCurrent}
                  </span>
                </div>
              </div>
              <img
                src={BRAND_ASSETS.mascots.run}
                alt="BreadPDF Compress"
                width={40}
                height={40}
                className="size-10 object-contain shrink-0"
              />
            </Link>

            {/* Mobile Card 4: 100% Privado */}
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] p-4 shadow-[3px_3px_0_#0F0F12] text-[#0F0F12] flex items-center gap-3">
              <span className="rounded-xl border-2 border-[#0F0F12] bg-white p-1.5 shadow-[2px_2px_0_#0F0F12] shrink-0">
                <ShieldCheck className="size-5 text-[#0F0F12]" />
              </span>
              <div>
                <span className="text-[14px] font-black tracking-tight leading-none block">
                  {heroCopy.privateTitle}
                </span>
                <p className="mt-0.5 text-[11.5px] font-bold text-[#0F0F12]/90 leading-tight">
                  {heroCopy.privateSubtitle}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>`;

// Replace from section containing bg-neo-dots up to SECTION — FULL CATALOG
const startIndex = content.indexOf('<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots');
const endIndex = content.indexOf('{/* ============================================================\n          SECTION — FULL CATALOG');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + newHeroSection.trim() + '\n\n      ' + content.slice(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Hero Banner in index.tsx!');
} else {
  console.error('Could not find start or end index:', { startIndex, endIndex });
}
