var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");

// Also fix TikTok iframe scrollbar — add scrolling no
src = src.replace(/style=\{\{width:"100%",height:580,border:"none",display:"block"\}\}/g,
  'scrolling="no" style={{width:"100%",height:580,border:"none",display:"block",overflow:"hidden"}}');

// Remove "Meet Our Founder & Master Perfumer" section from StoryPage
var meetStart = src.indexOf("        {/* Master Perfumers */}");
var meetEnd = src.indexOf("        {/* Craft timeline */}", meetStart);
if(meetStart > 0 && meetEnd > 0) {
  src = src.substring(0, meetStart) + src.substring(meetEnd);
  console.log("Meet Our Founder section removed");
}

// Remove "How a Khadlaj Fragrance is Born" (Craft timeline) section
var craftStart = src.indexOf("        {/* Craft timeline */}");
var craftEnd = src.indexOf("        {/* Lifestyle editorial */}", craftStart);
if(craftStart > 0 && craftEnd > 0) {
  src = src.substring(0, craftStart) + src.substring(craftEnd);
  console.log("Craft timeline removed");
}

fs.writeFileSync("khadlaj-perfumes (1).jsx", src);
console.log("Done!");
