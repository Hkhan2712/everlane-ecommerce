const routes = require('./routes/auth-routes')
const service = require('./services/auth-service')
const repository = require('./repositories/auth-repository')
const controller = require('./controllers/auth-controller')
const validator = require('./validators/auth-validators')

module.exports = {
    routes,
    service,
    repository,
    controller,
    validator
}
