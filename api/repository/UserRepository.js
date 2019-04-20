const redis = require('../modules/redis');

class UserRepository {
    async removeUser(userId) {
        return await redis.del(`user:${userId}`);
    }

    async addUser(user) {
        return await redis.set(`user:${user.id}`, JSON.stringify(user));
    }

    async setUserToken(userId, token) {
        return await redis.set(`user:${userId}:token`, token);
    }

    async getUserToken(userId) {
        return await redis.get(`user:${userId}:token`);
    }

    async getUser(userId) {
        const user = await redis.get(`user:${userId}`);

        if (!user) {
            throw new Error('User not found');
        }
        return JSON.parse(user);
    }

    async getUsers(userIds) {
        const users = [];
        for (let i = 0; i < userIds.length; i++) {
            users.push(await this.getUser(userIds[i]));
        }

        return users;
    }
}

module.exports = new UserRepository();