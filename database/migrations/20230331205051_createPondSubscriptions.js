/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pond_subscriptions', table => {
    table.uuid('subscriber_id').notNullable().references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.uuid('pond_id').notNullable().references('ponds.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.primary(['subscriber_id', 'pond_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pond_subscriptions');
};
