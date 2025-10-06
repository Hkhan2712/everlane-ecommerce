// product-validators.js
const knex = require('@config/knex')
const productRepo = require('../repositories/product-repository')

async function validateProduct(payload, trx = knex) {
    // Slug unique
    const exist = await productRepo.findBySlug(payload.slug, trx = knex)
    if (exist) throw new Error(`Slug "${payload.slug}" is exist`)

    // Brand
    if (payload.brand_id) {
        const brand = await productRepo.findBrandById(payload.brand_id, trx = knex)
        if (!brand) throw new Error(`Brand ID ${payload.brand_id} is not exist`)
    }

    // Categories
    if (payload.categories?.length) {
        const found = await productRepo.findCategoriesByIds(payload.categories, trx = knex)
        if (found.length !== payload.categories.length) {
            throw new Error(`Some category_id is not exist`)
        }
    }

    // Tags
    if (payload.tags?.length) {
        const found = await productRepo.findTagsByIds(payload.tags, trx = knex)
        if (found.length !== payload.tags.length) {
            throw new Error(`Some tag_id is not exist`)
        }
    }
}

module.exports = { validateProduct }