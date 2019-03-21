const roomsRepository = require('../../repository/RoomRepository');
const NotFoundError = require('../../errors/NotFoundError');

module.exports = (room, socket) => {
    try {
        const currentRoom = roomsRepository.getRoom(room);

        socket.room = currentRoom.id;
        socket.join(currentRoom.id);
        socket.emit('getRoomInfo', currentRoom.toJson(socket.id));
    } catch (err) {
        socket.emit('err', err.message);
        if (err instanceof NotFoundError) {
            socket.emit('notFound');
        }
    }
};  