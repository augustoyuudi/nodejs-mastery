import cluster from 'node:cluster';
import os from 'node:os';
import express from 'express';

const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
  masterProcess();
} else {
  childProcess();
}

function masterProcess() {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < cpuCount; i++) {
    console.log(`Forking process number ${i+1}`);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // forks a new process if any process dies
  });
}

function childProcess() {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express();

  app.get('/', (req, res) => {
    res.send(`Hello from server ${process.pid}`);
  });

  app.listen(4000, () => {
    console.log(`Server ${process.pid} listening on port 4000`);
  });
}