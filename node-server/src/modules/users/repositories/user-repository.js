const {createBaseRepository} = require('@modules/core/repository/base-repository')
const knex = require('@config/knex')

const base = createBaseRepository('users')

const getProfileByUserId = (userId, trx = knex) => 
    trx('users')
        .select('id', 'name', 'email', 'phone', 'avatar', 'role', 'status', 'created_at')
        .where({id: userId})
        .first()

const findByEmail = (email, trx = knex) =>
    trx('users').where({email}).first()

const listUsers = (trx = knex) => 
    trx('users').select('*')

const findAddressesByUserId = (userId, trx = knex) => {
    return trx('user_addresses')
        .select(
            'id',
            'user_id',
            'full_name',
            'phone',
            'province',
            'district',
            'ward',
            'address',
            'is_default',
            'created_at',
            'updated_at'
        )
        .where({ user_id: userId })
        .orderBy('is_default', 'desc')
}

const getOrdersByUserId = (userId, trx = knex) => 
    trx('orders')
        .select('id', 'status', 'total_amount', 'payment_method', 'created_at')
        .where({ user_id: userId})
        .orderBy('created_at', 'desc')

const updateProfile = (userId, data, trx = knex) => {
    return trx('users').where({ id: userId }).update(data)
}

module.exports = {
    ...base,
    getProfileByUserId,
    findByEmail,
    listUsers,
    findAddressesByUserId,
    getOrdersByUserId,
    updateProfile
}