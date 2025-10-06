/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('stores', (table) => {
        table.bigIncrements('id').primary();
        table.string('name', 255).notNullable();                 // Tên cửa hàng
        table.string('slug', 255).notNullable().unique();        // Slug friendly
        table.string('address', 500).notNullable();              // Địa chỉ chi tiết
        table.string('city', 255);                               // Thành phố
        table.string('country', 100).defaultTo('Vietnam');       // Quốc gia
        table.decimal('latitude', 10, 8);                        // Vĩ độ
        table.decimal('longitude', 11, 8);                       // Kinh độ
        table.string('phone', 50);                               // Số điện thoại
        table.string('email', 100);                              // Email liên hệ
        table.json('opening_hours').nullable();                  // Giờ mở cửa (JSON)
        table.string('thumbnail', 255);                          // Ảnh cửa hàng
        table
        .tinyint('status')                                     // 1 = active, 0 = inactive
        .notNullable()
        .defaultTo(1);
        table
        .timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now());
        table
        .timestamp('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('stores');
}