const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\\.system_generated\\steps\\5021\\content.md', 'utf-8');

// Strip out scripts and styles
let html = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

// Extract everything inside main or body
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [null, html];
let textContent = bodyMatch[1];

// Strip HTML tags
textContent = textContent.replace(/<[^>]+>/g, '\n');

// Clean up whitespace
textContent = textContent.replace(/&nbsp;/g, ' ').replace(/\n\s*\n/g, '\n').trim();

// Print out lines that look like sentences (length > 30 and ending in punctuation)
const lines = textContent.split('\n');
const sentences = lines.map(l => l.trim()).filter(l => l.length > 20);

console.log(sentences.join('\n'));
