import * as Knex from 'knex';

const tableName = 'addons';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // Creates an "id" column that gets autoincremented
    t.increments();

    t.integer('brand_id').references('id').inTable('brands');
    t.string('name').unique().notNullable();
    t.string('description');
    t.integer('price');
    t.string('category').notNullable();
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
