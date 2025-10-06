const errorHandler = (err, req, res, next) => {
    console.error(err)
    
    // DATABASE ERROR
    if (err.code === 'ECONNREFUSED' || err.code === 'ER_ACCESS_DENIED_ERROR')
        return res.status(500).json({error: 'Database connection failed'})

    // TIMEOUT / DEADLOCK ERROR
    if (err.code === 'PROTOCOL_SEQUENCE_TIMEOUT' || err.code === 'ER_LOCK_DEADLOCK')
        return res.status(500).json({error: 'Database query timeout or deadlock'})

    // CUSTOM ERROR FROM SERVICE
    if (err.isCustomError) 
        return res.status(err.status || 400).json({error: err.message})

    // FALLBACK: UNDEFINED ERROR
    res.status(500).json({error: 'Internal server error'})   
}

module.exports = errorHandler