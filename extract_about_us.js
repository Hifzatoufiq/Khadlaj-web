const fs = require('fs');
const html = fs.readFileSync('C:\\\\Users\\\\ADMIN\\\\.gemini\\\\antigravity\\\\brain\\\\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\\\\.system_generated\\\\steps\\\\6693\\\\content.md', 'utf8');

const paragraphs = html.match(/<p[^>]*>.*?<\/p>/gs);
if (paragraphs) {
  paragraphs.forEach((p, i) => {
    let clean = p.replace(/<[^>]+>/g, '').trim();
    if (clean.length > 30) console.log('[' + i + '] ' + clean);
  });
}

const headers = html.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gs);
if (headers) {
  headers.forEach((h, i) => {
    let clean = h.replace(/<[^>]+>/g, '').trim();
    if (clean.length > 5) console.log('HEADER [' + i + '] ' + clean);
  });
}
