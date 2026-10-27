import fs from 'fs';

async function checkJsonLd() {
  const [esRes, enRes] = await Promise.all([
    fetch('https://breadpdf.com/es'),
    fetch('https://breadpdf.com/en')
  ]);
  const esText = await esRes.text();
  const enText = await enRes.text();

  const getScripts = (html) => {
    const matches = [];
    const re = new RegExp('<script[^>]*type=["\']application/ld\\+json["\'][^>]*>([\\s\\S]*?)</script>', 'gi');
    let m;
    while ((m = re.exec(html)) !== null) {
      matches.push(m[1]);
    }
    return matches;
  };

  const esLd = getScripts(esText);
  const enLd = getScripts(enText);
  console.log('ES JSON-LD count:', esLd.length);
  console.log('EN JSON-LD count:', enLd.length);
  enLd.forEach((s, i) => console.log('EN Script', i, s.trim().slice(0, 300)));
}

checkJsonLd();
