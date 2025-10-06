const routes = require('./routes/product-routes')
const service = require('./services/product-service')
const repository = require('./repositories/product-repository')
const controller = require('./controllers/product-controller')
const validator = require('./validators/product-validators')

module.exports = {
    routes,
    service,
    repository,
    controller,
    validator
}