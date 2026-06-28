var fs = require("fs");
var lines = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8").split("\n");
lines.forEach(function(l,i){
  if(l.includes("spring") || l.includes("banner") || l.includes("KHADLAJ25") || l.includes("25% Off")){
    console.log((i+1)+": "+l.trim().substring(0,100));
  }
});
