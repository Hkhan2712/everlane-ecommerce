const knex = require('@config/knex');
const { createBaseRepository } = require('@modules/core/repository/base-repository');

const base = createBaseRepository('stores');

const ShopRepository = {
    ...base,

    listByLimit: (limit = 9, offset = 0, trx = knex) =>
        trx('stores')
        .select('id', 'name', 'slug', 'city', 'address', 'thumbnail', 'status')
        .where({ status: 1 })
        .limit(limit)
        .offset(offset),

    listByCity: (city, trx = knex) =>
        trx('stores')
        .select('*')
        .where({ city, status: 1 }),

    findBySlug: (slug, trx = knex) =>
        trx('stores')
        .where({ slug, status: 1 })
        .first(),

    listNearby: async (latitude, longitude, radiusKm = 5, trx = knex) => {
        const earthRadiusKm = 6371
    
        return trx('stores')
            .select(
                'id',
                'name',
                'slug',
                'country',
                'address',
                'city',
                'latitude',
                'longitude',
                'opening_hours',
                'thumbnail',
                'status',
                trx.raw(
                    `(${earthRadiusKm} * acos(
                        cos(radians(?)) * cos(radians(latitude)) *
                        cos(radians(longitude) - radians(?)) +
                        sin(radians(?)) * sin(radians(latitude))
                    )) as distance`,
                    [latitude, longitude, latitude]
                )
            )
            .where('status', 1)
            .having('distance', '<=', radiusKm)
            .orderBy('distance', 'asc');
    },

    search: (keyword, trx = knex) =>
        trx('stores')
        .select('*')
        .where('status', 1)
        .andWhere((qb) => {
            qb.where('name', 'like', `%${keyword}%`).orWhere('city', 'like', `%${keyword}%`);
        })
        .orderBy('name'),

    countAll: (trx = knex) =>
        trx('stores').count('id as total').first(),
}

module.exports = ShopRepository
