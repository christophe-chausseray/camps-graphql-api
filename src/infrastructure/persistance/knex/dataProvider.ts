import Knex from 'knex';
import PostgresProvider from './postgresProvider';

export interface DataClient {
  postgres: Knex;
}

async function createDB(): Promise<DataClient> {
  return {
    postgres: await PostgresProvider.createDB(),
  };
}

export default { createDB };
