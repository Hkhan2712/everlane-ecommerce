const success = (res, data, meta = {}) => 
    res.json({success: true, data, meta})

// const error = (res, message, status=500) => 
//     res.status(status).json({success: false, message})
const error = (message) => 
    ({ success: false, message})
module.exports = {success, error}