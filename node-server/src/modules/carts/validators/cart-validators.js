const {error} = require('@utils/response')

const CartValidation = {
    getCart: (req, res) => {
        const userId = req.user?.id
        if (!userId) return res.status(401).json(error('Unauthorized: User ID not found'))
        return userId
    },
    addItem: (req, res) => {
        const userId = req.user?.id   // Lấy từ token
        if (!userId) return res.status(401).json(error('Unauthorized: User ID not found'))

        const { productId, quantity } = req.body

        if (!productId) return res.status(400).json(error('productId is required'))
        if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
            return res.status(400).json(error('Quantity must be a positive number'))
        }

        return { userId, productId, quantity: quantity || 1 }
    },


    updateItem: (req, res) => {
        const { cartItemId } = req.params
        const id = Number(cartItemId)
        if (isNaN(id)) return res.status(400).json(error('cartItemId must be a number'))

        const { quantity } = req.body
        if (quantity === undefined) return res.status(400).json(error('Quantity is required'))
        if (typeof quantity !== 'number' || quantity < 0) {
            return res.status(400).json(error('Quantity must be a non-negative number'))
        }

        const userId = req.user?.id
        if (!userId) return res.status(401).json(error('Unauthorized: User ID not found'))

        return { id, quantity, userId }
    },


    removeItem: (req, res) => {
        const { cartItemId } = req.params
        const id = Number(cartItemId)
        if (isNaN(id)) return res.status(400).json(error('cartItemId must be a number'))
        return id
    },

    removeItems: (req, res) => {
        const { itemIds } = req.body
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json(error('itemIds must be a non-empty array'))
        }
        return { itemIds }
    },

    resetCart: (req, res) => {
        const userId = req.user?.id
        if (!userId) return res.status(401).json(error('Unauthorized: User ID not found'))
        return userId
    }
}

module.exports = CartValidation