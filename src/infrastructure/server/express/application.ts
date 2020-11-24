import express, { Express } from 'express';
import cors from 'cors';
import { connectDb } from './../../persistance';
import { initRouting } from './routing';

var app: Express;

async function initApplication(): Promise<Express> {
  // create and set up the express application
  app = express();
  app.use(cors());

  // Create the client connection to the DB
  await connectDb();

  // define the application routing
  initRouting(app);

  return app;
}

export { app, initApplication };
