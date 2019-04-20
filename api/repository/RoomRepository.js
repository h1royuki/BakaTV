const redis = require('../modules/redis');

class RoomRepository {

    async setRoomOwner(roomId, ownerId) {
        return await redis.set(`room:${roomId}:owner`, JSON.stringify(ownerId));
    }

    async getRoomOwner(roomId) {
        const ownerId = await redis.get(`room:${roomId}:owner`);
        return JSON.parse(ownerId);
    }

    async removeRoomOwner(roomId) {
        return await redis.del(`room:${roomId}:owner`);
    }

    async getRoomUsers(roomId) {
        return await redis.smembers(`room:${roomId}:users`);
    }

    async addUserToRoom(roomId, userId) {
        return await redis.sadd(`room:${roomId}:users`, userId);
    }

    async removeUserFromRoom(roomId, userId) {
        return await redis.srem(`room:${roomId}:users`, userId);
    }

    async removeRoomUsers(roomId) {
        return await redis.del(`room:${roomId}:users`);
    }

    async getRoomUsersCount(roomId) {
        return await redis.scard(`room:${roomId}:users`);
    }

    async getRandomUserFromRoom(roomId) {
        return await redis.srandmember(`room:${roomId}:users`);
    }

    async getRoomKeys(roomId) {
        return await redis.keys(`room:${roomId}:*`);
    }

    async isOnRoom(roomId, userId) {
        return await redis.sismember(`room:${roomId}:users`, userId);
    }


}

module.exports = new RoomRepository();