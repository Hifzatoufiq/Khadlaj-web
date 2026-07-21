const fs = require('fs');
const html = fs.readFileSync('C:\\\\Users\\\\ADMIN\\\\.gemini\\\\antigravity\\\\brain\\\\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\\\\.system_generated\\\\steps\\\\6693\\\\content.md', 'utf8');

let bodyStart = html.indexOf('<body');
let bodyEnd = html.indexOf('</body>');

if (bodyStart === -1 || bodyEnd === -1) {
  console.log("No body found");
} else {
  let body = html.substring(bodyStart, bodyEnd + 7);
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  body = body.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  body = body.replace(/<[^>]+>/g, ' ');
  body = body.replace(/\s+/g, ' ').trim();
  console.log(body);
}
