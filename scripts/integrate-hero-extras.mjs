import fs from 'node:fs';
import path from 'node:path';

const p = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(p, 'utf8');

// 1. Add imports for ConfidenceMarquee, HowItWorksSection, MascotEasterEgg
c = c.replace(
  'import { TrustBanner } from "@/components/site/TrustBanner";',
  'import { TrustBanner } from "@/components/site/TrustBanner";\nimport { ConfidenceMarquee } from "@/components/site/ConfidenceMarquee";\nimport { HowItWorksSection } from "@/components/site/HowItWorksSection";\nimport { MascotEasterEgg } from "@/components/site/MascotEasterEgg";'
);

// 2. Replace the static mascot in the hero pill with MascotEasterEgg
const oldHeroMascot = `<div className="relative flex items-center justify-center size-9 -my-2.5 rounded-full bg-white border-2 border-[#0F0F12] shadow-[1px_1px_0_#0F0F12] overflow-hidden shrink-0">
                  <img
                    src={BRAND_ASSETS.mascotPng}
                    alt="BreadPDF Mascot"
                    width={36}
                    height={36}
                    className="size-8 object-contain transform group-hover:scale-110 transition-transform"
                  />
                </div>`;

const newHeroMascot = `<MascotEasterEgg />`;

if (c.includes(oldHeroMascot)) {
  c = c.replace(oldHeroMascot, newHeroMascot);
  console.log("Replaced Hero mascot with MascotEasterEgg!");
}

// 3. Fix tracking and letter spacing in H1
c = c.replace(
  `text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-black leading-[1.05] tracking-[-0.04em] text-[#0F0F12] uppercase`,
  `text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-black leading-[1.08] tracking-[-0.025em] text-[#0F0F12] uppercase [text-wrap:balance]`
);

// 4. Insert ConfidenceMarquee right after the hero section closing </section>
const heroClose = `      </section>

      {/* ============================================================
          SECTION — FULL CATALOG: Direct Product Entry via Filters
          ============================================================ */}`;

const withMarquee = `      </section>

      {/* MARQUEE DE CONFIANZA INFINITO BREADPDF */}
      <ConfidenceMarquee />

      {/* ============================================================
          SECTION — FULL CATALOG: Direct Product Entry via Filters
          ============================================================ */}`;

if (c.includes(heroClose)) {
  c = c.replace(heroClose, withMarquee);
  console.log("Inserted ConfidenceMarquee after Hero!");
}

// 5. Insert HowItWorksSection right before the Bento section
const beforeBento = `      {/* Trust & Transparency Banner (3 clear core pillars with vibrant colors) */}
      <TrustBanner />`;

const withHowItWorks = `      {/* SECCIÓN "CÓMO FUNCIONA": Sube -> Hornea -> Descarga */}
      <HowItWorksSection />

      {/* Trust & Transparency Banner (3 clear core pillars with vibrant colors) */}
      <TrustBanner />`;

if (c.includes(beforeBento)) {
  c = c.replace(beforeBento, withHowItWorks);
  console.log("Inserted HowItWorksSection before TrustBanner!");
}

fs.writeFileSync(p, c, 'utf8');
console.log("Updated index.tsx with marquee, how it works, and easter egg!");
