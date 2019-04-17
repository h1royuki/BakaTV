const Room = require('../../entity/Room')
const RoomService = require('../../services/RoomService');

module.exports = async (film, socket) => {
        try {
                socket.userId = Math.random() * 10000;

                const room = new Room(socket.userId);

                await RoomService.createRoom(room, film);

                socket.emit('createRoom', room.id);

                console.log(`Room ${room.id} created`);
        } catch (err) {
                console.log(err);
                socket.emit('err', err.message);
        }
};