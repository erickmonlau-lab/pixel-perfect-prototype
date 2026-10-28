// Measure how much CSS each source group produces, so we can decide how to
// split the global Tailwind bundle (all of it is inlined into every page).
import fs from "node:fs";
import path from "node:path";
import { compile } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";

const root = process.cwd();
const base = path.join(root, "src");
const raw = fs.readFileSync(path.join(base, "styles.css"), "utf8");

const groups = {
  all: ["../src"],
  "site+ui+lib": [
    "./routes/__root.tsx",
    "./routes/$lang.tsx",
    "./routes/$lang/index.tsx",
    "./routes/$lang/$section/index.tsx",
    "./components/site/**",
    "./components/ui/**",
    "./lib/**",
    "./hooks/**",
  ],
  "no-tools": ["./components/site/**", "./components/ui/**", "./components/guides/**", "./components/account/**", "./components/auth/**", "./components/premium/**", "./routes/**", "./lib/**", "./hooks/**"],
  "tools-only": ["./components/tools/**"],
  "guides-only": ["./components/guides/**"],
  "home-only": ["./routes/$lang/index.tsx", "./components/site/**"],
};

for (const [name, sources] of Object.entries(groups)) {
  const css = raw.replace(/@source\s+"[^"]+";/g, sources.map((s) => `@source "${s}";`).join("\n"));
  const compiler = await compile(css, { base, onDependency() {} });
  const scanner = new Scanner({
    sources: sources.map((pattern) => ({ base, pattern, negated: false })),
  });
  const candidates = scanner.scan();
  const out = compiler.build(candidates);
  const rules = (out.match(/\{/g) || []).length;
  console.log(
    `${name.padEnd(20)} bytes=${String(out.length).padStart(7)} rules=${String(rules).padStart(5)} candidates=${String(candidates.length).padStart(5)}`,
  );
}
