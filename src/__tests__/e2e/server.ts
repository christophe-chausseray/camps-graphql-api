import { Express } from 'express';
import { Application } from '../../infrastructure/server/express';
import { DataClient, DataProvider } from '../../infrastructure/persistance';

var app, db: DataClient;

async function setup(): Promise<Express> {
  process.env.APP_ENV = 'test';
  app = Application.init();
  db = await DataProvider.connect();

  return app;
}

function teardown(): void {
  db.postgres.destroy();
}

export default { setup, teardown };
