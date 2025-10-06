/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('phone', 15).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('avatar').nullable();
        table.enum('role', ['user', 'admin', 'staff', 'vendor']).defaultTo('user');
        table.enum('status', ['active', 'inactive', 'banned']).defaultTo('active');
        table.dateTime('email_verified_at').nullable();
        table.dateTime('phone_verified_at').nullable();
        table.dateTime('last_login_at').nullable();
        table.timestamps(true, true); 
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
