exports.up = function(knex) {
    return knex.schema.createTable('product_variants', table => {
        table.bigIncrements('id').primary()
        table.bigInteger('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE')
        table.string('sku', 50).notNullable().unique()
        table.decimal('price', 10, 2).nullable()
        table.integer('stock').defaultTo(0)
        table.string('size', 50).nullable()
        table.string('color', 50).nullable()
        table.integer('status').defaultTo(1)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_variants')
};
