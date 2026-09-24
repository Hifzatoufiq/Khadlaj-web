import * as esbuild from 'esbuild';
import fs from 'fs';

await esbuild.build({
  entryPoints: ['main.jsx'],
  bundle: true,
  outfile: 'bundle-v232.js',
  format: 'iife',
  loader: { '.jsx': 'jsx', '.js': 'js' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
});

fs.copyFileSync('bundle-v232.js', 'bundle-v230.js');
fs.copyFileSync('bundle-v232.js', 'bundle-v233-sep23.js');
if (fs.existsSync('khadlaj-theme/assets')) {
  fs.copyFileSync('bundle-v232.js', 'khadlaj-theme/assets/bundle-v232-shopify.js');
  fs.copyFileSync('bundle-v232.js', 'khadlaj-theme/assets/bundle-v230-shopify.js');
}
if (fs.existsSync('assets')) {
  fs.copyFileSync('bundle-v232.js', 'assets/bundle-v232-shopify.js');
  fs.copyFileSync('bundle-v232.js', 'assets/bundle-v230-shopify.js');
}
if (fs.existsSync('khadlaj-sa-theme/assets')) {
  fs.copyFileSync('bundle-v232.js', 'khadlaj-sa-theme/assets/bundle-v230-shopify.js');
  fs.copyFileSync('bundle-v232.js', 'khadlaj-sa-theme/assets/bundle-v233-sep23.js');
}
if (fs.existsSync('scratch/theme_154187956385/assets')) {
  fs.copyFileSync('bundle-v232.js', 'scratch/theme_154187956385/assets/bundle-v230-shopify.js');
  fs.copyFileSync('bundle-v232.js', 'scratch/theme_154187956385/assets/bundle-v233-sep23.js');
}
console.log('Build OK - Generated bundle-v233-sep23.js & synced theme assets');


