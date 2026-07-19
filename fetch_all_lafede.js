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

  console.log(`Total products fetched: ${allProducts.length}`);
  
  let newEntries = '';
  let idCounter = 4601; // Start a new ID block

  allProducts.forEach(p => {
    const title = p.title.replace(/"/g, '\\"');
    const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 100;
    
    // As per user request, use the 1st image (index 0) to avoid boxes
    let img = '';
    if (p.images && p.images.length > 0) {
      img = p.images[0].src;
    }
    
    const size = "100ml EDP"; // default
    
    // Gender inference
    let gender = "Unisex";
    if (p.tags && p.tags.includes("Women")) gender = "Her";
    if (p.tags && p.tags.includes("Men")) gender = "Him";
    
    let badge = gender === "Her" ? '"For Her"' : gender === "Him" ? '"For Him"' : 'null';
    if (gender === "Unisex") badge = '"Unisex"';
    
    const line = `  { id: ${idCounter++}, name: "${title}", col: "Lafede", price: ${price}, size: "${size}", badge: ${badge}, gender: "${gender}", notes: ["Oud", "Musk", "Amber"], img: "${img}" },`;
    newEntries += line + '\n';
  });

  fs.writeFileSync('all_lafede_entries.txt', newEntries, 'utf8');
  console.log('Saved to all_lafede_entries.txt');
}

fetchAllLaFede();
