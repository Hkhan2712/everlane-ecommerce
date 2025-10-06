const knex = require('@config/knex')
const productRepo = require('../repositories/product-repository')

const insertCoreProduct = async (payload, trx = knex) => {
    const [id] = await productRepo.insertProduct(trx, {
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        price: payload.price,
        stock: payload.stock ?? 0,
        status: payload.status ?? 1,
        brand_id: payload.brand_id ?? null
    })
    return id
}

const insertCategories = async (productId, categories, trx = knex) => {
    if (!categories?.length) return
    const rows = categories.map(cid => ({ product_id: productId, category_id: cid }))
    await productRepo.insertCategories(rows, trx)
}

const insertVariants = async (productId, variants, basePrice, trx = knex) => {
    if (!variants?.length) return
    const rows = variants.map(v => ({
        product_id: productId,
        sku: v.sku,
        price: v.price ?? basePrice,
        stock: v.stock ?? 0,
        size: v.size,
        color: v.color,
        status: 1
    }))
    await productRepo.insertVariants(trx, rows)
}

const insertTags = async (productId, tags, trx = knex) => {
    if (!tags?.length) return
    const rows = tags.map(tid => ({ product_id: productId, tag_id: tid }))
    await productRepo.insertTags(trx, rows)
}

const insertImages = async (productId, images, trx = knex) => {
    if (!images?.length) return
    const rows = images.map(img => ({
        product_id: productId,
        variant_id: img.variant_id ?? null,
        url: img.url,
        alt_text: img.alt_text ?? null,
        is_primary: img.is_primary ?? 0
    }))
    await productRepo.insertImages(rows, trx)
}

module.exports = {
    insertCoreProduct,
    insertCategories,
    insertVariants,
    insertTags,
    insertImages
}