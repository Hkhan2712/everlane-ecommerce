exports.up = async function(knex) {
  await knex.schema.createTable("orders", (table) => {
    table.bigIncrements("id").primary()
    table.integer("user_id").unsigned().notNullable()
    table
      .enum("status", ["pending", "paid", "shipped", "completed", "cancelled"])
      .defaultTo("pending")
    table
      .enum("payment_method", ["cod", "bank_transfer", "credit_card", "paypal"])
      .defaultTo("cod")
    table.decimal("total_amount", 10, 2).notNullable().defaultTo(0.00)
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())

    // FK
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
  })
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

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("orders")
}
