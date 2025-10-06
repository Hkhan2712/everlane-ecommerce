const { createBaseController } = require('@modules/core/controller/base-controller');
const shopRepo = require('../repositories/shop-repository');

const baseController = createBaseController(shopRepo)

const listByCity = async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) return res.status(400).json({ success: false, message: 'City is required' });

        const stores = await shopRepo.listByCity(city);
        res.json({ success: true, data: stores });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const store = await shopRepo.findBySlug(slug);
        if (!store) return res.status(404).json({ success: false, message: 'Store not found' });

        res.json({ success: true, data: store });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const search = async (req, res) => {
    try {
        const { q } = req.query
        if (!q) return res.status(400).json({ success: false, message: 'Query is required' })

        const stores = await shopRepo.search(q)
        res.json({ success: true, data: stores })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const listByLimit = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 9
        const offset = parseInt(req.query.offset) || 0

        const stores = await shopRepo.listByLimit(limit, offset)

        const formattedStores = stores.map(store => {
            const address = store.address || ''
            const parts = address.split(',').map(p => p.trim())
        
            return {
                ...store,
                shortAddress: parts.slice(-2).join(', ')
            }
        })

        res.json({ success: true, data: formattedStores })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}


const nearBy = async (req, res) => {
    try {
        const { latitude, longitude, radius = 5 } = req.query
        if (!latitude || !longitude)
        return res.status(400).json({ success: false, message: 'Latitude and longitude are required' })

        const allStores = await shopRepo.listNearby(latitude, longitude, radius)
        
        res.json({ success: true, data: allStores });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = {
    ...baseController, // listAll, listByLimit, create, update, delete...
    listByCity,
    getBySlug,
    search,
    nearBy,
    listByLimit
}