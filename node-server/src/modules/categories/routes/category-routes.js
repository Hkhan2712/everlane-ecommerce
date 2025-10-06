const express = require('express')
const router = express.Router()
const { authenticate, authorize} = require('@middlewares/auth')
const categoryController = require('../controllers/category-controller')

router.get('/', categoryController.listCategories)
router.get('/all', categoryController.listAll)
router.get('/:id', categoryController.getById)
router.post('/',authenticate, authorize(['admin', 'staff']), categoryController.create)
router.put('/:id', authenticate, authorize(['admin', 'staff']), categoryController.update)
router.delete('/:id', authenticate, authorize(['admin', 'staff']), categoryController.delete)

module.exports = router