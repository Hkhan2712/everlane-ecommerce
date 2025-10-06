const joi = require('joi')

const registerSchema = joi.object({
    name: joi.string().min(3).max(50).trim().required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string()
        .min(8)
        .max(128)
        .pattern(/[A-Z]/, 'uppercase')
        .pattern(/[a-z]/, 'lowercase')
        .pattern(/[0-9]/, 'number')
        .pattern(/[@$!%*?&]/, 'special character')
        .required(),
    ip: joi.string().ip({ version: ['ipv4', 'ipv6'] }).required(),
    userAgent: joi.string().max(500).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required()
}) 

const changePasswordSchema = joi.object({
    currentPassword: joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Current password must be at least 6 characters long',
            'string.empty': 'Current password is required',
            'any.required': 'Current password is required'
        }),

    newPassword: joi.string()
        .min(8)
        .max(128)
        .pattern(/[A-Z]/, 'uppercase')
        .pattern(/[a-z]/, 'lowercase')
        .pattern(/[0-9]/, 'number')
        .pattern(/[@$!%*?&]/, 'special character')
        .disallow(joi.ref('currentPassword')) // must not be the same as current password
        .required()
        .messages({
            'string.min': 'New password must be at least 8 characters long',
            'string.max': 'New password must not exceed 128 characters',
            'string.pattern.name': 'New password must contain at least one {#name} character',
            'any.required': 'New password is required',
            'any.invalid': 'New password must be different from the current password'
        })
});

module.exports = {
    registerSchema,
    loginSchema,
    changePasswordSchema
}
