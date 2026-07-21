const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\\.system_generated\\steps\\4860\\content.md', 'utf8');

const regex = /<a[^>]*class="[^"]*product-title[^"]*"[^>]*>([^<]+)<\/a>/gi;
let match;
const products = new Set();
while ((match = regex.exec(html)) !== null) {
  products.add(match[1].trim());
}

console.log(Array.from(products));
