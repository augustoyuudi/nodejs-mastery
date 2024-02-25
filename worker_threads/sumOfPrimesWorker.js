import { workerData, parentPort } from 'node:worker_threads';
//workerData will be the second argument of the Worker constructor in multiThreadServer.js

const start = workerData.start
const end = workerData.end

let sum = 0
let i = start
let j = 2
for (i = start; i <= end; i++) {
  for (j = 2; j <= i / 2; j++) {
    if (i % j == 0) {
      break
    }
  }
  if (j > i / 2) {
    sum += i
  }
}

parentPort?.postMessage({
  //send message with the result back to the parent process
  start: start,
  end: end,
  result: sum,
})