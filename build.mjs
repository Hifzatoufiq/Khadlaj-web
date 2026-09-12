import * as esbuild from 'esbuild';
import fs from 'fs';

await esbuild.build({
  entryPoints: ['main.jsx'],
  bundle: true,
  outfile: 'bundle-v223.js',
  format: 'iife',
  loader: { '.jsx': 'jsx', '.js': 'js' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
});

fs.copyFileSync('bundle-v223.js', 'bundle-v222.js');
fs.copyFileSync('bundle-v223.js', 'bundle-v221.js');
fs.copyFileSync('bundle-v223.js', 'bundle-v220.js');
fs.copyFileSync('bundle-v223.js', 'bundle-v219.js');
fs.copyFileSync('bundle-v223.js', 'bundle-v209.js');
fs.copyFileSync('bundle-v223.js', 'bundle-v208.js');
console.log('Build OK - Generated bundle-v223.js and synced previous bundles');


