import Knex, { CreateTableBuilder } from 'knex';

async function up(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema('api')
    .createTable('camps_comment', (table: CreateTableBuilder) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.timestamps(true, true);

      table.string('title').notNullable();

      table.string('description').notNullable();

      table.string('author').notNullable();

      table.uuid('campingId').notNullable();

      table
        .foreign('campingId')
        .references('id')
        .inTable('api.camps_camping')
        .onDelete('CASCADE');
    });
}

function down(): Promise<void> {
  throw new Error(
    'Downward migrations are not supported. Restore from backup.'
  );
}

export { up, down };
