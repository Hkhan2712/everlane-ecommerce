/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("order_items", (table) => {
    table.bigIncrements("id").primary()
    table.bigInteger("order_id").unsigned().notNullable()
    table.bigInteger("product_id").unsigned().notNullable()
    table.bigInteger("variant_id").unsigned().nullable()
    table.integer("quantity").unsigned().notNullable().defaultTo(1)
    table.decimal("price", 10, 2).notNullable()
    table.decimal("total", 10, 2).notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())

    // indexes
    table.index("order_id")
    table.index("product_id")

    // foreign keys
    table
      .foreign("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE")

    table
      .foreign("product_id")
      .references("id")
      .inTable("products")
      .onDelete("RESTRICT")

    table
      .foreign("variant_id")
      .references("id")
      .inTable("product_variants")
      .onDelete("SET NULL")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("order_items")
}
