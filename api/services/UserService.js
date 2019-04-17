const UserRepository = require('../repository/UserRepository');

class UserService {

    async getRoomUsers(roomId) {
        const users = await UserRepository.getUsers(roomId);
        const object =  this.convertUsersToObject(users);

        return Object.assign({}, object);
    }

    async addUserToRoom(user, roomId) {
       return await UserRepository.addUser(roomId, user);
    }

    async getUserFromRoom(userId, roomId) {
        return await UserRepository.getUser(roomId, userId);
    }

    async deleteUserFromRoom(userId, roomId) {
        return await UserRepository.removeUser(roomId, userId);
    }

    async getOnlineUsersCount(roomId) {
       return await UserRepository.getUsersCount(roomId);
    }

    async removeUsers(roomId) {
        return await UserRepository.removeUsers(roomId);
    }

    async getNextRoomUser(userId, roomId) {
        const users = await UserRepository.getUsersAfter(roomId, userId);

        console.log(users);
        if(users[0]) {
            return JSON.parse(users[0]);
        }
    }

    convertUsersToObject(users) {
        for (let i = 0; i < users.length; i++) {
            users[i] = JSON.parse(users[i]);
        }
        return users;
    }
}

module.exports = new UserService();