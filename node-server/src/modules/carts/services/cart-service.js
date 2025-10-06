const cartRepo = require('../repositories/cart-repository')
const knex = require('@config/knex')
const productRepo = require('../../products/repositories/product-repository')

/**
 * Helper: tính subtotal và total quantity của cart
 * @param {object} cart 
 */
const calculateCartTotals = (cart) => {
    const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    return { ...cart, totalQuantity, subtotal }
}

/**
 * Get active cart of user, or create new one
 * @param {number} userId
 */
const getOrCreateCartByUserId = async (userId) => {
    let cart = await cartRepo.getActiveCartByUserId(userId)
    if (!cart) {
        cart = await cartRepo.createCart(userId)
        cart.items = []
    }

    return calculateCartTotals(cart)
}

/**
 * Add product to cart
 * @param {number} userId
 * @param {number} productId
 * @param {number} quantity 
 */
const addProductToCart = async (userId, productId, quantity = 1) => {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0')

    return knex.transaction(async (trx) => {
        // Lấy hoặc tạo cart
        let cart = await cartRepo.getActiveCartByUserId(userId, trx)
        if (!cart) cart = await cartRepo.createCart(userId, trx)

        // Lấy product
        const product = await productRepo.findById(productId, trx)
        if (!product) throw new Error('Product not found')

        const price = product.sale_price || product.price

        // Thêm item
        await cartRepo.addItem(cart.id, productId, quantity, trx)

        // Lấy lại cart full
        const updatedCart = await cartRepo.getActiveCartByUserId(userId, trx)
        return calculateCartTotals(updatedCart)
    })
}

/**
 * Update cart item quantity
 * @param {number} userId
 * @param {number} cartItemId 
 * @param {number} quantity 
 */
const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
    if (quantity < 0) throw new Error('Quantity cannot be negative')
    
    return knex.transaction(async (trx) => {
        const cart = await cartRepo.getActiveCartByUserId(userId, trx)
        if (!cart) throw new Error('Cart not found')

        const cartItem = await trx('cart_items').where({ product_id: cartItemId, cart_id: cart.id }).first()
        console.log(cartItem)
        
        if (!cartItem) throw new Error('Cart item not found or does not belong to user')

        if (quantity === 0) {
            await cartRepo.deleteItem(cartItemId, trx)
        } else {
            await cartRepo.updateItemQuantity(cartItemId, quantity, trx)
        }

        const updatedCart = await cartRepo.getActiveCartByUserId(userId, trx)
        return calculateCartTotals(updatedCart)
    })
}

/**
 * Remove one item from cart
 * @param {number} cartItemId 
 */
const removeCartItem = async (userId, cartItemId) => {
    return knex.transaction(async (trx) => {
        const cart = await trx('carts')
        .where({ user_id: userId, status: 'active' })
        .first()
        
        if (!cart) throw new Error('Cart not found')

        const cartItem = await trx('cart_items')
            .where({ cart_id: cart.id, product_id: cartItemId })
            .first()
        if (!cartItem) throw new Error('Cart item not found')

        await cartRepo.deleteItem(cart.id, cartItemId, trx)

        const fullCart = await cartRepo.getCartById(cart.id, trx)
        if (!fullCart) throw new Error('Cart not found')

        return calculateCartTotals(fullCart)
    })
}

/**
 * Remove multiple items
 * @param {number} userId 
 * @param {number[]} itemIds 
 */
const removeCartItems = async (userId, itemIds) => {
    return knex.transaction(async (trx) => {
        const cart = await cartRepo.getActiveCartByUserId(userId, trx)
        if (!cart) throw new Error('Cart not found')

        await cartRepo.deleteItems(cart.id, itemIds, trx)
        const updated = await cartRepo.getActiveCartByUserId(userId, trx)
        return calculateCartTotals(updated)
    })
}


/**
 * Reset cart: remove all items
 * @param {number} userId 
 */
const resetCart = async (userId) => {
    return knex.transaction(async (trx) => {
        const cart = await cartRepo.getActiveCartByUserId(userId, trx)
        if (!cart) throw new Error('Cart not found')

        await cartRepo.resetCart(cart.id, trx)
        const updated = await cartRepo.getActiveCartByUserId(userId, trx)
        return calculateCartTotals(updated)
    })
}

module.exports = {
    getOrCreateCartByUserId,
    addProductToCart,
    updateCartItemQuantity,
    removeCartItem,
    removeCartItems,
    resetCart
}
