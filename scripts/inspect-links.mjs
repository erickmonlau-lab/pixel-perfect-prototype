async function inspectLinks() {
  const res = await fetch('https://breadpdf.com/es');
  const text = await res.text();
  const linkMatches = [...text.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  
  console.log('Total <a> tags:', linkMatches.length);
  const slashOnly = [];
  const noAccessibleName = [];

  linkMatches.forEach((m, idx) => {
    const fullTag = m[0];
    const innerHtml = m[1];
    const textContent = innerHtml.replace(/<[^>]+>/g, '').trim();
    const hrefMatch = fullTag.match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    const ariaLabel = fullTag.match(/aria-label=["']([^"']*)["']/i)?.[1];
    const title = fullTag.match(/title=["']([^"']*)["']/i)?.[1];

    if (textContent === '/' || textContent === '') {
      if (!ariaLabel && !title && !innerHtml.includes('<img') && !innerHtml.includes('<svg')) {
        noAccessibleName.push({ idx, href, textContent, fullTag: fullTag.slice(0, 150) });
      }
    }
    if (textContent === '/') {
      slashOnly.push({ idx, href, fullTag: fullTag.slice(0, 150) });
    }
  });

  console.log('Links with text content "/":', slashOnly);
  console.log('Links with no accessible name:', noAccessibleName);
}
inspectLinks();
