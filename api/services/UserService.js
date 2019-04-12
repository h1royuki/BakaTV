const roomRepository = require('../repository/RoomRepository');

class UserService {

    getRoomUsers(roomId) {
        const room = roomRepository.getRoom(roomId);
        return room.users;
    }

    addUserToRoom(user, roomId) {
        const room = roomRepository.getRoom(roomId);
        room.users[user.id] = user;
        roomRepository.updateRoom(room);
    }

    getUserFromRoom(userId, roomId) {
        const room = roomRepository.getRoom(roomId);
        return room.users[userId];
    }

    deleteUserFromRoom(userId, roomId) {
        const room = roomRepository.getRoom(roomId);
        delete room.users[userId];
        roomRepository.updateRoom(room);
    }

    getOnlineUsersCount(roomId) {
        const room = roomRepository.getRoom(roomId);
        return Object.keys(room.users).length;
    }

    getFirstRoomUser(roomId) {
        const room = roomRepository.getRoom(roomId);
        console.log(room.users[Object.keys(room.users)[0]].id);
        return room.users[Object.keys(room.users)[0]].id;
    }
}

module.exports = new UserService();