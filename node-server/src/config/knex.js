const knexLib = require('knex')
const knexFile = require('./knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = knexLib(knexFile[env])

knex.on('query', (q) => {
    console.log('[SQL]', q.sql, q.bindings)
})

knex.on('query-error', (err, obj) => {
    console.error('[SQL ERROR]', err.message, 'on', obj.sql)
})

module.exports = knex