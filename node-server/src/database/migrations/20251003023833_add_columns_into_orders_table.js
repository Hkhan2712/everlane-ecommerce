exports.up = async function(knex) {
  await knex.schema.createTable("orders", (table) => {
    table.bigIncrements("id").primary()
    table.bigInteger("user_id").unsigned().notNullable()
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
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("orders")
}
