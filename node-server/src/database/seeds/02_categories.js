/** @type {import('knex').Knex} */
import { faker } from '@faker-js/faker';

export async function seed(knex) {
  await knex('categories').del();

  const categories = [];
  const usedSlugs = new Set();

  for (let i = 0; i < 10; i++) {
    const name = faker.commerce.department();
    let slug = faker.helpers.slugify(name).toLowerCase();

    // đảm bảo slug unique
    while (usedSlugs.has(slug)) {
      slug = faker.helpers.slugify(name + '-' + faker.number.int({ min: 1, max: 1000 })).toLowerCase();
    }
    usedSlugs.add(slug);

    categories.push({
      name,
      slug,
      parent_id: null,
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await knex('categories').insert(categories);
}