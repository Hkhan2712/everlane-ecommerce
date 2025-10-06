const routes = require('./routes/user-routes')
const service = require('./services/user-service')
const repository = require('./repositories/user-repository')
const controller = require('./controllers/user-controller')
const validator = require('./validators/user-validators')

module.exports = {
    routes,
    service,
    repository,
    controller,
    validator
}
