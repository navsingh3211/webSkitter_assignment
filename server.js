import express from 'express';
import dotenv from 'dotenv';
import cluster from 'node:cluster';
import os from 'os';
import process from 'node:process';
import database from './database.js';
import routes from './routes/index.js';
import {notFound} from './middlewares/error.middlewares.js';


let totalCpu = os.cpus().length;
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < totalCpu; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  dotenv.config("");


  const port=process.env.PORT
  const mongoUrl = process.env.MONGO_URL;
  const app_version = process.env.APP_VERSION;
  database(mongoUrl);
  app.use(`/api/${app_version}`,routes());
  app.use(notFound);


  const server = app.listen(port,()=>{
    console.log(`Our app is listing on port ${port}`);
  });
  server.timeout = 300000;
}
