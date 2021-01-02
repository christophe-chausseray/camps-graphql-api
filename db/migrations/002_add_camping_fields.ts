import Knex, { CreateTableBuilder } from 'knex';

async function up(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema('api')
    .alterTable('camps_camping', (table: CreateTableBuilder) => {
      table.text('description');

      table.string('image');

      table.integer('nb_spots');

      table.integer('nb_stars');

      table.string('phone_number');

      table.string('email');

      table.string('website');
    });
}

function down(): Promise<void> {
  throw new Error(
    'Downward migrations are not supported. Restore from backup.'
  );
}

export { up, down };
