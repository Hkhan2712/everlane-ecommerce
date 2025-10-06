exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.bigIncrements('id').primary()
        table.string('name', 255).notNullable()
        table.string('slug', 255).notNullable().unique()
        table.bigInteger('parent_id').unsigned().nullable()
            .references('id').inTable('categories').onDelete('SET NULL')
        table.integer('status').defaultTo(1)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories')
};
