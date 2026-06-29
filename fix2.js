var fs = require("fs");
var lines = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8").split("\n");
lines.forEach(function(l,i){
  if(l.includes("Ihthiraam") || l.includes("Shiyaaka") || l.includes("Angel Dust") || l.includes("gridTemplateRows")){
    console.log((i+1)+": "+l.trim().substring(0,100));
  }
});
