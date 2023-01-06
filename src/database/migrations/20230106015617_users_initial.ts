import * as Knex from 'knex';

const tableName = 'users';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // Creates an "id" column that gets autoincremented
    t.increments();

    t.text('username').unique().notNullable();

    t.text('password').notNullable();

    t.text('role').checkBetween(['admin', 'user']);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
