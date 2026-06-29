var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");

var colStart = src.indexOf("      {/* ── COLLECTIONS PREVIEW ── */}");
var colEnd = src.indexOf("      {/* ── FEATURED PRODUCTS ── */}", colStart);

if(colStart > 0 && colEnd > 0) {
  src = src.substring(0, colStart) + src.substring(colEnd);
  fs.writeFileSync("khadlaj-perfumes (1).jsx", src);
  console.log("Collections Preview removed!");
} else {
  console.log("Not found:", colStart, colEnd);
}
