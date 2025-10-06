const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')
const validate = require('@middlewares/validate')
const { registerSchema, loginSchema } = require('../validators/auth-validators')
const authRateLimiter = require('../middleware/rate-limit')
const { authenticate } = require('../../../middlewares/auth')

router.post('/sign-up', authRateLimiter, validate(registerSchema), authController.register)
router.post('/sign-in', authRateLimiter, validate(loginSchema), authController.login)
router.post('/sign-out', authController.logout)
router.post('/refresh-token', authController.refreshToken)

// Change password
router.post('/change-password', authenticate, authController.changePassword)

module.exports = router
