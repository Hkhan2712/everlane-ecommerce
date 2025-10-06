const express = require('express')
const router = express.Router()
const {authenticate} = require('@middlewares/auth')
const controller = require('../controllers/address-controller')

router.get('/', authenticate, controller.list)
router.post('/', authenticate, controller.create)
router.put('/:id', authenticate, controller.update)
router.delete('/:id', authenticate, controller.remove)

module.exports = router