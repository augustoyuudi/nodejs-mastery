import JestHasteMap from 'jest-haste-map';
import Resolver from 'jest-resolve';
import { DependencyResolver } from 'jest-resolve-dependencies';
import { cpus } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';

const root = join(dirname(fileURLToPath(import.meta.url)), 'product');

const hasteMapOptions = {
  extensions: ['js'],
  maxWorkers: cpus().length,
  name: 'bundler',
  platforms: [],
  rootDir: root,
  roots: [root],
};

const hasteMap = new JestHasteMap.default(hasteMapOptions);

await hasteMap.setupCachePath(hasteMapOptions);

const { hasteFS, moduleMap } = await hasteMap.build();

const options = yargs(process.argv).argv;
const entryPoint = resolve(process.cwd(), options.entryPoint);

if (!hasteFS.exists(entryPoint)) {
  throw new Error(
    '`--entry-point` does not exist. Please provide a path to a valid file.',
  )
}

console.log(chalk.bold(`❯ Building ${chalk.blue(options.entryPoint)}`));

const resolver = new Resolver.default(moduleMap, {
  extensions: ['.js'],
  hasCoreModules: false,
  rootDir: root,
});

const seen = new Set();
const modules = new Map();
const queue = [entryPoint];
let id = 0;

while (queue.length) {
  const module = queue.shift();

  if (seen.has(module)) {
    continue;
  }

  seen.add(module);

  const dependencyMap = new Map(
    hasteFS
      .getDependencies(module)
      .map((dependencyName) => [
        dependencyName,
        resolver.resolveModule(module, dependencyName),
      ]),
  );

  const code = fs.readFileSync(module, 'utf-8');

  const metadata = {
    id: id++,
    code,
    dependencyMap,
  };

  modules.set(module, metadata);
  queue.push(...dependencyMap.values());
}

console.log(chalk.bold(`❯ Found ${chalk.blue(seen.size)} files`));

console.log(chalk.bold('❯ Serializing bundle'));

const wrapModule = (id, code) => {
  return `define(${id}, function(module, exports, require) {${code}});`;
}

const output = [];

for (const [module, metadata] of Array.from(modules).reverse()) {
  let { id, code } = metadata;

  for (const [dependencyName, dependencyPath] of metadata.dependencyMap) {
    const dependency = modules.get(dependencyPath);

    code = code.replace(
      new RegExp(
        `require\\(('|")${dependencyName.replace(/[\/.]/g, '\\$&')}\\1\\)`,
      ),
      `require(${dependency.id})`,
    );
  }

  output.push(wrapModule(id, code));
}

output.unshift(fs.readFileSync('./require.js', 'utf-8'));

output.push(['requireModule(0);']);

console.log(output.join('\n'));