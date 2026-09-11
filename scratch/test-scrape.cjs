const fs = require('fs');

async function scrape() {
  console.log("Fetching URL...");
  const response = await fetch("https://hy-techengineers.com/din-metric-fittings.php", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36"
    }
  });
  const html = await response.text();
  console.log("Status:", response.status);
  console.log("HTML length:", html.length);
  fs.writeFileSync("scratch/test_html.html", html);
  console.log("Saved to scratch/test_html.html");
}

scrape();
