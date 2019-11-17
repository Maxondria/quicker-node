const cluster = require("cluster");

//Is the file being excecuted in cluster mode?
if (cluster.isMaster) {
  /**
   * Cause index.js to be executed again but in Slave mode,
  in other works, a slave is created, on any requests now, they will go the 'else' part...,
  This isn't help at the moment, only one worker slave created anyway*/
  cluster.fork();
} else {
  // I am a slave, my job is being a server and nothing else
  const express = require("express");

  const app = express();

  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000); //Server blocked for 5s, all other requests must wait...
    res.send("Hi there...");
  });

  app.listen(3000);
}
