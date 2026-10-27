async function testAllLinks() {
  const res = await fetch('https://breadpdf.com/es');
  const text = await res.text();
  const linkMatches = [...text.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  let withoutTitle = 0;
  linkMatches.forEach((m, idx) => {
    const fullTag = m[0];
    const innerHtml = m[1];
    const textContent = innerHtml.replace(/<[^>]+>/g, '').trim();
    const hrefMatch = fullTag.match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    const hasTitle = fullTag.includes('title=');
    if (!hasTitle) withoutTitle++;
    console.log(`${idx + 1}. href: ${href} | hasTitle: ${hasTitle} | text: "${textContent.slice(0, 35)}"`);
  });
  console.log(`\nTotal links: ${linkMatches.length}, without title: ${withoutTitle}`);
}
testAllLinks();
