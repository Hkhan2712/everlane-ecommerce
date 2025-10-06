require('module-alias/register')
require('dotenv').config();
const userRepo = require('@modules/users/repositories/user-repository');
const knex = require('@config/knex');

(async () => {
    try {
        // 1. Test createUser
        const newUser = await userRepo.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        });
        console.log('User created:', newUser);

        // 2. Test findByEmail
        const foundUser = await userRepo.findByEmail('test@example.com');
        console.log('User found:', foundUser);
    } catch (error) {
        console.error(error);
    } finally {
        // Đóng kết nối Knex khi test xong
        await knex.destroy();
    }
})();