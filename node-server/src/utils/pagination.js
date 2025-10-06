/**
 * Convert query params to pagination options
 */
const getPagination = (query) => {
    const page = parseInt(query.page) > 0 ? parseInt(query.page) : 1
    const limit = parseInt(query.limit) > 0 ? parseInt(query.limit) : 12
    const offset = (page - 1) * limit
    const orderBy = query.orderBy || 'created_at'
    const direction = query.direction === 'asc' ? 'asc' : 'desc'

    return {page, limit, offset, orderBy, direction}
}

module.exports = {getPagination}