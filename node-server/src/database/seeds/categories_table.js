/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('categories').del();

  await knex('categories').insert([
    { name: 'Men Clothing', slug: 'men-clothing', status: 1 },
    { name: 'Women Clothing', slug: 'women-clothing', status: 1 },
    { name: 'Shoes', slug: 'shoes', status: 1 },
    { name: 'Accessories', slug: 'accessories', status: 1 },
  ]);
};

