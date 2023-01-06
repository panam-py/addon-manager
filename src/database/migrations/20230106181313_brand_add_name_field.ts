import * as Knex from 'knex';

const tableName = 'brands';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.text('name');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
