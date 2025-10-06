/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('search_histories', table => {
        table.bigIncrements('id').primary()
        table.bigInteger('user_id').unsigned().nullable()
        table.string('session_id', 64).nullable()
        table.string('keyword', 255).notNullable()
        table.string('normalized_keyword', 255).nullable()
        table.json('filters').nullable()
        table.integer('result_count').notNullable().defaultTo(0)
        table.bigInteger('clicked_product_id').unsigned().nullable()
        table.timestamp('searched_at').notNullable().defaultTo(knex.fn.now())
        table.string('ip_address', 45).nullable()
        table.string('user_agent', 255).nullable()

        // indexes
        table.index(['user_id'], 'idx_search_histories_user_id')
        table.index(['session_id'], 'idx_search_histories_session_id')
        table.index(['normalized_keyword'], 'idx_search_histories_normalized_keyword')
        table.index(['searched_at'], 'idx_search_histories_searched_at')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('search_histories')
}
