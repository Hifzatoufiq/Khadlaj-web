import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['main.jsx'],
  bundle: true,
  outfile: 'bundle-v207.js',
  format: 'iife',
  loader: { '.jsx': 'jsx', '.js': 'js' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: { 'process.env.NODE_ENV': '"production"' },
});

console.log('Build OK');
