const { createBaseRepository } = require('@modules/core/repository/base-repository')
const knex = require('@config/knex')

const base = createBaseRepository('carts')
const CART_ITEMS_TABLE = 'cart_items'

/**
 * Get the active cart of a user along with its items and product details
 * @param {number} userId - ID of the user
 * @param {*} trx - optional transaction object
 * @returns cart object or null if no active cart exists
 */
const getActiveCartByUserId = async (userId, trx = knex) => {
    const cart = await base.listByFilter({ user_id: userId, status: 'active' }, trx).then(rows => rows[0])
    if (!cart) return null

    const items = await trx('cart_items as ci')
        .join('products as p', 'ci.product_id', 'p.id')
        .leftJoin('product_images as pi', function() {
            this.on('pi.product_id', '=', 'p.id').andOn('pi.is_primary', '=', trx.raw('1'))
        })
        .where('ci.cart_id', cart.id)
        .select(
            'ci.id',
            'ci.product_id',
            'p.slug',
            'ci.quantity',    
            'p.name as product_name',
            'pi.url as product_thumbnail',
            'p.price as original_price',
            'p.sale_price',
            'ci.created_at',
            'ci.updated_at'
        )

    return { ...cart, items }
}
/**
 * Get Cart By Id
 * @param {*} cartId 
 * @param {*} trx 
 * @returns 
 */
const getCartById = async (cartId, trx = knex) => {
    const cart = await trx('carts')
        .where({ id: cartId, status: 'active' })
        .first()

    if (!cart) return null

    const items = await trx('cart_items as ci')
        .join('products as p', 'ci.product_id', 'p.id')
        .leftJoin('product_images as pi', function () {
            this.on('pi.product_id', '=', 'p.id')
                .andOn('pi.is_primary', '=', trx.raw('1'))
        })
        .where('ci.cart_id', cart.id)
        .select(
            'ci.id',
            'ci.product_id',
            'p.slug',
            'ci.quantity',
            'p.name as product_name',
            'pi.url as product_thumbnail',
            'p.price as original_price',
            'p.sale_price',
            'ci.created_at',
            'ci.updated_at'
        )

    return { ...cart, items }
}


/**
 * Create a new cart for a user
 * @param {number} userId - ID of the user
 * @param {*} trx - optional transaction object
 * @returns newly created cart
 */
const createCart = (userId, trx = knex) => {
    return base.create({ user_id: userId, status: 'active' }, trx)
 }

/**
 * Add an item to the cart. If the item already exists, increment the quantity.
 * @param {number} cartId - ID of the cart
 * @param {number} productId - ID of the product
 * @param {number} quantity - Quantity to add (default: 1)
 * @param {number} price - Price of the product at the time of adding
 * @param {*} trx - optional transaction object
 * @returns cart_item object
 */
const addItem = async (cartId, productId, quantity = 1, trx = knex) => {
    const existing = await trx(CART_ITEMS_TABLE)
        .where({ cart_id: cartId, product_id: productId })
        .first()

    if (existing) {
        const newQty = existing.quantity + quantity
        await trx(CART_ITEMS_TABLE)
            .where({ id: existing.id })
            .update({ quantity: newQty, updated_at: knex.fn.now() })
        return { ...existing, quantity: newQty}
    }

    const [id] = await trx(CART_ITEMS_TABLE).insert({
        cart_id: cartId,
        product_id: productId,
        quantity
    })

    return trx(CART_ITEMS_TABLE).where({ id }).first()
}

/**
 * Update the quantity of a specific item in the cart
 * @param {number} cartItemId - ID of the cart item
 * @param {number} quantity - New quantity
 * @param {*} trx - optional transaction object
 * @returns number of rows updated
 */
const updateItemQuantity = (cartItemId, quantity, trx = knex) => {
    console.log(cartItemId);
    
    return trx(CART_ITEMS_TABLE)
        .where({ product_id: cartItemId })
        .update({ quantity, updated_at: knex.fn.now() })
}

/**
 * Remove a single item from the cart
 * @param {number} cartItemId - ID of the cart item
 * @param {*} trx - optional transaction object
 * @returns number of rows deleted
 */
const deleteItem = (cartId, cartItemId, trx = knex) => {
    return trx(CART_ITEMS_TABLE)
        .where({cart_id: cartId ,product_id: cartItemId })
        .del()
}

/**
 * Remove multiple items from the cart
 * @param {number} cartId - ID of the cart
 * @param {number[]} itemIds - Array of cart item IDs to remove
 * @param {*} trx - optional transaction object
 * @returns number of rows deleted
 */
const deleteItems = (cartId, itemIds, trx = knex) => {
    return trx(CART_ITEMS_TABLE)
        .where({ cart_id: cartId })
        .whereIn('id', itemIds)
        .del()
}

/**
 * Reset the cart by removing all items, keeping the cart active
 * @param {number} cartId - ID of the cart
 * @param {*} trx - optional transaction object
 * @returns number of rows deleted
 */
const resetCart = (cartId, trx = knex) => {
    return trx(CART_ITEMS_TABLE)
        .where({ cart_id: cartId })
        .del()
}

module.exports = {
    ...base,
    getActiveCartByUserId,
    getCartById,
    createCart,
    addItem,
    updateItemQuantity,
    deleteItem,
    deleteItems,
    resetCart
}
