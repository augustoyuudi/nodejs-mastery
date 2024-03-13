import HasteMap from 'jest-haste-map';
import { cpus } from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { runTest } from './worker.js';

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

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    console.log(await runTest(testFile));
  })
);
