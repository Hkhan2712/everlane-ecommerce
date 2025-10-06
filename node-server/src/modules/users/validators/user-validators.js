const Joi = require('joi')

const updateProfileSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    avatar: Joi.string().uri(),
    address: Joi.string().max(255),
    password: Joi.string().min(8).max(128)
})

module.exports = {
    updateProfileSchema
}