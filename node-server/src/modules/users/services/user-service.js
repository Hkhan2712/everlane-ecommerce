const userRepo = require('../repositories/user-repository')

const getProfile = async (userId) => {
    const user = await userRepo.getProfileByUserId(userId)
    if (!user) throw new Error('User not found')
    return user
}

const updateProfile = async (userId, data) => {
    await userRepo.update(userId, data)
    return {
        message: 'Profile updated successfully'
    }
}

const listUsers = async () => 
    userRepo.listUsers()

const getAddresses = async(userId) => {
    const userAddresses = await userRepo.findAddressesByUserId(userId)
    if (!userAddresses) throw new Error('User not found')
    return userAddresses
}

module.exports = {
    getProfile,
    updateProfile,
    listUsers,
    getAddresses
}