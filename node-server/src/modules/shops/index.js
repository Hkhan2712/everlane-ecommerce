const routes = require('./routes/shop-routes')
// const service = require('./services/product-service')
const repository = require('./repositories/shop-repository')
const controller = require('./controllers/shop-controller')
// const validator = require('./validators/product-validators')

module.exports = {
    routes,
    // service,
    repository,
    controller,
    // validator
}
