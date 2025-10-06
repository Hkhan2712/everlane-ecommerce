const cartService = require('../services/cart-service')
const { success, error } = require('@utils/response')
const CartValidation = require('../validators/cart-validators')

const CartController = {
    getCart: async (req, res) => {
        try {
            const userId = CartValidation.getCart(req, res)
            if (!userId) return

            const cart = await cartService.getOrCreateCartByUserId(userId)
            success(res, cart)
        } catch (err) {
            console.error('getCart error:', err)
            res.status(500).json(error('Internal server error'))
        }
    },

    addItem: async (req, res) => {
        try {
            const validated = CartValidation.addItem(req, res)
            if (!validated) return

            const { userId, productId, quantity } = validated
            const cart = await cartService.addProductToCart(userId, productId, quantity)
            success(res, cart)
        } catch (err) {
            console.error('addItem error:', err)
            res.status(500).json(error(err.message || 'Internal server error'))
        }
    },

    updateItem: async (req, res) => {
        try {
            const validated = CartValidation.updateItem(req, res)
            if (!validated) return

            const { id, quantity, userId } = validated
            const cart = await cartService.updateCartItemQuantity(userId, id, quantity)
            success(res, cart)
        } catch (err) {
            console.error('updateItem error:', err)
            res.status(500).json(error(err.message || 'Internal server error'))
        }
    },


    removeItem: async (req, res) => {
        try {
             const userId = req.user?.id  
            if (!userId) return res.status(401).json(error('Unauthorized: User ID not found'))
            const cartItemId = CartValidation.removeItem(req, res)
            if (!cartItemId) return

            const cart = await cartService.removeCartItem(userId, cartItemId)
            success(res, cart)
        } catch (err) {
            console.error('removeItem error:', err)
            res.status(500).json(error(err.message || 'Internal server error'))
        }
    },

    removeItems: async (req, res) => {
        try {
            const validated = CartValidation.removeItems(req, res)
            if (!validated) return

            const { cid, itemIds } = validated
            const cart = await cartService.removeCartItems(cid, itemIds)
            success(res, cart)
        } catch (err) {
            console.error('removeItems error:', err)
            res.status(500).json(error(err.message || 'Internal server error'))
        }
    },

    resetCart: async (req, res) => {
        try {
            const cid = CartValidation.resetCart(req, res)
            if (!cid) return

            const cart = await cartService.resetCart(cid)
            success(res, cart)
        } catch (err) {
            console.error('resetCart error:', err)
            res.status(500).json(error(err.message || 'Internal server error'))
        }
    }
}

module.exports = CartController