const https = require('https');
const fs = require('fs');

let allProducts = [];

const getBadge = (tags) => {
  if (tags.includes('New')) return 'New';
  if (tags.includes('Best Seller')) return 'Best Seller';
  return '';
};

const getGender = (tags) => {
  const upper = tags.map(t => t.toUpperCase());
  if (upper.includes('UNISEX') || (upper.includes('MEN') && upper.includes('WOMEN'))) return 'Unisex';
  if (upper.includes('MEN')) return 'Him';
  if (upper.includes('WOMEN')) return 'Her';
  return 'Unisex';
};

const getCol = (type, title) => {
  const t = title.toUpperCase();
  const ty = (type || '').toUpperCase();
  if (t.includes('LA FEDE')) return 'Lafede';
  if (ty.includes('GIFT') || t.includes('GIFT')) return 'Gift Sets';
  if (ty.includes('EXTRAIT') || t.includes('EXTRAIT')) return 'Extrait De Parfum';
  if (ty.includes('CPO') || ty.includes('OIL') || t.includes('OIL')) return 'Perfume Oils';
  if (ty.includes('BAKHOOR') || ty.includes('MUATTAR') || t.includes('MUATTAR')) return 'Bakhoor';
  if (ty.includes('MIST') || t.includes('MIST')) return 'Body Mist';
  if (ty.includes('DEHN AL OUDH') || t.includes('DEHNAL')) return 'Dehn Al Oudh';
  // Check ATYAAB
  if (t.includes('ATYAAB') || ty.includes('ATYAAB')) return 'Atyaab';
  // Check MASTER PERFUMERY
  if (t.includes('MASTER PERFUMERY') || ty.includes('MASTER PERFUMERY')) return 'Master Perfumery';

  return 'Eau De Parfum';
};

const ignoreTags = ['NEW', 'BEST SELLER', 'SALE', 'MEN', 'WOMEN', 'UNISEX', 'PERFUME SPRAY', 'CPO', 'GIFTSET', 'LUXURYGIFTSET', 'DEHN AL OUDH', 'BAKHOOR', 'OUD MUATTAR', 'CONCENTRATED PERFUME OIL'];
const getNotes = (tags, title) => {
  let notes = tags.filter(t => !ignoreTags.includes(t.toUpperCase()));
  if (notes.length === 0) {
    if (title.toUpperCase().includes('OUD')) notes = ['Oud', 'Woody', 'Amber'];
    else if (title.toUpperCase().includes('MUSK')) notes = ['Musk', 'Floral', 'Amber'];
    else notes = ['Oud', 'Musk', 'Amber']; // generic fallback
  }
  return notes.slice(0,3).map(t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
};

const getImg = (images) => {
  if (!images || images.length === 0) return 'https://via.placeholder.com/400';
  if (images.length > 1) return images[1].src; // 2nd image is almost always bottle only
  return images[0].src;
};

const getSize = (v, type) => {
  let s = v?.title || '';
  if (s === 'Default Title' || s.trim() === '') {
    if ((type||'').toUpperCase().includes('GIFT')) return 'Gift Set';
    return '100ml EDP';
  }
  return s;
};

function fetchPage(page) {
  https.get('https://khadlaj-perfumes.com/products.json?limit=250&page=' + page, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (!json.products || json.products.length === 0) {
          processProducts();
          return;
        }
        allProducts = allProducts.concat(json.products);
        fetchPage(page + 1);
      } catch(e) {
        console.log('Finished fetching pages. Found HTML/Error. Processing', allProducts.length, 'products.');
        processProducts();
      }
    });
  }).on('error', console.error);
}

function processProducts() {
  const mapped = allProducts.map(p => {
    return {
      id: p.id,
      name: p.title.replace(/"/g, '\\"').replace(/\n/g, ' '),
      col: getCol(p.product_type, p.title),
      price: parseFloat(p.variants[0]?.price || 100),
      size: getSize(p.variants[0], p.product_type),
      badge: getBadge(p.tags),
      gender: getGender(p.tags),
      notes: getNotes(p.tags, p.title),
      img: getImg(p.images)
    };
  });

  let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

  const startIdx = code.indexOf('const PRODUCTS = [');
  if (startIdx !== -1) {
    const nextConstIdx = code.indexOf('const REVIEWS =', startIdx);
    if (nextConstIdx !== -1) {
      const endIdx = code.lastIndexOf(';', nextConstIdx) + 1;
      
      let newArrayStr = 'const PRODUCTS = ' + JSON.stringify(mapped, null, 2) + ';\n';
      
      code = code.substring(0, startIdx) + newArrayStr + code.substring(endIdx);
      fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
      console.log('Replaced PRODUCTS array with ' + mapped.length + ' real items.');
    } else {
      console.log('Could not find const REVIEWS');
    }
  } else {
    console.log('Could not find const PRODUCTS');
  }
}

fetchPage(1);
