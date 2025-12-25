const { spawnSync } = require('child_process');
const pkg = require('../package.json');

let majorNodeVer = process.argv[2] ?? process.versions.node.split('.')[0];
if (majorNodeVer) majorNodeVer = majorNodeVer.trim();
if (majorNodeVer === undefined || !Number.isSafeInteger(Number.parseInt(majorNodeVer))) throw new Error('Invalid Node version');

const deps = (pkg.dependencies) ? Object.keys(pkg.dependencies).map((dep) => `${dep}@latest`) : [];
const devDeps = (pkg.peerDependencies) ? Object.keys(pkg.devDependencies).map((dep) => `${dep}${(dep !== '@types/node') ? '@latest' : `@^${majorNodeVer}`}`) : [];
const optionalDeps = (pkg.optionalDependencies) ? Object.keys(pkg.optionalDependencies).map((dep) => `${dep}@latest`) : [];

if (deps.length > 0) {
    const depsCmd = spawnSync('npm', ['i', '--save', ...deps], { stdio: 'inherit' });

    if (depsCmd.error) console.error('Error while updating dependencies:', depsCmd.error);
}

if (devDeps.length > 0) {
    const devDepsCmd = spawnSync('npm', ['i', '--save-dev', ...devDeps], { stdio: 'inherit' });

    if (devDepsCmd.error) console.error('Error while updating dev dependencies:', devDepsCmd.error);
}

if (optionalDeps.length > 0) {
    const optionalDepsCmd = spawnSync('npm', ['i', '--save-optional', ...optionalDeps], { stdio: 'inherit' });

    if (optionalDepsCmd.error) console.error('Error while updating optional dependencies:', optionalDepsCmd.error);
}