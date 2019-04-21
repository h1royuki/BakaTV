const UserRepository = require('../repository/UserRepository');
const RoomRepository = require('../repository/RoomRepository');

class UserService {


    async addUser(user, id, token) {
        await UserRepository.addUser(id, user);
        return await UserRepository.setUserToken(id, token);
    }

    async getUserToken(userId) {
        return await UserRepository.getUserToken(userId);
    }

    async getUser(userId) {
        return await UserRepository.getUser(userId);
    }

    async updateUser(user) {
        return await UserRepository.addUser(user);
    }

    async getRoomUsers(roomId) {
        const ownerId = await RoomRepository.getRoomOwner(roomId);
        const creatorId = await RoomRepository.getRoomCreator(roomId);
        const userIds = await RoomRepository.getRoomUsers(roomId);
        const users = await UserRepository.getUsers(userIds);

        if(users[ownerId]) {
            users[ownerId].owner = true; 
        }

        if(users[creatorId]) {
            users[creatorId].creator = true; 
        }
        return users;
    }

    async addUserToRoom(userId, roomId) {
        return await RoomRepository.addUserToRoom(roomId, userId);
    }

    async deleteUserFromRoom(userId, roomId) {
        return await RoomRepository.removeUserFromRoom(roomId, userId);
    }

    async getOnlineRoomUsersCount(roomId) {
        return await RoomRepository.getRoomUsersCount(roomId);
    }

    async getRandomRoomUser(roomId) {
        return await RoomRepository.getRandomUserFromRoom(roomId);
    }

    async isUserJoinedToRoom(roomId, userId) {
        return await RoomRepository.isOnRoom(roomId, userId);
    }

    async updateSocketId(userId, socketId) {
        return await UserRepository.setUserSocketId(userId, socketId);
    }

    async getSocketId(userId) {
        return await UserRepository.getUserSocketId(userId);
    }

    async getUserRooms(userId) {
        return await UserRepository.getUserRooms(userId);
    }

    async removeUserRoom(userId, roomId) {
        return await UserRepository.removeUserRoom(userId, roomId);
    }
}

module.exports = new UserService(); 