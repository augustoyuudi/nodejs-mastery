import fs from 'fs';
import process from 'node:process';

process.on('beforeExit', (code) => {
  console.log('Process before exit with code', code);
});

process.on('exit', (code) => {
  console.log('Process exit with code', code);
});

const input = fs.readFileSync(`${process.cwd()}/input.txt`, 'utf-8');

console.log(input);

const sanitizedInput = input.split('\n');

console.log(sanitizedInput);