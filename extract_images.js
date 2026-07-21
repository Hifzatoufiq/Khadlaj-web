const fs = require('fs');
const html = fs.readFileSync('C:\\\\Users\\\\ADMIN\\\\.gemini\\\\antigravity\\\\brain\\\\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\\\\.system_generated\\\\steps\\\\6693\\\\content.md', 'utf8');
const images = html.match(/https:\/\/cdn\.shopify\.com\/[^"']+\.(jpg|png|webp|jpeg)/g);
if (images) {
  [...new Set(images)].forEach(i => console.log(i));
}
