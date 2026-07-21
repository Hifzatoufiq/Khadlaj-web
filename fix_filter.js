const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

const target = `  const filtered = PRODUCTS.filter(p=>{
    const isKhadlajProduct = p.col !== "Lafede";
    if(activeCat==="Khadlaj") return p.col !== "Lafede";
    if(activeCat==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
    if(activeCat==="New") return isKhadlajProduct && p.badge==="New";
    if(activeCat==="For Him") return isKhadlajProduct && p.gender==="Him";
    if(activeCat==="For Her") return isKhadlajProduct && p.gender==="Her";
    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    return isKhadlajProduct && p.col===activeCat;
  }).slice(0,16);
  const newLaunches = [
    { id: "nl1", name: "Karus Gold Absolu", col: "Eau De Parfum", size: "100ml EDP", notes: ["Oud", "Musk", "Amber"], price: 150.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/New_Project.png?v=1783662902" },
    { id: "nl2", name: "La Fede Aura Vanilla Milk", col: "Eau De Parfum", size: "100ml EDP", notes: ["Vanilla", "Milk", "Musk"], price: 55.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_VANILLA_MILK_100_ML.png?v=1783938923" },
    { id: "nl3", name: "Khadlaj Saraya Extrait", col: "Extrait De Parfum", size: "60ml Extrait", notes: ["Saffron", "Rose", "Oud"], price: 105.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1783938953" },
    { id: "nl4", name: "Oud Muattar Mubakhar", col: "Bakhoor", size: "200g", notes: ["Oud", "Amber", "Spices"], price: 65.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OudMuattar_jpg.png?v=1784271987" },
    { id: "nl5", name: "Dehnal Oudh Combodi", col: "Dehn Al Oudh", size: "3ml", notes: ["Oud", "Woody", "Earthy"], price: 65.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964319.jpg?v=1722409168" },
    { id: "nl6", name: "Zayaan Silver", col: "Eau De Parfum", size: "100ml EDP", notes: ["Citrus", "Amber", "Woody"], price: 150.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1783936580" },
    { id: "nl7", name: "Nafais Sharq Gift Set", col: "Gift Set", size: "3-Piece Set", notes: ["Floral", "Musk", "Oud"], price: 150.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739" },
    { id: "nl8", name: "Cream Velvet", col: "Eau De Parfum", size: "100ml Extrait", notes: ["Cream", "Velvet", "Musk"], price: 130.00, badge: "New", img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383" },
  ];`;

const replacement = `  const filtered = PRODUCTS.filter(p=>{
    const isKhadlajProduct = p.col !== "Lafede";
    if(activeCat==="Khadlaj") return p.col !== "Lafede";
    if(activeCat==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
    if(activeCat==="New") return isKhadlajProduct && p.badge==="New";
    if(activeCat==="For Him") return isKhadlajProduct && p.gender==="Him";
    if(activeCat==="For Her") return isKhadlajProduct && p.gender==="Her";
    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    return isKhadlajProduct && (p.col || '').toLowerCase()===activeCat.toLowerCase();
  }).slice(0,16);
  const newLaunches = PRODUCTS.filter(p => p.badge === "New").slice(0, 8);`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
  console.log('Successfully replaced filter and newLaunches logic.');
} else {
  console.log('Target not found. Looking for similarities...');
  const altStartIdx = code.indexOf('const filtered = PRODUCTS.filter(p=>{');
  if (altStartIdx !== -1) {
    console.log('Found start block. Trying fallback replacement.');
    const endIdx = code.indexOf('];', altStartIdx) + 2;
    if (endIdx > altStartIdx && endIdx - altStartIdx < 2000) {
      code = code.substring(0, altStartIdx) + replacement + code.substring(endIdx);
      fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
      console.log('Fallback replacement succeeded.');
    } else {
      console.log('End index issue.');
    }
  } else {
    console.log('Cannot find filtered definition at all.');
  }
}
