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
