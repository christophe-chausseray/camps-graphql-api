import { Express } from 'express';
import { Application } from '../../infrastructure/server/express';
import {
  DataProvider,
  DataClient,
} from '../../infrastructure/persistance/knex';

var app, db: DataClient;

async function setup(): Promise<Express> {
  app = Application.init();
  db = await DataProvider.createDB();

  return app;
}

function teardown(): void {
  db.postgres.destroy();
}

export default { setup, teardown };
