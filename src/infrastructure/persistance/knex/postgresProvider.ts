import Knex from 'knex';
import config from './../../../../knexfile';
async function connectPostgresDb(): Promise<Knex> {
  const environment: string = process.env.APP_ENV ? process.env.APP_ENV : 'dev';
  const knex = Knex(config[environment]);

  try {
    //check database connection
    await knex.raw('SELECT now()');

    return knex;
  } catch (error) {
    throw new Error(
      'Unable to connect to Postgres via Knex. Ensure a valid connection.'
    );
  }
}

export { connectPostgresDb };
