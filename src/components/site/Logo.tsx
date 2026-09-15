export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-navy">
        <span className="absolute inset-x-1.5 bottom-1.5 h-1 rounded-full bg-primary" />
        <span className="font-display text-[13px] font-bold leading-none text-navy-foreground">A</span>
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          tone === "light" ? "text-navy-foreground" : "text-foreground"
        }`}
      >
        ARVIO
      </span>
    </span>
  );
}
