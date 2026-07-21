const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// Update CONTACT US text clamp
code = code.replace(/clamp\(44px,6vw,84px\)/g, 'clamp(32px, 8vw, 84px)');

// Update We'd Love to Hear From You text clamp
code = code.replace(/clamp\(28px,3vw,44px\)/g, 'clamp(24px, 6vw, 44px)');

// Update form padding
code = code.replace(/padding:"44px 40px"/g, 'padding:"clamp(24px, 5vw, 44px) clamp(20px, 5vw, 40px)"');

// Make the Contact container padding responsive
code = code.replace(/padding:"80px 5% 96px"/g, 'padding:"clamp(40px, 6vw, 80px) 5% clamp(48px, 8vw, 96px)"');

// Also check if `use window width` hook is there, if not, media query is better. But inline clamp does the trick.

fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
