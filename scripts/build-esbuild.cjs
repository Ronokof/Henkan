const esbuild = require('esbuild');
const pkg = require('../package.json');
const { builtinModules } = require('module');

const deps = (pkg.dependencies) ? Object.keys(pkg.dependencies || {}) : [];
const peerDeps = (pkg.peerDependencies) ? Object.keys(pkg.peerDependencies || {}) : [];
const optionalDeps = (pkg.optionalDependencies) ? Object.keys(pkg.optionalDependencies || {}) : [];

const external = [
  ...builtinModules,
  ...deps,
  ...peerDeps,
  ...optionalDeps
];

const build = (format, outfile, target) =>
  esbuild.buildSync({
    entryPoints: ['src/index.ts'],
    bundle: true,
    format: format,
    outfile: outfile,
    platform: 'node',
    external: external,
    sourcemap: true,
    target: target,
  });

const mode = process.argv[2] || 'esm';
if (mode === 'esm') build('esm', 'dist/index.mjs', ['node16']);
else build('cjs', 'dist/index.cjs.js', ['node12']);

console.log('built', mode);
