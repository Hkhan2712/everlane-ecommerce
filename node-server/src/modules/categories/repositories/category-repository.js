const knex = require('@config/knex')
const {createBaseRepository} = require('@modules/core/repository/base-repository')

const base = createBaseRepository('categories')

const listCategories = async ({limit = 6, orderBy = 'created_at', direction = 'desc'}, trx = knex) => 
    trx('categories')
        .select('id', 'name', 'thumbnail')
        .where({status : 1})
        .orderBy(orderBy, direction)
        .limit(limit)

module.exports = {
    ...base,
    listCategories,
}