import process from 'node:process';
import type { IsPrimeMessage } from '.';

process.on("message", (message: IsPrimeMessage) => {
  //child process is listening for messages by the parent process
  if (!process.send) {
    throw new Error('Process send not found');
  }

  if (!message.number) {
    process.send({
      message: 'invalid',
      data: message
    });
    process.exit();
  }

  const result = isPrime(message.number)
  process.send(result)
  process.exit() // make sure to use exit() to prevent orphaned processes
})

function isPrime(number: number) {
  let isPrime = true

  for (let i = 3; i < number; i++) {
    if (number % i === 0) {
      isPrime = false
      break
    }
  }

  return {
    number: number,
    isPrime: isPrime,
  }
}