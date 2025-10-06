const knex = require('@config/knex')
const productRepo = require('../repositories/product-repository')
const { validateProduct } = require('../validators/product-validators')
const {
    insertCoreProduct,
    insertCategories,
    insertVariants,
    insertTags,
    insertImages
} = require('./product-inserter')

const createProduct = async (payload) =>
    knex.transaction(async trx => {
        await validateProduct(payload, trx)

        const productId = await insertCoreProduct(trx, payload)

        await insertCategories(productId, payload.categories, trx)
        await insertVariants(productId, payload.variants, payload.price, trx)
        await insertTags(productId, payload.tags, trx)
        await insertImages(productId, payload.images, trx)

        return productRepo.findById(productId, trx)
    })

module.exports = { createProduct }
