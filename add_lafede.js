const fs = require('fs');

const url = 'https://khadlaj-perfumes.com/collections/la-fede-eau-de-parfume/products.json?page=2';

fetch(url)
  .then(res => res.json())
  .then(json => {
    let products = json.products;
    if (!products || products.length === 0) {
      console.log('No products found.');
      return;
    }
    
    let newEntries = '';
    let idCounter = 4501; // Pick an arbitrary ID range to avoid collisions
    
    products.forEach(p => {
      const title = p.title.replace(/"/g, '\\"');
      const price = p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 100;
      const img = p.images && p.images[0] ? p.images[0].src : '';
      const size = "100ml EDP"; // default
      
      // Very basic gender inference from tags if available, else Unisex
      let gender = "Unisex";
      if (p.tags && p.tags.includes("Women")) gender = "Her";
      if (p.tags && p.tags.includes("Men")) gender = "Him";
      
      let badge = gender === "Her" ? '"For Her"' : gender === "Him" ? '"For Him"' : 'null';
      if (gender === "Unisex") badge = '"Unisex"';
      
      const line = `  { id: ${idCounter++}, name: "${title}", col: "Lafede", price: ${price}, size: "${size}", badge: ${badge}, gender: "${gender}", notes: ["Oud", "Musk", "Amber"], img: "${img}" },`;
      newEntries += line + '\n';
    });

    console.log('--- NEW ENTRIES TO ADD ---');
    console.log(newEntries);
    
    // Now, let's insert them into khadlaj-perfumes (1).jsx
    let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');
    
    // Find where products are defined: 'const PRODUCTS = ['
    const anchor = 'const PRODUCTS = [';
    const anchorIndex = code.indexOf(anchor);
    
    if (anchorIndex !== -1) {
      const insertIndex = code.indexOf('\n', anchorIndex) + 1;
      code = code.slice(0, insertIndex) + newEntries + code.slice(insertIndex);
      fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
      console.log('Added products to khadlaj-perfumes (1).jsx!');
    } else {
      console.log('Could not find PRODUCTS array.');
    }
  })
  .catch(err => {
    console.error(err);
  });
