import express, { Express } from 'express';
import Knex from 'knex';
import cors from 'cors';
import { initContainer } from './dependencyInjection';
import { DataProvider } from './../../persistance';
import Routing from './routing';
import { Container } from 'inversify';

interface Application {
  app: Express;
  container: Container;
}
async function init(): Promise<Application> {
  // create and set up the express application
  const app = express();
  app.use(cors());

  // Init the container
  const container = initContainer();

  // Create the client connection to the DB
  const dataClient = await DataProvider.connect();

  // Bind the knex postgres data client
  container.bind<Knex>('knex').toConstantValue(dataClient.postgres);

  // define the application routing
  Routing.init(app);

  return { app, container };
}

export default { init };
