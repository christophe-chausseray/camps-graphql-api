import { Express } from 'express';
import { initApplication } from '../../infrastructure/server/express';
import { dbClient } from './../../infrastructure/persistance';
import Knex from 'knex';

var app: Express, knex: Knex;

async function setup(): Promise<Express> {
  process.env.APP_ENV = 'test';
  app = await initApplication();
  knex = dbClient.postgres;

  await knex.migrate.latest();

  return app;
}

function teardown(): void {
  knex.destroy();
}

async function resetDB(): Promise<void> {
  await knex.seed.run();
}

export { setup, teardown, resetDB };
