/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // sales table
  await knex.schema.createTable("sales", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.enu("type", ["percentage", "fixed", "buy_x_get_y"]).notNullable();
    table.decimal("discount_value", 10, 2).notNullable(); 
    table.datetime("start_date").notNullable();
    table.datetime("end_date").notNullable();
    table.enu("status", ["scheduled", "active", "expired"]).defaultTo("scheduled");
    table.integer("priority").defaultTo(0);
    table.timestamps(true, true); 
  });

  // sale_products pivot table
  await knex.schema.createTable("sale_products", (table) => {
    table.bigIncrements("id").primary();
    table
      .bigInteger("sale_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sales")
      .onDelete("CASCADE");
    table
      .bigInteger("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.decimal("max_discount", 10, 2); 
    table.integer("min_qty").defaultTo(1);
    table.integer("stock_limit"); 
    table.timestamps(true, true);
  });

  // sale_variants table (optional)
  await knex.schema.createTable("sale_variants", (table) => {
    table.bigIncrements("id").primary();
    table
      .bigInteger("sale_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sales")
      .onDelete("CASCADE");
    table
      .bigInteger("variant_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("product_variants")
      .onDelete("CASCADE");
    table.integer("stock_limit"); 
    table.timestamps(true, true);
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("sale_variants")
  await knex.schema.dropTableIfExists("sale_products")
  await knex.schema.dropTableIfExists("sales")
}