const addressRepo = require('../repositories/address-repository')

const addressService = {

    async listByUser(userId) {
        return addressRepo.findAll(
            { user_id: userId }, 
            { orderBy: [['is_default', 'desc'], ['created_at', 'desc']]}
        )
    },

    async getById(id, userId) {
        return addressRepo.findOne({ id, user_id: userId })
    },

    async create(userId, data) {
        if (data.is_default === true) {
            await addressRepo.updateByFilter({user_id: userId, is_default: 1}, {is_default: 0})
        }
        return addressRepo.create({ ...data, user_id: userId })
    },

    async update(id, userId, data) {
        const existing = await addressRepo.findById(id)
        if (!existing || existing.user_id !== userId) {
            throw new Error('Not found or unauthorized')
        }
        if (data.is_default === true) {
            await addressRepo.updateByFilter({user_id: userId, is_default: 1}, {is_default: 0})
        }
        return addressRepo.update(id, data)
    },

    async remove(id, userId) {
        const existing = await addressRepo.findById(id)
        if (!existing || existing.user_id !== userId) {
            throw new Error('Not found or unauthorized')
        }
        return addressRepo.delete(id)
    }
}

module.exports = addressService