var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");

// Remove "Featured Gift Sets (editorial 2-col)" section
var secStart = src.indexOf("      {/* ── Featured Gift Sets (editorial 2-col) ── */}");
var secEnd = src.indexOf("      {/* ── Build Your Own CTA ── */}", secStart);

if(secStart > 0 && secEnd > 0) {
  src = src.substring(0, secStart) + src.substring(secEnd);
  fs.writeFileSync("khadlaj-perfumes (1).jsx", src);
  console.log("Signature Gift Boxes section removed!");
} else {
  console.log("Not found:", secStart, secEnd);
}
