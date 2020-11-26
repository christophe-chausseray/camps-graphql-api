import { Express } from 'express';
import Knex from 'knex';
import { exec, ExecException } from 'child_process';
import { initApplication } from '../../infrastructure/server/express';
import { dbClient } from '../../infrastructure/persistance';

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

function cli(
  cwd: string
): Promise<{
  code: number;
  error: number | ExecException;
  stdout: string;
  stderr: string;
}> {
  return new Promise((resolve) => {
    exec(`camps ${cwd}`, {}, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}

export { setup, teardown, resetDB, cli };
