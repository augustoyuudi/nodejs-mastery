import HasteMap from 'jest-haste-map';
import { Worker } from 'jest-worker';
import { cpus } from 'os';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const root = dirname(fileURLToPath(import.meta.url));

const hasteMapOptions = {
  extensions: ['js'],
  maxWorkers: cpus().length,
  name: 'test-framework',
  platforms: [],
  rootDir: root,
  roots: [root],
};

const hasteMap = new HasteMap.default(hasteMapOptions);

await hasteMap.setupCachePath(hasteMapOptions);

const { hasteFS } = await hasteMap.build();
const testFiles = hasteFS.matchFilesWithGlob([
  process.argv[2] ? `**/${process.argv[2]}*` : '**/*.test.js'
]);

const worker = new Worker(join(root, 'worker.js'), {
  enableWorkerThreads: true,
});

let hasTestFailed = false;

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const { success, errorMessage } = await worker.runTest(testFile);

    const status = success
     ? chalk.green.inverse.bold(' PASS ')
     : chalk.red.inverse.bold(' FAIL ');

     console.log(`${status} ${chalk.dim(relative(root, testFile))}`);

     if (!success) {
      hasTestFailed = true;
      console.log(` ${errorMessage}`);
     }
  })
);

worker.end();

if (hasTestFailed) {
  console.log(
    `\n ${chalk.red.bold('Test run failed, please fix all the failing tests.')}`
  );

  process.exitCode = 1;
}