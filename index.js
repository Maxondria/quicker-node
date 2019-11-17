//Restrict all slaves to have utmost 1 threadpool
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require("cluster");

//Is the file being excecuted in cluster mode?
if (cluster.isMaster) {
  /**
   * Cause index.js to be executed again but in Slave mode,
  in other works, a slave is created, on any requests now, they will go the 'else' part...,
  This isn't help at the moment, only one worker slave created anyway*/
  cluster.fork();
  /**
   * Let' add more slaves
   *
   * SUBSEQUENT REQUESTS WON'T HAVE TO WAIT, THE SERVER CAN NOW USE OTHER SLAVES TO PROCESS THEM
   */
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // I am a slave, my job is being a server and nothing else
  const express = require("express");
  const crypto = require("crypto");

  const app = express();

  //   function doWork(duration) {
  //     const start = Date.now();

  //     while (Date.now() - start < duration) {}
  //   }

  app.get("/", (req, res) => {
    //doWork(5000); //Server blocked for 5s, all other requests must wait...

    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there...");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("No work, I am simply fast!");
  });

  app.listen(3000);
}
