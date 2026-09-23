const fs = require("fs");
const content = fs.readFileSync("src/lib/tools/registry.ts", "utf8");
const lines = content.split("\n");

const tools = [];
let currentSlug = "";
let currentName = "";
let currentCategory = "";
let currentStatus = "";
let hasRun = false;
let foundStatus = false;
let depth = 0;
let inToolsArray = false;

// Simpler approach: parse by finding  { slug: 'xxx' patterns
let blockLines = [];
let capturing = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Start of a tool object  
  if (!capturing && line.match(/^\s+\{$/)) {
    capturing = true;
    blockLines = [];
    depth = 1;
  } else if (capturing) {
    blockLines.push(line);
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    depth += opens - closes;
    
    if (depth <= 0) {
      // End of block
      const block = blockLines.join("\n");
      const slugM = block.match(/^\s+slug:\s*["']([^"']+)["']/m);
      const nameM = block.match(/^\s+name:\s*["']([^"']+)["']/m);
      const iconM = block.match(/^\s+icon:\s*["']([^"']+)["']/m);
      const catM = block.match(/^\s+category:\s*["']([^"']+)["']/m);
      const statusM = block.match(/^\s+status:\s*["']([^"']+)["']/m);
      const hasRunFlag = /^\s+run:/m.test(block);
      
      if (slugM && catM && statusM) {
        tools.push({
          slug: slugM[1],
          name: nameM ? nameM[1] : "?",
          icon: iconM ? iconM[1] : "NONE",
          category: catM[1],
          status: statusM[1],
          hasRun: hasRunFlag
        });
      }
      capturing = false;
      blockLines = [];
    }
  }
}

console.log("=== TOOL INVENTORY ===");
console.log("Total tools:", tools.length);
console.log("Live:", tools.filter(t => t.status === "live").length);
console.log("Pending:", tools.filter(t => t.status === "pending").length);
console.log("Roadmap:", tools.filter(t => t.status === "roadmap").length);
console.log("With runner:", tools.filter(t => t.hasRun).length);
console.log("Without runner:", tools.filter(t => !t.hasRun).length);
console.log("");

const byCat = {};
for (const t of tools) {
  if (!byCat[t.category]) byCat[t.category] = [];
  byCat[t.category].push(t);
}

const catOrder = ["convertir", "organizar", "optimizar", "seguridad", "inteligencia", "editar"];
for (const cat of catOrder) {
  const list = byCat[cat] || [];
  console.log(cat.toUpperCase() + " (" + list.length + "):");
  for (const t of list) {
    const runIcon = t.hasRun ? "RUN" : "---";
    const st = t.status === "live" ? "LIVE" : t.status.toUpperCase();
    console.log("  [" + st + "][" + runIcon + "] " + t.slug + " --> icon: " + t.icon);
  }
  console.log("");
}

console.log("=== TOOLS WITHOUT RUNNER ===");
for (const t of tools.filter(t => !t.hasRun)) {
  console.log("  " + t.slug + " (" + t.category + ") status=" + t.status);
}

const target = { convertir: 17, organizar: 9, optimizar: 8, seguridad: 6, inteligencia: 5, editar: 5 };
console.log("");
console.log("=== vs TARGET (50 total) ===");
let totalActual = 0;
for (const [cat, targetCount] of Object.entries(target)) {
  const actual = (byCat[cat] || []).length;
  totalActual += actual;
  const diff = actual - targetCount;
  const sign = diff > 0 ? "+" + diff : diff === 0 ? "OK" : String(diff);
  console.log("  " + cat + ": " + actual + " / " + targetCount + " (" + sign + ")");
}
console.log("  TOTAL: " + totalActual + " / 50");
