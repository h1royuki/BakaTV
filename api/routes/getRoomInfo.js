const roomsRepository = require('../repository/RoomRepository');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (socket) => {
    try {
        const currentRoom = roomsRepository.getCurrentRoom();

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