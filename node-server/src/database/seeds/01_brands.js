/** @type {import('knex').Knex} */
import { faker } from '@faker-js/faker';

export async function seed(knex) {
  await knex('brands').del();

  const brands = [];
  for (let i = 0; i < 10; i++) {
    const companyName = faker.company.name();
    brands.push({
      name: companyName,
      slug: faker.helpers.slugify(companyName).toLowerCase(),
      description: faker.lorem.sentences(2),
      is_active: faker.datatype.boolean() ? 1 : 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await knex('brands').insert(brands);
}
