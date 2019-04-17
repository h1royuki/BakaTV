const redis = require('../modules/redis');

class RoomRepository {

    async addRoom(room) {
        return await this.updateRoom(room);
    }
    
    async getRoom(id) {
        const room =  await redis.get(`room:${id}`);

        if(!room) {
            throw new Error('Room not found');
        }
        return JSON.parse(room);
    }

    async updateRoom(room) {
        return await redis.set(`room:${room.id}`, JSON.stringify(room));
    }
    
    async deleteRoom(roomId) {
       return await redis.del(`room:${roomId}`);
    }

}

module.exports = new RoomRepository();