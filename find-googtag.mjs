import fs from 'fs';

async function main() {
  const res = await fetch('https://www.googletagmanager.com/gtm.js?id=GTM-M6D3R3JF');
  const text = await res.text();
  
  // Search for googtag configuration
  let pos = 0;
  while ((pos = text.indexOf('googtag', pos)) !== -1) {
    console.log('--- googtag at', pos, '---');
    console.log(text.substring(Math.max(0, pos - 100), pos + 200));
    pos += 7;
  }
  
  // Search for G-22E1Z6BZXE
  pos = 0;
  while ((pos = text.indexOf('G-22E1Z6BZXE', pos)) !== -1) {
    console.log('--- G-22E1Z6BZXE at', pos, '---');
    console.log(text.substring(Math.max(0, pos - 100), pos + 200));
    pos += 12;
  }
}

main().catch(console.error);
