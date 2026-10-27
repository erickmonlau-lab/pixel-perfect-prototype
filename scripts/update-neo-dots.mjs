import fs from 'node:fs';

const file = 'src/styles.css';
let content = fs.readFileSync(file, 'utf8');

// Update dot pattern to ultra subtle opacity rgba(0, 0, 0, 0.08)
content = content.replace(
  /\.bg-neo-dots\s*\{[\s\S]*?\}/,
  `.bg-neo-dots {
  background-image: radial-gradient(rgba(15, 15, 18, 0.08) 1.25px, transparent 1.25px);
  background-size: 24px 24px;
}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated bg-neo-dots in styles.css');
