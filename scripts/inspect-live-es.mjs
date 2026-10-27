async function inspectLiveEs() {
  const res = await fetch('https://breadpdf.com/es');
  const text = await res.text();
  const canonicalMatches = [...text.matchAll(/<link[^>]*rel=["']canonical["'][^>]*>/gi)];
  const alternateMatches = [...text.matchAll(/<link[^>]*rel=["']alternate["'][^>]*>/gi)];
  console.log('=== CANONICAL TAGS ===');
  canonicalMatches.forEach(m => console.log(m[0]));
  console.log('=== ALTERNATE / HREFLANG TAGS ===');
  alternateMatches.forEach(m => console.log(m[0]));
}
inspectLiveEs();
