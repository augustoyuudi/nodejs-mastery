const fs = require('fs');

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, 'utf-8');

  return `worker id: ${process.env.JEST_WORKER_ID}\nfile: ${testFile}:\n${code}`;
}
