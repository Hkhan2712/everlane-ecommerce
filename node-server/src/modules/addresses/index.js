const routes = require('./routes/address-routes')
const controller = require('./controllers/address-controller')
const service = require('./services/address-service')
const repository = require('./repositories/address-repository')

module.exports = {
    routes,
    controller,
    service, 
    repository
}