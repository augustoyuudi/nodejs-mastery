import fs from 'fs';

const input = fs.readFileSync(`${process.cwd()}/input.txt`, 'utf-8');

console.log(input);

const sanitizedInput = input.split('\n');

console.log(sanitizedInput);