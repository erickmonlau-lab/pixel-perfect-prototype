async function inspectGtm() {
  const res = await fetch('https://www.googletagmanager.com/gtm.js?id=GTM-M6D3R3JF');
  const code = await res.text();
  
  const ga4Ids = code.match(/G-[A-Z0-9]+/g);
  console.log('GA4 Measurement IDs in GTM:', [...new Set(ga4Ids)]);
  
  // Look for any string that matches custom event names
  const potentialEvents = [
    'page_view',
    'file_selected',
    'processing_started',
    'processing_completed',
    'download_clicked',
    'workflow_next_clicked',
    'tool_catalog_opened',
    'tool_catalog_view_all_clicked'
  ];
  
  console.log('Status of dataLayer events in GTM container:');
  for (const ev of potentialEvents) {
    console.log(` - ${ev}: ${code.includes(ev) ? 'CONFIGURED' : 'NOT CONFIGURED / MISSING'}`);
  }
}

inspectGtm();
