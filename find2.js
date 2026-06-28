var fs = require("fs");
var lines = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8").split("\n");
lines.forEach(function(l,i){
  if(l.includes("bannerShimmer") || l.includes("sale-num") || l.includes("Summer Sale") || l.includes("Sale Live")){
    console.log((i+1)+": "+l.trim().substring(0,100));
  }
});
