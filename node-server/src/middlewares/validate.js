module.exports = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(422).json({
                success: false,
                message: 'Validation failed',
                errors: (error.details || []).map(e => e.message)
            })
        }

        req.validated = value
        next()
    }
}
