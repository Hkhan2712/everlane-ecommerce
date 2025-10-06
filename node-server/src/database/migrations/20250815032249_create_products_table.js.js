/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.bigIncrements('id').primary()
        table.string('name', 255).notNullable()
        table.string('slug', 255).notNullable().unique()
        table.text('description').nullable()
        table.decimal('price', 10, 2).notNullable()
        table.integer('status').notNullable().defaultTo(1)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products')
};