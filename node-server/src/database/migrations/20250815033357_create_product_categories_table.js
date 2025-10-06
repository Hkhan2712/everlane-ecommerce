exports.up = function(knex) {
    return knex.schema.createTable('product_categories', table => {
        table.bigIncrements('id').primary()
        table.bigInteger('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE')
        table.bigInteger('category_id').unsigned().notNullable()
            .references('id').inTable('categories').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_categories')
};
