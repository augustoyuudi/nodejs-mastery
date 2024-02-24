import express from 'express';
import { spawn, fork } from 'node:child_process';

export type IsPrimeMessage = {
  number: number
}

const app = express();

app.get("/ls", (req, res) => {
  const ls = spawn("ls", ["-lh", String(req.query.directory)]);

  ls.stdout.on("data", data => {
    //Pipe (connection) between stdin,stdout,stderr are established between the parent
    //node.js process and spawned subprocess and we can listen the data event on the stdout

    res.write(data.toString()); //date would be coming as streams(chunks of data)
    // since res is a writable stream,we are writing to it
  });

  ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
    res.end() //finally all the written streams are send back when the subprocess exit
  });
});

app.get("/is-prime", (req, res) => {
  const childProcess = fork("./dist/isPrime.js");
  childProcess.send({ number: req.query.number });
  childProcess.on("message", message => {
    res.json(message);
  });
});

app.get("test", (req, res) => {
  res.send("Working...");
});

app.listen(7000, () => console.log("listening on port 7000"));