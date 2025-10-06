exports.up = function(knex) {
    return knex.schema.createTable('product_tags', table => {
        table.bigIncrements('id').primary()
        table.bigInteger('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE')
        table.bigInteger('tag_id').unsigned().notNullable()
            .references('id').inTable('tags').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_tags')
};
