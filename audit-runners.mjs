import fs from 'fs';

const code = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');

const regex = /\{\s*slug:\s*"([a-z0-9-]+)"[\s\S]*?category:\s*"([a-z0-9-]+)"([\s\S]*?)(?=\n  \{|\n\];)/g;

const tools = [];
let match;
while ((match = regex.exec(code)) !== null) {
  const slug = match[1];
  const category = match[2];
  const body = match[3];
  const runMatch = body.match(/run:\s*([a-zA-Z0-9_]+)/);
  tools.push({
    slug,
    category,
    runner: runMatch ? runMatch[1] : null
  });
}

console.log('Parsed tools count:', tools.length);
const withoutRunner = tools.filter(t => !t.runner);
console.log('Tools without explicit runner:', withoutRunner);
