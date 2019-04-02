const roomRepository = require('../repository/RoomRepository');

class PlayerService {

    getPlayerInfo(roomId) {
        const room = roomRepository.getRoom(roomId);
        return room.player;
    }

    updatePlayerStatus(roomId, status) {
        const room = roomRepository.getRoom(roomId);
        room.player.status = status;
        roomRepository.updateRoom(room);
    }

    updatePlayerTime(roomId, time) {
        const room = roomRepository.getRoom(roomId);
        room.player.time = time;
        roomRepository.updateRoom(room);
    }

}

module.exports = new PlayerService();