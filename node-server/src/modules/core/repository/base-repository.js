const knex = require('@config/knex')

const createBaseRepository = (table) => ({
    count: (filter = null, trx = knex) => {
        let query = trx(table).count({ total: 1 })
        if (filter && Object.keys(filter).length > 0) {
            query = query.where(filter)
        }
        return query.first()
    },

    findById: (id, trx = knex) => trx(table).where({id}).first(),
    
    findAll: (where = {}, options = {}, trx = knex) => {
        let query = trx(table).where(where).select('*')
        if (options.orderBy) 
            options.orderBy.forEach(([col, dir]) => query = query.orderBy(col, dir))
        return query
    },
    
    findOne: (where = {}, trx = knex) => {
        return trx(table).where(where).first()
    },
    
    create: async (data, trx = knex) => {
        const [id] = await trx(table).insert(data)
        return trx(table).where({id}).first()
    },
    
    update: async (id, data, trx = knex) =>  {
        await trx(table).where({id}).update({...data, updated_at: knex.fn.now()})
        return trx(table).where({id}).first()
    },

    updateByFilter: (where = {}, data, trx = knex) => {
        return trx(table).where(where).update({...data, updated_at: knex.fn.now()})
    },
    
    delete: (id, trx = knex) => trx(table).where({id}).del(),
    
    listAll: (trx = knex) => trx(table).select('*'),
    
    listByFilter: (filter, trx = knex) => trx(table).where(filter),

})

module.exports = {createBaseRepository}