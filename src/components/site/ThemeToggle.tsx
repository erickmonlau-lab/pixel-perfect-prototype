import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center size-9 sm:size-10 rounded-xl border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer ${
        isDark ? "bg-[#24242C] text-[#FACC15] hover:bg-[#2C2C36]" : "bg-white text-[#0F0F12] hover:bg-[#FEF08A]"
      }`}
      title={isDark ? "Cambiar a modo horno de día" : "Cambiar a modo horno de noche"}
      aria-label="Alternar modo oscuro"
    >
      {isDark ? (
        <Sun className="size-5 stroke-[2.6] transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="size-5 stroke-[2.6] transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
