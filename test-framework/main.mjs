import HasteMap from 'jest-haste-map';
import { Worker } from 'jest-worker';
import { cpus } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);

const worker = new Worker(join(root, 'worker.js'), {
  enableWorkerThreads: true,
});

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const testResult = await worker.runTest(testFile);
    console.log(testResult);
  })
);

worker.end();