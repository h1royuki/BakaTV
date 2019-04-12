const Playlist = require('../models/Room/Playlist');
const Film = require('../models/Room/Playlist/Film')
const roomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    createRoom(room, film) {
        return KinogoParser.getMovieURL(film.url).then((url) => {

            const FilmModel = new Film(url, film.name);

            room.playlist = new Playlist(FilmModel);

            roomRepository.addRoom(room);
        }).catch((err) => {
            console.log(err);
            throw new Error('Error create room');
        })
    }

    getRoom(roomId) {
        return roomRepository.getRoom(roomId).toJson();
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