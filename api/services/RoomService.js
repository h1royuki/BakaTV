const roomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    createRoom(room, filmURL) {
        return KinogoParser.getMovieURL(filmURL).then((url) => {
            room.url = url;
            roomRepository.addRoom(room);
        }).catch((err) => {
            throw new Error('Error create room');
        })
    }

    getRoomState(socketId, roomId) {
        return roomRepository
            .getRoom(roomId)
            .toJson(socketId);
    }

    getPlayerState(roomId) {
        const room = roomRepository.getRoom(roomId);
        const state = {};

        state.status = room.status;
        state.time = room.time;

        return state;
    }

    updatePlayerStatus(roomId, status) {
        const room = roomRepository.getRoom(roomId);
        room.status = status;
        roomRepository.updateRoom(room);
    }

    updatePlayerTime(roomId, time) {
        const room = roomRepository.getRoom(roomId);
        room.time = time;
        roomRepository.updateRoom(room);
    }

    getOwner(roomId) {
        return roomRepository
            .getRoom(roomId)
            .ownerId;
    }

    isRoomOwner(socketId, roomId) {
        const room = roomRepository.getRoom(roomId);

        return socketId == room.ownerId;
    }

    setRoomOwner(socketId, roomId) {
        const room = roomRepository.getRoom(roomId);
        room.ownerId = socketId;
        roomRepository.updateRoom(room);
    }

    destroyRoom(roomId) {
        roomRepository.removeRoom(roomId);
    }

    addRoomTimeout(roomId, type, timeout) {
        const room = roomRepository.getRoom(roomId);
        room.timeouts[type] = timeout;
        roomRepository.updateRoom(room);
    }

    removeRoomTimeout(roomId, type) {
        const room = roomRepository.getRoom(roomId);
        clearTimeout(room.timeouts[type]);
        delete room.timeouts[type];
        roomRepository.updateRoom(room);
    }
}

module.exports = new RoomService();