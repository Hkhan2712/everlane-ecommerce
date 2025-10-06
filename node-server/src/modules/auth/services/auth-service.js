const knex = require('@config/knex')
const userRepo = require('@modules/users/repositories/user-repository')
const authRepo = require('@modules/auth/repositories/auth-repository')
const utils = require('../utils/auth-utils')
const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '30m'
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d'

/**
 * LOGIN
 */
const login = async ({ email, password, ip, userAgent }) => {
    const user = await userRepo.findByEmail(email)
    if (!user) throw new Error('Invalid email or password')

    const isMatch = await utils.compareHash(password, user.password)
    if (!isMatch) throw new Error('Invalid email or password')

    const accessToken = utils.generateAccessToken({ user_id: user.id, role: user.role })
    const refreshToken = utils.generateRefreshToken({ user_id: user.id, role: user.role })

    // save session in DB
    await authRepo.saveSession({
        user_id: user.id,
        refresh_token: refreshToken,
        ip_address: ip,
        user_agent: userAgent,
        expires_at: dayjs().add(7, 'day').toDate()
    })

    return { user, accessToken, refreshToken }
}

/**
 * REGISTER
 */
const registerWithCookie = async ({ name, email, password, ip, userAgent }) => {
    const existingUser = await userRepo.findByEmail(email)
    if (existingUser) {
        const err = new Error('Email already exists')
        err.status = 400
        throw err
    }

    const { user, accessToken, refreshToken } = await knex.transaction(async trx => {
        const hashedPassword = await utils.hashString(password)
        const newUser = await userRepo.create({ name, email, password: hashedPassword, role: 'user' }, trx)

        const accessToken = utils.generateAccessToken({ user_id: newUser.id, role: newUser.role })
        const refreshToken = utils.generateRefreshToken({ user_id: newUser.id, role: newUser.role })

        await authRepo.saveSession({
            user_id: newUser.id,
            refresh_token: refreshToken,
            ip_address: ip,
            user_agent: userAgent,
            expires_at: dayjs().add(7, 'day').toDate()
        }, trx)

        return { user: newUser, accessToken, refreshToken }
    })

    const cookieOptions = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'Lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return { user, accessToken, refreshToken, cookieOptions }
}

/**
 * REFRESH ACCESS TOKEN
 */
const refreshAccessToken = async (refreshTokenFromClient) => {
    if (!refreshTokenFromClient) throw new Error('Refresh token required')

    const session = await knex('user_sessions')
        .where({ refresh_token: refreshTokenFromClient })
        .first()

    if (!session) throw new Error('Invalid refresh token')
    if (dayjs(session.expires_at).isBefore(dayjs())) throw new Error('Refresh token expired')

    let payload
    try {
        payload = jwt.verify(refreshTokenFromClient, process.env.JWT_REFRESH_SECRET)
    } catch {
        throw new Error('Invalid refresh token')
    }

    // generate new access token
    const accessToken = utils.generateAccessToken({ user_id: payload.user_id, role: payload.role })
    return { accessToken }
}

/**
 * LOGOUT
 */
const logout = async (refreshToken) => {
    if (!refreshToken) throw new Error('Refresh token required')

    await knex('user_sessions').where({ refresh_token: refreshToken }).del()
    return { message: 'Logged out successfully' }
}

module.exports = {
    login,
    registerWithCookie,
    refreshAccessToken,
    logout
}
