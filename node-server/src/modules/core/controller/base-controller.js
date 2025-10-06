/** @module/core/controller/base-controller.js */

const createBaseController = (repo) => ({
    listAll: async (req, res) => {
        try {
            const data = await repo.listAll()
            res.json({success: true, data})
        } catch (err) {
            res.status(500).json({success: false, messaage: err.messaage})
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await repo.findById(id);
            if (!item) return res.status(404).json({ success: false, message: 'Not found' });
            res.json({ success: true, data: item });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const newItem = await repo.create(req.body);
            res.status(201).json({ success: true, data: newItem });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            await repo.update(id, req.body);
            const updatedItem = await repo.findById(id);
            res.json({ success: true, data: updatedItem });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await repo.delete(id);
            res.json({ success: true, message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    countItems: async (req, res) => {
        try {
            const filter = req.query || {}
            const result = await repo.count(filter)
            res.json({ success: true, length: result.total})
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },
})

module.exports = {createBaseController}