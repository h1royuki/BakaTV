const redis = require('../modules/redis');

class UserRepository {
    async removeUser(userId) {
        return await redis.del(`user:${userId}`);
    }

    async addUser(id, user) {
        return await redis.set(`user:${id}`, JSON.stringify(user));
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
        const users = {};

        for (let i = 0; i < userIds.length; i++) {
           users[userIds[i]] = await this.getUser(userIds[i]);
        }
        return users;
    }

    async setUserSocketId(userId, socketId) {
        return await redis.set(`user:${userId}:socket`, socketId);
    }

    async getUserSocketId(userId) {
        return await redis.get(`user:${userId}:socket`);
    }

    async addUserRoom(userId, roomId) {
        return await redis.sadd(`user:${userId}:rooms`, roomId)
    }

    async getUserRooms(userId) {
        return await redis.smembers(`user:${userId}:rooms`);
    }

    async removeUserRoom(userId, roomId) {
        return await redis.srem(`user:${userId}:rooms`, roomId);
    }
}

module.exports = new UserRepository();