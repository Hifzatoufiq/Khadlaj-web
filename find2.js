var fs = require("fs");
var lines = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8").split("\n");
lines.forEach(function(l,i){
  if(l.includes("Atyaab") && l.includes("img") || l.includes("COLLECTIONS_DATA") || l.includes("Everyday Luxury") || l.includes("Bold &")){
    console.log((i+1)+": "+l.trim().substring(0,120));
  }
});
