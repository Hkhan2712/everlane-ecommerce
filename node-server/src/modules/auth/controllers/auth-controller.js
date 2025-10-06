const authService = require('../services/auth-service')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const { user, accessToken, refreshToken } = await authService.login({
            email,
            password,
            ip: req.ip,
            userAgent: req.headers['user-agent'] || 'Unknown'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken
            }
        })
    } catch (err) {
        res.status(401).json({ success: false, message: err.message })
    }
}

const register = async (req, res) => {
    try {
        const { user, accessToken, refreshToken, cookieOptions } = await authService.registerWithCookie({
            ...req.body,
            ip: req.ip,
            userAgent: req.headers['user-agent'] || 'Unknown'
        })

        res.cookie('refreshToken', refreshToken, cookieOptions)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { id: user.id, name: user.name, email: user.email, accessToken }
        })
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message })
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        
        const { accessToken } = await authService.refreshAccessToken(refreshToken)
        res.json({ success: true, accessToken })
    } catch (err) {
        res.status(401).json({ success: false, message: err.message })
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        await authService.logout(refreshToken)
        res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' })
        res.json({ success: true, message: 'Logged out successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const changePassword = async (req, res) => {
    try {

    } catch (err) {

    }
}

module.exports = { login, register, refreshToken, logout, changePassword}
