import { TOOLS } from "../src/lib/tools/registry.ts";
import toolsCa from "../src/lib/tools/translations-ca.ts";
import toolsEn from "../src/lib/tools/translations-en.ts";

console.log("Analyzing 50 tools across ES, CA, EN for thin/templated content...");

const results = [];

for (const tool of TOOLS) {
  const esHowItWorks = tool.howItWorks || [];
  const esFaq = tool.faq || [];
  
  const caTrans = toolsCa[tool.slug] || {};
  const enTrans = toolsEn[tool.slug] || {};

  // Check howItWorks format: is it simple string array or rich object?
  const isSimpleSteps = esHowItWorks.every(step => typeof step === "string");
  const stepCount = esHowItWorks.length;
  const faqCount = esFaq.length;

  // Measure word counts of howItWorks
  const esStepWords = esHowItWorks.map(s => typeof s === "string" ? s : `${s.title} ${s.desc}`).join(" ").split(/\s+/).length;
  
  results.push({
    slug: tool.slug,
    name: tool.name,
    category: tool.category,
    isSimpleSteps,
    stepCount,
    faqCount,
    esStepWords,
    hasCaHow: !!caTrans.howItWorks,
    hasEnHow: !!enTrans.howItWorks,
  });
}

console.log(`Total tools analyzed: ${results.length}`);
const simpleCount = results.filter(r => r.isSimpleSteps).length;
console.log(`Tools with simple 3-line string steps: ${simpleCount} / ${results.length}`);
console.log(`Tools with < 50 words in instructions: ${results.filter(r => r.esStepWords < 50).length}`);

// Print top 15 simplest tools
console.log("\nSample simplest tools (potential thin content for AdSense):");
for (const r of results.filter(r => r.esStepWords < 40).slice(0, 15)) {
  console.log(`- ${r.slug} (${r.category}): ${r.stepCount} steps, ${r.esStepWords} words, ${r.faqCount} FAQs`);
}
