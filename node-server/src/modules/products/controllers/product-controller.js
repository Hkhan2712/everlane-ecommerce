const { createBaseController } = require('@modules/core/controller/base-controller')
const productRepo = require('../repositories/product-repository')
const productService = require('../services/product-service')
const baseController = createBaseController(productRepo)

const { getPagination } = require('@utils/pagination')
const { success, error } = require('@utils/response')

// Parse query filters into a normalized object
const parseFilters = (query) => ({
    categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    priceMin: query.priceMin ? Number(query.priceMin) : undefined,
    priceMax: query.priceMax ? Number(query.priceMax) : undefined,
    color: query.color || undefined,
    size: query.size || undefined,
    q: query.q || undefined,
})

const searchProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params
        if (!slug) return error(res, 'Slug is required', 400)

        const product = await productRepo.findBySlug(slug)

        if (!product) return error(res, 'Product not found', 404)

        return success(res, product)
    } catch (err) {
        return error(res, err.message)
    }
}

/**
 * Get list of products (supports both offset and cursor pagination)
 */
const listProducts = async (req, res) => {
    try {
        const { page, limit, offset, orderBy, direction } = getPagination(req.query)
        const { cursor } = req.query
        const filters = parseFilters(req.query)

        // Cursor pagination
        if (cursor != null) {
        const { items, nextCursor } = await productRepo.listWithCursor({
            limit,
            cursor: Number(cursor) || null,
            direction,
            filters,
        })
        return success(res, items, {
            mode: 'cursor',
            limit,
            nextCursor,
        })
        }

        // Offset pagination
        const { items, total } = await productRepo.listWithTotal({
            limit,
            offset,
            orderBy,
            direction,
            filters,
        })

        return success(res, items, {
            mode: 'offset',
            page,
            limit,
            total,
            hasNext: offset + items.length < total,
        })
    } catch (err) {
        return error(res, err.message)
    }
}

/**
 * Get products by category
 */
const listProductsByCategory = async (req, res) => {
    try {
        const products = await productRepo.listByCategory(req.params)
        return success(res, products)
    } catch (err) {
        return error(res, err.message)
    }
}

/**
 * Get products by collection
 */
const listProductByCollection = async (req, res) => {
    try {
        const products = await productRepo.listByCollection(req.params)
        return success(res, products)
    } catch (err) {
        return error(res, err.message)
    }
}

/**
 * Create a new product
 */
const createProduct = async (req, res) => {
    try {
        const payload = req.body
        if (!payload.name || !payload.slug || !payload.price) {
        return error(res, 'Product name, slug and price are required', 400)
        }

        const product = await productService.createProduct(payload)
        return success(res, product, { created: true })
    } catch (err) {
        return error(res, err.message)
    }
}

module.exports = {
    ...baseController,
    searchProductBySlug,
    listProducts,
    listProductsByCategory,
    listProductByCollection,
    createProduct,
}
