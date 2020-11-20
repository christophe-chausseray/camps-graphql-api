import { Express } from 'express';
import { Application } from '../../infrastructure/server/express';
import Knex from 'knex';

var knex: Knex;

async function setup(): Promise<Express> {
  process.env.APP_ENV = 'test';
  const { app, container } = await Application.init();
  knex = container.get<Knex>('knex');

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
