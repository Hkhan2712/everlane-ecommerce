/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Tạo bảng carts
  await knex.schema.createTable('carts', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.bigInteger('user_id').unsigned().notNullable().index();
    table.enu('status', ['active', 'ordered']).defaultTo('active');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // Tạo bảng cart_items
  await knex.schema.createTable('cart_items', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.bigInteger('cart_id').unsigned().notNullable().index();
    table.bigInteger('product_id').unsigned().notNullable().index();
    table.integer('quantity').unsigned().notNullable().defaultTo(1);
    table.decimal('price', 10, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Thiết lập ràng buộc ngoại khóa
    table.foreign('cart_id').references('id').inTable('carts').onDelete('CASCADE');
    table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('cart_items');
  await knex.schema.dropTableIfExists('carts');
};
