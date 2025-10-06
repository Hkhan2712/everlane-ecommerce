const routes = require('./routes/category-routes')
const repository = require('./repositories/category-repository')
const controller = require('./controllers/category-controller')
// const validator = require('./validators/category-validators')

module.exports = {
    routes,
    repository,
    controller,
    // validator
}
