const addressService = require('../services/address-service')
const {success, error} = require('@utils/response')

const AddressController = {
    async list(req, res) {
        try {
            const userId = req.user?.id
            if (!userId) throw new Error('User ID is required!')
            
            const addresses = await addressService.listByUser(userId)
            
            return success(res, addresses)
        } catch (err) {
            return error(res, err.message)
        }
    },
    async update(req, res) {
        try {
            const userId = req.user?.id 
            if (!userId) throw new Error('User ID is required!')
            const id = req.params.id

            const udpated = await addressService.update(id, userId, req.body)
            return success(res, udpated)
        } catch (err) {
            return error(res, err.message)
        }
    },

    async create(req, res) {
        try {
            const userId = req.user?.id
            if (!userId) throw new Error('User ID is required!')
            
            const newAddress = await addressService.create(userId, req.body)
            return success(res, newAddress, 201)
        } catch (err) {
            return error(res, err.message)
        }
    },

    async remove(req, res) {
        try {
            const userId = req.user?.id 
            if (!userId) throw new Error('User ID is required!')
            const id = req.params.id
            await addressService.remove(id, userId)
            return success(res, null, 204)
        } catch (err) {
            return error(res, err.message)
        }
    }
}

module.exports = AddressController