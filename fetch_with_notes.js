const fs = require('fs');

const commonNotes = [
  "Oud", "Musk", "Amber", "Vanilla", "Rose", "Jasmine", "Saffron", "Bergamot", 
  "Patchouli", "Sandalwood", "Cedarwood", "Cardamom", "Leather", "Ginger", 
  "Vetiver", "Apple", "Citrus", "Moss", "Benzoin", "Geranium", "Lavender",
  "Tonka", "Pineapple", "Grapefruit", "Lemon", "Orange", "Peony", "Orchid",
  "Praline", "Caramel", "Cinnamon", "Clove", "Nutmeg", "Plum", "Peach",
  "Tuberose", "Ylang-Ylang", "Lily", "Freesia", "Mint", "Basil", "Rosemary",
  "Pink Pepper", "Black Pepper", "Tobacco", "Coffee", "Chocolate", "Coconut",
  "Cotton Candy", "Guaiac Wood"
];

function extractNotes(html) {
  if (!html) return ["Woody", "Floral", "Musk"];
  
  let foundNotes = [];
  let lowerHtml = html.toLowerCase();
  
  for (let note of commonNotes) {
    if (lowerHtml.includes(note.toLowerCase())) {
      foundNotes.push(note);
    }
  }
  
  // Return up to 3 notes
  if (foundNotes.length >= 3) {
    return foundNotes.slice(0, 3);
  } else if (foundNotes.length > 0) {
    // pad with generic if we found 1 or 2
    let generic = ["Musk", "Amber", "Oud"].filter(n => !foundNotes.includes(n));
    return [...foundNotes, ...generic].slice(0, 3);
  }
  
  return ["Oud", "Musk", "Amber"];
}

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

  const cutouts = {
    "UNO INTIMO": "./assets/images/products/uno-intimo-cutout.png",
    "INTOXICATE MYSTIQUE": "./assets/images/products/intoxicate-mystique-cutout.png",
    "RIA": "./assets/images/products/ria-cutout.png",
    "KARUS": "./assets/images/products/karus-cutout.png"
  };

  const manualOverrides = {
    "LAVISH LUNA": 0,
    "UNO LUSSO": 2,
    "STATESMAN": 1,
    "FIRST LADY": 1,
    "KINGSMAN": 1,
    "MISS PREMIERE": 1
  };

  allProducts.forEach(p => {
    let title = p.title.replace(/"/g, '\\"');
    let originalTitleUpper = title.toUpperCase();
    
    // Extract size
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

    // Image logic
    let img = '';
    let foundCutout = Object.keys(cutouts).find(k => originalTitleUpper.includes(k));
    let foundOverride = Object.keys(manualOverrides).find(k => originalTitleUpper.includes(k));

    if (foundCutout) {
      img = cutouts[foundCutout];
    } else if (foundOverride && p.images[manualOverrides[foundOverride]]) {
      img = p.images[manualOverrides[foundOverride]].src;
    } else {
      let bestImage = p.images && p.images.length > 0 ? p.images[p.images.length - 1].src : '';
      if (p.images && p.images.length > 2) {
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
    
    // Gender
    let gender = "Unisex";
    if (p.tags && p.tags.includes("Women")) gender = "Her";
    if (p.tags && p.tags.includes("Men")) gender = "Him";
    if (originalTitleUpper.includes("FOR MEN")) gender = "Him";
    if (originalTitleUpper.includes("FOR WOMEN")) gender = "Her";
    if (originalTitleUpper.includes("FOR MEN & WOMEN")) gender = "Unisex";
    let badge = gender === "Her" ? '"For Her"' : gender === "Him" ? '"For Him"' : 'null';
    if (gender === "Unisex") badge = '"Unisex"';
    
    // Extract actual notes!
    let extractedNotes = extractNotes(p.body_html);
    let notesStr = JSON.stringify(extractedNotes);

    let price = p.variants[0] ? parseFloat(p.variants[0].price) : 100;
    // Check if compare_at_price exists to calculate discount, though UI doesn't show discount currently.
    // So actual price is variants[0].price

    const line = `  { id: ${idCounter++}, name: "${title}", col: "Lafede", price: ${price}, size: "${sizeStr}", badge: ${badge}, gender: "${gender}", notes: ${notesStr}, img: "${img}" },`;
    newEntries += line + '\n';
  });

  fs.writeFileSync('all_lafede_entries.txt', newEntries, 'utf8');
  console.log('Saved to all_lafede_entries.txt');
}

fetchAllLaFede();
