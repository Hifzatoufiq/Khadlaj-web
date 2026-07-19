const fs = require('fs');

async function fetchAllLaFede() {
  let allProducts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    console.log(`Fetching page ${page}...`);
    const url = `https://khadlaj-perfumes.com/collections/la-fede-eau-de-parfume/products.json?page=${page}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      
      if (!json.products || json.products.length === 0) {
        hasMore = false;
        break;
      }
      
      allProducts = allProducts.concat(json.products);
      page++;
    } catch (e) {
      console.error('Error fetching page', page, e.message);
      hasMore = false;
    }
  }

  let newEntries = '';
  let idCounter = 4701; // Start a new ID block

  // Known cutouts from earlier
  const cutouts = {
    "UNO INTIMO": "./assets/images/products/uno-intimo-cutout.png",
    "INTOXICATE MYSTIQUE": "./assets/images/products/intoxicate-mystique-cutout.png",
    "RIA": "./assets/images/products/ria-cutout.png",
    "KARUS": "./assets/images/products/karus-cutout.png"
  };

  allProducts.forEach(p => {
    let title = p.title.replace(/"/g, '\\"');
    
    // Extract size and type
    let sizeMatch = title.match(/(\d+\s*ML)/i);
    let sizeStr = sizeMatch ? sizeMatch[1].replace(/\s+/g, '').toLowerCase() : "100ml";
    
    let isExtrait = title.match(/EXTRAIT/i);
    sizeStr += isExtrait ? " Extrait" : " EDP";

    // Clean title
    title = title.replace(/\d+\s*ML.*/i, '').trim();
    title = title.replace(/EDP SPRAY.*/i, '').trim();
    title = title.replace(/EAU DE PARFUM.*/i, '').trim();
    title = title.replace(/EXTRAIT DE PARFUM.*/i, '').trim();
    title = title.replace(/FOR MEN.*/i, '').trim();
    title = title.replace(/FOR WOMEN.*/i, '').trim();
    title = title.replace(/FOR HIM.*/i, '').trim();
    title = title.replace(/FOR HER.*/i, '').trim();

    // Use cutout if available
    let img = '';
    let foundCutout = Object.keys(cutouts).find(k => title.toUpperCase().includes(k));
    if (foundCutout) {
      img = cutouts[foundCutout];
    } else {
      // Smart image selection
      // Priority: Last image, unless we find one ending in 3 or 2
      let bestImage = p.images && p.images.length > 0 ? p.images[p.images.length - 1].src : '';
      
      if (p.images && p.images.length > 2) {
        // usually if there are 3 images, index 2 is bottle
        bestImage = p.images[2].src;
      }

      for (let image of (p.images || [])) {
        if (image.src.match(/[-_\.]3\./i)) {
          bestImage = image.src;
          break;
        }
      }
      
      img = bestImage;
    }
    
    // Gender inference
    let gender = "Unisex";
    if (p.tags && p.tags.includes("Women")) gender = "Her";
    if (p.tags && p.tags.includes("Men")) gender = "Him";
    if (p.title.toUpperCase().includes("FOR MEN")) gender = "Him";
    if (p.title.toUpperCase().includes("FOR WOMEN")) gender = "Her";
    if (p.title.toUpperCase().includes("FOR MEN & WOMEN")) gender = "Unisex";
    
    let badge = gender === "Her" ? '"For Her"' : gender === "Him" ? '"For Him"' : 'null';
    if (gender === "Unisex") badge = '"Unisex"';
    
    const line = `  { id: ${idCounter++}, name: "${title}", col: "Lafede", price: ${p.variants[0] ? p.variants[0].price : 100}, size: "${sizeStr}", badge: ${badge}, gender: "${gender}", notes: ["Oud", "Musk", "Amber"], img: "${img}" },`;
    newEntries += line + '\n';
  });

  fs.writeFileSync('all_lafede_entries.txt', newEntries, 'utf8');
  console.log('Saved to all_lafede_entries.txt');
}

fetchAllLaFede();
