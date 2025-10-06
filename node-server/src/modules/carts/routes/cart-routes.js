const express = require('express')
const CartController = require('../controllers/cart-controller')
const { authenticate } = require('@middlewares/auth')
const validate = require('@middlewares/validate')
const Joi = require('joi')

const router = express.Router()

// ------------------------------
// Validation Schemas
// ------------------------------
const addItemSchema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().integer().min(1).default(1)
})

const updateItemSchema = Joi.object({
    quantity: Joi.number().integer().min(0).required()
})

const removeItemsSchema = Joi.object({
    cartId: Joi.number().required(),
    itemIds: Joi.array().items(Joi.number().required()).min(1).required()
})

// ------------------------------
// Cart Routes
// ------------------------------

// Get active cart (or create new if not exist)
router.get('/', authenticate, CartController.getCart)

// Add product to cart
router.post('/items', authenticate, validate(addItemSchema), CartController.addItem)

// Update item quantity
router.patch('/items/:cartItemId', authenticate, validate(updateItemSchema), CartController.updateItem)

// Remove one item
router.delete('/items/:cartItemId', authenticate, CartController.removeItem)

// Remove multiple items
router.delete('/items', authenticate, validate(removeItemsSchema), CartController.removeItems)

// Reset entire cart
router.delete('/reset/:cartId', authenticate, CartController.resetCart)

module.exports = router
