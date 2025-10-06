const {createBaseController} = require('@modules/core/controller/base-controller')
const categoryRepo = require('../repositories/category-repository')

const baseController = createBaseController(categoryRepo)

const listCategories = async (req, res) => {
    try {
        const { limit, orderBy, direction } = req.query

        const categories = await categoryRepo.listCategories({
            limit: parseInt(limit) || 6,
            orderBy: orderBy || 'created_at',
            direction: direction || 'desc'
        })

        res.json({
            success: true,
            data: categories
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
} 

module.exports = {
    ...baseController,
    listCategories,
}