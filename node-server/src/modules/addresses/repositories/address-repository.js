const {createBaseRepository} = require('@modules/core/repository/base-repository')
const knex = require('@config/knex')

const base = createBaseRepository('user_addresses')

module.exports = {
    ...base,
}