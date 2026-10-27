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

async function verifyDeployment() {
  console.log("Verifying live deployment of commit 8c0d900...");
  for (let attempt = 1; attempt <= 20; attempt++) {
    const res = await fetchText("https://breadpdf.com/es/herramientas/comprimir-pdf");
    const hasNewEngineText = res.text.includes("Ingeniería de compresión adaptativa") || res.text.includes("diccionarios XRef");
    const hasLimitations = res.text.includes("Limitaciones técnicas a considerar");

    console.log(`Attempt ${attempt}: Status=${res.status}, hasNewEngineText=${hasNewEngineText}, hasLimitations=${hasLimitations}`);
    if (hasNewEngineText && hasLimitations) {
      console.log("SUCCESS! Commit 8c0d900 is live on production with tool-specific technical criteria.");
      return;
    }
    await new Promise((r) => setTimeout(r, 6000));
  }
}

verifyDeployment();
