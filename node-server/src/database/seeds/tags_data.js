/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('tags').del();

  await knex('tags').insert([
    { name: 'Casual', slug: 'casual' },
    { name: 'Formal', slug: 'formal' },
    { name: 'Sport', slug: 'sport' },
    { name: 'Summer', slug: 'summer' },
    { name: 'Winter', slug: 'winter' },
  ]);
};
