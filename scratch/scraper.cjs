const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const BASE_URL = 'https://hy-techengineers.com';
const START_URL = `${BASE_URL}/din-metric-fittings.php`;
const OUTPUT_FILE = path.join(__dirname, '../src/data/products/din-metric-fittings.json');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Convert "Straight Series" to "straight-series"
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function fetchHtml(url) {
  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (err) {
    console.error(`Failed to fetch ${url}`, err.message);
    return null;
  }
}

async function downloadImage(url, filename) {
  const filepath = path.join(IMAGES_DIR, filename);
  if (fs.existsSync(filepath)) return `/images/products/${filename}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return `/images/products/${filename}`;
  } catch (err) {
    console.error(`Failed to download image ${url}`, err.message);
    return null;
  }
}

async function scrapeProductPage(url, groupName) {
  console.log(`  -> Scraping product: ${groupName}`);
  const html = await fetchHtml(url);
  if (!html) return null;
  const $ = cheerio.load(html);

  // Default structure
  const product = {
    slug: toSlug(groupName),
    name: groupName,
    description: "High-quality precision engineered fitting.",
    imageUrl: "",
    brochureUrl: "#",
    specs: {
      category: "DIN Metric Fittings",
      tubeODRange: "Various",
      partType: "Fitting"
    },
    technicalData: {
      headers: [],
      rows: []
    }
  };

  // Extract description (usually first paragraph after title)
  let desc = $('.about-text p, .prod-desc, .lower-content p').first().text().trim();
  if (!desc) {
     desc = $('h3, h4, h5').first().next('p').text().trim();
  }
  if (desc && !desc.includes("soliciting new Distributors")) {
      product.description = desc.replace(/\s+/g, ' ').substring(0, 200) + '...';
  } else {
      product.description = `High-quality ${groupName} designed for precision applications.`;
  }

  // Extract main image
  const imgElem = $('.prod-img img, .image-box img, .product-image img, img.img-responsive').first();
  if (imgElem.length) {
    let imgSrc = imgElem.attr('src');
    if (imgSrc) {
      if (!imgSrc.startsWith('http')) imgSrc = `${BASE_URL}/${imgSrc}`;
      const filename = path.basename(imgSrc).split('?')[0];
      const localPath = await downloadImage(imgSrc, filename);
      if (localPath) product.imageUrl = localPath;
    }
  }

  // If no image found, use default
  if (!product.imageUrl) {
    product.imageUrl = "/page_683815386335682.jpg";
  }

  // Extract dimensional data table
  const table = $('table').first();
  if (table.length) {
    // get headers
    const headers = [];
    table.find('tr').first().find('th, td').each((_, el) => {
      headers.push($(el).text().trim().replace(/\s+/g, ' '));
    });
    // get rows
    const rows = [];
    table.find('tr').slice(1).each((_, tr) => {
      const row = {};
      $(tr).find('td').each((i, td) => {
        if (headers[i]) {
          row[headers[i]] = $(td).text().trim().replace(/\s+/g, ' ');
        }
      });
      if (Object.keys(row).length > 0) {
        rows.push(row);
      }
    });

    if (headers.length > 0 && rows.length > 0) {
      product.technicalData.headers = headers;
      product.technicalData.rows = rows;
    }
  }

  // Fallback if no table found
  if (product.technicalData.headers.length === 0) {
    product.technicalData.headers = ["Part No.", "Series", "Tube O.D.", "Thread"];
    product.technicalData.rows = [
      {"Part No.": `${toSlug(groupName)}-01`, "Series": "L", "Tube O.D.": "6", "Thread": "M12x1.5"}
    ];
  }

  return product;
}

async function scrape() {
  console.log('Fetching main catalog page...');
  const html = await fetchHtml(START_URL);
  if (!html) return;
  
  const $ = cheerio.load(html);
  
  const targetSeriesNames = [
    'Straight Series', 'Tee', 'Elbows', 'Ferrules', 'Nuts', 'Caps', 'Hollow Hex Plugs', 'Weld Nipples'
  ];

  // Output JSON structure
  const dinMetricFamily = {
    slug: "din-metric-fittings",
    name: "DIN Metric Fittings",
    description: "High quality DIN Metric Fittings manufactured to exacting international standards.",
    seriesList: [],
    groups: []
  };

  // Find series links
  const seriesLinks = [];
  $('a').each((_, el) => {
    let text = $(el).text().trim();
    const href = $(el).attr('href');
    if (text.includes('Weld Nipples')) text = 'Weld Nipples'; // simplify
    
    if (targetSeriesNames.includes(text) && href && !href.includes('#')) {
      // Ensure we don't duplicate series
      if (!seriesLinks.find(s => s.name === text)) {
         seriesLinks.push({ name: text, url: href.startsWith('http') ? href : `${BASE_URL}/${href}` });
      }
    }
  });

  dinMetricFamily.seriesList = seriesLinks.map(s => s.name);

  for (const series of seriesLinks) {
    console.log(`\nProcessing Series: ${series.name} (${series.url})`);
    const seriesHtml = await fetchHtml(series.url);
    if (!seriesHtml) continue;
    
    const $s = cheerio.load(seriesHtml);
    
    // Find product group links inside the series page
    // Usually these are in 'Read More' links or image links
    const groupLinks = [];
    $s('.services-block-four, .product-block').each((_, block) => {
      const a = $s(block).find('h5 a, h3 a, h4 a, .lower-content a').first();
      let name = a.text().trim() || $s(block).find('h3, h4, h5').text().trim();
      let href = a.attr('href') || $s(block).find('a').attr('href');
      
      // Try another structure if empty
      if (!name) {
          name = $s(block).text().replace(/Read More/g, '').trim().split('\n')[0];
      }

      if (name && href && href !== '#') {
        const url = href.startsWith('http') ? href : `${BASE_URL}/${href}`;
        if (!groupLinks.find(g => g.name === name)) {
            groupLinks.push({ name, url });
        }
      }
    });

    if (groupLinks.length === 0) {
        // Fallback for simple pages without sub-blocks
        $s('a:contains("Read More")').each((_, a) => {
            let href = $s(a).attr('href');
            let name = $s(a).parent().prev('h3, h4, h5, div').text().trim();
            if (!name) name = $s(a).parent().parent().text().replace(/Read More/g, '').trim().split('\n')[0];
            if (name && href) {
                const url = href.startsWith('http') ? href : `${BASE_URL}/${href}`;
                if (!groupLinks.find(g => g.name === name)) {
                    groupLinks.push({ name, url });
                }
            }
        });
    }

    console.log(`Found ${groupLinks.length} product groups.`);

    for (const group of groupLinks) {
      const productData = await scrapeProductPage(group.url, group.name);
      if (productData) {
        dinMetricFamily.groups.push({
          series: series.name,
          slug: productData.slug,
          name: productData.name,
          description: productData.description,
          imageUrl: productData.imageUrl,
          products: [ productData ]
        });
      }
      // Small delay to avoid overloading server
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(dinMetricFamily, null, 2));
  console.log(`\nSuccessfully wrote data to ${OUTPUT_FILE}`);
}

scrape();
