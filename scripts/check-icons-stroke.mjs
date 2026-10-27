import fs from 'fs';

const filePath = 'src/components/site/RichToolIcon.tsx';
const rich = fs.readFileSync(filePath, 'utf8');

// Check MergeDocIcon and SplitDocIcon
console.log('--- MergeDocIcon ---');
const mergeMatch = rich.match(/export const MergeDocIcon[\s\S]*?<\/svg>\s*\);/);
if (mergeMatch) console.log(mergeMatch[0]);

console.log('--- SplitDocIcon ---');
const splitMatch = rich.match(/export const SplitDocIcon[\s\S]*?<\/svg>\s*\);/);
if (splitMatch) console.log(splitMatch[0]);
