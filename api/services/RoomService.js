const Player = require('../models/Player');
const roomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    createRoom(room, film) {
        return KinogoParser.getMovieURL(film.url).then((url) => {
            room.player = new Player(url, film.name);
            
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