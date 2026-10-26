import { useState, useEffect } from "react";
import { BRAND_ASSETS } from "@/lib/brand";

export function MascotEasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [isToasted, setIsToasted] = useState(false);
  const [crumbs, setCrumbs] = useState<{ id: number; x: number; y: number; r: number; color: string }[]>([]);

  useEffect(() => {
    if (clicks >= 5) {
      setIsToasted(true);
      // Generate bread crumbs / toast flakes
      const colors = ["#E8372C", "#F59E0B", "#FEF08A", "#DE834C", "#0F0F12"];
      const newCrumbs = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 180,
        r: Math.random() * 360,
        color: colors[i % colors.length]!,
      }));
      setCrumbs(newCrumbs);

      const timer = setTimeout(() => {
        setClicks(0);
        setIsToasted(false);
        setCrumbs([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [clicks]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        onClick={() => setClicks((c) => c + 1)}
        className={`relative flex items-center justify-center size-10 -my-2 rounded-full border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] overflow-hidden shrink-0 cursor-pointer select-none transition-all duration-200 active:scale-95 ${
          isToasted ? "bg-[#78350F] rotate-180 scale-125 shadow-[4px_4px_0_#0F0F12]" : "bg-white hover:scale-110"
        }`}
        title={isToasted ? "¡Tostada crujiente horneada!" : "¡Toca 5 veces a la mascota para tostarla!"}
      >
        <img
          src={BRAND_ASSETS.mascotPng}
          alt="BreadPDF Mascot"
          width={36}
          height={36}
          className={`size-8 object-contain transition-all duration-300 ${
            isToasted ? "sepia brightness-75 contrast-150" : ""
          }`}
        />
        {clicks > 0 && clicks < 5 && (
          <span className="absolute bottom-0 right-0 size-3.5 bg-[#E8372C] text-white rounded-full text-[9px] font-black flex items-center justify-center border border-black animate-ping">
            {clicks}
          </span>
        )}
      </div>

      {/* Bread Crumb Particles */}
      {crumbs.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {crumbs.map((crumb) => (
            <span
              key={crumb.id}
              style={{
                transform: `translate(${crumb.x}px, ${crumb.y}px) rotate(${crumb.r}deg)`,
                backgroundColor: crumb.color,
              }}
              className="absolute size-2 sm:size-2.5 rounded-sm border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12] transition-all duration-1000 animate-out fade-out zoom-out"
            />
          ))}
        </div>
      )}
    </div>
  );
}
