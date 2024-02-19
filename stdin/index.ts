// import * as readline from 'node:readline/promises';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

async function main() {
  const data = process.argv[2];

  console.log(data);
  // const answ = await rl.question("Give me your phone number: ");
  // console.log(answ);

  // rl.close();
}

main();

// rl.on('line', (line) => {
//   console.log(line);
// });

// rl.once('close', () => {
//   console.log('Thanks');
// });