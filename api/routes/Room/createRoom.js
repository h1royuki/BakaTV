const Room = require('../../models/Room')
const RoomService = require('../../services/RoomService');

module.exports = (film, socket) => {

        const room = new Room(socket.id, film.name);

        RoomService.createRoom(room, film).then(() => {
                socket.emit('createRoom', room.id);
        }).catch((err) => {
                socket.emit('err', err.message);
        });
};