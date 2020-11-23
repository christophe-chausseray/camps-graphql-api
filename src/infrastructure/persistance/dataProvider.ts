import Knex from 'knex';
import { connectPostgresDb } from './knex';

interface DbClient {
  postgres: Knex;
}

var dbClient: DbClient;

async function connectDb(): Promise<DbClient> {
  dbClient = {
    postgres: await connectPostgresDb(),
  };

  return dbClient;
}

export { DbClient, dbClient, connectDb };
