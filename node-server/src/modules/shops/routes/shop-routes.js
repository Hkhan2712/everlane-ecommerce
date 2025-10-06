const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('@middlewares/auth')
const shopController = require('../controllers/shop-controller')

router.get('/', shopController.listAll)
router.get('/limit', shopController.listByLimit)
router.get('/city', shopController.listByCity)
router.get('/nearby', shopController.nearBy)
router.get('/search', shopController.search)
router.get('/:slug', shopController.getBySlug)

module.exports = router