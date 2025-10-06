const knex = require('@config/knex')

const saveSession = (data, trx = knex) => 
    trx('user_sessions').insert(data)

const logLoginAttempt = async (attemptData) => 
    knex('login_attempts').insert(attemptData)

const deleteSessionsByUserId = (userId, trx = knex) => 
    trx('user_sessions').where({ user_id: userId }).del()

module.exports = {
    saveSession,
    logLoginAttempt,
    deleteSessionsByUserId
}