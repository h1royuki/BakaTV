const roomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    startStream(room, filmURL) {
        return KinogoParser.getMovieURL(filmURL).then((url) => {
            room.url = url;
            roomRepository.addRoom(room);
        }).catch((err) => {
            throw new Error('Error start stream');
        })
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
}

module.exports = new RoomService();