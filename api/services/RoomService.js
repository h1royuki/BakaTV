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

    getRoomState(socketId, roomId) {
        return roomRepository
            .getRoom(roomId)
            .toJson(socketId);
    }

    getStreamState(roomId) {
        const room = roomRepository.getRoom(roomId);
        const state = {};

        state.status = room.status;
        state.time = room.time;

        return state;
    }

    updateStreamState(roomId, stream) {
        const room = roomRepository.getRoom(roomId);

        room.status = stream.status;
        room.time = stream.time;

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
}

module.exports = new RoomService();