import express, { Express } from 'express';
import cors from 'cors';
import { Container } from './dependencyInjection';
import Routing from './routing';

function init(): Express {
  // create and set up the express application
  const app = express();
  app.use(cors());

  // Init the container
  Container.init();

  // define the application routing
  Routing.init(app);

  return app;
}

export default { init };
