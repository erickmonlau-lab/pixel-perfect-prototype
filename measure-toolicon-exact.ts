import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

const total = content.length;
const tailwindMergeStart = content.indexOf('twMerge'); // or twJoin
const lucideStart = content.indexOf(',z=R(`arrow-down-to-line`');
const richStart = content.indexOf('cn=({className:e=`size-8`');
const dictionaryStart = content.indexOf('var In={ArrowDownToLine:');

console.log('Total ToolIcon chunk size:', total, 'bytes');
console.log('0 -> Lucide icons start:', lucideStart, 'bytes (Supabase dynamic loader + tailwind-merge utils)');
console.log('Lucide icons definitions size:', richStart - lucideStart, 'bytes');
console.log('RichToolIcon SVG definitions size:', dictionaryStart - richStart, 'bytes');
console.log('Dictionary + ToolIcon component size:', total - dictionaryStart, 'bytes');
