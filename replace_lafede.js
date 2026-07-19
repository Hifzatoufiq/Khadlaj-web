const fs = require('fs');

let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// The lines have "Lafede" in them.
const lines = code.split('\n');
const newLines = [];

let inProductsArray = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('const PRODUCTS = [')) {
    inProductsArray = true;
    newLines.push(line);
    // Insert all lafede entries here
    const lafedeEntries = fs.readFileSync('all_lafede_entries.txt', 'utf8');
    newLines.push(lafedeEntries.trimEnd()); // insert without extra newline
    continue;
  }
  
  if (inProductsArray) {
    if (line.includes('col: "Lafede"') || line.includes('col:"Lafede"')) {
      // Skip this old Lafede product line
      continue;
    }
    
    // Stop products array detection if we hit the closing bracket
    if (line.trim() === '];') {
      inProductsArray = false;
    }
  }
  
  newLines.push(line);
}

fs.writeFileSync('khadlaj-perfumes (1).jsx', newLines.join('\n'), 'utf8');
console.log('Replaced all Lafede products with the 42 new ones.');
