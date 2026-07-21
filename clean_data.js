const fs = require('fs');

let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// Find the PRODUCTS array block
// It starts with `const PRODUCTS = [` and ends with `];` right before `const NAV_LINKS` or something.
// But we can just use string replacement on all `"name": "..."` lines.

const lines = code.split('\n');
let updatedLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.includes('"name": "')) {
        // Extract the original name
        let match = line.match(/"name": "(.*?)"/);
        if (match) {
            let origName = match[1];
            let cleanName = origName;
            
            // Remove "KHADLAJ PERFUMES " or "KHADLAJ " if it's not "KHADLAJ SARAYA"
            if (cleanName.startsWith("KHADLAJ PERFUMES ")) {
                cleanName = cleanName.replace("KHADLAJ PERFUMES ", "");
            }
            
            // Extract size if possible
            let sizeMatch = origName.match(/\b(\d+\s*(?:ML|G|OZ))\b/i);
            let sizeStr = sizeMatch ? sizeMatch[1].toUpperCase().replace(/\s*/g, '') : null;
            if (sizeStr === '100ML') sizeStr = '100 ml';
            else if (sizeStr === '60ML') sizeStr = '60 ml';
            else if (sizeStr === '3ML') sizeStr = '3 ml';
            else if (sizeStr === '200G') sizeStr = '200 g';
            
            // Regex to cut off at the first occurrence of volume or " FOR " or " EDP "
            let cutMatch = cleanName.match(/\s*(?:\b\d+\s*(?:ML|G|OZ)\b|\bEDP\b|\bEAU DE PARFUM\b|\bEXTRAIT\b|\bFOR WOMEN\b|\bFOR MEN\b)/i);
            
            if (cutMatch && cutMatch.index > 0) {
                cleanName = cleanName.substring(0, cutMatch.index).trim();
            }
            
            // Edge case fixes
            if (cleanName === "CREAM VELVET GIFT SET") {
               // already clean
            } else if (cleanName.includes("CREAM VELVET GIFT SET")) {
               cleanName = "CREAM VELVET GIFT SET";
            }
            
            if (cleanName.includes("NAFAIS SHARQ GIFT SET")) {
               cleanName = "NAFAIS SHARQ GIFT SET";
            }
            
            line = line.replace(`"name": "${origName}"`, `"name": "${cleanName}"`);
            
            // Now, we need to update the size if the size field is empty or wrong
            // The size field is usually the next line or a few lines down.
            // Let's just look ahead 5 lines for `"size": ""`
            if (sizeStr) {
                for (let j = 1; j <= 5; j++) {
                    if (i + j < lines.length && lines[i+j].includes('"size":')) {
                        // replace `"size": ""` or `"size": "something"`
                        let oldSizeLine = lines[i+j];
                        let sizeValMatch = oldSizeLine.match(/"size": "(.*?)"/);
                        if (sizeValMatch && (!sizeValMatch[1] || sizeValMatch[1].trim() === '')) {
                            lines[i+j] = oldSizeLine.replace(/"size": "(.*?)"/, `"size": "${sizeStr}"`);
                        }
                        break;
                    }
                }
            }
        }
    }
    
    // Hardcode image replacements for the 3 problematic products
    if (line.includes('DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964314.jpg')) {
        line = line.replace('DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964314.jpg', 'DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964319.jpg');
    }
    if (line.includes('Nafais-Sharq-1.jpg')) {
        line = line.replace('Nafais-Sharq-1.jpg', 'Nafais-Sharq-3.jpg');
    }
    if (line.includes('CreamVelvet-1.jpg')) {
        line = line.replace('CreamVelvet-1.jpg', 'CreamVelvet-4.jpg');
    }

    updatedLines.push(line);
}

fs.writeFileSync('khadlaj-perfumes (1).jsx', updatedLines.join('\n'), 'utf8');
console.log("Successfully cleaned names, set sizes, and updated images for Combodi/Gift Sets.");
