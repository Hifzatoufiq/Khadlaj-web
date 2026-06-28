var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");

// The old sky rating badge (line 869) is missing its closing </div></div></section>
// Find the unclosed rating badge and close it properly
var bad = `          {/* Rating badge */}
          <div style={{
            position:"absolute",top:24,right:24,
            background:"rgba(255,255,255,.88)",
            border:"1px solid rgba(184,146,42,.3)",
            padding:"10px 16px",
            backdropFilter:"blur(8px)",
            zIndex:3,
          }}>

      {/* ── CAMPAIGN BANNER ── */}`;

var good = `      {/* ── CAMPAIGN BANNER ── */}`;

if (src.includes(bad)) {
  src = src.replace(bad, good);
  fs.writeFileSync("khadlaj-perfumes (1).jsx", src);
  console.log("Fixed!");
} else {
  // print lines 864-884
  var lines = src.split("\n");
  console.log("Lines 864-884:");
  for(var i=863;i<885;i++) console.log((i+1)+": "+lines[i]);
}
