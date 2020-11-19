import Knex, { CreateTableBuilder } from 'knex';

async function up(knex: Knex): Promise<void> {
  var schema = process.env.DB_SCHEMA;

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.raw('CREATE SCHEMA api');

  await knex.schema
    .withSchema(schema)
    .createTable('camps_camping', (table: CreateTableBuilder) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.timestamps(true, true);

      table.string('name');

      table.string('address');

      table.integer('zipcode');

      table.string('city');

      table.float('longitude');

      table.float('latitude');
    });
}

function down(): Promise<void> {
  throw new Error(
    'Downward migrations are not supported. Restore from backup.'
  );
}

export { up, down };
