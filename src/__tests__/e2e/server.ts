import { Express } from 'express';
import { Application } from '../../infrastructure/server/express';
import { DataClient, DataProvider } from '../../infrastructure/persistance';

var app: Express, client: DataClient;

async function setup(): Promise<Express> {
  process.env.APP_ENV = 'test';
  app = Application.init();
  client = await DataProvider.connect();
  await client.postgres.migrate.latest();

  return app;
}

function teardown(): void {
  client.postgres.destroy();
}

async function resetDB(): Promise<void> {
  await client.postgres.seed.run();
}

export { setup, teardown, resetDB };
