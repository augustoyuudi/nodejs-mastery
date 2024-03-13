import fs from 'fs';

export async function runTest(testFile) {
  const code = await fs.promises.readFile(testFile, 'utf-8');

  return testFile + ':\n' + code;
}
