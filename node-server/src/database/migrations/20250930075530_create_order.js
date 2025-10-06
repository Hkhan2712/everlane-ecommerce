/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Tạo bảng orders
  await knex.schema.createTable('orders', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.integer('user_id').unsigned().notNullable().index();
    table.enu('status', ['pending', 'paid', 'shipped', 'completed', 'cancelled']).defaultTo('pending');
    table.decimal('total_amount', 10, 2).notNullable().defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });

  // Tạo bảng order_items
  await knex.schema.createTable('order_items', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.bigInteger('order_id').unsigned().notNullable().index();
    table.bigInteger('product_id').unsigned().notNullable().index();
    table.integer('quantity').unsigned().notNullable().defaultTo(1);
    table.decimal('price', 10, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');
    table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
};
