import express from 'express';
import dotenv from 'dotenv';
import cors from'cors';
import cluster from 'node:cluster';
import os from 'os';
import process from 'node:process';
import { rateLimit } from 'express-rate-limit'
import database from './database.js';
import routes from './routes/index.js';
import {
  notFound,
  appErrorHandler,
  genericErrorHandler
} from './middlewares/error.middlewares.js';


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
  app.use(express.json());
  app.use(cors());

  const port=process.env.PORT
  const mongoUrl = process.env.MONGO_URL;
  const app_version = process.env.APP_VERSION;

  database(mongoUrl);

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
    standardHeaders: true,
    legacyHeaders: false,
    message:async (req, res) => {
        return 'You can only make 10 requests every minute.'
    },
  });
  
  // Apply the rate limiting middleware to all requests.
  app.use(limiter)

  app.use(`/api/${app_version}`,routes());
  app.use(notFound);
  app.use(appErrorHandler);
  app.use(genericErrorHandler);

  const server = app.listen(port,()=>{
    console.log(`Our app is listing on port ${port}`);
  });
  server.timeout = 300000;
}
