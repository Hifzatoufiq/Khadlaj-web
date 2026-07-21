const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// Fix the font
code = code.replace(
  '<h2 className="disp" style={{fontSize:"clamp(36px, 4.5vw, 64px)", fontWeight:300, color:"#fff", lineHeight:1.05, marginBottom:24}}>',
  '<h2 style={{fontSize:"clamp(36px, 4.5vw, 64px)", fontWeight:700, fontFamily:"\'Montserrat\',sans-serif", color:"#fff", lineHeight:1.1, marginBottom:24, letterSpacing: "-1px", textTransform:"uppercase"}}>'
);
code = code.replace(
  '<span style={{color:"#C8A97E", fontStyle:"italic", fontWeight:400}}>Happy Customers</span>',
  '<span style={{color:"#C8A97E", fontWeight:700}}>Happy Customers</span>'
);

// Fix the broken images
code = code.replace(
  'src="./assets/images/products/limaginaire.jpg"',
  'src="./assets/images/products/nafais-magrib_transparent.png"'
);
code = code.replace(
  'src="./assets/images/products/fursan.png"',
  'src="./assets/images/products/shiyaaka_transparent.png"'
);
code = code.replace(
  'src="./assets/images/products/hareem-al-sultan-gold-cutout.png"',
  'src="./assets/images/products/intoxicate-mystique-cutout.png"'
);

fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
console.log("Patched banner fonts and images.");
