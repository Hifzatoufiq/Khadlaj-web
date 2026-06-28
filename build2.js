var path = require("path");
var fs = require("fs");
var esbuild = require(path.join("C:/Users/ADMIN/AppData/Roaming/npm/node_modules/esbuild/lib/main.js"));
if (fs.existsSync("bundle-v5.js")) fs.unlinkSync("bundle-v5.js");
esbuild.buildSync({
  entryPoints: ["main.jsx"],
  bundle: true,
  outfile: "bundle-v5.js",
  format: "iife",
  jsx: "automatic",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  absWorkingDir: process.cwd(),
});
console.log("Done.", fs.statSync("bundle-v5.js").size, "bytes");
