const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

const lifestyleStart = code.indexOf('{/* Lifestyle editorial */}');
if (lifestyleStart !== -1) {
  // Find the exact closing of the StoryPage component
  const endMatch = '      </div>\n    </div>\n  );\n}';
  const endOfStoryPage = code.indexOf(endMatch, lifestyleStart);
  if (endOfStoryPage !== -1) {
    // Cut out everything from Lifestyle editorial down to just before the closing divs
    code = code.substring(0, lifestyleStart) + code.substring(endOfStoryPage);
    fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
    console.log("Successfully removed Lifestyle editorial.");
  } else {
    console.log("Could not find end of StoryPage.");
  }
} else {
  console.log("Could not find Lifestyle editorial comment.");
}
