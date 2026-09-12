import * as esbuild from 'esbuild';
import fs from 'fs';

await esbuild.build({
  entryPoints: ['main.jsx'],
  bundle: true,
  outfile: 'bundle-v221.js',
  format: 'iife',
  loader: { '.jsx': 'jsx', '.js': 'js' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
});

fs.copyFileSync('bundle-v221.js', 'bundle-v220.js');
fs.copyFileSync('bundle-v221.js', 'bundle-v219.js');
fs.copyFileSync('bundle-v221.js', 'bundle-v209.js');
fs.copyFileSync('bundle-v221.js', 'bundle-v208.js');
console.log('Build OK - Generated bundle-v221.js and synced previous bundles');


