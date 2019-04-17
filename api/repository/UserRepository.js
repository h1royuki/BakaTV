const redis = require('../modules/redis');

class UserRepository {

    async getUsers(roomId) {
        return await redis.zrange(`users:${roomId}`, 0, -1);
    }

    async removeUsers(roomId) {
        return await redis.del(`users:${roomId}`);
    }

    async addUser(roomId, user) {
        return await redis.zadd(`users:${roomId}`, user.id, JSON.stringify(user));
    }

    async getUser(roomId, userId) {
        const item = await redis.zrangebyscore(`users:${roomId}`, userId, userId);
        return JSON.parse(item);
    }

    async removeUser(roomId, userId) {
        return await redis.zremrangebyscore(`users:${roomId}`, userId, userId);
    }

    async getUsersCount(roomId) {
        return await redis.zcount(`users:${roomId}`, `-inf`, `+inf`);
    }

    async getUsersAfter(roomId, userId) {
        return await redis.zrangebyscore(`users:${roomId}`, `(${userId}`, `+inf`);
    }
}

module.exports = new UserRepository();