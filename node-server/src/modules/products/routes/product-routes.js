const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('@middlewares/auth')
const productController = require('../controllers/product-controller')

// -------------------------
// Public routes
// -------------------------

// List all products (supports filters, pagination, cursor/offset)
router.get('/', productController.listProducts)

// Search Product by Slug
router.get('/:slug', productController.searchProductBySlug)
// router.get('/:slug', productController.findBySlug)

// Get products by category
router.get('/category/:categoryId', productController.listProductsByCategory)

// Get products by collection
router.get('/collection/:collectionId', productController.listProductByCollection)

// -------------------------
// Protected routes (admin/staff only)
// -------------------------

// Create product
router.post(
  '/',
  authenticate,
  authorize(['admin', 'staff']),
  productController.createProduct
)

module.exports = router
