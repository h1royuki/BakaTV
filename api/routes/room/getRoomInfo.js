const io = require('../../modules/Container').get('io')
const roomsRepository = require('../../repository/RoomRepository');
const NotFoundError = require('../../errors/NotFoundError');

module.exports = (room, socket) => {
    try {
        const currentRoom = roomsRepository.getRoom(room);

        socket.room = currentRoom.getId();
        socket.join(currentRoom.getId());

        socket.emit('getRoomInfo', currentRoom.toJson());
    } catch (err) {
        socket.emit('err', err.message);
        if (err instanceof NotFoundError) {
            socket.emit('notFound');
        }
    }
};  