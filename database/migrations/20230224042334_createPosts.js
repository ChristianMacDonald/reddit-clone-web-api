/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('author_id').notNullable().references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.uuid('pond_id').notNullable().references('ponds.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('content', 10000).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
