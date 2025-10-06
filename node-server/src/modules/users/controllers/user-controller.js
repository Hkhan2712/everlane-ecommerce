const {createBaseController} = require('@modules/core/controller/base-controller')
const userService = require('../services/user-service')
const userRepo = require('../repositories/user-repository')
const { updateProfileSchema} = require('../validators/user-validators')

const baseController = createBaseController(userRepo)

const getProfile = async (req, res) => {    
    try {
        const userId = req.user?.id
        if (!userId) throw new Error("Login required")
        const user = await userService.getProfile(userId)    
        res.json({success: true, data: user})
    } catch (err) {
        res.status(404).json({success: false, message: err.message})
    }
}

const updateProfile = async (req, res) => {
    try {
        const value = await updateProfileSchema.validateAsync(req.body, {abortEarly: false})

        const result = await userService.updateProfile(req.user.user_id, value)
        res.json({ success: true, message: result.message})
    } catch (err) {
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: err.details.map(e => e.message)
        })
    }
}

const listUsers = async (req, res) => {
    try {
        const user = await userService.listUsers()
        res.json({success: true, data: user})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) throw new Error("User ID is required")
        const userAddress = await userService.getAddresses(userId)
        res.json({success: true, data: userAddress})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = {
    ...baseController,
    getProfile,
    updateProfile,
    listUsers,
    getAddresses
}