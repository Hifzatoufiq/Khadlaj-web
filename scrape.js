const https = require('https');

const url = 'https://khadlaj-perfumes.com/collections/la-fede-eau-de-parfume?page=2';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Basic extraction using regex
    // Looking for product items
    const products = [];
    
    // Shopify often puts product data in structured JSON or we can parse HTML
    // Let's try parsing HTML
    // <div class="card__content"> ... <a href="/products/..." class="full-unstyled-link">Name</a> ... <div class="price__regular">...<span class="price-item price-item--regular">Rs. 3,500.00</span>
    
    const itemRegex = /<h3 class="card__heading[^>]*>\s*<a href="([^"]+)"[^>]*>\s*(.*?)\s*<\/a>.*?<span class="price-item price-item--regular">\s*([^<]+)\s*<\/span>/gs;
    
    // Try to extract images too: <img srcset="..." src="..."
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    
    let match;
    let i = 0;
    while ((match = itemRegex.exec(data)) !== null) {
      if (i > 20) break; // limit
      products.push({
        link: 'https://khadlaj-perfumes.com' + match[1].trim().replace(/&amp;/g, '&'),
        name: match[2].trim().replace(/&amp;/g, '&'),
        price: match[3].trim().replace(/&nbsp;/g, ' ')
      });
      i++;
    }
    
    console.log(JSON.stringify(products, null, 2));
  });
}).on('error', (e) => {
  console.error(e);
});
