const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\\.system_generated\\steps\\5021\\content.md', 'utf-8');

// The main page content is usually inside a container or rte class in Shopify
const rteMatch = content.match(/<div class="[^"]*rte[^"]*">([\s\S]*?)<\/div>\s*<\/div>/i);
if (rteMatch) {
    const text = rteMatch[1]
        .replace(/<[^>]+>/g, '\n') // strip tags
        .replace(/\n\s*\n/g, '\n') // clean up empty lines
        .replace(/&nbsp;/g, ' ')
        .trim();
    console.log("RTE CONTENT:\n", text);
} else {
    // Just try to find paragraph tags
    const pMatches = content.match(/<p>([\s\S]*?)<\/p>/g);
    if (pMatches) {
        console.log("P TAGS:\n", pMatches.map(p => p.replace(/<[^>]+>/g, '').trim()).join('\n\n'));
    } else {
        console.log("Could not find content.");
    }
}
