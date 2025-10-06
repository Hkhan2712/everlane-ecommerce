const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '30m'
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d'

const hashString = async (string) => 
    bcrypt.hash(string, SALT_ROUNDS)

const compareHash = async (string, hash) => 
    bcrypt.compare(string, hash)

const generateAccessToken = (payload) => 
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL})

const generateRefreshToken = (payload) => 
    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_TTL})

const verifyToken = (token, type = 'access') => {
    const secret = type === 'refresh' ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET
    return jwt.verify(token, secret);
}
module.exports = {
    hashString,
    compareHash,
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}
