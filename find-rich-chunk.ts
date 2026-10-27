import fs from 'fs';

const files = fs.readdirSync('.output/public/assets');
files.forEach(f => {
  if (f.endsWith('.js')) {
    const content = fs.readFileSync('.output/public/assets/' + f, 'utf8');
    if (content.includes('185ABD') || content.includes('107C41')) {
      console.log('Found RichToolIcon SVGs in:', f, (content.length / 1024).toFixed(2) + ' KB');
    }
  }
});
