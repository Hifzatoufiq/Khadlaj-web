var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8");
var lines = src.split("\n");
lines.forEach(function(l,i){
  if(l.includes("Island") && (l.includes("Extrait") || l.includes("New Season"))){
    console.log((i+1)+": "+l.trim().substring(0,100));
  }
});
