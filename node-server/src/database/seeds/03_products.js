/** @type {import('knex').Knex} */
import { faker } from '@faker-js/faker';

export async function seed(knex) {
  await knex('products').del();

  const products = [];
  const usedSlugs = new Set();

  for (let i = 0; i < 50; i++) {
    const name = faker.commerce.productName();
    let slug = faker.helpers.slugify(name).toLowerCase();

    // đảm bảo slug unique
    while (usedSlugs.has(slug)) {
      slug = faker.helpers.slugify(name + '-' + faker.number.int({ min: 1, max: 1000 })).toLowerCase();
    }
    usedSlugs.add(slug);

    products.push({
      name,
      slug,
      brand_id: faker.number.int({ min: 1, max: 40 }),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await knex('products').insert(products);
}