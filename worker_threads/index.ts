import express from "express";
import { Worker } from "worker_threads";

type WorkerData = {
  start: number
  end: number
}

const app = express();

function runWorker(workerData: WorkerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./sumOfPrimesWorker.js", {
      workerData,
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code === 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

function divideWorkAndGetSum() {
  const start1 = 2;
  const end1 = 150000;
  const start2 = 150001;
  const end2 = 300000;
  const start3 = 300001;
  const end3 = 450000;
  const start4 = 450001;
  const end4 = 600000;
  //allocating each worker seperate parts
  const worker1 = runWorker({ start: start1, end: end1 });
  const worker2 = runWorker({ start: start2, end: end2 });
  const worker3 = runWorker({ start: start3, end: end3 });
  const worker4 = runWorker({ start: start4, end: end4 });
  //Promise.all resolve only when all the promises inside the array has resolved
  return Promise.all([worker1, worker2, worker3, worker4]);
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/sum-primes", async (req, res) => {
  const sum = await divideWorkAndGetSum();

  res.json({
    number: 600000,
    sum,
  });
});

app.listen(3000, () => console.log("listening on port 3000"));