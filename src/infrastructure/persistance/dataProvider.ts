import Knex from 'knex';
import { PostgresProvider } from './knex';

export interface DataClient {
  postgres: Knex;
}

async function connect(): Promise<DataClient> {
  return {
    postgres: await PostgresProvider.connect(),
  };
}

export default { connect };
