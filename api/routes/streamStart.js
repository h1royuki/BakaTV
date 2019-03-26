const Room = require('../models/Room')
const RoomService = require('../services/RoomService');

module.exports = (film, socket) => {
        try {
                const room = new Room(socket.id, film.name);

                RoomService.startStream(room, film.url).then(() => {
                        socket.emit('roomCreated', room.id);
                });

        } catch (err) {
                socket.emit('err', err.message);
        }
};