exports.up = function(knex) {
    return knex.schema.createTable('product_images', table => {
        table.bigIncrements('id').primary()
        table.bigInteger('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE')
        table.bigInteger('variant_id').unsigned().nullable()
            .references('id').inTable('product_variants').onDelete('CASCADE')
        table.string('url', 255).notNullable()
        table.string('alt_text', 255).nullable()
        table.boolean('is_primary').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_images')
};
