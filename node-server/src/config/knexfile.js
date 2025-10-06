require('dotenv').config({path: require('path').resolve(__dirname, '../../.env')})

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 3306,
            database: process.env.DB_NAME || 'everlane_db',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
        },
        migrations: {
            directory: __dirname + '/../database/migrations'
        },
        seeds: {
            directory: __dirname + '/../database/seeds'
        },
        factories: {
            directory: __dirname + '/../database/factories'
        }
    }
}