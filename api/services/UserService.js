const UserRepository = require('../repository/UserRepository');
const RoomRepository = require('../repository/RoomRepository');

class UserService {


    async addUser(user, token) {
        await UserRepository.addUser(user);
        return await UserRepository.setUserToken(user.id, token);
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
        const userIds = await RoomRepository.getRoomUsers(roomId);
        const users = await UserRepository.getUsers(userIds);
        return Object.assign({}, users);
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
}

module.exports = new UserService(); 