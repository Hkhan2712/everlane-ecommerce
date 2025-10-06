const express = require('express')
const router = express.Router()
const { authenticate, authorize} = require('@middlewares/auth')
const userController = require('../controllers/user-controller')


router.get('/', authenticate, authorize(['admin']), userController.listUsers)
router.get('/profile', authenticate, userController.getProfile)
router.post('/profile', authenticate, userController.updateProfile)
router.get('/addresses', authenticate, userController.getAddresses)

module.exports = router