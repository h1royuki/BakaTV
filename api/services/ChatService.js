const roomRepository = require('../repository/RoomRepository');

class ChatService {

    getChatUsers(roomId) {
        const room = roomRepository.getRoom(roomId);
        return room.users;
    }

    addUserToChat(user, roomId) {
        const room = roomRepository.getRoom(roomId);
        room.users[user.id] = user;
        roomRepository.updateRoom(room);
    }

    getUserFromChat(userId, roomId) {
        const room = roomRepository.getRoom(roomId);
        return room.users[userId];
    }

    deleteUserFromChat(userId, roomId) {
        const room = roomRepository.getRoom(roomId);
        delete room.users[userId];
        roomRepository.updateRoom(room);
    }

    getOnlineUsersCount(userId, roomId) {
        const room = roomRepository.getRoom(roomId);
        return room.users.online;
    }
}

module.exports = new ChatService();