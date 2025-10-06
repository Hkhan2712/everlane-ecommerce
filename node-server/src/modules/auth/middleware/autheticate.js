const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({ success: false, message: 'Missing authorization header' })

    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ success: false, message: 'Missing access token' })

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}

module.exports = { authenticate }
