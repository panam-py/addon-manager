import * as Knex from 'knex';

const tableName = 'brands';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // Creates an "id" column that gets autoincremented
    t.increments();

    t.specificType('categories', 'text ARRAY');
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
