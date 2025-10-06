const {createBaseRepository} = require('@modules/core/repository/base-repository')
const knex = require('@config/knex')

const base = createBaseRepository('products')

const findBySlug = async (slug, trx = knex) => {
    return baseSelectWithImages(trx)
        .where('p.slug', slug)
        .first()
}
/** Helper with Filter */
const applyFilters = (qb, f, trx = knex) => {
    const {
        categoryId, 
        priceMin,
        priceMax,
        color,
        size,
        q
    } = f || {}

    if (categoryId) {
        qb.join('product_categories as pc', 'p.id', 'pc.product_id')
          .where('pc.category_id', categoryId)
    }

    if (color || size) {
        qb.join('product_variants as pv', 'p.id', 'pv.product_id')
        if (color) qb.where('pv.color', color)
        if (size) qb.where('pv.size', size)
    }

    if (priceMin != null) qb.where('p.price', '>=', priceMin)
    if (priceMax != null) qb.where('p.price', '<=', priceMax)

    if (q) qb.whereILike('p.name', `%${q}%`)

    return qb
}

/* Base select */
const baseSelect = (trx = knex) =>
    trx('products as p')
    .leftJoin('product_images as pi', function () {
      this.on('p.id', '=', 'pi.product_id')
        .andOn('pi.is_primary', '=', trx.raw('1'))
    })
    .leftJoin('product_tags as pt', 'p.id', 'pt.product_id')
    .leftJoin('tags as t', 'pt.tag_id', 't.id')
    .select(
      'p.id',
      'p.name',
      'p.slug',
      trx.raw('p.price as original_price'),
      'p.sale_price',
      trx.raw('ANY_VALUE(pi.url) as thumbnail'),
      'p.created_at',
      trx.raw(
        `COALESCE(
          CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(t.name)), ']') AS JSON),
          JSON_ARRAY()
        ) as tags`
      )
    )
    .groupBy('p.id')

const baseSelectWithImages = (trx = knex) =>
  trx('products as p')
    .leftJoin(
      trx
        .select('product_id', 'url')
        .from(
          trx('product_images')
            .select(
              'product_id',
              'url',
              trx.raw(
                'ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY id ASC) as rn'
              )
            )
            .as('pi_rank')
        )
        .where('rn', '<=', 4)
        .as('pi'),
      'p.id',
      'pi.product_id'
    )
    .leftJoin('product_tags as pt', 'p.id', 'pt.product_id')
    .leftJoin('tags as t', 'pt.tag_id', 't.id')
    .select(
      'p.id',
      'p.name',
      'p.slug',
      trx.raw('p.price as original_price'),
      'p.sale_price',
      'p.created_at',
      trx.raw(`
        COALESCE(
          CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(pi.url)), ']') AS JSON),
          JSON_ARRAY()
        ) as thumbnails
      `),
      trx.raw(`
        COALESCE(
          CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(t.name)), ']') AS JSON),
          JSON_ARRAY()
        ) as tags
      `)
    )
    .groupBy('p.id')

/** List / Pagination / Filter */
const listWithTotal = async ({
    limit = 12, 
    offset = 0, 
    orderBy = 'created_at', 
    direction = 'desc',
    filters = {},
}, trx = knex) => {
    const baseQ = applyFilters(baseSelect(trx), filters, trx) 
    const itemsQ = baseQ.clone()
        .orderBy(`p.${orderBy}`, direction)
        .limit(Number(limit))
        .offset(Number(offset))

    const countQ = applyFilters(trx('products as p'), filters, trx)
        .countDistinct({total: 'p.id'})
        .first()
    const [items, {total}] = await Promise.all([itemsQ, countQ])
    return {items, total: Number(total)}
} 

const listWithCursor = async ({
    limit = 12, 
    cursor = null,
    direction = 'desc',
    filters = {}
}, trx = knex) => {
    const baseQ = applyFilters(baseSelect(trx), filters, trx)  
        .orderBy('p.id', direction)
        .limit(Number(limit))
    
    if (cursor) {
        direction === 'desc' 
            ? baseQ.andWhere('p.id', '<', cursor)
            : baseQ.andWhere('p.id', '>', cursor) 
    }

    const items = await baseQ
    const nextCursor = items.length === Number(limit) 
        ? items[items.length - 1].id
        : null
    
    return {items, nextCursor}
}
/**
 * List products by category with primary image
 */

// Insert product
const insertProduct = (product, trx = knex) => 
    trx('products').insert(product)

// Insert categories
const insertCategories = (rows, trx = knex) =>
    trx('product_categories').insert(rows)

// Insert variants
const insertVariants = (rows, trx = knex) =>
    trx('product_variants').insert(rows)

// Insert tags
const insertTags = (rows, trx = knex) =>
    trx('product_tags').insert(rows)

// Insert images
const insertImages = (rows, trx = knex) =>
    trx('product_images').insert(rows)

// Validate input value 
const findCategoriesByIds = (ids, trx = knex) =>
    trx('categories').whereIn('id', ids)

const findTagsByIds = (ids, trx = knex) =>
    trx('tags').whereIn('id', ids)

const findBrandById = (id, trx = knex) =>
    trx('brands').where({id}).first()

module.exports = {
    ...base,
    findBySlug,
    listWithTotal,
    listWithCursor,
    insertProduct,
    insertCategories,
    insertVariants,
    insertTags,
    insertImages,
    findCategoriesByIds,
    findTagsByIds,
    findBrandById
}