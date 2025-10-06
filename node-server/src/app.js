require('dotenv').config()
require('module-alias/register')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParse = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler')

const authModule = require('@modules/auth')
const userModule = require('@modules/users')
const categoryModule = require('@modules/categories')
const productModule = require('@modules/products')
const shopModule = require('@modules/shops') 
const cartModule = require('@modules/carts')
const addressModule = require('@modules/addresses')

const app = express()

// CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174'
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))
app.use(cookieParse())
app.use(morgan('dev'))
app.use(express.json())
app.use(errorHandler)

// API
app.use('/api/auth', authModule.routes)
app.use('/api/users', userModule.routes)
app.use('/api/categories', categoryModule.routes)
app.use('/api/products', productModule.routes)
app.use('/api/stores', shopModule.routes)
app.use('/api/cart', cartModule.routes)
app.use('/api/address', addressModule.routes)

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app