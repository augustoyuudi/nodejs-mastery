import { createReadStream, createWriteStream } from 'node:fs';

function main() {
  const readableStream = createReadStream('./input.txt', 'utf-8');
  const writableStream = createWriteStream('./output.txt', 'utf-8');
  let streamCount = 0;

  readableStream.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  readableStream.on('data', (chunk) => {
    writableStream.write(`\nWriting stream ${streamCount}:\n${chunk}`);
    streamCount += 1;
  });
}

main();