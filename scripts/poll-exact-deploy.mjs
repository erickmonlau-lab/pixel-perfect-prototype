import https from "https";

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

async function poll() {
  console.log("Polling https://breadpdf.com/es for new deployment (hero-mascot-perfect)...");
  for (let i = 0; i < 30; i++) {
    try {
      const { status, data } = await fetchHtml("https://breadpdf.com/es?t=" + Date.now());
      if (data.includes("hero-mascot-perfect.png")) {
        console.log(`[PASS] New deployment detected on attempt ${i + 1}!`);
        return true;
      } else {
        console.log(`[WAIT] Attempt ${i + 1}: Old build still serving (hero-mascot-perfect not found yet). Sleeping 6s...`);
      }
    } catch (err) {
      console.log(`[ERR] Attempt ${i + 1}: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 6000));
  }
  console.log("[TIMEOUT] Polling timed out.");
  return false;
}

poll();
