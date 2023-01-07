import * as Knex from 'knex';

const tableName = 'addons';

export async function up(knex: Knex.Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('category');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
