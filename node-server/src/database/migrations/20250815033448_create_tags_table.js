exports.up = function(knex) {
    return knex.schema.createTable('tags', table => {
        table.bigIncrements('id').primary()
        table.string('name', 255).notNullable()
        table.string('slug', 255).notNullable().unique()
        table.integer('status').defaultTo(1)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tags')
};