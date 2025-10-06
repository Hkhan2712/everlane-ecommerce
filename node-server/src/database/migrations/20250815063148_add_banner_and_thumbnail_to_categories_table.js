/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('categories', function(table) {
    table.string('banner').nullable().after('slug');      // ảnh banner
    table.string('thumbnail').nullable().after('banner'); // ảnh thumbnail
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('categories', function(table) {
    table.dropColumn('banner');
    table.dropColumn('thumbnail');
  });
};
