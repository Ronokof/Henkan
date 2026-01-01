const { spawnSync } = require("child_process");
const pkg = require("../package.json");

const majorNodeVer = Number(
  String(
    process.argv[2] && process.argv[2].trim().length > 0
      ? process.argv[2]
      : process.versions.node.split(".")[0],
  ).trim(),
);
if (!Number.isSafeInteger(majorNodeVer))
  throw new Error("Invalid Node version");

const deps = Object.keys(pkg.dependencies).map((dep) => `${dep}@latest`);
const devDeps = Object.keys(pkg.devDependencies).map(
  (dep) => `${dep}${dep !== "@types/node" ? "@latest" : `@^${majorNodeVer}`}`,
);

if (
  process.argv[2] === undefined ||
  !Number.isSafeInteger(Number.parseInt(process.argv[2].trim()))
) {
  if (deps.length > 0) {
    const depsCmd = spawnSync("npm", ["i", "--save", ...deps], {
      stdio: "inherit",
    });

    if (depsCmd.error) throw depsCmd.error;
  }

  if (devDeps.length > 0) {
    const devDepsCmd = spawnSync("npm", ["i", "--save-dev", ...devDeps], {
      stdio: "inherit",
    });

    if (devDepsCmd.error) throw devDepsCmd.error;
  }
} else {
  const nodeTypesCmd = spawnSync(
    "npm",
    ["i", "--save-dev", `@types/node@^${majorNodeVer}`],
    { stdio: "inherit" },
  );

  if (nodeTypesCmd.error) throw nodeTypesCmd.error;
}
