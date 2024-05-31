const { Worker, isMainThread, parentPort, workerData } = require("node:worker_threads");

if (!isMainThread) {
  // console.log(workerData) => {a:"a"}
  const counter = loopThrough();
  parentPort.postMessage(counter);
} else {
  const http = require("node:http");

  // ===== Using built-in http =====
  const server = http.createServer((req, res) => {
    const url = req.url;

    const respond = (res, data, code = 200) => {
      res.writeHead(code, { "Content-Type": "text/plain" });
      res.end(data);
    };

    if (url === "/") {
      respond(res, "This is the root route.", 200);
    } else if (url === "/block-1") {
      setTimeout(() => {
        console.count("setTimeout call");
        const counter = loopThrough();
        respond(res, "block-1 counter: " + counter);
      }, 10000);
    } else if (url === "/block-2") {
      console.count("worker");
      const worker = new Worker("./test.js", { workerData: { a: "a" } });
      worker.on("message", (data) => {
        console.count("Done");
        respond(res, "block-1 counter: " + data);
      });
      worker.on("error", (error) => {
        console.count("Error");
        respond(res, "counter error: " + error, 404);
      });
    } else {
      respond(res, "404 Not Found", 404);
    }
  });

  server.listen(3000, () => console.log("Running on: http://localhost:3000"));

  // ===== Using express =====

  // const express = require("express");
  // const app = express();
  // app.get("/", (req, res) => {
  //   res.status(200).send("This is non-blocking route");
  // });
  // app.get("/block-1", (req, res) => {
  //   setTimeout(() => {
  //     const counter = loopThrough()
  //     res.status(200).send("counter: " + counter);
  //   }, 10000);
  // });
  // app.get("/block-2", (req, res) => {
  //   const worker = new Worker("./index.js");
  //   console.count("worker");
  //   worker.on("message", (data) => {
  //     console.count("Done");
  //     res.status(200).send("counter: " + data);
  //   });
  //   worker.on("error", (error) => {
  //     console.count("Error");
  //     res.status(404).send("counter error: " + error);
  //   });
  // });
  // app.listen(3000, () => {
  //   console.log(`Server is running on port ${3000}`);
  // });
}

function loopThrough(number = 20000000000) {
  let counter = 0;
  for (let i = 0; i < number; i++) {
    counter++;
  }
  return counter;
}
