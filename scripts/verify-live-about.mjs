import https from "node:https";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, text: data }));
    }).on("error", reject);
  });
}

async function verifyLive() {
  console.log("Verifying live deployment of commit 94e815c on breadpdf.com...");
  for (let attempt = 1; attempt <= 20; attempt++) {
    const esRes = await fetchText("https://breadpdf.com/es/sobre-nosotros");
    const caRes = await fetchText("https://breadpdf.com/ca/sobre-nosaltres");
    const enRes = await fetchText("https://breadpdf.com/en/about");

    const esOk = esRes.status === 200 && esRes.text.includes("La suite PDF construida para tu privacidad");
    const caOk = caRes.status === 200 && caRes.text.includes("La suite PDF construïda per a la teva privadesa");
    const enOk = enRes.status === 200 && enRes.text.includes("The PDF suite engineered for your privacy");

    console.log(`Attempt ${attempt}: ES=${esRes.status} (hasText: ${esOk}), CA=${caRes.status} (hasText: ${caOk}), EN=${enRes.status} (hasText: ${enOk})`);

    if (esOk && caOk && enOk) {
      console.log("SUCCESS! All 3 About pages are live, returning 200 OK with full SSR content.");
      return;
    }
    await new Promise((r) => setTimeout(r, 6000));
  }
}

verifyLive();
