import { Express } from 'express';
import Knex from 'knex';
import { exec, ExecException } from 'child_process';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  ApolloServer,
  IMocks,
} from 'apollo-server-express';
import { initApplication } from './../../infrastructure/server/express';
import { dbClient } from './../../infrastructure/persistance';
import typeDefs from './../../infrastructure/api/graphql/type';
import resolvers from './../../infrastructure/api/graphql/resolver';

var app: Express, knex: Knex;

async function setup(): Promise<Express> {
  process.env.APP_ENV = 'test';
  app = await initApplication();
  knex = dbClient.postgres;

  await knex.migrate.latest();
  await resetDB();

  return app;
}

function teardown(): void {
  knex.destroy();
}

async function resetDB(): Promise<void> {
  await truncateSchemas(knex, ['api']);
  await knex.seed.run();
}

async function truncateSchemas(knexClient: Knex, schemas: string[]) {
  if (schemas.length < 1) {
    throw new Error(`Expected schemas be non-emtpy array, but got ${schemas}`);
  }

  await knexClient.raw(
    `
      DO
      $func$
      BEGIN
        EXECUTE
        (
          SELECT 'TRUNCATE TABLE ' || string_agg(format('%I.%I', table_schema, table_name), ', ') || ' RESTART IDENTITY CASCADE'
          FROM information_schema.tables
          WHERE table_schema IN (${schemas.map((x) => `'${x}'`).join(', ')})
          AND table_type = 'BASE TABLE'
        );
      END
      $func$;
    `
  );
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
    exec(`APP_ENV=test camps ${cwd}`, {}, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}

function constructTestServer(mocks: IMocks): ApolloServer {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  addMockFunctionsToSchema({ schema, mocks });
  const server = new ApolloServer({ schema });

  return server;
}

export { setup, teardown, resetDB, cli, constructTestServer };
